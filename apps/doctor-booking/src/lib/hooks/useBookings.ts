import { useCallback, useEffect, useState } from 'react';

import {
  cancelBooking,
  createBooking,
  getBookingById,
  getBookings,
} from '@/lib/api/bookings';
import {
  ApiResponse,
  Booking,
  BookingsListResponse,
  CreateBookingPayload,
} from '@/lib/types';

interface UseBookingsState {
  data: BookingsListResponse | null;
  loading: boolean;
  error: string | null;
}

interface UseBookingsActions {
  fetchBookings: () => Promise<void>;
  refresh: () => Promise<void>;
}

/**
 * Hook for fetching bookings list
 */
export function useBookings(): UseBookingsState & UseBookingsActions {
  const [state, setState] = useState<UseBookingsState>({
    data: null,
    loading: false,
    error: null,
  });

  const fetchBookings = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const response: ApiResponse<BookingsListResponse> = await getBookings();

      if (response.success && response.data) {
        // Sort by status ('confirmed' first), then by date descending
        const sortedData = response.data.sort((a, b) => {
          // First, sort by status: 'confirmed' first
          if (a.status === 'confirmed' && b.status !== 'confirmed') return -1;
          if (a.status !== 'confirmed' && b.status === 'confirmed') return 1;
          // If status is the same, sort by date ascending
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        });
        response.data = sortedData;

        setState((prev) => ({
          ...prev,
          data: response.data!,
          loading: false,
        }));
      } else {
        setState((prev) => ({
          ...prev,
          error: response.error?.message || 'Failed to fetch bookings',
          loading: false,
        }));
      }
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: error instanceof Error ? error.message : 'An error occurred',
        loading: false,
      }));
    }
  }, []);

  const refresh = useCallback(async () => {
    await fetchBookings();
  }, [fetchBookings]);

  // Fetch initial data
  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  return {
    ...state,
    fetchBookings,
    refresh,
  };
}

interface UseBookingState {
  data: Booking | null;
  loading: boolean;
  error: string | null;
}

interface UseBookingActions {
  fetchBooking: (id: string) => Promise<void>;
  refresh: () => Promise<void>;
}

/**
 * Hook for fetching individual booking details
 */
export function useBooking(
  bookingId?: string
): UseBookingState & UseBookingActions {
  const [state, setState] = useState<UseBookingState>({
    data: null,
    loading: false,
    error: null,
  });

  const [currentId, setCurrentId] = useState<string | undefined>(bookingId);

  const fetchBooking = useCallback(async (id: string) => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    setCurrentId(id);

    try {
      const response: ApiResponse<Booking> = await getBookingById(id);

      if (response.success && response.data) {
        setState((prev) => ({
          ...prev,
          data: response.data!,
          loading: false,
        }));
      } else {
        setState((prev) => ({
          ...prev,
          error: response.error?.message || 'Failed to fetch booking details',
          loading: false,
        }));
      }
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: error instanceof Error ? error.message : 'An error occurred',
        loading: false,
      }));
    }
  }, []);

  const refresh = useCallback(async () => {
    if (currentId) {
      await fetchBooking(currentId);
    }
  }, [fetchBooking, currentId]);

  // Fetch initial data if bookingId is provided
  useEffect(() => {
    if (bookingId) {
      fetchBooking(bookingId);
    }
  }, [bookingId, fetchBooking]);

  return {
    ...state,
    fetchBooking,
    refresh,
  };
}

interface UseCreateBookingState {
  loading: boolean;
  error: string | null;
  success: boolean;
  data: Booking | null;
}

interface UseCreateBookingActions {
  createBooking: (payload: CreateBookingPayload) => Promise<boolean>;
  reset: () => void;
}

/**
 * Hook for creating new bookings
 */
export function useCreateBooking(): UseCreateBookingState &
  UseCreateBookingActions {
  const [state, setState] = useState<UseCreateBookingState>({
    loading: false,
    error: null,
    success: false,
    data: null,
  });

  const createBookingAction = useCallback(
    async (payload: CreateBookingPayload): Promise<boolean> => {
      setState((prev) => ({
        ...prev,
        loading: true,
        error: null,
        success: false,
      }));

      try {
        const response: ApiResponse<Booking> = await createBooking(payload);

        if (response.success && response.data) {
          setState((prev) => ({
            ...prev,
            data: response.data!,
            success: true,
            loading: false,
          }));
          return true;
        } else {
          setState((prev) => ({
            ...prev,
            error: response.error?.message || 'Failed to create booking',
            loading: false,
          }));
          return false;
        }
      } catch (error) {
        setState((prev) => ({
          ...prev,
          error: error instanceof Error ? error.message : 'An error occurred',
          loading: false,
        }));
        return false;
      }
    },
    []
  );

  const reset = useCallback(() => {
    setState({
      loading: false,
      error: null,
      success: false,
      data: null,
    });
  }, []);

  return {
    ...state,
    createBooking: createBookingAction,
    reset,
  };
}

interface UseCancelBookingState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

interface UseCancelBookingActions {
  cancelBooking: (id: string) => Promise<boolean>;
  reset: () => void;
}

/**
 * Hook for cancelling bookings
 */
export function useCancelBooking(): UseCancelBookingState &
  UseCancelBookingActions {
  const [state, setState] = useState<UseCancelBookingState>({
    loading: false,
    error: null,
    success: false,
  });

  const cancelBookingAction = useCallback(
    async (id: string): Promise<boolean> => {
      setState((prev) => ({
        ...prev,
        loading: true,
        error: null,
        success: false,
      }));

      try {
        const response: ApiResponse<Booking> = await cancelBooking(id);

        if (response.success) {
          setState((prev) => ({
            ...prev,
            success: true,
            loading: false,
          }));
          return true;
        } else {
          setState((prev) => ({
            ...prev,
            error: response.error?.message || 'Failed to cancel booking',
            loading: false,
          }));
          return false;
        }
      } catch (error) {
        setState((prev) => ({
          ...prev,
          error: error instanceof Error ? error.message : 'An error occurred',
          loading: false,
        }));
        return false;
      }
    },
    []
  );

  const reset = useCallback(() => {
    setState({
      loading: false,
      error: null,
      success: false,
    });
  }, []);

  return {
    ...state,
    cancelBooking: cancelBookingAction,
    reset,
  };
}
