/**
 * PositionGrid - Grid of position sections displaying players
 *
 * Performance: Memoized - renders multiple position sections with player lists
 * Props are validated with PropTypes in development
 */

import * as React from "react";
import PropTypes from "prop-types";
import { PositionHeaderAtom } from '../atoms/PositionHeaderAtom';
import { PlayerCardList } from './PlayerCardList';

function PositionGridComponent({
  positions,
  selectedPositions,
  data,
  selectedStat,
  filterPlayers,
  getGradientClass,
  minPA = 50
}) {
  return (
    <div className="flex flex-col gap-8">
      {positions
        .filter(pos => selectedPositions.includes(pos))
        .map((position) => (
          <div key={position} className="flex flex-col">
            <PositionHeaderAtom
              position={position}
              subtitle={`Minimum ${minPA} PA`}
            />
            <div className="flex flex-row gap-3 pb-2 mt-4">
              <PlayerCardList
                players={data[position] ? filterPlayers(data[position]) : []}
                selectedStat={selectedStat}
                getGradientClass={getGradientClass}
                minPA={minPA}
              />
            </div>
          </div>
        ))}
    </div>
  );
}

PositionGridComponent.propTypes = {
  /** Array of all available positions */
  positions: PropTypes.arrayOf(PropTypes.string).isRequired,
  /** Array of currently selected positions to display */
  selectedPositions: PropTypes.arrayOf(PropTypes.string).isRequired,
  /** Object mapping position names to player arrays */
  data: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.object)).isRequired,
  /** Currently selected stat for highlighting */
  selectedStat: PropTypes.string,
  /** Function to filter players based on current filters */
  filterPlayers: PropTypes.func.isRequired,
  /** Function to get gradient class for tier */
  getGradientClass: PropTypes.func.isRequired,
  /** Minimum plate appearances required */
  minPA: PropTypes.number,
};

// Memoize to prevent re-renders when parent updates
export const PositionGrid = React.memo(PositionGridComponent);
