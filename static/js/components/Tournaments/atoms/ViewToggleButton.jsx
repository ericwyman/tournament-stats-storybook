/**
 * ViewToggleButton - Button for toggling between grid and list views
 *
 * Performance: Memoized to prevent re-renders
 * Props are validated with PropTypes in development
 */

import * as React from "react";
import PropTypes from "prop-types";
import { cn } from "@/lib/utils";
import { LayoutGrid, List } from "lucide-react";

function ViewToggleButtonComponent({ view, isActive, onClick }) {
  const Icon = view === "grid" ? LayoutGrid : List;

  return (
    <button
      onClick={onClick}
      className={cn(
        "px-4 py-2 rounded-lg font-bold text-sm border-2 transition-all duration-200",
        "flex items-center gap-2",
        isActive
          ? "bg-primary text-primary-foreground border-primary hover:bg-primary/90"
          : "bg-muted text-muted-foreground border-border hover:bg-muted/80"
      )}
      aria-label={`Switch to ${view} view`}
      aria-pressed={isActive}
    >
      <Icon className="w-4 h-4" />
      <span className="capitalize">{view}</span>
    </button>
  );
}

ViewToggleButtonComponent.propTypes = {
  /** View type (grid or list) */
  view: PropTypes.oneOf(["grid", "list"]).isRequired,
  /** Whether this view is currently active */
  isActive: PropTypes.bool.isRequired,
  /** Click handler function */
  onClick: PropTypes.func.isRequired,
};

// Memoize to prevent unnecessary re-renders
export const ViewToggleButton = React.memo(ViewToggleButtonComponent);
