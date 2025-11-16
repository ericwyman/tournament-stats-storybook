import { PositionSection } from './PositionSection';
import { getGradientClass } from '@/utils/tierUtils';

export default {
  title: 'Molecules/PositionLeaders/PositionSection',
  component: PositionSection,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

const mockPlayers = [
  { firstName: "Mike", lastName: "Piazza", tier: "Diamond", year: "1997", woba: ".456", avg: ".362", hr: 24, pa: 287, teams: 3, ovr: 95 },
  { firstName: "Johnny", lastName: "Bench", tier: "Gold", year: "1972", woba: ".421", avg: ".334", hr: 19, pa: 245, ovr: 88 },
  { firstName: "Gary", lastName: "Carter", tier: "Silver", year: "1984", woba: ".398", avg: ".318", hr: 17, pa: 198, ovr: 82 },
];

const renderPlayerCard = (player, index) => (
  <div key={index} className="bg-white rounded-lg p-4 border shadow-sm flex-1 min-w-[280px]">
    <div className="font-bold text-lg">{player.firstName} {player.lastName}</div>
    <div className="text-sm text-gray-600">{player.year}</div>
    <div className="text-xs text-gray-500 mt-2">wOBA: {player.woba} | AVG: {player.avg}</div>
  </div>
);

export const WithPlayers = {
  args: {
    position: 'C',
    players: mockPlayers,
    selectedStat: 'woba',
    getGradientClass: getGradientClass,
    renderPlayerCard: renderPlayerCard,
  }
};

export const EmptyPosition = {
  args: {
    position: 'DH',
    players: [],
    selectedStat: 'woba',
    getGradientClass: getGradientClass,
    renderPlayerCard: renderPlayerCard,
  }
};

export const SinglePlayer = {
  args: {
    position: 'CF',
    players: [mockPlayers[0]],
    selectedStat: 'woba',
    getGradientClass: getGradientClass,
    renderPlayerCard: renderPlayerCard,
  }
};

export const HigherMinimum = {
  args: {
    position: '1B',
    players: mockPlayers,
    selectedStat: 'woba',
    getGradientClass: getGradientClass,
    minPA: 100,
    renderPlayerCard: renderPlayerCard,
  }
};
