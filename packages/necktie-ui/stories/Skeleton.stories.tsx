import type { Meta, StoryObj } from '@storybook/react';
import Skeleton, { SkeletonDoctorCard, SkeletonBookingCard } from '../src/components/Skeleton';

const meta = {
  title: 'Components/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Loading skeleton component with various shapes and animations. Used to indicate content is loading while maintaining layout structure.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['text', 'circular', 'rectangular', 'avatar'],
      description: 'Shape variant of the skeleton',
    },
    animation: {
      control: 'select',
      options: ['wave', 'pulse', 'none'],
      description: 'Animation type',
    },
    width: {
      control: 'text',
      description: 'Width of skeleton (CSS value)',
    },
    height: {
      control: 'text',
      description: 'Height of skeleton (CSS value)',
    },
    lines: {
      control: 'number',
      description: 'Number of text lines (text variant only)',
    },
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Text: Story = {
  args: {
    variant: 'text',
    width: '200px',
  },
};

export const MultipleLines: Story = {
  args: {
    variant: 'text',
    lines: 3,
    width: '300px',
  },
};

export const Circular: Story = {
  args: {
    variant: 'circular',
    width: '60px',
    height: '60px',
  },
};

export const Avatar: Story = {
  args: {
    variant: 'avatar',
  },
};

export const Rectangular: Story = {
  args: {
    variant: 'rectangular',
    width: '300px',
    height: '200px',
  },
};

export const Animations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h4>Wave Animation (default)</h4>
        <Skeleton variant="text" lines={2} width="250px" animation="wave" />
      </div>
      <div>
        <h4>Pulse Animation</h4>
        <Skeleton variant="text" lines={2} width="250px" animation="pulse" />
      </div>
      <div>
        <h4>No Animation</h4>
        <Skeleton variant="text" lines={2} width="250px" animation="none" />
      </div>
    </div>
  ),
};

export const DoctorCardSkeleton: Story = {
  render: () => <SkeletonDoctorCard />,
  parameters: {
    layout: 'padded',
  },
};

export const BookingCardSkeleton: Story = {
  render: () => <SkeletonBookingCard />,
  parameters: {
    layout: 'padded',
  },
};

export const DoctorsListSkeleton: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      {Array.from({ length: 3 }, (_, index) => (
        <SkeletonDoctorCard key={index} />
      ))}
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

export const SkeletonAnimations: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))' }}>
      <div>
        <h4>Wave Animation (Default)</h4>
        <SkeletonDoctorCard animation="wave" />
        <div style={{ marginTop: '1rem' }}>
          <SkeletonBookingCard animation="wave" />
        </div>
      </div>
      
      <div>
        <h4>Pulse Animation</h4>
        <SkeletonDoctorCard animation="pulse" />
        <div style={{ marginTop: '1rem' }}>
          <SkeletonBookingCard animation="pulse" />
        </div>
      </div>
      
      <div>
        <h4>No Animation</h4>
        <SkeletonDoctorCard animation="none" />
        <div style={{ marginTop: '1rem' }}>
          <SkeletonBookingCard animation="none" />
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};