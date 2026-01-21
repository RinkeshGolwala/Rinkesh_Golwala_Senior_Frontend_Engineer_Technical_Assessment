'use client';

import React from 'react';
import { SkeletonDoctorCard } from '@doctor-booking/necktie-ui';
import styles from './DoctorsLoading.module.scss';

interface DoctorsLoadingProps {
  count?: number;
  className?: string;
}

export default function DoctorsLoading({
  count = 6,
  className = '',
}: DoctorsLoadingProps) {
  return (
    <div className={`${styles.doctorsLoading} ${className}`}>
      <div className={styles.doctorsSkeletonGrid}>
        {Array.from({ length: count }).map((_, index) => (
          <SkeletonDoctorCard key={index} />
        ))}
      </div>
    </div>
  );
}
