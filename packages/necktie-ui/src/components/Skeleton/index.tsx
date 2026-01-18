import React from 'react';
import clsx from 'clsx';
import './Skeleton.scss';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Skeleton variant */
  variant?: 'text' | 'circular' | 'rectangular' | 'avatar';
  /** Width of the skeleton */
  width?: string | number;
  /** Height of the skeleton */
  height?: string | number;
  /** Animation type */
  animation?: 'pulse' | 'wave' | 'none';
  /** Number of lines (for text variant) */
  lines?: number;
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      variant = 'text',
      width,
      height,
      animation = 'wave',
      lines = 1,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const skeletonStyle: React.CSSProperties = {
      width,
      height,
      ...style,
    };

    // For text variant with multiple lines
    if (variant === 'text' && lines > 1) {
      return (
        <div
          ref={ref}
          className={clsx(
            'necktie-skeleton-container',
            className
          )}
          style={{width}}
          {...props}
        >
          {Array.from({ length: lines }, (_, index) => (
            <div
              key={index}
              className={clsx(
                'necktie-skeleton',
                `necktie-skeleton--${variant}`,
                `necktie-skeleton--${animation}`,
                {
                  'necktie-skeleton--last-line': index === lines - 1,
                }
              )}
              style={{
                ...skeletonStyle,
                width: index === lines - 1 ? '80%' : '100%',
              }}
            />
          ))}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={clsx(
          'necktie-skeleton',
          `necktie-skeleton--${variant}`,
          `necktie-skeleton--${animation}`,
          className
        )}
        style={skeletonStyle}
        {...props}
      />
    );
  }
);

Skeleton.displayName = 'Skeleton';

export default Skeleton;