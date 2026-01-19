import React from 'react';
import clsx from 'clsx';
import './Card.scss';

export interface CardProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Card variant */
  variant?: 'default' | 'elevated' | 'outlined' | 'interactive';
  /** Card padding size */
  padding?: 'sm' | 'md' | 'lg' | 'none';
  /** Loading state */
  loading?: boolean;
  /** Header content */
  header?: React.ReactNode;
  /** Footer content */
  footer?: React.ReactNode;
  /** Card content */
  children?: React.ReactNode;
}

const Card = React.forwardRef<HTMLButtonElement, CardProps>(
  (
    {
      variant = 'default',
      padding = 'md',
      loading = false,
      header,
      footer,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const isInteractive = props.onClick !== undefined;

    return (
      <button
        ref={ref}
        className={clsx(
          'necktie-card',
          `necktie-card--${variant}`,
          `necktie-card--padding-${padding}`,
          {
            'necktie-card--interactive': isInteractive,
            'necktie-card--loading': loading,
          },
          className
        )}
        {...props}
      >
        {loading && <div className="necktie-card__loading-overlay" />}

        {header && <div className="necktie-card__header">{header}</div>}

        {children && <div className="necktie-card__content">{children}</div>}

        {footer && <div className="necktie-card__footer">{footer}</div>}
      </button>
    );
  }
);

Card.displayName = 'Card';

export default Card;
