import { TeamsMetaBadge } from './TeamsMetaBadge';

export default {
  title: 'Atoms/PositionLeaders/TeamsMetaBadge',
  component: TeamsMetaBadge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export const Default = {
  args: {
    teamCount: 3,
  }
};

export const TwoTeams = {
  args: {
    teamCount: 2,
  }
};

export const FiveTeams = {
  args: {
    teamCount: 5,
  }
};

export const SingleTeam = {
  args: {
    teamCount: 1,
  },
  parameters: {
    docs: {
      description: {
        story: 'Badge is hidden when team count is 1 (not displayed)'
      }
    }
  }
};

export const NoTeams = {
  args: {
    teamCount: 0,
  },
  parameters: {
    docs: {
      description: {
        story: 'Badge is hidden when team count is 0 (not displayed)'
      }
    }
  }
};
