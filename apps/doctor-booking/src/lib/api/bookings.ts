import {
  Booking,
  BookingsListResponse,
  CreateBookingPayload,
  UpdateBookingPayload,
  ApiResponse,
  BookingStatus,
} from '../types';
import { internalApiRequest } from './utils';

/**
 * Fetch all user bookings
 * @returns Promise with bookings list response
 */
export async function getBookings(): Promise<
  ApiResponse<BookingsListResponse>
> {
  const endpoint = `/bookings`;
  return internalApiRequest<BookingsListResponse>(endpoint);
}

/**
 * Create a new booking
 * @param payload - Booking creation data
 * @returns Promise with created booking
 */
export async function createBooking(
  payload: CreateBookingPayload
): Promise<ApiResponse<Booking>> {
  const endpoint = `/bookings`;

  return internalApiRequest<Booking>(endpoint, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

/**
 * Fetch booking details by ID
 * @param id - Booking ID
 * @returns Promise with booking details
 */
export async function getBookingById(
  id: string
): Promise<ApiResponse<Booking>> {
  const endpoint = `/bookings/${id}`;
  return internalApiRequest<Booking>(endpoint);
}

/**
 * Cancel a booking (update status to cancelled)
 * @param id - Booking ID
 * @returns Promise with updated booking
 */
export async function cancelBooking(id: string): Promise<ApiResponse<Booking>> {
  const endpoint = `/bookings/${id}`;

  const payload: UpdateBookingPayload = {
    status: BookingStatus.Cancelled,
  };

  return internalApiRequest<Booking>(endpoint, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}
