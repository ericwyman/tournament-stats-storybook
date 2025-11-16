import { PlayerCardList } from './PlayerCardList';
import { getGradientClass } from '@/utils/tierUtils';

export default {
  title: 'Organisms/PositionLeaders/PlayerCardList',
  component: PlayerCardList,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

const mockPlayers = [
  { firstName: "Mike", lastName: "Piazza", tier: "Diamond", year: "1997", woba: ".456", avg: ".362", hr: 24, pa: 287, teams: 3, ovr: 95 },
  { firstName: "Johnny", lastName: "Bench", tier: "Gold", year: "1972", woba: ".421", avg: ".334", hr: 19, pa: 245, ovr: 88 },
  { firstName: "Gary", lastName: "Carter", tier: "Silver", year: "1984", woba: ".398", avg: ".318", hr: 17, pa: 198, ovr: 82 },
  { firstName: "Carlton", lastName: "Fisk", tier: "Gold", year: "1977", woba: ".385", avg: ".301", hr: 15, pa: 176, ovr: 86 },
  { firstName: "Yogi", lastName: "Berra", tier: "Bronze", year: "1955", woba: ".372", avg: ".295", hr: 12, pa: 165, ovr: 78 }
];

export const FullList = {
  args: {
    players: mockPlayers,
    selectedStat: 'woba',
    getGradientClass: getGradientClass,
  },
  render: (args) => (
    <div className="flex flex-row gap-3 bg-gray-100 p-6 overflow-x-auto">
      <PlayerCardList {...args} />
    </div>
  )
};

export const ThreePlayers = {
  args: {
    players: mockPlayers.slice(0, 3),
    selectedStat: 'avg',
    getGradientClass: getGradientClass,
  },
  render: (args) => (
    <div className="flex flex-row gap-3 bg-gray-100 p-6 overflow-x-auto">
      <PlayerCardList {...args} />
    </div>
  )
};

export const SinglePlayer = {
  args: {
    players: [mockPlayers[0]],
    selectedStat: 'hr',
    getGradientClass: getGradientClass,
  },
  render: (args) => (
    <div className="flex flex-row gap-3 bg-gray-100 p-6">
      <PlayerCardList {...args} />
    </div>
  )
};

export const EmptyList = {
  args: {
    players: [],
    selectedStat: 'woba',
    getGradientClass: getGradientClass,
  },
  render: (args) => (
    <div className="flex flex-row gap-3 bg-gray-100 p-6">
      <PlayerCardList {...args} />
    </div>
  )
};
