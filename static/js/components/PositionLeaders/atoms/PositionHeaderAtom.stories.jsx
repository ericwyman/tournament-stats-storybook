import { PositionHeaderAtom } from './PositionHeaderAtom';

export default {
  title: 'Atoms/PositionLeaders/PositionHeaderAtom',
  component: PositionHeaderAtom,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export const Catcher = {
  args: {
    position: 'C',
  }
};

export const CenterField = {
  args: {
    position: 'CF',
  }
};

export const Shortstop = {
  args: {
    position: 'SS',
  }
};

export const CustomSubtitle = {
  args: {
    position: 'RF',
    subtitle: 'Minimum 100 PA',
  }
};

export const AllPositions = {
  render: () => (
    <div className="flex flex-col gap-4 w-[400px]">
      <PositionHeaderAtom position="C" />
      <PositionHeaderAtom position="1B" />
      <PositionHeaderAtom position="2B" />
      <PositionHeaderAtom position="3B" />
      <PositionHeaderAtom position="SS" />
      <PositionHeaderAtom position="LF" />
      <PositionHeaderAtom position="CF" />
      <PositionHeaderAtom position="RF" />
      <PositionHeaderAtom position="DH" />
    </div>
  )
};
