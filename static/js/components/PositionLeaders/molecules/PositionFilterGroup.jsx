/**
 * PositionFilterGroup - Position filter section with checkboxes
 *
 * Performance: Memoized to prevent re-renders when other filters change
 * Props are validated with PropTypes in development
 */

import * as React from "react";
import PropTypes from "prop-types";
import { FilterCheckbox } from '../atoms/FilterCheckbox';
import { FilterControlButton } from '../atoms/FilterControlButton';
import { cn } from "@/lib/utils";

function PositionFilterGroupComponent({
  selectedPositions,
  positions,
  onTogglePosition,
  onSelectAll,
  onClearAll
}) {
  return (
    <div>
      <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-3">
        Filter by Position
      </h3>
      <div className="flex flex-wrap gap-3">
        {positions.map((position) => {
          const isChecked = selectedPositions.includes(position);
          return (
            <FilterCheckbox
              key={position}
              label={position}
              checked={isChecked}
              onChange={() => onTogglePosition(position)}
              variant="position"
              className={cn(
                isChecked
                  ? "bg-gray-300 text-gray-800 border-transparent"
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

PositionFilterGroupComponent.propTypes = {
  /** Array of currently selected positions */
  selectedPositions: PropTypes.arrayOf(PropTypes.string).isRequired,
  /** Array of all available positions */
  positions: PropTypes.arrayOf(PropTypes.string).isRequired,
  /** Handler for toggling a position */
  onTogglePosition: PropTypes.func.isRequired,
  /** Handler for selecting all positions */
  onSelectAll: PropTypes.func.isRequired,
  /** Handler for clearing all positions */
  onClearAll: PropTypes.func.isRequired,
};

// Memoize to prevent re-renders when other filters change
export const PositionFilterGroup = React.memo(PositionFilterGroupComponent);
