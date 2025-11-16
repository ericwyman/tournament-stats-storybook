/**
 * PositionSection - Position header with player list
 *
 * Performance: Memoized to prevent re-renders when other positions update
 * Props are validated with PropTypes in development
 */

import * as React from "react";
import PropTypes from "prop-types";
import { PositionHeaderAtom } from '../atoms/PositionHeaderAtom';
import { EmptyPositionState } from './EmptyPositionState';

function PositionSectionComponent({
  position,
  players,
  selectedStat,
  getGradientClass,
  minPA = 50,
  renderPlayerCard
}) {
  return (
    <div className="flex flex-col">
      <PositionHeaderAtom position={position} subtitle={`Minimum ${minPA} PA`} />
      <div className="flex flex-row gap-3 pb-2 mt-4">
        {players && players.length > 0 ? (
          players.map((player, index) => renderPlayerCard(player, index))
        ) : (
          <EmptyPositionState minPA={minPA} />
        )}
      </div>
    </div>
  );
}

PositionSectionComponent.propTypes = {
  /** Position name */
  position: PropTypes.string.isRequired,
  /** Array of player objects for this position */
  players: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** Currently selected stat for highlighting */
  selectedStat: PropTypes.string,
  /** Function to get gradient class for tier */
  getGradientClass: PropTypes.func.isRequired,
  /** Minimum plate appearances required */
  minPA: PropTypes.number,
  /** Function to render individual player cards */
  renderPlayerCard: PropTypes.func.isRequired,
};

// Memoize to prevent re-renders when other positions update
export const PositionSection = React.memo(PositionSectionComponent);
