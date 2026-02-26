/**
 * [locale]/zodiac - 다국어 별자리 목록 페이지
 */

import Link from 'next/link';
import { Metadata } from 'next';
import { zodiacSigns } from '@/data/zodiac-signs';
import { getSiteUrl } from '@/lib/site-url';
import { locales, type Locale } from '@/i18n/config';

const pageMeta: Record<Locale, { title: string; desc: string }> = {
  ko: { title: '별자리', desc: '12별자리의 특성과 성격을 알아보세요.' },
  en: { title: 'Zodiac Signs', desc: 'Explore the characteristics and personalities of all 12 zodiac signs.' },
  zh: { title: '星座', desc: '了解12星座的特征和性格。' },
  ja: { title: '星座', desc: '12星座の特徴と性格を調べてみましょう。' },
  es: { title: 'Signos del Zodiaco', desc: 'Explora las caracteristicas y personalidades de los 12 signos.' },
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
  const meta = pageMeta[safeLocale];
  const baseUrl = getSiteUrl();
  const url = `${baseUrl}/${safeLocale}/zodiac`;

  return {
    title: meta.title,
    description: meta.desc,
    openGraph: { title: meta.title, description: meta.desc, url, type: 'website' },
    alternates: {
      canonical: url,
      languages: Object.fromEntries(locales.map((loc) => [loc, `${baseUrl}/${loc}/zodiac`])),
    },
  };
}

export default async function LocaleZodiacPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const safeLocale = locales.includes(locale as Locale) ? (locale as Locale) : 'ko';
  const meta = pageMeta[safeLocale];

  const elementColor: Record<string, string> = {
    fire: 'from-red-500/20 to-orange-500/20 border-red-400/30',
    earth: 'from-green-500/20 to-emerald-500/20 border-green-400/30',
    air: 'from-blue-500/20 to-cyan-500/20 border-blue-400/30',
    water: 'from-purple-500/20 to-violet-500/20 border-purple-400/30',
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{meta.title}</h1>
          <p className="text-white/70 text-lg">{meta.desc}</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {zodiacSigns.map((sign) => {
            const name = sign.names[safeLocale] ?? sign.names.ko;
            const traits = sign.traits.positive.slice(0, 3).map((t) => t[safeLocale] ?? t.ko);
            return (
              <Link
                key={sign.id}
                href={`/${safeLocale}/zodiac/${sign.id}`}
                className={`glass-card p-6 text-center bg-gradient-to-br ${elementColor[sign.element] ?? ''} hover:scale-105 transition-transform duration-200`}
              >
                <div className="text-5xl mb-3">{sign.symbol}</div>
                <h2 className="text-white font-bold text-lg mb-1">{name}</h2>
                <div className="flex flex-wrap gap-1 justify-center mt-2">
                  {traits.map((trait) => (
                    <span key={trait} className="text-xs text-white/60 bg-white/10 px-2 py-0.5 rounded-full">
                      {trait}
                    </span>
                  ))}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
