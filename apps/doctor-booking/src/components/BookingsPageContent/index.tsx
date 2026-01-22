import { Button, Card } from '@doctor-booking/necktie-ui';
import React, { useEffect } from 'react';

import DoctorsLayout from '@/components/DoctorsLayout';
import { BookingStatus } from '@/lib/types';

import { useCancelBooking } from '../../lib';
import styles from './BookingsPageContent.module.scss';

interface Booking {
  id: string;
  doctorId: string;
  date: string;
  status: BookingStatus;
  name: string;
}

interface BookingsPageContentProps {
  bookings: Booking[];
  refresh: () => void;
}

const BookingsPageContent: React.FC<BookingsPageContentProps> = ({
  bookings,
  refresh,
}) => {
  const { loading, success, cancelBooking } = useCancelBooking();

  useEffect(() => {
    if (success) {
      refresh();
    }
  }, [success, refresh]);

  return (
    <DoctorsLayout activeRouteId="bookings">
      <div className={styles.root}>
        <h1>My Bookings</h1>
        <div className={styles.bookingCardGrid}>
          {bookings.length === 0 ? (
            <Card>No bookings found.</Card>
          ) : (
            bookings.map((booking) => (
              <Card
                key={booking.id}
                className={`${styles.bookingStatus}
                  ${
                    booking.status === BookingStatus.Confirmed
                      ? styles.confirmed
                      : styles.cancelled
                  }`}
              >
                <div>Booking Id: {booking.id}</div>
                <h3>Details</h3>
                <div>
                  <div>
                    <span>Date: </span>
                    <span>{booking.date}</span>
                  </div>
                  <div>
                    <span>Patient Name: </span>
                    <span>{booking.name}</span>
                  </div>
                  <div>
                    <span>Doctor Id: </span>
                    <span>{booking.doctorId}</span>
                  </div>
                  <div>
                    <span>Status: </span>
                    <span>{booking.status}</span>
                  </div>
                </div>
                {booking.status === BookingStatus.Confirmed && (
                  <div className={styles.actions}>
                    <Button
                      variant="primary"
                      size="md"
                      loading={loading}
                      onClick={() => cancelBooking(booking.id)}
                    >
                      Cancel booking
                    </Button>
                  </div>
                )}
              </Card>
            ))
          )}
        </div>
      </div>
    </DoctorsLayout>
  );
};

export default BookingsPageContent;
