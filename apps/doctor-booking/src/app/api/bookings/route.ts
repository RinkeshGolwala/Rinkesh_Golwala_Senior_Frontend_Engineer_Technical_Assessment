// Next.js API route: /api/bookings
import { NextRequest, NextResponse } from 'next/server';
import { makeExternalApiRequest } from '@/api/api-config';
import {
  BookingsListResponse,
  Booking,
  CreateBookingPayload,
} from '@/lib/types';

export async function GET(_request: NextRequest) {
  try {
    const response = await makeExternalApiRequest('/booking');

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        {
          success: false,
          error: {
            message: errorData.message || 'Failed to fetch bookings',
            statusCode: response.status,
            code: errorData.code,
          },
        },
        { status: response.status }
      );
    }

    const data: BookingsListResponse = await response.json();

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
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

export async function POST(request: NextRequest) {
  try {
    const body: CreateBookingPayload = await request.json();
    const { doctorId, name, start, date } = body;

    if (!doctorId || !name || !start || !date) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: 'Missing required booking fields',
            statusCode: 400,
          },
        },
        { status: 400 }
      );
    }

    const response = await makeExternalApiRequest('/booking', {
      method: 'POST',
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        {
          success: false,
          error: {
            message: errorData.message || 'Failed to create booking',
            statusCode: response.status,
            code: errorData.code,
          },
        },
        { status: response.status }
      );
    }

    const data: Booking = await response.json();

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
