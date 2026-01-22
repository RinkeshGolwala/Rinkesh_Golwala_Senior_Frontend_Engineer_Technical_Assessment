'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Calendar, TimeSlotList } from '@doctor-booking/necktie-ui';
import { Doctor, OpeningHour } from '@/lib/types';
import DoctorsLayout from '@/components/DoctorsLayout';
import { getOpeningHoursStatus } from '@/lib/utils/doctorUtils';
import styles from './DoctorDetailsPageContent.module.scss';
import { DAY_NAMES } from '@/lib';

interface DoctorDetailsPageContentProps {
  doctor: Doctor;
}

export default function DoctorDetailsPageContent({
  doctor,
}: DoctorDetailsPageContentProps) {
  const { t } = useTranslation();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [isBooking, setIsBooking] = useState(false);

  const { isOpenToday, isOpenNow, nextOpenDay } = getOpeningHoursStatus(
    doctor.opening_hours
  );

  // Helper function to get opening hour for selected date
  const getOpeningHourForDate = (date: Date): OpeningHour | undefined => {
    const selectedDayName = DAY_NAMES[date.getDay()];
    return doctor.opening_hours.find((hour) => hour.day === selectedDayName);
  };

  const handleBookAppointment = async () => {
    if (!selectedDate || !selectedTime) return;

    setIsBooking(true);
    try {
      // TODO: Implement booking API call
      console.log('Booking appointment:', {
        doctorId: doctor.id,
        date: selectedDate,
        time: selectedTime,
      });

      // Show success message or redirect
      alert(
        `Appointment booked for ${selectedDate.toLocaleDateString()} at ${selectedTime}`
      );
    } catch (error) {
      console.error('Error booking appointment:', error);
      alert('Failed to book appointment. Please try again.');
    } finally {
      setIsBooking(false);
    }
  };

  const canShowTimeSlots = selectedDate && getOpeningHourForDate(selectedDate);
  const canBookAppointment = selectedDate && selectedTime && !isBooking;

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
                ? t('doctors.details.openNow', 'Open now')
                : isOpenToday
                  ? t('doctors.details.closedNow', 'Closed now')
                  : t('doctors.details.closedToday', 'Closed today')}
            </div>
            {!isOpenToday && nextOpenDay && (
              <p className={styles.nextOpenInfo}>
                {t('doctors.details.nextOpen', 'Next open')}: {nextOpenDay}
              </p>
            )}
          </div>
        </div>

        {/* About Section */}
        {doctor.description && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              {t('doctors.details.about', 'About')}
            </h2>
            <p className={styles.description}>{doctor.description}</p>
          </section>
        )}

        {/* Booking Section */}
        <section className={styles.bookingSection}>
          <h2 className={styles.sectionTitle}>
            {t('doctors.details.bookAppointment', 'Book an Appointment')}
          </h2>

          <div className={styles.bookingGrid}>
            {/* Calendar */}
            <div className={styles.calendarContainer}>
              <h3 className={styles.stepTitle}>
                {t('doctors.details.selectDate', 'Select Date')}
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
                  {t('doctors.details.selectTime', 'Select Time')}
                </h3>
                <TimeSlotList
                  selectedDate={selectedDate}
                  openingHour={getOpeningHourForDate(selectedDate)!}
                  selectedTime={selectedTime}
                  onTimeSelect={setSelectedTime}
                  availableTimesLabel={t(
                    'doctors.details.availableTimes',
                    'Available Times'
                  )}
                  noSlotsLabel={t(
                    'doctors.details.noAvailableSlots',
                    'No available time slots for this date'
                  )}
                />
              </div>
            )}
          </div>

          {/* Booking Summary & Action */}
          {selectedDate && selectedTime && (
            <div className={styles.bookingSummary}>
              <div className={styles.summaryContent}>
                <h4 className={styles.summaryTitle}>
                  {t('doctors.details.bookingSummary', 'Booking Summary')}
                </h4>
                <div className={styles.summaryDetails}>
                  <p>
                    <strong>{t('doctors.details.doctor', 'Doctor')}:</strong>{' '}
                    Dr. {doctor.name}
                  </p>
                  <p>
                    <strong>{t('doctors.details.date', 'Date')}:</strong>{' '}
                    {selectedDate.toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                  <p>
                    <strong>{t('doctors.details.time', 'Time')}:</strong>{' '}
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
                {isBooking
                  ? t('doctors.details.booking', 'Booking...')
                  : t('doctors.details.confirmBooking', 'Confirm Booking')}
              </Button>
            </div>
          )}
        </section>
      </div>
    </DoctorsLayout>
  );
}
