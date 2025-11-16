/**
 * Player Filtering Utilities
 *
 * Functions for filtering players based on tiers and stat bands
 */

import { getStatValue } from './statUtils';

/**
 * Filter players based on selected tiers and stat bands
 *
 * @param {Array} players - Array of player objects
 * @param {Array} selectedTiers - Array of selected tier strings
 * @param {Array} selectedStatBands - Array of selected stat band values
 * @param {string} statType - The stat type being filtered (woba, avg, hr, pa)
 * @param {Array} currentBands - Array of band definitions for the current stat
 * @returns {Array} Filtered array of players
 */
export const filterPlayers = (
  players,
  selectedTiers,
  selectedStatBands,
  statType,
  currentBands
) => {
  // First apply tier filter
  let filtered = players.filter(player => selectedTiers.includes(player.tier));

  // Check if "Top 5" is selected
  if (selectedStatBands.includes('top5')) {
    // Sort by selected stat descending and take top 5
    const sorted = [...filtered].sort((a, b) => {
      const aVal = getStatValue(a, statType);
      const bVal = getStatValue(b, statType);
      return bVal - aVal; // Descending order
    });
    return sorted.slice(0, 5);
  }

  // Otherwise apply value-based stat band filters
  return filtered.filter(player => {
    const statValue = getStatValue(player, statType);
    return selectedStatBands.some(bandValue => {
      const band = currentBands.find(b => b.value === bandValue);
      return band && !band.isRankBased && statValue >= band.min && statValue <= band.max;
    });
  });
};
