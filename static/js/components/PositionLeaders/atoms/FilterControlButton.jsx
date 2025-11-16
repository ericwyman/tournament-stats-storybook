/**
 * FilterControlButton - Select All / Clear All buttons for filters
 *
 * Performance: Memoized - used in filter panels that may re-render
 * Props are validated with PropTypes in development
 */

import * as React from "react";
import PropTypes from "prop-types";
import { cn } from "@/lib/utils";

function FilterControlButtonComponent({ label, onClick, variant = 'success' }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-3 py-2 rounded-lg font-bold text-xs border-2 transition-all duration-200",
        variant === 'success' && "bg-green-100 text-green-700 border-green-300 hover:bg-green-200",
        variant === 'danger' && "bg-red-100 text-red-700 border-red-300 hover:bg-red-200"
      )}
    >
      {label}
    </button>
  );
}

FilterControlButtonComponent.propTypes = {
  /** Button label text */
  label: PropTypes.string.isRequired,
  /** Click handler function */
  onClick: PropTypes.func.isRequired,
  /** Visual variant (success or danger) */
  variant: PropTypes.oneOf(['success', 'danger']),
};

// Memoize to prevent re-renders in filter panels
export const FilterControlButton = React.memo(FilterControlButtonComponent);
