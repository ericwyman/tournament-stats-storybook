import TournamentListPage from './TournamentListPage';

export default {
  title: 'Pages/TournamentListPage',
  component: TournamentListPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Full tournament list page displaying all tournaments with filtering, sorting, and view mode options. Currently uses mock data but designed to connect to Django API.'
      }
    }
  },
  tags: ['autodocs'],
};

// Default story
export const Default = {
  render: () => <TournamentListPage />,
  parameters: {
    docs: {
      description: {
        story: 'The complete Tournament List page with mock data. Features grid/list view toggle, year filters, tournament type filters, status filters, and sorting options.'
      }
    }
  }
};

// Full screen example
export const LiveExample = {
  render: () => (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <TournamentListPage />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Full-screen example showing the Tournament List page with background gradient. This demonstrates how the page appears in production.'
      }
    }
  }
};

// Documentation story
export const Features = {
  render: () => (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Tournament List Page Features</h1>

      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-bold mb-3">Overview</h2>
          <p className="text-gray-700 mb-4">
            The Tournament List page displays all available tournaments with comprehensive
            filtering and sorting options. It provides both grid and list views for optimal
            browsing experience.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">Key Features</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li><strong>View Modes:</strong> Toggle between Grid and List layouts</li>
            <li><strong>Year Filter:</strong> Multi-select filter to show tournaments from specific years</li>
            <li><strong>Type Filter:</strong> Filter by Daily or Weekly tournaments</li>
            <li><strong>Status Filter:</strong> Show Active, Completed, or All tournaments</li>
            <li><strong>Sort Options:</strong> Recent, Oldest, Name A-Z/Z-A, Entrants High/Low</li>
            <li><strong>Responsive Grid:</strong> 1-4 column layout based on screen size</li>
            <li><strong>Stadium Info:</strong> Shows stadium name and batting factors</li>
            <li><strong>Tournament Cards:</strong> Clean design with key information</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">Filter Controls</h2>
          <div className="space-y-3">
            <div className="p-4 bg-white rounded-lg border">
              <h4 className="font-semibold mb-2">View Mode Toggle</h4>
              <p className="text-sm text-gray-700 mb-2">
                Switch between Grid (cards) and List (compact rows) view
              </p>
              <div className="flex gap-2">
                <div className="px-3 py-1 bg-blue-600 text-white text-sm rounded">Grid</div>
                <div className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded">List</div>
              </div>
            </div>

            <div className="p-4 bg-white rounded-lg border">
              <h4 className="font-semibold mb-2">Year Filter (Multi-Select)</h4>
              <p className="text-sm text-gray-700 mb-2">
                Checkbox filters for years 2024, 2023, 2022, 2021, 2020, 2019
              </p>
              <div className="flex gap-2 flex-wrap">
                <span className="px-2 py-1 bg-blue-100 border border-blue-300 text-blue-700 text-sm rounded">✓ 2024</span>
                <span className="px-2 py-1 bg-blue-100 border border-blue-300 text-blue-700 text-sm rounded">✓ 2023</span>
                <span className="px-2 py-1 bg-gray-100 border border-gray-300 text-gray-500 text-sm rounded">2022</span>
              </div>
            </div>

            <div className="p-4 bg-white rounded-lg border">
              <h4 className="font-semibold mb-2">Tournament Type</h4>
              <p className="text-sm text-gray-700 mb-2">
                Radio buttons for All, Daily, or Weekly tournaments
              </p>
              <div className="flex gap-3">
                <label className="flex items-center gap-2">
                  <input type="radio" name="demo-type" defaultChecked />
                  <span className="text-sm">All</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="demo-type" />
                  <span className="text-sm">Daily</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="demo-type" />
                  <span className="text-sm">Weekly</span>
                </label>
              </div>
            </div>

            <div className="p-4 bg-white rounded-lg border">
              <h4 className="font-semibold mb-2">Status Filter</h4>
              <p className="text-sm text-gray-700 mb-2">
                Radio buttons for All, Active, or Completed tournaments
              </p>
              <div className="flex gap-3">
                <label className="flex items-center gap-2">
                  <input type="radio" name="demo-status" defaultChecked />
                  <span className="text-sm">All</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="demo-status" />
                  <span className="text-sm">Active</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="demo-status" />
                  <span className="text-sm">Completed</span>
                </label>
              </div>
            </div>

            <div className="p-4 bg-white rounded-lg border">
              <h4 className="font-semibold mb-2">Sort Options</h4>
              <p className="text-sm text-gray-700 mb-2">
                Dropdown with 6 sorting options
              </p>
              <select className="px-3 py-2 border rounded text-sm w-full max-w-xs">
                <option>Most Recent</option>
                <option>Oldest First</option>
                <option>Name (A-Z)</option>
                <option>Name (Z-A)</option>
                <option>Most Entrants</option>
                <option>Fewest Entrants</option>
              </select>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">Tournament Card Information</h2>
          <div className="bg-white rounded-lg border p-4">
            <h4 className="font-semibold mb-2">Each tournament card displays:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              <li>Tournament name and year</li>
              <li>Type badge (Daily/Weekly)</li>
              <li>Status badge (Active/Completed)</li>
              <li>Date range (start - end)</li>
              <li>Entrant count</li>
              <li>Stadium name</li>
              <li>Batting factors (L/R)</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">Responsive Grid Layout</h2>
          <div className="space-y-2 text-sm text-gray-700">
            <p><strong>Mobile (&lt; 768px):</strong> 1 column</p>
            <p><strong>Tablet (768px - 1024px):</strong> 2 columns</p>
            <p><strong>Desktop (1024px - 1536px):</strong> 3 columns</p>
            <p><strong>Large Desktop (&gt; 1536px):</strong> 4 columns</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">Data Source</h2>
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-sm font-mono text-gray-800 mb-2">
              <strong>Current:</strong> Mock data (16 tournaments)
            </p>
            <p className="text-sm font-mono text-gray-800 mb-2">
              <strong>Future:</strong> /api/tournaments/ endpoint
            </p>
            <p className="text-sm text-gray-700">
              The page is designed to easily switch from mock data to real API data by
              replacing the MOCK_TOURNAMENTS constant with an API call.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">Component Hierarchy</h2>
          <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm">
            <div>TournamentListPage</div>
            <div className="ml-4">├─ Page Header</div>
            <div className="ml-4">│  ├─ Title</div>
            <div className="ml-4">│  ├─ View Mode Toggle</div>
            <div className="ml-4">│  └─ Results Count</div>
            <div className="ml-4">├─ Filter Bar</div>
            <div className="ml-4">│  ├─ Year Checkboxes</div>
            <div className="ml-4">│  ├─ Type Radio Buttons</div>
            <div className="ml-4">│  ├─ Status Radio Buttons</div>
            <div className="ml-4">│  └─ Sort Dropdown</div>
            <div className="ml-4">└─ Tournament Grid/List</div>
            <div className="ml-8">└─ Tournament Cards</div>
            <div className="ml-12">├─ Card Header (Name, Year, Type)</div>
            <div className="ml-12">├─ Status Badge</div>
            <div className="ml-12">├─ Dates & Entrants</div>
            <div className="ml-12">└─ Stadium Info</div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">Usage Example</h2>
          <div className="bg-white border rounded-lg p-6">
            <TournamentListPage />
          </div>
        </section>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comprehensive documentation of the Tournament List page features, functionality, and implementation details.'
      }
    }
  }
};
