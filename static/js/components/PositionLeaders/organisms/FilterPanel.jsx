/**
 * FilterPanel - Complete filter interface with all filter groups
 *
 * Performance: Memoized - complex organism with many filter groups
 * Props are validated with PropTypes in development
 */

import * as React from "react";
import PropTypes from "prop-types";
import { TierFilterGroup } from '../molecules/TierFilterGroup';
import { StatBandFilterGroup } from '../molecules/StatBandFilterGroup';
import { PositionFilterGroup } from '../molecules/PositionFilterGroup';

function FilterPanelComponent({
  selectedTiers,
  selectedPositions,
  selectedStat,
  selectedStatBands,
  positions,
  allTiers,
  statConfig,
  tierGradients,
  currentBands,
  onToggleTier,
  onTogglePosition,
  onSelectStat,
  onToggleStatBand,
  onSelectAllTiers,
  onClearAllTiers,
  onSelectAllPositions,
  onClearAllPositions,
  onSelectAllStatBands,
  onClearAllStatBands
}) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 mb-8">
      <div className="space-y-6">
        <TierFilterGroup
          selectedTiers={selectedTiers}
          allTiers={allTiers}
          onToggleTier={onToggleTier}
          onSelectAll={onSelectAllTiers}
          onClearAll={onClearAllTiers}
          tierGradients={tierGradients}
        />
        <StatBandFilterGroup
          selectedStat={selectedStat}
          statConfig={statConfig}
          selectedStatBands={selectedStatBands}
          currentBands={currentBands}
          onSelectStat={onSelectStat}
          onToggleStatBand={onToggleStatBand}
          onSelectAll={onSelectAllStatBands}
          onClearAll={onClearAllStatBands}
        />
        <PositionFilterGroup
          selectedPositions={selectedPositions}
          positions={positions}
          onTogglePosition={onTogglePosition}
          onSelectAll={onSelectAllPositions}
          onClearAll={onClearAllPositions}
        />
      </div>
    </div>
  );
}

FilterPanelComponent.propTypes = {
  /** Array of currently selected tiers */
  selectedTiers: PropTypes.arrayOf(PropTypes.string).isRequired,
  /** Array of currently selected positions */
  selectedPositions: PropTypes.arrayOf(PropTypes.string).isRequired,
  /** Currently selected stat key */
  selectedStat: PropTypes.string.isRequired,
  /** Array of currently selected stat band values */
  selectedStatBands: PropTypes.arrayOf(PropTypes.string).isRequired,
  /** Array of all available positions */
  positions: PropTypes.arrayOf(PropTypes.string).isRequired,
  /** Array of all available tiers */
  allTiers: PropTypes.arrayOf(PropTypes.string).isRequired,
  /** Configuration object for all stats */
  statConfig: PropTypes.objectOf(
    PropTypes.shape({
      label: PropTypes.string,
      bands: PropTypes.array,
    })
  ).isRequired,
  /** Object mapping tier names to gradient CSS classes */
  tierGradients: PropTypes.objectOf(PropTypes.string).isRequired,
  /** Array of band objects for the currently selected stat */
  currentBands: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    })
  ).isRequired,
  /** Handler for toggling a tier */
  onToggleTier: PropTypes.func.isRequired,
  /** Handler for toggling a position */
  onTogglePosition: PropTypes.func.isRequired,
  /** Handler for selecting a stat */
  onSelectStat: PropTypes.func.isRequired,
  /** Handler for toggling a stat band */
  onToggleStatBand: PropTypes.func.isRequired,
  /** Handler for selecting all tiers */
  onSelectAllTiers: PropTypes.func.isRequired,
  /** Handler for clearing all tiers */
  onClearAllTiers: PropTypes.func.isRequired,
  /** Handler for selecting all positions */
  onSelectAllPositions: PropTypes.func.isRequired,
  /** Handler for clearing all positions */
  onClearAllPositions: PropTypes.func.isRequired,
  /** Handler for selecting all stat bands */
  onSelectAllStatBands: PropTypes.func.isRequired,
  /** Handler for clearing all stat bands */
  onClearAllStatBands: PropTypes.func.isRequired,
};

// Memoize to prevent unnecessary re-renders of complex filter panel
export const FilterPanel = React.memo(FilterPanelComponent);
