/**
 * [locale]/birth-chart - 다국어 출생 차트 페이지
 */

import { Metadata } from 'next';
import { getSiteUrl } from '@/lib/site-url';
import { locales, type Locale } from '@/i18n/config';
import BirthChartPageContent from './BirthChartPageContent';

const pageMeta: Record<Locale, { title: string; desc: string }> = {
  ko: { title: '출생 차트', desc: '생년월일과 출생 시간으로 나만의 Big Three(태양, 달, 상승궁)를 알아보세요.' },
  en: { title: 'Birth Chart', desc: 'Enter your birth date and time to discover your Big Three (Sun, Moon, Rising signs).' },
  zh: { title: '出生图', desc: '输入生日和出生时间，了解您的三巨头（太阳、月亮、上升星座）。' },
  ja: { title: '出生図', desc: '生年月日と出生時刻を入力して、ビッグスリー（太陽・月・上昇星座）を調べましょう。' },
  es: { title: 'Carta Natal', desc: 'Ingresa tu fecha y hora de nacimiento para descubrir tu Gran Trio (Sol, Luna, Ascendente).' },
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
  const url = `${baseUrl}/${safeLocale}/birth-chart`;

  return {
    title: meta.title,
    description: meta.desc,
    openGraph: { title: meta.title, description: meta.desc, url, type: 'website' },
    alternates: {
      canonical: url,
      languages: Object.fromEntries(locales.map((loc) => [loc, `${baseUrl}/${loc}/birth-chart`])),
    },
  };
}

export default function LocaleBirthChartPage() {
  return <BirthChartPageContent />;
}
