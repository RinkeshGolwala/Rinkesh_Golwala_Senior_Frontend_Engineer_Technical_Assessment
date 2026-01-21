export { getDoctors, getDoctorById } from './api/doctors';
export {
  getBookings,
  createBooking,
  getBookingById,
  cancelBooking,
} from './api/bookings';

export type {
  Doctor,
  DoctorsListResponse,
  Booking,
  CreateBookingPayload,
  UpdateBookingPayload,
  BookingsListResponse,
  ApiError,
  ApiResponse,
} from './types';

// React hooks (for use in components)
export { useDoctors, useDoctor } from './hooks/useDoctors';
export {
  useBookings,
  useBooking,
  useCreateBooking,
  useCancelBooking,
} from './hooks/useBookings';
