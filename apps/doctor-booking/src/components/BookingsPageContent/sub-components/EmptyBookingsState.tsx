import React from 'react';

import styles from './EmptyBookingsState.module.scss';

const EmptyBookingsState: React.FC = () => (
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
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M16 3v4M8 3v4M3 11h18" />
      </svg>
      <h3>No bookings yet</h3>
      <p>
        Your upcoming and past bookings will appear here once you book an
        appointment.
      </p>
    </div>
  </div>
);

export default EmptyBookingsState;
