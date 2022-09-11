import { createI18n } from 'vue-i18n'
import cookie from "js-cookie"
import { date, dateLocale } from './date';

const LANGUAGES = ["en", "tr"] as const;

export const i18n = createI18n({
  legacy: false,
  allowComposition: true,
  fallbackLocale: "en"
})

export async function initI18nLanguage() {
  let locale = cookie.get("locale");

  if (locale === undefined) locale = "en";
  else if (!LANGUAGES.includes(locale as typeof LANGUAGES[number])) locale = "en";

  await setI18nLanguage(locale as typeof LANGUAGES[number]);
}

export async function setI18nLanguage(locale: typeof LANGUAGES[number]) {
  await dateLocale(locale);
  cookie.set("locale", locale, { expires: new Date(9999, 11) });
  if (typeof i18n.global.locale === "string") return;
  i18n.global.locale.value = locale;
  document.documentElement.setAttribute("lang", locale)
  await loadLocaleMessages(locale);
}

async function loadLocaleMessages(locale: string) {
  const messages = await import(
    /* webpackChunkName: "locale-[request]" */ `@/locales/${locale}.json`
  )

  i18n.global.setLocaleMessage(locale, messages.default);
}