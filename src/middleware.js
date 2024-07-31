import createMiddleware from "next-intl/middleware";
import { AllLocales, AppConfig } from "./lib/i18n";

export default createMiddleware({
  locales: AllLocales,
  localePrefix: AppConfig.localePrefix,
  defaultLocale: AppConfig.defaultLocale,
});

export const config = {
  matcher: [
    '/',
    '/(ru|ky)/:path*',
    '/((?!_next|_vercel|.*\\..*).*)'
  ]
};
