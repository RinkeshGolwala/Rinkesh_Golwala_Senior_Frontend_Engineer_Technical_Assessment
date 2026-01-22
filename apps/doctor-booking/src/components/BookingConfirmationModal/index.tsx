'use client';

import { Button, Modal } from '@doctor-booking/necktie-ui';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useCreateBooking } from '@/lib/hooks/useBookings';
import { BookingStatus, CreateBookingPayload, Doctor } from '@/lib/types';

import styles from './BookingConfirmationModal.module.scss';

export interface BookingConfirmationModalProps {
  /** Whether the modal is open */
  open: boolean;
  /** Called when the modal should close */
  onClose: () => void;
  /** Doctor information */
  doctor: Doctor;
  /** Selected appointment date */
  selectedDate: Date;
  /** Selected appointment time */
  selectedTime: string;
  /** Patient name */
  patientName?: string;
  /** Called when booking is successfully created */
  onBookingSuccess: (bookingId: string) => void;
  /** Called when booking fails */
  onBookingError: (error: string) => void;
}

export default function BookingConfirmationModal({
  open,
  onClose,
  doctor,
  selectedDate,
  selectedTime,
  patientName: initialPatientName = '',
  onBookingSuccess,
  onBookingError,
}: BookingConfirmationModalProps) {
  const { t } = useTranslation('bookings');
  const {
    loading,
    error,
    success,
    data,
    createBooking: createBookingAction,
    reset,
  } = useCreateBooking();
  const [patientName, setPatientName] = useState(initialPatientName);
  const [validationErrors, setValidationErrors] = useState<{
    patientName?: string;
  }>({});

  // Handle successful booking
  useEffect(() => {
    if (success && data) {
      onBookingSuccess(data.id);
      onClose();
      reset(); // Reset the hook state
    }
  }, [success, data, onBookingSuccess, onClose, reset]);

  // Handle booking error
  useEffect(() => {
    if (error) {
      onBookingError(error);
      reset(); // Reset the hook state
    }
  }, [error, onBookingError, reset]);

  const validateForm = () => {
    const errors: { patientName?: string } = {};

    if (!patientName.trim()) {
      errors.patientName = t(
        'validation.nameRequired',
        'Patient name is required'
      );
    } else if (patientName.trim().length < 2) {
      errors.patientName = t(
        'validation.nameMinLength',
        'Patient name must be at least 2 characters'
      );
    } else if (!/^[a-zA-Z\s\u4e00-\u9fff]+$/.test(patientName.trim())) {
      errors.patientName = t(
        'validation.nameInvalid',
        'Patient name can only contain letters and spaces'
      );
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleConfirmBooking = async () => {
    if (!validateForm()) {
      return;
    }

    // Convert time string (e.g., "09:30") to hour number (e.g., 9.3)
    const [hoursStr, minutesStr] = selectedTime.split(':');
    const hours = parseInt(hoursStr, 10) + parseInt(minutesStr, 10) / 100;

    const payload: CreateBookingPayload = {
      name: patientName.trim(),
      doctorId: doctor.id,
      date:
        selectedDate.getFullYear() +
        '-' +
        String(selectedDate.getMonth() + 1).padStart(2, '0') +
        '-' +
        String(selectedDate.getDate()).padStart(2, '0'),
      start: hours,
      status: BookingStatus.Confirmed,
    };

    // Use the hook to create booking
    await createBookingAction(payload);
  };

  const handleClose = () => {
    if (!loading) {
      setPatientName(initialPatientName);
      setValidationErrors({});
      reset(); // Reset hook state
      onClose();
    }
  };

  const handlePatientNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPatientName(value);

    // Clear validation error when user starts typing
    if (validationErrors.patientName && value.trim()) {
      setValidationErrors((prev) => ({ ...prev, patientName: undefined }));
    }
  };

  const formatAddress = (address: Doctor['address']) => {
    const parts = [address.line_1, address.line_2, address.district].filter(
      Boolean
    );
    return parts.join(', ');
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title={t('confirmation.title', 'Confirm Your Appointment')}
      size="md"
      variant="confirmation"
      closeOnBackdropClick={!loading}
      closeOnEscape={!loading}
      showCloseButton={!loading}
      className={styles.modal}
    >
      <div className={styles.content}>
        {/* Appointment Details */}
        <div className={styles.appointmentDetails}>
          <h3 className={styles.sectionTitle}>
            {t('confirmation.appointmentDetails', 'Appointment Details')}
          </h3>

          <div className={styles.detailsList}>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>
                {t('confirmation.doctor', 'Doctor')}:
              </span>
              <span className={styles.detailValue}>Dr. {doctor.name}</span>
            </div>

            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>
                {t('confirmation.date', 'Date')}:
              </span>
              <span className={styles.detailValue}>
                {selectedDate.toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>

            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>
                {t('confirmation.time', 'Time')}:
              </span>
              <span className={styles.detailValue}>{selectedTime}</span>
            </div>

            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>
                {t('confirmation.location', 'Location')}:
              </span>
              <span className={styles.detailValue}>
                {formatAddress(doctor.address)}
              </span>
            </div>
          </div>
        </div>

        {/* Patient Information Form */}
        <div className={styles.patientInfo}>
          <h3 className={styles.sectionTitle}>
            {t('confirmation.patientInfo', 'Patient Information')}
          </h3>

          <div className={styles.field}>
            <label htmlFor="patientName" className={styles.fieldLabel}>
              {t('confirmation.patientName', 'Patient Name')}*
            </label>
            <input
              id="patientName"
              type="text"
              value={patientName}
              onChange={handlePatientNameChange}
              placeholder={t(
                'confirmation.namePlaceholder',
                'Enter patient full name'
              )}
              className={`${styles.fieldInput} ${
                validationErrors.patientName ? styles.inputError : ''
              }`}
              disabled={loading}
              maxLength={100}
              autoComplete="name"
            />
            {validationErrors.patientName && (
              <div className={styles.errorMessage}>
                {validationErrors.patientName}
              </div>
            )}
          </div>
        </div>

        {/* Important Notes */}
        <div className={styles.importantNotes}>
          <h4 className={styles.sectionTitle}>
            {t('confirmation.importantNotes', 'Important Notes')}:
          </h4>
          <ul className={styles.notesList}>
            <li>
              {t(
                'confirmation.arriveEarly',
                'Please arrive 15 minutes before your appointment'
              )}
            </li>
            <li>
              {t(
                'confirmation.bringId',
                'Please bring a valid ID and insurance card'
              )}
            </li>
            <li>
              {t(
                'confirmation.cancelPolicy',
                'Cancellations must be made at least 24 hours in advance'
              )}
            </li>
          </ul>
        </div>
      </div>

      {/* Modal Footer */}
      <div className={styles.actions}>
        <Button
          variant="secondary"
          size="lg"
          onClick={handleClose}
          disabled={loading}
          className={styles.cancelButton}
        >
          {t('confirmation.cancel', 'Cancel')}
        </Button>

        <Button
          variant="primary"
          size="lg"
          onClick={handleConfirmBooking}
          disabled={loading || !patientName.trim()}
          className={styles.confirmButton}
        >
          {loading
            ? t('confirmation.processing', 'Processing...')
            : t('confirmation.confirm', 'Confirm Booking')}
        </Button>
      </div>
    </Modal>
  );
}
