import { PlayerHeaderCompact } from './PlayerHeaderCompact';

export default {
  title: 'Organisms/PlayerHeaderCompact',
  component: PlayerHeaderCompact,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

// Default story
export const Default = {
  args: {
    player: {
      position: 'CF',
      firstName: 'Mickey',
      lastName: 'Mantle',
      tier: 'perfect',
      year: '1957'
    },
    stats: {
      formats: 12,
      teams: 45,
      games: 156,
      atBats: 542
    }
  }
};

// Diamond tier player
export const DiamondTier = {
  args: {
    player: {
      position: 'LF',
      firstName: 'Ted',
      lastName: 'Williams',
      tier: 'diamond',
      year: '1941'
    },
    stats: {
      formats: 8,
      teams: 32,
      games: 143,
      atBats: 456
    }
  }
};

// Gold tier player
export const GoldTier = {
  args: {
    player: {
      position: 'RF',
      firstName: 'Hank',
      lastName: 'Aaron',
      tier: 'gold',
      year: '1971'
    },
    stats: {
      formats: 15,
      teams: 58,
      games: 189,
      atBats: 623
    }
  }
};

// Silver tier player
export const SilverTier = {
  args: {
    player: {
      position: '2B',
      firstName: 'Chase',
      lastName: 'Utley',
      tier: 'silver',
      year: '2008'
    },
    stats: {
      formats: 6,
      teams: 24,
      games: 134,
      atBats: 489
    }
  }
};

// Bronze tier player
export const BronzeTier = {
  args: {
    player: {
      position: 'C',
      firstName: 'Yogi',
      lastName: 'Berra',
      tier: 'bronze',
      year: '1955'
    },
    stats: {
      formats: 4,
      teams: 18,
      games: 98,
      atBats: 341
    }
  }
};

// Iron tier player
export const IronTier = {
  args: {
    player: {
      position: '3B',
      firstName: 'Travis',
      lastName: 'Hafner',
      tier: 'iron',
      year: '2006'
    },
    stats: {
      formats: 2,
      teams: 8,
      games: 65,
      atBats: 234
    }
  }
};

// High volume player with formatted stats
export const HighVolume = {
  args: {
    player: {
      position: 'SS',
      firstName: 'Cal',
      lastName: 'Ripken Jr.',
      tier: 'diamond',
      year: '1991'
    },
    stats: {
      formats: 24,
      teams: 96,
      games: '2.1k',
      atBats: '8.4k'
    }
  }
};

// Minimal stats (new player)
export const MinimalStats = {
  args: {
    player: {
      position: '1B',
      firstName: 'Lou',
      lastName: 'Gehrig',
      tier: 'perfect',
      year: '1927'
    },
    stats: {
      formats: 1,
      teams: 1,
      games: 12,
      atBats: 45
    }
  }
};

// Catcher position
export const Catcher = {
  args: {
    player: {
      position: 'C',
      firstName: 'Mike',
      lastName: 'Piazza',
      tier: 'diamond',
      year: '1997'
    },
    stats: {
      formats: 10,
      teams: 38,
      games: 145,
      atBats: 512
    }
  }
};

// First baseman
export const FirstBaseman = {
  args: {
    player: {
      position: '1B',
      firstName: 'Albert',
      lastName: 'Pujols',
      tier: 'diamond',
      year: '2008'
    },
    stats: {
      formats: 14,
      teams: 52,
      games: 178,
      atBats: 598
    }
  }
};

// Shortstop
export const Shortstop = {
  args: {
    player: {
      position: 'SS',
      firstName: 'Honus',
      lastName: 'Wagner',
      tier: 'perfect',
      year: '1908'
    },
    stats: {
      formats: 18,
      teams: 64,
      games: 203,
      atBats: 712
    }
  }
};

// DH position
export const DesignatedHitter = {
  args: {
    player: {
      position: 'DH',
      firstName: 'Edgar',
      lastName: 'Martinez',
      tier: 'diamond',
      year: '1995'
    },
    stats: {
      formats: 7,
      teams: 28,
      games: 132,
      atBats: 467
    }
  }
};
