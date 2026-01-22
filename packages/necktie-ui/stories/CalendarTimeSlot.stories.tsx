import type { StoryObj } from '@storybook/react';
import { useState } from 'react';
import Calendar, { OpeningHour } from '../src/components/Calendar';
import { TimeSlotList } from '../src/components/TimeSlot';

const meta = {
  title: 'Components/CalendarTimeSlot',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Combined Calendar and TimeSlot components working together for complete appointment booking experience.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

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
    start: '10.50',
  },
  {
    day: 'SUN',
    end: '15.00',
    isClosed: false,
    start: '12.50',
  },
  {
    day: 'MON',
    end: '11.50',
    isClosed: false,
    start: '9.00',
  },
  {
    day: 'THU',
    end: '19.50',
    isClosed: false,
    start: '9.50',
  },
  {
    day: 'WED',
    end: '14.00',
    isClosed: false,
    start: '9.00',
  },
  {
    day: 'SAT',
    end: '19.50',
    isClosed: false,
    start: '9.50',
  },
];

export const CompleteBookingFlow: Story = {
  args: {},
  render: () => {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>();
    const [selectedTime, setSelectedTime] = useState<string>('');

    // Helper function to get opening hour for selected date
    const getOpeningHourForDate = (date: Date) => {
      const dayNames = [
        'SUN',
        'MON',
        'TUE',
        'WED',
        'THU',
        'FRI',
        'SAT',
      ] as const;
      const selectedDayName = dayNames[date.getDay()];
      return mockOpeningHours.find((hour) => hour.day === selectedDayName);
    };

    return (
      <div
        style={{
          display: 'grid',
          gap: '2rem',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          maxWidth: '800px',
        }}
      >
        <div>
          <h3 style={{ marginTop: 0, marginBottom: '1rem', color: '#1a1a1a' }}>
            Select Date
          </h3>
          <Calendar
            openingHours={mockOpeningHours}
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
          />
        </div>

        {selectedDate && getOpeningHourForDate(selectedDate) && (
          <div>
            <h3
              style={{ marginTop: 0, marginBottom: '1rem', color: '#1a1a1a' }}
            >
              Select Time
            </h3>
            <TimeSlotList
              selectedDate={selectedDate}
              openingHour={getOpeningHourForDate(selectedDate)!}
              selectedTime={selectedTime}
              onTimeSelect={setSelectedTime}
              availableTimesLabel="Available Times"
              noSlotsLabel="No available time slots for this date"
            />
          </div>
        )}

        {selectedDate && selectedTime && (
          <div
            style={{
              gridColumn: '1 / -1',
              padding: '1rem',
              backgroundColor: '#f8f9fa',
              borderRadius: '8px',
              border: '1px solid #e9ecef',
            }}
          >
            <h4 style={{ margin: '0 0 0.5rem', color: '#1a1a1a' }}>
              Booking Summary
            </h4>
            <p style={{ margin: 0, color: '#6c757d' }}>
              <strong>Date:</strong>{' '}
              {selectedDate.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
              <br />
              <strong>Time:</strong> {selectedTime}
            </p>
          </div>
        )}
      </div>
    );
  },
};

export const WeekendOnlyHours: Story = {
  args: {},
  render: () => {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>();
    const [selectedTime, setSelectedTime] = useState<string>('');

    const weekendHours: OpeningHour[] = [
      { day: 'SAT', start: '9.00', end: '17.00', isClosed: false },
      { day: 'SUN', start: '10.00', end: '14.00', isClosed: false },
    ];

    // Helper function to get opening hour for selected date
    const getOpeningHourForDate = (date: Date, hours: OpeningHour[]) => {
      const dayNames = [
        'SUN',
        'MON',
        'TUE',
        'WED',
        'THU',
        'FRI',
        'SAT',
      ] as const;
      const selectedDayName = dayNames[date.getDay()];
      return hours.find((hour) => hour.day === selectedDayName);
    };

    return (
      <div
        style={{
          display: 'grid',
          gap: '2rem',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          maxWidth: '800px',
        }}
      >
        <div>
          <h3 style={{ marginTop: 0, marginBottom: '1rem', color: '#1a1a1a' }}>
            Select Date (Weekends Only)
          </h3>
          <Calendar
            openingHours={weekendHours}
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
          />
        </div>

        {selectedDate && getOpeningHourForDate(selectedDate, weekendHours) && (
          <div>
            <h3
              style={{ marginTop: 0, marginBottom: '1rem', color: '#1a1a1a' }}
            >
              Select Time
            </h3>
            <TimeSlotList
              selectedDate={selectedDate}
              openingHour={getOpeningHourForDate(selectedDate, weekendHours)!}
              selectedTime={selectedTime}
              onTimeSelect={setSelectedTime}
              availableTimesLabel="Weekend Times Available"
              noSlotsLabel="No weekend slots available"
            />
          </div>
        )}
      </div>
    );
  },
};
