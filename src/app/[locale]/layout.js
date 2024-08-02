import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import Link from 'next/link';
import { Providers } from '../Theme';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import CartDrawer from '@/components/Drawer/CartDrawer';
import { CartProvider } from '@/lib/context-api';
import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
import Error from './error';

export default async function LocaleLayout({
  children,
  params: { locale }
}) {
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <Providers>
          <CartProvider >
            <NextIntlClientProvider messages={messages}>
              <CartDrawer fixed={true} />
              <Header locale={locale} />
              <ErrorBoundary fallback={<Error />}>
              {children}
              </ErrorBoundary>
              <Footer locale={locale} />
            </NextIntlClientProvider>
          </CartProvider>
        </Providers>
      </body>
    </html>
  );
}