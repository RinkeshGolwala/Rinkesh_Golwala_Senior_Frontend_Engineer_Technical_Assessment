import { Doctor, OpeningHour } from '@/lib/types';
import { DAY_NAMES } from '@/lib';

/**
 * Get the opening hour for a specific date
 */
export function getOpeningHourForDate(
  date: Date,
  openingHours: Doctor['opening_hours']
): OpeningHour | undefined {
  const selectedDayName = DAY_NAMES[date.getDay()];
  return openingHours.find((hour) => hour.day === selectedDayName);
}

/**
 * Get the adjusted opening hour for a date, considering current time for today
 * If the selected date is today and current time is past the opening time,
 * adjusts the start time to the next available slot
 */
export function getAdjustedOpeningHourForDate(
  date: Date,
  openingHours: Doctor['opening_hours']
): OpeningHour | undefined {
  const openingHour = getOpeningHourForDate(date, openingHours);
  if (!openingHour || openingHour.isClosed) return openingHour;

  const today = new Date();
  const isToday = date.toDateString() === today.toDateString();

  if (!isToday) {
    return openingHour;
  }

  // If it's today, adjust the start time based on current time
  const currentHour = today.getHours();
  const currentMinute = today.getMinutes();
  const [startHour, startMinute] = openingHour.start.split('.').map(Number);

  // If current time is past opening time, adjust start time to next available slot based on opening hour's minute
  if (
    currentHour > startHour ||
    (currentHour === startHour && currentMinute > startMinute)
  ) {
    // Get slot minute from opening hour
    const slotMinute = startMinute;
    let nextSlotHour = currentHour;
    // If current minute >= slot minute, move to next hour
    if (currentMinute >= slotMinute) {
      nextSlotHour += 1;
    }
    // Format as HH.MM
    const adjustedStartTime = `${nextSlotHour.toString().padStart(2, '0')}.${slotMinute.toString().padStart(2, '0')}`;

    // Check if adjusted start time is still within opening hours
    const [endHour, endMinute] = openingHour.end.split('.').map(Number);
    const endTimeDecimal = endHour + endMinute / 60;
    const adjustedTimeDecimal = nextSlotHour + slotMinute / 60;

    if (adjustedTimeDecimal >= endTimeDecimal) {
      // No available slots for today
      return {
        ...openingHour,
        isClosed: true,
      };
    }

    return {
      ...openingHour,
      start: adjustedStartTime,
    };
  }

  return openingHour;
}
