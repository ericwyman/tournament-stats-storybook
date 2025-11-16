import { StatBandFilterGroup } from './StatBandFilterGroup';
import { statConfig } from '@/constants/statConfig';

export default {
  title: 'Molecules/PositionLeaders/StatBandFilterGroup',
  component: StatBandFilterGroup,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export const WobaSelected = {
  args: {
    selectedStat: 'woba',
    statConfig: statConfig,
    selectedStatBands: ['top5'],
    currentBands: statConfig.woba.bands,
    onSelectStat: (stat) => console.log('Select stat:', stat),
    onToggleStatBand: (band) => console.log('Toggle band:', band),
    onSelectAll: () => console.log('Select all bands'),
    onClearAll: () => console.log('Clear all bands'),
  }
};

export const AvgMultipleBands = {
  args: {
    selectedStat: 'avg',
    statConfig: statConfig,
    selectedStatBands: ['elite', 'great'],
    currentBands: statConfig.avg.bands,
    onSelectStat: (stat) => console.log('Select stat:', stat),
    onToggleStatBand: (band) => console.log('Toggle band:', band),
    onSelectAll: () => console.log('Select all bands'),
    onClearAll: () => console.log('Clear all bands'),
  }
};

export const HomeRunsAllBands = {
  args: {
    selectedStat: 'hr',
    statConfig: statConfig,
    selectedStatBands: ['top5', 'elite', 'great', 'good', 'average'],
    currentBands: statConfig.hr.bands,
    onSelectStat: (stat) => console.log('Select stat:', stat),
    onToggleStatBand: (band) => console.log('Toggle band:', band),
    onSelectAll: () => console.log('Select all bands'),
    onClearAll: () => console.log('Clear all bands'),
  }
};

export const NoBandsSelected = {
  args: {
    selectedStat: 'pa',
    statConfig: statConfig,
    selectedStatBands: [],
    currentBands: statConfig.pa.bands,
    onSelectStat: (stat) => console.log('Select stat:', stat),
    onToggleStatBand: (band) => console.log('Toggle band:', band),
    onSelectAll: () => console.log('Select all bands'),
    onClearAll: () => console.log('Clear all bands'),
  }
};
