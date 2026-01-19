import React from 'react';
import clsx from 'clsx';
import Skeleton from '../index';

export interface SkeletonBookingCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Animation type */
  animation?: 'pulse' | 'wave' | 'none';
}

const SkeletonBookingCard = React.forwardRef<
  HTMLDivElement,
  SkeletonBookingCardProps
>(({ animation = 'wave', className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={clsx('necktie-skeleton-booking', className)}
      {...props}
    >
      <div className="necktie-skeleton-booking__header">
        <Skeleton
          variant="text"
          width="150px"
          height="1.25rem"
          animation={animation}
        />
        <Skeleton
          variant="rectangular"
          width="80px"
          height="24px"
          animation={animation}
        />
      </div>

      <div className="necktie-skeleton-booking__content">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '0.5rem',
          }}
        >
          <Skeleton variant="text" width="60px" animation={animation} />
          <Skeleton variant="text" width="120px" animation={animation} />
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '0.5rem',
          }}
        >
          <Skeleton variant="text" width="40px" animation={animation} />
          <Skeleton variant="text" width="100px" animation={animation} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Skeleton variant="text" width="40px" animation={animation} />
          <Skeleton variant="text" width="140px" animation={animation} />
        </div>
      </div>

      <div className="necktie-skeleton-booking__actions">
        <Skeleton
          variant="rectangular"
          width="80px"
          height="32px"
          animation={animation}
        />
        <Skeleton
          variant="rectangular"
          width="60px"
          height="32px"
          animation={animation}
        />
      </div>
    </div>
  );
});

SkeletonBookingCard.displayName = 'SkeletonBookingCard';

export default SkeletonBookingCard;
