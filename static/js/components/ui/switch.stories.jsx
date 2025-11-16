import { Switch } from './switch';
import { Label } from './label';

export default {
  title: 'UI Primitives/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

// Default switch
export const Default = {
  render: () => <Switch />
};

// With label
export const WithLabel = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Switch id="dark-mode" />
      <Label htmlFor="dark-mode">Dark Mode</Label>
    </div>
  )
};

// Checked by default
export const Checked = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Switch id="notifications" defaultChecked />
      <Label htmlFor="notifications">Enable Notifications</Label>
    </div>
  )
};

// Disabled
export const Disabled = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Switch id="disabled" disabled />
      <Label htmlFor="disabled" className="text-gray-400">Feature Unavailable</Label>
    </div>
  )
};

// Disabled and checked
export const DisabledChecked = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Switch id="disabled-checked" disabled defaultChecked />
      <Label htmlFor="disabled-checked" className="text-gray-400">Required Setting</Label>
    </div>
  )
};

// Multiple switches in a settings panel
export const SettingsPanel = {
  render: () => (
    <div className="w-80 space-y-4 p-6 bg-white rounded-lg border">
      <h3 className="font-semibold mb-4">Tournament Settings</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="dh-rule">Designated Hitter</Label>
            <p className="text-sm text-gray-500">Enable DH in lineups</p>
          </div>
          <Switch id="dh-rule" defaultChecked />
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="auto-lineup">Auto-Generate Lineup</Label>
            <p className="text-sm text-gray-500">Automatically optimize lineup</p>
          </div>
          <Switch id="auto-lineup" />
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="notifications">Tournament Notifications</Label>
            <p className="text-sm text-gray-500">Get alerts for tournament updates</p>
          </div>
          <Switch id="notifications" defaultChecked />
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="stats-tracking">Advanced Stats Tracking</Label>
            <p className="text-sm text-gray-500">Track wOBA, FIP, and other metrics</p>
          </div>
          <Switch id="stats-tracking" defaultChecked />
        </div>
      </div>
    </div>
  )
};

// Filter toggles
export const FilterToggles = {
  render: () => (
    <div className="w-96 p-4 bg-gray-50 rounded-lg">
      <h4 className="font-semibold mb-3">Active Filters</h4>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="show-perfect">Show Perfect Tier</Label>
          <Switch id="show-perfect" defaultChecked />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="show-diamond">Show Diamond Tier</Label>
          <Switch id="show-diamond" defaultChecked />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="show-gold">Show Gold Tier</Label>
          <Switch id="show-gold" defaultChecked />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="show-completed">Show Completed Only</Label>
          <Switch id="show-completed" />
        </div>
      </div>
    </div>
  )
};

// Display preferences
export const DisplayPreferences = {
  render: () => (
    <div className="w-80 p-6 bg-white rounded-lg border">
      <h3 className="font-semibold mb-4">Display Preferences</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="compact-view">Compact View</Label>
          <Switch id="compact-view" />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="show-avatars">Show Player Avatars</Label>
          <Switch id="show-avatars" defaultChecked />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="show-stats">Show Advanced Stats</Label>
          <Switch id="show-stats" defaultChecked />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="animations">Enable Animations</Label>
          <Switch id="animations" defaultChecked />
        </div>
      </div>
    </div>
  )
};

// Tournament type filter
export const TournamentTypeFilter = {
  render: () => (
    <div className="flex items-center gap-6 p-4 bg-white rounded-lg border">
      <div className="flex items-center space-x-2">
        <Switch id="daily" defaultChecked />
        <Label htmlFor="daily">Daily</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="weekly" defaultChecked />
        <Label htmlFor="weekly">Weekly</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="special" />
        <Label htmlFor="special">Special Events</Label>
      </div>
    </div>
  )
};
