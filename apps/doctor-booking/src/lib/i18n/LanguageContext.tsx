'use client';

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';

export type Language = 'en' | 'zh';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  isChanging: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

interface LanguageProviderProps {
  children: ReactNode;
  initialLanguage?: Language;
}

export function LanguageProvider({
  children,
  initialLanguage = 'en',
}: LanguageProviderProps) {
  const [language, setCurrentLanguage] = useState<Language>(initialLanguage);
  const [isChanging, setIsChanging] = useState(false);
  const { i18n } = useTranslation();

  // Load saved language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem(
      'preferred-language'
    ) as Language;
    if (savedLanguage && ['en', 'zh'].includes(savedLanguage)) {
      setCurrentLanguage(savedLanguage);
      if (i18n.language !== savedLanguage) {
        i18n.changeLanguage(savedLanguage);
      }
    }
  }, [i18n]);

  const setLanguage = async (newLanguage: Language) => {
    if (newLanguage === language) return;

    setIsChanging(true);

    try {
      await i18n.changeLanguage(newLanguage);
      setCurrentLanguage(newLanguage);
      localStorage.setItem('preferred-language', newLanguage);

      // Update document lang attribute
      document.documentElement.lang = newLanguage;
    } catch (error) {
      console.error('Failed to change language:', error);
    } finally {
      setIsChanging(false);
    }
  };

  const value: LanguageContextType = {
    language,
    setLanguage,
    isChanging,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

// Helper hook to get language display names
export function useLanguageOptions() {
  const { t } = useTranslation('common');

  return [
    {
      value: 'en' as Language,
      label: t('language.english', 'English'),
      flag: '🇺🇸',
    },
    {
      value: 'zh' as Language,
      label: t('language.chinese', '中文'),
      flag: '🇨🇳',
    },
  ];
}
