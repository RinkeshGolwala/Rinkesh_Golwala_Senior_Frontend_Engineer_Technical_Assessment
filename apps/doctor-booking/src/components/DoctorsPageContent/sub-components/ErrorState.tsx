'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './ErrorState.module.scss';

interface ErrorStateProps {
  error: string;
  onRetry?: () => void;
}

export default function ErrorState({ error, onRetry }: ErrorStateProps) {
  const { t } = useTranslation('doctors');

  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      globalThis.location.reload();
    }
  };

  return (
    <div className={styles.errorState}>
      <div className={styles.content}>
        <svg
          className={styles.icon}
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <h3>{t('error.title', 'Unable to load doctors')}</h3>
        <p>{error}</p>
        <button onClick={handleRetry} className={styles.retryButton}>
          {t('error.retry', 'Try Again')}
        </button>
      </div>
    </div>
  );
}
