import { Metadata } from 'next';
import HomePageContent from './home-page';

export const metadata: Metadata = {
  title: 'Find the Best Doctors | Doctor Booking App',
  description:
    'Discover and book appointments with top-rated doctors in your area. Easy online booking, verified professionals, and flexible scheduling.',
  keywords:
    'doctors, booking, appointment, healthcare, medical professionals, online booking',
  openGraph: {
    title: 'Find the Best Doctors | Doctor Booking App',
    description:
      'Discover and book appointments with top-rated doctors in your area.',
    type: 'website',
  },
};

export default function HomePage() {
  return <HomePageContent />;
}
