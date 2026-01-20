import type { Meta, StoryObj } from '@storybook/react';
import Button from '../src/components/Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A versatile button component with brand styling, multiple variants, sizes, and states. Optimized for mobile-first design with touch-friendly interactions.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'danger', 'ghost', 'flat'],
      description: 'Visual style variant of the button',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the button',
    },
    loading: {
      control: 'boolean',
      description: 'Shows loading spinner and disables interaction',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Makes button take full width of container',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the button',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Book Appointment',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Cancel',
    variant: 'secondary',
  },
};

export const Danger: Story = {
  args: {
    children: 'Delete Booking',
    variant: 'danger',
  },
};

export const Ghost: Story = {
  args: {
    children: 'View Details',
    variant: 'ghost',
  },
};
export const Flat: Story = {
  args: {
    children: '中文',
    variant: 'flat',
    startIcon: <span>🇨🇳</span>,
  },
};
export const Loading: Story = {
  args: {
    children: 'Processing...',
    variant: 'primary',
    loading: true,
  },
};

export const WithStartIcon: Story = {
  args: {
    children: 'Add Doctor',
    variant: 'primary',
    startIcon: <span>+</span>,
  },
};

export const WithEndIcon: Story = {
  args: {
    children: 'Next Step',
    variant: 'primary',
    endIcon: <span>→</span>,
  },
};

export const IconOnly: Story = {
  args: {
    variant: 'primary',
    startIcon: <span>❤️</span>,
    'aria-label': 'Favorite',
  },
};

export const Sizes: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '1rem',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      <Button size="sm" variant="primary">
        Small
      </Button>
      <Button size="md" variant="primary">
        Medium
      </Button>
      <Button size="lg" variant="primary">
        Large
      </Button>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="flat" startIcon={<span>🇺🇸</span>}>
        Flat
      </Button>
    </div>
  ),
};

export const FullWidth: Story = {
  args: {
    children: 'Confirm Booking',
    variant: 'primary',
    fullWidth: true,
  },
  parameters: {
    layout: 'padded',
  },
};

export const InternationalSupport: Story = {
  render: (args, { globals }) => {
    const isChineseLocale = globals.locale?.startsWith('zh');
    return (
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <Button variant="primary">
          {isChineseLocale ? '預約醫生' : 'Book Doctor'}
        </Button>
        <Button variant="secondary">
          {isChineseLocale ? '取消預約' : 'Cancel Booking'}
        </Button>
        <Button variant="danger">{isChineseLocale ? '刪除' : 'Delete'}</Button>
      </div>
    );
  },
};
