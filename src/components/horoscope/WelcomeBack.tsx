'use client';

import { zodiacData } from '@/data/zodiac-info';
import type { ZodiacSignId } from '@/types';

interface WelcomeBackProps {
  signId: ZodiacSignId;
  visitStreak: number;
  yesterdayScore?: number;
  todayScore: number;
}

export default function WelcomeBack({ signId, visitStreak, yesterdayScore, todayScore }: WelcomeBackProps) {
  const info = zodiacData[signId];
  const scoreDiff = yesterdayScore ? todayScore - yesterdayScore : null;

  return (
    <div className="glass-card p-5 mb-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10">
      <div className="flex items-center gap-4">
        <span className="text-4xl">{info.symbol}</span>
        <div className="flex-1">
          <p className="text-white font-semibold">
            {info.name}님, 다시 오셨군요!
          </p>
          {scoreDiff !== null && (
            <p className="text-sm text-white/60 mt-0.5">
              어제 대비{' '}
              <span className={scoreDiff >= 0 ? 'text-green-400' : 'text-red-400'}>
                {scoreDiff >= 0 ? '▲' : '▼'} {Math.abs(scoreDiff)}점
              </span>
            </p>
          )}
        </div>
        {visitStreak > 1 && (
          <div className="text-center px-3 py-2 bg-white/10 rounded-xl">
            <p className="text-lg font-bold text-amber-400">🔥 {visitStreak}</p>
            <p className="text-[10px] text-white/40">연속 방문</p>
          </div>
        )}
      </div>
    </div>
  );
}
