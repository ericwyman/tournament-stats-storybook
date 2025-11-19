import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TournamentDetailsPage from './TournamentDetailsPage';

export default {
  title: 'Pages/TournamentDetailsPage',
  component: TournamentDetailsPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Full tournament details page that displays comprehensive information about a single tournament including metadata, stadium information, and top performers. Fetches real tournament data from the Django API.'
      }
    }
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<Story />} />
        </Routes>
      </BrowserRouter>
    ),
  ],
};

// Default story - shows the full page (will use tournament ID from URL in production)
export const Default = {
  render: () => <TournamentDetailsPage />,
  parameters: {
    docs: {
      description: {
        story: 'The complete Tournament Details page with live API data. In production, this page receives the tournament ID from the URL parameter (/tournament/:id) and fetches the corresponding tournament data.'
      }
    }
  }
};

// Full screen example
export const LiveExample = {
  render: () => (
    <div className="min-h-screen">
      <TournamentDetailsPage />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Full-screen example showing the Tournament Details page. This demonstrates how the page appears in production with proper styling and layout.'
      }
    }
  }
};

// Documentation story
export const Features = {
  render: () => (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Tournament Details Page Features</h1>

      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-bold mb-3">Overview</h2>
          <p className="text-gray-700 mb-4">
            The Tournament Details page displays comprehensive information about a single
            tournament, fetched from the Django REST API using the tournament ID from the URL.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">Key Features</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li><strong>React Router Integration:</strong> Uses useParams to get tournament ID from URL</li>
            <li><strong>API Integration:</strong> Fetches tournament data using apiClient.getTournament(id)</li>
            <li><strong>Loading States:</strong> Skeleton loaders while data fetches</li>
            <li><strong>Error Handling:</strong> User-friendly error display with retry button</li>
            <li><strong>Breadcrumb Navigation:</strong> Home &gt; Tournaments &gt; Tournament Name</li>
            <li><strong>Back Button:</strong> Navigate to previous page using browser history</li>
            <li><strong>Batting Statistics:</strong> Tournament-wide batting metrics (wOBA, OPS, HR, SB)</li>
            <li><strong>Pitching Statistics:</strong> Tournament-wide pitching metrics (ERA, WHIP, FIP, K)</li>
            <li><strong>Stat Leaderboards:</strong> Top 10 performers for batting and pitching categories</li>
            <li><strong>Position Breakdown:</strong> Performance by batting and pitching positions</li>
            <li><strong>Top Performers Preview:</strong> Shows top 5 players by wOBA</li>
            <li><strong>Stadium Information:</strong> Prominent display of batting ratings</li>
            <li><strong>Responsive Design:</strong> Works on mobile, tablet, and desktop</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">Page Sections</h2>
          <div className="space-y-3">
            <div className="p-3 bg-blue-50 rounded border-l-4 border-blue-600">
              <h4 className="font-semibold mb-1">Tournament Header</h4>
              <p className="text-sm text-gray-700">
                Displays tournament name, year, type, status, dates, entrant count, and overall status.
              </p>
            </div>
            <div className="p-3 bg-green-50 rounded border-l-4 border-green-600">
              <h4 className="font-semibold mb-1">Stadium Information</h4>
              <p className="text-sm text-gray-700">
                Shows stadium name and batting ratings for left and right-handed batters.
              </p>
            </div>
            <div className="p-3 bg-amber-50 rounded border-l-4 border-amber-600">
              <h4 className="font-semibold mb-1">Tournament Statistics (Batting)</h4>
              <p className="text-sm text-gray-700">
                Aggregated batting metrics: Total Players, Total Games, Avg wOBA, Avg OPS, Total HR, Total SB.
              </p>
            </div>
            <div className="p-3 bg-red-50 rounded border-l-4 border-red-600">
              <h4 className="font-semibold mb-1">Pitching Statistics</h4>
              <p className="text-sm text-gray-700">
                Aggregated pitching metrics: Total Pitchers, Total Games, Avg ERA, Avg WHIP, Avg FIP, Total K.
              </p>
            </div>
            <div className="p-3 bg-indigo-50 rounded border-l-4 border-indigo-600">
              <h4 className="font-semibold mb-1">Stat Leaderboards</h4>
              <p className="text-sm text-gray-700">
                Top 10 performers by category. Batting: wOBA, AVG, HR, RBI, SB. Pitching: ERA, FIP, WHIP, K/9, BB/9, SV, K.
              </p>
            </div>
            <div className="p-3 bg-cyan-50 rounded border-l-4 border-cyan-600">
              <h4 className="font-semibold mb-1">Position Breakdown</h4>
              <p className="text-sm text-gray-700">
                Performance by batting positions (C, 1B, 2B, 3B, SS, LF, CF, RF, DH) showing player count, top player, and avg wOBA.
              </p>
            </div>
            <div className="p-3 bg-pink-50 rounded border-l-4 border-pink-600">
              <h4 className="font-semibold mb-1">Pitching Position Breakdown</h4>
              <p className="text-sm text-gray-700">
                Performance by pitcher role (SP, RP) showing pitcher count, top pitcher by ERA, and avg ERA.
              </p>
            </div>
            <div className="p-3 bg-purple-50 rounded border-l-4 border-purple-600">
              <h4 className="font-semibold mb-1">Top Performers</h4>
              <p className="text-sm text-gray-700">
                Lists top 5 players by wOBA with link to full position leaders page.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">Data Flow</h2>
          <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm">
            <div>1. User navigates to /tournament/[id]</div>
            <div className="ml-4">↓</div>
            <div>2. useParams extracts tournament ID</div>
            <div className="ml-4">↓</div>
            <div>3. apiClient.getTournament(id) fetches data</div>
            <div className="ml-4">↓</div>
            <div>4. Tournament data displayed</div>
            <div className="ml-4">↓</div>
            <div>5. TopPerformersPreview fetches aggregated stats</div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">API Endpoints Used</h2>
          <div className="bg-white border rounded-lg p-4 space-y-2 text-sm">
            <div>
              <strong className="font-mono">GET /api/tournaments/{id}/</strong>
              <p className="text-gray-600">Fetches tournament metadata and stadium information</p>
            </div>
            <div>
              <strong className="font-mono">GET /api/stats/aggregated/?tournament={id}&limit=5</strong>
              <p className="text-gray-600">Fetches top 5 performers for the tournament</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">Component Structure</h2>
          <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm">
            <div>TournamentDetailsPage (Main Component)</div>
            <div className="ml-4">├─ SidebarProvider</div>
            <div className="ml-4">│  ├─ AppSidebar</div>
            <div className="ml-4">│  └─ SidebarInset</div>
            <div className="ml-8">├─ Header (Back button, title)</div>
            <div className="ml-8">├─ Breadcrumbs</div>
            <div className="ml-8">├─ TournamentDetailsSkeleton (Loading)</div>
            <div className="ml-8">├─ ErrorDisplay (Error state)</div>
            <div className="ml-8">└─ Tournament Content</div>
            <div className="ml-12">├─ Tournament Header Card</div>
            <div className="ml-12">├─ Stadium Information Card</div>
            <div className="ml-12">├─ TournamentStats (Batting)</div>
            <div className="ml-12">├─ PitchingTournamentStats</div>
            <div className="ml-12">├─ StatLeaderboards</div>
            <div className="ml-12">├─ PositionBreakdown</div>
            <div className="ml-12">├─ PitchingPositionBreakdown</div>
            <div className="ml-12">└─ TopPerformersPreview</div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">States Handled</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3 bg-white border rounded">
              <div className="font-semibold mb-1">Loading</div>
              <p className="text-xs text-gray-600">Displays skeleton loaders while fetching data</p>
            </div>
            <div className="p-3 bg-white border rounded">
              <div className="font-semibold mb-1">Success</div>
              <p className="text-xs text-gray-600">Shows tournament data with all sections</p>
            </div>
            <div className="p-3 bg-white border rounded">
              <div className="font-semibold mb-1">Error</div>
              <p className="text-xs text-gray-600">Displays error message with retry button</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">Navigation</h2>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
            <li>Back button: navigate(-1) uses browser history</li>
            <li>Breadcrumbs: Links to / and /tournaments</li>
            <li>"View All Position Leaders" button: navigates to /position-leaders</li>
            <li>Sidebar navigation: Integrated with app-wide navigation</li>
          </ul>
        </section>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comprehensive documentation of the Tournament Details page features, functionality, and implementation details.'
      }
    }
  }
};
