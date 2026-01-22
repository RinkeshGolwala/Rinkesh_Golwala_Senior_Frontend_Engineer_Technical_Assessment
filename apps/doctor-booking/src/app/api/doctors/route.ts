// Next.js API route: /api/doctors
import { NextRequest, NextResponse } from 'next/server';

import { makeExternalApiRequest } from '@/api/api-config';
import { DoctorsListResponse } from '@/lib/types';

export async function GET(_request: NextRequest) {
  try {
    const response = await makeExternalApiRequest('/doctor');

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        {
          success: false,
          error: {
            message: errorData.message || 'Failed to fetch doctors',
            statusCode: response.status,
            code: errorData.code,
          },
        },
        { status: response.status }
      );
    }

    const data: DoctorsListResponse = await response.json();

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    // TODO: Add logger and monitoring
    console.error('API route error:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          message:
            error instanceof Error ? error.message : 'Internal server error',
          statusCode: 500,
        },
      },
      { status: 500 }
    );
  }
}
