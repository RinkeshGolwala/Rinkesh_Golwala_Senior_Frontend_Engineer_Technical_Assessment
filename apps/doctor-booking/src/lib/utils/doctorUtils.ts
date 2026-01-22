import {
  DAY_FULL_NAMES,
  DAY_NAMES,
  DayOfWeek,
  getCurrentDay as getCurrentDayEnum,
} from '@/lib/constants/days';
import { OpeningHour } from '@/lib/types';

/**
 * Get the current day of the week in the format used by the API
 */
export function getCurrentDay(): DayOfWeek {
  return getCurrentDayEnum();
}

/**
 * Check if doctor is open now and find next open day
 */
export function getOpeningHoursStatus(openingHours: OpeningHour[]): {
  isOpenToday: boolean;
  isOpenNow: boolean;
  nextOpenDay: string | null;
} {
  const now = new Date();
  const today = getCurrentDay();
  const currentTime = now.getHours() * 60 + now.getMinutes(); // Current time in minutes since midnight

  const todayHours = openingHours.find((hours) => hours.day === today);
  const isOpenToday = todayHours ? !todayHours.isClosed : false;

  let isOpenNow = false;

  if (isOpenToday && todayHours) {
    // Parse opening hours to check if currently open
    const startTimeMinutes = timeToMinutes(todayHours.start);
    const endTimeMinutes = timeToMinutes(todayHours.end);

    isOpenNow =
      currentTime >= startTimeMinutes && currentTime <= endTimeMinutes;
  }

  // Find next open day
  let nextOpenDay = null;
  if (!isOpenToday) {
    const todayIndex = DAY_NAMES.indexOf(today);

    for (let i = 1; i <= 7; i++) {
      const nextDayIndex = (todayIndex + i) % 7;
      const nextDay = DAY_NAMES[nextDayIndex];
      const nextDayHours = openingHours.find((hours) => hours.day === nextDay);

      if (nextDayHours && !nextDayHours.isClosed) {
        nextOpenDay = DAY_FULL_NAMES[nextDayIndex];
        break;
      }
    }
  }

  return {
    isOpenToday,
    isOpenNow,
    nextOpenDay,
  };
}

/**
 * Convert time string to minutes since midnight
 */
function timeToMinutes(timeString: string): number {
  const [hours, minutes] = timeString.split('.').map(Number);
  return hours * 60 + minutes;
}
