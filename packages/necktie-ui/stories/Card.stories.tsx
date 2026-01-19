import type { Meta, StoryObj } from '@storybook/react';
import Card from '../src/components/Card';
import Button from '../src/components/Button';

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A flexible card component for displaying content with consistent styling. Includes variants for different use cases like doctor profiles and booking information.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'elevated', 'outlined', 'interactive'],
      description: 'Visual style variant of the card',
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
      description: 'Internal padding size',
    },
    loading: {
      control: 'boolean',
      description: 'Shows loading overlay',
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div>
        <h3 style={{ margin: '0 0 1rem 0', color: 'rgb(42, 46, 66)' }}>
          Dr. Sarah Chen
        </h3>
        <p style={{ margin: 0, color: 'rgb(104, 113, 136)' }}>
          Specialist in Internal Medicine with 15 years of experience. Available
          for consultation Monday through Friday.
        </p>
      </div>
    ),
  },
};

export const WithHeader: Story = {
  args: {
    header: (
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: '#ff0068',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
          }}
        >
          SC
        </div>
        <div>
          <h4 style={{ margin: 0, color: 'rgb(42, 46, 66)' }}>
            Dr. Sarah Chen
          </h4>
          <span style={{ fontSize: '0.875rem', color: 'rgb(104, 113, 136)' }}>
            Internal Medicine
          </span>
        </div>
      </div>
    ),
    children: (
      <p style={{ margin: 0, color: 'rgb(104, 113, 136)' }}>
        Available for consultation Monday through Friday, 9:00 AM - 5:00 PM.
        Specializes in preventive care and chronic disease management.
      </p>
    ),
  },
};

export const WithFooter: Story = {
  args: {
    header: (
      <h3 style={{ margin: 0, color: 'rgb(42, 46, 66)' }}>Dr. Sarah Chen</h3>
    ),
    children: (
      <p style={{ margin: 0, color: 'rgb(104, 113, 136)' }}>
        Internal Medicine specialist with focus on preventive care.
      </p>
    ),
    footer: (
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <Button variant="primary" size="sm">
          Book Appointment
        </Button>
        <Button variant="ghost" size="sm">
          View Profile
        </Button>
      </div>
    ),
  },
};

export const Interactive: Story = {
  args: {
    variant: 'interactive',
    onClick: () => alert('Card clicked!'),
    children: (
      <div>
        <h3 style={{ margin: '0 0 1rem 0', color: 'rgb(42, 46, 66)' }}>
          Dr. Michael Wong
        </h3>
        <p style={{ margin: 0, color: 'rgb(104, 113, 136)' }}>
          Click this card to view doctor details and available appointment
          slots.
        </p>
      </div>
    ),
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    children: (
      <div>
        <h3 style={{ margin: '0 0 1rem 0', color: 'rgb(42, 46, 66)' }}>
          Loading Doctor Info...
        </h3>
        <p style={{ margin: 0, color: 'rgb(104, 113, 136)' }}>
          Please wait while we fetch the latest information.
        </p>
      </div>
    ),
  },
};

export const Variants: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gap: '1rem',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      }}
    >
      <Card variant="default">
        <h4 style={{ margin: '0 0 0.5rem 0' }}>Default</h4>
        <p
          style={{
            margin: 0,
            fontSize: '0.875rem',
            color: 'rgb(104, 113, 136)',
          }}
        >
          Standard card with subtle shadow
        </p>
      </Card>
      <Card variant="elevated">
        <h4 style={{ margin: '0 0 0.5rem 0' }}>Elevated</h4>
        <p
          style={{
            margin: 0,
            fontSize: '0.875rem',
            color: 'rgb(104, 113, 136)',
          }}
        >
          Enhanced shadow for emphasis
        </p>
      </Card>
      <Card variant="outlined">
        <h4 style={{ margin: '0 0 0.5rem 0' }}>Outlined</h4>
        <p
          style={{
            margin: 0,
            fontSize: '0.875rem',
            color: 'rgb(104, 113, 136)',
          }}
        >
          Border-only styling
        </p>
      </Card>
      <Card variant="interactive" onClick={() => alert('Clicked!')}>
        <h4 style={{ margin: '0 0 0.5rem 0' }}>Interactive</h4>
        <p
          style={{
            margin: 0,
            fontSize: '0.875rem',
            color: 'rgb(104, 113, 136)',
          }}
        >
          Hover and click effects
        </p>
      </Card>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

export const DoctorProfile: Story = {
  render: () => (
    <Card
      variant="elevated"
      className="necktie-card--doctor"
      header={
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              backgroundColor: '#ff0068',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '1.25rem',
            }}
          >
            Dr
          </div>
          <div>
            <h3 style={{ margin: 0, color: 'rgb(42, 46, 66)' }}>
              Dr. Emily Zhang
            </h3>
            <p
              style={{
                margin: '0.25rem 0 0 0',
                color: 'rgb(104, 113, 136)',
                fontSize: '0.875rem',
              }}
            >
              Cardiology • 12 years experience
            </p>
          </div>
        </div>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <div>
          <strong style={{ color: 'rgb(42, 46, 66)' }}>Specializations:</strong>
          <p
            style={{
              margin: '0.25rem 0 0 0',
              color: 'rgb(104, 113, 136)',
              fontSize: '0.875rem',
            }}
          >
            Interventional Cardiology, Heart Disease Prevention, Cardiac Imaging
          </p>
        </div>
        <div>
          <strong style={{ color: 'rgb(42, 46, 66)' }}>Languages:</strong>
          <p
            style={{
              margin: '0.25rem 0 0 0',
              color: 'rgb(104, 113, 136)',
              fontSize: '0.875rem',
            }}
          >
            English, Mandarin, Cantonese
          </p>
        </div>
      </div>
    </Card>
  ),
};

export const BookingCard: Story = {
  render: () => (
    <Card
      className="necktie-card--booking necktie-card--confirmed"
      header={
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            columnGap: '1rem',
          }}
        >
          <span style={{ fontWeight: 'bold', color: 'rgb(42, 46, 66)' }}>
            Upcoming Appointment
          </span>
          <span
            style={{
              backgroundColor: '#28a745',
              color: 'white',
              padding: '0.25rem 0.5rem',
              borderRadius: '4px',
              fontSize: '0.75rem',
              fontWeight: 'bold',
            }}
          >
            CONFIRMED
          </span>
        </div>
      }
      footer={
        <div
          style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}
        >
          <Button variant="ghost" size="sm">
            Reschedule
          </Button>
          <Button variant="danger" size="sm">
            Cancel
          </Button>
        </div>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: 'rgb(104, 113, 136)' }}>Doctor:</span>
          <strong style={{ color: 'rgb(42, 46, 66)' }}>Dr. Emily Zhang</strong>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: 'rgb(104, 113, 136)' }}>Date:</span>
          <strong style={{ color: 'rgb(42, 46, 66)' }}>January 25, 2026</strong>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: 'rgb(104, 113, 136)' }}>Time:</span>
          <strong style={{ color: 'rgb(42, 46, 66)' }}>
            2:00 PM - 3:00 PM
          </strong>
        </div>
      </div>
    </Card>
  ),
};

export const InternationalSupport: Story = {
  render: (args, { globals }) => {
    const isChineseLocale = globals.locale?.startsWith('zh');
    return (
      <Card variant="elevated">
        {isChineseLocale ? (
          <div>
            <h3 style={{ margin: '0 0 1rem 0', color: 'rgb(42, 46, 66)' }}>
              張醫生
            </h3>
            <p style={{ margin: 0, color: 'rgb(104, 113, 136)' }}>
              心臟科專家，擁有12年豐富經驗。專長於介入性心臟病學、心臟病預防和心臟影像診斷。
            </p>
          </div>
        ) : (
          <div>
            <h3 style={{ margin: '0 0 1rem 0', color: 'rgb(42, 46, 66)' }}>
              Dr. Emily Zhang
            </h3>
            <p style={{ margin: 0, color: 'rgb(104, 113, 136)' }}>
              Cardiology specialist with 12 years of experience. Specializes in
              interventional cardiology, heart disease prevention, and cardiac
              imaging.
            </p>
          </div>
        )}
      </Card>
    );
  },
};
