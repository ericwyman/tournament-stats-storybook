/**
 * LandingPage - Main landing page with sidebar and tournament browser
 *
 * Fetches real tournament data from AWS-deployed Django API
 * Includes full filtering, sorting, and view switching capabilities
 */

import * as React from "react";
import { useNavigate } from "react-router-dom";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { AppSidebar } from "@/components/app-sidebar";
import { WelcomeHero } from "@/components/Tournaments/organisms/WelcomeHero";
import { TournamentFilters } from "@/components/Tournaments/organisms/TournamentFilters";
import { TournamentGrid } from "@/components/Tournaments/organisms/TournamentGrid";
import { apiClient } from "@/lib/apiClient";

export default function LandingPage() {
  const navigate = useNavigate();
  // State
  const [tournaments, setTournaments] = React.useState([]);
  const [filteredTournaments, setFilteredTournaments] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  // Filter states
  const [selectedYears, setSelectedYears] = React.useState([]);
  const [selectedType, setSelectedType] = React.useState('all');
  const [selectedStatus, setSelectedStatus] = React.useState('all');

  // Sort & view
  const [sortBy, setSortBy] = React.useState('recent');
  const [viewMode, setViewMode] = React.useState('grid');

  // Extract unique years from tournaments
  const availableYears = React.useMemo(() => {
    const years = [...new Set(tournaments.map(t => t.year))];
    return years.sort((a, b) => b - a);
  }, [tournaments]);

  // Load tournaments from API on mount
  React.useEffect(() => {
    fetchTournaments();
  }, []);

  const fetchTournaments = async () => {
    setLoading(true);
    setError(null);

    try {
      // Fetch from AWS-deployed Django API
      const data = await apiClient.getTournaments({ limit: 100 });
      setTournaments(data.results || []);
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch tournaments:', err);
      setError('Failed to load tournaments from API');
      setLoading(false);
    }
  };

  // Apply filters and sorting whenever dependencies change
  React.useEffect(() => {
    let filtered = applyFilters(tournaments);
    filtered = applySorting(filtered, sortBy);
    setFilteredTournaments(filtered);
  }, [tournaments, selectedYears, selectedType, selectedStatus, sortBy]);

  // Filter logic
  const applyFilters = (tournaments) => {
    return tournaments.filter(t => {
      // Year filter
      if (selectedYears.length > 0 && !selectedYears.includes(t.year)) {
        return false;
      }

      // Type filter
      if (selectedType !== 'all' && t.tournament_type !== selectedType) {
        return false;
      }

      // Status filter
      if (selectedStatus === 'active' && !t.is_active) return false;
      if (selectedStatus === 'completed' && t.is_active) return false;

      return true;
    });
  };

  // Sort logic
  const applySorting = (tournaments, sortBy) => {
    const sorted = [...tournaments];

    switch(sortBy) {
      case 'recent':
        return sorted.sort((a, b) => b.id - a.id);
      case 'oldest':
        return sorted.sort((a, b) => a.id - b.id);
      case 'name_asc':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'name_desc':
        return sorted.sort((a, b) => b.name.localeCompare(a.name));
      case 'entrants_desc':
        return sorted.sort((a, b) => (b.entrant_count || 0) - (a.entrant_count || 0));
      case 'entrants_asc':
        return sorted.sort((a, b) => (a.entrant_count || 0) - (b.entrant_count || 0));
      default:
        return sorted;
    }
  };

  // Toggle year selection
  const toggleYear = (year) => {
    setSelectedYears(prev =>
      prev.includes(year)
        ? prev.filter(y => y !== year)
        : [...prev, year]
    );
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedYears([]);
    setSelectedType('all');
    setSelectedStatus('all');
    setSortBy('recent');
  };

  // Handle view tournament
  const handleViewTournament = (tournamentId) => {
    // Navigate to tournament details page using React Router
    navigate(`/tournament/${tournamentId}`);
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'Ongoing';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  if (error) {
    return (
      <SidebarProvider>
        <AppSidebar currentPath="/" />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <h1 className="text-xl font-semibold">Home</h1>
          </header>
          <div className="flex-1 p-4 md:p-8 bg-gradient-to-b from-background to-muted/30">
            <div className="max-w-2xl mx-auto mt-12">
              <div className="bg-card border-2 border-destructive/30 rounded-2xl p-8 shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-destructive"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-foreground mb-2">
                      Failed to Load Tournaments
                    </h2>
                    <p className="text-muted-foreground mb-4">{error}</p>
                    <div className="bg-muted/50 border border-border rounded-lg p-4 mb-4">
                      <p className="text-sm text-muted-foreground mb-2">
                        <strong className="text-foreground">Possible causes:</strong>
                      </p>
                      <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                        <li>The Django API server may be unavailable</li>
                        <li>Network connection issues</li>
                        <li>API authentication token may be invalid</li>
                      </ul>
                    </div>
                    <button
                      onClick={fetchTournaments}
                      className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors duration-200 shadow-md hover:shadow-lg"
                    >
                      Try Again
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar currentPath="/" />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <h1 className="text-xl font-semibold">Home</h1>
        </header>
        <div className="flex-1 bg-gradient-to-b from-background to-muted/30 p-4 md:p-8">
          <div className="max-w-[1800px] mx-auto">
            {/* Welcome Hero */}
            <WelcomeHero
              title="Tournament Stats App"
              subtitle="Explore OOTP Tournament Data"
              description="Browse tournaments, analyze player statistics, and track performance across multiple competitions."
            />

            {/* Tournament Filters */}
            <TournamentFilters
              availableYears={availableYears}
              selectedYears={selectedYears}
              onToggleYear={toggleYear}
              onSelectAllYears={() => setSelectedYears(availableYears)}
              onClearAllYears={() => setSelectedYears([])}
              selectedType={selectedType}
              onSelectType={setSelectedType}
              selectedStatus={selectedStatus}
              onSelectStatus={setSelectedStatus}
              sortBy={sortBy}
              onSort={setSortBy}
              onClearAll={clearFilters}
            />

            {/* Tournament Grid */}
            <TournamentGrid
              tournaments={filteredTournaments}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              onViewTournament={handleViewTournament}
              formatDate={formatDate}
              loading={loading}
            />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
