'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ZodiacCard from '@/components/ui/ZodiacCard';
import FavoritesSection from '@/components/ui/FavoritesSection';
import { AdSenseUnit, AdSenseInFeed } from '@/components/ads';
import { isAdSenseEnabled } from '@/lib/adsense-config';
import { useUserStore } from '@/stores/user-store';
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
  const [showOnboardingPrompt, setShowOnboardingPrompt] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // 3초 후 비침습적 온보딩 프롬프트 표시
    const timer = setTimeout(() => {
      const state = useUserStore.getState();
      if (!state.birthDate && !state.onboardingCompleted) {
        setShowOnboardingPrompt(true);
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Cosmic Hero Section */}
      <section className="relative py-24 px-4 overflow-hidden min-h-[70vh] flex flex-col items-center justify-center">
        {/* Deep Space Background Decor */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Stars / Floating Orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-zodiac-primary/20 rounded-full blur-[100px] animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-zodiac-secondary/10 rounded-full blur-[120px] animate-float" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-zodiac-accent/5 rounded-full blur-[80px] animate-spin-slow" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center stagger-fade-in">
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full glass-card border-white/20 text-zodiac-accent text-sm font-medium tracking-wider uppercase backdrop-blur-md">
            ✨ Mystical Cosmic Journey
          </div>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-8 tracking-tight drop-shadow-glow-primary">
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-zodiac-light to-zodiac-primary">
              당신의 우주를 <br className="md:hidden" />
              탐험하세요
            </span>
          </h1>
          <p className="text-lg md:text-2xl text-white/80 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
            12별자리의 오늘의 운세, 별자리 궁합, 나만의 출생 차트를 통해 별들이 들려주는 신비로운 이야기를 들어보세요.
          </p>

          {/* Primary CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/horoscope" className="btn-primary text-center px-8 py-4 text-lg">
              오늘의 운세 보기
            </Link>
            <Link href="/zodiac" className="btn-secondary text-center px-8 py-4 text-lg">
              내 별자리 찾기
            </Link>
          </div>
        </div>
      </section>

      {/* Favorites Section */}
      <FavoritesSection className="py-8 px-4 max-w-6xl mx-auto" />

      {/* Hero 아래 배너 광고 */}
      {isAdSenseEnabled() && (
        <div className="py-4 px-4 max-w-6xl mx-auto">
          <AdSenseUnit
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
      <section className="py-20 px-4 relative">
        <div className="absolute inset-0 bg-glass-overlay pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="glass-card-hover p-10 md:p-16 border-zodiac-primary/30 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-zodiac-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 flex flex-col items-center">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-6 text-white drop-shadow-md">
                별들의 계시 확인하기
              </h2>
              <p className="text-white/80 text-center mb-10 text-lg">
                지금 바로 오늘의 운세와 별자리 궁합을 확인해보세요
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center w-full max-w-md">
                <Link href="/horoscope" className="btn-primary text-center flex-1 py-4 text-lg group-hover:shadow-[0_0_30px_rgba(139,92,246,0.6)] transition-all">
                  오늘의 운세 보기
                </Link>
                <Link href="/compatibility" className="btn-secondary text-center flex-1 py-4 text-lg hover:border-white/40">
                  궁합 확인하기
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="glass-card-hover p-8 text-center group">
              <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300 drop-shadow-glow-primary">✨</div>
              <h3 className="font-semibold text-xl mb-3 text-white">매일 업데이트</h3>
              <p className="text-white/70 leading-relaxed">우주의 흐름을 읽어 매일 새롭게 업데이트되는 정확한 운세 정보</p>
            </div>

            {/* Feature 2 */}
            <div className="glass-card-hover p-8 text-center group">
              <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300 drop-shadow-glow-primary">💫</div>
              <h3 className="font-semibold text-xl mb-3 text-white">운명적인 인연</h3>
              <p className="text-white/70 leading-relaxed">연인, 친구, 동료와의 별자리 궁합으로 관계의 비밀을 풀어보세요</p>
            </div>

            {/* Feature 3 */}
            <div className="glass-card-hover p-8 text-center group">
              <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300 drop-shadow-glow-primary">🔭</div>
              <h3 className="font-semibold text-xl mb-3 text-white">나만의 우주</h3>
              <p className="text-white/70 leading-relaxed">정확한 출생 시간으로 그려내는 나만의 영혼 차트 분석</p>
            </div>
          </div>

          {/* Features 섹션 아래 인-피드 광고 */}
          {isAdSenseEnabled() && (
            <div className="mt-8">
              <AdSenseInFeed className="w-full" />
            </div>
          )}
        </div>
      </section>

      {/* 비침습적 온보딩 프롬프트 (신규 사용자, 3초 후 표시) */}
      {showOnboardingPrompt && !dismissed && (
        <div className="fixed bottom-4 left-4 right-4 z-50 max-w-md mx-auto animate-slide-up">
          <div className="glass-card p-5 border-zodiac-primary/30 bg-gradient-to-r from-zodiac-primary/20 to-purple-500/20 shadow-2xl">
            <button
              onClick={() => setDismissed(true)}
              className="absolute top-2 right-3 text-white/40 hover:text-white text-lg"
              aria-label="닫기"
            >
              &times;
            </button>
            <p className="text-white font-medium text-sm mb-2">
              생년월일을 입력하면 맞춤 운세를 받을 수 있어요
            </p>
            <p className="text-white/60 text-xs mb-3">
              나만의 별자리 운세, 바이오리듬, 타로까지 무료로 확인하세요
            </p>
            <Link
              href="/horoscope"
              className="inline-block px-5 py-2 rounded-full text-sm font-medium bg-zodiac-primary hover:bg-zodiac-primary/80 text-white transition-colors"
            >
              맞춤 운세 시작하기
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
