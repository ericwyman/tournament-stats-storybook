/**
 * Django REST API client for React components
 *
 * Usage:
 *   import { apiClient } from '@/lib/apiClient';
 *
 *   const tournaments = await apiClient.getTournaments({ year: 2025 });
 *   const stats = await apiClient.getStats({ tournament: 13 });
 */

// In production (Vercel), use the serverless proxy to avoid CORS/HTTPS issues
// In development, connect directly to Django API
const USE_PROXY = import.meta.env.PROD; // true in production, false in dev
const API_BASE_URL = USE_PROXY
  ? '/api/django-proxy'  // Vercel serverless function proxy
  : (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000');
const API_TOKEN = import.meta.env.VITE_API_TOKEN || '';

/**
 * Base API client class for making authenticated requests to Django
 */
class DjangoAPIClient {
  constructor(baseUrl = API_BASE_URL, token = API_TOKEN) {
    this.baseUrl = baseUrl.replace(/\/$/, ''); // Remove trailing slash
    this.token = token;
  }

  /**
   * Build headers for API requests
   */
  getHeaders() {
    return {
      'Authorization': `Token ${this.token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
  }

  /**
   * Build full URL from endpoint
   */
  buildUrl(endpoint, params = {}) {
    // For relative URLs (proxy), construct manually
    // For absolute URLs (direct API), use URL constructor
    let url;

    if (this.baseUrl.startsWith('http')) {
      // Absolute URL - direct API connection
      url = new URL(`${this.baseUrl}${endpoint}`);
    } else {
      // Relative URL - using proxy
      // Construct URL manually since we're on the same domain
      const currentOrigin = typeof window !== 'undefined'
        ? window.location.origin
        : 'https://vite-react-databot-ui.vercel.app';
      url = new URL(`${this.baseUrl}${endpoint}`, currentOrigin);
    }

    // Add query parameters
    Object.keys(params).forEach(key => {
      if (params[key] !== null && params[key] !== undefined) {
        url.searchParams.append(key, params[key]);
      }
    });

    return url.toString();
  }

  /**
   * Make HTTP request to Django API
   */
  async request(method, endpoint, { params = {}, data = null } = {}) {
    const url = this.buildUrl(endpoint, params);
    console.log(`API Request: ${method} ${url}`);

    const options = {
      method,
      headers: this.getHeaders(),
    };

    if (data && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
      options.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(url, options);

      // Handle non-OK responses
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.detail || `HTTP ${response.status}: ${response.statusText}`;
        throw new Error(errorMessage);
      }

      // Parse and return JSON
      return await response.json();
    } catch (error) {
      console.error(`API Error (${method} ${endpoint}):`, error);
      throw error;
    }
  }

  /**
   * GET request
   */
  async get(endpoint, params = {}) {
    return this.request('GET', endpoint, { params });
  }

  /**
   * POST request
   */
  async post(endpoint, data, params = {}) {
    return this.request('POST', endpoint, { params, data });
  }

  /**
   * PUT request
   */
  async put(endpoint, data, params = {}) {
    return this.request('PUT', endpoint, { params, data });
  }

  /**
   * DELETE request
   */
  async delete(endpoint, params = {}) {
    return this.request('DELETE', endpoint, { params });
  }

  // ==================== Tournament Endpoints ====================

  /**
   * Get list of tournaments
   * @param {Object} filters - Query filters
   * @param {number} filters.year - Filter by year
   * @param {string} filters.tournament_type - Filter by type (daily, weekly)
   * @param {boolean} filters.is_active - Filter by active status
   * @param {number} filters.limit - Limit results
   * @param {number} filters.offset - Pagination offset
   * @returns {Promise<{count: number, results: Array}>}
   */
  async getTournaments(filters = {}) {
    return this.get('/api/tournaments/', filters);
  }

  /**
   * Get single tournament by ID
   * @param {number} id - Tournament ID
   * @returns {Promise<Object>} Tournament with stadium data
   */
  async getTournament(id) {
    return this.get(`/api/tournaments/${id}/`);
  }

  // ==================== Player Endpoints ====================

  /**
   * Get list of players
   * @param {Object} filters - Query filters
   * @param {string} filters.position - Filter by position
   * @param {string} filters.tier - Filter by tier (Gold, Silver, Bronze)
   * @param {number} filters.limit - Limit results
   * @returns {Promise<{count: number, results: Array}>}
   */
  async getPlayers(filters = {}) {
    return this.get('/api/players/', filters);
  }

  /**
   * Get single player by ID
   * @param {number} id - Player ID
   * @returns {Promise<Object>} Player with ratings
   */
  async getPlayer(id) {
    return this.get(`/api/players/${id}/`);
  }

  // ==================== Stats Endpoints ====================

  /**
   * Get tournament statistics
   * @param {Object} filters - Query filters
   * @param {number} filters.tournament - Filter by tournament ID
   * @param {number} filters.player - Filter by player ID
   * @param {number} filters.organization - Filter by organization ID
   * @param {string} filters.position - Filter by position
   * @param {number} filters.limit - Limit results
   * @param {number} filters.offset - Pagination offset
   * @returns {Promise<{count: number, results: Array}>}
   */
  async getStats(filters = {}) {
    return this.get('/api/stats/', filters);
  }

  /**
   * Get single stat record by ID
   * @param {number} id - Stat record ID
   * @returns {Promise<Object>} Stat detail
   */
  async getStat(id) {
    return this.get(`/api/stats/${id}/`);
  }

  /**
   * Get pre-aggregated tournament statistics with wOBA
   * Returns stats aggregated across all organizations and simulation runs.
   * Cached from Sept 29 - Current for optimal performance.
   * Includes pre-calculated advanced metrics: wOBA, FIP, ISO, BABIP, wRAA.
   *
   * @param {Object} filters - Query filters
   * @param {number} filters.tournament - Filter by tournament ID
   * @param {number} filters.player - Filter by player ID
   * @param {string} filters.position - Filter by position
   * @param {number} filters.limit - Limit results
   * @param {number} filters.offset - Pagination offset
   * @returns {Promise<{count: number, results: Array}>}
   */
  async getAggregatedStats(filters = {}) {
    return this.get('/api/stats/aggregated/', filters);
  }

  // ==================== Pagination Helpers ====================

  /**
   * Fetch all pages from a paginated response
   * WARNING: Use cautiously - can result in many API calls
   * @param {Object} initialResponse - Response with 'next' URL
   * @returns {Promise<Array>} All results from all pages
   */
  async getAllPages(initialResponse) {
    const results = [...(initialResponse.results || [])];
    let nextUrl = initialResponse.next;

    while (nextUrl) {
      // Extract path and query from full URL
      const url = new URL(nextUrl);
      // url.search includes the '?' prefix, so we concatenate directly
      const endpoint = url.pathname + url.search;
      const response = await this.get(endpoint);
      results.push(...(response.results || []));
      nextUrl = response.next;
    }

    return results;
  }

  // ==================== Health Check ====================

  /**
   * Check if Django API is reachable
   * @returns {Promise<boolean>}
   */
  async healthCheck() {
    try {
      const response = await fetch(this.buildUrl('/health/'));
      return response.ok;
    } catch {
      return false;
    }
  }
}

// Export singleton instance
export const apiClient = new DjangoAPIClient();

// Export class for custom instances
export { DjangoAPIClient };
