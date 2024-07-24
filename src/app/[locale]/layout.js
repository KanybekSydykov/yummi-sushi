import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import Link from 'next/link';
import { Providers } from '../Theme';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import CartDrawer from '@/components/Drawer/CartDrawer';
import { CartProvider } from '@/lib/context-api';

export default async function LocaleLayout({
  children,
  params: { locale }
}) {
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <title>
        Yummi Sushi
      </title>
      <body>
        <Providers>
          <CartProvider >


            <CartDrawer fixed={true} />


            <NextIntlClientProvider messages={messages}>
              <Header locale={locale} />
              {children}
              <Footer locale={locale} />
            </NextIntlClientProvider>
          </CartProvider>

        </Providers>

      </body>
    </html>
  );
}