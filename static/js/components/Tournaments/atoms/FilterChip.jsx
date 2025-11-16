/**
 * FilterChip - Checkbox-based filter chip for selections
 *
 * Performance: Memoized to prevent re-renders
 * Props are validated with PropTypes in development
 */

import * as React from "react";
import PropTypes from "prop-types";
import { cn } from "@/lib/utils";

function FilterChipComponent({ label, checked, onChange, variant, className }) {
  const chipStyle = checked
    ? "bg-primary text-primary-foreground border-transparent"
    : "bg-muted text-muted-foreground border-border opacity-60";

  return (
    <label
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition-all duration-200",
        "border-2 hover:scale-105 hover:shadow-md cursor-pointer",
        chipStyle,
        className
      )}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 rounded accent-white cursor-pointer"
      />
      <span>{label}</span>
    </label>
  );
}

FilterChipComponent.propTypes = {
  /** Label text for the chip */
  label: PropTypes.string.isRequired,
  /** Controlled checked state */
  checked: PropTypes.bool.isRequired,
  /** Change handler function */
  onChange: PropTypes.func.isRequired,
  /** Visual variant (default, year, type) */
  variant: PropTypes.oneOf(["default", "year", "type"]),
  /** Additional CSS classes */
  className: PropTypes.string,
};

FilterChipComponent.defaultProps = {
  variant: "default",
};

// Memoize to prevent unnecessary re-renders
export const FilterChip = React.memo(FilterChipComponent);
