/**
 * TierFilterGroup - Tier filter section with checkboxes
 *
 * Performance: Memoized to prevent re-renders when other filters change
 * Props are validated with PropTypes in development
 */

import * as React from "react";
import PropTypes from "prop-types";
import { FilterCheckbox } from '../atoms/FilterCheckbox';
import { FilterControlButton } from '../atoms/FilterControlButton';
import { cn } from "@/lib/utils";

function TierFilterGroupComponent({
  selectedTiers,
  allTiers,
  onToggleTier,
  onSelectAll,
  onClearAll,
  tierGradients
}) {
  return (
    <div>
      <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-3">
        Filter by Card Tier
      </h3>
      <div className="flex flex-wrap gap-3">
        {allTiers.map((tier) => {
          const isChecked = selectedTiers.includes(tier);
          return (
            <FilterCheckbox
              key={tier}
              label={tier}
              checked={isChecked}
              onChange={() => onToggleTier(tier)}
              variant="tier"
              className={cn(
                isChecked
                  ? `${tierGradients[tier]} text-white border-transparent`
                  : "bg-gray-200 text-gray-500 border-gray-300 opacity-60"
              )}
            />
          );
        })}
        <div className="flex items-center gap-2">
          <FilterControlButton label="Select All" variant="success" onClick={onSelectAll} />
          <FilterControlButton label="Clear All" variant="danger" onClick={onClearAll} />
        </div>
      </div>
    </div>
  );
}

TierFilterGroupComponent.propTypes = {
  /** Array of currently selected tiers */
  selectedTiers: PropTypes.arrayOf(PropTypes.string).isRequired,
  /** Array of all available tiers */
  allTiers: PropTypes.arrayOf(PropTypes.string).isRequired,
  /** Handler for toggling a tier */
  onToggleTier: PropTypes.func.isRequired,
  /** Handler for selecting all tiers */
  onSelectAll: PropTypes.func.isRequired,
  /** Handler for clearing all tiers */
  onClearAll: PropTypes.func.isRequired,
  /** Object mapping tier names to gradient CSS classes */
  tierGradients: PropTypes.objectOf(PropTypes.string).isRequired,
};

// Memoize to prevent re-renders when other filters change
export const TierFilterGroup = React.memo(TierFilterGroupComponent);
