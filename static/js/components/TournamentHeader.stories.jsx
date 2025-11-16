import { TournamentHeader } from './TournamentHeader';

export default {
  title: 'Organisms/TournamentHeader',
  component: TournamentHeader,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

const mockTournament = {
  name: "Silver Quicks Daily",
  tier: "silver",
  year: 2025,
  type: "Daily Tournament",
  mode: "Bo5 Finals Bo7",
  stadium: "Coors Field",
};

const mockDetails = {
  entryFee: "Free",
  dhRule: true,
  cap: "$80M",
  entrants: 512,
  spNeeded: 5,
  rpNeeded: 7,
};

const mockRunEnvironment = {
  era: "Power",
  modifiers: {
    contact: 1.05,
    hrPower: 1.10,
    eye: 0.95,
    avoidK: 0.98,
    stuff: 0.92,
    movement: 0.95,
    control: 1.00,
  },
  spPitchCount: "~105",
};

export const SilverTier = {
  args: {
    tournament: mockTournament,
    details: mockDetails,
    runEnvironment: mockRunEnvironment,
  },
};

export const GoldTier = {
  args: {
    tournament: {
      ...mockTournament,
      name: "Gold Standard Weekly",
      tier: "gold",
    },
    details: mockDetails,
    runEnvironment: mockRunEnvironment,
  },
};

export const DiamondTier = {
  args: {
    tournament: {
      ...mockTournament,
      name: "Diamond Dynasty Tournament",
      tier: "diamond",
    },
    details: {
      ...mockDetails,
      entrants: 256,
      cap: "$120M",
    },
    runEnvironment: mockRunEnvironment,
  },
};

export const PerfectTier = {
  args: {
    tournament: {
      ...mockTournament,
      name: "Perfect Storm Championship",
      tier: "perfect",
    },
    details: {
      ...mockDetails,
      entrants: 128,
      cap: "Unlimited",
      entryFee: "$50",
    },
    runEnvironment: mockRunEnvironment,
  },
};

export const WithoutRunEnvironment = {
  args: {
    tournament: mockTournament,
    details: mockDetails,
  },
  parameters: {
    docs: {
      description: {
        story: 'Tournament header without run environment data.',
      },
    },
  },
};

export const WeeklyTournament = {
  args: {
    tournament: {
      name: "Weekly Championship",
      tier: "bronze",
      year: 2024,
      type: "Weekly Tournament",
      mode: "Swiss + Playoffs",
      stadium: "Fenway Park",
    },
    details: {
      entryFee: "$10",
      dhRule: false,
      cap: "$100M",
      entrants: 384,
      spNeeded: 6,
      rpNeeded: 8,
    },
    runEnvironment: {
      era: "Balanced",
      modifiers: {
        contact: 1.00,
        hrPower: 1.00,
        eye: 1.00,
        avoidK: 1.00,
        stuff: 1.00,
        movement: 1.00,
        control: 1.00,
      },
      spPitchCount: "~100",
    },
  },
};
