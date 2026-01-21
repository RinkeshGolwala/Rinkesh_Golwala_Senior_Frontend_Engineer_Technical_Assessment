import { Doctor, DoctorsListResponse, ApiResponse } from '../types';
import { internalApiRequest } from './utils';

/**
 * Fetch all doctors
 * @returns Promise with doctors list response
 */
export async function getDoctors(): Promise<ApiResponse<DoctorsListResponse>> {
  const endpoint = `/doctors`;
  return internalApiRequest<DoctorsListResponse>(endpoint);
}

/**
 * Fetch doctor details by ID
 * @param id - Doctor ID
 * @returns Promise with doctor details
 */
export async function getDoctorById(id: string): Promise<ApiResponse<Doctor>> {
  const endpoint = `/doctors/${id}`;
  return internalApiRequest<Doctor>(endpoint);
}
