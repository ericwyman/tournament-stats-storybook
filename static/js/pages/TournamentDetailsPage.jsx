/**
 * Tournament Details Page
 *
 * Displays comprehensive details for a single tournament including:
 * - Tournament metadata and stadium information
 * - Stats summary
 * - Top performers preview
 * - Navigation and breadcrumbs
 */
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, Users, Trophy, TrendingUp, ChevronRight, BarChart3, Award, Target } from 'lucide-react';
import { apiClient } from '@/lib/apiClient';
import { cn } from '@/lib/utils';

/**
 * Loading skeleton for tournament details
 */
function TournamentDetailsSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header skeleton */}
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-32 mt-2" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Skeleton className="h-24" />
            <Skeleton className="h-24" />
            <Skeleton className="h-24" />
          </div>
        </CardContent>
      </Card>

      {/* Stats skeleton */}
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Skeleton className="h-20" />
            <Skeleton className="h-20" />
            <Skeleton className="h-20" />
            <Skeleton className="h-20" />
          </div>
        </CardContent>
      </Card>

      {/* Top performers skeleton */}
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-56" />
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-16" />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/**
 * Error display component
 */
function ErrorDisplay({ error, onRetry }) {
  return (
    <Card className="shadow-lg border-2 border-red-200 bg-red-50/50">
      <CardContent className="pt-6">
        <div className="text-center py-8">
          <div className="text-red-600 text-xl font-bold mb-2">
            Failed to load tournament details
          </div>
          <p className="text-red-700 mb-6">
            {error.message || 'An unexpected error occurred'}
          </p>
          <Button onClick={onRetry} size="lg" className="px-8">
            Try Again
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * Breadcrumb navigation
 */
function Breadcrumbs({ tournamentName }) {
  return (
    <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
      <Link to="/" className="hover:text-foreground transition-colors">
        Home
      </Link>
      <ChevronRight className="h-4 w-4" />
      <Link to="/tournaments" className="hover:text-foreground transition-colors">
        Tournaments
      </Link>
      <ChevronRight className="h-4 w-4" />
      <span className="text-foreground font-medium">{tournamentName}</span>
    </nav>
  );
}

/**
 * Tournament Statistics Summary
 */
function TournamentStats({ tournamentId }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, [tournamentId]);

  const fetchStats = async () => {
    try {
      setLoading(true);
      console.log('TournamentStats: Fetching stats for tournament ID:', tournamentId);

      // Fetch batters by position since pagination is blocked by Vercel SSO
      // Each position has < 50 players, so we get complete data without pagination
      const positions = ['C', '1B', '2B', '3B', 'SS', 'LF', 'CF', 'RF', 'DH'];
      const cacheBuster = Date.now();
      const positionPromises = positions.map(pos =>
        apiClient.getAggregatedStats({
          tournament: tournamentId,
          position: pos,
          limit: 100,
          _: cacheBuster, // Cache buster to force fresh data
        })
      );

      const positionResults = await Promise.all(positionPromises);
      console.log('Position results:', positionResults.map((r, i) => ({
        position: positions[i],
        count: r.results?.length || 0,
        sampleTournamentId: r.results?.[0]?.tournament?.id || 'no data',
        samplePlayerName: r.results?.[0]?.player?.full_name || 'no data',
        samplePlayerPosition: r.results?.[0]?.player?.position || 'no data',
        samplePA: r.results?.[0]?.plate_appearances || 0
      })));

      const results = positionResults.flatMap(data => data.results || []);
      console.log('Total batters fetched:', results.length);
      console.log('Sample batter data:', results[0]);
      console.log('Batters with PA > 0:', results.filter(b => b.plate_appearances > 0).length);
      console.log('Sample batter with PA > 0:', results.find(b => b.plate_appearances > 0));

      // Filter to only include players with actual plate appearances
      const batters = results.filter(stat => (stat.plate_appearances || 0) > 0);
      const totalPlayers = batters.length;
      const totalGames = batters.reduce((sum, stat) => sum + (stat.games_played || 0), 0);
      const avgWoba = totalPlayers > 0
        ? batters.reduce((sum, stat) => sum + (Number(stat.woba) || 0), 0) / totalPlayers
        : 0;
      const avgOps = totalPlayers > 0
        ? batters.reduce((sum, stat) => sum + (Number(stat.on_base_percentage) || 0) + (Number(stat.slugging_percentage) || 0), 0) / totalPlayers
        : 0;
      const totalHomeruns = batters.reduce((sum, stat) => sum + (stat.home_runs || 0), 0);
      const totalStolenBases = batters.reduce((sum, stat) => sum + (stat.stolen_bases || 0), 0);

      console.log('Calculated stats:', {
        totalPlayers,
        totalGames,
        avgWoba,
        avgOps,
        totalHomeruns,
        totalStolenBases
      });

      setStats({
        totalPlayers,
        totalGames,
        avgWoba,
        avgOps,
        totalHomeruns,
        totalStolenBases,
      });
    } catch (err) {
      console.error('Failed to fetch tournament stats:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card className="shadow-lg border-2 border-border">
        <CardHeader>
          <Skeleton className="h-6 w-48" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-20" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!stats) return null;

  return (
    <Card className="shadow-lg border-2 border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <BarChart3 className="h-6 w-6" />
          Tournament Statistics
        </CardTitle>
        <CardDescription className="text-base">Aggregated performance metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
            <div className="text-sm font-medium text-muted-foreground mb-1">Total Players</div>
            <div className="text-3xl font-black">{stats.totalPlayers}</div>
          </div>
          <div className="p-4 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
            <div className="text-sm font-medium text-muted-foreground mb-1">Total Games</div>
            <div className="text-3xl font-black">{stats.totalGames}</div>
          </div>
          <div className="p-4 rounded-xl bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
            <div className="text-sm font-medium text-muted-foreground mb-1">Avg wOBA</div>
            <div className="text-3xl font-black">{stats.avgWoba.toFixed(3)}</div>
          </div>
          <div className="p-4 rounded-xl bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20">
            <div className="text-sm font-medium text-muted-foreground mb-1">Avg OPS</div>
            <div className="text-3xl font-black">{stats.avgOps.toFixed(3)}</div>
          </div>
          <div className="p-4 rounded-xl bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20">
            <div className="text-sm font-medium text-muted-foreground mb-1">Total Home Runs</div>
            <div className="text-3xl font-black">{stats.totalHomeruns}</div>
          </div>
          <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20">
            <div className="text-sm font-medium text-muted-foreground mb-1">Total Stolen Bases</div>
            <div className="text-3xl font-black">{stats.totalStolenBases}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * Stat Leaderboards Component
 */
function StatLeaderboards({ tournamentId }) {
  const [leaderboards, setLeaderboards] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('batting');
  const [selectedStat, setSelectedStat] = useState('woba');

  useEffect(() => {
    fetchLeaderboards();
  }, [tournamentId]);

  const fetchLeaderboards = async () => {
    try {
      setLoading(true);

      // Fetch batters by position since pagination is blocked by Vercel SSO
      const positions = ['C', '1B', '2B', '3B', 'SS', 'LF', 'CF', 'RF', 'DH'];
      const cacheBuster = Date.now();
      const positionPromises = positions.map(pos =>
        apiClient.getAggregatedStats({
          tournament: tournamentId,
          position: pos,
          limit: 100,
          _: cacheBuster, // Cache buster to force fresh data
        })
      );

      const positionResults = await Promise.all(positionPromises);
      const results = positionResults.flatMap(data => data.results || []);

      // Create leaderboards for different stats
      // Filter for players with plate appearances for batting stats
      const batters = results.filter(s => (s.plate_appearances || 0) > 0);
      const battingLeaders = {
        woba: [...batters].sort((a, b) => (Number(b.woba) || 0) - (Number(a.woba) || 0)).slice(0, 10),
        avg: [...batters].sort((a, b) => (Number(b.batting_average) || 0) - (Number(a.batting_average) || 0)).slice(0, 10),
        hr: [...batters].sort((a, b) => (b.home_runs || 0) - (a.home_runs || 0)).slice(0, 10),
        rbi: [...batters].sort((a, b) => (b.runs_batted_in || 0) - (a.runs_batted_in || 0)).slice(0, 10),
        sb: [...batters].sort((a, b) => (b.stolen_bases || 0) - (a.stolen_bases || 0)).slice(0, 10),
      };

      // Pitching leaders (filter for pitchers if needed, or show all)
      const pitchers = results.filter(s => (s.innings_pitched || 0) > 0);
      const pitchingLeaders = {
        era: [...pitchers].sort((a, b) => (Number(a.era) || 999) - (Number(b.era) || 999)).slice(0, 10),
        fip: [...pitchers].sort((a, b) => (Number(a.fip) || 999) - (Number(b.fip) || 999)).slice(0, 10),
        whip: [...pitchers].sort((a, b) => (Number(a.whip) || 999) - (Number(b.whip) || 999)).slice(0, 10),
      };

      setLeaderboards({ batting: battingLeaders, pitching: pitchingLeaders });
    } catch (err) {
      console.error('Failed to fetch leaderboards:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card className="shadow-lg border-2 border-border">
        <CardHeader>
          <Skeleton className="h-6 w-48" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-64" />
        </CardContent>
      </Card>
    );
  }

  if (!leaderboards) return null;

  const statCategories = {
    batting: [
      { key: 'woba', label: 'wOBA', format: (v) => (v != null ? Number(v).toFixed(3) : '0.000') },
      { key: 'avg', label: 'AVG', format: (v) => (v != null ? Number(v).toFixed(3) : '0.000') },
      { key: 'hr', label: 'HR', format: (v) => v || 0 },
      { key: 'rbi', label: 'RBI', format: (v) => v || 0 },
      { key: 'sb', label: 'SB', format: (v) => v || 0 },
    ],
    pitching: [
      { key: 'era', label: 'ERA', format: (v) => (v != null ? Number(v).toFixed(2) : '--') },
      { key: 'fip', label: 'FIP', format: (v) => (v != null ? Number(v).toFixed(2) : '--') },
      { key: 'whip', label: 'WHIP', format: (v) => (v != null ? Number(v).toFixed(2) : '--') },
    ],
  };

  const currentStats = statCategories[selectedCategory];
  const leaders = leaderboards[selectedCategory]?.[selectedStat] || [];

  return (
    <Card className="shadow-lg border-2 border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Award className="h-6 w-6" />
          Stat Leaderboards
        </CardTitle>
        <CardDescription className="text-base">Top 10 performers by category</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Category Toggle */}
        <div className="flex gap-2">
          <Button
            variant={selectedCategory === 'batting' ? 'default' : 'outline'}
            onClick={() => {
              if (selectedCategory !== 'batting') {
                setSelectedCategory('batting');
                setSelectedStat('woba');
              }
            }}
            className="flex-1"
          >
            Batting Leaders
          </Button>
          <Button
            variant={selectedCategory === 'pitching' ? 'default' : 'outline'}
            onClick={() => {
              if (selectedCategory !== 'pitching') {
                setSelectedCategory('pitching');
                setSelectedStat('era');
              }
            }}
            className="flex-1"
          >
            Pitching Leaders
          </Button>
        </div>

        {/* Stat Selection */}
        <div className="flex flex-wrap gap-2">
          {currentStats.map((stat) => (
            <Button
              key={stat.key}
              variant={selectedStat === stat.key ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedStat(stat.key)}
            >
              {stat.label}
            </Button>
          ))}
        </div>

        {/* Leaders List */}
        <div className="space-y-2">
          {leaders.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No data available for this category
            </div>
          ) : (
            leaders.map((stat, index) => {
              const currentStatConfig = currentStats.find(s => s.key === selectedStat);
              // Map frontend stat keys to API field names
              const fieldMap = {
                'avg': 'batting_average',
                'rbi': 'runs_batted_in',
                'woba': 'woba',
                'hr': 'home_runs',
                'sb': 'stolen_bases',
                'era': 'era',
                'fip': 'fip',
                'whip': 'whip'
              };
              const fieldName = fieldMap[selectedStat] || selectedStat;
              const statValue = stat[fieldName] || 0;

              return (
                <div
                  key={stat.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Badge
                      variant={index < 3 ? 'default' : 'outline'}
                      className={cn(
                        'w-8 h-8 rounded-full flex items-center justify-center font-bold',
                        index === 0 && 'bg-amber-500 hover:bg-amber-600',
                        index === 1 && 'bg-slate-400 hover:bg-slate-500',
                        index === 2 && 'bg-orange-600 hover:bg-orange-700'
                      )}
                    >
                      {index + 1}
                    </Badge>
                    <div>
                      <div className="font-bold">
                        {stat.player.first_name} {stat.player.last_name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {stat.player.position} • {stat.player.card_year} {stat.player.card_team}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-black">
                      {currentStatConfig.format(statValue)}
                    </div>
                    <div className="text-xs text-muted-foreground uppercase">
                      {currentStatConfig.label}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * Position Breakdown Component
 */
function PositionBreakdown({ tournamentId }) {
  const [positionData, setPositionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const positions = ['C', '1B', '2B', '3B', 'SS', 'LF', 'CF', 'RF', 'DH'];

  useEffect(() => {
    fetchPositionData();
  }, [tournamentId]);

  const fetchPositionData = async () => {
    try {
      setLoading(true);

      // Fetch each position separately (already position-filtered, so this is optimal)
      const positionPromises = positions.map(pos =>
        apiClient.getAggregatedStats({
          tournament: tournamentId,
          position: pos,
          limit: 100,
        })
      );

      const positionResults = await Promise.all(positionPromises);
      const results = positionResults.flatMap(data => data.results || []);

      // Group by position
      const grouped = {};
      positions.forEach(pos => {
        const posPlayers = results.filter(s => s.player.position === pos);
        if (posPlayers.length > 0) {
          const avgWoba = posPlayers.reduce((sum, s) => sum + (s.woba || 0), 0) / posPlayers.length;
          const topPlayer = [...posPlayers].sort((a, b) => (b.woba || 0) - (a.woba || 0))[0];
          grouped[pos] = {
            count: posPlayers.length,
            avgWoba,
            topPlayer,
          };
        }
      });

      setPositionData(grouped);
    } catch (err) {
      console.error('Failed to fetch position data:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card className="shadow-lg border-2 border-border">
        <CardHeader>
          <Skeleton className="h-6 w-48" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
            {positions.map((pos) => (
              <Skeleton key={pos} className="h-32" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!positionData || Object.keys(positionData).length === 0) return null;

  return (
    <Card className="shadow-lg border-2 border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Target className="h-6 w-6" />
          Position Breakdown
        </CardTitle>
        <CardDescription className="text-base">
          Performance by position • Click to view all position leaders
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
          {positions.map((pos) => {
            const data = positionData[pos];
            if (!data) return null;

            return (
              <div
                key={pos}
                className="p-4 rounded-xl border-2 border-border bg-gradient-to-br from-muted/20 to-muted/40 hover:from-muted/40 hover:to-muted/60 transition-all cursor-default"
              >
                <div className="text-center">
                  <div className="text-lg font-black text-primary mb-1">{pos}</div>
                  <div className="text-xs text-muted-foreground mb-2">
                    {data.count} player{data.count !== 1 ? 's' : ''}
                  </div>
                  <div className="text-sm font-medium text-muted-foreground">Avg wOBA</div>
                  <div className="text-xl font-black">{data.avgWoba.toFixed(3)}</div>
                  <div className="mt-2 pt-2 border-t border-border">
                    <div className="text-xs text-muted-foreground mb-1">Top Player</div>
                    <div className="text-xs font-bold truncate">
                      {data.topPlayer.player.first_name} {data.topPlayer.player.last_name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {(data.topPlayer.woba || 0).toFixed(3)}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <Button
          variant="outline"
          size="lg"
          className="w-full mt-6 font-bold"
          onClick={() => navigate('/position-leaders')}
        >
          View All Position Leaders
        </Button>
      </CardContent>
    </Card>
  );
}

/**
 * Top performers preview section
 */
function TopPerformersPreview({ tournamentId }) {
  const [topPerformers, setTopPerformers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTopPerformers();
  }, [tournamentId]);

  const fetchTopPerformers = async () => {
    try {
      setLoading(true);

      // Fetch batters by position since pagination is blocked by Vercel SSO
      const positions = ['C', '1B', '2B', '3B', 'SS', 'LF', 'CF', 'RF', 'DH'];
      const cacheBuster = Date.now();
      const positionPromises = positions.map(pos =>
        apiClient.getAggregatedStats({
          tournament: tournamentId,
          position: pos,
          limit: 100,
          _: cacheBuster, // Cache buster to force fresh data
        })
      );

      const positionResults = await Promise.all(positionPromises);
      const results = positionResults.flatMap(data => data.results || []);

      // Sort by wOBA and take top 5
      const sorted = results
        .filter(s => (s.plate_appearances || 0) > 0)
        .sort((a, b) => (Number(b.woba) || 0) - (Number(a.woba) || 0))
        .slice(0, 5);

      setTopPerformers(sorted);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch top performers:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card className="shadow-lg border-2 border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Trophy className="h-6 w-6" />
            Top Performers
          </CardTitle>
          <CardDescription className="text-base">Best players by wOBA</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-16" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || topPerformers.length === 0) {
    return (
      <Card className="shadow-lg border-2 border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Trophy className="h-6 w-6" />
            Top Performers
          </CardTitle>
          <CardDescription className="text-base">Best players by wOBA</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-muted-foreground">
            <Trophy className="h-12 w-12 mx-auto mb-4 opacity-20" />
            <p className="font-medium">No player data available for this tournament</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg border-2 border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Trophy className="h-6 w-6" />
          Top Performers
        </CardTitle>
        <CardDescription className="text-base">Best players by wOBA</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {topPerformers.map((stat, index) => (
          <div
            key={stat.id}
            className="flex items-center justify-between p-4 rounded-xl bg-muted/50 hover:bg-muted transition-all duration-200 border-2 border-transparent hover:border-primary/30"
          >
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="w-10 h-10 rounded-full flex items-center justify-center font-black text-base">
                {index + 1}
              </Badge>
              <div>
                <div className="font-bold text-base">
                  {stat.player.first_name} {stat.player.last_name}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.player.position} • {stat.player.card_year} {stat.player.card_team}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-black">
                {(stat.woba || 0).toFixed(3)}
              </div>
              <div className="text-xs text-muted-foreground uppercase tracking-wide">wOBA</div>
            </div>
          </div>
        ))}

        <Button
          variant="outline"
          size="lg"
          className="w-full mt-6 font-bold"
          onClick={() => navigate('/position-leaders')}
        >
          View All Position Leaders
        </Button>
      </CardContent>
    </Card>
  );
}

/**
 * Main Tournament Details Page Component
 */
export default function TournamentDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tournament, setTournament] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTournament();
  }, [id]);

  const fetchTournament = async () => {
    try {
      setLoading(true);
      console.log('TournamentDetailsPage: Fetching tournament with URL param id:', id);
      const data = await apiClient.getTournament(id);
      console.log('TournamentDetailsPage: Received tournament data:', { id: data.id, name: data.name });
      setTournament(data);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch tournament:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <SidebarProvider>
      <AppSidebar currentPath={`/tournament/${id}`} />
      <SidebarInset>
        {/* Header */}
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
          <Separator orientation="vertical" className="mr-2 h-4" />
          <h1 className="text-xl font-semibold">Tournament Details</h1>
        </header>

        {/* Main Content */}
        <div className="flex-1 p-4 md:p-8 bg-gradient-to-b from-background to-muted/30">
          <div className="max-w-6xl mx-auto">
            {/* Breadcrumbs */}
            {tournament && (
              <Breadcrumbs tournamentName={tournament.name} />
            )}

            {/* Loading State */}
            {loading && <TournamentDetailsSkeleton />}

            {/* Error State */}
            {error && !loading && (
              <ErrorDisplay error={error} onRetry={fetchTournament} />
            )}

            {/* Tournament Content */}
            {tournament && !loading && !error && (
              <div className="space-y-6">
                {/* Tournament Header Card */}
                <Card className="shadow-xl border-2 border-border">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-3">
                        <CardTitle className="text-4xl font-black tracking-tight">
                          {tournament.name}
                        </CardTitle>
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge variant="secondary" className="text-base px-3 py-1">
                            {tournament.year}
                          </Badge>
                          <Badge variant="outline" className="text-base px-3 py-1">
                            {tournament.tournament_type?.charAt(0).toUpperCase() + tournament.tournament_type?.slice(1) || 'Daily'}
                          </Badge>
                          {tournament.is_active && (
                            <Badge className="bg-green-600 hover:bg-green-700 text-base px-3 py-1">
                              Active
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Entrants */}
                      <div className="flex items-start gap-3">
                        <div className="p-3 rounded-xl bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                          <Users className="h-6 w-6" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-muted-foreground mb-1">Entrants</div>
                          <div className="font-black text-3xl">
                            {tournament.entrants || 0}
                          </div>
                        </div>
                      </div>

                      {/* Status */}
                      <div className="flex items-start gap-3">
                        <div className={cn(
                          "p-3 rounded-xl",
                          tournament.is_active
                            ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-muted/50 text-muted-foreground"
                        )}>
                          <TrendingUp className="h-6 w-6" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-muted-foreground mb-1">Status</div>
                          <div className="font-bold text-base">
                            {tournament.is_active ? 'Active' : 'Completed'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Stadium Information */}
                {tournament.stadium && (
                  <Card className="shadow-lg border-2 border-border">
                    <CardHeader>
                      <CardTitle className="text-2xl">Stadium Information</CardTitle>
                      <CardDescription className="text-base">{tournament.stadium.name}</CardDescription>
                    </CardHeader>
                  </Card>
                )}

                {/* Tournament Statistics */}
                <TournamentStats tournamentId={tournament.id} />

                {/* Stat Leaderboards */}
                <StatLeaderboards tournamentId={tournament.id} />

                {/* Position Breakdown */}
                <PositionBreakdown tournamentId={tournament.id} />

                {/* Top Performers Preview */}
                <TopPerformersPreview tournamentId={tournament.id} />
              </div>
            )}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
