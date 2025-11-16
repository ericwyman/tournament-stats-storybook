/**
 * TournamentFilters - Complete filtering and sorting controls
 *
 * Performance: Memoized to prevent re-renders
 * Props are validated with PropTypes in development
 */

import * as React from "react";
import PropTypes from "prop-types";
import { FilterChip } from "../atoms/FilterChip";
import { FilterBar } from "../molecules/FilterBar";

function TournamentFiltersComponent({
  // Year filters
  availableYears,
  selectedYears,
  onToggleYear,
  onSelectAllYears,
  onClearAllYears,

  // Type filter
  selectedType,
  onSelectType,

  // Status filter
  selectedStatus,
  onSelectStatus,

  // Sorting
  sortBy,
  onSort,

  // Clear all
  onClearAll,
}) {
  return (
    <div className="bg-card rounded-2xl p-6 shadow-md border border-border mb-8">
      <div className="space-y-6">
        {/* Year Filter */}
        <FilterBar
          title="Filter by Year"
          onSelectAll={onSelectAllYears}
          onClearAll={onClearAllYears}
        >
          {availableYears.map(year => (
            <FilterChip
              key={year}
              label={String(year)}
              checked={selectedYears.includes(year)}
              onChange={() => onToggleYear(year)}
              variant="year"
            />
          ))}
        </FilterBar>

        {/* Type & Status Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Type Filter */}
          <div>
            <h3 className="text-sm font-bold text-foreground/90 uppercase tracking-wider mb-3">
              Tournament Type
            </h3>
            <select
              value={selectedType}
              onChange={(e) => onSelectType(e.target.value)}
              className="w-full px-4 py-2 rounded-lg font-medium text-sm bg-card border-2 border-border cursor-pointer hover:border-primary transition-all duration-200"
            >
              <option value="all">All Types</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <h3 className="text-sm font-bold text-foreground/90 uppercase tracking-wider mb-3">
              Status
            </h3>
            <select
              value={selectedStatus}
              onChange={(e) => onSelectStatus(e.target.value)}
              className="w-full px-4 py-2 rounded-lg font-medium text-sm bg-card border-2 border-border cursor-pointer hover:border-primary transition-all duration-200"
            >
              <option value="all">All Tournaments</option>
              <option value="active">Active Only</option>
              <option value="completed">Completed Only</option>
            </select>
          </div>
        </div>

        {/* Sort & Clear Controls */}
        <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-border">
          {/* Sort By */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-bold text-foreground/90 uppercase tracking-wider">
              Sort by:
            </label>
            <select
              value={sortBy}
              onChange={(e) => onSort(e.target.value)}
              className="px-4 py-2 rounded-lg font-medium text-sm bg-primary text-primary-foreground border-2 border-primary cursor-pointer hover:bg-primary/90 transition-all duration-200"
            >
              <option value="recent">Most Recent</option>
              <option value="oldest">Oldest First</option>
              <option value="name_asc">Name (A-Z)</option>
              <option value="name_desc">Name (Z-A)</option>
              <option value="entrants_desc">Most Entrants</option>
              <option value="entrants_asc">Fewest Entrants</option>
            </select>
          </div>

          {/* Clear Filters */}
          <button
            onClick={onClearAll}
            className="ml-auto px-3 py-2 rounded-lg font-bold text-xs bg-destructive/10 text-destructive border-2 border-destructive/20 hover:bg-destructive/20 transition-all duration-200"
          >
            Clear All Filters
          </button>
        </div>
      </div>
    </div>
  );
}

TournamentFiltersComponent.propTypes = {
  // Year filters
  /** Array of available years */
  availableYears: PropTypes.arrayOf(PropTypes.number).isRequired,
  /** Array of selected years */
  selectedYears: PropTypes.arrayOf(PropTypes.number).isRequired,
  /** Handler for toggling a year */
  onToggleYear: PropTypes.func.isRequired,
  /** Handler for selecting all years */
  onSelectAllYears: PropTypes.func.isRequired,
  /** Handler for clearing all years */
  onClearAllYears: PropTypes.func.isRequired,

  // Type filter
  /** Selected type (all, daily, weekly) */
  selectedType: PropTypes.oneOf(["all", "daily", "weekly"]).isRequired,
  /** Handler for selecting type */
  onSelectType: PropTypes.func.isRequired,

  // Status filter
  /** Selected status (all, active, completed) */
  selectedStatus: PropTypes.oneOf(["all", "active", "completed"]).isRequired,
  /** Handler for selecting status */
  onSelectStatus: PropTypes.func.isRequired,

  // Sorting
  /** Current sort option */
  sortBy: PropTypes.string.isRequired,
  /** Handler for changing sort */
  onSort: PropTypes.func.isRequired,

  // Clear all
  /** Handler for clearing all filters */
  onClearAll: PropTypes.func.isRequired,
};

// Memoize to prevent unnecessary re-renders
export const TournamentFilters = React.memo(TournamentFiltersComponent);
