import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import localizedFormat from "dayjs/plugin/localizedFormat";
import type { setI18nLanguage } from "./i18n";

dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

export const date = dayjs;
export const dateLocale = async (locale: (Parameters<typeof setI18nLanguage>)[0]) => {
  switch (locale) {
    case "en": await import("dayjs/locale/en"); break;
    case "tr": await import("dayjs/locale/tr"); break;
    default: return;
  }

  date.locale(locale);
}