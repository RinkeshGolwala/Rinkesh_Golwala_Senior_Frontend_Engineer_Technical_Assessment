import React from 'react';
import clsx from 'clsx';
import './Switch.scss';

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'role' | 'size' | 'onChange'> {
  /** Unique identifier for the switch */
  id: string;
  /** Whether the switch is checked */
  checked?: boolean;
  /** Callback when switch state changes */
  onChange?: (checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Switch size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Switch color variant */
  variant?: 'primary' | 'neutral';
  /** Disabled state */
  disabled?: boolean;
  /** Label for the switch */
  label?: React.ReactNode;
  /** Description text */
  description?: React.ReactNode;
  /** Position of the label relative to switch */
  labelPosition?: 'left' | 'right';
  /** Custom labels for on/off states */
  onLabel?: React.ReactNode;
  offLabel?: React.ReactNode;
  /** Show labels outside the switch track */
  showStateLabels?: boolean;
}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      checked = false,
      onChange,
      size = 'md',
      variant = 'primary',
      disabled = false,
      label,
      description,
      labelPosition = 'right',
      onLabel,
      offLabel,
      showStateLabels = false,
      className,
      id,
      ...props
    },
    ref
  ) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(event.target.checked, event);
      }
    };

    const switchElement = (
      <div className={clsx(
        'necktie-switch-container',
        {
          'necktie-switch-container--with-labels': showStateLabels,
        }
      )}>
        {showStateLabels && (
          <span className={clsx(
            'necktie-switch-external-label',
            'necktie-switch-external-label--off',
            {
              'necktie-switch-external-label--active': !checked,
            }
          )}>
            {offLabel || 'OFF'}
          </span>
        )}
        
        <div
          className={clsx(
            'necktie-switch',
            `necktie-switch--${size}`,
            `necktie-switch--${variant}`,
            {
              'necktie-switch--checked': checked,
              'necktie-switch--disabled': disabled,
            },
            className
          )}
        >
          <input
            ref={ref}
            type="checkbox"
            id={id}
            checked={checked}
            onChange={handleChange}
            disabled={disabled}
            className="necktie-switch__input"
            role="switch"
            aria-checked={checked}
            aria-describedby={description ? `${id}-description` : undefined}
            {...props}
          />
          <div className="necktie-switch__track">
            <div className="necktie-switch__thumb" />
          </div>
        </div>

        {showStateLabels && (
          <span className={clsx(
            'necktie-switch-external-label',
            'necktie-switch-external-label--on',
            {
              'necktie-switch-external-label--active': checked,
            }
          )}>
            {onLabel || 'ON'}
          </span>
        )}
      </div>
    );

    if (!label && !description) {
      return switchElement;
    }

    return (
      <div className={clsx(
        'necktie-switch-wrapper',
        `necktie-switch-wrapper--label-${labelPosition}`,
        {
          'necktie-switch-wrapper--disabled': disabled,
        }
      )}>
        {labelPosition === 'left' && (label || description) && (
          <div className="necktie-switch-wrapper__content">
            {label && (
              <label htmlFor={id} className="necktie-switch-wrapper__label">
                {label}
              </label>
            )}
            {description && (
              <div id={`${id}-description`} className="necktie-switch-wrapper__description">
                {description}
              </div>
            )}
          </div>
        )}
        
        {switchElement}
        
        {labelPosition === 'right' && (label || description) && (
          <div className="necktie-switch-wrapper__content">
            {label && (
              <label htmlFor={id} className="necktie-switch-wrapper__label">
                {label}
              </label>
            )}
            {description && (
              <div id={`${id}-description`} className="necktie-switch-wrapper__description">
                {description}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
);

Switch.displayName = 'Switch';

export default Switch;