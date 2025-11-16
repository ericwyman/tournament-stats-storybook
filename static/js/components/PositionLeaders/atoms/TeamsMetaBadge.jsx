/**
 * TeamsMetaBadge - Badge showing team count
 *
 * Performance: Memoized - appears on every player card with multiple teams
 * Props are validated with PropTypes in development
 */

import * as React from "react";
import PropTypes from "prop-types";
import { Badge } from "@/components/ui/badge";

function TeamsMetaBadgeComponent({ teamCount }) {
  if (!teamCount || teamCount <= 1) {
    return null;
  }

  return (
    <Badge className="bg-blue-100 text-blue-700 border-blue-300 text-xs px-2 py-1 font-semibold">
      {teamCount} teams
    </Badge>
  );
}

TeamsMetaBadgeComponent.propTypes = {
  /** Number of teams player participated in */
  teamCount: PropTypes.number,
};

// Memoize to prevent re-renders - appears on many player cards
export const TeamsMetaBadge = React.memo(TeamsMetaBadgeComponent);
