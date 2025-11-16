import { PositionGrid } from './PositionGrid';
import { positions } from '@/constants/positions';
import { getGradientClass } from '@/utils/tierUtils';

export default {
  title: 'Organisms/PositionLeaders/PositionGrid',
  component: PositionGrid,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

const mockData = {
  'C': [
    { firstName: "Mike", lastName: "Piazza", tier: "Diamond", year: "1997", woba: ".456", avg: ".362", hr: 24, pa: 287, teams: 3, ovr: 95 },
    { firstName: "Johnny", lastName: "Bench", tier: "Gold", year: "1972", woba: ".421", avg: ".334", hr: 19, pa: 245, ovr: 88 },
  ],
  '1B': [
    { firstName: "Lou", lastName: "Gehrig", tier: "Perfect", year: "1927", woba: ".498", avg: ".373", hr: 31, pa: 312, teams: 2, ovr: 99 },
    { firstName: "Albert", lastName: "Pujols", tier: "Diamond", year: "2008", woba: ".467", avg: ".357", hr: 28, pa: 289, ovr: 96 },
  ],
  'CF': [
    { firstName: "Mickey", lastName: "Mantle", tier: "Perfect", year: "1957", woba: ".518", avg: ".365", hr: 34, pa: 329, teams: 2, ovr: 99 },
  ],
};

const noFilterPlayers = (players) => players;

export const AllPositions = {
  args: {
    positions: positions,
    selectedPositions: positions,
    data: mockData,
    selectedStat: 'woba',
    filterPlayers: noFilterPlayers,
    getGradientClass: getGradientClass,
  }
};

export const SinglePosition = {
  args: {
    positions: positions,
    selectedPositions: ['C'],
    data: mockData,
    selectedStat: 'woba',
    filterPlayers: noFilterPlayers,
    getGradientClass: getGradientClass,
  }
};

export const InfieldOnly = {
  args: {
    positions: positions,
    selectedPositions: ['C', '1B'],
    data: mockData,
    selectedStat: 'avg',
    filterPlayers: noFilterPlayers,
    getGradientClass: getGradientClass,
  }
};

export const WithEmptyPositions = {
  args: {
    positions: positions,
    selectedPositions: ['C', '1B', 'CF', 'DH'], // DH has no data
    data: mockData,
    selectedStat: 'woba',
    filterPlayers: noFilterPlayers,
    getGradientClass: getGradientClass,
  }
};
