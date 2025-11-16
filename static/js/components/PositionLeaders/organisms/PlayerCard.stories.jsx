import { PlayerCard } from './PlayerCard';
import { getGradientClass } from '@/utils/tierUtils';

export default {
  title: 'Organisms/PositionLeaders/PlayerCard',
  component: PlayerCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

const mockPlayerPerfect = {
  firstName: "Babe",
  lastName: "Ruth",
  tier: "Perfect",
  year: "1927",
  woba: ".583",
  avg: ".356",
  hr: 60,
  pa: 356,
  teams: 6,
  ovr: 100
};

const mockPlayerDiamond = {
  firstName: "Mike",
  lastName: "Piazza",
  tier: "Diamond",
  year: "1997",
  woba: ".456",
  avg: ".362",
  hr: 24,
  pa: 287,
  teams: 3,
  ovr: 95
};

const mockPlayerGold = {
  firstName: "Johnny",
  lastName: "Bench",
  tier: "Gold",
  year: "1972",
  woba: ".421",
  avg: ".334",
  hr: 19,
  pa: 245,
  ovr: 88
};

const mockPlayerSilver = {
  firstName: "Gary",
  lastName: "Carter",
  tier: "Silver",
  year: "1984",
  woba: ".398",
  avg: ".318",
  hr: 17,
  pa: 198,
  ovr: 82
};

const mockPlayerBronze = {
  firstName: "Yogi",
  lastName: "Berra",
  tier: "Bronze",
  year: "1955",
  woba: ".372",
  avg: ".295",
  hr: 12,
  pa: 165,
  ovr: 78
};

export const PerfectTier = {
  args: {
    player: mockPlayerPerfect,
    rank: 1,
    selectedStat: 'woba',
    getGradientClass: getGradientClass,
  }
};

export const DiamondTier = {
  args: {
    player: mockPlayerDiamond,
    rank: 2,
    selectedStat: 'woba',
    getGradientClass: getGradientClass,
  }
};

export const GoldTier = {
  args: {
    player: mockPlayerGold,
    rank: 3,
    selectedStat: 'woba',
    getGradientClass: getGradientClass,
  }
};

export const SilverTier = {
  args: {
    player: mockPlayerSilver,
    rank: 4,
    selectedStat: 'avg',
    getGradientClass: getGradientClass,
  }
};

export const BronzeTier = {
  args: {
    player: mockPlayerBronze,
    rank: 5,
    selectedStat: 'hr',
    getGradientClass: getGradientClass,
  }
};

export const MultipleCards = {
  render: () => (
    <div className="flex gap-3 bg-gray-100 p-6 overflow-x-auto">
      <PlayerCard player={mockPlayerPerfect} rank={1} selectedStat="woba" getGradientClass={getGradientClass} />
      <PlayerCard player={mockPlayerDiamond} rank={2} selectedStat="woba" getGradientClass={getGradientClass} />
      <PlayerCard player={mockPlayerGold} rank={3} selectedStat="woba" getGradientClass={getGradientClass} />
    </div>
  )
};
