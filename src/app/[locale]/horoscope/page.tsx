/**
 * 운세 메인 페이지
 * 12별자리 선택 그리드 + 오늘의 운세 순위 TOP 3
 */

import { Metadata } from 'next';
import Link from 'next/link';
import { setRequestLocale } from 'next-intl/server';
import { locales, type Locale } from '@/i18n/config';

export const runtime = 'edge';
import { getTodayTopSigns, generateDailyHoroscope } from '@/lib/horoscope-generator';
import { zodiacData } from '@/data/zodiac-info';
import type { ZodiacSignId } from '@/types';

// 페이지 제목 다국어
const pageTitles: Record<Locale, string> = {
  ko: '오늘의 운세',
  en: "Today's Horoscope",
  zh: '今日运势',
  ja: '今日の運勢',
  es: 'Horóscopo de Hoy',
};

const pageDescriptions: Record<Locale, string> = {
  ko: '12별자리의 오늘 운세를 확인하세요. 매일 업데이트되는 정확한 운세 정보를 제공합니다.',
  en: "Check today's horoscope for all 12 zodiac signs. Get accurate daily horoscope updates.",
  zh: '查看12星座的今日运势。每日更新准确的运势信息。',
  ja: '12星座の今日の運勢をチェック。毎日更新される正確な占い情報をお届けします。',
  es: 'Consulta el horóscopo de hoy para los 12 signos zodiacales. Actualizaciones precisas diarias.',
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: pageTitles[locale],
    description: pageDescriptions[locale],
  };
}

// UI 텍스트 다국어
const uiTexts = {
  todayRanking: {
    ko: '오늘의 운세 순위',
    en: "Today's Fortune Ranking",
    zh: '今日运势排行',
    ja: '今日の運勢ランキング',
    es: 'Ranking de Fortuna de Hoy',
  },
  top3: {
    ko: 'TOP 3',
    en: 'TOP 3',
    zh: 'TOP 3',
    ja: 'TOP 3',
    es: 'TOP 3',
  },
  selectSign: {
    ko: '별자리를 선택하세요',
    en: 'Select Your Sign',
    zh: '选择你的星座',
    ja: '星座を選んでください',
    es: 'Selecciona Tu Signo',
  },
  viewDaily: {
    ko: '일일 운세 보기',
    en: 'View Daily Horoscope',
    zh: '查看每日运势',
    ja: '毎日の運勢を見る',
    es: 'Ver Horóscopo Diario',
  },
  overallScore: {
    ko: '종합 점수',
    en: 'Overall Score',
    zh: '综合分数',
    ja: '総合スコア',
    es: 'Puntuación General',
  },
};

// 순위 메달 이모지
const rankMedals = ['1st', '2nd', '3rd'];

export default async function HoroscopePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  // 오늘의 TOP 3 가져오기
  const topSigns = getTodayTopSigns(new Date(), 3);

  // TOP 3 별자리의 상세 운세 가져오기
  const topHoroscopes = topSigns.map((item) => ({
    ...item,
    horoscope: generateDailyHoroscope(item.signId, new Date(), locale),
    signData: zodiacData[item.signId],
  }));

  // 모든 별자리 목록
  const allSigns: ZodiacSignId[] = [
    'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
    'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* 페이지 제목 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-bold text-white mb-4">
            {pageTitles[locale]}
          </h1>
          <p className="text-white/70 text-lg">
            {pageDescriptions[locale]}
          </p>
        </div>

        {/* 오늘의 운세 순위 TOP 3 */}
        <section className="mb-16">
          <h2 className="text-2xl font-serif font-semibold text-white mb-6 text-center">
            {uiTexts.todayRanking[locale]} {uiTexts.top3[locale]}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topHoroscopes.map((item, index) => (
              <Link
                key={item.signId}
                href={`/${locale}/horoscope/daily/${item.signId}`}
                className="block"
              >
                <div
                  className={`
                    glass-card p-6 text-center relative overflow-hidden
                    hover:scale-105 transition-transform duration-300
                    element-${item.signData.element}
                    ${index === 0 ? 'ring-2 ring-yellow-400/50' : ''}
                  `}
                >
                  {/* 순위 배지 */}
                  <div className={`
                    absolute top-3 left-3 w-8 h-8 rounded-full flex items-center justify-center
                    text-sm font-bold
                    ${index === 0 ? 'bg-yellow-400 text-yellow-900' : ''}
                    ${index === 1 ? 'bg-gray-300 text-gray-700' : ''}
                    ${index === 2 ? 'bg-amber-600 text-amber-100' : ''}
                  `}>
                    {index + 1}
                  </div>

                  {/* 별자리 심볼 */}
                  <div className="text-5xl mb-3 filter drop-shadow-lg">
                    {item.signData.symbol}
                  </div>

                  {/* 별자리 이름 */}
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {item.signData.names[locale]}
                  </h3>

                  {/* 종합 점수 */}
                  <div className="mb-3">
                    <span className="text-white/60 text-sm">
                      {uiTexts.overallScore[locale]}
                    </span>
                    <div className="flex justify-center gap-1 mt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          className={`text-lg ${
                            star <= item.horoscope.overall.score
                              ? 'star-filled'
                              : 'star-empty'
                          }`}
                        >
                          &#x2605;
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* 총점 */}
                  <div className="text-3xl font-bold text-white">
                    {item.score}
                    <span className="text-base font-normal text-white/50">/25</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 별자리 선택 그리드 */}
        <section>
          <h2 className="text-2xl font-serif font-semibold text-white mb-6 text-center">
            {uiTexts.selectSign[locale]}
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {allSigns.map((signId) => {
              const signData = zodiacData[signId];
              return (
                <Link
                  key={signId}
                  href={`/${locale}/horoscope/daily/${signId}`}
                  className="block"
                >
                  <div
                    className={`
                      glass-card-hover p-4 text-center
                      element-${signData.element}
                      cursor-pointer group
                    `}
                  >
                    <span
                      className={`
                        text-3xl mb-2 block
                        group-hover:scale-110 transition-transform duration-300
                        filter drop-shadow-lg
                      `}
                    >
                      {signData.symbol}
                    </span>
                    <h3 className="font-semibold text-white text-sm mb-1">
                      {signData.names[locale]}
                    </h3>
                    <p className="text-xs text-white/50">
                      {signData.dateRange}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* 일일 운세 바로가기 버튼 */}
        <div className="text-center mt-12">
          <Link
            href={`/${locale}/horoscope/daily`}
            className="inline-block px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500
                       text-white font-semibold rounded-full hover:opacity-90
                       transition-opacity duration-300 shadow-lg"
          >
            {uiTexts.viewDaily[locale]}
          </Link>
        </div>
      </div>
    </div>
  );
}
