/**
 * Tier Configuration
 *
 * Defines tier gradients and border styles for player card tiers
 */

export const tierGradients = {
  'Iron': 'gradient-iron',
  'Bronze': 'gradient-bronze',
  'Silver': 'gradient-silver',
  'Gold': 'gradient-gold',
  'Diamond': 'gradient-diamond',
  'Perfect': 'gradient-perfect'
};

export const borderGradients = {
  'Iron': 'linear-gradient(to bottom right, rgb(55 65 81), rgb(88 28 135))',
  'Bronze': 'linear-gradient(to bottom right, rgb(154 52 18), rgb(127 29 29))',
  'Silver': 'linear-gradient(to bottom right, rgb(100 116 139), rgb(107 114 128))',
  'Gold': 'linear-gradient(to bottom right, rgb(161 98 7), rgb(133 77 14))',
  'Diamond': 'linear-gradient(to bottom right, rgb(8 145 178), rgb(51 65 85))',
  'Perfect': 'linear-gradient(to bottom right, rgb(17 24 39), rgb(113 63 18))'
};

export const allTiers = ['Perfect', 'Diamond', 'Gold', 'Silver', 'Bronze', 'Iron'];
