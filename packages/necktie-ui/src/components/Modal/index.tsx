import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import Button from '../Button';
import './Modal.scss';

export interface ModalProps {
  /** Whether the modal is open */
  open: boolean;
  /** Called when the modal should close */
  onClose: () => void;
  /** Modal title */
  title?: React.ReactNode;
  /** Modal content */
  children?: React.ReactNode;
  /** Modal footer actions */
  footer?: React.ReactNode;
  /** Modal size */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  /** Whether clicking backdrop closes modal */
  closeOnBackdropClick?: boolean;
  /** Whether pressing escape closes modal */
  closeOnEscape?: boolean;
  /** Whether to show close button */
  showCloseButton?: boolean;
  /** Custom className */
  className?: string;
  /** Loading state */
  loading?: boolean;
  /** Confirmation modal type with preset styling */
  variant?: 'default' | 'confirmation' | 'danger';
}

const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  closeOnBackdropClick = true,
  closeOnEscape = true,
  showCloseButton = true,
  className,
  loading = false,
  variant = 'default',
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && closeOnEscape && !loading) {
        onClose();
      }
    };

    if (open) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [open, closeOnEscape, onClose, loading]);

  // Focus management
  useEffect(() => {
    if (open) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      modalRef.current?.focus();
    } else {
      previousActiveElement.current?.focus();
    }
  }, [open]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [open]);

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (
      event.target === event.currentTarget &&
      closeOnBackdropClick &&
      !loading
    ) {
      onClose();
    }
  };

  if (!open) return null;

  const modalContent = (
    <div
      className={clsx('necktie-modal-backdrop', {
        'necktie-modal-backdrop--loading': loading,
      })}
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className={clsx(
          'necktie-modal',
          `necktie-modal--${size}`,
          `necktie-modal--${variant}`,
          className
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
        tabIndex={-1}
      >
        {loading && <div className="necktie-modal__loading-overlay" />}

        {(title || showCloseButton) && (
          <div className="necktie-modal__header">
            {title && (
              <h2 id="modal-title" className="necktie-modal__title">
                {title}
              </h2>
            )}
            {!title && <div />}
            {showCloseButton && (
              <button
                onClick={onClose}
                disabled={loading}
                className="necktie-modal__close-button"
                aria-label="Close modal"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                >
                  <path d="M8 6.586L13.657.93A1 1 0 0115.07 2.343L9.414 8l5.657 5.657a1 1 0 01-1.414 1.414L8 9.414l-5.657 5.657a1 1 0 01-1.414-1.414L6.586 8 .929 2.343A1 1 0 012.343.93L8 6.586z" />
                </svg>
              </button>
            )}
          </div>
        )}

        <div className="necktie-modal__content">{children}</div>

        {footer && <div className="necktie-modal__footer">{footer}</div>}
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

Modal.displayName = 'Modal';

export default Modal;
