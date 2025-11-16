/**
 * PlayerName - Player name + year display
 *
 * Performance: Memoized - appears on every player card
 * Props are validated with PropTypes in development
 */

import * as React from "react";
import PropTypes from "prop-types";

function PlayerNameComponent({ firstName, lastName, year }) {
  return (
    <div className="mb-3">
      <h3 className="text-base font-bold text-gray-900 tracking-tight">
        {firstName} {lastName}
      </h3>
      <p className="text-sm text-gray-600 font-medium">
        {year}
      </p>
    </div>
  );
}

PlayerNameComponent.propTypes = {
  /** Player's first name */
  firstName: PropTypes.string.isRequired,
  /** Player's last name */
  lastName: PropTypes.string.isRequired,
  /** Card year */
  year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

// Memoize to prevent re-renders - appears on every player card
export const PlayerName = React.memo(PlayerNameComponent);
