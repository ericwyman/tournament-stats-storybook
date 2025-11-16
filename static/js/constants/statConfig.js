/**
 * Statistical Bands Configuration
 *
 * Defines statistical performance bands for filtering players
 */

export const statConfig = {
  woba: {
    label: 'wOBA',
    bands: [
      { value: 'top5', label: 'Top 5', isRankBased: true },
      { value: 'elite', label: 'Elite (.400+)', min: 0.400, max: 1 },
      { value: 'great', label: 'Great (.350-.399)', min: 0.350, max: 0.399 },
      { value: 'good', label: 'Good (.300-.349)', min: 0.300, max: 0.349 },
      { value: 'average', label: 'Average (<.300)', min: 0, max: 0.299 }
    ]
  },
  avg: {
    label: 'AVG',
    bands: [
      { value: 'top5', label: 'Top 5', isRankBased: true },
      { value: 'elite', label: 'Elite (.325+)', min: 0.325, max: 1 },
      { value: 'great', label: 'Great (.285-.324)', min: 0.285, max: 0.324 },
      { value: 'good', label: 'Good (.250-.284)', min: 0.250, max: 0.284 },
      { value: 'average', label: 'Average (<.250)', min: 0, max: 0.249 }
    ]
  },
  hr: {
    label: 'Home Runs',
    bands: [
      { value: 'top5', label: 'Top 5', isRankBased: true },
      { value: 'elite', label: 'Elite (25+)', min: 25, max: 999 },
      { value: 'great', label: 'Great (18-24)', min: 18, max: 24 },
      { value: 'good', label: 'Good (12-17)', min: 12, max: 17 },
      { value: 'average', label: 'Average (<12)', min: 0, max: 11 }
    ]
  },
  pa: {
    label: 'Plate Appearances',
    bands: [
      { value: 'top5', label: 'Top 5', isRankBased: true },
      { value: 'elite', label: 'High (275+)', min: 275, max: 9999 },
      { value: 'great', label: 'Good (225-274)', min: 225, max: 274 },
      { value: 'good', label: 'Average (175-224)', min: 175, max: 224 },
      { value: 'average', label: 'Low (<175)', min: 0, max: 174 }
    ]
  }
};
