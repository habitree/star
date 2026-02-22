/**
 * 특정 별자리 일일 운세 상세 페이지
 */

import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { generateDailyHoroscope, generateWeeklyHoroscope } from '@/lib/horoscope-generator';
import { zodiacData } from '@/data/zodiac-info';
import ScoreBar from '@/components/ui/ScoreBar';
import ShareButton from '@/components/ui/ShareButton';
import { AdSenseUnit, AdSenseInArticle } from '@/components/ads';
import { getAdSensePublisherId } from '@/lib/adsense-config';
import { getSiteUrl } from '@/lib/site-url';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import JsonLd from '@/components/seo/JsonLd';
import type { ZodiacSignId, HoroscopeCategory } from '@/types';

// 유효한 별자리 목록
const validSigns: ZodiacSignId[] = [
  'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
  'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'
];

export function generateStaticParams() {
  return validSigns.map((sign) => ({ sign }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ sign: string }>;
}): Promise<Metadata> {
  const { sign } = await params;

  if (!validSigns.includes(sign as ZodiacSignId)) {
    return { title: 'Not Found' };
  }

  const signData = zodiacData[sign as ZodiacSignId];
  const signName = signData.name;
  const baseUrl = getSiteUrl();
  const url = `${baseUrl}/horoscope/daily/${sign}`;
  const description = `${signName} 오늘의 운세. 종합운·연애운·직장운·건강운·금전운을 확인하세요.`;

  return {
    title: `${signName} 오늘의 운세`,
    description,
    openGraph: {
      title: `${signName} 오늘의 운세 - 별자리 운세`,
      description,
      url,
      type: 'website',
    },
    alternates: { canonical: url },
  };
}

// 카테고리 아이콘
const categoryIcons: Record<HoroscopeCategory, string> = {
  overall: '⭐',
  love: '❤️',
  career: '💼',
  health: '🏥',
  money: '💰',
};

const categoryLabels: Record<HoroscopeCategory, string> = {
  overall: '종합운',
  love: '연애운',
  career: '직장운',
  health: '건강운',
  money: '금전운',
};

export default async function SignDailyHoroscopePage({
  params,
}: {
  params: Promise<{ sign: string }>;
}) {
  const { sign } = await params;

  // 유효성 검사
  if (!validSigns.includes(sign as ZodiacSignId)) {
    notFound();
  }

  const signId = sign as ZodiacSignId;
  const signData = zodiacData[signId];

  // 일일 운세 생성
  const dailyHoroscope = generateDailyHoroscope(signId, new Date(), 'ko');

  // 주간 운세 (미리보기용)
  const weeklyHoroscope = generateWeeklyHoroscope(signId, new Date(), 'ko');

  // 오늘 날짜 포맷
  const today = new Date();
  const dateFormatted = new Intl.DateTimeFormat('ko', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  }).format(today);

  // 카테고리 목록
  const categories: HoroscopeCategory[] = ['overall', 'love', 'career', 'health', 'money'];

  // 다른 별자리 목록 (현재 별자리 제외)
  const otherSigns = validSigns.filter((s) => s !== signId);
  const baseUrl = getSiteUrl();
  const pageUrl = `${baseUrl}/horoscope/daily/${sign}`;

  const webPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url: pageUrl,
    name: `${signData.name} 오늘의 운세`,
    description: `${signData.name} 오늘의 운세. 종합운·연애운·직장운·건강운·금전운을 확인하세요.`,
    datePublished: today.toISOString().split('T')[0],
    dateModified: today.toISOString().split('T')[0],
    publisher: {
      '@type': 'Organization',
      name: '별자리 운세',
      url: baseUrl,
    },
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <JsonLd data={webPageJsonLd} />
      <div className="max-w-4xl mx-auto">
        <Breadcrumbs
          baseUrl={baseUrl}
          items={[
            { label: '홈', href: '/' },
            { label: '오늘의 운세', href: '/horoscope' },
            { label: signData.name, href: `/horoscope/daily/${sign}` },
          ]}
          className="mb-6"
        />
        {/* 별자리 헤더 */}
        <div className={`glass-card p-8 mb-8 text-center element-${signData.element}`}>
          <div className="text-6xl mb-4 filter drop-shadow-lg" role="img" aria-label={signData.name}>
            {signData.symbol}
          </div>
          <h1 className="text-3xl font-serif font-bold text-white mb-2">
            {signData.name}
          </h1>
          <p className="text-white/70 mb-1">{signData.dateRange}</p>
          <p className="text-white/50 text-sm">{dateFormatted}</p>
          <div className="mt-4 flex justify-center">
            <ShareButton
              title={`${signData.name} 오늘의 운세`}
              text={`${signData.name} 오늘의 운세 - ${dateFormatted}`}
              label="공유하기"
            />
          </div>
        </div>

        {/* 콘텐츠 상단 배너 광고 */}
        {getAdSensePublisherId() && (
          <div className="mb-8">
            <AdSenseUnit
              adSlot={`${getAdSensePublisherId()}/horoscope-daily-top`}
              adFormat="auto"
              responsive={true}
              className="w-full"
            />
          </div>
        )}

        {/* 행운의 요소 */}
        <div className="glass-card p-6 mb-8">
          <h2 className="text-xl font-semibold text-white mb-4 text-center">
            오늘의 행운
          </h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-white/5 rounded-lg">
              <p className="text-white/50 text-sm mb-2">행운의 숫자</p>
              <p className="text-3xl font-bold text-white">{dailyHoroscope.luckyNumber}</p>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-lg">
              <p className="text-white/50 text-sm mb-2">행운의 색상</p>
              <p className="text-xl font-semibold text-white">{dailyHoroscope.luckyColor}</p>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-lg">
              <p className="text-white/50 text-sm mb-2">행운의 시간</p>
              <p className="text-sm font-medium text-white">{dailyHoroscope.luckyTime}</p>
            </div>
          </div>
        </div>

        {/* 카테고리별 운세 */}
        <div className="space-y-6 mb-8">
          {categories.map((category, index) => {
            const categoryData = dailyHoroscope[category];
            return (
              <div key={category}>
                <div className="glass-card p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">{categoryIcons[category]}</span>
                    <h3 className="text-lg font-semibold text-white">
                      {categoryLabels[category]}
                    </h3>
                  </div>

                  {/* 점수 바 */}
                  <div className="mb-4">
                    <ScoreBar score={categoryData.score} variant="stars" showValue />
                  </div>

                  {/* 운세 텍스트 */}
                  <p className="text-white/80 leading-relaxed">
                    {categoryData.text.ko}
                  </p>
                </div>

                {/* 카테고리 사이 인-아티클 광고 (중간에 한 번만) */}
                {index === Math.floor(categories.length / 2) - 1 && getAdSensePublisherId() && (
                  <div className="my-6">
                    <AdSenseInArticle
                      adSlot={`${getAdSensePublisherId()}/horoscope-daily-in-article`}
                      className="w-full"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* 오늘의 조언 */}
        <div className="glass-card p-6 mb-8 bg-gradient-to-r from-purple-500/20 to-pink-500/20">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span>💡</span>
            오늘의 조언
          </h2>
          <p className="text-white/90 text-lg leading-relaxed">
            {dailyHoroscope.advice.ko}
          </p>
        </div>

        {/* 주간 운세 미리보기 */}
        <div className="glass-card p-6 mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">
            이번 주 운세 미리보기
          </h2>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="p-4 bg-green-500/20 rounded-lg text-center">
              <p className="text-white/50 text-sm mb-1">최고의 날</p>
              <p className="text-white font-semibold">{weeklyHoroscope.bestDay}</p>
            </div>
            <div className="p-4 bg-orange-500/20 rounded-lg text-center">
              <p className="text-white/50 text-sm mb-1">주의할 날</p>
              <p className="text-white font-semibold">{weeklyHoroscope.challengeDay}</p>
            </div>
          </div>

          <p className="text-white/80 text-sm leading-relaxed">
            {weeklyHoroscope.weekHighlight.ko}
          </p>
        </div>

        {/* 다른 별자리 */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4 text-center">
            다른 별자리 운세
          </h2>
          <div className="flex flex-wrap justify-center gap-2">
            {otherSigns.map((otherSignId) => {
              const otherSignData = zodiacData[otherSignId];
              return (
                <Link
                  key={otherSignId}
                  href={`/horoscope/daily/${otherSignId}`}
                  className={`
                    px-4 py-2 rounded-full text-sm font-medium
                    bg-white/10 hover:bg-white/20 text-white
                    transition-all duration-300 hover:scale-105
                    flex items-center gap-2
                  `}
                >
                  <span>{otherSignData.symbol}</span>
                  <span>{otherSignData.name}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* 관련 링크 (SEO·체류 강화) */}
        <section className="glass-card p-6 mb-8" aria-label="관련 콘텐츠">
          <h2 className="text-lg font-semibold text-white mb-4 text-center">
            더 알아보기
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/compatibility"
              className="px-5 py-2.5 rounded-full text-sm font-medium bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              별자리 궁합 보기
            </Link>
            <Link
              href="/birth-chart"
              className="px-5 py-2.5 rounded-full text-sm font-medium bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              출생 차트
            </Link>
            <Link
              href="/horoscope"
              className="px-5 py-2.5 rounded-full text-sm font-medium bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              오늘의 운세 메인
            </Link>
          </div>
        </section>

        {/* 콘텐츠 하단 배너 광고 */}
        {getAdSensePublisherId() && (
          <div className="mb-8">
            <AdSenseUnit
              adSlot={`${getAdSensePublisherId()}/horoscope-daily-bottom`}
              adFormat="auto"
              responsive={true}
              className="w-full"
            />
          </div>
        )}

        {/* 네비게이션 */}
        <div className="flex justify-center gap-4">
          <Link
            href="/horoscope/daily"
            className="px-6 py-3 bg-white/10 hover:bg-white/20
                       text-white font-medium rounded-full transition-colors duration-300"
          >
            목록으로
          </Link>
          <Link
            href="/horoscope"
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500
                       text-white font-semibold rounded-full hover:opacity-90
                       transition-opacity duration-300"
          >
            운세 메인
          </Link>
        </div>
      </div>
    </div>
  );
}
