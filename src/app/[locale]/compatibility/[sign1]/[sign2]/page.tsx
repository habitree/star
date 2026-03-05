import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import CompatibilityResult from '@/components/compatibility/CompatibilityResult';
import { buildCompatibilityResult, zodiacKoNames } from '@/lib/compatibility-builder';
import { isValidZodiacSign, ZODIAC_ORDER } from '@/lib/zodiac-utils';
import { AdSenseUnit } from '@/components/ads';
import AffiliateBanner from '@/components/ads/AffiliateBanner';
import { isAdSenseEnabled } from '@/lib/adsense-config';
import { locales, type Locale } from '@/i18n/config';
import { buildLanguageAlternates } from '@/lib/seo-utils';
import { getSiteUrl } from '@/lib/site-url';
import FAQSection from '@/components/seo/FAQSection';
import { getCompatibilityFAQs } from '@/data/faq-data';
import type { ZodiacSignId } from '@/types';

const signNamesByLocale: Record<Locale, Record<string, string>> = {
  ko: { aries: '양자리', taurus: '황소자리', gemini: '쌍둥이자리', cancer: '게자리', leo: '사자자리', virgo: '처녀자리', libra: '천칭자리', scorpio: '전갈자리', sagittarius: '사수자리', capricorn: '염소자리', aquarius: '물병자리', pisces: '물고기자리' },
  en: { aries: 'Aries', taurus: 'Taurus', gemini: 'Gemini', cancer: 'Cancer', leo: 'Leo', virgo: 'Virgo', libra: 'Libra', scorpio: 'Scorpio', sagittarius: 'Sagittarius', capricorn: 'Capricorn', aquarius: 'Aquarius', pisces: 'Pisces' },
  zh: { aries: '白羊座', taurus: '金牛座', gemini: '双子座', cancer: '巨蟹座', leo: '狮子座', virgo: '处女座', libra: '天秤座', scorpio: '天蝎座', sagittarius: '射手座', capricorn: '摩羯座', aquarius: '水瓶座', pisces: '双鱼座' },
  ja: { aries: '牡羊座', taurus: '牡牛座', gemini: '双子座', cancer: '蟹座', leo: '獅子座', virgo: '乙女座', libra: '天秤座', scorpio: '蠍座', sagittarius: '射手座', capricorn: '山羊座', aquarius: '水瓶座', pisces: '魚座' },
  es: { aries: 'Aries', taurus: 'Tauro', gemini: 'Géminis', cancer: 'Cáncer', leo: 'Leo', virgo: 'Virgo', libra: 'Libra', scorpio: 'Escorpio', sagittarius: 'Sagitario', capricorn: 'Capricornio', aquarius: 'Acuario', pisces: 'Piscis' },
};

const metaTitles: Record<Locale, (n1: string, n2: string) => string> = {
  ko: (n1, n2) => `${n1} ♥ ${n2} 궁합`,
  en: (n1, n2) => `${n1} ♥ ${n2} Compatibility`,
  zh: (n1, n2) => `${n1} ♥ ${n2} 配对`,
  ja: (n1, n2) => `${n1} ♥ ${n2} 相性`,
  es: (n1, n2) => `Compatibilidad ${n1} ♥ ${n2}`,
};

const metaDescriptions: Record<Locale, (n1: string, n2: string) => string> = {
  ko: (n1, n2) => `${n1}와 ${n2}의 궁합을 분석합니다. 연애·우정·직장 궁합 점수와 상세 해석을 확인하세요.`,
  en: (n1, n2) => `Discover ${n1} and ${n2} compatibility. Love, friendship, and work compatibility scores with detailed insights.`,
  zh: (n1, n2) => `分析${n1}和${n2}的配对。查看爱情、友情和工作配对分数及详细解读。`,
  ja: (n1, n2) => `${n1}と${n2}の相性を分析。恋愛・友情・仕事の相性スコアと詳細な解説を確認。`,
  es: (n1, n2) => `Analiza la compatibilidad de ${n1} y ${n2}. Puntuaciones de amor, amistad y trabajo con detalles.`,
};

const questionH2s: Record<Locale, (n1: string, n2: string) => string> = {
  ko: (n1, n2) => `${n1}와 ${n2}의 궁합은 몇 점?`,
  en: (n1, n2) => `What is the compatibility score for ${n1} and ${n2}?`,
  zh: (n1, n2) => `${n1}和${n2}的配对分数是多少？`,
  ja: (n1, n2) => `${n1}と${n2}の相性は何点？`,
  es: (n1, n2) => `¿Cuál es la puntuación de compatibilidad de ${n1} y ${n2}?`,
};

const faqTitles: Record<Locale, string> = {
  ko: '자주 묻는 질문',
  en: 'Frequently Asked Questions',
  zh: '常见问题',
  ja: 'よくある質問',
  es: 'Preguntas Frecuentes',
};

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    ZODIAC_ORDER.flatMap((sign1) =>
      ZODIAC_ORDER.filter((s) => s !== sign1).map((sign2) => ({ locale, sign1, sign2 }))
    )
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; sign1: string; sign2: string }>;
}): Promise<Metadata> {
  const { locale, sign1, sign2 } = await params;
  const safeLocale = locales.includes(locale as Locale) ? (locale as Locale) : 'ko';
  const names = signNamesByLocale[safeLocale];
  const name1 = names[sign1] || zodiacKoNames[sign1] || sign1;
  const name2 = names[sign2] || zodiacKoNames[sign2] || sign2;
  const baseUrl = getSiteUrl();
  const url = `${baseUrl}/${safeLocale}/compatibility/${sign1}/${sign2}`;
  const title = metaTitles[safeLocale](name1, name2);
  const description = metaDescriptions[safeLocale](name1, name2);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      images: [{ url: '/og/default.jpg', width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og/default.jpg'],
    },
    alternates: {
      canonical: url,
      languages: buildLanguageAlternates(baseUrl, `/compatibility/${sign1}/${sign2}`),
    },
  };
}

export default async function LocaleCompatibilityResultPage({
  params,
}: {
  params: Promise<{ locale: string; sign1: string; sign2: string }>;
}) {
  const { locale, sign1, sign2 } = await params;

  if (!isValidZodiacSign(sign1) || !isValidZodiacSign(sign2)) notFound();

  const safeLocale = locales.includes(locale as Locale) ? (locale as Locale) : 'ko';
  const result = buildCompatibilityResult(sign1 as ZodiacSignId, sign2 as ZodiacSignId);
  if (!result) notFound();

  const names = signNamesByLocale[safeLocale];
  const name1 = names[sign1] || zodiacKoNames[sign1] || sign1;
  const name2 = names[sign2] || zodiacKoNames[sign2] || sign2;
  const baseUrl = getSiteUrl();
  const pageUrl = `${baseUrl}/${safeLocale}/compatibility/${sign1}/${sign2}`;

  // 궁합 점수 (love score from categories)
  const loveScore = result.categories.love?.score ?? 0;

  // 질문형 H2
  const h2Text = questionH2s[safeLocale](name1, name2);

  // GEO 요약 텍스트
  const summaryByLocale: Record<Locale, string> = {
    ko: `${name1}와 ${name2}의 종합 궁합 점수는 ${result.overallScore}점입니다. 연애 ${loveScore}점, 우정 ${result.categories.friendship?.score ?? 0}점, 직장 ${result.categories.work?.score ?? 0}점으로 분석됩니다.`,
    en: `${name1} and ${name2} have an overall compatibility score of ${result.overallScore}. Love: ${loveScore}, Friendship: ${result.categories.friendship?.score ?? 0}, Work: ${result.categories.work?.score ?? 0}.`,
    zh: `${name1}和${name2}的综合配对分数为${result.overallScore}分。爱情${loveScore}分，友情${result.categories.friendship?.score ?? 0}分，工作${result.categories.work?.score ?? 0}分。`,
    ja: `${name1}と${name2}の総合相性スコアは${result.overallScore}点です。恋愛${loveScore}点、友情${result.categories.friendship?.score ?? 0}点、仕事${result.categories.work?.score ?? 0}点。`,
    es: `La puntuación de compatibilidad general de ${name1} y ${name2} es ${result.overallScore}. Amor: ${loveScore}, Amistad: ${result.categories.friendship?.score ?? 0}, Trabajo: ${result.categories.work?.score ?? 0}.`,
  };

  // FAQ 생성
  const name1ByLocale = Object.fromEntries(
    locales.map((loc) => [loc, signNamesByLocale[loc][sign1] || name1])
  ) as Record<Locale, string>;
  const name2ByLocale = Object.fromEntries(
    locales.map((loc) => [loc, signNamesByLocale[loc][sign2] || name2])
  ) as Record<Locale, string>;

  const faqItems = getCompatibilityFAQs(name1ByLocale, name2ByLocale, result.overallScore, loveScore)
    .map((item) => ({
      question: item.question[safeLocale] ?? item.question.en,
      answer: item.answer[safeLocale] ?? item.answer.en,
    }));

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* GEO 요약 블록 — 서버 렌더링, AI 인용 최적화 */}
        <div id="compatibility-summary" className="glass-card p-6 mb-8">
          {/* 질문형 H2 — SEO */}
          <h2 className="sr-only">{h2Text}</h2>
          <p className="text-white/80 leading-relaxed text-sm">
            {summaryByLocale[safeLocale]}
          </p>
        </div>

        <CompatibilityResult result={result} />

        {/* 결과 중간 광고 */}
        {isAdSenseEnabled() && (
          <div className="my-6">
            <AdSenseUnit adFormat="auto" responsive={true} className="w-full" />
          </div>
        )}

        {/* 어필리에이트 배너 — LifeReader (궁합 관련) */}
        <AffiliateBanner program="lifereader" locale={safeLocale} className="my-6" />

        {/* FAQ — GEO 최적화 */}
        <FAQSection
          items={faqItems}
          title={faqTitles[safeLocale]}
          pageUrl={pageUrl}
        />
      </div>

      {isAdSenseEnabled() && (
        <div className="mt-8 max-w-4xl mx-auto">
          <AdSenseUnit adFormat="auto" responsive={true} className="w-full" />
        </div>
      )}
    </div>
  );
}
