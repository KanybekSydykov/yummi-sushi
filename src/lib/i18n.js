import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";

export const AppConfig = {
  locales: [
    { id: "ru", name: "Русский" },
    { id: "ky", name: "Кыргызча" },
  ],
  defaultLocale: "ru",
  localePrefix: "always",
};

export const AllLocales = AppConfig.locales.map(locale => locale.id);

export default getRequestConfig(async ({ locale }) => {
  if (!AllLocales.includes(locale)) notFound();

  return {
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});

export const getI18nPath = (url, locale) => {
  if (locale === AppConfig.defaultLocale) return url;
  return `/${locale}${url}`;
};
