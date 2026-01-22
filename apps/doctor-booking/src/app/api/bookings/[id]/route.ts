// Next.js API route: /api/bookings/[id]
import { NextRequest, NextResponse } from 'next/server';

import { makeExternalApiRequest } from '@/api/api-config';
import { Booking, UpdateBookingPayload } from '@/lib/types';

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id || typeof id !== 'string') {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: 'Booking ID is required',
            statusCode: 400,
          },
        },
        { status: 400 }
      );
    }

    const response = await makeExternalApiRequest(`/booking/${id}`);

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        {
          success: false,
          error: {
            message: errorData.message || 'Failed to fetch booking',
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

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body: UpdateBookingPayload = await request.json();

    if (!id || typeof id !== 'string') {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: 'Booking ID is required',
            statusCode: 400,
          },
        },
        { status: 400 }
      );
    }

    const response = await makeExternalApiRequest(`/booking/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        {
          success: false,
          error: {
            message: errorData.message || 'Failed to update booking',
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
