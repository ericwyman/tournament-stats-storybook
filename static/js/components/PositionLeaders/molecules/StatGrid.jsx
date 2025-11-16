/**
 * StatGrid - 2×2 grid of stat boxes
 *
 * Performance: Memoized - appears on every player card, contains 4 StatBox components
 * Props are validated with PropTypes in development
 */

import * as React from "react";
import PropTypes from "prop-types";
import { StatBox } from '../atoms/StatBox';

function StatGridComponent({ woba, avg, hr, pa, selectedStat, rank }) {
  return (
    <div className="grid grid-cols-2 gap-2 mb-2">
      <StatBox
        label="wOBA"
        value={woba}
        isHighlighted={selectedStat === 'woba'}
        rank={selectedStat === 'woba' ? rank : undefined}
      />
      <StatBox
        label="AVG"
        value={avg}
        isHighlighted={selectedStat === 'avg'}
        rank={selectedStat === 'avg' ? rank : undefined}
      />
      <StatBox
        label="HR"
        value={hr}
        isHighlighted={selectedStat === 'hr'}
        rank={selectedStat === 'hr' ? rank : undefined}
      />
      <StatBox
        label="PA"
        value={pa}
        isHighlighted={selectedStat === 'pa'}
        rank={selectedStat === 'pa' ? rank : undefined}
      />
    </div>
  );
}

StatGridComponent.propTypes = {
  /** Weighted on-base average */
  woba: PropTypes.string,
  /** Batting average */
  avg: PropTypes.string,
  /** Home runs */
  hr: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Plate appearances */
  pa: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Currently selected stat for highlighting */
  selectedStat: PropTypes.string,
  /** Player's rank for the selected stat */
  rank: PropTypes.number,
};

// Memoize to prevent re-renders - appears on every player card
export const StatGrid = React.memo(StatGridComponent);
