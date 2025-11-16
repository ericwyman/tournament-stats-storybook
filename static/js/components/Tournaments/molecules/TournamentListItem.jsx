/**
 * TournamentListItem - Individual tournament row for list view
 *
 * Performance: Memoized to prevent re-renders
 * Props are validated with PropTypes in development
 */

import * as React from "react";
import PropTypes from "prop-types";
import { TournamentBadge } from "../atoms/TournamentBadge";

function TournamentListItemComponent({ tournament, onView, formatDate }) {
  const hasEntrants = tournament.entrant_count && tournament.entrant_count > 0;

  return (
    <tr className="hover:bg-muted/50 transition-colors group">
      <td className="px-6 py-4">
        <div className="font-bold text-foreground group-hover:text-primary transition-colors">{tournament.name}</div>
        <div className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3"
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
          {formatDate(tournament.start_date)} - {formatDate(tournament.end_date)}
        </div>
      </td>
      <td className="px-6 py-4">
        <TournamentBadge variant="year">{tournament.year}</TournamentBadge>
      </td>
      <td className="px-6 py-4">
        <TournamentBadge variant="type" className="text-xs">
          {tournament.tournament_type === 'daily' ? 'Daily' : 'Weekly'}
        </TournamentBadge>
      </td>
      <td className="px-6 py-4">
        <div className="text-sm text-foreground font-semibold flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-muted-foreground"
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
          {tournament.stadium?.name || 'TBD'}
        </div>
        {tournament.stadium && (
          <div className="text-xs text-muted-foreground mt-1 flex gap-2">
            <span className="px-1.5 py-0.5 bg-muted rounded">L: {tournament.stadium.batting_l}</span>
            <span className="px-1.5 py-0.5 bg-muted rounded">R: {tournament.stadium.batting_r}</span>
          </div>
        )}
      </td>
      <td className="px-6 py-4">
        <span className="font-bold text-foreground text-lg">{hasEntrants ? tournament.entrant_count.toLocaleString() : '0'}</span>
      </td>
      <td className="px-6 py-4">
        <TournamentBadge variant="status" className="text-xs px-2 py-1">
          {tournament.is_active ? 'Active' : 'Complete'}
        </TournamentBadge>
      </td>
      <td className="px-6 py-4">
        <button
          onClick={() => onView(tournament.id)}
          className="px-4 py-2 rounded-lg font-bold text-sm bg-primary text-primary-foreground border-2 border-primary hover:bg-primary/90 hover:shadow-md hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-1 group/btn"
        >
          <span>View</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 group-hover/btn:translate-x-0.5 transition-transform"
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
      </td>
    </tr>
  );
}

TournamentListItemComponent.propTypes = {
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
export const TournamentListItem = React.memo(TournamentListItemComponent);
