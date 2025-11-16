import { PositionFilterGroup } from './PositionFilterGroup';
import { positions } from '@/constants/positions';

export default {
  title: 'Molecules/PositionLeaders/PositionFilterGroup',
  component: PositionFilterGroup,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export const AllSelected = {
  args: {
    selectedPositions: positions,
    positions: positions,
    onTogglePosition: (pos) => console.log('Toggle position:', pos),
    onSelectAll: () => console.log('Select all positions'),
    onClearAll: () => console.log('Clear all positions'),
  }
};

export const InfieldOnly = {
  args: {
    selectedPositions: ['C', '1B', '2B', '3B', 'SS'],
    positions: positions,
    onTogglePosition: (pos) => console.log('Toggle position:', pos),
    onSelectAll: () => console.log('Select all positions'),
    onClearAll: () => console.log('Clear all positions'),
  }
};

export const OutfieldOnly = {
  args: {
    selectedPositions: ['LF', 'CF', 'RF'],
    positions: positions,
    onTogglePosition: (pos) => console.log('Toggle position:', pos),
    onSelectAll: () => console.log('Select all positions'),
    onClearAll: () => console.log('Clear all positions'),
  }
};

export const NoneSelected = {
  args: {
    selectedPositions: [],
    positions: positions,
    onTogglePosition: (pos) => console.log('Toggle position:', pos),
    onSelectAll: () => console.log('Select all positions'),
    onClearAll: () => console.log('Clear all positions'),
  }
};
