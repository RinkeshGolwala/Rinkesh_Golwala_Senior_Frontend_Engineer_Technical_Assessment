import React from 'react';
import clsx from 'clsx';
import './TimeSlot.scss';
import { OpeningHour } from '../Calendar';

export interface TimeSlotProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Time slot value */
  time: string;
  /** Whether this slot is selected */
  selected?: boolean;
  /** Whether this slot is disabled/unavailable */
  disabled?: boolean;
}

export interface TimeSlotListProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Selected date */
  selectedDate: Date;
  /** Opening hours for the selected date */
  openingHour: OpeningHour;
  /** Selected time slot */
  selectedTime?: string;
  /** Callback when time slot is selected */
  onTimeSelect?: (time: string) => void;
  /** Duration of each slot in minutes */
  slotDuration?: number;
  /** Label for available times title */
  availableTimesLabel?: string;
  /** Label for no available slots message */
  noSlotsLabel?: string;
}

const TimeSlot = React.forwardRef<HTMLButtonElement, TimeSlotProps>(
  (
    { time, selected = false, disabled = false, className, children, ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={clsx(
          'necktie-timeslot',
          {
            'necktie-timeslot--selected': selected,
            'necktie-timeslot--disabled': disabled,
          },
          className
        )}
        disabled={disabled}
        type="button"
        {...props}
      >
        {children || time}
      </button>
    );
  }
);

TimeSlot.displayName = 'TimeSlot';

const TimeSlotList = React.forwardRef<HTMLDivElement, TimeSlotListProps>(
  (
    {
      selectedDate,
      openingHour,
      selectedTime,
      onTimeSelect,
      slotDuration = 60,
      availableTimesLabel = 'Available Times',
      noSlotsLabel = 'No available time slots for this date',
      className,
      ...props
    },
    ref
  ) => {
    const generateTimeSlots = () => {
      // Check if the day is closed
      if (openingHour.isClosed) return [];

      const slots = [];

      // Convert time string to minutes (e.g., "9.50" -> 9*60 + 50 = 590)
      const parseTime = (timeStr: string) => {
        const [hours, minutes] = timeStr.split('.').map(Number);
        return hours * 60 + (minutes || 0);
      };

      // Convert minutes back to time string
      const formatTime = (minutes: number) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        const padZero = (num: number) =>
          num < 10 ? `0${num}` : num.toString();
        return `${padZero(hours)}:${padZero(mins)}`;
      };

      const startMinutes = parseTime(openingHour.start);
      const endMinutes = parseTime(openingHour.end);

      // Check if the selected date is today
      const today = new Date();
      const isToday = selectedDate.toDateString() === today.toDateString();
      const currentMinutes = isToday
        ? today.getHours() * 60 + today.getMinutes()
        : 0;

      for (let time = startMinutes; time < endMinutes; time += slotDuration) {
        const slotEndTime = time + slotDuration;

        // Skip slots that have already passed today
        if (isToday && slotEndTime <= currentMinutes) {
          continue;
        }

        // Don't create slot if it would extend beyond closing time
        if (slotEndTime > endMinutes) {
          break;
        }

        slots.push({
          time: formatTime(time),
          value: formatTime(time),
          disabled: false,
        });
      }

      return slots;
    };

    const timeSlots = generateTimeSlots();

    const handleTimeClick = (time: string) => {
      if (onTimeSelect) {
        onTimeSelect(time);
      }
    };

    if (timeSlots.length === 0) {
      return (
        <div
          ref={ref}
          className={clsx(
            'necktie-timeslot-list',
            'necktie-timeslot-list--empty',
            className
          )}
          {...props}
        >
          <p className="necktie-timeslot-list__empty-message">{noSlotsLabel}</p>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={clsx('necktie-timeslot-list', className)}
        {...props}
      >
        <div className="necktie-timeslot-list__header">
          <h4 className="necktie-timeslot-list__title">
            {availableTimesLabel}
          </h4>
          <p className="necktie-timeslot-list__date">
            {selectedDate.toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>

        <div className="necktie-timeslot-list__slots">
          {timeSlots.map((slot) => (
            <TimeSlot
              key={slot.value}
              time={slot.time}
              selected={selectedTime === slot.value}
              disabled={slot.disabled}
              onClick={() => handleTimeClick(slot.value)}
            />
          ))}
        </div>
      </div>
    );
  }
);

TimeSlotList.displayName = 'TimeSlotList';

export { TimeSlotList };
export default TimeSlot;
