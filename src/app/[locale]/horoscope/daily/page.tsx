/**
 * [locale]/horoscope/daily - 다국어 일일 운세 목록 페이지
 */

import Link from 'next/link';
import { Metadata } from 'next';
import { zodiacData } from '@/data/zodiac-info';
import { zodiacSigns } from '@/data/zodiac-signs';
import { getSiteUrl } from '@/lib/site-url';
import { locales, type Locale } from '@/i18n/config';
import type { ZodiacSignId } from '@/types';

const pageMeta: Record<Locale, { title: string; desc: string }> = {
  ko: { title: '오늘의 별자리 운세', desc: '12별자리 오늘의 운세를 확인하세요.' },
  en: { title: 'Daily Horoscope for All Signs', desc: 'Check today\'s horoscope for all 12 zodiac signs.' },
  zh: { title: '12星座今日运势', desc: '查看12星座的今日运势。' },
  ja: { title: '12星座の今日の運勢', desc: '12星座の今日の運勢をチェックしましょう。' },
  es: { title: 'Horoscopo Diario de los 12 Signos', desc: 'Consulta el horoscopo de hoy para los 12 signos.' },
};

const allSigns: ZodiacSignId[] = [
  'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
  'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces',
];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = locales.includes(locale as Locale) ? (locale as Locale) : 'ko';
  const meta = pageMeta[safeLocale];
  const baseUrl = getSiteUrl();
  const url = `${baseUrl}/${safeLocale}/horoscope/daily`;

  return {
    title: meta.title,
    description: meta.desc,
    openGraph: { title: meta.title, description: meta.desc, url, type: 'website' },
    alternates: {
      canonical: url,
      languages: Object.fromEntries(locales.map((loc) => [loc, `${baseUrl}/${loc}/horoscope/daily`])),
    },
  };
}

export default async function LocaleHoroscopeDailyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const safeLocale = locales.includes(locale as Locale) ? (locale as Locale) : 'ko';
  const meta = pageMeta[safeLocale];

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{meta.title}</h1>
          <p className="text-white/70 text-lg">{meta.desc}</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
          {allSigns.map((signId) => {
            const signData = zodiacData[signId];
            const signMeta = zodiacSigns.find((s) => s.id === signId);
            const signName = signMeta?.names[safeLocale] ?? signMeta?.names.ko ?? signData.name;
            return (
              <Link
                key={signId}
                href={`/${safeLocale}/horoscope/daily/${signId}`}
                className={`glass-card p-6 text-center hover:scale-105 transition-transform duration-200 cursor-pointer element-${signData.element}`}
              >
                <div className="text-4xl mb-3">{signData.symbol}</div>
                <p className="text-white font-semibold">{signName}</p>
                <p className="text-white/50 text-xs mt-1">{signData.dateRange}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
