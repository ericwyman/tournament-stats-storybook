import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './select';

export default {
  title: 'UI Primitives/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

// Default select
export const Default = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="orange">Orange</SelectItem>
        <SelectItem value="grape">Grape</SelectItem>
      </SelectContent>
    </Select>
  )
};

// With groups
export const WithGroups = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select a position" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Infield</SelectLabel>
          <SelectItem value="c">Catcher (C)</SelectItem>
          <SelectItem value="1b">First Base (1B)</SelectItem>
          <SelectItem value="2b">Second Base (2B)</SelectItem>
          <SelectItem value="3b">Third Base (3B)</SelectItem>
          <SelectItem value="ss">Shortstop (SS)</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Outfield</SelectLabel>
          <SelectItem value="lf">Left Field (LF)</SelectItem>
          <SelectItem value="cf">Center Field (CF)</SelectItem>
          <SelectItem value="rf">Right Field (RF)</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Other</SelectLabel>
          <SelectItem value="dh">Designated Hitter (DH)</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
};

// Tournament filter
export const TournamentFilter = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[220px]">
        <SelectValue placeholder="Select tournament" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="fall-classic-2024">Fall Classic 2024</SelectItem>
        <SelectItem value="daily-gold-cap">Daily Gold Cap</SelectItem>
        <SelectItem value="weekly-diamond">Weekly Diamond Tier</SelectItem>
        <SelectItem value="no-cap-classic">No Cap Classic</SelectItem>
        <SelectItem value="bronze-challenge">Bronze Challenge</SelectItem>
      </SelectContent>
    </Select>
  )
};

// Card tier select
export const TierSelect = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select tier" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="perfect">Perfect (100+)</SelectItem>
        <SelectItem value="diamond">Diamond (90-99)</SelectItem>
        <SelectItem value="gold">Gold (80-89)</SelectItem>
        <SelectItem value="silver">Silver (70-79)</SelectItem>
        <SelectItem value="bronze">Bronze (60-69)</SelectItem>
        <SelectItem value="iron">Iron (40-59)</SelectItem>
      </SelectContent>
    </Select>
  )
};

// Stat selector
export const StatSelector = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[160px]">
        <SelectValue placeholder="Select stat" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Advanced</SelectLabel>
          <SelectItem value="woba">wOBA</SelectItem>
          <SelectItem value="ops">OPS</SelectItem>
          <SelectItem value="wraa">wRAA</SelectItem>
          <SelectItem value="babip">BABIP</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Traditional</SelectLabel>
          <SelectItem value="avg">AVG</SelectItem>
          <SelectItem value="hr">Home Runs</SelectItem>
          <SelectItem value="rbi">RBI</SelectItem>
          <SelectItem value="sb">Stolen Bases</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
};

// Year selector
export const YearSelector = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[140px]">
        <SelectValue placeholder="Select year" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="2024">2024</SelectItem>
        <SelectItem value="2023">2023</SelectItem>
        <SelectItem value="2022">2022</SelectItem>
        <SelectItem value="2021">2021</SelectItem>
        <SelectItem value="2020">2020</SelectItem>
        <SelectItem value="all">All Years</SelectItem>
      </SelectContent>
    </Select>
  )
};

// Sort selector
export const SortSelector = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Sort by..." />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="recent">Most Recent</SelectItem>
        <SelectItem value="oldest">Oldest First</SelectItem>
        <SelectItem value="name-asc">Name (A-Z)</SelectItem>
        <SelectItem value="name-desc">Name (Z-A)</SelectItem>
        <SelectItem value="entrants-high">Most Entrants</SelectItem>
        <SelectItem value="entrants-low">Fewest Entrants</SelectItem>
      </SelectContent>
    </Select>
  )
};

// Small select
export const Small = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[120px] h-8 text-sm">
        <SelectValue placeholder="Filter" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All</SelectItem>
        <SelectItem value="active">Active</SelectItem>
        <SelectItem value="completed">Completed</SelectItem>
      </SelectContent>
    </Select>
  )
};

// Wide select
export const Wide = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[400px]">
        <SelectValue placeholder="Select a very long option..." />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option1">Daily Gold Cap - 1996 Era - Coors Field (Entry: Free)</SelectItem>
        <SelectItem value="option2">Weekly Perfect No Cap - 2024 Era - Fenway Park (Entry: 50,000)</SelectItem>
        <SelectItem value="option3">Daily Diamond Tier - 2008 Era - Yankee Stadium (Entry: Free)</SelectItem>
      </SelectContent>
    </Select>
  )
};
