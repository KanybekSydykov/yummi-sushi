// import {notFound} from 'next/navigation';
// import {getRequestConfig} from 'next-intl/server';
 
// // Can be imported from a shared config
// const locales = ['ru', 'ky'];
 
// export default getRequestConfig(async ({locale}) => {
//   // Validate that the incoming `locale` parameter is valid
//   if (!locales.includes(locale)) notFound();
 
//   return {
//     messages: (await import(`../../messages/${locale}.json`)).default
//   };
// });

import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import { LocalePrefix } from "next-intl/routing";
import createMiddleware from "next-intl/middleware";

const localePrefix = "always";

export const AppConfig = {
  locales: [
    {
      id: "ru",
      name: "Русский",
    },
    {
      id: "ky",
      name: "Кыргызча",
    },
  ],
  defaultLocale: "ru",
  localePrefix,
};

export const AllLocales = AppConfig.locales.map((locale) => locale.id);

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming locale parameter is valid
  if (!AllLocales.includes(locale)) notFound();

  return {
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});

export const getI18nPath = (url, locale) => {
  if (locale === AppConfig.defaultLocale) {
    return url;
  }

  return `/${locale}${url}`;
};

export const i18nMiddleware = createMiddleware({
  locales: AllLocales,
  localePrefix: AppConfig.localePrefix,
  defaultLocale: AppConfig.defaultLocale,
});

