import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { enTranslations } from './translations/en';
import { noTranslations } from './translations/no';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'no',
    supportedLngs: ['en', 'no'],
    detection: {
      order: ['navigator', 'htmlTag', 'path', 'subdomain'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },
    resources: {
      en: {
        translation: enTranslations
      },
      no: {
        translation: noTranslations
      }
    }
  });

export default i18n;