'use client';

import Link from 'next/link';
import ZodiacCard from '@/components/ui/ZodiacCard';
import FavoritesSection from '@/components/ui/FavoritesSection';
import { AdSenseUnit, AdSenseInFeed } from '@/components/ads';
import { getAdSensePublisherId } from '@/lib/adsense-config';
import { type ZodiacSignId } from '@/types/zodiac';

const zodiacSigns: ZodiacSignId[] = [
  'aries',
  'taurus',
  'gemini',
  'cancer',
  'leo',
  'virgo',
  'libra',
  'scorpio',
  'sagittarius',
  'capricorn',
  'aquarius',
  'pisces',
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-zodiac-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-zodiac-secondary/20 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto text-center">
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-6 fade-in">
            <span className="text-gradient">오늘의 별자리 운세</span>
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10 fade-in">
            12별자리의 오늘의 운세, 별자리 궁합, 출생 차트를 확인해보세요
          </p>
        </div>
      </section>

      {/* Favorites Section */}
      <FavoritesSection className="py-8 px-4 max-w-6xl mx-auto" />

      {/* Hero 아래 배너 광고 */}
      {getAdSensePublisherId() && (
        <div className="py-4 px-4 max-w-6xl mx-auto">
          <AdSenseUnit
            adSlot={`${getAdSensePublisherId()}/home-hero-banner`}
            adFormat="auto"
            responsive={true}
            className="w-full"
          />
        </div>
      )}

      {/* Zodiac Grid Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-center mb-12">
            나의 별자리 선택
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
            {zodiacSigns.map((sign, index) => (
              <div
                key={sign}
                className="fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <ZodiacCard sign={sign} size="md" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Horoscope Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card p-8 md:p-12">
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-center mb-6">
              빠른 운세 확인
            </h2>
            <p className="text-white/70 text-center mb-8">
              지금 바로 오늘의 운세와 별자리 궁합을 확인해보세요
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/horoscope" className="btn-primary text-center">
                오늘의 운세 보기
              </Link>
              <Link href="/compatibility" className="btn-secondary text-center">
                궁합 확인하기
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="glass-card-hover p-6 text-center">
              <div className="text-4xl mb-4">&#x2728;</div>
              <h3 className="font-semibold text-lg mb-2">매일 업데이트</h3>
              <p className="text-white/60 text-sm">매일 새롭게 업데이트되는 정확한 운세 정보</p>
            </div>

            {/* Feature 2 */}
            <div className="glass-card-hover p-6 text-center">
              <div className="text-4xl mb-4">&#x2764;</div>
              <h3 className="font-semibold text-lg mb-2">별자리 궁합</h3>
              <p className="text-white/60 text-sm">연인, 친구, 동료와의 궁합을 확인하세요</p>
            </div>

            {/* Feature 3 */}
            <div className="glass-card-hover p-6 text-center">
              <div className="text-4xl mb-4">&#x1F4CA;</div>
              <h3 className="font-semibold text-lg mb-2">출생 차트</h3>
              <p className="text-white/60 text-sm">정확한 출생 시간으로 나만의 차트 분석</p>
            </div>
          </div>

          {/* Features 섹션 아래 인-피드 광고 */}
          {getAdSensePublisherId() && (
            <div className="mt-8">
              <AdSenseInFeed
                adSlot={`${getAdSensePublisherId()}/home-features-feed`}
                className="w-full"
              />
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
