'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Doctor } from '../../lib/types';
import DoctorCard from '../DoctorCard';
import styles from './DoctorsList.module.scss';

interface DoctorsListProps {
  doctors: Doctor[];
}

/**
 * Client component wrapper for handling navigation and interactions
 */
export default function DoctorsList({ doctors }: DoctorsListProps) {
  const router = useRouter();

  const handleBookAppointment = (doctorId: string) => {
    router.push(`/doctors/${doctorId}/book`);
  };

  const handleViewDetails = (doctorId: string) => {
    router.push(`/doctors/${doctorId}`);
  };

  return (
    <div className={styles.doctorsGrid}>
      {doctors.map((doctor: Doctor) => (
        <DoctorCard
          key={doctor.id}
          doctor={doctor}
          onBookAppointment={handleBookAppointment}
          onViewDetails={handleViewDetails}
        />
      ))}
    </div>
  );
}
