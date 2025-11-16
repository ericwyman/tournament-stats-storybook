/**
 * PlayerCard - Complete player card with all information
 *
 * Performance: Memoized - expensive component with multiple child components
 * Props are validated with PropTypes in development
 */

import * as React from "react";
import PropTypes from "prop-types";
import { PlayerHeader } from '../molecules/PlayerHeader';
import { PlayerName } from '../molecules/PlayerName';
import { StatGrid } from '../molecules/StatGrid';
import { TeamsMetaBadge } from '../atoms/TeamsMetaBadge';

function PlayerCardComponent({
  player,
  rank,
  selectedStat,
  getGradientClass
}) {
  return (
    <div className="rounded-xl p-4 bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 flex-1 min-w-[280px]">
      <PlayerHeader
        overall={player.ovr}
        rank={rank}
        tier={player.tier}
        tierGradient={getGradientClass(player.tier)}
      />
      <PlayerName
        firstName={player.firstName}
        lastName={player.lastName}
        year={player.year}
      />
      <StatGrid
        woba={player.woba}
        avg={player.avg}
        hr={player.hr}
        pa={player.pa}
        selectedStat={selectedStat}
        rank={rank}
      />
      <TeamsMetaBadge teamCount={player.teams} />
    </div>
  );
}

PlayerCardComponent.propTypes = {
  /** Player data object */
  player: PropTypes.shape({
    ovr: PropTypes.number.isRequired,
    tier: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    woba: PropTypes.string,
    avg: PropTypes.string,
    hr: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    pa: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    teams: PropTypes.number,
  }).isRequired,
  /** Player's rank for the selected stat */
  rank: PropTypes.number.isRequired,
  /** Currently selected stat for highlighting */
  selectedStat: PropTypes.string,
  /** Function to get gradient class for tier */
  getGradientClass: PropTypes.func.isRequired,
};

// Memoize - expensive component with multiple child components and calculations
export const PlayerCard = React.memo(PlayerCardComponent);
