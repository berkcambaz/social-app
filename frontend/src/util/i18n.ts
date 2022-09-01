import { createI18n } from 'vue-i18n'
import { getCookie } from "@/util/util"

export const i18n = createI18n({
  legacy: false,
  allowComposition: true,
  fallbackLocale: "en"
})

export async function initI18nLanguage() {
  let locale = getCookie("locale")
  if (locale === undefined) return;
  locale = "tr";
  await setI18nLanguage(locale);
}

export async function setI18nLanguage(locale: string) {
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