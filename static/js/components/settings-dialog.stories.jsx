import { SettingsDialog } from './settings-dialog';

export default {
  title: 'Organisms/SettingsDialog',
  component: SettingsDialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

// Default story - closed state
export const Default = {
  args: {}
};

// Story showing the dialog in context
export const InContext = {
  render: () => (
    <div className="p-8 bg-gray-100 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Application Header</h2>
        <SettingsDialog />
      </div>
      <p className="text-gray-600">
        Click the settings icon to open the dialog. Toggle dark mode to see the theme change.
      </p>
    </div>
  )
};

// Story showing in a sidebar footer context
export const InSidebarFooter = {
  render: () => (
    <div className="w-64 bg-white border border-gray-200 rounded-lg p-4">
      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-500">
          v1.0.0 • Flask + React
        </p>
        <SettingsDialog />
      </div>
    </div>
  )
};

// Story showing in a toolbar context
export const InToolbar = {
  render: () => (
    <div className="bg-white border-b border-gray-200 p-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">Tournament Stats</h1>
          <nav className="flex gap-4">
            <a href="#" className="text-sm text-gray-600 hover:text-gray-900">Dashboard</a>
            <a href="#" className="text-sm text-gray-600 hover:text-gray-900">Tournaments</a>
            <a href="#" className="text-sm text-gray-600 hover:text-gray-900">Statistics</a>
          </nav>
        </div>
        <SettingsDialog />
      </div>
    </div>
  )
};
