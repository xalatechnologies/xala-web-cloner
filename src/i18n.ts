import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'no',
    supportedLngs: ['en', 'no'],
    defaultNS: 'translation',
    fallbackNS: 'translation',
    
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },

    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupFromPathIndex: 0,
      // Map browser language codes to our supported codes
      convertLanguageCodes: true,
      checkWhitelist: true,
      // This ensures that any 'en' variant (en-GB, en-US, etc) maps to 'en'
      languageUtils: {
        formatLanguageCode: function(code: string) {
          if (code.startsWith('en')) return 'en';
          if (code.startsWith('no') || code === 'nb' || code === 'nn') return 'no';
          return code;
        }
      }
    },

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;