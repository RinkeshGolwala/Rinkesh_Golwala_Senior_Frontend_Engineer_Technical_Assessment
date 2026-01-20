'use client';

import { Layout, type RouteConfig, type NavigationConfig } from '@doctor-booking/necktie-ui';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { useTranslation } from 'react-i18next';

export default function HomePageContent() {
  const { t } = useTranslation('common');

  const navigationConfig: NavigationConfig = {
    routes: [
      {
        id: 'home',
        title: t('navigation.home', 'Home'),
        url: '/',
      },
      {
        id: 'bookings',
        title: t('navigation.bookings', 'My Bookings'),
        url: '/bookings',
      },
    ],
    onRouteClick: (route: RouteConfig) => {
      alert(`Navigate to: ${route.url}`);
    },
  };

  return (
    <Layout
      navigation={navigationConfig}
      activeRouteId="home"
      userName="John Doe"
      onUserMenuClick={() => {
        // Handle user menu click - will be implemented later
        alert('User menu clicked');
      }}
      headerActions={
        <LanguageSwitcher />
      }
    >
      <div className="container">
        <section className="hero-section section">
          <div className="hero-content">
            <h1>{t('hero.title', 'Find & Book the Best Doctors')}</h1>
            <p>
              {t('hero.description', 'Discover top-rated healthcare professionals in your area and book appointments with ease. Your health, our priority.')}
            </p>
            <div className="hero-actions">
              <a href="#doctors" className="btn btn-primary">
                {t('hero.browseButton', 'Browse Doctors')}
              </a>
            </div>
          </div>
        </section>

        <section id="doctors" className="doctors-section section">
          <h2>{t('doctors.title', 'Available Doctors')}</h2>
          <p>{t('doctors.loading', 'Loading doctors list...')}</p>
          {/* Doctors list will be implemented in the next commit */}
        </section>
      </div>
    </Layout>
  );
}