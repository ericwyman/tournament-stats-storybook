/**
 * PositionHeaderAtom - Position label with optional subtitle
 *
 * Performance: Memoized - rendered once per position section
 * Props are validated with PropTypes in development
 */

import * as React from "react";
import PropTypes from "prop-types";

function PositionHeaderAtomComponent({ position, subtitle = "Minimum 50 PA" }) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 border-l-4 border-l-blue-600">
      <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
        {position}
      </h2>
      <p className="text-sm text-gray-600 font-medium mt-1">
        {subtitle}
      </p>
    </div>
  );
}

PositionHeaderAtomComponent.propTypes = {
  /** Position name (e.g., "Catcher", "First Base") */
  position: PropTypes.string.isRequired,
  /** Subtitle text (e.g., eligibility requirements) */
  subtitle: PropTypes.string,
};

// Memoize to prevent re-renders when parent updates
export const PositionHeaderAtom = React.memo(PositionHeaderAtomComponent);
