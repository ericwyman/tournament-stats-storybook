import { Input } from './input';
import { Label } from './label';

export default {
  title: 'UI Primitives/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

// Default input
export const Default = {
  render: () => <Input placeholder="Enter text..." />
};

// With label
export const WithLabel = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="player-name">Player Name</Label>
      <Input type="text" id="player-name" placeholder="Search players..." />
    </div>
  )
};

// Search input
export const SearchInput = {
  render: () => (
    <div className="w-80">
      <Input type="text" placeholder="Search tournaments..." className="w-full" />
    </div>
  )
};

// Number input
export const NumberInput = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="min-woba">Minimum wOBA</Label>
      <Input type="number" id="min-woba" placeholder="0.350" step="0.001" />
    </div>
  )
};

// Email input
export const EmailInput = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" placeholder="player@example.com" />
    </div>
  )
};

// Password input
export const PasswordInput = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="password">Password</Label>
      <Input type="password" id="password" placeholder="Enter password" />
    </div>
  )
};

// Disabled input
export const Disabled = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="disabled">Tournament Name</Label>
      <Input type="text" id="disabled" placeholder="Daily Gold Cap" disabled />
    </div>
  )
};

// With default value
export const WithValue = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="player-search">Player Search</Label>
      <Input type="text" id="player-search" defaultValue="Mike Trout" />
    </div>
  )
};

// Filter input (small)
export const FilterInput = {
  render: () => (
    <Input
      type="text"
      placeholder="Filter by name..."
      className="h-8 text-sm w-48"
    />
  )
};

// Wide input
export const WideInput = {
  render: () => (
    <div className="grid w-full max-w-2xl items-center gap-1.5">
      <Label htmlFor="description">Tournament Description</Label>
      <Input
        type="text"
        id="description"
        placeholder="Enter detailed tournament description..."
        className="w-full"
      />
    </div>
  )
};

// Form example with multiple inputs
export const FormExample = {
  render: () => (
    <div className="grid w-full max-w-md gap-4">
      <div className="grid gap-1.5">
        <Label htmlFor="tournament">Tournament Name</Label>
        <Input type="text" id="tournament" placeholder="Fall Classic 2024" />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="year">Year</Label>
        <Input type="number" id="year" placeholder="2024" />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="entrants">Max Entrants</Label>
        <Input type="number" id="entrants" placeholder="64" />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="fee">Entry Fee</Label>
        <Input type="text" id="fee" placeholder="Free" />
      </div>
    </div>
  )
};

// Stat threshold input
export const StatThresholdInput = {
  render: () => (
    <div className="flex items-center gap-2">
      <Label htmlFor="threshold" className="whitespace-nowrap">wOBA ≥</Label>
      <Input
        type="number"
        id="threshold"
        placeholder="0.400"
        step="0.001"
        className="w-24"
      />
    </div>
  )
};
