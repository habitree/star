import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CookieConsent from '@/components/layout/CookieConsent';
import JsonLd from '@/components/seo/JsonLd';
import { locales, type Locale } from '@/i18n/config';
import { buildLanguageAlternates } from '@/lib/seo-utils';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://luckytoday.one';

function buildAlternates(locale: Locale) {
  return {
    canonical: `${siteUrl}/${locale}`,
    languages: buildLanguageAlternates(siteUrl, ''),
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
      images: [{ url: '/og/default.jpg', width: 1200, height: 630, alt: 'LuckyToday' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('subtitle'),
      images: ['/og/default.jpg'],
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
    <NextIntlClientProvider locale={locale} messages={messages}>
      <JsonLd data={websiteJsonLd} />
      <Header locale={locale as Locale} />
      <main className="flex-1">{children}</main>
      <Footer />
      <CookieConsent />
    </NextIntlClientProvider>
  );
}
