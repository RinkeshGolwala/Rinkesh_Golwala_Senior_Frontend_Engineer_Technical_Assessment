'use client';

import { Button, Calendar, TimeSlotList } from '@doctor-booking/necktie-ui';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import BookingConfirmationModal from '@/components/BookingConfirmationModal';
import DoctorsLayout from '@/components/DoctorsLayout';
import { Doctor } from '@/lib/types';
import { getOpeningHoursStatus } from '@/lib/utils/doctorUtils';
import { getAdjustedOpeningHourForDate } from '@/lib/utils/timeSlotUtils';

import styles from './DoctorDetailsPageContent.module.scss';

interface DoctorDetailsPageContentProps {
  doctor: Doctor;
}

export default function DoctorDetailsPageContent({
  doctor,
}: DoctorDetailsPageContentProps) {
  const { t } = useTranslation(['doctors', 'bookings']);
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  const { isOpenToday, isOpenNow, nextOpenDay } = getOpeningHoursStatus(
    doctor.opening_hours
  );

  const handleBookAppointment = () => {
    // Clear previous errors
    setBookingError(null);
    setValidationErrors({});

    if (!selectedDate || !selectedTime) {
      const errors: Record<string, string> = {};

      if (!selectedDate) {
        errors.date = t(
          'bookings:validation.dateRequired',
          'Please select a date'
        );
      }

      if (!selectedTime) {
        errors.time = t(
          'bookings:validation.timeRequired',
          'Please select a time slot'
        );
      }

      setValidationErrors(errors);
      return;
    }

    setShowConfirmationModal(true);
  };

  const handleBookingSuccess = (bookingId: string) => {
    // Navigate to success page
    router.push(`/booking/success?id=${bookingId}`);
  };

  const handleBookingError = (error: string) => {
    setBookingError(error);
    setShowConfirmationModal(false);
  };

  const handleCloseModal = () => {
    setShowConfirmationModal(false);
  };

  const canShowTimeSlots =
    selectedDate &&
    getAdjustedOpeningHourForDate(selectedDate, doctor.opening_hours) &&
    !getAdjustedOpeningHourForDate(selectedDate, doctor.opening_hours)
      ?.isClosed;
  const canBookAppointment =
    selectedDate && selectedTime && !Object.keys(validationErrors).length;

  return (
    <DoctorsLayout activeRouteId="back">
      <div className={styles.container}>
        {/* Doctor Info Header */}
        <div className={styles.doctorHeader}>
          <div className={styles.doctorInfo}>
            <h1 className={styles.doctorName}>Dr. {doctor.name}</h1>
            <div className={styles.address}>
              <p>{doctor.address.line_1}</p>
              {doctor.address.line_2 && <p>{doctor.address.line_2}</p>}
              <p className={styles.district}>{doctor.address.district}</p>
            </div>
          </div>
          <div className={styles.statusSection}>
            <div
              className={`${styles.status} ${isOpenNow ? styles.statusOpen : styles.statusClosed}`}
            >
              {isOpenNow
                ? t('doctors:details.openNow', 'Open now')
                : isOpenToday
                  ? t('doctors:details.closedNow', 'Closed now')
                  : t('doctors:details.closedToday', 'Closed today')}
            </div>
            {!isOpenToday && nextOpenDay && (
              <p className={styles.nextOpenInfo}>
                {t('doctors:details.nextOpen', 'Next open')}: {nextOpenDay}
              </p>
            )}
          </div>
        </div>

        {/* About Section */}
        {doctor.description && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              {t('doctors:details.about', 'About')}
            </h2>
            <p className={styles.description}>{doctor.description}</p>
          </section>
        )}

        {/* Booking Section */}
        <section className={styles.bookingSection}>
          <h2 className={styles.sectionTitle}>
            {t('doctors:details.bookAppointment', 'Book an Appointment')}
          </h2>

          <div className={styles.bookingGrid}>
            {/* Calendar */}
            <div className={styles.calendarContainer}>
              <h3 className={styles.stepTitle}>
                {t('doctors:details.selectDate', 'Select Date')}
              </h3>
              <Calendar
                openingHours={doctor.opening_hours}
                selectedDate={selectedDate}
                onDateSelect={setSelectedDate}
              />
            </div>

            {/* Time Slots */}
            {canShowTimeSlots && (
              <div className={styles.timeSlotsContainer}>
                <h3 className={styles.stepTitle}>
                  {t('doctors:details.selectTime', 'Select Time')}
                </h3>
                <TimeSlotList
                  selectedDate={selectedDate}
                  openingHour={
                    getAdjustedOpeningHourForDate(
                      selectedDate,
                      doctor.opening_hours
                    )!
                  }
                  selectedTime={selectedTime}
                  onTimeSelect={setSelectedTime}
                  availableTimesLabel={t(
                    'doctors:details.availableTimes',
                    'Available Times'
                  )}
                  noSlotsLabel={t(
                    'doctors:details.noAvailableSlots',
                    'No available time slots for this date'
                  )}
                />
              </div>
            )}
          </div>

          {/* Booking Summary & Action */}
          {selectedDate && selectedTime && (
            <div className={styles.bookingSummary}>
              {/* Show booking error if any */}
              {bookingError && (
                <div className={styles.errorMessage}>
                  <span className={styles.errorIcon}>⚠️</span>
                  <span>{bookingError}</span>
                </div>
              )}

              <div className={styles.summaryContent}>
                <h4 className={styles.summaryTitle}>
                  {t('doctors:details.bookingSummary', 'Booking Summary')}
                </h4>
                <div className={styles.summaryContent}>
                  <p>
                    <strong>{t('doctors:details.doctor', 'Doctor')}:</strong>{' '}
                    Dr. {doctor.name}
                  </p>
                  <p>
                    <strong>{t('doctors:details.date', 'Date')}:</strong>{' '}
                    {selectedDate.toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                  <p>
                    <strong>{t('doctors:details.time', 'Time')}:</strong>{' '}
                    {selectedTime}
                  </p>
                </div>
              </div>
              <Button
                variant="primary"
                size="lg"
                disabled={!canBookAppointment}
                onClick={handleBookAppointment}
                className={styles.bookButton}
              >
                {t('doctors:details.confirmBooking', 'Confirm Booking')}
              </Button>
            </div>
          )}
        </section>
      </div>

      {/* Booking Confirmation Modal */}
      {selectedDate && selectedTime && (
        <BookingConfirmationModal
          open={showConfirmationModal}
          onClose={handleCloseModal}
          doctor={doctor}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          onBookingSuccess={handleBookingSuccess}
          onBookingError={handleBookingError}
        />
      )}
    </DoctorsLayout>
  );
}
