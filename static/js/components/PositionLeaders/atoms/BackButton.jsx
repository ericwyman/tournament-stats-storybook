/**
 * BackButton - Navigation button to return to previous page
 *
 * Performance: Memoized to prevent re-renders when parent updates
 * Props are validated with PropTypes in development
 */

import * as React from "react";
import PropTypes from "prop-types";
import { Button } from "@/components/ui/button";

function BackButtonComponent({ onClick, text = "← Back to Tournament" }) {
  return (
    <Button
      onClick={onClick}
      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-200 hover:-translate-y-0.5"
    >
      {text}
    </Button>
  );
}

BackButtonComponent.propTypes = {
  /** Click handler function */
  onClick: PropTypes.func.isRequired,
  /** Button text to display */
  text: PropTypes.string,
};

// Memoize to prevent re-renders when parent component updates
export const BackButton = React.memo(BackButtonComponent);
