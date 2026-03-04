'use client';

import Link from 'next/link';
import { zodiacData } from '@/data/zodiac-info';
import { zodiacSigns } from '@/data/zodiac-signs';
import type { FortuneRankingEntry } from '@/types/horoscope-extended';
import type { ZodiacSignId } from '@/types';

const RANKING_TEXT = {
  ko: {
    title: '오늘의 별자리 순위',
    myRank: (rank: number, pct: number) => `내 순위: ${rank}위 / 상위 ${pct}%`,
    me: '← 나',
    scoreUnit: '점',
  },
  en: {
    title: "Today's Zodiac Ranking",
    myRank: (rank: number, pct: number) => `My rank: #${rank} / Top ${pct}%`,
    me: '← me',
    scoreUnit: 'pts',
  },
  zh: {
    title: '今日星座排名',
    myRank: (rank: number, pct: number) => `我的排名: 第${rank}名 / 前${pct}%`,
    me: '← 我',
    scoreUnit: '分',
  },
  ja: {
    title: '今日の星座ランキング',
    myRank: (rank: number, pct: number) => `私の順位: ${rank}位 / 上位${pct}%`,
    me: '← 私',
    scoreUnit: '点',
  },
  es: {
    title: 'Ranking del Zodíaco Hoy',
    myRank: (rank: number, pct: number) => `Mi posición: #${rank} / Top ${pct}%`,
    me: '← yo',
    scoreUnit: 'pts',
  },
} as const;
type RankingLocale = keyof typeof RANKING_TEXT;

// Locale-aware sign name lookup
const signNameMap: Record<string, Record<string, string>> = Object.fromEntries(
  zodiacSigns.map((s) => [s.id, s.names as unknown as Record<string, string>])
);

interface FortuneRankingProps {
  ranking: FortuneRankingEntry[];
  mySignId: ZodiacSignId;
  locale?: string;
}

export default function FortuneRanking({ ranking, mySignId, locale = 'ko' }: FortuneRankingProps) {
  const tl = RANKING_TEXT[(locale as RankingLocale) in RANKING_TEXT ? (locale as RankingLocale) : 'ko'];
  const maxFine = ranking.length > 0 ? ranking[0].fineScore : 500;
  const myEntry = ranking.find(e => e.signId === mySignId);

  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-semibold text-white mb-2 text-center">
        {tl.title}
      </h3>

      {/* 내 순위 배지 */}
      {myEntry && (
        <div className="text-center mb-4">
          <span className="text-xs px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 font-medium">
            {tl.myRank(myEntry.rank, myEntry.percentile)}
          </span>
        </div>
      )}

      <div className="space-y-2">
        {ranking.map((entry, idx) => {
          const info = zodiacData[entry.signId];
          const signName = signNameMap[entry.signId]?.[locale] ?? info.name;
          const isMe = entry.signId === mySignId;
          const finePercent = maxFine > 0 ? (entry.fineScore / maxFine) * 100 : 0;
          const displayScore = Math.round(entry.fineScore / 5); // 0-100 스케일

          return (
            <Link
              key={entry.signId}
              href={`/horoscope/daily/${entry.signId}`}
              className={`block p-3 rounded-xl transition-colors
                ${isMe
                  ? 'bg-purple-500/20 border border-purple-500/30 ring-1 ring-purple-400/20'
                  : 'bg-white/5 hover:bg-white/10'
                }`}
            >
              <div className="flex items-center gap-3">
                {/* 순위 */}
                <span className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0
                  ${entry.rank === 1 ? 'bg-yellow-400 text-yellow-900' : ''}
                  ${entry.rank === 2 ? 'bg-gray-300 text-gray-700' : ''}
                  ${entry.rank === 3 ? 'bg-amber-600 text-amber-100' : ''}
                  ${entry.rank > 3 ? 'bg-white/10 text-white/60' : ''}
                `}>
                  {entry.rank}
                </span>

                {/* 별자리 */}
                <span className="text-xl">{info.symbol}</span>
                <span className={`text-sm font-medium flex-1 ${isMe ? 'text-white' : 'text-white/80'}`}>
                  {signName}
                  {isMe && <span className="text-purple-300 text-xs ml-1">{tl.me}</span>}
                </span>

                {/* 점수 */}
                <span className={`text-sm font-bold tabular-nums ${isMe ? 'text-purple-300' : 'text-white/60'}`}>
                  {displayScore}{tl.scoreUnit}
                </span>
              </div>

              {/* 미니 프로그레스 바 */}
              <div className="mt-1.5 ml-10 flex items-center gap-2">
                <div className="flex-1 h-1 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${finePercent}%`,
                      backgroundColor: isMe ? '#a855f7' : 'rgba(168,85,247,0.4)',
                    }}
                  />
                </div>
                {/* 순위간 격차 */}
                {idx > 0 && entry.scoreDelta != null && entry.scoreDelta > 0 && (
                  <span className="text-[10px] text-white/30 tabular-nums">
                    -{Math.round(entry.scoreDelta / 5)}
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
