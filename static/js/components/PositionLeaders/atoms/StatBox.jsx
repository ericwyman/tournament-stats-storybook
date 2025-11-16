/**
 * StatBox - Individual stat display box
 *
 * Performance: Memoized - this component is rendered many times (4 per player card)
 * Props are validated with PropTypes in development
 */

import * as React from "react";
import PropTypes from "prop-types";
import { cn } from "@/lib/utils";

function StatBoxComponent({ label, value, isHighlighted, rank }) {
  return (
    <div className={cn(
      "rounded-md px-3 py-2 border",
      isHighlighted
        ? "bg-blue-50 border-blue-300"
        : "bg-gray-50 border-gray-200"
    )}>
      <div className={cn(
        "text-xs font-semibold uppercase tracking-wider mb-1",
        isHighlighted ? "text-blue-700" : "text-gray-600"
      )}>
        {label} {isHighlighted && rank && <span className="ml-1">• Rank #{rank}</span>}
      </div>
      <div className={cn(
        "text-lg font-bold",
        isHighlighted ? "text-blue-900" : "text-gray-900"
      )}>
        {value}
      </div>
    </div>
  );
}

StatBoxComponent.propTypes = {
  /** Stat label (e.g., "HR", "AVG") */
  label: PropTypes.string.isRequired,
  /** Stat value to display */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  /** Whether this stat is highlighted */
  isHighlighted: PropTypes.bool,
  /** Rank number to display when highlighted */
  rank: PropTypes.number,
};

// Memoize to prevent re-renders - this component appears 4 times per player card
export const StatBox = React.memo(StatBoxComponent);
