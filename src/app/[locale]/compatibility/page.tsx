/**
 * [locale]/compatibility - 다국어 궁합 페이지
 */

import { Metadata } from 'next';
import CompatibilityForm from '@/components/compatibility/CompatibilityForm';
import { AdSenseUnit } from '@/components/ads';
import { isAdSenseEnabled } from '@/lib/adsense-config';
import { getSiteUrl } from '@/lib/site-url';
import { locales, type Locale } from '@/i18n/config';

const pageMeta: Record<Locale, { title: string; desc: string }> = {
  ko: { title: '별자리 궁합', desc: '두 별자리의 궁합을 확인해보세요. 연애, 우정, 업무 궁합을 분석합니다.' },
  en: { title: 'Zodiac Compatibility', desc: 'Check the compatibility between two zodiac signs. Love, friendship, and work compatibility.' },
  zh: { title: '星座配对', desc: '查看两个星座的配对。分析爱情、友情和工作配对。' },
  ja: { title: '星座相性', desc: '2つの星座の相性をチェック。恋愛、友情、仕事の相性を分析。' },
  es: { title: 'Compatibilidad Zodiacal', desc: 'Consulta la compatibilidad entre dos signos. Amor, amistad y trabajo.' },
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
  const url = `${baseUrl}/${safeLocale}/compatibility`;

  return {
    title: meta.title,
    description: meta.desc,
    openGraph: { title: meta.title, description: meta.desc, url, type: 'website' },
    alternates: {
      canonical: url,
      languages: Object.fromEntries(locales.map((loc) => [loc, `${baseUrl}/${loc}/compatibility`])),
    },
  };
}

export default async function LocaleCompatibilityPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const safeLocale = locales.includes(locale as Locale) ? (locale as Locale) : 'ko';
  const meta = pageMeta[safeLocale];

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {meta.title}
          </h1>
          <p className="text-white/70 text-lg">{meta.desc}</p>
        </div>

        <CompatibilityForm />

        {isAdSenseEnabled() && (
          <div className="mt-8">
            <AdSenseUnit adFormat="auto" responsive={true} className="w-full" />
          </div>
        )}
      </div>
    </div>
  );
}
