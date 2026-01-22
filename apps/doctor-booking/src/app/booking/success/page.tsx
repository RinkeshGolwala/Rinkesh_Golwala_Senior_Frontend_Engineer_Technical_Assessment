import { Metadata } from 'next';
import BookingSuccessPageContent from '@/components/BookingSuccessPageContent';
import InvalidBookingContent from '@/components/InvalidBookingContent';

export const metadata: Metadata = {
  title: 'Booking Confirmed | Doctor Booking',
  description:
    'Your appointment has been successfully booked. View your booking details and important information.',
  robots: 'noindex, nofollow', // Don't index success pages
};

interface PageProps {
  searchParams: {
    id?: string;
  };
}

export default function BookingSuccessPage({ searchParams }: PageProps) {
  const bookingId = searchParams.id;

  if (!bookingId) {
    return <InvalidBookingContent />;
  }

  return <BookingSuccessPageContent bookingId={bookingId} />;
}
