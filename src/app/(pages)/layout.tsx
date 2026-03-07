import { NextIntlClientProvider } from 'next-intl';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CookieConsent from '@/components/layout/CookieConsent';
import koMessages from '@/i18n/messages/ko.json';

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextIntlClientProvider locale="ko" messages={koMessages}>
      <Header locale="ko" />
      <main className="flex-1">{children}</main>
      <Footer />
      <CookieConsent />
    </NextIntlClientProvider>
  );
}
