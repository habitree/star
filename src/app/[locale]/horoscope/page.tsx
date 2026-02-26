/**
 * [locale]/horoscope - 다국어 운세 메인 페이지
 */

import { Metadata } from 'next';
import Link from 'next/link';
import { getTodayTopSigns, generateDailyHoroscope } from '@/lib/horoscope-generator';
import { zodiacData } from '@/data/zodiac-info';
import { zodiacSigns } from '@/data/zodiac-signs';
import { getSiteUrl } from '@/lib/site-url';
import HoroscopeClientApp from '@/components/horoscope/HoroscopeClientApp';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import { AdSenseUnit } from '@/components/ads';
import { isAdSenseEnabled } from '@/lib/adsense-config';
import { locales, type Locale } from '@/i18n/config';
import type { ZodiacSignId } from '@/types';

const pageMetaByLocale: Record<Locale, { title: string; desc: string }> = {
  ko: { title: '오늘의 운세', desc: '생년월일을 입력하면 맞춤형 운세를 확인할 수 있습니다.' },
  en: { title: 'Daily Horoscope', desc: 'Enter your birth date for your personalized horoscope. Updated daily.' },
  zh: { title: '今日运势', desc: '输入生日获取个性化运势。每日更新。' },
  ja: { title: '今日の運勢', desc: '生年月日を入力してパーソナル運勢をチェック。毎日更新。' },
  es: { title: 'Horoscopo Diario', desc: 'Ingresa tu fecha de nacimiento para tu horoscopo personalizado.' },
};

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
  const meta = pageMetaByLocale[safeLocale];
  const baseUrl = getSiteUrl();
  const url = `${baseUrl}/${safeLocale}/horoscope`;

  return {
    title: meta.title,
    description: meta.desc,
    openGraph: { title: meta.title, description: meta.desc, url, type: 'website' },
    alternates: {
      canonical: url,
      languages: Object.fromEntries(locales.map((loc) => [loc, `${baseUrl}/${loc}/horoscope`])),
    },
  };
}

const topLabel: Record<Locale, string> = {
  ko: '오늘의 운세 순위 TOP 3',
  en: "Today's Top 3 Signs",
  zh: '今日运势排名TOP 3',
  ja: '今日の運勢ランキング TOP 3',
  es: 'Top 3 Signos de Hoy',
};

const allSignsLabel: Record<Locale, string> = {
  ko: '모든 별자리 운세 보기',
  en: 'All Zodiac Signs',
  zh: '所有星座运势',
  ja: '全星座の運勢',
  es: 'Todos los Signos',
};

export default async function LocaleHoroscopePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const safeLocale = locales.includes(locale as Locale) ? (locale as Locale) : 'ko';
  const meta = pageMetaByLocale[safeLocale];
  const baseUrl = getSiteUrl();

  const topSigns = getTodayTopSigns(new Date(), 3);
  const topHoroscopes = topSigns.map((item) => ({
    ...item,
    horoscope: generateDailyHoroscope(item.signId, new Date(), safeLocale),
    signData: zodiacData[item.signId],
    signMeta: zodiacSigns.find((s) => s.id === item.signId),
  }));

  const allSigns: ZodiacSignId[] = [
    'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
    'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces',
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <Breadcrumbs
          baseUrl={baseUrl}
          items={[
            { label: safeLocale === 'ko' ? '홈' : 'Home', href: `/${safeLocale}` },
            { label: meta.title, href: `/${safeLocale}/horoscope` },
          ]}
          className="mb-6"
        />

        <div className="text-center mb-8">
          <h1 className="text-4xl font-serif font-bold text-white mb-4">{meta.title}</h1>
          <p className="text-white/70 text-lg">{meta.desc}</p>
        </div>

        {/* 맞춤형 운세 클라이언트 영역 */}
        <HoroscopeClientApp />

        {/* TOP 3 (서버 렌더링) */}
        <section className="mt-16 mb-16">
          <h2 className="text-2xl font-serif font-semibold text-white mb-6 text-center">
            {topLabel[safeLocale]}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topHoroscopes.map((item, index) => {
              const signName = item.signMeta?.names[safeLocale] ?? item.signMeta?.names.ko ?? item.signData.name;
              return (
                <Link key={item.signId} href={`/${safeLocale}/horoscope/daily/${item.signId}`} className="block">
                  <div className={`glass-card p-6 text-center relative overflow-hidden hover:scale-105 transition-transform duration-300 element-${item.signData.element} ${index === 0 ? 'ring-2 ring-yellow-400/50' : ''}`}>
                    <div className={`absolute top-3 left-3 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${index === 0 ? 'bg-yellow-400 text-yellow-900' : ''} ${index === 1 ? 'bg-gray-300 text-gray-700' : ''} ${index === 2 ? 'bg-amber-600 text-amber-100' : ''}`}>
                      {index + 1}
                    </div>
                    <div className="text-5xl mb-3 filter drop-shadow-lg">{item.signData.symbol}</div>
                    <h3 className="text-xl font-semibold text-white mb-2">{signName}</h3>
                    <p className="text-white/60 text-sm line-clamp-3">
                      {(item.horoscope.overall as { text?: { ko?: string } })?.text?.[safeLocale as 'ko'] ??
                       (item.horoscope.overall as { text?: { ko?: string } })?.text?.ko ?? ''}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* 모든 별자리 */}
        <section className="mb-16">
          <h2 className="text-2xl font-serif font-semibold text-white mb-6 text-center">
            {allSignsLabel[safeLocale]}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {allSigns.map((signId) => {
              const signData = zodiacData[signId];
              const signMeta = zodiacSigns.find((s) => s.id === signId);
              const signName = signMeta?.names[safeLocale] ?? signMeta?.names.ko ?? signData.name;
              return (
                <Link
                  key={signId}
                  href={`/${safeLocale}/horoscope/daily/${signId}`}
                  className={`glass-card p-4 text-center hover:scale-105 transition-transform duration-200 cursor-pointer element-${signData.element}`}
                >
                  <div className="text-3xl mb-2">{signData.symbol}</div>
                  <p className="text-white text-sm font-medium">{signName}</p>
                </Link>
              );
            })}
          </div>
        </section>

        {isAdSenseEnabled() && (
          <div className="mb-8">
            <AdSenseUnit adFormat="auto" responsive={true} className="w-full" />
          </div>
        )}
      </div>
    </div>
  );
}
