'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './EmptyState.module.scss';

export default function EmptyState() {
  const { t } = useTranslation('common');

  return (
    <div className={styles.emptyState}>
      <div className={styles.content}>
        <svg
          className={styles.icon}
          width="64"
          height="64"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
        <h3>{t('doctors.empty.title', 'No doctors available')}</h3>
        <p>
          {t(
            'doctors.empty.description',
            "We couldn't find any doctors at the moment. Please try again later."
          )}
        </p>
      </div>
    </div>
  );
}
