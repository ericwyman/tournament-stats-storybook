import * as React from "react";
import { apiClient } from "@/lib/apiClient";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/**
 * PositionLeadersPage - Display top performers for each position from Django API
 *
 * Fetches real tournament data and displays position leaders with filtering
 */
export default function PositionLeadersPage() {
  const [tournaments, setTournaments] = React.useState([]);
  const [selectedTournament, setSelectedTournament] = React.useState(null);
  const [positionData, setPositionData] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  // Positions to display
  const positions = ['C', '1B', '2B', '3B', 'SS', 'LF', 'CF', 'RF', 'DH'];

  // Filter states
  const [selectedPositions, setSelectedPositions] = React.useState(positions);
  const [selectedTiers, setSelectedTiers] = React.useState(['Perfect', 'Diamond', 'Gold', 'Silver', 'Bronze', 'Iron']);
  const [selectedStat, setSelectedStat] = React.useState('woba'); // wOBA is now available via aggregated stats!

  // Tier gradients
  const tierGradients = {
    'Iron': 'gradient-iron',
    'Bronze': 'gradient-bronze',
    'Silver': 'gradient-silver',
    'Gold': 'gradient-gold',
    'Diamond': 'gradient-diamond',
    'Perfect': 'gradient-perfect'
  };

  const allTiers = ['Perfect', 'Diamond', 'Gold', 'Silver', 'Bronze', 'Iron'];

  // Fetch tournaments on mount
  React.useEffect(() => {
    fetchTournaments();
  }, []);

  // Fetch stats when tournament selected
  React.useEffect(() => {
    if (selectedTournament) {
      fetchPositionLeaders(selectedTournament.id);
    }
  }, [selectedTournament]);

  const fetchTournaments = async () => {
    try {
      const data = await apiClient.getTournaments({ limit: 20 });
      setTournaments(data.results || []);
      // Auto-select first tournament
      if (data.results && data.results.length > 0) {
        setSelectedTournament(data.results[0]);
      }
    } catch (err) {
      console.error('Failed to fetch tournaments:', err);
      setError('Failed to load tournaments');
    }
  };

  const fetchPositionLeaders = async (tournamentId) => {
    setLoading(true);
    setError(null);

    try {
      // Fetch aggregated stats for this tournament (includes wOBA!)
      const data = await apiClient.getAggregatedStats({
        tournament: tournamentId,
        limit: 1000 // Get enough data to find top 5 per position
      });

      // Group by position and sort by selected stat
      const grouped = {};
      positions.forEach(pos => {
        grouped[pos] = [];
      });

      (data.results || []).forEach(stat => {
        const pos = stat.player.position;  // Position is on player in aggregated stats
        if (positions.includes(pos) && stat.player) {
          grouped[pos].push({
            id: stat.id,
            firstName: stat.player.first_name,
            lastName: stat.player.last_name,
            tier: stat.player.tier || 'Iron',
            year: stat.player.card_year,
            position: pos,
            // Stats - now including wOBA!
            woba: stat.woba || 0,
            ops: stat.ops || 0,
            avg: stat.batting_average || 0,
            hr: stat.home_runs || 0,
            pa: stat.plate_appearances || 0,
            obp: stat.on_base_percentage || 0,
            slg: stat.slugging_percentage || 0,
            // Additional info
            team: `${stat.organization_count} orgs`,  // Show org count instead of single org
            cardTeam: stat.player.card_team || '',
          });
        }
      });

      // Sort each position by selected stat and take top 5
      Object.keys(grouped).forEach(pos => {
        grouped[pos].sort((a, b) => {
          const aVal = Number(a[selectedStat]) || 0;
          const bVal = Number(b[selectedStat]) || 0;
          return bVal - aVal;
        });
        grouped[pos] = grouped[pos].slice(0, 5);
      });

      setPositionData(grouped);
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch position leaders:', err);
      setError('Failed to load position leaders');
      setLoading(false);
    }
  };

  // Filter helpers
  const togglePosition = (position) => {
    setSelectedPositions(prev =>
      prev.includes(position)
        ? prev.filter(p => p !== position)
        : [...prev, position]
    );
  };

  const toggleTier = (tier) => {
    setSelectedTiers(prev =>
      prev.includes(tier)
        ? prev.filter(t => t !== tier)
        : [...prev, tier]
    );
  };

  const getGradientClass = (tier) => {
    return tierGradients[tier] || 'gradient-iron';
  };

  // Filter players by selected tiers
  const filterPlayers = (players) => {
    return players.filter(player => selectedTiers.includes(player.tier));
  };

  // Format stat for display
  const formatStat = (value, stat) => {
    if (stat === 'avg' || stat === 'obp' || stat === 'slg' || stat === 'ops' || stat === 'woba') {
      return Number(value).toFixed(3);
    }
    return value;
  };

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 m-8">
        <p className="text-red-700 font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 p-4 md:p-8 min-h-screen">
      <div className="max-w-[1800px] mx-auto">
        {/* Page Header */}
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-md border border-gray-100 mb-8">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
            Position Leaders
          </h1>

          {/* Tournament Selector */}
          <div className="flex items-center gap-4">
            <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">
              Tournament:
            </label>
            <select
              value={selectedTournament?.id || ''}
              onChange={(e) => {
                const tournament = tournaments.find(t => t.id === Number(e.target.value));
                setSelectedTournament(tournament);
              }}
              className="px-4 py-2 rounded-lg font-medium text-lg bg-blue-600 text-white border-2 border-blue-700 cursor-pointer hover:bg-blue-700 transition-all duration-200"
            >
              {tournaments.map(t => (
                <option key={t.id} value={t.id}>
                  {t.name} ({t.year})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 mb-8">
          <div className="space-y-6">
            {/* Tier Filter */}
            <div>
              <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-3">
                Filter by Card Tier
              </h3>
              <div className="flex flex-wrap gap-3">
                {allTiers.map((tier) => {
                  const isChecked = selectedTiers.includes(tier);
                  return (
                    <label
                      key={tier}
                      className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition-all duration-200",
                        "border-2 hover:scale-105 hover:shadow-md cursor-pointer",
                        isChecked
                          ? `${getGradientClass(tier)} text-white border-transparent`
                          : "bg-gray-200 text-gray-500 border-gray-300 opacity-60"
                      )}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleTier(tier)}
                        className="w-4 h-4 rounded accent-white cursor-pointer"
                      />
                      <span>{tier}</span>
                    </label>
                  );
                })}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedTiers(allTiers)}
                    className="px-3 py-2 rounded-lg font-bold text-xs bg-green-100 text-green-700 border-2 border-green-300 hover:bg-green-200 transition-all duration-200"
                  >
                    Select All
                  </button>
                  <button
                    onClick={() => setSelectedTiers([])}
                    className="px-3 py-2 rounded-lg font-bold text-xs bg-red-100 text-red-700 border-2 border-red-300 hover:bg-red-200 transition-all duration-200"
                  >
                    Clear All
                  </button>
                </div>
              </div>
            </div>

            {/* Stat Selector */}
            <div>
              <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-3">
                Sort by Statistic
              </h3>
              <select
                value={selectedStat}
                onChange={(e) => {
                  setSelectedStat(e.target.value);
                  if (selectedTournament) {
                    fetchPositionLeaders(selectedTournament.id);
                  }
                }}
                className="px-4 py-2 rounded-lg font-bold text-sm bg-blue-600 text-white border-2 border-blue-700 cursor-pointer hover:bg-blue-700 transition-all duration-200"
              >
                <option value="woba">wOBA</option>
                <option value="ops">OPS</option>
                <option value="avg">AVG</option>
                <option value="hr">Home Runs</option>
                <option value="pa">Plate Appearances</option>
                <option value="obp">OBP</option>
                <option value="slg">SLG</option>
              </select>
            </div>

            {/* Position Filter */}
            <div>
              <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-3">
                Filter by Position
              </h3>
              <div className="flex flex-wrap gap-3">
                {positions.map((pos) => {
                  const isChecked = selectedPositions.includes(pos);
                  return (
                    <label
                      key={pos}
                      className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition-all duration-200",
                        "border-2 hover:scale-105 hover:shadow-md cursor-pointer",
                        isChecked
                          ? "bg-indigo-600 text-white border-transparent"
                          : "bg-gray-200 text-gray-500 border-gray-300 opacity-60"
                      )}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => togglePosition(pos)}
                        className="w-4 h-4 rounded accent-white cursor-pointer"
                      />
                      <span>{pos}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="text-gray-600 text-lg">Loading position leaders...</div>
          </div>
        )}

        {/* Position Leaders Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {positions
              .filter(pos => selectedPositions.includes(pos))
              .map(position => {
                const players = filterPlayers(positionData[position] || []);

                if (players.length === 0) return null;

                return (
                  <Card key={position} className="shadow-lg border-2 border-gray-200">
                    <CardContent className="p-6">
                      {/* Position Header */}
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-3xl font-black text-gray-900">{position}</h2>
                        <Badge className="text-sm px-3 py-1 bg-indigo-100 text-indigo-700 border-indigo-300">
                          Top {players.length}
                        </Badge>
                      </div>

                      {/* Player Cards */}
                      <div className="space-y-3">
                        {players.map((player, index) => (
                          <div
                            key={player.id || index}
                            className={cn(
                              "rounded-xl p-4 text-white shadow-md",
                              getGradientClass(player.tier)
                            )}
                          >
                            {/* Rank badge */}
                            <div className="flex items-start justify-between mb-2">
                              <Badge className="text-xs px-2 py-0.5 bg-white/20 text-white border-white/40">
                                #{index + 1}
                              </Badge>
                              <Badge className="text-xs px-2 py-0.5 bg-white/20 text-white border-white/40">
                                {player.tier}
                              </Badge>
                            </div>

                            {/* Player name */}
                            <h3 className="text-lg font-bold mb-1">
                              {player.firstName} {player.lastName}
                            </h3>

                            {/* Card year and team */}
                            <p className="text-xs text-white/80 mb-2">
                              {player.year} {player.cardTeam}
                            </p>

                            {/* Stats */}
                            <div className="grid grid-cols-4 gap-2 text-center text-sm">
                              <div>
                                <div className="text-white/70 text-xs">wOBA</div>
                                <div className="font-bold">{formatStat(player.woba, 'woba')}</div>
                              </div>
                              <div>
                                <div className="text-white/70 text-xs">OPS</div>
                                <div className="font-bold">{formatStat(player.ops, 'ops')}</div>
                              </div>
                              <div>
                                <div className="text-white/70 text-xs">AVG</div>
                                <div className="font-bold">{formatStat(player.avg, 'avg')}</div>
                              </div>
                              <div>
                                <div className="text-white/70 text-xs">PA</div>
                                <div className="font-bold">{player.pa}</div>
                              </div>
                            </div>

                            {/* Organization */}
                            <p className="text-xs text-white/70 mt-2 text-right">
                              {player.team}
                            </p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
          </div>
        )}

        {/* No Data */}
        {!loading && Object.values(positionData).every(arr => arr.length === 0) && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No data available for this tournament.</p>
          </div>
        )}
      </div>
    </div>
  );
}
