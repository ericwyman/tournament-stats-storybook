/**
 * PositionLeaders - Display top 5 wOBA leaders for each position
 *
 * Main component that orchestrates filtering and display of position leaders.
 * Props are validated with PropTypes in development
 */

import * as React from "react";
import PropTypes from "prop-types";
import { PageHeader } from './atoms/PageHeader';
import { BackButton } from './atoms/BackButton';
import { FilterPanel } from './organisms/FilterPanel';
import { PositionGrid } from './organisms/PositionGrid';
import { positions } from '@/constants/positions';
import { allTiers, tierGradients } from '@/constants/tierConfig';
import { statConfig } from '@/constants/statConfig';
import { getGradientClass } from '@/utils/tierUtils';
import { filterPlayers } from '@/utils/playerFilters';
import { usePositionFilters } from '@/hooks/usePositionFilters';

// Mock data for demonstration
const MOCK_DATA = {
  'C': [
    { firstName: "Mike", lastName: "Piazza", tier: "Diamond", year: "1997", woba: ".456", avg: ".362", hr: 24, pa: 287, teams: 3, ovr: 95 },
    { firstName: "Johnny", lastName: "Bench", tier: "Gold", year: "1972", woba: ".421", avg: ".334", hr: 19, pa: 245, ovr: 88 },
    { firstName: "Gary", lastName: "Carter", tier: "Silver", year: "1984", woba: ".398", avg: ".318", hr: 17, pa: 198, ovr: 82 },
    { firstName: "Carlton", lastName: "Fisk", tier: "Gold", year: "1977", woba: ".385", avg: ".301", hr: 15, pa: 176, ovr: 86 },
    { firstName: "Yogi", lastName: "Berra", tier: "Bronze", year: "1955", woba: ".372", avg: ".295", hr: 12, pa: 165, ovr: 78 }
  ],
  '1B': [
    { firstName: "Lou", lastName: "Gehrig", tier: "Perfect", year: "1927", woba: ".498", avg: ".373", hr: 31, pa: 312, teams: 2, ovr: 99 },
    { firstName: "Albert", lastName: "Pujols", tier: "Diamond", year: "2008", woba: ".467", avg: ".357", hr: 28, pa: 289, ovr: 96 },
    { firstName: "Jimmie", lastName: "Foxx", tier: "Diamond", year: "1932", woba: ".445", avg: ".349", hr: 26, pa: 267, ovr: 94 },
    { firstName: "Jeff", lastName: "Bagwell", tier: "Gold", year: "1994", woba: ".412", avg: ".328", hr: 22, pa: 234, ovr: 89 },
    { firstName: "Frank", lastName: "Thomas", tier: "Gold", year: "1994", woba: ".401", avg: ".321", hr: 19, pa: 221, ovr: 87 }
  ],
  '2B': [
    { firstName: "Rogers", lastName: "Hornsby", tier: "Diamond", year: "1922", woba: ".478", avg: ".401", hr: 27, pa: 298, teams: 4, ovr: 97 },
    { firstName: "Joe", lastName: "Morgan", tier: "Gold", year: "1976", woba: ".423", avg: ".320", hr: 18, pa: 251, ovr: 90 },
    { firstName: "Jackie", lastName: "Robinson", tier: "Gold", year: "1949", woba: ".408", avg: ".342", hr: 14, pa: 227, ovr: 88 },
    { firstName: "Chase", lastName: "Utley", tier: "Silver", year: "2008", woba: ".391", avg: ".309", hr: 16, pa: 203, ovr: 83 },
    { firstName: "Ryne", lastName: "Sandberg", tier: "Silver", year: "1990", woba: ".378", avg: ".298", hr: 14, pa: 189, ovr: 81 }
  ],
  '3B': [
    { firstName: "Mike", lastName: "Schmidt", tier: "Perfect", year: "1980", woba: ".489", avg: ".356", hr: 29, pa: 305, teams: 2, ovr: 98 },
    { firstName: "Chipper", lastName: "Jones", tier: "Diamond", year: "1999", woba: ".452", avg: ".339", hr: 25, pa: 276, ovr: 93 },
    { firstName: "Wade", lastName: "Boggs", tier: "Diamond", year: "1987", woba: ".428", avg: ".363", hr: 18, pa: 254, ovr: 92 },
    { firstName: "George", lastName: "Brett", tier: "Gold", year: "1980", woba: ".415", avg: ".390", hr: 16, pa: 239, ovr: 89 },
    { firstName: "Eddie", lastName: "Mathews", tier: "Gold", year: "1953", woba: ".402", avg: ".312", hr: 20, pa: 218, ovr: 87 }
  ],
  'SS': [
    { firstName: "Honus", lastName: "Wagner", tier: "Perfect", year: "1908", woba: ".512", avg: ".354", hr: 8, pa: 318, ovr: 99 },
    { firstName: "Cal", lastName: "Ripken Jr.", tier: "Diamond", year: "1991", woba: ".441", avg: ".323", hr: 23, pa: 283, ovr: 94 },
    { firstName: "Ernie", lastName: "Banks", tier: "Gold", year: "1959", woba: ".419", avg: ".304", hr: 21, pa: 261, ovr: 90 },
    { firstName: "Arky", lastName: "Vaughan", tier: "Silver", year: "1935", woba: ".396", avg: ".385", hr: 12, pa: 209, ovr: 84 },
    { firstName: "Ozzie", lastName: "Smith", tier: "Silver", year: "1987", woba: ".365", avg: ".303", hr: 7, pa: 187, ovr: 80 }
  ],
  'LF': [
    { firstName: "Ted", lastName: "Williams", tier: "Perfect", year: "1941", woba: ".553", avg: ".406", hr: 32, pa: 342, teams: 5, ovr: 100 },
    { firstName: "Barry", lastName: "Bonds", tier: "Diamond", year: "2002", woba: ".537", avg: ".370", hr: 38, pa: 326, ovr: 98 },
    { firstName: "Rickey", lastName: "Henderson", tier: "Diamond", year: "1990", woba: ".458", avg: ".325", hr: 19, pa: 294, ovr: 93 },
    { firstName: "Stan", lastName: "Musial", tier: "Gold", year: "1948", woba: ".434", avg: ".376", hr: 21, pa: 271, ovr: 91 },
    { firstName: "Carl", lastName: "Yastrzemski", tier: "Gold", year: "1967", woba: ".427", avg: ".326", hr: 23, pa: 258, ovr: 89 }
  ],
  'CF': [
    { firstName: "Mickey", lastName: "Mantle", tier: "Perfect", year: "1957", woba: ".518", avg: ".365", hr: 34, pa: 329, teams: 2, ovr: 99 },
    { firstName: "Willie", lastName: "Mays", tier: "Diamond", year: "1965", woba: ".476", avg: ".317", hr: 33, pa: 301, ovr: 97 },
    { firstName: "Ty", lastName: "Cobb", tier: "Diamond", year: "1911", woba: ".461", avg: ".420", hr: 7, pa: 276, ovr: 96 },
    { firstName: "Joe", lastName: "DiMaggio", tier: "Gold", year: "1941", woba: ".443", avg: ".357", hr: 25, pa: 264, ovr: 91 },
    { firstName: "Duke", lastName: "Snider", tier: "Silver", year: "1954", woba: ".418", avg: ".341", hr: 28, pa: 243, ovr: 85 }
  ],
  'RF': [
    { firstName: "Babe", lastName: "Ruth", tier: "Perfect", year: "1927", woba: ".583", avg: ".356", hr: 60, pa: 356, teams: 6, ovr: 100 },
    { firstName: "Hank", lastName: "Aaron", tier: "Diamond", year: "1971", woba: ".469", avg: ".327", hr: 35, pa: 307, ovr: 96 },
    { firstName: "Roberto", lastName: "Clemente", tier: "Diamond", year: "1967", woba: ".445", avg: ".357", hr: 19, pa: 282, ovr: 94 },
    { firstName: "Reggie", lastName: "Jackson", tier: "Gold", year: "1969", woba: ".421", avg: ".275", hr: 34, pa: 261, ovr: 90 },
    { firstName: "Frank", lastName: "Robinson", tier: "Gold", year: "1966", woba: ".407", avg: ".316", hr: 31, pa: 239, ovr: 88 }
  ],
  'DH': [
    { firstName: "Edgar", lastName: "Martinez", tier: "Diamond", year: "1995", woba: ".492", avg: ".356", hr: 26, pa: 315, ovr: 95 },
    { firstName: "David", lastName: "Ortiz", tier: "Gold", year: "2007", woba: ".451", avg: ".332", hr: 28, pa: 292, ovr: 91 },
    { firstName: "Harold", lastName: "Baines", tier: "Gold", year: "1984", woba: ".419", avg: ".304", hr: 22, pa: 268, ovr: 87 },
    { firstName: "Paul", lastName: "Molitor", tier: "Silver", year: "1996", woba: ".394", avg: ".341", hr: 11, pa: 247, ovr: 83 },
    { firstName: "Travis", lastName: "Hafner", tier: "Bronze", year: "2006", woba: ".371", avg: ".308", hr: 18, pa: 215, ovr: 76 }
  ]
};

function PositionLeadersComponent({ tournamentName = "2014 Fall Classic", positionData }) {
  const {
    selectedPositions,
    selectedTiers,
    selectedStatBands,
    selectedStat,
    setSelectedStat,
    togglePosition,
    toggleTier,
    toggleStatBand,
    selectAllPositions,
    clearAllPositions,
    selectAllTiers,
    clearAllTiers,
    selectAllStatBands,
    clearAllStatBands
  } = usePositionFilters();

  const data = positionData || MOCK_DATA;
  const currentBands = statConfig[selectedStat].bands;

  const handleFilterPlayers = (players) => {
    return filterPlayers(players, selectedTiers, selectedStatBands, selectedStat, currentBands);
  };

  const handleSelectAllStatBands = () => {
    selectAllStatBands(currentBands);
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-[1800px] mx-auto">
        <PageHeader
          title="Position Leaders"
          subtitle={`${tournamentName} - Top 5 by wOBA`}
        />

        <FilterPanel
          selectedTiers={selectedTiers}
          selectedPositions={selectedPositions}
          selectedStat={selectedStat}
          selectedStatBands={selectedStatBands}
          positions={positions}
          allTiers={allTiers}
          statConfig={statConfig}
          tierGradients={tierGradients}
          currentBands={currentBands}
          onToggleTier={toggleTier}
          onTogglePosition={togglePosition}
          onSelectStat={setSelectedStat}
          onToggleStatBand={toggleStatBand}
          onSelectAllTiers={selectAllTiers}
          onClearAllTiers={clearAllTiers}
          onSelectAllPositions={selectAllPositions}
          onClearAllPositions={clearAllPositions}
          onSelectAllStatBands={handleSelectAllStatBands}
          onClearAllStatBands={clearAllStatBands}
        />

        <PositionGrid
          positions={positions}
          selectedPositions={selectedPositions}
          data={data}
          selectedStat={selectedStat}
          filterPlayers={handleFilterPlayers}
          getGradientClass={getGradientClass}
        />

        <div className="mt-8 flex justify-center">
          <BackButton />
        </div>
      </div>
    </div>
  );
}

PositionLeadersComponent.propTypes = {
  /** Tournament name to display in header */
  tournamentName: PropTypes.string,
  /** Position data object mapping position names to player arrays */
  positionData: PropTypes.objectOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        tier: PropTypes.string,
        year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        woba: PropTypes.string,
        avg: PropTypes.string,
        hr: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        pa: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        teams: PropTypes.number,
        ovr: PropTypes.number,
      })
    )
  ),
};

// Export memoized component
export const PositionLeaders = React.memo(PositionLeadersComponent);
