import 'react-i18next';
import en from '../public/locales/en/translation.json';

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: 'en';
    resources: {
      en: typeof en;
    };
  };
};