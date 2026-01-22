import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import TimeSlot, { TimeSlotList } from '../src/components/TimeSlot';
import { OpeningHour } from '../src/components/Calendar';

const meta = {
  title: 'Components/TimeSlot',
  component: TimeSlot,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Time slot components for selecting appointment times. Includes individual time slot pills and a complete time slot list.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    time: {
      control: 'text',
      description: 'Time slot value',
    },
    selected: {
      control: 'boolean',
      description: 'Whether the slot is selected',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the slot is disabled',
    },
  },
} satisfies Meta<typeof TimeSlot>;

export default meta;
type Story = StoryObj<{
  time: string;
  selected?: boolean;
  disabled?: boolean;
}>;

const mockOpeningHour: OpeningHour = {
  day: 'TUE',
  end: '19.50',
  isClosed: false,
  start: '9.50',
};

export const Default: Story = {
  args: {
    time: '10:00',
  },
};

export const Selected: Story = {
  args: {
    time: '10:00',
    selected: true,
  },
};

export const Disabled: Story = {
  args: {
    time: '10:00',
    disabled: true,
  },
};

export const TimeSlotVariations: Story = {
  args: {},
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <TimeSlot time="09:00" />
      <TimeSlot time="10:30" selected />
      <TimeSlot time="14:00" disabled />
      <TimeSlot time="16:45" />
    </div>
  ),
};

export const TimeSlotListExample: Story = {
  args: {},
  render: () => {
    const [selectedTime, setSelectedTime] = useState<string>('');
    const today = new Date();

    // Set to next Monday for demonstration
    const nextMonday = new Date(today);
    nextMonday.setDate(today.getDate() + ((1 + 7 - today.getDay()) % 7));

    return (
      <div style={{ maxWidth: '500px', padding: '1rem' }}>
        <TimeSlotList
          selectedDate={nextMonday}
          openingHour={mockOpeningHour}
          selectedTime={selectedTime}
          onTimeSelect={setSelectedTime}
        />
      </div>
    );
  },
};

export const TimeSlotListToday: Story = {
  args: {},
  render: () => {
    const [selectedTime, setSelectedTime] = useState<string>('');
    const today = new Date();

    return (
      <div style={{ maxWidth: '500px', padding: '1rem' }}>
        <TimeSlotList
          selectedDate={today}
          openingHour={mockOpeningHour}
          selectedTime={selectedTime}
          onTimeSelect={setSelectedTime}
          availableTimesLabel="Available Times"
          noSlotsLabel="No available time slots for this date"
        />
        <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#666' }}>
          Note: Past time slots are automatically filtered out for today's date
        </p>
      </div>
    );
  },
};

export const NoAvailableSlots: Story = {
  args: {},
  render: () => {
    const closedHours: OpeningHour = {
      day: 'MON',
      start: '9.00',
      end: '17.00',
      isClosed: true,
    };

    const monday = new Date();
    monday.setDate(monday.getDate() + ((1 + 7 - monday.getDay()) % 7));

    return (
      <div style={{ maxWidth: '500px', padding: '1rem' }}>
        <TimeSlotList
          selectedDate={monday}
          openingHour={closedHours}
          selectedTime=""
          onTimeSelect={() => {}}
          availableTimesLabel="Available Times"
          noSlotsLabel="Doctor is closed on this day"
        />
      </div>
    );
  },
};

export const ShortHours: Story = {
  args: {},
  render: () => {
    const [selectedTime, setSelectedTime] = useState<string>('');

    const shortHours: OpeningHour = {
      day: 'MON',
      start: '14.00',
      end: '16.00',
      isClosed: false,
    };

    const monday = new Date();
    monday.setDate(monday.getDate() + ((1 + 7 - monday.getDay()) % 7));

    return (
      <div style={{ maxWidth: '500px', padding: '1rem' }}>
        <TimeSlotList
          selectedDate={monday}
          openingHour={shortHours}
          selectedTime={selectedTime}
          onTimeSelect={setSelectedTime}
          availableTimesLabel="Available Times (Limited)"
          noSlotsLabel="No slots available in this short window"
        />
      </div>
    );
  },
};
