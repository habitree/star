/**
 * [locale]/horoscope/daily/[sign] - 다국어 일일 운세 상세 페이지
 */

import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  generateDailyHoroscope,
  generateWeeklyHoroscope,
  generateExtendedLuckyElements,
  generateDailyAffirmation,
  generateTimeFortune,
  generateDailyTarot,
  generateCompatibilityHighlight,
  setTemplateData,
} from '@/lib/horoscope-generator';
import { loadTemplates } from '@/lib/template-loader';
import { zodiacData } from '@/data/zodiac-info';
import { zodiacSigns } from '@/data/zodiac-signs';
import ScoreBar from '@/components/ui/ScoreBar';
import ShareButton from '@/components/ui/ShareButton';
import { AdSenseUnit, AdSenseInArticle } from '@/components/ads';
import { isAdSenseEnabled } from '@/lib/adsense-config';
import { getSiteUrl } from '@/lib/site-url';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import JsonLd from '@/components/seo/JsonLd';
import HoroscopeSummary from '@/components/seo/HoroscopeSummary';
import FAQSection from '@/components/seo/FAQSection';
import { locales, type Locale } from '@/i18n/config';
import { buildLanguageAlternates } from '@/lib/seo-utils';
import { getDailyHoroscopeFAQs } from '@/data/faq-data';
import type { ZodiacSignId, HoroscopeCategory, DetailedCategoryHoroscope } from '@/types';

const validSigns: ZodiacSignId[] = [
  'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
  'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces',
];

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    validSigns.map((sign) => ({ locale, sign }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; sign: string }>;
}): Promise<Metadata> {
  const { locale, sign } = await params;

  if (!validSigns.includes(sign as ZodiacSignId)) {
    return { title: 'Not Found' };
  }

  const signData = zodiacData[sign as ZodiacSignId];
  const signMeta = zodiacSigns.find((s) => s.id === sign);
  const signName = signMeta?.names[locale as Locale] ?? signMeta?.names.ko ?? signData.name;
  const baseUrl = getSiteUrl();
  const url = `${baseUrl}/${locale}/horoscope/daily/${sign}`;

  const descriptions: Record<Locale, string> = {
    ko: `${signName} 오늘의 운세. 종합운·연애운·직장운·건강운·금전운과 타로, 시간대별 운세를 확인하세요.`,
    en: `${signName} daily horoscope. Check overall, love, career, health, money fortune and tarot reading.`,
    zh: `${signName}今日运势。查看综合运、爱情运、事业运、健康运、财运和塔罗牌解读。`,
    ja: `${signName}の今日の運勢。総合運・恋愛運・仕事運・健康運・金運とタロット占いをチェック。`,
    es: `Horoscopo diario de ${signName}. Consulta fortuna general, amor, trabajo, salud, dinero y tarot.`,
  };

  const description = descriptions[locale as Locale] ?? descriptions.ko;

  const today = new Date();

  return {
    title: `${signName} ${locale === 'ko' ? '오늘의 운세' : 'Daily Horoscope'}`,
    description,
    openGraph: {
      title: `${signName} Daily Horoscope`,
      description,
      url,
      type: 'article',
      publishedTime: today.toISOString(),
      modifiedTime: today.toISOString(),
      images: [{ url: `/og/signs/${sign}.jpg`, width: 1200, height: 630, alt: `${signName} Daily Horoscope` }],
    },
    twitter: {
      card: 'summary_large_image' as const,
      title: `${signName} Daily Horoscope`,
      description,
      images: [`/og/signs/${sign}.jpg`],
    },
    alternates: {
      canonical: url,
      languages: buildLanguageAlternates(baseUrl, `/horoscope/daily/${sign}`),
    },
  };
}

const categoryIcons: Record<HoroscopeCategory, string> = {
  overall: '⭐', love: '❤️', career: '💼', health: '🏥', money: '💰',
};

const categoryLabels: Record<Locale, Record<HoroscopeCategory, string>> = {
  ko: { overall: '종합운', love: '연애운', career: '직장운', health: '건강운', money: '금전운' },
  en: { overall: 'Overall', love: 'Love', career: 'Career', health: 'Health', money: 'Money' },
  zh: { overall: '综合运', love: '爱情运', career: '事业运', health: '健康运', money: '财运' },
  ja: { overall: '総合運', love: '恋愛運', career: '仕事運', health: '健康運', money: '金運' },
  es: { overall: 'General', love: 'Amor', career: 'Trabajo', health: 'Salud', money: 'Dinero' },
};

export default async function LocaleSignDailyHoroscopePage({
  params,
}: {
  params: Promise<{ locale: string; sign: string }>;
}) {
  const { locale, sign } = await params;

  if (!validSigns.includes(sign as ZodiacSignId)) {
    notFound();
  }

  const safeLocale = locales.includes(locale as Locale) ? (locale as Locale) : 'ko';
  const signId = sign as ZodiacSignId;
  const signData = zodiacData[signId];
  const signMeta = zodiacSigns.find((s) => s.id === signId);
  const signName = signMeta?.names[safeLocale] ?? signMeta?.names.ko ?? signData.name;

  // 템플릿 데이터 초기화 (Supabase 미설정 시 generic 템플릿 폴백)
  setTemplateData(await loadTemplates());

  const today = new Date();
  const dailyHoroscope = generateDailyHoroscope(signId, today, safeLocale);
  const weeklyHoroscope = generateWeeklyHoroscope(signId, today, safeLocale);
  const extendedLucky = generateExtendedLuckyElements(signId, today);
  const affirmation = generateDailyAffirmation(signId, today);
  const timeFortunes = generateTimeFortune(signId, today);
  const tarot = generateDailyTarot(signId, today);
  const compatHighlight = generateCompatibilityHighlight(signId, today);
  const bestMatchInfo = zodiacData[compatHighlight.bestMatch];

  const dateFormatted = new Intl.DateTimeFormat(
    safeLocale === 'zh' ? 'zh-CN' : safeLocale === 'ja' ? 'ja-JP' : safeLocale === 'es' ? 'es-ES' : safeLocale === 'en' ? 'en-US' : 'ko-KR',
    { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' }
  ).format(today);

  const categories: HoroscopeCategory[] = ['overall', 'love', 'career', 'health', 'money'];
  const otherSigns = validSigns.filter((s) => s !== signId);
  const baseUrl = getSiteUrl();
  const pageUrl = `${baseUrl}/${safeLocale}/horoscope/daily/${sign}`;

  const labels = categoryLabels[safeLocale] ?? categoryLabels.ko;

  const webPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url: pageUrl,
    name: `${signName} Daily Horoscope`,
    datePublished: today.toISOString().split('T')[0],
    dateModified: today.toISOString().split('T')[0],
  };

  const newsArticleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: `${signName} ${safeLocale === 'ko' ? '오늘의 운세' : 'Daily Horoscope'} - ${dateFormatted}`,
    datePublished: today.toISOString(),
    dateModified: today.toISOString(),
    author: { '@type': 'Organization', name: 'LuckyToday', url: baseUrl },
    publisher: {
      '@type': 'Organization',
      name: 'LuckyToday',
      url: baseUrl,
      logo: { '@type': 'ImageObject', url: `${baseUrl}/og/default.jpg` },
    },
    about: {
      '@type': 'Thing',
      name: signName,
      sameAs: `https://en.wikipedia.org/wiki/${sign.charAt(0).toUpperCase() + sign.slice(1)}_(astrology)`,
    },
    inLanguage: safeLocale,
    url: pageUrl,
    image: `${baseUrl}/og/signs/${sign}.jpg`,
  };

  const speakableJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url: pageUrl,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['#horoscope-daily-summary', '#page-affirmation'],
    },
  };

  // FAQ 데이터 생성
  const signNameByLocale = {
    ko: signMeta?.names.ko ?? signData.name,
    en: signMeta?.names.en ?? signData.name,
    zh: signMeta?.names.zh ?? signData.name,
    ja: signMeta?.names.ja ?? signData.name,
    es: signMeta?.names.es ?? signData.name,
  };
  const faqItems = getDailyHoroscopeFAQs(
    signNameByLocale,
    dateFormatted,
    signData.dateRange,
    extendedLucky.number,
    extendedLucky.color,
  ).map((item) => ({
    question: item.question[safeLocale] ?? item.question.en,
    answer: item.answer[safeLocale] ?? item.answer.en,
  }));

  const faqTitles: Record<Locale, string> = {
    ko: '자주 묻는 질문',
    en: 'Frequently Asked Questions',
    zh: '常见问题',
    ja: 'よくある質問',
    es: 'Preguntas Frecuentes',
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <JsonLd data={webPageJsonLd} />
      <JsonLd data={newsArticleJsonLd} />
      <JsonLd data={speakableJsonLd} />
      <div className="max-w-4xl mx-auto">
        <Breadcrumbs
          baseUrl={baseUrl}
          items={[
            { label: safeLocale === 'ko' ? '홈' : 'Home', href: `/${safeLocale}` },
            { label: safeLocale === 'ko' ? '오늘의 운세' : 'Horoscope', href: `/${safeLocale}/horoscope` },
            { label: signName, href: `/${safeLocale}/horoscope/daily/${sign}` },
          ]}
          className="mb-6"
        />

        {/* GEO 요약 블록 — SpeakableSpec #horoscope-daily-summary */}
        <HoroscopeSummary
          signName={signName}
          signSymbol={signData.symbol}
          dateFormatted={dateFormatted}
          isoDate={today.toISOString().split('T')[0]}
          overallText={(() => {
            const overall = dailyHoroscope.overall as DetailedCategoryHoroscope;
            return overall.text[safeLocale] ?? overall.text.ko;
          })()}
          scores={{
            overall: (dailyHoroscope.overall as DetailedCategoryHoroscope).score,
            love: (dailyHoroscope.love as DetailedCategoryHoroscope).score,
            career: (dailyHoroscope.career as DetailedCategoryHoroscope).score,
            health: (dailyHoroscope.health as DetailedCategoryHoroscope).score,
            money: (dailyHoroscope.money as DetailedCategoryHoroscope).score,
          }}
          locale={safeLocale}
        />

        {/* 별자리 헤더 */}
        <div className={`glass-card p-8 mb-8 text-center element-${signData.element}`}>
          <div className={`text-6xl mb-4 filter drop-shadow-lg glow-${signData.element}`} role="img" aria-label={signName}>
            {signData.symbol}
          </div>
          <h1 className="text-3xl font-serif font-bold text-white mb-2">{signName}</h1>
          <p className="text-white/70 mb-1">{signData.dateRange}</p>
          <p className="text-white/50 text-sm">{dateFormatted}</p>
          <div className="mt-4 flex justify-center">
            <ShareButton
              title={`${signName} Daily Horoscope`}
              text={`${signName} - ${dateFormatted}`}
              label={safeLocale === 'ko' ? '공유하기' : 'Share'}
            />
          </div>
        </div>

        {/* 오늘의 확언 */}
        <div id="page-affirmation" className="glass-card p-5 mb-8 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-amber-500/20">
          <p className="text-center text-white/90 leading-relaxed italic">
            &ldquo;{affirmation}&rdquo;
          </p>
        </div>

        {/* 배너 광고 */}
        {isAdSenseEnabled() && (
          <div className="mb-8">
            <AdSenseUnit adFormat="auto" responsive={true} className="w-full" />
          </div>
        )}

        {/* 확장 행운의 요소 */}
        <div className="glass-card p-6 mb-8">
          <h2 className="text-xl font-semibold text-white mb-4 text-center">
            {safeLocale === 'ko' ? '오늘의 행운' : safeLocale === 'en' ? "Today's Lucky Elements" : safeLocale === 'zh' ? '今日幸运' : safeLocale === 'ja' ? '今日のラッキー' : 'Elementos de Suerte'}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-white/5 rounded-lg">
              <p className="text-white/50 text-sm mb-2">🔢 {safeLocale === 'ko' ? '행운의 숫자' : 'Lucky Number'}</p>
              <p className="text-3xl font-bold text-white">{extendedLucky.number}</p>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-lg">
              <p className="text-white/50 text-sm mb-2">🎨 {safeLocale === 'ko' ? '행운의 색상' : 'Lucky Color'}</p>
              <p className="text-xl font-semibold text-white">{extendedLucky.color}</p>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-lg">
              <p className="text-white/50 text-sm mb-2">⏰ {safeLocale === 'ko' ? '행운의 시간' : 'Lucky Time'}</p>
              <p className="text-sm font-medium text-white">{extendedLucky.time}</p>
            </div>
          </div>
        </div>

        {/* 카테고리별 운세 */}
        <div className="space-y-6 mb-8">
          {categories.map((category, index) => {
            const categoryData = dailyHoroscope[category] as DetailedCategoryHoroscope;
            const dScore = categoryData.detailedScore;
            const text = categoryData.text[safeLocale] ?? categoryData.text.ko;
            return (
              <div key={category}>
                <div className="glass-card p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">{categoryIcons[category]}</span>
                    <h3 className="text-lg font-semibold text-white">{labels[category]}</h3>
                    {dScore != null && (
                      <span className="text-sm font-bold text-white/60 ml-auto tabular-nums">{dScore}점</span>
                    )}
                  </div>
                  <div className="mb-4">
                    <ScoreBar
                      score={categoryData.score}
                      variant="detailed"
                      showValue
                      detailedScore={dScore}
                      subIndicators={categoryData.subIndicators}
                    />
                  </div>
                  <p className="text-white/80 leading-relaxed">{text}</p>
                </div>
                {index === Math.floor(categories.length / 2) - 1 && isAdSenseEnabled() && (
                  <div className="my-6">
                    <AdSenseInArticle className="w-full" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* 오늘의 타로 */}
        <div className="glass-card p-6 mb-8">
          <h2 className="text-xl font-semibold text-white mb-4 text-center">
            {safeLocale === 'ko' ? '오늘의 타로 카드' : "Today's Tarot Card"}
          </h2>
          <div className="text-center">
            <div className="inline-block p-4 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-600/20 border border-amber-400/30 mb-3">
              <span className="text-4xl">{tarot.symbol}</span>
              <p className="text-white font-semibold mt-1">{tarot.name}</p>
              {tarot.isReversed && <span className="text-xs text-amber-300">{safeLocale === 'ko' ? '역방향' : 'Reversed'}</span>}
            </div>
            <p className="text-white/85 text-sm leading-relaxed mb-2">{tarot.meaning}</p>
            <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20 inline-block">
              <p className="text-sm text-purple-300 font-medium">💡 {tarot.advice}</p>
            </div>
          </div>
        </div>

        {/* 맞춤 운세 CTA */}
        <div className="glass-card p-6 mb-8 text-center bg-gradient-to-r from-indigo-500/10 to-purple-500/10">
          <h2 className="text-lg font-semibold text-white mb-2">
            {safeLocale === 'ko' ? '바이오리듬과 더 많은 운세 보기' : 'See More - Biorhythm & Full Horoscope'}
          </h2>
          <Link
            href={`/${safeLocale}/horoscope`}
            className="inline-block px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full hover:opacity-90 transition-opacity duration-300 shadow-lg"
          >
            {safeLocale === 'ko' ? '맞춤 운세 대시보드 가기' : 'Go to My Horoscope Dashboard'}
          </Link>
        </div>

        {/* 다른 별자리 */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4 text-center">
            {safeLocale === 'ko' ? '다른 별자리 운세' : 'Other Signs'}
          </h2>
          <div className="flex flex-wrap justify-center gap-2">
            {otherSigns.map((otherSignId) => {
              const otherSignData = zodiacData[otherSignId];
              const otherSignMeta = zodiacSigns.find((s) => s.id === otherSignId);
              const otherName = otherSignMeta?.names[safeLocale] ?? otherSignMeta?.names.ko ?? otherSignData.name;
              return (
                <Link
                  key={otherSignId}
                  href={`/${safeLocale}/horoscope/daily/${otherSignId}`}
                  className="px-4 py-2 rounded-full text-sm font-medium bg-white/10 hover:bg-white/20 text-white transition-all duration-300 hover:scale-105 flex items-center gap-2"
                >
                  <span>{otherSignData.symbol}</span>
                  <span>{otherName}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* FAQ — GEO 최적화 */}
        <FAQSection
          items={faqItems}
          title={faqTitles[safeLocale]}
          pageUrl={pageUrl}
        />

        {/* 관련 링크 */}
        <section className="glass-card p-6 mb-8" aria-label="Related content">
          <div className="flex flex-wrap justify-center gap-4">
            <Link href={`/${safeLocale}/compatibility`} className="px-5 py-2.5 rounded-full text-sm font-medium bg-white/10 hover:bg-white/20 text-white transition-colors">
              {safeLocale === 'ko' ? '별자리 궁합 보기' : 'Compatibility'}
            </Link>
            <Link href={`/${safeLocale}/birth-chart`} className="px-5 py-2.5 rounded-full text-sm font-medium bg-white/10 hover:bg-white/20 text-white transition-colors">
              {safeLocale === 'ko' ? '출생 차트' : 'Birth Chart'}
            </Link>
            <Link href={`/${safeLocale}/horoscope`} className="px-5 py-2.5 rounded-full text-sm font-medium bg-white/10 hover:bg-white/20 text-white transition-colors">
              {safeLocale === 'ko' ? '오늘의 운세 메인' : 'Horoscope Home'}
            </Link>
          </div>
        </section>

        {/* 하단 배너 광고 */}
        {isAdSenseEnabled() && (
          <div className="mb-8">
            <AdSenseUnit adFormat="auto" responsive={true} className="w-full" />
          </div>
        )}

        <div className="flex justify-center gap-4">
          <Link
            href={`/${safeLocale}/horoscope/daily`}
            className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-full transition-colors duration-300"
          >
            {safeLocale === 'ko' ? '목록으로' : 'All Signs'}
          </Link>
          <Link
            href={`/${safeLocale}/horoscope`}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full hover:opacity-90 transition-opacity duration-300"
          >
            {safeLocale === 'ko' ? '운세 메인' : 'Horoscope'}
          </Link>
        </div>
      </div>
    </div>
  );
}
