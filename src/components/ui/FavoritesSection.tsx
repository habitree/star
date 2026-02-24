'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useUserStore, type FavoriteSign } from '@/stores/user-store';
import type { ZodiacSignId } from '@/types';
import ZodiacIcon from '@/components/ui/ZodiacIcon';
import FavoriteButton from '@/components/ui/FavoriteButton';

// 별자리 정보
const zodiacNames: Record<ZodiacSignId, { name: string; element: string }> = {
  aries: { name: '양자리', element: 'fire' },
  taurus: { name: '황소자리', element: 'earth' },
  gemini: { name: '쌍둥이자리', element: 'air' },
  cancer: { name: '게자리', element: 'water' },
  leo: { name: '사자자리', element: 'fire' },
  virgo: { name: '처녀자리', element: 'earth' },
  libra: { name: '천칭자리', element: 'air' },
  scorpio: { name: '전갈자리', element: 'water' },
  sagittarius: { name: '사수자리', element: 'fire' },
  capricorn: { name: '염소자리', element: 'earth' },
  aquarius: { name: '물병자리', element: 'air' },
  pisces: { name: '물고기자리', element: 'water' },
};

interface FavoritesSectionProps {
  className?: string;
}

export default function FavoritesSection({ className = '' }: FavoritesSectionProps) {
  const getFavorites = useUserStore((state) => state.getFavorites);

  // Hydration 문제 방지
  const [mounted, setMounted] = useState(false);
  const [favorites, setFavorites] = useState<FavoriteSign[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      setFavorites(getFavorites());
    }
  }, [mounted, getFavorites]);

  // Subscribe to store changes
  useEffect(() => {
    if (!mounted) return;

    const unsubscribe = useUserStore.subscribe((state) => {
      setFavorites(state.favorites);
    });

    return () => unsubscribe();
  }, [mounted]);

  if (!mounted) return null;

  // 즐겨찾기가 없으면 안내 표시
  if (favorites.length === 0) {
    return (
      <section className={`${className}`}>
        <div className="glass-card p-6 text-center">
          <span className="text-3xl mb-3 inline-block">&#x2B50;</span>
          <p className="text-white/70 text-sm mb-3">
            자주 보는 별자리를 즐겨찾기에 추가해보세요
          </p>
          <Link href="/zodiac" className="text-zodiac-primary text-sm hover:underline transition-colors">
            별자리 목록 보기 &rarr;
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className={`${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="text-yellow-400">★</span>
          즐겨찾기
        </h2>
        <span className="text-sm text-white/50">{favorites.length}개</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {favorites.map((fav) => {
          const zodiac = zodiacNames[fav.signId];
          return (
            <div
              key={fav.signId}
              className={`
                glass-card-hover p-4
                background-gradient-${zodiac.element}
                group relative overflow-hidden flex flex-col items-center justify-center
                cursor-pointer transform-gpu transition-all duration-300
                hover:-translate-y-1 hover:shadow-[0_4px_20px_-5px_rgba(255,255,255,0.1)]
              `}
            >
              {/* Overlay glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <Link
                href={`/zodiac/${fav.signId}`}
                className="flex flex-col items-center text-center w-full relative z-10"
              >
                <div className="mb-2 group-hover:scale-110 group-hover:drop-shadow-glow-primary transition-all duration-300">
                  <ZodiacIcon sign={fav.signId} size="sm" animated />
                </div>
                <h3 className="text-sm font-semibold text-white">
                  {fav.nickname || zodiac.name}
                </h3>
                {fav.nickname && (
                  <p className="text-xs text-white/40 mt-0.5">{zodiac.name}</p>
                )}
              </Link>

              {/* 즐겨찾기 해제 버튼 */}
              <div className="absolute top-1 right-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                <FavoriteButton signId={fav.signId} size="sm" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
