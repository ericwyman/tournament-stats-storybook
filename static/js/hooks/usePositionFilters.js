/**
 * usePositionFilters Hook
 *
 * Custom hook for managing position leaders filter state
 */

import * as React from 'react';
import { positions } from '@/constants/positions';
import { allTiers } from '@/constants/tierConfig';

export const usePositionFilters = (initialStat = 'woba') => {
  const [selectedPositions, setSelectedPositions] = React.useState(positions);
  const [selectedTiers, setSelectedTiers] = React.useState(allTiers);
  const [selectedStatBands, setSelectedStatBands] = React.useState(['top5']);
  const [selectedStat, setSelectedStat] = React.useState(initialStat);

  const togglePosition = React.useCallback((position) => {
    setSelectedPositions(prev =>
      prev.includes(position)
        ? prev.filter(p => p !== position)
        : [...prev, position]
    );
  }, []);

  const toggleTier = React.useCallback((tier) => {
    setSelectedTiers(prev =>
      prev.includes(tier)
        ? prev.filter(t => t !== tier)
        : [...prev, tier]
    );
  }, []);

  const toggleStatBand = React.useCallback((bandValue) => {
    setSelectedStatBands(prev =>
      prev.includes(bandValue)
        ? prev.filter(b => b !== bandValue)
        : [...prev, bandValue]
    );
  }, []);

  const selectAllPositions = React.useCallback(() => {
    setSelectedPositions(positions);
  }, []);

  const clearAllPositions = React.useCallback(() => {
    setSelectedPositions([]);
  }, []);

  const selectAllTiers = React.useCallback(() => {
    setSelectedTiers(allTiers);
  }, []);

  const clearAllTiers = React.useCallback(() => {
    setSelectedTiers([]);
  }, []);

  const selectAllStatBands = React.useCallback((bands) => {
    setSelectedStatBands(bands.map(b => b.value));
  }, []);

  const clearAllStatBands = React.useCallback(() => {
    setSelectedStatBands([]);
  }, []);

  const resetFilters = React.useCallback(() => {
    setSelectedPositions(positions);
    setSelectedTiers(allTiers);
    setSelectedStatBands(['top5']);
    setSelectedStat('woba');
  }, []);

  return {
    selectedPositions,
    setSelectedPositions,
    selectedTiers,
    setSelectedTiers,
    selectedStatBands,
    setSelectedStatBands,
    selectedStat,
    setSelectedStat,
    togglePosition,
    toggleTier,
    toggleStatBand,
    selectAllPositions,
    clearAllPositions,
    selectAllTiers,
    clearAllTiers,
    selectAllStatBands,
    clearAllStatBands,
    resetFilters
  };
};
