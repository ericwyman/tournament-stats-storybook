import PositionLeadersPage from './PositionLeadersPage';

export default {
  title: 'Pages/PositionLeadersPage',
  component: PositionLeadersPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Full position leaders page that connects to the Django API to fetch and display top performers by position. Features tournament selection, tier filtering, and stat selection.'
      }
    }
  },
  tags: ['autodocs'],
};

// Default story - shows the full page
export const Default = {
  render: () => <PositionLeadersPage />,
  parameters: {
    docs: {
      description: {
        story: 'The complete Position Leaders page with live API data. Select a tournament to view top 5 players by position. Filter by tier and switch between different statistics (wOBA, AVG, HR, PA).'
      }
    }
  }
};

// Story showing the page in use
export const LiveExample = {
  render: () => (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <PositionLeadersPage />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Full-screen example showing the Position Leaders page with background. This demonstrates how the page appears in production with proper styling and layout.'
      }
    }
  }
};

// Documentation story
export const Features = {
  render: () => (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Position Leaders Page Features</h1>

      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-bold mb-3">Overview</h2>
          <p className="text-gray-700 mb-4">
            The Position Leaders page displays the top 5 performing players at each position
            for a selected tournament. It connects to the Django REST API to fetch real-time
            tournament and player statistics.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">Key Features</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li><strong>Tournament Selection:</strong> Dropdown to choose from available tournaments</li>
            <li><strong>Position Filtering:</strong> Show/hide specific positions (C, 1B, 2B, 3B, SS, LF, CF, RF, DH)</li>
            <li><strong>Tier Filtering:</strong> Filter players by card tier (Perfect, Diamond, Gold, Silver, Bronze, Iron)</li>
            <li><strong>Stat Selection:</strong> Switch between wOBA, AVG, HR, and PA statistics</li>
            <li><strong>Top 5 Display:</strong> Shows top 5 players per position based on selected stat</li>
            <li><strong>Gradient Cards:</strong> Each tier has unique gradient styling</li>
            <li><strong>Responsive Design:</strong> Works on mobile, tablet, and desktop</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">Data Source</h2>
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-sm font-mono text-gray-800 mb-2">
              <strong>API Endpoint:</strong> /api/stats/aggregated/
            </p>
            <p className="text-sm text-gray-700">
              Fetches pre-aggregated player statistics including wOBA, OPS, ISO, BABIP, and traditional stats.
              Data is filtered by tournament and sorted by the selected statistic.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">Filter Behavior</h2>
          <div className="space-y-3">
            <div className="p-3 bg-blue-50 rounded border-l-4 border-blue-600">
              <h4 className="font-semibold mb-1">Tier Filter</h4>
              <p className="text-sm text-gray-700">
                Checkbox filters for each tier. Only players with checked tiers are displayed.
              </p>
            </div>
            <div className="p-3 bg-green-50 rounded border-l-4 border-green-600">
              <h4 className="font-semibold mb-1">Position Filter</h4>
              <p className="text-sm text-gray-700">
                Checkbox filters for each position. Entire position sections are hidden when unchecked.
              </p>
            </div>
            <div className="p-3 bg-purple-50 rounded border-l-4 border-purple-600">
              <h4 className="font-semibold mb-1">Stat Selection</h4>
              <p className="text-sm text-gray-700">
                Dropdown to choose ranking stat. Changes both the ranking and highlighting in player cards.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">Component Hierarchy</h2>
          <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm">
            <div>PositionLeadersPage</div>
            <div className="ml-4">├─ Tournament Selector</div>
            <div className="ml-4">├─ Filter Controls</div>
            <div className="ml-4">│  ├─ Tier Checkboxes</div>
            <div className="ml-4">│  ├─ Stat Dropdown</div>
            <div className="ml-4">│  └─ Position Checkboxes</div>
            <div className="ml-4">└─ Position Grid</div>
            <div className="ml-8">└─ For each position:</div>
            <div className="ml-12">├─ Position Header</div>
            <div className="ml-12">└─ Player Cards (top 5)</div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">Usage Example</h2>
          <div className="bg-white border rounded-lg p-6">
            <PositionLeadersPage />
          </div>
        </section>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comprehensive documentation of the Position Leaders page features, functionality, and implementation details.'
      }
    }
  }
};
