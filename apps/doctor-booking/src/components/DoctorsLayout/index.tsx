'use client';

import {
  Layout,
  type NavigationConfig,
  type RouteConfig,
} from '@doctor-booking/necktie-ui';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useTranslation } from 'react-i18next';

import LanguageSwitcher from '@/components/LanguageSwitcher';

interface DoctorsLayoutProps {
  children: React.ReactNode;
  activeRouteId?: string;
}

export default function DoctorsLayout({
  children,
  activeRouteId = 'home',
}: DoctorsLayoutProps) {
  const { t } = useTranslation('common');
  const router = useRouter();

  const handleNavigation = (route: RouteConfig) => {
    if (route.url) {
      router.push(route.url);
    }
  };

  // Define navigation routes based on context
  const getNavigationRoutes = () => {
    return [
      {
        id: 'home',
        title: t('navigation.home', 'Home'),
        url: '/',
      },
      {
        id: 'bookings',
        title: t('navigation.bookings', 'My Bookings'),
        url: '/booking',
      },
    ];
  };

  const navigationConfig: NavigationConfig = {
    routes: getNavigationRoutes(),
    onRouteClick: handleNavigation,
  };

  return (
    <Layout
      navigation={navigationConfig}
      activeRouteId={activeRouteId}
      userName="John Doe"
      onUserMenuClick={() => {
        // Handle user menu click - will be implemented later
        alert('User menu clicked');
      }}
      headerActions={<LanguageSwitcher />}
    >
      {children}
    </Layout>
  );
}
