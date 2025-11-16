/**
 * PlayerHeader - OVR, rank, and tier badges
 *
 * Performance: Memoized - appears on every player card
 * Props are validated with PropTypes in development
 */

import * as React from "react";
import PropTypes from "prop-types";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

function PlayerHeaderComponent({ overall, rank, tier, tierGradient }) {
  return (
    <div className="flex justify-between items-start mb-3">
      <div className="flex items-center gap-2">
        <span className="text-lg font-bold text-gray-900">{overall}</span>
        <span className="text-xs text-gray-500 font-medium">(OVR)</span>
        <Badge className="bg-gray-100 text-gray-700 border-gray-300 font-bold text-xs px-2 py-1">
          Rank #{rank}
        </Badge>
      </div>
      <Badge className={cn(
        "text-white font-bold text-xs px-2 py-1 border-0",
        tierGradient
      )}>
        {tier}
      </Badge>
    </div>
  );
}

PlayerHeaderComponent.propTypes = {
  /** Player's overall rating */
  overall: PropTypes.number.isRequired,
  /** Player's rank for the selected stat */
  rank: PropTypes.number.isRequired,
  /** Player's card tier */
  tier: PropTypes.string.isRequired,
  /** CSS gradient class for tier badge */
  tierGradient: PropTypes.string.isRequired,
};

// Memoize to prevent re-renders - appears on every player card
export const PlayerHeader = React.memo(PlayerHeaderComponent);
