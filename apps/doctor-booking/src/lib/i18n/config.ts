import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

const initI18next = async (locale: string = 'en') => {
  await i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .use(Backend)
    .init({
      lng: locale,
      fallbackLng: 'en',
      supportedLngs: ['en', 'zh'],
      debug: process.env.NODE_ENV === 'development',

      detection: {
        order: ['cookie', 'localStorage', 'navigator', 'htmlTag'],
        caches: ['localStorage', 'cookie'],
      },

      interpolation: {
        escapeValue: false,
      },

      // Render only after translations are loaded
      react: {
        useSuspense: true,
      },

      // Namespace configuration
      ns: ['common', 'doctors', 'bookings', 'forms'],
      defaultNS: 'common',

      // Backend options
      backend: {
        loadPath: '/locales/{{lng}}/{{ns}}.json',
      },

      // Preload languages
      preload: ['en', 'zh'],
    });

  return i18n;
};

export { initI18next };
export default i18n;
