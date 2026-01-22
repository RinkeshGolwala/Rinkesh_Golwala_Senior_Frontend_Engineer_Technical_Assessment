'use client';

import type { i18n as I18nType } from 'i18next';
import { ReactNode, useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import { initI18next } from './config';
import { LanguageProvider } from './LanguageContext';
import DoctorsLoading from '@/components/DoctorsLoading';
import { ErrorState } from '../../components/DoctorsPageContent/sub-components';

interface I18nProviderProps {
  children: ReactNode;
  locale?: string;
}

export function I18nProvider({ children, locale = 'en' }: I18nProviderProps) {
  const [i18n, setI18n] = useState<I18nType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initialize = async () => {
      try {
        const i18nInstance = await initI18next(locale);
        setI18n(i18nInstance);
      } catch (error) {
        console.error('Failed to initialize i18n:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initialize();
  }, [locale]);

  if (isLoading) {
    return (
      <div className="loading-container">
        <DoctorsLoading />
      </div>
    );
  }

  if (!i18n) {
    return <ErrorState error="Error loading translations" />;
  }

  return (
    <I18nextProvider i18n={i18n}>
      <LanguageProvider initialLanguage={locale as 'en' | 'zh'}>
        {children}
      </LanguageProvider>
    </I18nextProvider>
  );
}
