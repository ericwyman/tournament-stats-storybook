import { Badge } from './badge';

export default {
  title: 'UI/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'destructive', 'outline'],
      description: 'The visual style variant of the badge',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
};

export const Default = {
  args: {
    children: 'Badge',
    variant: 'default',
  },
};

export const Secondary = {
  args: {
    children: 'Secondary',
    variant: 'secondary',
  },
};

export const Destructive = {
  args: {
    children: 'Destructive',
    variant: 'destructive',
  },
};

export const Outline = {
  args: {
    children: 'Outline',
    variant: 'outline',
  },
};

// Design token examples from our application
export const TournamentYear = {
  args: {
    children: '2025',
    className: 'bg-blue-100 text-blue-700 border-blue-300',
  },
  parameters: {
    docs: {
      description: {
        story: 'Badge styled with blue design tokens for tournament years.',
      },
    },
  },
};

export const ActiveStatus = {
  args: {
    children: 'Active',
    className: 'bg-green-100 text-green-700 border-green-300',
  },
  parameters: {
    docs: {
      description: {
        story: 'Badge styled with green design tokens for active status.',
      },
    },
  },
};

export const CompletedStatus = {
  args: {
    children: 'Complete',
    className: 'bg-indigo-100 text-indigo-700 border-indigo-300',
  },
  parameters: {
    docs: {
      description: {
        story: 'Badge styled with indigo design tokens for completed status.',
      },
    },
  },
};

export const CardTierPerfect = {
  args: {
    children: 'Perfect',
    className: 'gradient-perfect text-white',
  },
  parameters: {
    docs: {
      description: {
        story: 'Badge with Perfect tier gradient from design system.',
      },
    },
  },
};

export const CardTierDiamond = {
  args: {
    children: 'Diamond',
    className: 'gradient-diamond text-white',
  },
  parameters: {
    docs: {
      description: {
        story: 'Badge with Diamond tier gradient from design system.',
      },
    },
  },
};

export const CardTierGold = {
  args: {
    children: 'Gold',
    className: 'gradient-gold text-white',
  },
  parameters: {
    docs: {
      description: {
        story: 'Badge with Gold tier gradient from design system.',
      },
    },
  },
};

export const CardTierSilver = {
  args: {
    children: 'Silver',
    className: 'gradient-silver text-white',
  },
  parameters: {
    docs: {
      description: {
        story: 'Badge with Silver tier gradient from design system.',
      },
    },
  },
};

export const CardTierBronze = {
  args: {
    children: 'Bronze',
    className: 'gradient-bronze text-white',
  },
  parameters: {
    docs: {
      description: {
        story: 'Badge with Bronze tier gradient from design system.',
      },
    },
  },
};

export const CardTierIron = {
  args: {
    children: 'Iron',
    className: 'gradient-iron text-white',
  },
  parameters: {
    docs: {
      description: {
        story: 'Badge with Iron tier gradient from design system.',
      },
    },
  },
};
