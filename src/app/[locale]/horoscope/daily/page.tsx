/**
 * 일일 운세 페이지
 * 12별자리 탭/드롭다운 + 카테고리별 운세 표시
 */

import { Metadata } from 'next';
import Link from 'next/link';
import { setRequestLocale } from 'next-intl/server';
import { locales, type Locale } from '@/i18n/config';
import { getAllDailyHoroscopes } from '@/lib/horoscope-generator';
import { zodiacData } from '@/components/ui/ZodiacCard';
import ScoreBar from '@/components/ui/ScoreBar';
import type { ZodiacSignId, DailyHoroscope } from '@/types';

// 페이지 제목 다국어
const pageTitles: Record<Locale, string> = {
  ko: '12별자리 일일 운세',
  en: 'Daily Horoscope for All Signs',
  zh: '12星座每日运势',
  ja: '12星座の毎日の運勢',
  es: 'Horóscopo Diario de los 12 Signos',
};

const pageDescriptions: Record<Locale, string> = {
  ko: '모든 별자리의 오늘 운세를 한눈에 확인하세요.',
  en: "Check today's horoscope for all zodiac signs at a glance.",
  zh: '一目了然查看所有星座的今日运势。',
  ja: '全星座の今日の運勢を一目でチェック。',
  es: 'Consulta el horóscopo de hoy para todos los signos de un vistazo.',
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
  overall: { ko: '종합', en: 'Overall', zh: '综合', ja: '総合', es: 'General' },
  love: { ko: '연애', en: 'Love', zh: '爱情', ja: '恋愛', es: 'Amor' },
  career: { ko: '직장', en: 'Career', zh: '事业', ja: '仕事', es: 'Carrera' },
  health: { ko: '건강', en: 'Health', zh: '健康', ja: '健康', es: 'Salud' },
  money: { ko: '금전', en: 'Money', zh: '财运', ja: '金運', es: 'Dinero' },
  luckyNumber: { ko: '행운의 숫자', en: 'Lucky Number', zh: '幸运数字', ja: 'ラッキーナンバー', es: 'Numero de Suerte' },
  luckyColor: { ko: '행운의 색상', en: 'Lucky Color', zh: '幸运颜色', ja: 'ラッキーカラー', es: 'Color de Suerte' },
  luckyTime: { ko: '행운의 시간', en: 'Lucky Time', zh: '幸运时间', ja: 'ラッキータイム', es: 'Hora de Suerte' },
  viewDetail: { ko: '상세보기', en: 'View Details', zh: '查看详情', ja: '詳細を見る', es: 'Ver Detalles' },
  todayAdvice: { ko: '오늘의 조언', en: "Today's Advice", zh: '今日建议', ja: '今日のアドバイス', es: 'Consejo de Hoy' },
};

// 운세 카드 컴포넌트
function HoroscopeCard({
  horoscope,
  locale,
}: {
  horoscope: DailyHoroscope;
  locale: Locale;
}) {
  const signData = zodiacData[horoscope.signId];

  return (
    <div
      className={`
        glass-card p-6 element-${signData.element}
        hover:scale-[1.02] transition-transform duration-300
      `}
    >
      {/* 헤더 */}
      <div className="flex items-center gap-4 mb-6">
        <div className="text-4xl filter drop-shadow-lg">
          {signData.symbol}
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white">
            {signData.names[locale]}
          </h3>
          <p className="text-white/50 text-sm">{signData.dateRange}</p>
        </div>
      </div>

      {/* 카테고리별 점수 */}
      <div className="space-y-3 mb-6">
        <ScoreBar
          score={horoscope.overall.score}
          label={uiTexts.overall[locale]}
          variant="bar"
          showValue
        />
        <ScoreBar
          score={horoscope.love.score}
          label={uiTexts.love[locale]}
          variant="bar"
          showValue
        />
        <ScoreBar
          score={horoscope.career.score}
          label={uiTexts.career[locale]}
          variant="bar"
          showValue
        />
        <ScoreBar
          score={horoscope.health.score}
          label={uiTexts.health[locale]}
          variant="bar"
          showValue
        />
        <ScoreBar
          score={horoscope.money.score}
          label={uiTexts.money[locale]}
          variant="bar"
          showValue
        />
      </div>

      {/* 행운의 요소 */}
      <div className="grid grid-cols-3 gap-2 mb-6 text-center">
        <div className="glass-card p-2">
          <p className="text-xs text-white/50 mb-1">
            {uiTexts.luckyNumber[locale]}
          </p>
          <p className="text-lg font-bold text-white">{horoscope.luckyNumber}</p>
        </div>
        <div className="glass-card p-2">
          <p className="text-xs text-white/50 mb-1">
            {uiTexts.luckyColor[locale]}
          </p>
          <p className="text-sm font-medium text-white">{horoscope.luckyColor}</p>
        </div>
        <div className="glass-card p-2">
          <p className="text-xs text-white/50 mb-1">
            {uiTexts.luckyTime[locale]}
          </p>
          <p className="text-xs font-medium text-white">{horoscope.luckyTime}</p>
        </div>
      </div>

      {/* 종합 운세 메시지 */}
      <div className="mb-4">
        <p className="text-white/80 text-sm leading-relaxed">
          {horoscope.overall.text[locale]}
        </p>
      </div>

      {/* 상세보기 링크 */}
      <Link
        href={`/${locale}/horoscope/daily/${horoscope.signId}`}
        className="block text-center py-2 px-4 bg-white/10 hover:bg-white/20
                   rounded-lg text-white font-medium transition-colors duration-300"
      >
        {uiTexts.viewDetail[locale]}
      </Link>
    </div>
  );
}

export default async function DailyHoroscopePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  // 모든 별자리의 오늘 운세 가져오기
  const allHoroscopes = getAllDailyHoroscopes(new Date(), locale);

  // 오늘 날짜 포맷
  const today = new Date();
  const dateFormatted = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  }).format(today);

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* 페이지 제목 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-bold text-white mb-4">
            {pageTitles[locale]}
          </h1>
          <p className="text-white/70 text-lg">{dateFormatted}</p>
        </div>

        {/* 별자리 바로가기 네비게이션 */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {allHoroscopes.map((horoscope) => {
            const signData = zodiacData[horoscope.signId];
            return (
              <a
                key={horoscope.signId}
                href={`#${horoscope.signId}`}
                className={`
                  px-3 py-2 rounded-full text-sm font-medium
                  bg-white/10 hover:bg-white/20 text-white
                  transition-colors duration-300
                  flex items-center gap-1
                `}
              >
                <span>{signData.symbol}</span>
                <span className="hidden sm:inline">{signData.names[locale]}</span>
              </a>
            );
          })}
        </div>

        {/* 운세 카드 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allHoroscopes.map((horoscope) => (
            <div key={horoscope.signId} id={horoscope.signId}>
              <HoroscopeCard horoscope={horoscope} locale={locale} />
            </div>
          ))}
        </div>

        {/* 운세 메인 페이지 링크 */}
        <div className="text-center mt-12">
          <Link
            href={`/${locale}/horoscope`}
            className="inline-block px-6 py-3 bg-white/10 hover:bg-white/20
                       text-white font-medium rounded-full transition-colors duration-300"
          >
            {locale === 'ko' && '운세 메인으로'}
            {locale === 'en' && 'Back to Horoscope'}
            {locale === 'zh' && '返回运势首页'}
            {locale === 'ja' && '運勢トップへ'}
            {locale === 'es' && 'Volver al Horoscopo'}
          </Link>
        </div>
      </div>
    </div>
  );
}
