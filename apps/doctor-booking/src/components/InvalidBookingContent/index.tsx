'use client';

import { useTranslation } from 'react-i18next';

import styles from './InvalidBookingContent.module.scss';

export default function InvalidBookingContent() {
  const { t } = useTranslation('bookings');

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        {t('success.invalidBooking.title', 'Invalid Booking')}
      </h1>
      <p className={styles.message}>
        {t('success.invalidBooking.message', 'No booking ID was provided.')}
      </p>
      <a href="/" className={styles.returnLink}>
        {t('success.invalidBooking.returnHome', 'Return to Home')}
      </a>
    </div>
  );
}
