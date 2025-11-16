import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { PlayerCard } from "./PlayerCard";
import { cn } from "@/lib/utils";

/**
 * PlayerHeaderCompact - Compact header combining player card with stats grid
 *
 * @param {Object} props
 * @param {Object} props.player - Player information
 * @param {string} props.player.position - Player position
 * @param {string} props.player.firstName - Player first name
 * @param {string} props.player.lastName - Player last name
 * @param {string} props.player.tier - Card tier
 * @param {string|number} props.player.year - Card year
 * @param {Object} props.stats - Player statistics
 * @param {number} props.stats.formats - Number of tournament formats
 * @param {number} props.stats.teams - Number of teams
 * @param {string|number} props.stats.games - Games played (can be formatted like "8.2k")
 * @param {string|number} props.stats.atBats - At bats (can be formatted like "28.4k")
 * @param {string} props.className - Additional CSS classes
 */
export function PlayerHeaderCompact({ player, stats, className }) {
  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row gap-4 p-6 bg-white rounded-xl shadow border border-gray-100",
        className
      )}
    >
      {/* Player Card Section */}
      <PlayerCard
        position={player.position}
        firstName={player.firstName}
        lastName={player.lastName}
        tier={player.tier}
        year={player.year}
      />

      {/* Stats Grid */}
      <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-6 items-center py-4">
        <div>
          <div className="text-gray-500 text-xs mb-1">Formats</div>
          <div className="text-2xl font-bold">{stats.formats}</div>
        </div>
        <div>
          <div className="text-gray-500 text-xs mb-1">Teams</div>
          <div className="text-2xl font-bold">{stats.teams}</div>
        </div>
        <div>
          <div className="text-gray-500 text-xs mb-1">Games</div>
          <div className="text-2xl font-bold">{stats.games}</div>
        </div>
        <div>
          <div className="text-gray-500 text-xs mb-1">At Bats</div>
          <div className="text-2xl font-bold">{stats.atBats}</div>
        </div>
      </div>
    </div>
  );
}
