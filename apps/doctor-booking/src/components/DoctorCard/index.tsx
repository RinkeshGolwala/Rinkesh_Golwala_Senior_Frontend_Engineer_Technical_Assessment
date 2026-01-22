'use client';

import React from 'react';
import Link from 'next/link';
import { Card, Button } from '@doctor-booking/necktie-ui';
import { useTranslation } from 'react-i18next';
import { Doctor } from '../../lib/types';
import styles from './DoctorCard.module.scss';

export interface DoctorCardProps {
  doctor: Doctor;
  onBookAppointment?: (doctorId: string) => void;
  onViewDetails?: (doctorId: string) => void;
  className?: string;
}

export default function DoctorCard({
  doctor,
  onBookAppointment,
  className = '',
}: DoctorCardProps) {
  const { t } = useTranslation('common');

  const formatAddress = (address: Doctor['address']) => {
    const parts = [address.line_1, address.line_2, address.district].filter(
      Boolean
    );
    return parts.join(', ');
  };

  const getOpeningHours = () => {
    const todayDay = new Date()
      .toLocaleString('en-US', { weekday: 'short' })
      .toUpperCase() as Doctor['opening_hours'][0]['day'];

    const todayHours = doctor.opening_hours.find(
      (hours) => hours.day === todayDay
    );

    if (!todayHours || todayHours.isClosed) {
      return t('doctors.card.closedToday', 'Closed today');
    }

    return `${t('doctors.card.openToday', 'Open today')}: ${todayHours.start} - ${todayHours.end}`;
  };

  return (
    <Card className={`${styles.doctorCard} ${className}`} variant="elevated">
      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.name}>{doctor.name}</h3>
          <div className={styles.hours}>{getOpeningHours()}</div>
        </div>

        <div className={styles.body}>
          <p className={styles.description}>{doctor.description}</p>
          <div className={styles.address}>{formatAddress(doctor.address)}</div>
        </div>

        <div className={styles.actions}>
          <Link href={`/doctors/${doctor.id}`} className={styles.detailsLink}>
            <Button
              variant="secondary"
              size="sm"
              className={styles.detailsButton}
            >
              {t('doctors.card.viewDetails', 'View Details')}
            </Button>
          </Link>
          <Button
            variant="primary"
            size="sm"
            onClick={() => onBookAppointment?.(doctor.id)}
            className={styles.bookButton}
          >
            {t('doctors.card.consult', 'Consult')}
          </Button>
        </div>
      </div>
    </Card>
  );
}
