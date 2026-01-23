import { Button, Card } from '@doctor-booking/necktie-ui';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import DoctorsLayout from '@/components/DoctorsLayout';
import { BookingStatus } from '@/lib/types';

import { useCancelBooking } from '../../lib';
import styles from './BookingsPageContent.module.scss';
import EmptyBookingsState from './sub-components/EmptyBookingsState';

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

  const { t } = useTranslation('bookings');

  return (
    <DoctorsLayout activeRouteId="bookings">
      <div className={styles.bookingsPage}>
        <div className={styles.container}>
          <section className={styles.heroSection}>
            <div className={styles.heroContent}>
              <h1>{t('page.title', 'My Bookings')}</h1>
              <p>
                {t(
                  'page.description',
                  'View and manage your upcoming and past doctor appointments. Bookings you make will appear here.'
                )}
              </p>
            </div>
          </section>
          <section className={styles.bookingsSection}>
            <div className={styles.sectionHeader}>
              <h2>{t('page.sectionTitle', 'Upcoming & Past Bookings')}</h2>
              <p>
                {t(
                  'page.sectionDescription',
                  'All your appointments in one place.'
                )}
              </p>
            </div>
            <div className={styles.bookingCardGrid}>
              {bookings.length === 0 ? (
                <EmptyBookingsState />
              ) : (
                bookings.map((booking) => {
                  const isConfirmed =
                    booking.status === BookingStatus.Confirmed;
                  return (
                    <Card
                      key={booking.id}
                      className={`${styles.bookingCard} ${isConfirmed ? styles.confirmed : styles.cancelled}`}
                      header={
                        <div className={styles.cardHeader}>
                          <span className={styles.headerTitle}>
                            {t('card.appointment', 'Appointment')}
                          </span>
                          <span
                            className={
                              isConfirmed
                                ? styles.statusConfirmed
                                : styles.statusCancelled
                            }
                          >
                            {t(
                              `card.status.${booking.status.toLowerCase()}`,
                              booking.status.toUpperCase()
                            )}
                          </span>
                        </div>
                      }
                      footer={
                        <div className={styles.cardFooter}>
                          {isConfirmed && (
                            <Button
                              variant="danger"
                              size="sm"
                              loading={loading}
                              onClick={() => cancelBooking(booking.id)}
                            >
                              {t('card.cancelBooking', 'Cancel booking')}
                            </Button>
                          )}
                        </div>
                      }
                    >
                      <div className={styles.cardContent}>
                        <div className={styles.row}>
                          <span className={styles.label}>
                            {t('card.bookingId', 'Booking Id:')}
                          </span>
                          <span className={styles.value}>
                            {booking.id.split('-').at(-1)}
                          </span>
                        </div>
                        <div className={styles.row}>
                          <span className={styles.label}>
                            {t('card.doctor', 'Doctor:')}
                          </span>
                          <span className={styles.value}>
                            {t('card.doctorPrefix', 'Dr. ')}
                            {booking.doctorId}
                          </span>
                        </div>
                        <div className={styles.row}>
                          <span className={styles.label}>
                            {t('card.date', 'Date:')}
                          </span>
                          <span className={styles.value}>{booking.date}</span>
                        </div>
                        <div className={styles.row}>
                          <span className={styles.label}>
                            {t('card.name', 'Name:')}
                          </span>
                          <span className={styles.value}>{booking.name}</span>
                        </div>
                      </div>
                    </Card>
                  );
                })
              )}
            </div>
          </section>
        </div>
      </div>
    </DoctorsLayout>
  );
};

export default BookingsPageContent;
