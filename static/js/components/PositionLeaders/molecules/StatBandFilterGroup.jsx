/**
 * StatBandFilterGroup - Stat band filter section with stat selector
 *
 * Performance: Memoized to prevent re-renders when other filters change
 * Props are validated with PropTypes in development
 */

import * as React from "react";
import PropTypes from "prop-types";
import { FilterCheckbox } from '../atoms/FilterCheckbox';
import { FilterControlButton } from '../atoms/FilterControlButton';
import { cn } from "@/lib/utils";

function StatBandFilterGroupComponent({
  selectedStat,
  statConfig,
  selectedStatBands,
  currentBands,
  onSelectStat,
  onToggleStatBand,
  onSelectAll,
  onClearAll
}) {
  return (
    <div>
      <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-3">
        Filter by Statistic
      </h3>
      <div className="flex flex-wrap items-center gap-3">
        <select
          value={selectedStat}
          onChange={(e) => onSelectStat(e.target.value)}
          className="px-4 py-2 rounded-lg font-bold text-sm bg-blue-600 text-white border-2 border-blue-700 cursor-pointer hover:bg-blue-700 transition-all duration-200"
        >
          {Object.keys(statConfig).map((statKey) => (
            <option key={statKey} value={statKey}>
              {statConfig[statKey].label}
            </option>
          ))}
        </select>

        <div className="text-gray-400 text-2xl font-light">|</div>

        {currentBands.map((band) => {
          const isChecked = selectedStatBands.includes(band.value);
          return (
            <FilterCheckbox
              key={band.value}
              label={band.label}
              checked={isChecked}
              onChange={() => onToggleStatBand(band.value)}
              variant="stat"
              className={cn(
                isChecked
                  ? "bg-blue-600 text-white border-transparent"
                  : "bg-gray-200 text-gray-500 border-gray-300 opacity-60"
              )}
            />
          );
        })}

        <div className="text-gray-400 text-2xl font-light">|</div>

        <div className="flex items-center gap-2">
          <FilterControlButton label="Select All" variant="success" onClick={onSelectAll} />
          <FilterControlButton label="Clear All" variant="danger" onClick={onClearAll} />
        </div>
      </div>
    </div>
  );
}

StatBandFilterGroupComponent.propTypes = {
  /** Currently selected stat key */
  selectedStat: PropTypes.string.isRequired,
  /** Configuration object for all stats with labels and bands */
  statConfig: PropTypes.objectOf(
    PropTypes.shape({
      label: PropTypes.string,
      bands: PropTypes.array,
    })
  ).isRequired,
  /** Array of currently selected stat band values */
  selectedStatBands: PropTypes.arrayOf(PropTypes.string).isRequired,
  /** Array of band objects for the currently selected stat */
  currentBands: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    })
  ).isRequired,
  /** Handler for selecting a stat from dropdown */
  onSelectStat: PropTypes.func.isRequired,
  /** Handler for toggling a stat band */
  onToggleStatBand: PropTypes.func.isRequired,
  /** Handler for selecting all stat bands */
  onSelectAll: PropTypes.func.isRequired,
  /** Handler for clearing all stat bands */
  onClearAll: PropTypes.func.isRequired,
};

// Memoize to prevent re-renders when other filters change
export const StatBandFilterGroup = React.memo(StatBandFilterGroupComponent);
