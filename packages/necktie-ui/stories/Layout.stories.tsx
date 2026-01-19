import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import Layout, { NavigationConfig } from '../src/components/Layout';

// Mock navigation configuration
const defaultNavigation: NavigationConfig = {
  routes: [
    {
      id: 'home',
      title: 'Home',
      url: '/',
    },
    {
      id: 'doctors',
      title: 'Find Doctors',
      url: '/doctors',
    },
    {
      id: 'bookings',
      title: 'My Bookings',
      url: '/bookings',
    },
    {
      id: 'profile',
      title: 'Profile',
      url: '/profile',
      className: 'custom-nav-item',
    },
  ],
  onRouteClick: fn(),
};

const meta: Meta<typeof Layout> = {
  title: 'Components/Layout',
  component: Layout,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A responsive layout component with configurable navigation, mobile drawer, and user avatar.',
      },
    },
  },
  argTypes: {
    userName: {
      control: 'text',
      description: 'User name for avatar initials',
    },
    activeRouteId: {
      control: 'text',
      description: 'ID of the currently active route',
    },
    navigation: {
      description: 'Navigation configuration with routes and click handler',
    },
    onUserMenuClick: {
      description: 'Handler for user avatar clicks',
    },
    children: {
      control: 'text',
      description: 'Content to display in the main area',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    userName: 'Jane Smith',
    activeRouteId: 'doctors',
    navigation: defaultNavigation,
    onUserMenuClick: fn(),
    children: (
      <div style={{ padding: '2rem' }}>
        <h2>Find Doctors</h2>
        <p>Browse available doctors and their specialties.</p>
        <p>This example shows the Layout with extended navigation options.</p>
      </div>
    ),
  },
};
