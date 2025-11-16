import { Spreadsheet } from './spreadsheet';

export default {
  title: 'Organisms/Spreadsheet System/Spreadsheet',
  component: Spreadsheet,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

// Sample baseball stats data
const baseballData = [
  ['Mike Trout', 157, 602, 176, 45, 104, '.292', '.402', '.628', '1.030', '.421'],
  ['Mookie Betts', 142, 597, 180, 35, 80, '.301', '.374', '.579', '.953', '.398'],
  ['Ronald Acuña Jr.', 119, 487, 127, 41, 101, '.266', '.353', '.596', '.949', '.384'],
  ['Aaron Judge', 148, 570, 177, 62, 131, '.311', '.425', '.686', '1.111', '.458'],
  ['Freddie Freeman', 159, 614, 199, 21, 100, '.325', '.407', '.511', '.918', '.391'],
  ['Jose Ramirez', 152, 575, 158, 29, 103, '.275', '.355', '.514', '.869', '.367'],
  ['Bryce Harper', 99, 374, 101, 18, 65, '.270', '.364', '.514', '.878', '.371'],
  ['Juan Soto', 153, 608, 166, 28, 114, '.273', '.410', '.519', '.929', '.405'],
  ['Yordan Alvarez', 135, 527, 144, 37, 97, '.273', '.406', '.528', '.934', '.397'],
  ['Pete Alonso', 160, 598, 152, 46, 118, '.254', '.352', '.519', '.871', '.367']
];

const baseballHeaders = ['Player', 'G', 'PA', 'H', 'HR', 'RBI', 'AVG', 'OBP', 'SLG', 'OPS', 'wOBA'];

// Default story with baseball stats
export const Default = {
  args: {
    data: baseballData,
    headers: baseballHeaders,
    editable: false
  }
};

// Editable spreadsheet
export const Editable = {
  args: {
    data: baseballData,
    headers: baseballHeaders,
    editable: true
  }
};

// Small dataset
export const SmallDataset = {
  args: {
    data: baseballData.slice(0, 3),
    headers: baseballHeaders,
    editable: false
  }
};

// Large dataset
export const LargeDataset = {
  args: {
    data: [
      ...baseballData,
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
    ],
    headers: baseballHeaders,
    editable: false
  }
};

// Simple data for testing
export const SimpleData = {
  args: {
    data: [
      ['Row 1', 100, 200, 300],
      ['Row 2', 150, 250, 350],
      ['Row 3', 175, 275, 375]
    ],
    headers: ['Label', 'Value A', 'Value B', 'Value C'],
    editable: true
  }
};

// Different column types
export const MixedColumns = {
  args: {
    data: [
      ['Ted Williams', 'LF', 'Perfect', '1941', '.406', 37, 120, '.553'],
      ['Babe Ruth', 'RF', 'Perfect', '1927', '.356', 60, 164, '.583'],
      ['Mickey Mantle', 'CF', 'Perfect', '1957', '.365', 34, 94, '.518'],
      ['Lou Gehrig', '1B', 'Perfect', '1927', '.373', 47, 173, '.498'],
      ['Honus Wagner', 'SS', 'Perfect', '1908', '.354', 10, 109, '.512']
    ],
    headers: ['Player', 'Pos', 'Tier', 'Year', 'AVG', 'HR', 'RBI', 'wOBA'],
    editable: false
  }
};

// With row selection
export const WithRowSelection = {
  args: {
    data: baseballData,
    headers: baseballHeaders,
    editable: false,
    selectedRows: new Set([0, 2, 4]),
    onRowSelect: (rowIndex, ctrlKey) => {
      console.log('Row selected:', rowIndex, 'Ctrl pressed:', ctrlKey);
    }
  }
};

// Filtered data with original indices
export const FilteredData = {
  args: {
    data: [
      baseballData[0],
      baseballData[3],
      baseballData[7]
    ],
    headers: baseballHeaders,
    editable: false,
    originalIndices: [0, 3, 7]
  }
};

// Wide table with many columns
export const WideTable = {
  args: {
    data: [
      ['Mike Trout', 157, 602, 176, 45, 104, 90, 139, '.292', '.402', '.628', '1.030', '.421', '.336', .287, 24],
      ['Mookie Betts', 142, 597, 180, 35, 80, 82, 117, '.301', '.374', '.579', '.953', '.398', '.278', .245, 18],
      ['Ronald Acuña Jr.', 119, 487, 127, 41, 101, 68, 106, '.266', '.353', '.596', '.949', '.384', '.330', .315, 37]
    ],
    headers: ['Player', 'G', 'PA', 'H', 'HR', 'RBI', 'R', 'K', 'AVG', 'OBP', 'SLG', 'OPS', 'wOBA', 'BABIP', 'ISO', 'SB'],
    editable: false
  }
};

// Empty state
export const EmptyState = {
  args: {
    data: [],
    headers: ['Player', 'G', 'PA', 'H', 'HR', 'RBI'],
    editable: false
  }
};

// Single row
export const SingleRow = {
  args: {
    data: [['Mike Trout', 157, 602, 176, 45, 104, '.292', '.402', '.628', '1.030', '.421']],
    headers: baseballHeaders,
    editable: false
  }
};
