// Export all components
export { default as Button } from './components/Button';
export { default as Calendar } from './components/Calendar';
export { default as Card } from './components/Card';
export { default as Layout } from './components/Layout';
export { default as Modal } from './components/Modal';
export { default as Skeleton } from './components/Skeleton';
export { default as Switch } from './components/Switch';
export { default as TimeSlot, TimeSlotList } from './components/TimeSlot';

// Export skeleton sub-components
export { SkeletonDoctorCard, SkeletonBookingCard } from './components/Skeleton';

// Export types (will be added when components are created)
export type { ButtonProps } from './components/Button';
export type { CalendarProps, OpeningHour } from './components/Calendar';
export type { CardProps } from './components/Card';
export type {
  LayoutProps,
  NavigationConfig,
  RouteConfig,
} from './components/Layout';
export type { ModalProps } from './components/Modal';
export type {
  SkeletonProps,
  SkeletonDoctorCardProps,
  SkeletonBookingCardProps,
} from './components/Skeleton';
export type { SwitchProps } from './components/Switch';
export type { TimeSlotProps, TimeSlotListProps } from './components/TimeSlot';
