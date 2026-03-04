'use client';

import { zodiacData } from '@/data/zodiac-info';
import { zodiacSigns } from '@/data/zodiac-signs';
import type { ZodiacSignId } from '@/types';

const WELCOME_TEXT = {
  ko: { greeting: (name: string) => `${name}님, 다시 오셨군요!`, vsYesterday: '어제 대비', streak: '연속 방문' },
  en: { greeting: (name: string) => `Welcome back, ${name}!`, vsYesterday: 'vs yesterday', streak: 'day streak' },
  zh: { greeting: (name: string) => `欢迎回来，${name}！`, vsYesterday: '与昨天相比', streak: '天连续' },
  ja: { greeting: (name: string) => `おかえりなさい、${name}！`, vsYesterday: '昨日比', streak: '日連続' },
  es: { greeting: (name: string) => `¡Bienvenido de vuelta, ${name}!`, vsYesterday: 'vs ayer', streak: ' días seguidos' },
} as const;
type WelcomeLocale = keyof typeof WELCOME_TEXT;

// Locale-aware name lookup
const signNameMap: Record<string, Record<string, string>> = Object.fromEntries(
  zodiacSigns.map((s) => [s.id, s.names as unknown as Record<string, string>])
);

interface WelcomeBackProps {
  signId: ZodiacSignId;
  visitStreak: number;
  yesterdayScore?: number;
  todayScore: number;
  locale?: string;
}

export default function WelcomeBack({ signId, visitStreak, yesterdayScore, todayScore, locale = 'ko' }: WelcomeBackProps) {
  const tl = WELCOME_TEXT[(locale as WelcomeLocale) in WELCOME_TEXT ? (locale as WelcomeLocale) : 'ko'];
  const info = zodiacData[signId];
  const signName = signNameMap[signId]?.[locale] ?? info.name;
  const scoreDiff = yesterdayScore ? todayScore - yesterdayScore : null;

  return (
    <div className="glass-card p-5 mb-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10">
      <div className="flex items-center gap-4">
        <span className="text-4xl">{info.symbol}</span>
        <div className="flex-1">
          <p className="text-white font-semibold">
            {tl.greeting(signName)}
          </p>
          {scoreDiff !== null && (
            <p className="text-sm text-white/60 mt-0.5">
              {tl.vsYesterday}{' '}
              <span className={scoreDiff >= 0 ? 'text-green-400' : 'text-red-400'}>
                {scoreDiff >= 0 ? '▲' : '▼'} {Math.abs(scoreDiff)}
              </span>
            </p>
          )}
        </div>
        {visitStreak > 1 && (
          <div className="text-center px-3 py-2 bg-white/10 rounded-xl">
            <p className="text-lg font-bold text-amber-400">🔥 {visitStreak}</p>
            <p className="text-[10px] text-white/40">{tl.streak}</p>
          </div>
        )}
      </div>
    </div>
  );
}
