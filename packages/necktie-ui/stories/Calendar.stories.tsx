import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Calendar, { OpeningHour } from '../src/components/Calendar';

const meta = {
  title: 'Components/Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Calendar component for selecting available appointment dates based on opening hours.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    openingHours: {
      control: 'object',
      description: 'Array of opening hours for each day',
    },
    selectedDate: {
      control: 'date',
      description: 'Currently selected date',
    },
  },
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<{
  openingHours: OpeningHour[];
  selectedDate?: Date;
  onDateSelect?: (date: string) => void;
}>;

const mockOpeningHours: OpeningHour[] = [
  {
    day: 'TUE',
    end: '19.50',
    isClosed: false,
    start: '9.50',
  },
  {
    day: 'FRI',
    end: '19.50',
    isClosed: false,
    start: '9.50',
  },
  {
    day: 'SUN',
    end: '18.00',
    isClosed: false,
    start: '9.50',
  },
  {
    day: 'MON',
    end: '19.50',
    isClosed: false,
    start: '9.50',
  },
  {
    day: 'THU',
    end: '19.50',
    isClosed: false,
    start: '9.50',
  },
  {
    day: 'WED',
    end: '19.50',
    isClosed: false,
    start: '9.50',
  },
  {
    day: 'SAT',
    end: '19.50',
    isClosed: false,
    start: '9.50',
  },
];

export const Default: Story = {
  args: {
    openingHours: mockOpeningHours,
    selectedDate: new Date(),
    onDateSelect: (_date: string) => {},
  },
};

export const Interactive: Story = {
  render: (args) => {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>();

    return (
      <Calendar
        {...args}
        selectedDate={selectedDate}
        onDateSelect={setSelectedDate}
        openingHours={mockOpeningHours}
      />
    );
  },
};

export const WeekdaysOnly: Story = {
  render: (args) => {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>();

    const weekdayHours: OpeningHour[] = [
      { day: 'MON', start: '8.00', end: '18.00', isClosed: false },
      { day: 'TUE', start: '8.00', end: '18.00', isClosed: false },
      { day: 'WED', start: '8.00', end: '18.00', isClosed: false },
      { day: 'THU', start: '8.00', end: '18.00', isClosed: false },
      { day: 'FRI', start: '8.00', end: '18.00', isClosed: false },
      { day: 'SAT', start: '8.00', end: '18.00', isClosed: true },
      { day: 'SUN', start: '8.00', end: '18.00', isClosed: true },
    ];

    return (
      <Calendar
        {...args}
        selectedDate={selectedDate}
        onDateSelect={setSelectedDate}
        openingHours={weekdayHours}
      />
    );
  },
};

export const LimitedAvailability: Story = {
  render: (args) => {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>();

    const limitedHours: OpeningHour[] = [
      { day: 'TUE', start: '14.00', end: '17.00', isClosed: false },
      { day: 'THU', start: '10.00', end: '12.00', isClosed: false },
      { day: 'SAT', start: '9.00', end: '13.00', isClosed: false },
    ];

    return (
      <Calendar
        {...args}
        selectedDate={selectedDate}
        onDateSelect={setSelectedDate}
        openingHours={limitedHours}
      />
    );
  },
};

export const MobileView: Story = {
  render: (args) => {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>();

    return (
      <div style={{ width: '320px', padding: '1rem' }}>
        <Calendar
          {...args}
          selectedDate={selectedDate}
          onDateSelect={setSelectedDate}
          openingHours={mockOpeningHours}
        />
      </div>
    );
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};
