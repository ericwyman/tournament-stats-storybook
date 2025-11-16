/**
 * PageHeader - Page title and description
 *
 * Performance: Memoized - renders once per page but prevents unnecessary updates
 * Props are validated with PropTypes in development
 */

import * as React from "react";
import PropTypes from "prop-types";

function PageHeaderComponent({ title, subtitle }) {
  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-md border border-gray-100 mb-8">
      <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-2 tracking-tight">
        {title}
      </h1>
      <p className="text-lg md:text-xl text-gray-600 font-medium">
        {subtitle}
      </p>
    </div>
  );
}

PageHeaderComponent.propTypes = {
  /** Page title */
  title: PropTypes.string.isRequired,
  /** Page subtitle/description */
  subtitle: PropTypes.string.isRequired,
};

// Memoize to prevent re-renders when parent updates
export const PageHeader = React.memo(PageHeaderComponent);
