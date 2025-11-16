import StatsDashboard from './StatsDashboard';

export default {
  title: 'Organisms/Spreadsheet System/StatsDashboard',
  component: StatsDashboard,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

// Sample baseball stats data
const baseballHeaders = ['Player', 'G', 'PA', 'H', 'HR', 'RBI', 'AVG', 'OBP', 'SLG', 'OPS', 'wOBA'];

const baseballRows = [
  ['Mike Trout', 157, 602, 176, 45, 104, '.292', '.402', '.628', '1.030', '.421'],
  ['Mookie Betts', 142, 597, 180, 35, 80, '.301', '.374', '.579', '.953', '.398'],
  ['Ronald Acuña Jr.', 119, 487, 127, 41, 101, '.266', '.353', '.596', '.949', '.384'],
  ['Aaron Judge', 148, 570, 177, 62, 131, '.311', '.425', '.686', '1.111', '.458'],
  ['Freddie Freeman', 159, 614, 199, 21, 100, '.325', '.407', '.511', '.918', '.391'],
  ['Jose Ramirez', 152, 575, 158, 29, 103, '.275', '.355', '.514', '.869', '.367'],
  ['Bryce Harper', 99, 374, 101, 18, 65, '.270', '.364', '.514', '.878', '.371'],
  ['Juan Soto', 153, 608, 166, 28, 114, '.273', '.410', '.519', '.929', '.405'],
  ['Yordan Alvarez', 135, 527, 144, 37, 97, '.273', '.406', '.528', '.934', '.397'],
  ['Pete Alonso', 160, 598, 152, 46, 118, '.254', '.352', '.519', '.871', '.367'],
  ['Shohei Ohtani', 135, 556, 151, 44, 95, '.272', '.356', '.592', '.948', '.392'],
  ['Vladimir Guerrero Jr.', 160, 698, 191, 32, 97, '.274', '.339', '.480', '.819', '.352'],
  ['Bo Bichette', 159, 690, 189, 24, 93, '.274', '.322', '.469', '.791', '.337'],
  ['Rafael Devers', 141, 602, 168, 28, 88, '.279', '.352', '.521', '.873', '.369'],
  ['Matt Olson', 162, 697, 171, 54, 139, '.245', '.325', '.543', '.868', '.371'],
  ['Austin Riley', 159, 652, 171, 37, 97, '.262', '.332', '.522', '.854', '.356'],
  ['Kyle Tucker', 150, 616, 177, 30, 107, '.287', '.361', '.536', '.897', '.383'],
  ['Trea Turner', 160, 696, 194, 21, 100, '.298', '.343', '.466', '.809', '.345'],
  ['Corey Seager', 119, 508, 146, 33, 83, '.287', '.367', '.559', '.926', '.390'],
  ['Marcus Semien', 162, 724, 179, 33, 83, '.247', '.304', '.443', '.747', '.323']
];

// Default story with full dashboard
export const Default = {
  args: {
    data: {
      headers: baseballHeaders,
      rows: baseballRows
    }
  }
};

// Small dataset
export const SmallDataset = {
  args: {
    data: {
      headers: baseballHeaders,
      rows: baseballRows.slice(0, 5)
    }
  }
};

// Large dataset (50+ players)
const largeDatasetRows = [
  ...baseballRows,
  ['Fernando Tatis Jr.', 130, 546, 147, 42, 97, '.269', '.340', '.611', '.951', '.389'],
  ['Julio Rodriguez', 132, 580, 156, 28, 75, '.269', '.327', '.509', '.836', '.351'],
  ['Wander Franco', 83, 357, 106, 4, 23, '.297', '.347', '.397', '.744', '.333'],
  ['Gunnar Henderson', 137, 549, 148, 28, 82, '.270', '.325', '.489', '.814', '.348'],
  ['Adley Rutschman', 113, 479, 126, 13, 54, '.263', '.362', '.445', '.807', '.354'],
  ['Bobby Witt Jr.', 150, 636, 174, 30, 96, '.274', '.319', '.495', '.814', '.340'],
  ['Josh Naylor', 151, 616, 175, 22, 79, '.284', '.338', '.479', '.817', '.346'],
  ['Josh Jung', 113, 479, 139, 23, 70, '.290', '.345', '.522', '.867', '.364'],
  ['Jarren Duran', 106, 431, 129, 10, 36, '.299', '.348', '.492', '.840', '.352'],
  ['Elly De La Cruz', 98, 443, 115, 13, 45, '.260', '.330', '.460', '.790', '.337']
];

export const LargeDataset = {
  args: {
    data: {
      headers: baseballHeaders,
      rows: largeDatasetRows
    }
  }
};

// Tournament-specific stats
const tournamentHeaders = ['Player', 'Team', 'Pos', 'Tier', 'G', 'PA', 'AVG', 'HR', 'RBI', 'wOBA'];
const tournamentRows = [
  ['Mike Trout', 'Team A', 'CF', 'Diamond', 8, 34, '.412', 4, 12, '.485'],
  ['Aaron Judge', 'Team B', 'RF', 'Perfect', 7, 29, '.448', 5, 14, '.523'],
  ['Mookie Betts', 'Team A', 'RF', 'Diamond', 8, 35, '.371', 3, 9, '.441'],
  ['Freddie Freeman', 'Team C', '1B', 'Gold', 6, 26, '.385', 2, 8, '.428'],
  ['Jose Ramirez', 'Team D', '3B', 'Gold', 7, 30, '.333', 3, 11, '.412'],
  ['Juan Soto', 'Team B', 'LF', 'Diamond', 8, 33, '.364', 2, 7, '.439'],
  ['Ronald Acuña Jr.', 'Team C', 'CF', 'Diamond', 5, 21, '.381', 2, 6, '.445'],
  ['Bryce Harper', 'Team D', 'RF', 'Gold', 6, 25, '.360', 3, 9, '.434']
];

export const TournamentStats = {
  args: {
    data: {
      headers: tournamentHeaders,
      rows: tournamentRows
    }
  }
};

// Position-specific stats
const positionHeaders = ['Player', 'Year', 'Tier', 'PA', 'AVG', 'HR', 'RBI', 'wOBA', 'Teams'];
const catcherRows = [
  ['Mike Piazza', '1997', 'Diamond', 287, '.362', 24, 76, '.456', 3],
  ['Johnny Bench', '1972', 'Gold', 245, '.334', 19, 65, '.421', 2],
  ['Gary Carter', '1984', 'Silver', 198, '.318', 17, 54, '.398', 1],
  ['Carlton Fisk', '1977', 'Gold', 176, '.301', 15, 48, '.385', 2],
  ['Yogi Berra', '1955', 'Bronze', 165, '.295', 12, 42, '.372', 1]
];

export const PositionSpecific = {
  args: {
    data: {
      headers: positionHeaders,
      rows: catcherRows
    }
  }
};

// Aggregated season stats
const seasonHeaders = ['Player', 'Formats', 'Teams', 'Games', 'PA', 'AVG', 'HR', 'RBI', 'wOBA'];
const seasonRows = [
  ['Mike Trout', 12, 45, 156, 602, '.292', 45, 104, '.421'],
  ['Aaron Judge', 10, 38, 148, 570, '.311', 62, 131, '.458'],
  ['Mookie Betts', 14, 52, 142, 597, '.301', 35, 80, '.398'],
  ['Freddie Freeman', 16, 58, 159, 614, '.325', 21, 100, '.391'],
  ['Juan Soto', 11, 42, 153, 608, '.273', 28, 114, '.405']
];

export const AggregatedSeasonStats = {
  args: {
    data: {
      headers: seasonHeaders,
      rows: seasonRows
    }
  }
};

// Pitching stats
const pitchingHeaders = ['Pitcher', 'Team', 'G', 'IP', 'W', 'L', 'ERA', 'K', 'BB', 'WHIP', 'FIP'];
const pitchingRows = [
  ['Sandy Koufax', 'Team A', 5, 43.0, 4, 1, 1.88, 58, 8, 0.86, 2.12],
  ['Bob Gibson', 'Team B', 6, 51.2, 5, 1, 1.57, 67, 12, 0.93, 1.98],
  ['Pedro Martinez', 'Team C', 5, 41.1, 4, 1, 2.18, 55, 9, 1.02, 2.45],
  ['Randy Johnson', 'Team D', 6, 48.0, 5, 1, 2.06, 72, 15, 0.98, 2.23],
  ['Greg Maddux', 'Team A', 7, 55.1, 6, 1, 2.28, 48, 7, 1.05, 2.67]
];

export const PitchingStats = {
  args: {
    data: {
      headers: pitchingHeaders,
      rows: pitchingRows
    }
  }
};
