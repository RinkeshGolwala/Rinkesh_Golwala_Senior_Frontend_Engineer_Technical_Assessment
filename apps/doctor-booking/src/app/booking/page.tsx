'use client';

import BookingsPageContent from '@/components/BookingsPageContent';
import DoctorsLoading from '@/components/DoctorsLoading';
import { useBookings } from '@/lib';

export default function HomePage() {
  const { data, loading, error, refresh } = useBookings();

  if (loading) {
    return <DoctorsLoading />;
  }

  if (error || !data) {
    return <div>Error: {error}</div>;
  }

  return <BookingsPageContent bookings={data} refresh={refresh} />;
}
