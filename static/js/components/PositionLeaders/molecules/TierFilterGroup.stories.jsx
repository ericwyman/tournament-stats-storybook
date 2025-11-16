import { TierFilterGroup } from './TierFilterGroup';
import { allTiers, tierGradients } from '@/constants/tierConfig';

export default {
  title: 'Molecules/PositionLeaders/TierFilterGroup',
  component: TierFilterGroup,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export const AllSelected = {
  args: {
    selectedTiers: allTiers,
    allTiers: allTiers,
    onToggleTier: (tier) => console.log('Toggle tier:', tier),
    onSelectAll: () => console.log('Select all tiers'),
    onClearAll: () => console.log('Clear all tiers'),
    tierGradients: tierGradients,
  }
};

export const SomeSelected = {
  args: {
    selectedTiers: ['Perfect', 'Diamond', 'Gold'],
    allTiers: allTiers,
    onToggleTier: (tier) => console.log('Toggle tier:', tier),
    onSelectAll: () => console.log('Select all tiers'),
    onClearAll: () => console.log('Clear all tiers'),
    tierGradients: tierGradients,
  }
};

export const OnlyDiamond = {
  args: {
    selectedTiers: ['Diamond'],
    allTiers: allTiers,
    onToggleTier: (tier) => console.log('Toggle tier:', tier),
    onSelectAll: () => console.log('Select all tiers'),
    onClearAll: () => console.log('Clear all tiers'),
    tierGradients: tierGradients,
  }
};

export const NoneSelected = {
  args: {
    selectedTiers: [],
    allTiers: allTiers,
    onToggleTier: (tier) => console.log('Toggle tier:', tier),
    onSelectAll: () => console.log('Select all tiers'),
    onClearAll: () => console.log('Clear all tiers'),
    tierGradients: tierGradients,
  }
};
