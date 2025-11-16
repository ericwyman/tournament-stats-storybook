/**
 * TournamentBadge - Badge for displaying tournament status, type, or year
 *
 * Performance: Memoized to prevent re-renders
 * Props are validated with PropTypes in development
 */

import * as React from "react";
import PropTypes from "prop-types";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

function TournamentBadgeComponent({ variant, children, className }) {
  const variantStyles = {
    status: {
      active: "bg-accent text-accent-foreground border-accent",
      completed: "bg-secondary text-secondary-foreground border-secondary",
    },
    type: {
      daily: "bg-primary/10 text-primary border-primary/20",
      weekly: "bg-primary/20 text-primary border-primary/30",
    },
    year: "bg-muted text-muted-foreground border-border",
    default: "bg-muted text-muted-foreground border-border",
  };

  // Determine style based on variant
  let badgeStyle = variantStyles.default;

  if (variant === "status") {
    badgeStyle = variantStyles.status[children?.toLowerCase()] || variantStyles.default;
  } else if (variant === "type") {
    badgeStyle = variantStyles.type[children?.toLowerCase()] || variantStyles.default;
  } else if (variant === "year") {
    badgeStyle = variantStyles.year;
  }

  return (
    <Badge className={cn(badgeStyle, className)}>
      {children}
    </Badge>
  );
}

TournamentBadgeComponent.propTypes = {
  /** Badge variant (status, type, year, or default) */
  variant: PropTypes.oneOf(["status", "type", "year", "default"]),
  /** Badge content */
  children: PropTypes.node.isRequired,
  /** Additional CSS classes */
  className: PropTypes.string,
};

TournamentBadgeComponent.defaultProps = {
  variant: "default",
};

// Memoize to prevent unnecessary re-renders
export const TournamentBadge = React.memo(TournamentBadgeComponent);
