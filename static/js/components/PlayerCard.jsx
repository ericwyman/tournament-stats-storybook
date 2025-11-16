import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

/**
 * PlayerCard - Compact player card component with tier gradient background
 *
 * NOTE: This is different from components/PositionLeaders/organisms/PlayerCard.jsx
 * This version (86 lines) is used by PlayerHeaderCompact for tournament details.
 * The atomic version (41 lines) is used in PositionLeaders page with different layout.
 * Both are actively maintained for different use cases.
 *
 * @param {Object} props
 * @param {string} props.position - Player position (e.g., "CF", "1B", "SS")
 * @param {string} props.firstName - Player first name
 * @param {string} props.lastName - Player last name
 * @param {string} props.tier - Card tier (iron, bronze, silver, gold, diamond, perfect)
 * @param {string|number} props.year - Card year
 * @param {string} props.className - Additional CSS classes
 */
export function PlayerCard({
  position,
  firstName,
  lastName,
  tier = "iron",
  year,
  className
}) {
  // Determine gradient class from tier
  const gradientClass = `gradient-${tier.toLowerCase()}`;

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

  return (
    <div
      className={cn(
        "rounded-xl p-6 text-white flex justify-between items-center shadow-lg",
        gradientClass,
        className
      )}
    >
      {/* Left: Position and Name */}
      <div>
        <div className="text-3xl font-bold mb-2">{position}</div>
        <h3 className="text-xl font-bold whitespace-nowrap">
          {firstName} {lastName}
        </h3>
      </div>

      {/* Right: Badges stacked vertically */}
      <div className="flex flex-col gap-2 items-end">
        <Badge
          variant="outline"
          className="text-sm px-3 py-1.5 bg-white/20 text-white border-white/40 hover:bg-white/30"
        >
          {getTierDisplay(tier)}
        </Badge>
        <Badge
          variant="secondary"
          className={cn("text-sm px-3 py-1.5 bg-white font-semibold", getBadgeTextColor(tier))}
        >
          {year}
        </Badge>
      </div>
    </div>
  );
}
