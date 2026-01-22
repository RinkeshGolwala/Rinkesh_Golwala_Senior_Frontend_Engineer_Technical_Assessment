'use client';

import DoctorsLoading from '@/components/DoctorsLoading';
import { useBookings } from '@/lib';

// TODO: implement booking page components
export default function HomePage() {
  const { data, loading, error } = useBookings();

  if (loading) {
    return <DoctorsLoading />;
  }

  if (error || !data) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>My Bookings</h1>
      <ul>
        {data?.map((booking) => (
          <li key={booking.id}>
            <div>
              Booking with Dr. {booking.doctorId} on {booking.date}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
