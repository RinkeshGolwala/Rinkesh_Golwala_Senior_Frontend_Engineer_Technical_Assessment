import clsx from 'clsx';
import React, { useEffect, useMemo, useState } from 'react';
import './Calendar.scss';

export interface OpeningHour {
  day: 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN';
  start: string; // Format: "9.50"
  end: string; // Format: "19.50"
  isClosed: boolean;
}

export interface CalendarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Opening hours array */
  openingHours: OpeningHour[];
  /** Selected date */
  selectedDate?: Date;
  /** Callback when date is selected */
  onDateSelect?: (date: Date) => void;
}

const DAY_NAMES = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'] as const;
const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const AVAILABLE_DAYS_PERIOD = 30; // Show available dates for 30 days ahead

const Calendar = React.forwardRef<HTMLDivElement, CalendarProps>(
  ({ openingHours, selectedDate, onDateSelect, className, ...props }, ref) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());

    // Calculate available days from opening hours
    const availableDays = useMemo(() => {
      return new Set(
        openingHours.filter((hour) => !hour.isClosed).map((hour) => hour.day)
      );
    }, [openingHours]);

    // Calculate specific available dates (all matching days within the period)
    const availableDates = useMemo(() => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const dates = new Set<string>();
      const checkDate = new Date(today);

      // Look for all available dates within the period
      for (
        let daysChecked = 0;
        daysChecked < AVAILABLE_DAYS_PERIOD;
        daysChecked++
      ) {
        const dayName = DAY_NAMES[checkDate.getDay()];
        if (availableDays.has(dayName)) {
          dates.add(checkDate.toDateString());
        }
        checkDate.setDate(checkDate.getDate() + 1);
      }

      return dates;
    }, [availableDays]);

    // Calculate date range
    const dateRange = useMemo(() => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const calculatedMaxDate = new Date(
        today.getTime() + AVAILABLE_DAYS_PERIOD * 24 * 60 * 60 * 1000
      );

      return {
        minDate: today,
        maxDate: calculatedMaxDate,
      };
    }, []);

    // Find the nearest available date
    const nearestAvailableDate = useMemo(() => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const checkDate = new Date(today);

      // Look through available dates within the period
      for (let i = 0; i < AVAILABLE_DAYS_PERIOD; i++) {
        if (availableDates.has(checkDate.toDateString())) {
          return checkDate;
        }
        checkDate.setDate(checkDate.getDate() + 1);
      }

      return null;
    }, [availableDates]);

    // Set default selected date
    useEffect(() => {
      if (!selectedDate && nearestAvailableDate && onDateSelect) {
        onDateSelect(new Date(nearestAvailableDate));
      }
    }, [selectedDate, nearestAvailableDate, onDateSelect]);

    const isDateAvailable = (date: Date) => {
      const { minDate: calculatedMinDate, maxDate: calculatedMaxDate } =
        dateRange;
      if (date < calculatedMinDate || date > calculatedMaxDate) return false;

      return availableDates.has(date.toDateString());
    };

    const isDateSelected = (date: Date) => {
      if (!selectedDate) return false;
      return date.toDateString() === selectedDate.toDateString();
    };

    const handleDateClick = (date: Date) => {
      if (isDateAvailable(date) && onDateSelect) {
        onDateSelect(new Date(date));
      }
    };

    const navigateMonth = (direction: 'prev' | 'next') => {
      const newMonth = new Date(currentMonth);
      if (direction === 'prev') {
        newMonth.setMonth(newMonth.getMonth() - 1);
      } else {
        newMonth.setMonth(newMonth.getMonth() + 1);
      }
      setCurrentMonth(newMonth);
    };

    const renderCalendarDays = () => {
      const firstDay = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        1
      );
      const startDate = new Date(firstDay);
      startDate.setDate(startDate.getDate() - firstDay.getDay());

      const days = [];
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 48); // 7 weeks

      for (
        let date = new Date(startDate);
        date <= endDate;
        date.setDate(date.getDate() + 1)
      ) {
        const currentDate = new Date(date);
        const isCurrentMonth =
          currentDate.getMonth() === currentMonth.getMonth();
        const isAvailable = isDateAvailable(currentDate);
        const isSelected = isDateSelected(currentDate);

        days.push(
          <button
            key={currentDate.toISOString()}
            className={clsx('necktie-calendar__day', {
              'necktie-calendar__day--current-month': isCurrentMonth,
              'necktie-calendar__day--available': isAvailable,
              'necktie-calendar__day--selected': isSelected,
              'necktie-calendar__day--disabled': !isAvailable,
            })}
            onClick={() => handleDateClick(currentDate)}
            disabled={!isAvailable}
            type="button"
          >
            {currentDate.getDate()}
          </button>
        );
      }

      return days;
    };

    return (
      <div ref={ref} className={clsx('necktie-calendar', className)} {...props}>
        <div className="necktie-calendar__header">
          <button
            className="necktie-calendar__nav-button"
            onClick={() => navigateMonth('prev')}
            type="button"
          >
            ←
          </button>

          <h3 className="necktie-calendar__month-year">
            {MONTH_NAMES[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </h3>

          <button
            className="necktie-calendar__nav-button"
            onClick={() => navigateMonth('next')}
            type="button"
          >
            →
          </button>
        </div>

        <div className="necktie-calendar__weekdays">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="necktie-calendar__weekday">
              {day}
            </div>
          ))}
        </div>

        <div className="necktie-calendar__days">{renderCalendarDays()}</div>
      </div>
    );
  }
);

Calendar.displayName = 'Calendar';

export default Calendar;
