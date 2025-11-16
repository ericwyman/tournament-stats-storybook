import { StatBox } from './StatBox';

export default {
  title: 'Atoms/PositionLeaders/StatBox',
  component: StatBox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export const Default = {
  args: {
    label: 'AVG',
    value: '.325',
    isHighlighted: false,
  }
};

export const Highlighted = {
  args: {
    label: 'wOBA',
    value: '.456',
    isHighlighted: true,
  }
};

export const WithRank = {
  args: {
    label: 'wOBA',
    value: '.456',
    isHighlighted: true,
    rank: 1,
  }
};

export const HomeRuns = {
  args: {
    label: 'HR',
    value: 45,
    isHighlighted: false,
  }
};

export const PlateAppearances = {
  args: {
    label: 'PA',
    value: 602,
    isHighlighted: false,
  }
};

export const StatGrid = {
  render: () => (
    <div className="grid grid-cols-2 gap-2 w-[320px]">
      <StatBox label="wOBA" value=".456" isHighlighted={true} rank={1} />
      <StatBox label="AVG" value=".362" isHighlighted={false} />
      <StatBox label="HR" value={24} isHighlighted={false} />
      <StatBox label="PA" value={287} isHighlighted={false} />
    </div>
  )
};
