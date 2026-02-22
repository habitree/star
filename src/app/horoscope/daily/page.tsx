/**
 * 일일 운세 페이지
 * 12별자리 탭/드롭다운 + 카테고리별 운세 표시
 */

import { Metadata } from 'next';
import Link from 'next/link';
import { getAllDailyHoroscopes } from '@/lib/horoscope-generator';
import { zodiacData } from '@/data/zodiac-info';
import ScoreBar from '@/components/ui/ScoreBar';
import { getSiteUrl } from '@/lib/site-url';
import type { DailyHoroscope } from '@/types';

const baseUrl = getSiteUrl();
const url = `${baseUrl}/horoscope/daily`;
const description = '모든 별자리의 오늘 운세를 한눈에 확인하세요. 12별자리 일일 운세, 종합운·연애운·직장운·건강운·금전운.';

export const metadata: Metadata = {
  title: '12별자리 일일 운세',
  description,
  openGraph: {
    title: '12별자리 일일 운세 - 별자리 운세',
    description,
    url,
    type: 'website',
  },
  alternates: { canonical: url },
};

// 운세 카드 컴포넌트
function HoroscopeCard({ horoscope }: { horoscope: DailyHoroscope }) {
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
            {signData.name}
          </h3>
          <p className="text-white/50 text-sm">{signData.dateRange}</p>
        </div>
      </div>

      {/* 카테고리별 점수 */}
      <div className="space-y-3 mb-6">
        <ScoreBar score={horoscope.overall.score} label="종합" variant="bar" showValue />
        <ScoreBar score={horoscope.love.score} label="연애" variant="bar" showValue />
        <ScoreBar score={horoscope.career.score} label="직장" variant="bar" showValue />
        <ScoreBar score={horoscope.health.score} label="건강" variant="bar" showValue />
        <ScoreBar score={horoscope.money.score} label="금전" variant="bar" showValue />
      </div>

      {/* 행운의 요소 */}
      <div className="grid grid-cols-3 gap-2 mb-6 text-center">
        <div className="glass-card p-2">
          <p className="text-xs text-white/50 mb-1">행운의 숫자</p>
          <p className="text-lg font-bold text-white">{horoscope.luckyNumber}</p>
        </div>
        <div className="glass-card p-2">
          <p className="text-xs text-white/50 mb-1">행운의 색상</p>
          <p className="text-sm font-medium text-white">{horoscope.luckyColor}</p>
        </div>
        <div className="glass-card p-2">
          <p className="text-xs text-white/50 mb-1">행운의 시간</p>
          <p className="text-xs font-medium text-white">{horoscope.luckyTime}</p>
        </div>
      </div>

      {/* 종합 운세 메시지 */}
      <div className="mb-4">
        <p className="text-white/80 text-sm leading-relaxed">
          {horoscope.overall.text.ko}
        </p>
      </div>

      {/* 상세보기 링크 */}
      <Link
        href={`/horoscope/daily/${horoscope.signId}`}
        className="block text-center py-2 px-4 bg-white/10 hover:bg-white/20
                   rounded-lg text-white font-medium transition-colors duration-300"
      >
        상세보기
      </Link>
    </div>
  );
}

export default async function DailyHoroscopePage() {
  // 모든 별자리의 오늘 운세 가져오기
  const allHoroscopes = getAllDailyHoroscopes(new Date(), 'ko');

  // 오늘 날짜 포맷
  const today = new Date();
  const dateFormatted = new Intl.DateTimeFormat('ko', {
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
            12별자리 일일 운세
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
                <span className="hidden sm:inline">{signData.name}</span>
              </a>
            );
          })}
        </div>

        {/* 운세 카드 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allHoroscopes.map((horoscope) => (
            <div key={horoscope.signId} id={horoscope.signId}>
              <HoroscopeCard horoscope={horoscope} />
            </div>
          ))}
        </div>

        {/* 운세 메인 페이지 링크 */}
        <div className="text-center mt-12">
          <Link
            href="/horoscope"
            className="inline-block px-6 py-3 bg-white/10 hover:bg-white/20
                       text-white font-medium rounded-full transition-colors duration-300"
          >
            운세 메인으로
          </Link>
        </div>
      </div>
    </div>
  );
}
