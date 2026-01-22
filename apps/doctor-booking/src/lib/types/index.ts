import { DayOfWeek } from '@/lib';

export interface Doctor {
  id: string;
  name: string;
  description: string;
  address: {
    line_1: string;
    line_2: string;
    district: string;
  };
  opening_hours: OpeningHour[];
}

export interface OpeningHour {
  start: string;
  end: string;
  isClosed: boolean;
  day: DayOfWeek;
}

export interface DoctorsListResponse {
  doctors: Doctor[];
}

export enum BookingStatus {
  Cancelled = 'cancelled',
  Confirmed = 'confirmed',
}

export interface Booking {
  id: string;
  name: string;
  start: number;
  doctorId: string;
  date: string; // YYYY-MM-DD format
  status: BookingStatus;
}

export interface CreateBookingPayload {
  name: string;
  start: number;
  doctorId: string;
  date: string; // YYYY-MM-DD format
  status: BookingStatus;
}

export interface UpdateBookingPayload {
  status?: BookingStatus;
  name?: string;
  start?: number;
  date?: string;
}

export interface BookingsListResponse {
  bookings: Booking[];
}

// API Error Response
export interface ApiError {
  message: string;
  code?: string;
  field?: string;
  statusCode: number;
}

export interface ApiResponse<T> {
  data?: T;
  error?: ApiError;
  success: boolean;
}
