import TournamentDetails from './TournamentDetails';

export default {
  title: 'Organisms/TournamentDetails',
  component: TournamentDetails,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

// Default tournament
export const Default = {
  args: {
    tournament: {
      name: 'Daily Gold Cap',
      year: 1996,
      type: 'Daily',
      mode: 'Bo5 Finals Bo7',
      stadium: '1995 Coors Field',
      entry_fee: 'Free',
      dh_rule: true,
      cap: 1822,
      entrants: 64,
      park_factors: {
        park: { lefty: 105.2, righty: 103.8 },
        gap: { lefty: 102.5, righty: 101.2 },
        power: { lefty: 108.5, righty: 106.3 },
        babip: { lefty: 104.1, righty: 103.0 }
      }
    }
  }
};

// Perfect tier tournament
export const PerfectTier = {
  args: {
    tournament: {
      name: 'Weekly Perfect No Cap',
      year: 2024,
      type: 'Weekly',
      mode: 'Bo7 Finals Bo9',
      stadium: '1999 Coors Field',
      entry_fee: '50,000',
      dh_rule: false,
      cap: 5000,
      entrants: 128,
      park_factors: {
        park: { lefty: 110.5, righty: 108.2 },
        gap: { lefty: 106.3, righty: 104.8 },
        power: { lefty: 115.2, righty: 112.7 },
        babip: { lefty: 107.5, righty: 106.1 }
      }
    }
  }
};

// Diamond tier tournament
export const DiamondTier = {
  args: {
    tournament: {
      name: 'Daily Diamond Tier',
      year: 2008,
      type: 'Daily',
      mode: 'Bo5 Finals Bo7',
      stadium: '2004 Fenway Park',
      entry_fee: 'Free',
      dh_rule: true,
      cap: 2500,
      entrants: 64,
      park_factors: {
        park: { lefty: 102.8, righty: 98.5 },
        gap: { lefty: 101.2, righty: 99.8 },
        power: { lefty: 106.5, righty: 101.2 },
        babip: { lefty: 103.2, righty: 100.5 }
      }
    }
  }
};

// Gold tier tournament
export const GoldTier = {
  args: {
    tournament: {
      name: 'Weekly Gold Classic',
      year: 1984,
      type: 'Weekly',
      mode: 'Bo5 Finals Bo7',
      stadium: '1980 Veterans Stadium',
      entry_fee: '25,000',
      dh_rule: false,
      cap: 2000,
      entrants: 96,
      park_factors: {
        park: { lefty: 100.0, righty: 100.0 },
        gap: { lefty: 100.0, righty: 100.0 },
        power: { lefty: 100.0, righty: 100.0 },
        babip: { lefty: 100.0, righty: 100.0 }
      }
    }
  }
};

// Silver tier tournament
export const SilverTier = {
  args: {
    tournament: {
      name: 'Daily Silver Cap',
      year: 1977,
      type: 'Daily',
      mode: 'Bo5 Finals Bo7',
      stadium: '1975 Astrodome',
      entry_fee: 'Free',
      dh_rule: true,
      cap: 1500,
      entrants: 48,
      park_factors: {
        park: { lefty: 95.5, righty: 96.2 },
        gap: { lefty: 97.8, righty: 98.5 },
        power: { lefty: 92.3, righty: 93.8 },
        babip: { lefty: 96.5, righty: 97.2 }
      }
    }
  }
};

// Bronze tier tournament
export const BronzeTier = {
  args: {
    tournament: {
      name: 'Daily Bronze Tier',
      year: 1955,
      type: 'Daily',
      mode: 'Bo5 Finals Bo7',
      stadium: '1950 Polo Grounds',
      entry_fee: 'Free',
      dh_rule: false,
      cap: 1200,
      entrants: 32,
      park_factors: {
        park: { lefty: 98.2, righty: 99.5 },
        gap: { lefty: 99.1, righty: 100.3 },
        power: { lefty: 97.5, righty: 98.8 },
        babip: { lefty: 99.0, righty: 100.1 }
      }
    }
  }
};

// Iron tier tournament
export const IronTier = {
  args: {
    tournament: {
      name: 'Weekly Iron Challenge',
      year: 2006,
      type: 'Weekly',
      mode: 'Bo5 Finals Bo7',
      stadium: '2000 Network Associates Coliseum',
      entry_fee: '10,000',
      dh_rule: true,
      cap: 800,
      entrants: 24,
      park_factors: {
        park: { lefty: 97.5, righty: 98.2 },
        gap: { lefty: 98.8, righty: 99.5 },
        power: { lefty: 96.3, righty: 97.0 },
        babip: { lefty: 98.5, righty: 99.2 }
      }
    }
  }
};

// Pitcher-friendly park
export const PitchersFriendly = {
  args: {
    tournament: {
      name: 'Dead Ball Era Classic',
      year: 1968,
      type: 'Daily',
      mode: 'Bo5 Finals Bo7',
      stadium: '1965 Dodger Stadium',
      entry_fee: 'Free',
      dh_rule: false,
      cap: 1800,
      entrants: 64,
      park_factors: {
        park: { lefty: 88.5, righty: 89.2 },
        gap: { lefty: 90.3, righty: 91.0 },
        power: { lefty: 85.7, righty: 86.5 },
        babip: { lefty: 92.1, righty: 92.8 }
      }
    }
  }
};

// Hitters paradise
export const HittersParadise = {
  args: {
    tournament: {
      name: 'Coors Field Slugfest',
      year: 2001,
      type: 'Weekly',
      mode: 'Bo7 Finals Bo9',
      stadium: '2000 Coors Field',
      entry_fee: '100,000',
      dh_rule: true,
      cap: 3000,
      entrants: 128,
      park_factors: {
        park: { lefty: 118.5, righty: 116.2 },
        gap: { lefty: 112.8, righty: 110.5 },
        power: { lefty: 125.3, righty: 122.1 },
        babip: { lefty: 115.7, righty: 113.9 }
      }
    }
  }
};

// No DH rule
export const NoDH = {
  args: {
    tournament: {
      name: 'National League Style',
      year: 1987,
      type: 'Daily',
      mode: 'Bo5 Finals Bo7',
      stadium: '1985 Wrigley Field',
      entry_fee: 'Free',
      dh_rule: false,
      cap: 1750,
      entrants: 48,
      park_factors: {
        park: { lefty: 102.5, righty: 101.8 },
        gap: { lefty: 101.3, righty: 100.7 },
        power: { lefty: 103.8, righty: 102.5 },
        babip: { lefty: 102.1, righty: 101.4 }
      }
    }
  }
};

// Large tournament
export const LargeTournament = {
  args: {
    tournament: {
      name: 'Championship Series',
      year: 2024,
      type: 'Weekly',
      mode: 'Bo7 Finals Bo9',
      stadium: '2020 Globe Life Field',
      entry_fee: '250,000',
      dh_rule: true,
      cap: 4000,
      entrants: 256,
      park_factors: {
        park: { lefty: 101.2, righty: 100.8 },
        gap: { lefty: 100.5, righty: 100.3 },
        power: { lefty: 102.1, righty: 101.5 },
        babip: { lefty: 100.8, righty: 100.5 }
      }
    }
  }
};

// Small tournament
export const SmallTournament = {
  args: {
    tournament: {
      name: 'Quick Match Daily',
      year: 2015,
      type: 'Daily',
      mode: 'Bo3 Finals Bo5',
      stadium: '2010 Kauffman Stadium',
      entry_fee: 'Free',
      dh_rule: true,
      cap: 1000,
      entrants: 16,
      park_factors: {
        park: { lefty: 99.5, righty: 99.8 },
        gap: { lefty: 100.2, righty: 100.5 },
        power: { lefty: 98.8, righty: 99.2 },
        babip: { lefty: 99.9, righty: 100.1 }
      }
    }
  }
};

// Neutral park
export const NeutralPark = {
  args: {
    tournament: {
      name: 'Balanced Tournament',
      year: 2010,
      type: 'Daily',
      mode: 'Bo5 Finals Bo7',
      stadium: '2008 Busch Stadium',
      entry_fee: '15,000',
      dh_rule: true,
      cap: 1900,
      entrants: 64,
      park_factors: {
        park: { lefty: 100.0, righty: 100.0 },
        gap: { lefty: 100.0, righty: 100.0 },
        power: { lefty: 100.0, righty: 100.0 },
        babip: { lefty: 100.0, righty: 100.0 }
      }
    }
  }
};
