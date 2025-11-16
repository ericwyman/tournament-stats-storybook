/**
 * FilterBar - Filter controls bar with select All/Clear buttons
 *
 * Performance: Memoized to prevent re-renders
 * Props are validated with PropTypes in development
 */

import * as React from "react";
import PropTypes from "prop-types";
import { cn } from "@/lib/utils";

function FilterBarComponent({ title, onSelectAll, onClearAll, className, children }) {
  return (
    <div className={cn("space-y-3", className)}>
      {title && (
        <h3 className="text-sm font-bold text-foreground/90 uppercase tracking-wider">
          {title}
        </h3>
      )}
      <div className="flex flex-wrap gap-3">
        {children}
        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={onSelectAll}
            className="px-3 py-2 rounded-lg font-bold text-xs bg-accent text-accent-foreground border-2 border-accent hover:bg-accent/90 transition-all duration-200"
          >
            Select All
          </button>
          <button
            onClick={onClearAll}
            className="px-3 py-2 rounded-lg font-bold text-xs bg-destructive/10 text-destructive border-2 border-destructive/20 hover:bg-destructive/20 transition-all duration-200"
          >
            Clear All
          </button>
        </div>
      </div>
    </div>
  );
}

FilterBarComponent.propTypes = {
  /** Filter section title */
  title: PropTypes.string,
  /** Handler for selecting all filters */
  onSelectAll: PropTypes.func.isRequired,
  /** Handler for clearing all filters */
  onClearAll: PropTypes.func.isRequired,
  /** Additional CSS classes */
  className: PropTypes.string,
  /** Filter chips or controls */
  children: PropTypes.node.isRequired,
};

// Memoize to prevent unnecessary re-renders
export const FilterBar = React.memo(FilterBarComponent);
