import React from 'react';
import clsx from 'clsx';
import './Button.scss';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button variant */
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'flat';
  /** Button size */
  size?: 'sm' | 'md' | 'lg';
  /** Loading state */
  loading?: boolean;
  /** Full width button */
  fullWidth?: boolean;
  /** Icon to display before text */
  startIcon?: React.ReactNode;
  /** Icon to display after text */
  endIcon?: React.ReactNode;
  /** Button content */
  children?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      fullWidth = false,
      startIcon,
      endIcon,
      children,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        className={clsx(
          'necktie-button',
          `necktie-button--${variant}`,
          `necktie-button--${size}`,
          {
            'necktie-button--loading': loading,
            'necktie-button--full-width': fullWidth,
            'necktie-button--icon-only': !children && (startIcon || endIcon),
          },
          className
        )}
        disabled={isDisabled}
        {...props}
      >
        {loading && (
          <span className="necktie-button__spinner" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeDasharray="32"
                strokeDashoffset="32"
              />
            </svg>
          </span>
        )}
        {!loading && startIcon && (
          <span className="necktie-button__start-icon" aria-hidden="true">
            {startIcon}
          </span>
        )}
        {children && <span className="necktie-button__text">{children}</span>}
        {!loading && endIcon && (
          <span className="necktie-button__end-icon" aria-hidden="true">
            {endIcon}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
