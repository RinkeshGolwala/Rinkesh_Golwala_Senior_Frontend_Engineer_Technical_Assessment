// Utility functions for API

import { ApiResponse } from '@/lib/types';

/**
 * Base function to make internal API requests
 * @param endpoint Internal API endpoint
 * @param options Fetch options
 * @returns
 */
export async function internalApiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`/api${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    const data: ApiResponse<T> = await response.json();
    return data;
  } catch (error) {
    // TODO: Add logger and sentry monitoring
    console.error('Internal API request failed:', error);
    return {
      success: false,
      error: {
        message: error instanceof Error ? error.message : 'Network error',
        statusCode: 500,
      },
    };
  }
}
