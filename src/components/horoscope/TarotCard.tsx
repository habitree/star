'use client';

import { useState } from 'react';
import type { TarotCard as TarotCardType } from '@/types/horoscope-extended';

interface TarotCardProps {
  card: TarotCardType;
}

export default function TarotCard({ card }: TarotCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-semibold text-white mb-4 text-center">
        오늘의 타로 카드
      </h3>

      {!isFlipped ? (
        <div className="flex flex-col items-center">
          <p className="text-white/60 text-sm mb-4">카드를 클릭하여 뒤집어보세요</p>
          <button
            onClick={() => setIsFlipped(true)}
            className="w-36 h-52 cursor-pointer rounded-xl
                       bg-gradient-to-br from-indigo-600 to-purple-800
                       border-2 border-white/20 flex items-center justify-center
                       hover:scale-105 transition-transform duration-300
                       shadow-lg shadow-purple-500/30"
            aria-label="타로 카드 뒤집기"
          >
            <span className="text-5xl">🔮</span>
          </button>
        </div>
      ) : (
        <div className="tarot-card-revealed text-center">
          {/* 카드 앞면 */}
          <div className="inline-flex flex-col items-center justify-center w-36 h-52 rounded-xl mb-4
                         bg-gradient-to-br from-amber-500/20 to-orange-600/20
                         border-2 border-amber-400/30
                         shadow-lg p-3">
            <span className="text-4xl mb-2">{card.symbol}</span>
            <span className="text-white font-semibold text-sm">{card.name}</span>
            {card.isReversed && (
              <span className="text-xs text-amber-300 mt-1">역방향</span>
            )}
          </div>

          {/* 카드 의미 */}
          <div className="text-left space-y-3 mt-2">
            <div>
              <h4 className="text-sm font-medium text-white/70 mb-1">
                {card.isReversed ? '역방향 의미' : '카드의 의미'}
              </h4>
              <p className="text-white/90 text-sm leading-relaxed">{card.meaning}</p>
            </div>
            <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
              <h4 className="text-sm font-medium text-purple-300 mb-1">오늘의 조언</h4>
              <p className="text-white/80 text-sm leading-relaxed">{card.advice}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
