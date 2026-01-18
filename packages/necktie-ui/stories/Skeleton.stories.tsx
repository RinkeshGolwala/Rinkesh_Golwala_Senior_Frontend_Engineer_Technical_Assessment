import type { Meta, StoryObj } from '@storybook/react';
import Skeleton from '../src/components/Skeleton';

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
  render: () => (
    <div className="necktie-skeleton-doctor">
      <div className="necktie-skeleton-doctor__header">
        <Skeleton variant="avatar" className="necktie-skeleton-doctor__avatar" />
        <div className="necktie-skeleton-doctor__info">
          <Skeleton variant="text" width="180px" height="1.5rem" />
          <Skeleton variant="text" width="120px" height="1rem" />
        </div>
      </div>
      
      <div className="necktie-skeleton-doctor__content">
        <Skeleton variant="text" lines={2} />
        <Skeleton variant="text" width="80%" />
      </div>
      
      <div className="necktie-skeleton-doctor__footer">
        <Skeleton variant="rectangular" width="120px" height="36px" />
        <Skeleton variant="rectangular" width="100px" height="36px" />
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

export const BookingCardSkeleton: Story = {
  render: () => (
    <div className="necktie-skeleton-booking">
      <div className="necktie-skeleton-booking__header">
        <Skeleton variant="text" width="150px" height="1.25rem" />
        <Skeleton variant="rectangular" width="80px" height="24px" />
      </div>
      
      <div className="necktie-skeleton-booking__content">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <Skeleton variant="text" width="60px" />
          <Skeleton variant="text" width="120px" />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <Skeleton variant="text" width="40px" />
          <Skeleton variant="text" width="100px" />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Skeleton variant="text" width="40px" />
          <Skeleton variant="text" width="140px" />
        </div>
      </div>
      
      <div className="necktie-skeleton-booking__actions">
        <Skeleton variant="rectangular" width="80px" height="32px" />
        <Skeleton variant="rectangular" width="60px" height="32px" />
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

export const DoctorsListSkeleton: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
      {Array.from({ length: 3 }, (_, index) => (
        <div key={index} className="necktie-skeleton-doctor">
          <div className="necktie-skeleton-doctor__header">
            <Skeleton variant="avatar" className="necktie-skeleton-doctor__avatar" />
            <div className="necktie-skeleton-doctor__info">
              <Skeleton variant="text" width="160px" height="1.25rem" />
              <Skeleton variant="text" width="100px" height="1rem" />
            </div>
          </div>
          
          <div className="necktie-skeleton-doctor__content">
            <Skeleton variant="text" lines={2} />
          </div>
          
          <div className="necktie-skeleton-doctor__footer">
            <Skeleton variant="rectangular" width="100px" height="32px" />
            <Skeleton variant="rectangular" width="80px" height="32px" />
          </div>
        </div>
      ))}
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

export const ResponsiveSkeleton: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
      <div>
        <h4>Mobile Size</h4>
        <div style={{ width: '300px' }}>
          <div className="necktie-skeleton-doctor">
            <div className="necktie-skeleton-doctor__header">
              <Skeleton variant="avatar" />
              <div className='necktie-skeleton-doctor__info'>
                <Skeleton variant="text" width="140px" height="1rem" />
                <Skeleton variant="text" width="80px" height="0.875rem" />
              </div>
            </div>
            <Skeleton variant="text" lines={2} />
          </div>
        </div>
      </div>
      
      <div>
        <h4>Desktop Size</h4>
        <div style={{ width: '400px' }}>
          <div className="necktie-skeleton-doctor">
            <div className="necktie-skeleton-doctor__header">
              <Skeleton variant="avatar" width="56px" height="56px" />
              <div className="necktie-skeleton-doctor__info">
                <Skeleton variant="text" width="200px" height="1.25rem" />
                <Skeleton variant="text" width="120px" height="1rem" />
              </div>
            </div>
            <Skeleton variant="text" lines={3} />
            <div className="necktie-skeleton-doctor__footer">
              <Skeleton variant="rectangular" width="120px" height="36px" />
              <Skeleton variant="rectangular" width="100px" height="36px" />
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};