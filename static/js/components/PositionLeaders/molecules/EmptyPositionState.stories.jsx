import { EmptyPositionState } from './EmptyPositionState';

export default {
  title: 'Molecules/PositionLeaders/EmptyPositionState',
  component: EmptyPositionState,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export const Default = {
  args: {
    minPA: 50,
  }
};

export const HighMinimum = {
  args: {
    minPA: 100,
  }
};

export const LowMinimum = {
  args: {
    minPA: 25,
  }
};

export const InContext = {
  render: () => (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 p-8 w-[600px]">
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 mb-4 border-l-4 border-l-blue-600">
        <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
          2B
        </h2>
        <p className="text-sm text-gray-600 font-medium mt-1">
          Minimum 50 PA
        </p>
      </div>
      <EmptyPositionState minPA={50} />
    </div>
  )
};
