import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

/**
 * TournamentHeader - Full tournament details header with gradient card
 *
 * @param {Object} props
 * @param {Object} props.tournament - Tournament information
 * @param {string} props.tournament.name - Tournament name
 * @param {string} props.tournament.tier - Card tier (iron, bronze, silver, gold, diamond, perfect)
 * @param {string|number} props.tournament.year - Tournament year
 * @param {string} props.tournament.type - Tournament type (e.g., "Daily", "Weekly")
 * @param {string} props.tournament.mode - Game mode (e.g., "Bo5 Finals Bo7")
 * @param {string} props.tournament.stadium - Stadium name
 * @param {Object} props.details - Tournament configuration details
 * @param {string} props.details.entryFee - Entry fee ("Free" or amount)
 * @param {string|boolean} props.details.dhRule - DH rule enabled ("Yes" or "No")
 * @param {string|number} props.details.cap - Salary cap
 * @param {number} props.details.entrants - Number of entrants
 * @param {number} props.details.spNeeded - Starting pitchers needed
 * @param {number} props.details.rpNeeded - Relief pitchers needed
 * @param {Object} props.runEnvironment - Run environment data (optional)
 * @param {string} props.runEnvironment.era - Era name (e.g., "Power")
 * @param {Object} props.runEnvironment.modifiers - Rating modifiers
 * @param {number} props.runEnvironment.modifiers.contact
 * @param {number} props.runEnvironment.modifiers.hrPower
 * @param {number} props.runEnvironment.modifiers.eye
 * @param {number} props.runEnvironment.modifiers.avoidK
 * @param {number} props.runEnvironment.modifiers.stuff
 * @param {number} props.runEnvironment.modifiers.movement
 * @param {number} props.runEnvironment.modifiers.control
 * @param {string} props.runEnvironment.spPitchCount - SP pitch count (e.g., "~105")
 * @param {string} props.className - Additional CSS classes
 */
export function TournamentHeader({ tournament, details, runEnvironment, className }) {
  // Determine gradient class from tier
  const gradientClass = `gradient-${tournament.tier.toLowerCase()}`;

  // Determine tier display text
  const getTierDisplay = (tier) => {
    const tierMap = {
      iron: "Iron (40-59)",
      bronze: "Bronze (60-69)",
      silver: "Silver (70-79)",
      gold: "Gold (80-89)",
      diamond: "Diamond (90-99)",
      perfect: "Perfect (100+)"
    };
    return tierMap[tier.toLowerCase()] || tier;
  };

  // Determine badge text color based on tier
  const getBadgeTextColor = (tier) => {
    const colorMap = {
      iron: "text-gray-700",
      bronze: "text-orange-700",
      silver: "text-slate-700",
      gold: "text-yellow-700",
      diamond: "text-cyan-700",
      perfect: "text-gray-700"
    };
    return colorMap[tier.toLowerCase()] || "text-gray-700";
  };

  // Format modifier value with color
  const formatModifier = (value) => {
    const numValue = parseFloat(value);
    const colorClass = numValue >= 1.0 ? "text-green-600" : "text-red-600";
    return (
      <div className={cn("font-semibold", colorClass)}>
        {value}
      </div>
    );
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Main Tournament Header Card */}
      <div className="flex flex-col lg:flex-row gap-6 p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800">
        {/* Left: Tournament Info Card with Gradient */}
        <div className={cn("flex-shrink-0 w-full lg:w-96 rounded-2xl p-8 text-white", gradientClass)}>
          <div className="flex flex-col gap-2 mb-4">
            <Badge
              variant="outline"
              className="text-sm px-3 py-1.5 bg-white/20 text-white border-white/40 hover:bg-white/30 w-fit"
            >
              {getTierDisplay(tournament.tier)}
            </Badge>
            <Badge
              variant="secondary"
              className={cn("text-sm px-3 py-1.5 bg-white font-semibold w-fit", getBadgeTextColor(tournament.tier))}
            >
              {tournament.year}
            </Badge>
          </div>
          <h2 className="text-3xl font-bold mb-2 break-words">{tournament.name}</h2>
          {runEnvironment && (
            <h3 className="text-xl mb-6">{tournament.year} Era: {runEnvironment.era}</h3>
          )}

          <div className="space-y-2 text-sm">
            <div className="flex justify-between gap-4">
              <span className="opacity-90 flex-shrink-0">Type:</span>
              <span className="font-semibold text-right">{tournament.type}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="opacity-90 flex-shrink-0">Mode:</span>
              <span className="font-semibold text-right">{tournament.mode}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="opacity-90 flex-shrink-0">Stadium:</span>
              <span className="font-semibold text-right break-words">{tournament.stadium}</span>
            </div>
          </div>
        </div>

        {/* Right: Tournament Details Grid */}
        <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-6">
          <div>
            <div className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-2">Entry Fee</div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">{details.entryFee}</div>
          </div>

          <div>
            <div className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-2">DH Rule</div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              {typeof details.dhRule === 'boolean' ? (details.dhRule ? 'Yes' : 'No') : details.dhRule}
            </div>
          </div>

          <div>
            <div className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-2">Cap</div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">{details.cap}</div>
          </div>

          <div>
            <div className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-2">Entrants</div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">{details.entrants}</div>
          </div>

          <div>
            <div className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-2">SP Needed</div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">{details.spNeeded}</div>
          </div>

          <div>
            <div className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-2">RP Needed</div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">{details.rpNeeded}</div>
          </div>
        </div>
      </div>

      {/* Run Environment Details (Optional) */}
      {runEnvironment && (
        <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
            {tournament.year} Run Environment - Era: {runEnvironment.era}
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 text-sm">
            <div>
              <div className="text-gray-500 dark:text-gray-400 mb-1">Contact</div>
              {formatModifier(runEnvironment.modifiers.contact)}
            </div>
            <div>
              <div className="text-gray-500 dark:text-gray-400 mb-1">HR Power</div>
              {formatModifier(runEnvironment.modifiers.hrPower)}
            </div>
            <div>
              <div className="text-gray-500 dark:text-gray-400 mb-1">Eye</div>
              {formatModifier(runEnvironment.modifiers.eye)}
            </div>
            <div>
              <div className="text-gray-500 dark:text-gray-400 mb-1">Avoid K</div>
              {formatModifier(runEnvironment.modifiers.avoidK)}
            </div>
            <div>
              <div className="text-gray-500 dark:text-gray-400 mb-1">Stuff</div>
              {formatModifier(runEnvironment.modifiers.stuff)}
            </div>
            <div>
              <div className="text-gray-500 dark:text-gray-400 mb-1">Movement</div>
              {formatModifier(runEnvironment.modifiers.movement)}
            </div>
            <div>
              <div className="text-gray-500 dark:text-gray-400 mb-1">Control</div>
              {formatModifier(runEnvironment.modifiers.control)}
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-300 dark:border-gray-600">
            <div className="text-gray-500 dark:text-gray-400 text-xs mb-2">Pitching Requirements</div>
            <div className="flex gap-6 text-sm text-gray-900 dark:text-white">
              <span><strong>SP Count:</strong> {runEnvironment.spPitchCount}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
