import React from 'react';
import clsx from 'clsx';
import Skeleton from '../Skeleton';

export interface SkeletonDoctorCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Animation type */
  animation?: 'pulse' | 'wave' | 'none';
}

const SkeletonDoctorCard = React.forwardRef<
  HTMLDivElement,
  SkeletonDoctorCardProps
>(({ animation = 'wave', className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={clsx('necktie-skeleton-doctor', className)}
      {...props}
    >
      <div className="necktie-skeleton-doctor__header">
        <Skeleton
          variant="avatar"
          className="necktie-skeleton-doctor__avatar"
          animation={animation}
        />
        <div className="necktie-skeleton-doctor__info">
          <Skeleton
            variant="text"
            width="180px"
            height="1.5rem"
            animation={animation}
          />
          <Skeleton
            variant="text"
            width="120px"
            height="1rem"
            animation={animation}
          />
        </div>
      </div>

      <div className="necktie-skeleton-doctor__content">
        <Skeleton variant="text" lines={2} animation={animation} />
        <Skeleton variant="text" width="80%" animation={animation} />
      </div>

      <div className="necktie-skeleton-doctor__footer">
        <Skeleton
          variant="rectangular"
          width="120px"
          height="36px"
          animation={animation}
        />
        <Skeleton
          variant="rectangular"
          width="100px"
          height="36px"
          animation={animation}
        />
      </div>
    </div>
  );
});

SkeletonDoctorCard.displayName = 'SkeletonDoctorCard';

export default SkeletonDoctorCard;
