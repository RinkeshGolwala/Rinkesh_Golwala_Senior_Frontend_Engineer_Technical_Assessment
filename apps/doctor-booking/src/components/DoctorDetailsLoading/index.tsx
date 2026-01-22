'use client';

import { Card, Skeleton } from '@doctor-booking/necktie-ui';

import DoctorsLayout from '@/components/DoctorsLayout';

import styles from './DoctorDetailsLoading.module.scss';

export default function DoctorDetailsLoading() {
  return (
    <DoctorsLayout>
      <div className={styles.container}>
        <div className={styles.doctorProfile}>
          <Card className={styles.profileCard}>
            <div className={styles.profileHeader}>
              <Skeleton width="60%" height={40} />
              <Skeleton width={100} height={32} />
            </div>

            {/* About Section */}
            <section className={styles.section}>
              <Skeleton width={80} height={24} />
              <div className={styles.descriptionSkeleton}>
                <Skeleton width="100%" height={20} />
                <Skeleton width="85%" height={20} />
                <Skeleton width="92%" height={20} />
              </div>
            </section>

            {/* Address Section */}
            <section className={styles.section}>
              <Skeleton width={70} height={24} />
              <div className={styles.addressSkeleton}>
                <Skeleton width="75%" height={20} />
                <Skeleton width="60%" height={20} />
                <Skeleton width="45%" height={20} />
              </div>
            </section>

            {/* Opening Hours Section */}
            <section className={styles.section}>
              <Skeleton width={120} height={24} />
              <div className={styles.scheduleSkeleton}>
                {Array.from({ length: 7 }).map((_, index) => (
                  <div key={index} className={styles.scheduleRow}>
                    <Skeleton width={80} height={20} />
                    <Skeleton width={100} height={20} />
                  </div>
                ))}
              </div>
            </section>

            {/* Action Buttons */}
            <div className={styles.actions}>
              <Skeleton width="100%" height={48} />
              <Skeleton width="100%" height={48} />
            </div>
          </Card>
        </div>
      </div>
    </DoctorsLayout>
  );
}
