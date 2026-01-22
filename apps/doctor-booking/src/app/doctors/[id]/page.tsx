import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import { makeExternalApiRequest } from '@/api/api-config';
import DoctorDetailsLoading from '@/components/DoctorDetailsLoading';
import DoctorDetailsPageContent from '@/components/DoctorDetailsPageContent';
import { Doctor } from '@/lib';

type Props = {
  params: { id: string };
};

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { doctor, error } = await getDoctorData(params.id);

    if (!doctor || error) {
      return {
        title: 'Doctor Not Found | Doctor Booking',
      };
    }

    return {
      title: `Dr. ${doctor.name} | Doctor Booking`,
      description: doctor.description,
      keywords: [
        'doctor',
        'healthcare',
        'medical consultation',
        'booking',
        doctor.name,
        doctor.address.district,
      ],
      openGraph: {
        title: `Dr. ${doctor.name}`,
        description: doctor.description,
        type: 'profile',
        locale: 'en_US',
      },
    };
  } catch (error) {
    return {
      title: 'Doctor Not Found | Doctor Booking',
    };
  }
}

async function getDoctorData(id: string): Promise<{
  doctor: Doctor | null;
  error: string | null;
}> {
  try {
    // Direct external API call for SSR using the shared config
    const response = await makeExternalApiRequest(`/doctor/${id}`);

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data: Doctor = await response.json();

    return {
      doctor: data || [],
      error: null,
    };
  } catch (err) {
    console.error('Error fetching doctors:', err);
    return {
      doctor: null,
      error:
        err instanceof Error ? err.message : 'Failed to connect to the server',
    };
  }
}

// Server-side rendering for doctor details page
export default async function DoctorDetailsPage({ params }: Props) {
  try {
    const { doctor, error } = await getDoctorData(params.id);

    // Handle API error responses
    if (!doctor || error) {
      notFound();
    }

    return (
      <Suspense fallback={<DoctorDetailsLoading />}>
        <DoctorDetailsPageContent doctor={doctor} />
      </Suspense>
    );
  } catch (error) {
    // Handle any unexpected errors
    console.error('Error fetching doctor details:', error);
    notFound();
  }
}
