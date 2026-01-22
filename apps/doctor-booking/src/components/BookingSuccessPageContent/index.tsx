'use client';

import { Card } from '@doctor-booking/necktie-ui';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import DoctorsLayout from '@/components/DoctorsLayout';
import { getBookingById } from '@/lib/api/bookings';
import { Booking } from '@/lib/types';

import styles from './BookingSuccessPageContent.module.scss';

interface BookingSuccessPageContentProps {
  bookingId: string;
}

export default function BookingSuccessPageContent({
  bookingId,
}: BookingSuccessPageContentProps) {
  const { t } = useTranslation('bookings');
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        setLoading(true);
        const response = await getBookingById(bookingId);

        if (response.success && response.data) {
          setBooking(response.data);
        } else {
          setError(
            response.error?.message ||
              t('success.errorLoading', 'Failed to load booking details')
          );
        }
      } catch (err) {
        console.error('Error fetching booking:', err);
        setError(t('success.errorLoading', 'Failed to load booking details'));
      } finally {
        setLoading(false);
      }
    };

    if (bookingId) {
      fetchBookingDetails();
    } else {
      setError(t('success.invalidBookingId', 'Invalid booking ID'));
      setLoading(false);
    }
  }, [bookingId, t]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (start: number) => {
    const hours = Math.floor(start);
    const minutes = Math.round((start - hours) * 100);
    return `${hours}:${minutes.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <DoctorsLayout activeRouteId="back">
        <div className={styles.container}>
          <div className={styles.loadingState}>
            <div className={styles.loadingSpinner}></div>
            <p className={styles.loadingText}>
              {t('success.loading', 'Loading booking details...')}
            </p>
          </div>
        </div>
      </DoctorsLayout>
    );
  }

  if (error || !booking) {
    return (
      <DoctorsLayout activeRouteId="back">
        <div className={styles.container}>
          <Card className={styles.errorCard}>
            <div className={styles.errorContent}>
              <div className={styles.errorIcon}>⚠️</div>
              <h2 className={styles.errorTitle}>
                {t('success.errorTitle', 'Something went wrong')}
              </h2>
              <p className={styles.errorMessage}>{error}</p>
            </div>
          </Card>
        </div>
      </DoctorsLayout>
    );
  }

  return (
    <DoctorsLayout activeRouteId="back">
      <div className={styles.container}>
        <div className={styles.successContent}>
          {/* Success Animation & Icon */}
          <div className={styles.successAnimation}>
            <div className={styles.successIcon}>
              <div className={styles.checkmark}>
                <div className={styles.checkmarkStem}></div>
                <div className={styles.checkmarkKick}></div>
              </div>
            </div>
          </div>

          {/* Success Message */}
          <div className={styles.successMessage}>
            <h1 className={styles.successTitle}>
              {t('success.title', 'Booking Confirmed!')}
            </h1>
            <p className={styles.successSubtitle}>
              {t(
                'success.subtitle',
                'Your appointment has been successfully booked.'
              )}
            </p>
          </div>

          {/* Booking Details Card */}
          <Card className={styles.bookingCard}>
            <div className={styles.bookingHeader}>
              <h2 className={styles.cardTitle}>
                {t('success.appointmentDetails', 'Appointment Details')}
              </h2>
              <div className={styles.bookingId}>
                {t('success.bookingId', 'Booking ID')}: {booking.id}
              </div>
            </div>

            <div className={styles.bookingDetails}>
              <div className={styles.detailItem}>
                <div className={styles.detailLabel}>
                  {t('success.patient', 'Patient')}
                </div>
                <div className={styles.detailValue}>{booking.name}</div>
              </div>

              <div className={styles.detailItem}>
                <div className={styles.detailLabel}>
                  {t('success.date', 'Date')}
                </div>
                <div className={styles.detailValue}>
                  {formatDate(booking.date)}
                </div>
              </div>

              <div className={styles.detailItem}>
                <div className={styles.detailLabel}>
                  {t('success.time', 'Time')}
                </div>
                <div className={styles.detailValue}>
                  {formatTime(booking.start)}
                </div>
              </div>

              <div className={styles.detailItem}>
                <div className={styles.detailLabel}>
                  {t('success.status', 'Status')}
                </div>
                <div
                  className={`${styles.detailValue} ${styles.statusConfirmed}`}
                >
                  {t('success.confirmed', 'Confirmed')}
                </div>
              </div>
            </div>
          </Card>

          {/* Important Information */}
          <Card className={styles.infoCard}>
            <h3 className={styles.infoTitle}>
              {t('success.importantInfo', 'Important Information')}
            </h3>
            <ul className={styles.infoList}>
              <li>
                {t(
                  'success.confirmationEmail',
                  'A confirmation email will be sent to you shortly'
                )}
              </li>
              <li>
                {t(
                  'success.arriveEarly',
                  'Please arrive 15 minutes before your appointment'
                )}
              </li>
              <li>
                {t(
                  'success.bringDocuments',
                  'Please bring a valid ID and insurance card'
                )}
              </li>
              <li>
                {t(
                  'success.cancelPolicy',
                  'To cancel or reschedule, please call at least 24 hours in advance'
                )}
              </li>
            </ul>
          </Card>

          {/* Additional Help */}
          <div className={styles.helpSection}>
            <p className={styles.helpText}>
              {t(
                'success.needHelp',
                'Need help? Contact our support team or visit your bookings page to manage your appointments.'
              )}
            </p>
          </div>
        </div>
      </div>
    </DoctorsLayout>
  );
}
