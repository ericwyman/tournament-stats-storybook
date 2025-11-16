import { PlayerName } from './PlayerName';

export default {
  title: 'Molecules/PositionLeaders/PlayerName',
  component: PlayerName,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export const Default = {
  args: {
    firstName: 'Mike',
    lastName: 'Piazza',
    year: '1997',
  }
};

export const LegendaryPlayer = {
  args: {
    firstName: 'Babe',
    lastName: 'Ruth',
    year: '1927',
  }
};

export const ModernPlayer = {
  args: {
    firstName: 'Mike',
    lastName: 'Trout',
    year: '2018',
  }
};

export const MultipleExamples = {
  render: () => (
    <div className="flex flex-col gap-4 bg-white p-6 rounded-lg">
      <PlayerName firstName="Mickey" lastName="Mantle" year="1957" />
      <PlayerName firstName="Ted" lastName="Williams" year="1941" />
      <PlayerName firstName="Willie" lastName="Mays" year="1965" />
      <PlayerName firstName="Barry" lastName="Bonds" year="2002" />
    </div>
  )
};
