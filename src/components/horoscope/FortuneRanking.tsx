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
  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-semibold text-white mb-4 text-center">
        오늘의 별자리 순위
      </h3>

      <div className="space-y-2">
        {ranking.map((entry) => {
          const info = zodiacData[entry.signId];
          const isMe = entry.signId === mySignId;

          return (
            <Link
              key={entry.signId}
              href={`/horoscope/daily/${entry.signId}`}
              className={`flex items-center gap-3 p-3 rounded-xl transition-colors
                ${isMe
                  ? 'bg-purple-500/20 border border-purple-500/30 ring-1 ring-purple-400/20'
                  : 'bg-white/5 hover:bg-white/10'
                }`}
            >
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
                {isMe && <span className="text-purple-300 text-xs ml-1">← 나</span>}
              </span>

              {/* 점수 */}
              <span className={`text-sm font-bold ${isMe ? 'text-purple-300' : 'text-white/60'}`}>
                {entry.totalScore}/25
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
