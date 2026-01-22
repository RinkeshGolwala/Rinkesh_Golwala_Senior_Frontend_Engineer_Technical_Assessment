import './globals.scss';

import { ReactNode } from 'react';

import { I18nProvider } from '@/lib/i18n/I18nProvider';

export const metadata = {
  title: 'Doctor Booking App',
  description: 'Book appointments with doctors easily and efficiently',
  keywords: 'doctor, booking, appointment',
};

interface RootLayoutProps {
  children: ReactNode;
  params: {
    locale?: string;
  };
}

export default function RootLayout({ children, params }: RootLayoutProps) {
  const locale = params?.locale || 'en';

  return (
    <html lang={locale} dir="ltr">
      <body>
        <I18nProvider locale={locale}>{children}</I18nProvider>
      </body>
    </html>
  );
}
