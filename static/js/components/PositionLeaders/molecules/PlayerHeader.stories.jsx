import { PlayerHeader } from './PlayerHeader';

export default {
  title: 'Molecules/PositionLeaders/PlayerHeader',
  component: PlayerHeader,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export const Perfect = {
  args: {
    overall: 100,
    rank: 1,
    tier: 'Perfect',
    tierGradient: 'gradient-perfect',
  }
};

export const Diamond = {
  args: {
    overall: 95,
    rank: 2,
    tier: 'Diamond',
    tierGradient: 'gradient-diamond',
  }
};

export const Gold = {
  args: {
    overall: 88,
    rank: 3,
    tier: 'Gold',
    tierGradient: 'gradient-gold',
  }
};

export const Silver = {
  args: {
    overall: 82,
    rank: 4,
    tier: 'Silver',
    tierGradient: 'gradient-silver',
  }
};

export const Bronze = {
  args: {
    overall: 78,
    rank: 5,
    tier: 'Bronze',
    tierGradient: 'gradient-bronze',
  }
};

export const Iron = {
  args: {
    overall: 71,
    rank: 6,
    tier: 'Iron',
    tierGradient: 'gradient-iron',
  }
};

export const AllTiers = {
  render: () => (
    <div className="flex flex-col gap-4 bg-white p-6 rounded-lg w-[400px]">
      <PlayerHeader overall={100} rank={1} tier="Perfect" tierGradient="gradient-perfect" />
      <PlayerHeader overall={95} rank={2} tier="Diamond" tierGradient="gradient-diamond" />
      <PlayerHeader overall={88} rank={3} tier="Gold" tierGradient="gradient-gold" />
      <PlayerHeader overall={82} rank={4} tier="Silver" tierGradient="gradient-silver" />
      <PlayerHeader overall={78} rank={5} tier="Bronze" tierGradient="gradient-bronze" />
      <PlayerHeader overall={71} rank={6} tier="Iron" tierGradient="gradient-iron" />
    </div>
  )
};
