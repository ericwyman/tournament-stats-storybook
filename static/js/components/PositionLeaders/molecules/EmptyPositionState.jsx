/**
 * EmptyPositionState - Message shown when no players match filters
 *
 * Performance: Memoized to prevent re-renders when filters change
 * Props are validated with PropTypes in development
 */

import * as React from "react";
import PropTypes from "prop-types";

function EmptyPositionStateComponent({ minPA = 50 }) {
  return (
    <div className="bg-white/90 rounded-xl p-8 text-center shadow-sm border border-gray-200">
      <div className="text-5xl mb-4 opacity-30">⚾</div>
      <p className="text-gray-700 font-semibold mb-2">
        No qualified players
      </p>
      <p className="text-sm text-gray-500">{minPA}+ PA required</p>
    </div>
  );
}

EmptyPositionStateComponent.propTypes = {
  /** Minimum plate appearances required */
  minPA: PropTypes.number,
};

// Memoize to prevent re-renders when parent updates
export const EmptyPositionState = React.memo(EmptyPositionStateComponent);
