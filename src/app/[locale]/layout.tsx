import { Inter, Playfair_Display } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/i18n/config';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import '../globals.css';

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

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;

  const titles: Record<Locale, string> = {
    ko: '별자리 운세 - 오늘의 운세와 별자리 궁합',
    en: 'Zodiac Horoscope - Daily Horoscope & Compatibility',
    zh: '星座运势 - 今日运势与星座配对',
    ja: '星座占い - 今日の運勢と相性診断',
    es: 'Horóscopo Zodiacal - Horóscopo Diario y Compatibilidad',
  };

  const descriptions: Record<Locale, string> = {
    ko: '12별자리의 오늘의 운세, 별자리 궁합, 출생 차트를 확인하세요. 매일 업데이트되는 정확한 운세 정보를 제공합니다.',
    en: 'Check daily horoscope, zodiac compatibility, and birth charts for all 12 signs. Get accurate horoscope updates every day.',
    zh: '查看12星座的今日运势、星座配对和出生星盘。每日更新准确的运势信息。',
    ja: '12星座の今日の運勢、星座の相性、出生チャートをチェック。毎日更新される正確な占い情報をお届けします。',
    es: 'Consulta el horóscopo diario, compatibilidad zodiacal y cartas natales de los 12 signos. Actualizaciones precisas cada día.',
  };

  return {
    title: titles[locale],
    description: descriptions[locale],
    keywords: ['horoscope', 'zodiac', 'astrology', 'compatibility', 'birth chart', '운세', '별자리'],
    openGraph: {
      title: titles[locale],
      description: descriptions[locale],
      type: 'website',
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  // Validate locale
  if (!locales.includes(locale)) {
    notFound();
  }

  setRequestLocale(locale);

  // Get messages for the current locale
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans min-h-screen flex flex-col">
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
