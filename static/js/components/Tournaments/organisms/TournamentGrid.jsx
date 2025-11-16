/**
 * TournamentGrid - Tournament display with grid/list view switching
 *
 * Performance: Memoized to prevent re-renders
 * Props are validated with PropTypes in development
 */

import * as React from "react";
import PropTypes from "prop-types";
import { ViewToggleButton } from "../atoms/ViewToggleButton";
import { TournamentCard } from "../molecules/TournamentCard";
import { TournamentListItem } from "../molecules/TournamentListItem";
import { TournamentCardSkeleton } from "../molecules/TournamentCardSkeleton";
import { TournamentListItemSkeleton } from "../molecules/TournamentListItemSkeleton";

function TournamentGridComponent({
  tournaments,
  viewMode,
  onViewModeChange,
  onViewTournament,
  formatDate,
  loading,
}) {
  if (loading) {
    return (
      <div className="space-y-6">
        {/* View Toggle Skeleton */}
        <div className="flex items-center justify-between bg-card rounded-xl p-4 shadow-sm border border-border">
          <div className="text-sm font-semibold text-muted-foreground">
            Loading tournaments...
          </div>
        </div>

        {/* Tournament Skeletons */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <TournamentCardSkeleton key={index} />
            ))}
          </div>
        ) : (
          <div className="bg-card rounded-2xl shadow-md border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50 border-b border-border">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-bold text-foreground/90 uppercase tracking-wider">
                      Tournament
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-foreground/90 uppercase tracking-wider">
                      Year
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-foreground/90 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-foreground/90 uppercase tracking-wider">
                      Stadium
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-foreground/90 uppercase tracking-wider">
                      Entrants
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-foreground/90 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-foreground/90 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <TournamentListItemSkeleton key={index} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (!tournaments || tournaments.length === 0) {
    return (
      <div className="bg-card rounded-2xl p-12 shadow-md border border-border text-center">
        <p className="text-muted-foreground text-lg mb-4">No tournaments match your filters</p>
        <p className="text-muted-foreground/80 text-sm">Try adjusting your filter criteria</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* View Toggle */}
      <div className="flex items-center justify-between bg-card rounded-xl p-4 shadow-sm border border-border">
        <div className="text-sm font-semibold text-foreground/90">
          Showing {tournaments.length} {tournaments.length === 1 ? 'tournament' : 'tournaments'}
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm font-bold text-foreground/90 uppercase tracking-wider">
            View:
          </label>
          <ViewToggleButton
            view="grid"
            isActive={viewMode === "grid"}
            onClick={() => onViewModeChange("grid")}
          />
          <ViewToggleButton
            view="list"
            isActive={viewMode === "list"}
            onClick={() => onViewModeChange("list")}
          />
        </div>
      </div>

      {/* Tournament Display */}
      {viewMode === "grid" ? (
        // Grid View
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {tournaments.map(tournament => (
            <TournamentCard
              key={tournament.id}
              tournament={tournament}
              onView={onViewTournament}
              formatDate={formatDate}
            />
          ))}
        </div>
      ) : (
        // List View
        <div className="bg-card rounded-2xl shadow-md border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50 border-b border-border">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold text-foreground/90 uppercase tracking-wider">
                    Tournament
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-foreground/90 uppercase tracking-wider">
                    Year
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-foreground/90 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-foreground/90 uppercase tracking-wider">
                    Stadium
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-foreground/90 uppercase tracking-wider">
                    Entrants
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-foreground/90 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-foreground/90 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {tournaments.map(tournament => (
                  <TournamentListItem
                    key={tournament.id}
                    tournament={tournament}
                    onView={onViewTournament}
                    formatDate={formatDate}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

TournamentGridComponent.propTypes = {
  /** Array of tournament objects to display */
  tournaments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      year: PropTypes.number.isRequired,
      tournament_type: PropTypes.string.isRequired,
      is_active: PropTypes.bool.isRequired,
      start_date: PropTypes.string,
      end_date: PropTypes.string,
      entrant_count: PropTypes.number,
      stadium: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        batting_l: PropTypes.number,
        batting_r: PropTypes.number,
      }),
    })
  ).isRequired,
  /** Current view mode (grid or list) */
  viewMode: PropTypes.oneOf(["grid", "list"]).isRequired,
  /** Handler for changing view mode */
  onViewModeChange: PropTypes.func.isRequired,
  /** Handler for viewing tournament details */
  onViewTournament: PropTypes.func.isRequired,
  /** Function to format date strings */
  formatDate: PropTypes.func.isRequired,
  /** Loading state */
  loading: PropTypes.bool,
};

TournamentGridComponent.defaultProps = {
  loading: false,
};

// Memoize to prevent unnecessary re-renders
export const TournamentGrid = React.memo(TournamentGridComponent);
