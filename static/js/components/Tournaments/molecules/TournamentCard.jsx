/**
 * TournamentCard - Individual tournament card for grid view
 *
 * Performance: Memoized to prevent re-renders
 * Props are validated with PropTypes in development
 */

import * as React from "react";
import PropTypes from "prop-types";
import { Card, CardContent } from "@/components/ui/card";
import { TournamentBadge } from "../atoms/TournamentBadge";

function TournamentCardComponent({ tournament, onView, formatDate }) {
  const hasEntrants = tournament.entrant_count && tournament.entrant_count > 0;

  return (
    <Card className="shadow-lg border-2 border-border hover:shadow-xl hover:border-primary/50 transition-all duration-200 group">
      <CardContent className="p-6">
        {/* Tournament Header */}
        <div className="mb-4">
          <div className="flex items-start justify-between mb-2">
            <h2 className="text-2xl font-black text-foreground line-clamp-2 group-hover:text-primary transition-colors">
              {tournament.name}
            </h2>
            <TournamentBadge variant="status" className="text-sm px-3 py-1 flex-shrink-0 ml-2">
              {tournament.is_active ? 'Active' : 'Complete'}
            </TournamentBadge>
          </div>
          {hasEntrants && (
            <div className="flex items-center gap-1 text-muted-foreground text-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="font-semibold">{tournament.entrant_count.toLocaleString()} entrants</span>
            </div>
          )}
        </div>

        {/* Tournament Info */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <TournamentBadge variant="year">
              {tournament.year}
            </TournamentBadge>
            <TournamentBadge variant="type">
              {tournament.tournament_type === 'daily' ? 'Daily' : 'Weekly'}
            </TournamentBadge>
          </div>

          <div className="rounded-xl p-4 bg-gradient-to-br from-muted/40 to-muted/60 border border-border">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground font-medium flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                  Stadium:
                </span>
                <span className="text-foreground font-bold">{tournament.stadium?.name || 'TBD'}</span>
              </div>
              {tournament.stadium && (
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground font-medium">Batting L/R:</span>
                  <div className="flex gap-2">
                    <span className="text-foreground font-semibold px-2 py-0.5 bg-background/50 rounded">
                      L: {tournament.stadium.batting_l}
                    </span>
                    <span className="text-foreground font-semibold px-2 py-0.5 bg-background/50 rounded">
                      R: {tournament.stadium.batting_r}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground pt-2 border-t border-border">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>{formatDate(tournament.start_date)} - {formatDate(tournament.end_date)}</span>
          </div>
        </div>

        <button
          onClick={() => onView(tournament.id)}
          className="w-full mt-4 px-4 py-3 rounded-lg font-bold text-sm bg-primary text-primary-foreground border-2 border-primary hover:bg-primary/90 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 group/btn"
        >
          <span>View Details</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </CardContent>
    </Card>
  );
}

TournamentCardComponent.propTypes = {
  /** Tournament object with all tournament data */
  tournament: PropTypes.shape({
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
  }).isRequired,
  /** Handler for viewing tournament details */
  onView: PropTypes.func.isRequired,
  /** Function to format date strings for display */
  formatDate: PropTypes.func.isRequired,
};

// Memoize to prevent unnecessary re-renders
export const TournamentCard = React.memo(TournamentCardComponent);
