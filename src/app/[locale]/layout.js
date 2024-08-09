import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Providers } from '../Theme';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import CartDrawer from '@/components/Drawer/CartDrawer';
import { CartProvider } from '@/lib/context-api';
import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
import Error from './error';
import ProductModal from './@modal/(.)product/[id]/ProductModal';
import GetApp from '@/components/ui/GetApp';

export default async function LocaleLayout({
  children,
  modal,
  params
}) {
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={params.locale}>
      <body>
        <Providers>
          <CartProvider >
            <NextIntlClientProvider messages={messages}>
              <CartDrawer fixed={true} />
              <GetApp />

              <Header locale={params.locale} />
              <ErrorBoundary fallback={<Error />}>
                {children}
                {modal}
              </ErrorBoundary>
              <Footer locale={params.locale} />
            </NextIntlClientProvider>
          </CartProvider>
        </Providers>
      </body>
    </html>
  );
}