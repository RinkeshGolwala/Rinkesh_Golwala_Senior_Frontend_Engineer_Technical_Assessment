import { useState, useEffect, useCallback } from 'react';
import { getDoctors, getDoctorById } from '../api/doctors';
import { Doctor, DoctorsListResponse, ApiResponse } from '../types';

interface UseDoctorsState {
  data: DoctorsListResponse | null;
  loading: boolean;
  error: string | null;
}

interface UseDoctorsActions {
  fetchDoctors: () => Promise<void>;
  refresh: () => Promise<void>;
}

/**
 * Hook for fetching doctors list
 */
export function useDoctors(): UseDoctorsState & UseDoctorsActions {
  const [state, setState] = useState<UseDoctorsState>({
    data: null,
    loading: false,
    error: null,
  });

  const fetchDoctors = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const response: ApiResponse<DoctorsListResponse> = await getDoctors();

      if (response.success && response.data) {
        setState((prev) => ({
          ...prev,
          data: response.data!,
          loading: false,
        }));
      } else {
        setState((prev) => ({
          ...prev,
          error: response.error?.message || 'Failed to fetch doctors',
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
    await fetchDoctors();
  }, [fetchDoctors]);

  // Fetch initial data
  useEffect(() => {
    fetchDoctors();
  }, [fetchDoctors]);

  return {
    ...state,
    fetchDoctors,
    refresh,
  };
}

interface UseDoctorState {
  data: Doctor | null;
  loading: boolean;
  error: string | null;
}

interface UseDoctorActions {
  fetchDoctor: (id: string) => Promise<void>;
  refresh: () => Promise<void>;
}

/**
 * Hook for fetching individual doctor details
 */
export function useDoctor(
  doctorId?: string
): UseDoctorState & UseDoctorActions {
  const [state, setState] = useState<UseDoctorState>({
    data: null,
    loading: false,
    error: null,
  });

  const [currentId, setCurrentId] = useState<string | undefined>(doctorId);

  const fetchDoctor = useCallback(async (id: string) => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    setCurrentId(id);

    try {
      const response: ApiResponse<Doctor> = await getDoctorById(id);

      if (response.success && response.data) {
        setState((prev) => ({
          ...prev,
          data: response.data!,
          loading: false,
        }));
      } else {
        setState((prev) => ({
          ...prev,
          error: response.error?.message || 'Failed to fetch doctor details',
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
      await fetchDoctor(currentId);
    }
  }, [fetchDoctor, currentId]);

  // Fetch initial data if doctorId is provided
  useEffect(() => {
    if (doctorId) {
      fetchDoctor(doctorId);
    }
  }, [doctorId, fetchDoctor]);

  return {
    ...state,
    fetchDoctor,
    refresh,
  };
}
