import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { changeDateLocale } from './date';
import { useAppStore } from './store/appStore';

i18n
  .use(Backend)
  .use(new LanguageDetector(null, { caches: ["cookie"], lookupCookie: "locale" }))
  .use(initReactI18next)
  .init({
    load: "languageOnly",
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    supportedLngs: ["en", "tr"]
  });

export default i18n;

i18n.on("initialized", async () => {
  await changeDateLocale(i18n.languages[0] || "en");
  useAppStore.getState().setLoading(false);
})

i18n.on("languageChanged", async (lng) => {
  if (lng.includes("-")) {
    lng = lng.substring(0, lng.indexOf("-"))
    i18n.changeLanguage(lng);
    return;
  }

  document.documentElement.lang = lng;
})