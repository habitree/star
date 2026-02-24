'use client';

import Link from 'next/link';
import { zodiacData } from '@/data/zodiac-info';
import type { FortuneRankingEntry } from '@/types/horoscope-extended';
import type { ZodiacSignId } from '@/types';

interface FortuneRankingProps {
  ranking: FortuneRankingEntry[];
  mySignId: ZodiacSignId;
}

export default function FortuneRanking({ ranking, mySignId }: FortuneRankingProps) {
  const maxFine = ranking.length > 0 ? ranking[0].fineScore : 500;
  const myEntry = ranking.find(e => e.signId === mySignId);

  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-semibold text-white mb-2 text-center">
        오늘의 별자리 순위
      </h3>

      {/* 내 순위 배지 */}
      {myEntry && (
        <div className="text-center mb-4">
          <span className="text-xs px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 font-medium">
            내 순위: {myEntry.rank}위 / 상위 {myEntry.percentile}%
          </span>
        </div>
      )}

      <div className="space-y-2">
        {ranking.map((entry, idx) => {
          const info = zodiacData[entry.signId];
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
                  {info.name}
                  {isMe && <span className="text-purple-300 text-xs ml-1">&larr; 나</span>}
                </span>

                {/* 점수 */}
                <span className={`text-sm font-bold tabular-nums ${isMe ? 'text-purple-300' : 'text-white/60'}`}>
                  {displayScore}점
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
