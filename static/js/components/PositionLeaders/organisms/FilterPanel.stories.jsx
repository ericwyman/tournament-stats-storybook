import { FilterPanel } from './FilterPanel';
import { positions } from '@/constants/positions';
import { allTiers, tierGradients } from '@/constants/tierConfig';
import { statConfig } from '@/constants/statConfig';

export default {
  title: 'Organisms/PositionLeaders/FilterPanel',
  component: FilterPanel,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export const Default = {
  args: {
    selectedTiers: allTiers,
    selectedPositions: positions,
    selectedStat: 'woba',
    selectedStatBands: ['top5'],
    positions: positions,
    allTiers: allTiers,
    statConfig: statConfig,
    tierGradients: tierGradients,
    currentBands: statConfig.woba.bands,
    onToggleTier: (tier) => console.log('Toggle tier:', tier),
    onTogglePosition: (pos) => console.log('Toggle position:', pos),
    onSelectStat: (stat) => console.log('Select stat:', stat),
    onToggleStatBand: (band) => console.log('Toggle band:', band),
    onSelectAllTiers: () => console.log('Select all tiers'),
    onClearAllTiers: () => console.log('Clear all tiers'),
    onSelectAllPositions: () => console.log('Select all positions'),
    onClearAllPositions: () => console.log('Clear all positions'),
    onSelectAllStatBands: () => console.log('Select all bands'),
    onClearAllStatBands: () => console.log('Clear all bands'),
  }
};

export const PartialSelection = {
  args: {
    selectedTiers: ['Perfect', 'Diamond', 'Gold'],
    selectedPositions: ['C', '1B', '2B', '3B', 'SS'],
    selectedStat: 'avg',
    selectedStatBands: ['elite', 'great'],
    positions: positions,
    allTiers: allTiers,
    statConfig: statConfig,
    tierGradients: tierGradients,
    currentBands: statConfig.avg.bands,
    onToggleTier: (tier) => console.log('Toggle tier:', tier),
    onTogglePosition: (pos) => console.log('Toggle position:', pos),
    onSelectStat: (stat) => console.log('Select stat:', stat),
    onToggleStatBand: (band) => console.log('Toggle band:', band),
    onSelectAllTiers: () => console.log('Select all tiers'),
    onClearAllTiers: () => console.log('Clear all tiers'),
    onSelectAllPositions: () => console.log('Select all positions'),
    onClearAllPositions: () => console.log('Clear all positions'),
    onSelectAllStatBands: () => console.log('Select all bands'),
    onClearAllStatBands: () => console.log('Clear all bands'),
  }
};

export const HomeRunsFilter = {
  args: {
    selectedTiers: allTiers,
    selectedPositions: positions,
    selectedStat: 'hr',
    selectedStatBands: ['elite'],
    positions: positions,
    allTiers: allTiers,
    statConfig: statConfig,
    tierGradients: tierGradients,
    currentBands: statConfig.hr.bands,
    onToggleTier: (tier) => console.log('Toggle tier:', tier),
    onTogglePosition: (pos) => console.log('Toggle position:', pos),
    onSelectStat: (stat) => console.log('Select stat:', stat),
    onToggleStatBand: (band) => console.log('Toggle band:', band),
    onSelectAllTiers: () => console.log('Select all tiers'),
    onClearAllTiers: () => console.log('Clear all tiers'),
    onSelectAllPositions: () => console.log('Select all positions'),
    onClearAllPositions: () => console.log('Clear all positions'),
    onSelectAllStatBands: () => console.log('Select all bands'),
    onClearAllStatBands: () => console.log('Clear all bands'),
  }
};
