/**
 * WelcomeHero - Welcome hero section with branding
 *
 * Performance: Memoized to prevent re-renders
 * Props are validated with PropTypes in development
 */

import * as React from "react";
import PropTypes from "prop-types";
import { Trophy } from "lucide-react";

function WelcomeHeroComponent({ title, subtitle, description }) {
  return (
    <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 md:p-12 shadow-xl border border-primary mb-8">
      <div className="flex items-start gap-6">
        <div className="bg-white/10 p-4 rounded-xl">
          <Trophy className="w-12 h-12 text-white" />
        </div>
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-black text-primary-foreground mb-3 tracking-tight">
            {title}
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 font-semibold mb-4">
            {subtitle}
          </p>
          {description && (
            <p className="text-base text-primary-foreground/80 max-w-3xl">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

WelcomeHeroComponent.propTypes = {
  /** Main title */
  title: PropTypes.string.isRequired,
  /** Subtitle text */
  subtitle: PropTypes.string.isRequired,
  /** Optional description text */
  description: PropTypes.string,
};

WelcomeHeroComponent.defaultProps = {
  title: "Tournament Stats App",
  subtitle: "Explore OOTP Tournament Data",
  description: "Browse tournaments, analyze player statistics, and track performance across multiple competitions.",
};

// Memoize to prevent unnecessary re-renders
export const WelcomeHero = React.memo(WelcomeHeroComponent);
