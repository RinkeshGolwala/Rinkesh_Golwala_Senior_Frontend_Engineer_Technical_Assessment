'use client';

import React from 'react';
import DoctorsLayout from '@/components/DoctorsLayout';
import DoctorsList from '@/components/DoctorsList';
import { useTranslation } from 'react-i18next';
import { Doctor } from '@/lib/types';
import { ErrorState, EmptyState } from './sub-components';
import styles from './DoctorsPageContent.module.scss';

interface DoctorsPageContentProps {
  initialDoctors: Doctor[];
  initialError: string | null;
}

export default function DoctorsPageContent({
  initialDoctors,
  initialError,
}: DoctorsPageContentProps) {
  const { t } = useTranslation(['common', 'doctors']);

  const renderDoctorsSection = () => {
    if (initialError) {
      return <ErrorState error={initialError} />;
    }

    if (!initialDoctors || initialDoctors.length === 0) {
      return <EmptyState />;
    }

    return (
      <div className={styles.doctorsList}>
        <DoctorsList doctors={initialDoctors} />
      </div>
    );
  };

  return (
    <DoctorsLayout activeRouteId="home">
      <div className={styles.doctorsPage}>
        <div className={styles.container}>
          <section className={styles.heroSection}>
            <div className={styles.heroContent}>
              <h1>{t('hero.title', 'Find & Book the Best Doctors')}</h1>
              <p>
                {t(
                  'hero.description',
                  'Discover top-rated healthcare professionals in your area and book appointments with ease. Your health, our priority.'
                )}
              </p>
              <div className={styles.heroStats}>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>
                    {initialDoctors?.length || 0}
                  </span>
                  <span className={styles.statLabel}>
                    {t('common:hero.stats.doctors', 'Available Doctors')}
                  </span>
                </div>
              </div>
            </div>
          </section>

          <section className={styles.doctorsSection}>
            <div className={styles.sectionHeader}>
              <h2>{t('doctors:title', 'Available Doctors')}</h2>
              <p>
                {t(
                  'doctors:subtitle',
                  'Choose from our network of qualified healthcare professionals'
                )}
              </p>
            </div>

            {renderDoctorsSection()}
          </section>
        </div>
      </div>
    </DoctorsLayout>
  );
}
