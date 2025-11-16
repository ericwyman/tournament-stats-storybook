import { FilterCheckbox } from './FilterCheckbox';

export default {
  title: 'Atoms/PositionLeaders/FilterCheckbox',
  component: FilterCheckbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export const Default = {
  args: {
    label: 'Option 1',
    checked: false,
    onChange: () => {},
  }
};

export const Checked = {
  args: {
    label: 'Selected Option',
    checked: true,
    onChange: () => {},
  }
};

export const TierVariant = {
  args: {
    label: 'Diamond',
    checked: true,
    onChange: () => {},
    variant: 'tier',
    className: 'gradient-diamond text-white border-transparent'
  }
};

export const PositionVariant = {
  args: {
    label: 'CF',
    checked: true,
    onChange: () => {},
    variant: 'position',
    className: 'bg-gray-300 text-gray-800 border-transparent'
  }
};

export const StatBandVariant = {
  args: {
    label: 'Elite (.400+)',
    checked: true,
    onChange: () => {},
    variant: 'stat',
    className: 'bg-blue-600 text-white border-transparent'
  }
};

export const Unchecked = {
  args: {
    label: 'Bronze',
    checked: false,
    onChange: () => {},
    variant: 'tier',
    className: 'bg-gray-200 text-gray-500 border-gray-300 opacity-60'
  }
};
