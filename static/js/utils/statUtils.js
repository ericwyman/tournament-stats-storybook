/**
 * Statistical Utilities
 *
 * Helper functions for stat-related operations
 */

export const getStatValue = (player, statType) => {
  switch (statType) {
    case 'woba':
      return parseFloat(player.woba);
    case 'avg':
      return parseFloat(player.avg);
    case 'hr':
      return parseInt(player.hr);
    case 'pa':
      return parseInt(player.pa);
    default:
      return 0;
  }
};
