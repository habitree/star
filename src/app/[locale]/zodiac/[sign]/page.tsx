/**
 * [locale]/zodiac/[sign] - 다국어 별자리 상세 페이지
 */

import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { zodiacSigns } from '@/data/zodiac-signs';
import { getSiteUrl } from '@/lib/site-url';
import { locales, type Locale } from '@/i18n/config';
import { isValidZodiacSign, ZODIAC_ORDER } from '@/lib/zodiac-utils';
import type { ZodiacSignId } from '@/types/zodiac';

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    ZODIAC_ORDER.map((sign) => ({ locale, sign }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; sign: string }>;
}): Promise<Metadata> {
  const { locale, sign } = await params;

  if (!isValidZodiacSign(sign)) return { title: 'Not Found' };

  const safeLocale = locales.includes(locale as Locale) ? (locale as Locale) : 'ko';
  const signMeta = zodiacSigns.find((s) => s.id === sign);
  if (!signMeta) return { title: 'Not Found' };

  const name = signMeta.names[safeLocale] ?? signMeta.names.ko;
  const baseUrl = getSiteUrl();
  const url = `${baseUrl}/${safeLocale}/zodiac/${sign}`;

  const descByLocale: Record<Locale, string> = {
    ko: `${name} 별자리의 특징, 성격, 궁합, 운세를 알아보세요.`,
    en: `Discover the traits, personality, compatibility and horoscope of ${name}.`,
    zh: `了解${name}的特征、性格、配对和运势。`,
    ja: `${name}の特徴、性格、相性、運勢を調べましょう。`,
    es: `Descubre los rasgos, personalidad, compatibilidad y horoscopo de ${name}.`,
  };

  return {
    title: name,
    description: descByLocale[safeLocale],
    openGraph: { title: name, description: descByLocale[safeLocale], url, type: 'website' },
    alternates: {
      canonical: url,
      languages: Object.fromEntries(locales.map((loc) => [loc, `${baseUrl}/${loc}/zodiac/${sign}`])),
    },
  };
}

export default async function LocaleZodiacSignPage({
  params,
}: {
  params: Promise<{ locale: string; sign: string }>;
}) {
  const { locale, sign } = await params;

  if (!isValidZodiacSign(sign)) notFound();

  const safeLocale = locales.includes(locale as Locale) ? (locale as Locale) : 'ko';
  const signMeta = zodiacSigns.find((s) => s.id === sign);
  if (!signMeta) notFound();

  const name = signMeta.names[safeLocale] ?? signMeta.names.ko;
  const rulingPlanet = signMeta.rulingPlanet[safeLocale] ?? signMeta.rulingPlanet.ko;
  const positiveTraits = signMeta.traits.positive.map((t) => t[safeLocale] ?? t.ko);
  const negativeTraits = signMeta.traits.negative.map((t) => t[safeLocale] ?? t.ko);

  const elementColor: Record<string, string> = {
    fire: 'from-red-500/20 to-orange-500/20',
    earth: 'from-green-500/20 to-emerald-500/20',
    air: 'from-blue-500/20 to-cyan-500/20',
    water: 'from-purple-500/20 to-violet-500/20',
  };

  const labels: Record<Locale, { strengths: string; weaknesses: string; planet: string; dateRange: string; horoscope: string; backToList: string }> = {
    ko: { strengths: '장점', weaknesses: '단점', planet: '지배 행성', dateRange: '날짜 범위', horoscope: '운세 보기', backToList: '별자리 목록' },
    en: { strengths: 'Strengths', weaknesses: 'Weaknesses', planet: 'Ruling Planet', dateRange: 'Date Range', horoscope: 'View Horoscope', backToList: 'All Signs' },
    zh: { strengths: '优点', weaknesses: '缺点', planet: '守护星', dateRange: '日期范围', horoscope: '查看运势', backToList: '所有星座' },
    ja: { strengths: '長所', weaknesses: '短所', planet: '支配星', dateRange: '期間', horoscope: '運勢を見る', backToList: '星座一覧' },
    es: { strengths: 'Fortalezas', weaknesses: 'Debilidades', planet: 'Planeta Regente', dateRange: 'Fechas', horoscope: 'Ver Horoscopo', backToList: 'Todos los Signos' },
  };
  const l = labels[safeLocale] ?? labels.ko;

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* 헤더 */}
        <div className={`glass-card p-10 mb-8 text-center bg-gradient-to-br ${elementColor[signMeta.element] ?? ''}`}>
          <div className="text-7xl mb-4">{signMeta.symbol}</div>
          <h1 className="text-4xl font-bold text-white mb-2">{name}</h1>
          <p className="text-white/60">{`${signMeta.dateRange.start} - ${signMeta.dateRange.end}`}</p>
          <p className="text-white/50 text-sm mt-1">{l.planet}: {rulingPlanet}</p>
        </div>

        {/* 성격 특성 */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="glass-card p-6">
            <h2 className="text-xl font-semibold text-white mb-4">✅ {l.strengths}</h2>
            <div className="flex flex-wrap gap-2">
              {positiveTraits.map((trait) => (
                <span key={trait} className="px-3 py-1.5 bg-green-500/20 text-green-300 rounded-full text-sm">{trait}</span>
              ))}
            </div>
          </div>
          <div className="glass-card p-6">
            <h2 className="text-xl font-semibold text-white mb-4">⚠️ {l.weaknesses}</h2>
            <div className="flex flex-wrap gap-2">
              {negativeTraits.map((trait) => (
                <span key={trait} className="px-3 py-1.5 bg-red-500/20 text-red-300 rounded-full text-sm">{trait}</span>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mb-8">
          <Link
            href={`/${safeLocale}/horoscope/daily/${sign}`}
            className="inline-block px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full hover:opacity-90 transition-opacity"
          >
            {signMeta.symbol} {l.horoscope}
          </Link>
        </div>

        {/* 다른 별자리 네비게이션 */}
        <div className="flex flex-wrap justify-center gap-2">
          {zodiacSigns
            .filter((s) => s.id !== sign)
            .map((s) => (
              <Link
                key={s.id}
                href={`/${safeLocale}/zodiac/${s.id}`}
                className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-sm rounded-full transition-colors"
              >
                {s.symbol} {s.names[safeLocale] ?? s.names.ko}
              </Link>
            ))}
        </div>

        <div className="text-center mt-6">
          <Link href={`/${safeLocale}/zodiac`} className="text-white/50 hover:text-white text-sm transition-colors">
            ← {l.backToList}
          </Link>
        </div>
      </div>
    </div>
  );
}
