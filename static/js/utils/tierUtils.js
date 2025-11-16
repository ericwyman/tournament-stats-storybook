/**
 * Tier Utilities
 *
 * Helper functions for tier-related operations
 */

import { tierGradients, borderGradients } from '@/constants/tierConfig';

export const getGradientClass = (tier) => {
  return tierGradients[tier] || 'gradient-iron';
};

export const getBorderGradient = (tier) => {
  return borderGradients[tier] || borderGradients['Iron'];
};
