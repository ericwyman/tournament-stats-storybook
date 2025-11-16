import { AppSidebar } from './app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

export default {
  title: 'Organisms/AppSidebar',
  component: AppSidebar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <SidebarProvider>
        <div className="flex h-screen">
          <Story />
          <div className="flex-1 p-6 bg-gray-50">
            <h1 className="text-2xl font-bold mb-4">Page Content</h1>
            <p className="text-gray-600">
              The sidebar is displayed on the left. Click items to see active states.
            </p>
          </div>
        </div>
      </SidebarProvider>
    ),
  ],
};

// Default state (Dashboard active)
export const Default = {
  args: {
    currentPath: '/'
  }
};

// Dashboard active
export const DashboardActive = {
  args: {
    currentPath: '/'
  }
};

// Tournaments active
export const TournamentsActive = {
  args: {
    currentPath: '/tournaments'
  }
};

// Statistics active
export const StatisticsActive = {
  args: {
    currentPath: '/stats'
  }
};

// Tournament detail page (nested route)
export const TournamentDetailActive = {
  args: {
    currentPath: '/tournaments/123'
  }
};

// Stats subpage (nested route)
export const StatsSubpageActive = {
  args: {
    currentPath: '/stats/position-leaders'
  }
};

// No active page
export const NoActivePage = {
  args: {
    currentPath: '/other-page'
  }
};
