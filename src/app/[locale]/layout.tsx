import { Inter, Playfair_Display } from 'next/font/google';
import Script from 'next/script';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CookieConsent from '@/components/layout/CookieConsent';
import JsonLd from '@/components/seo/JsonLd';
import { locales, type Locale } from '@/i18n/config';
import '../globals.css';

const ADSENSE_PUBLISHER_ID = 'ca-pub-4166976105261105';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://luckytoday.one';

// hreflang alternates for SEO
function buildAlternates(locale: Locale) {
  const languages: Record<string, string> = {};
  for (const loc of locales) {
    languages[loc] = `${siteUrl}/${loc}`;
  }
  return {
    canonical: `${siteUrl}/${locale}`,
    languages,
  };
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: 'home' });

  const localeToOgLocale: Record<Locale, string> = {
    ko: 'ko_KR',
    en: 'en_US',
    zh: 'zh_CN',
    ja: 'ja_JP',
    es: 'es_ES',
  };

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: t('title'),
      template: `%s | ${t('title')}`,
    },
    description: t('subtitle'),
    alternates: buildAlternates(locale as Locale),
    openGraph: {
      title: t('title'),
      description: t('subtitle'),
      type: 'website',
      locale: localeToOgLocale[locale as Locale] ?? 'ko_KR',
      url: `${siteUrl}/${locale}`,
      siteName: 'LuckyToday',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large' as const,
        'max-snippet': -1,
      },
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || '',
    },
  };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages({ locale });

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: `${siteUrl}/${locale}`,
    name: 'LuckyToday',
    description: 'Horoscope, zodiac compatibility, and birth chart for all 12 signs.',
    inLanguage: locale,
    publisher: {
      '@type': 'Organization',
      name: 'LuckyToday',
      url: siteUrl,
    },
  };

  return (
    <html lang={locale} className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <meta name="google-adsense-account" content={ADSENSE_PUBLISHER_ID} />
        <JsonLd data={websiteJsonLd} />
      </head>
      <body className="font-sans min-h-screen flex flex-col">
        <Script
          id="adsense-script"
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUBLISHER_ID}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header locale={locale as Locale} />
          <main className="flex-1">{children}</main>
          <Footer />
          <CookieConsent />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
