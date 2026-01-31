/**
 * 운세 메인 페이지
 * 12별자리 선택 그리드 + 오늘의 운세 순위 TOP 3
 */

import { Metadata } from 'next';
import Link from 'next/link';
import { getTodayTopSigns, generateDailyHoroscope } from '@/lib/horoscope-generator';
import { zodiacData } from '@/data/zodiac-info';
import type { ZodiacSignId } from '@/types';

export const metadata: Metadata = {
  title: '오늘의 운세',
  description: '12별자리의 오늘 운세를 확인하세요. 매일 업데이트되는 정확한 운세 정보를 제공합니다.',
};

export default async function HoroscopePage() {
  // 오늘의 TOP 3 가져오기
  const topSigns = getTodayTopSigns(new Date(), 3);

  // TOP 3 별자리의 상세 운세 가져오기
  const topHoroscopes = topSigns.map((item) => ({
    ...item,
    horoscope: generateDailyHoroscope(item.signId, new Date(), 'ko'),
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
            오늘의 운세
          </h1>
          <p className="text-white/70 text-lg">
            12별자리의 오늘 운세를 확인하세요. 매일 업데이트되는 정확한 운세 정보를 제공합니다.
          </p>
        </div>

        {/* 오늘의 운세 순위 TOP 3 */}
        <section className="mb-16">
          <h2 className="text-2xl font-serif font-semibold text-white mb-6 text-center">
            오늘의 운세 순위 TOP 3
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topHoroscopes.map((item, index) => (
              <Link
                key={item.signId}
                href={`/horoscope/daily/${item.signId}`}
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
                    {item.signData.name}
                  </h3>

                  {/* 종합 점수 */}
                  <div className="mb-3">
                    <span className="text-white/60 text-sm">종합 점수</span>
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
            별자리를 선택하세요
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {allSigns.map((signId) => {
              const signData = zodiacData[signId];
              return (
                <Link
                  key={signId}
                  href={`/horoscope/daily/${signId}`}
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
                      {signData.name}
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
            href="/horoscope/daily"
            className="inline-block px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500
                       text-white font-semibold rounded-full hover:opacity-90
                       transition-opacity duration-300 shadow-lg"
          >
            일일 운세 보기
          </Link>
        </div>
      </div>
    </div>
  );
}
