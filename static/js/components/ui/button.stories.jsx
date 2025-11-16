import { Button } from './button';

export default {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
      description: 'The visual style variant of the button',
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
      description: 'The size of the button',
    },
    asChild: {
      control: 'boolean',
      description: 'Whether to render as a child component',
    },
  },
};

export const Default = {
  args: {
    children: 'Button',
    variant: 'default',
  },
};

export const Destructive = {
  args: {
    children: 'Delete',
    variant: 'destructive',
  },
};

export const Outline = {
  args: {
    children: 'Outline',
    variant: 'outline',
  },
};

export const Secondary = {
  args: {
    children: 'Secondary',
    variant: 'secondary',
  },
};

export const Ghost = {
  args: {
    children: 'Ghost',
    variant: 'ghost',
  },
};

export const Link = {
  args: {
    children: 'Link',
    variant: 'link',
  },
};

export const SmallSize = {
  args: {
    children: 'Small Button',
    size: 'sm',
  },
};

export const LargeSize = {
  args: {
    children: 'Large Button',
    size: 'lg',
  },
};

export const Icon = {
  args: {
    children: '→',
    size: 'icon',
  },
};

// Custom styled buttons using design tokens (NOT shadcn Button component)
export const CustomPrimaryButton = {
  render: () => (
    <button className="px-4 py-2 rounded-lg font-bold text-sm bg-blue-600 text-white border-2 border-blue-700 hover:bg-blue-700 transition-all duration-200">
      Primary Action
    </button>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Custom button styled with blue design tokens. This is the standard button style used in the application (NOT using shadcn Button component).',
      },
    },
  },
};

export const CustomSecondaryButton = {
  render: () => (
    <button className="px-4 py-2 rounded-lg font-bold text-sm bg-gray-200 text-gray-700 border-2 border-gray-300 hover:bg-gray-300 transition-all duration-200">
      Secondary Action
    </button>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Custom button styled with gray design tokens for secondary actions.',
      },
    },
  },
};

export const CustomDangerButton = {
  render: () => (
    <button className="px-3 py-2 rounded-lg font-bold text-xs bg-red-100 text-red-700 border-2 border-red-300 hover:bg-red-200 transition-all duration-200">
      Clear Filters
    </button>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Custom button styled with red design tokens for destructive actions.',
      },
    },
  },
};

export const CustomSuccessButton = {
  render: () => (
    <button className="px-3 py-2 rounded-lg font-bold text-xs bg-green-100 text-green-700 border-2 border-green-300 hover:bg-green-200 transition-all duration-200">
      Select All
    </button>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Custom button styled with green design tokens for positive actions.',
      },
    },
  },
};

export const AllVariants = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="default">Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All button variants displayed together.',
      },
    },
  },
};
