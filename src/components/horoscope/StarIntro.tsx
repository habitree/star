'use client';

import { useState, useEffect } from 'react';
import type { ZodiacSignId } from '@/types';
import { zodiacData } from '@/data/zodiac-info';
import { getElementTheme } from '@/lib/element-theme';

interface StarIntroProps {
  signId: ZodiacSignId;
  onComplete: () => void;
}

export default function StarIntro({ signId, onComplete }: StarIntroProps) {
  const [phase, setPhase] = useState<'stars' | 'symbol' | 'done'>('stars');
  const info = zodiacData[signId];
  const theme = getElementTheme(signId);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('symbol'), 1200);
    const t2 = setTimeout(() => {
      setPhase('done');
      onComplete();
    }, 2800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onComplete]);

  if (phase === 'done') return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zodiac-dark/95 pointer-events-none">
      {/* 별 파티클 */}
      {phase === 'stars' && (
        <div className="relative w-48 h-48">
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i / 12) * Math.PI * 2;
            const radius = 80;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            return (
              <div
                key={i}
                className="absolute w-1.5 h-1.5 rounded-full animate-star-converge"
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                  backgroundColor: theme.primaryColor,
                  boxShadow: `0 0 6px ${theme.glowColor}`,
                  animationDelay: `${i * 80}ms`,
                }}
              />
            );
          })}
        </div>
      )}

      {/* 별자리 심볼 등장 */}
      {phase === 'symbol' && (
        <div className="text-center animate-scale-in">
          <div
            className="text-8xl mb-4"
            style={{ filter: `drop-shadow(0 0 30px ${theme.glowColor})` }}
          >
            {info.symbol}
          </div>
          <p className="text-white/90 text-lg font-serif animate-fade-in-up">
            {info.name}
          </p>
        </div>
      )}
    </div>
  );
}
