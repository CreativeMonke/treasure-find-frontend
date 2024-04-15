import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend'; // Import the backend plugin

i18n
  .use(HttpBackend) // Use the backend plugin
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'ro',
    debug: true,
    ns: ['translations'],
    defaultNS: 'translations',
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
    backend: { // Configuration for the backend plugin
      loadPath: '/locales/{{lng}}/{{ns}}.json', // Path to the translation files
    },
  }, function (err, t) {
    if (err) {
      console.error('i18next initialization failed:', err);
    }
  });

export default i18n;
