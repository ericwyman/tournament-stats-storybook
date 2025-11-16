/**
 * FilterCheckbox - Reusable checkbox for filters
 *
 * Performance: Memoized to prevent unnecessary re-renders
 * Props are validated with PropTypes in development
 */

import * as React from "react";
import PropTypes from "prop-types";
import { cn } from "@/lib/utils";

function FilterCheckboxComponent({ label, checked, onChange, variant = 'default', className }) {
  return (
    <label
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition-all duration-200",
        "border-2 hover:scale-105 hover:shadow-md cursor-pointer",
        className
      )}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className={cn(
          "w-4 h-4 rounded cursor-pointer",
          variant === 'tier' ? "accent-white" : "accent-gray-600"
        )}
      />
      <span>{label}</span>
    </label>
  );
}

FilterCheckboxComponent.propTypes = {
  /** Label text for the checkbox */
  label: PropTypes.string.isRequired,
  /** Controlled checked state */
  checked: PropTypes.bool.isRequired,
  /** Change handler function */
  onChange: PropTypes.func.isRequired,
  /** Visual variant (default or tier) */
  variant: PropTypes.oneOf(['default', 'tier']),
  /** Additional CSS classes */
  className: PropTypes.string,
};

// Memoize to prevent re-renders when props haven't changed
export const FilterCheckbox = React.memo(FilterCheckboxComponent);
