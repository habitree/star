/**
 * 특정 별자리 일일 운세 상세 페이지
 */

import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { locales, type Locale } from '@/i18n/config';
import { generateDailyHoroscope, generateWeeklyHoroscope } from '@/lib/horoscope-generator';
import { zodiacData } from '@/components/ui/ZodiacCard';
import ScoreBar from '@/components/ui/ScoreBar';
import type { ZodiacSignId, HoroscopeCategory } from '@/types';

// 유효한 별자리 목록
const validSigns: ZodiacSignId[] = [
  'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
  'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'
];

export function generateStaticParams() {
  const params: { locale: Locale; sign: ZodiacSignId }[] = [];
  for (const locale of locales) {
    for (const sign of validSigns) {
      params.push({ locale, sign });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; sign: string }>;
}): Promise<Metadata> {
  const { locale, sign } = await params;

  if (!validSigns.includes(sign as ZodiacSignId)) {
    return { title: 'Not Found' };
  }

  const signData = zodiacData[sign as ZodiacSignId];
  const signName = signData.names[locale];

  const titles: Record<Locale, string> = {
    ko: `${signName} 오늘의 운세`,
    en: `${signName} Daily Horoscope`,
    zh: `${signName}今日运势`,
    ja: `${signName}の今日の運勢`,
    es: `Horoscopo Diario de ${signName}`,
  };

  return {
    title: titles[locale],
    description: titles[locale],
  };
}

// UI 텍스트 다국어
const uiTexts = {
  todayHoroscope: {
    ko: '오늘의 운세',
    en: "Today's Horoscope",
    zh: '今日运势',
    ja: '今日の運勢',
    es: 'Horoscopo de Hoy',
  },
  categories: {
    overall: { ko: '종합운', en: 'Overall', zh: '综合运', ja: '総合運', es: 'General' },
    love: { ko: '연애운', en: 'Love', zh: '爱情运', ja: '恋愛運', es: 'Amor' },
    career: { ko: '직장운', en: 'Career', zh: '事业运', ja: '仕事運', es: 'Carrera' },
    health: { ko: '건강운', en: 'Health', zh: '健康运', ja: '健康運', es: 'Salud' },
    money: { ko: '금전운', en: 'Money', zh: '财运', ja: '金運', es: 'Dinero' },
  },
  luckyItems: {
    ko: '오늘의 행운',
    en: "Today's Luck",
    zh: '今日幸运',
    ja: '今日のラッキー',
    es: 'Suerte de Hoy',
  },
  luckyNumber: { ko: '행운의 숫자', en: 'Lucky Number', zh: '幸运数字', ja: 'ラッキーナンバー', es: 'Numero de Suerte' },
  luckyColor: { ko: '행운의 색상', en: 'Lucky Color', zh: '幸运颜色', ja: 'ラッキーカラー', es: 'Color de Suerte' },
  luckyTime: { ko: '행운의 시간', en: 'Lucky Time', zh: '幸运时间', ja: 'ラッキータイム', es: 'Hora de Suerte' },
  advice: { ko: '오늘의 조언', en: "Today's Advice", zh: '今日建议', ja: '今日のアドバイス', es: 'Consejo de Hoy' },
  weeklyPreview: {
    ko: '이번 주 운세 미리보기',
    en: 'Weekly Preview',
    zh: '本周运势预览',
    ja: '今週の運勢プレビュー',
    es: 'Vista Previa Semanal',
  },
  bestDay: { ko: '최고의 날', en: 'Best Day', zh: '最佳日', ja: 'ベストデー', es: 'Mejor Dia' },
  challengeDay: { ko: '주의할 날', en: 'Challenge Day', zh: '注意日', ja: '注意が必要な日', es: 'Dia de Desafio' },
  otherSigns: {
    ko: '다른 별자리 운세',
    en: 'Other Signs',
    zh: '其他星座',
    ja: '他の星座',
    es: 'Otros Signos',
  },
  backToList: {
    ko: '목록으로',
    en: 'Back to List',
    zh: '返回列表',
    ja: 'リストに戻る',
    es: 'Volver a Lista',
  },
};

// 카테고리 아이콘
const categoryIcons: Record<HoroscopeCategory, string> = {
  overall: '⭐',
  love: '❤️',
  career: '💼',
  health: '🏥',
  money: '💰',
};

export default async function SignDailyHoroscopePage({
  params,
}: {
  params: Promise<{ locale: Locale; sign: string }>;
}) {
  const { locale, sign } = await params;

  // 유효성 검사
  if (!validSigns.includes(sign as ZodiacSignId)) {
    notFound();
  }

  setRequestLocale(locale);

  const signId = sign as ZodiacSignId;
  const signData = zodiacData[signId];

  // 일일 운세 생성
  const dailyHoroscope = generateDailyHoroscope(signId, new Date(), locale);

  // 주간 운세 (미리보기용)
  const weeklyHoroscope = generateWeeklyHoroscope(signId, new Date(), locale);

  // 오늘 날짜 포맷
  const today = new Date();
  const dateFormatted = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  }).format(today);

  // 카테고리 목록
  const categories: HoroscopeCategory[] = ['overall', 'love', 'career', 'health', 'money'];

  // 다른 별자리 목록 (현재 별자리 제외)
  const otherSigns = validSigns.filter((s) => s !== signId);

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* 별자리 헤더 */}
        <div className={`glass-card p-8 mb-8 text-center element-${signData.element}`}>
          <div className="text-6xl mb-4 filter drop-shadow-lg">
            {signData.symbol}
          </div>
          <h1 className="text-3xl font-serif font-bold text-white mb-2">
            {signData.names[locale]}
          </h1>
          <p className="text-white/70 mb-1">{signData.dateRange}</p>
          <p className="text-white/50 text-sm">{dateFormatted}</p>
        </div>

        {/* 행운의 요소 */}
        <div className="glass-card p-6 mb-8">
          <h2 className="text-xl font-semibold text-white mb-4 text-center">
            {uiTexts.luckyItems[locale]}
          </h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-white/5 rounded-lg">
              <p className="text-white/50 text-sm mb-2">
                {uiTexts.luckyNumber[locale]}
              </p>
              <p className="text-3xl font-bold text-white">
                {dailyHoroscope.luckyNumber}
              </p>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-lg">
              <p className="text-white/50 text-sm mb-2">
                {uiTexts.luckyColor[locale]}
              </p>
              <p className="text-xl font-semibold text-white">
                {dailyHoroscope.luckyColor}
              </p>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-lg">
              <p className="text-white/50 text-sm mb-2">
                {uiTexts.luckyTime[locale]}
              </p>
              <p className="text-sm font-medium text-white">
                {dailyHoroscope.luckyTime}
              </p>
            </div>
          </div>
        </div>

        {/* 카테고리별 운세 */}
        <div className="space-y-6 mb-8">
          {categories.map((category) => {
            const categoryData = dailyHoroscope[category];
            return (
              <div key={category} className="glass-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{categoryIcons[category]}</span>
                  <h3 className="text-lg font-semibold text-white">
                    {uiTexts.categories[category][locale]}
                  </h3>
                </div>

                {/* 점수 바 */}
                <div className="mb-4">
                  <ScoreBar
                    score={categoryData.score}
                    variant="stars"
                    showValue
                  />
                </div>

                {/* 운세 텍스트 */}
                <p className="text-white/80 leading-relaxed">
                  {categoryData.text[locale]}
                </p>
              </div>
            );
          })}
        </div>

        {/* 오늘의 조언 */}
        <div className="glass-card p-6 mb-8 bg-gradient-to-r from-purple-500/20 to-pink-500/20">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span>💡</span>
            {uiTexts.advice[locale]}
          </h2>
          <p className="text-white/90 text-lg leading-relaxed">
            {dailyHoroscope.advice[locale]}
          </p>
        </div>

        {/* 주간 운세 미리보기 */}
        <div className="glass-card p-6 mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">
            {uiTexts.weeklyPreview[locale]}
          </h2>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="p-4 bg-green-500/20 rounded-lg text-center">
              <p className="text-white/50 text-sm mb-1">
                {uiTexts.bestDay[locale]}
              </p>
              <p className="text-white font-semibold">
                {weeklyHoroscope.bestDay}
              </p>
            </div>
            <div className="p-4 bg-orange-500/20 rounded-lg text-center">
              <p className="text-white/50 text-sm mb-1">
                {uiTexts.challengeDay[locale]}
              </p>
              <p className="text-white font-semibold">
                {weeklyHoroscope.challengeDay}
              </p>
            </div>
          </div>

          <p className="text-white/80 text-sm leading-relaxed">
            {weeklyHoroscope.weekHighlight[locale]}
          </p>
        </div>

        {/* 다른 별자리 */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4 text-center">
            {uiTexts.otherSigns[locale]}
          </h2>
          <div className="flex flex-wrap justify-center gap-2">
            {otherSigns.map((otherSignId) => {
              const otherSignData = zodiacData[otherSignId];
              return (
                <Link
                  key={otherSignId}
                  href={`/${locale}/horoscope/daily/${otherSignId}`}
                  className={`
                    px-4 py-2 rounded-full text-sm font-medium
                    bg-white/10 hover:bg-white/20 text-white
                    transition-all duration-300 hover:scale-105
                    flex items-center gap-2
                  `}
                >
                  <span>{otherSignData.symbol}</span>
                  <span>{otherSignData.names[locale]}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* 네비게이션 */}
        <div className="flex justify-center gap-4">
          <Link
            href={`/${locale}/horoscope/daily`}
            className="px-6 py-3 bg-white/10 hover:bg-white/20
                       text-white font-medium rounded-full transition-colors duration-300"
          >
            {uiTexts.backToList[locale]}
          </Link>
          <Link
            href={`/${locale}/horoscope`}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500
                       text-white font-semibold rounded-full hover:opacity-90
                       transition-opacity duration-300"
          >
            {locale === 'ko' && '운세 메인'}
            {locale === 'en' && 'Horoscope Home'}
            {locale === 'zh' && '运势首页'}
            {locale === 'ja' && '運勢トップ'}
            {locale === 'es' && 'Inicio Horoscopo'}
          </Link>
        </div>
      </div>
    </div>
  );
}
