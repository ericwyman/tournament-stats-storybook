import * as React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

/**
 * Mock tournament data for local testing
 * Based on real OOTP tournament structure, with Silver Quicks as primary dataset
 */
const MOCK_TOURNAMENTS = [
  // 2025 Tournaments
  {
    id: 16,
    name: "Sept 29 - Current",
    year: 2025,
    tournament_type: "daily",
    is_active: true,
    start_date: "2025-09-29",
    end_date: null,
    entrant_count: 256,
    stadium: { id: 1, name: "Oracle Park", batting_l: 87, batting_r: 92 }
  },
  {
    id: 15,
    name: "Silver Quicks Daily",
    year: 2025,
    tournament_type: "daily",
    is_active: false,
    start_date: "2025-08-15",
    end_date: "2025-09-15",
    entrant_count: 512,
    stadium: { id: 2, name: "Coors Field", batting_l: 105, batting_r: 103 }
  },
  {
    id: 14,
    name: "Gold Standard Weekly",
    year: 2025,
    tournament_type: "weekly",
    is_active: false,
    start_date: "2025-07-01",
    end_date: "2025-07-31",
    entrant_count: 128,
    stadium: { id: 3, name: "Fenway Park", batting_l: 97, batting_r: 95 }
  },
  {
    id: 13,
    name: "Diamond Dynasty Daily",
    year: 2025,
    tournament_type: "daily",
    is_active: false,
    start_date: "2025-06-15",
    end_date: "2025-07-15",
    entrant_count: 384,
    stadium: { id: 4, name: "Yankee Stadium", batting_l: 98, batting_r: 102 }
  },
  {
    id: 12,
    name: "Perfect Storm Weekly",
    year: 2025,
    tournament_type: "weekly",
    is_active: false,
    start_date: "2025-05-20",
    end_date: "2025-06-10",
    entrant_count: 256,
    stadium: { id: 5, name: "Dodger Stadium", batting_l: 93, batting_r: 91 }
  },
  {
    id: 11,
    name: "Bronze League Daily",
    year: 2025,
    tournament_type: "daily",
    is_active: false,
    start_date: "2025-04-10",
    end_date: "2025-05-10",
    entrant_count: 640,
    stadium: { id: 6, name: "Chase Field", batting_l: 99, batting_r: 100 }
  },
  {
    id: 10,
    name: "Spring Showdown",
    year: 2025,
    tournament_type: "weekly",
    is_active: false,
    start_date: "2025-03-15",
    end_date: "2025-04-05",
    entrant_count: 192,
    stadium: { id: 7, name: "Wrigley Field", batting_l: 96, batting_r: 94 }
  },

  // 2024 Tournaments
  {
    id: 9,
    name: "Championship Finals 2024",
    year: 2024,
    tournament_type: "weekly",
    is_active: false,
    start_date: "2024-12-01",
    end_date: "2024-12-31",
    entrant_count: 512,
    stadium: { id: 8, name: "AT&T Park", batting_l: 88, batting_r: 90 }
  },
  {
    id: 8,
    name: "Fall Classic Daily",
    year: 2024,
    tournament_type: "daily",
    is_active: false,
    start_date: "2024-10-15",
    end_date: "2024-11-15",
    entrant_count: 768,
    stadium: { id: 9, name: "Minute Maid Park", batting_l: 101, batting_r: 99 }
  },
  {
    id: 7,
    name: "October Madness",
    year: 2024,
    tournament_type: "weekly",
    is_active: false,
    start_date: "2024-10-01",
    end_date: "2024-10-31",
    entrant_count: 256,
    stadium: { id: 10, name: "Camden Yards", batting_l: 95, batting_r: 96 }
  },
  {
    id: 6,
    name: "Summer Heat Daily",
    year: 2024,
    tournament_type: "daily",
    is_active: false,
    start_date: "2024-07-15",
    end_date: "2024-08-15",
    entrant_count: 512,
    stadium: { id: 11, name: "Citizens Bank Park", batting_l: 100, batting_r: 98 }
  },
  {
    id: 5,
    name: "Mid-Season Masters",
    year: 2024,
    tournament_type: "weekly",
    is_active: false,
    start_date: "2024-06-15",
    end_date: "2024-07-10",
    entrant_count: 320,
    stadium: { id: 12, name: "Busch Stadium", batting_l: 92, batting_r: 93 }
  },
  {
    id: 4,
    name: "Opening Day Classic",
    year: 2024,
    tournament_type: "daily",
    is_active: false,
    start_date: "2024-03-28",
    end_date: "2024-04-28",
    entrant_count: 896,
    stadium: { id: 13, name: "Target Field", batting_l: 94, batting_r: 92 }
  },

  // 2023 Tournaments
  {
    id: 3,
    name: "Year End Blitz 2023",
    year: 2023,
    tournament_type: "weekly",
    is_active: false,
    start_date: "2023-12-01",
    end_date: "2023-12-31",
    entrant_count: 384,
    stadium: { id: 14, name: "Progressive Field", batting_l: 93, batting_r: 95 }
  },
  {
    id: 2,
    name: "Autumn League",
    year: 2023,
    tournament_type: "daily",
    is_active: false,
    start_date: "2023-09-10",
    end_date: "2023-10-10",
    entrant_count: 640,
    stadium: { id: 15, name: "PNC Park", batting_l: 91, batting_r: 89 }
  },
  {
    id: 1,
    name: "Inaugural Tournament",
    year: 2023,
    tournament_type: "weekly",
    is_active: false,
    start_date: "2023-01-15",
    end_date: "2023-02-15",
    entrant_count: 256,
    stadium: { id: 16, name: "Kauffman Stadium", batting_l: 97, batting_r: 96 }
  }
];

/**
 * TournamentListPage - Display all tournaments with filtering and sorting
 */
export default function TournamentListPage() {
  const navigate = useNavigate();

  // State
  const [tournaments, setTournaments] = React.useState([]);
  const [filteredTournaments, setFilteredTournaments] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

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

  // Load tournaments on mount
  React.useEffect(() => {
    // Simulate API call with local data
    setTimeout(() => {
      setTournaments(MOCK_TOURNAMENTS);
      setLoading(false);
    }, 500);
  }, []);

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
        return sorted.sort((a, b) => b.entrant_count - a.entrant_count);
      case 'entrants_asc':
        return sorted.sort((a, b) => a.entrant_count - b.entrant_count);
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
    // For now, just log - will implement navigation later
    console.log('View tournament:', tournamentId);
    navigate(`/tournament/${tournamentId}`);
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'Ongoing';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-b from-gray-50 to-gray-100 p-4 md:p-8 min-h-screen">
        <div className="max-w-[1800px] mx-auto">
          <div className="text-center py-12">
            <div className="text-gray-600 text-lg">Loading tournaments...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 p-4 md:p-8 min-h-screen">
      <div className="max-w-[1800px] mx-auto">
        {/* Page Header */}
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-md border border-gray-100 mb-8">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-2 tracking-tight">
                Tournaments
              </h1>
              <p className="text-gray-600 text-lg">
                Browse all OOTP tournament data
              </p>
            </div>
            <Badge className="text-lg px-4 py-2 bg-blue-100 text-blue-700 border-blue-300">
              {filteredTournaments.length} of {tournaments.length}
            </Badge>
          </div>
        </div>

        {/* Filters & Controls */}
        <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 mb-8">
          <div className="space-y-6">
            {/* Year Filter */}
            <div>
              <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-3">
                Filter by Year
              </h3>
              <div className="flex flex-wrap gap-3">
                {availableYears.map(year => {
                  const isSelected = selectedYears.includes(year);
                  return (
                    <label
                      key={year}
                      className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition-all duration-200",
                        "border-2 hover:scale-105 hover:shadow-md cursor-pointer",
                        isSelected
                          ? "bg-blue-600 text-white border-transparent"
                          : "bg-gray-200 text-gray-500 border-gray-300 opacity-60"
                      )}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleYear(year)}
                        className="w-4 h-4 rounded accent-white cursor-pointer"
                      />
                      <span>{year}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Type & Status Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Type Filter */}
              <div>
                <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-3">
                  Tournament Type
                </h3>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg font-medium text-sm bg-white border-2 border-gray-300 cursor-pointer hover:border-blue-500 transition-all duration-200"
                >
                  <option value="all">All Types</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                </select>
              </div>

              {/* Status Filter */}
              <div>
                <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-3">
                  Status
                </h3>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg font-medium text-sm bg-white border-2 border-gray-300 cursor-pointer hover:border-blue-500 transition-all duration-200"
                >
                  <option value="all">All Tournaments</option>
                  <option value="active">Active Only</option>
                  <option value="completed">Completed Only</option>
                </select>
              </div>
            </div>

            {/* Sort & View Controls */}
            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-gray-200">
              {/* Sort By */}
              <div className="flex items-center gap-2">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">
                  Sort by:
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 rounded-lg font-medium text-sm bg-blue-600 text-white border-2 border-blue-700 cursor-pointer hover:bg-blue-700 transition-all duration-200"
                >
                  <option value="recent">Most Recent</option>
                  <option value="oldest">Oldest First</option>
                  <option value="name_asc">Name (A-Z)</option>
                  <option value="name_desc">Name (Z-A)</option>
                  <option value="entrants_desc">Most Entrants</option>
                  <option value="entrants_asc">Fewest Entrants</option>
                </select>
              </div>

              {/* View Toggle */}
              <div className="flex items-center gap-2">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">
                  View:
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={cn(
                      "px-4 py-2 rounded-lg font-bold text-sm border-2 transition-all duration-200",
                      viewMode === 'grid'
                        ? "bg-blue-600 text-white border-blue-700 hover:bg-blue-700"
                        : "bg-gray-200 text-gray-700 border-gray-300 hover:bg-gray-300"
                    )}
                  >
                    Grid
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={cn(
                      "px-4 py-2 rounded-lg font-bold text-sm border-2 transition-all duration-200",
                      viewMode === 'list'
                        ? "bg-blue-600 text-white border-blue-700 hover:bg-blue-700"
                        : "bg-gray-200 text-gray-700 border-gray-300 hover:bg-gray-300"
                    )}
                  >
                    List
                  </button>
                </div>
              </div>

              {/* Clear Filters */}
              <button
                onClick={clearFilters}
                className="ml-auto px-3 py-2 rounded-lg font-bold text-xs bg-red-100 text-red-700 border-2 border-red-300 hover:bg-red-200 transition-all duration-200"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Tournament Display */}
        {filteredTournaments.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 shadow-md border border-gray-100 text-center">
            <p className="text-gray-600 text-lg mb-4">No tournaments match your filters</p>
            <button
              onClick={clearFilters}
              className="px-4 py-2 rounded-lg font-bold text-sm bg-blue-600 text-white border-2 border-blue-700 hover:bg-blue-700 transition-all duration-200"
            >
              Clear Filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          // Grid View
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTournaments.map(tournament => (
              <TournamentCard
                key={tournament.id}
                tournament={tournament}
                onView={handleViewTournament}
                formatDate={formatDate}
              />
            ))}
          </div>
        ) : (
          // List View
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Tournament
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Year
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Stadium
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Entrants
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredTournaments.map(tournament => (
                    <TournamentRow
                      key={tournament.id}
                      tournament={tournament}
                      onView={handleViewTournament}
                      formatDate={formatDate}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * TournamentCard - Individual tournament card for grid view
 *
 * Props are validated with PropTypes in development
 */
function TournamentCard({ tournament, onView, formatDate }) {
  return (
    <Card className="shadow-lg border-2 border-gray-200">
      <CardContent className="p-6">
        {/* Tournament Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-3xl font-black text-gray-900">{tournament.name}</h2>
          <Badge className={cn(
            "text-sm px-3 py-1",
            tournament.is_active
              ? "bg-green-100 text-green-700 border-green-300"
              : "bg-indigo-100 text-indigo-700 border-indigo-300"
          )}>
            {tournament.is_active ? 'Active' : 'Complete'}
          </Badge>
        </div>

        {/* Tournament Info */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Badge className="bg-blue-100 text-blue-700 border-blue-300">
              {tournament.year}
            </Badge>
            <Badge variant="outline" className="text-gray-700 border-gray-300">
              {tournament.tournament_type === 'daily' ? 'Daily' : 'Weekly'}
            </Badge>
          </div>

          <div className="rounded-xl p-4 bg-gray-50 border border-gray-200">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500 font-medium">Stadium:</span>
                <span className="text-gray-900 font-semibold">{tournament.stadium.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 font-medium">Batting L/R:</span>
                <span className="text-gray-900 font-semibold">
                  {tournament.stadium.batting_l} / {tournament.stadium.batting_r}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 font-medium">Entrants:</span>
                <span className="text-gray-900 font-bold">{tournament.entrant_count}</span>
              </div>
            </div>
          </div>

          <div className="text-xs text-gray-500 text-center pt-2 border-t border-gray-200">
            {formatDate(tournament.start_date)} - {formatDate(tournament.end_date)}
          </div>
        </div>

        <button
          onClick={() => onView(tournament.id)}
          className="w-full mt-4 px-4 py-2 rounded-lg font-bold text-sm bg-blue-600 text-white border-2 border-blue-700 hover:bg-blue-700 transition-all duration-200"
        >
          View Details →
        </button>
      </CardContent>
    </Card>
  );
}

TournamentCard.propTypes = {
  /** Tournament object with all tournament data */
  tournament: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    tournament_type: PropTypes.string.isRequired,
    is_active: PropTypes.bool.isRequired,
    start_date: PropTypes.string,
    end_date: PropTypes.string,
    entrant_count: PropTypes.number.isRequired,
    stadium: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string.isRequired,
      batting_l: PropTypes.number,
      batting_r: PropTypes.number,
    }).isRequired,
  }).isRequired,
  /** Handler for viewing tournament details */
  onView: PropTypes.func.isRequired,
  /** Function to format date strings for display */
  formatDate: PropTypes.func.isRequired,
};

/**
 * TournamentRow - Individual tournament row for list view
 *
 * Props are validated with PropTypes in development
 */
function TournamentRow({ tournament, onView, formatDate }) {
  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4">
        <div className="font-bold text-gray-900">{tournament.name}</div>
        <div className="text-xs text-gray-500">
          {formatDate(tournament.start_date)} - {formatDate(tournament.end_date)}
        </div>
      </td>
      <td className="px-6 py-4">
        <Badge className="bg-blue-100 text-blue-700 border-blue-300">{tournament.year}</Badge>
      </td>
      <td className="px-6 py-4">
        <Badge variant="outline" className="text-gray-700 border-gray-300 text-xs">
          {tournament.tournament_type === 'daily' ? 'Daily' : 'Weekly'}
        </Badge>
      </td>
      <td className="px-6 py-4">
        <div className="text-sm text-gray-900 font-semibold">{tournament.stadium.name}</div>
        <div className="text-xs text-gray-500">
          L/R: {tournament.stadium.batting_l}/{tournament.stadium.batting_r}
        </div>
      </td>
      <td className="px-6 py-4">
        <span className="font-bold text-gray-900">{tournament.entrant_count}</span>
      </td>
      <td className="px-6 py-4">
        <Badge className={cn(
          "text-xs px-2 py-1",
          tournament.is_active
            ? "bg-green-100 text-green-700 border-green-300"
            : "bg-indigo-100 text-indigo-700 border-indigo-300"
        )}>
          {tournament.is_active ? 'Active' : 'Complete'}
        </Badge>
      </td>
      <td className="px-6 py-4">
        <button
          onClick={() => onView(tournament.id)}
          className="px-4 py-2 rounded-lg font-bold text-sm bg-blue-600 text-white border-2 border-blue-700 hover:bg-blue-700 transition-all duration-200"
        >
          View →
        </button>
      </td>
    </tr>
  );
}

TournamentRow.propTypes = {
  /** Tournament object with all tournament data */
  tournament: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    tournament_type: PropTypes.string.isRequired,
    is_active: PropTypes.bool.isRequired,
    start_date: PropTypes.string,
    end_date: PropTypes.string,
    entrant_count: PropTypes.number.isRequired,
    stadium: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string.isRequired,
      batting_l: PropTypes.number,
      batting_r: PropTypes.number,
    }).isRequired,
  }).isRequired,
  /** Handler for viewing tournament details */
  onView: PropTypes.func.isRequired,
  /** Function to format date strings for display */
  formatDate: PropTypes.func.isRequired,
};
