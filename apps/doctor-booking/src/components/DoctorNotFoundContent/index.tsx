'use client';

import { Button, Card } from '@doctor-booking/necktie-ui';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

import DoctorsLayout from '@/components/DoctorsLayout';

import styles from './DoctorNotFoundContent.module.scss';

export default function DoctorNotFoundContent() {
  const { t } = useTranslation('doctors');

  return (
    <DoctorsLayout>
      <div className={styles.container}>
        <Card className={styles.errorCard}>
          <div className={styles.errorContent}>
            <div className={styles.icon}>
              <svg
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
                  fill="#6c757d"
                />
              </svg>
            </div>
            <h1 className={styles.title}>{t('details.error.title')}</h1>
            <p className={styles.description}>
              {t('details.error.description')}
            </p>
            <div className={styles.actions}>
              <Link href="/">
                <Button variant="primary" size="lg">
                  {t('details.error.goBack')}
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </DoctorsLayout>
  );
}
