import { FilterControlButton } from './FilterControlButton';

export default {
  title: 'Atoms/PositionLeaders/FilterControlButton',
  component: FilterControlButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export const SelectAll = {
  args: {
    label: 'Select All',
    variant: 'success',
    onClick: () => console.log('Select All clicked'),
  }
};

export const ClearAll = {
  args: {
    label: 'Clear All',
    variant: 'danger',
    onClick: () => console.log('Clear All clicked'),
  }
};

export const ButtonPair = {
  render: () => (
    <div className="flex items-center gap-2">
      <FilterControlButton label="Select All" variant="success" onClick={() => {}} />
      <FilterControlButton label="Clear All" variant="danger" onClick={() => {}} />
    </div>
  )
};
