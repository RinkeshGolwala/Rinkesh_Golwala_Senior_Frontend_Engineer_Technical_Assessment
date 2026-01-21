import { Metadata } from 'next';
import { Suspense } from 'react';
import { Doctor } from '../lib/types';
import DoctorsPageContent from '../components/DoctorsPageContent';
import DoctorsLoading from '../components/DoctorsLoading';
import { makeExternalApiRequest } from './api/api-config';

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

async function getDoctorsData(): Promise<{
  doctors: Doctor[];
  error: string | null;
}> {
  try {
    // Direct external API call for SSR using the shared config
    const response = await makeExternalApiRequest('/doctor');

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data: Doctor[] = await response.json();

    return {
      doctors: data || [],
      error: null,
    };
  } catch (err) {
    console.error('Error fetching doctors:', err);
    return {
      doctors: [],
      error:
        err instanceof Error ? err.message : 'Failed to connect to the server',
    };
  }
}

export default async function HomePage() {
  const { doctors, error } = await getDoctorsData();

  return (
    <Suspense fallback={<DoctorsLoading />}>
      <DoctorsPageContent initialDoctors={doctors} initialError={error} />
    </Suspense>
  );
}
