import { StatGrid } from './StatGrid';

export default {
  title: 'Molecules/PositionLeaders/StatGrid',
  component: StatGrid,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export const HighlightWoba = {
  args: {
    woba: '.456',
    avg: '.362',
    hr: 24,
    pa: 287,
    selectedStat: 'woba',
    rank: 1,
  }
};

export const HighlightAvg = {
  args: {
    woba: '.421',
    avg: '.334',
    hr: 19,
    pa: 245,
    selectedStat: 'avg',
    rank: 2,
  }
};

export const HighlightHR = {
  args: {
    woba: '.398',
    avg: '.318',
    hr: 45,
    pa: 198,
    selectedStat: 'hr',
    rank: 1,
  }
};

export const HighlightPA = {
  args: {
    woba: '.385',
    avg: '.301',
    hr: 15,
    pa: 602,
    selectedStat: 'pa',
    rank: 1,
  }
};

export const NoHighlight = {
  args: {
    woba: '.372',
    avg: '.295',
    hr: 12,
    pa: 165,
    selectedStat: null,
    rank: 5,
  }
};

export const MultipleExamples = {
  render: () => (
    <div className="flex flex-col gap-6 bg-gray-100 p-6 rounded-lg">
      <div className="bg-white p-4 rounded-lg">
        <h4 className="font-bold mb-2 text-sm text-gray-600">Mike Piazza (wOBA highlighted)</h4>
        <StatGrid woba=".456" avg=".362" hr={24} pa={287} selectedStat="woba" rank={1} />
      </div>
      <div className="bg-white p-4 rounded-lg">
        <h4 className="font-bold mb-2 text-sm text-gray-600">Babe Ruth (HR highlighted)</h4>
        <StatGrid woba=".583" avg=".356" hr={60} pa={356} selectedStat="hr" rank={1} />
      </div>
    </div>
  )
};
