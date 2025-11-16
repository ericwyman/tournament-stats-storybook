/**
 * PlayerCardList - List of player cards with empty state handling
 *
 * Performance: Memoized - renders multiple PlayerCard components
 * Props are validated with PropTypes in development
 */

import * as React from "react";
import PropTypes from "prop-types";
import { PlayerCard } from './PlayerCard';
import { EmptyPositionState } from '../molecules/EmptyPositionState';

function PlayerCardListComponent({
  players,
  selectedStat,
  getGradientClass,
  minPA = 50
}) {
  if (!players || players.length === 0) {
    return <EmptyPositionState minPA={minPA} />;
  }

  return (
    <>
      {players.map((player, index) => (
        <PlayerCard
          key={index}
          player={player}
          rank={index + 1}
          selectedStat={selectedStat}
          getGradientClass={getGradientClass}
        />
      ))}
    </>
  );
}

PlayerCardListComponent.propTypes = {
  /** Array of player objects to display */
  players: PropTypes.arrayOf(PropTypes.object),
  /** Currently selected stat for highlighting */
  selectedStat: PropTypes.string,
  /** Function to get gradient class for tier */
  getGradientClass: PropTypes.func.isRequired,
  /** Minimum plate appearances required */
  minPA: PropTypes.number,
};

// Memoize to prevent re-renders when parent updates
export const PlayerCardList = React.memo(PlayerCardListComponent);
