'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { TarotCard as TarotCardType } from '@/types/horoscope-extended';

interface TarotCardProps {
  card: TarotCardType;
}

export default function TarotCard({ card }: TarotCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [imgError, setImgError] = useState(false);

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
            className="w-36 h-52 cursor-pointer rounded-xl relative overflow-hidden
                       border-2 border-amber-400/40
                       hover:scale-105 transition-transform duration-300
                       shadow-lg shadow-purple-500/30 group"
            aria-label="타로 카드 뒤집기"
            style={{
              background: 'linear-gradient(135deg, #1a0a3e 0%, #2d1060 50%, #1a0a3e 100%)',
            }}
          >
            {/* 뒷면 패턴 - 기하학 문양 */}
            <svg
              className="absolute inset-0 w-full h-full opacity-30 group-hover:opacity-50 transition-opacity"
              viewBox="0 0 144 208"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern id="card-back-pattern" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
                  <circle cx="12" cy="12" r="1.5" fill="rgba(255,215,0,0.6)"/>
                  <line x1="0" y1="12" x2="24" y2="12" stroke="rgba(255,215,0,0.15)" strokeWidth="0.5"/>
                  <line x1="12" y1="0" x2="12" y2="24" stroke="rgba(255,215,0,0.15)" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="144" height="208" fill="url(#card-back-pattern)"/>
              {/* 중앙 장식 */}
              <circle cx="72" cy="104" r="35" fill="none" stroke="rgba(255,215,0,0.4)" strokeWidth="1"/>
              <circle cx="72" cy="104" r="25" fill="none" stroke="rgba(255,215,0,0.3)" strokeWidth="0.7"/>
              <circle cx="72" cy="104" r="6" fill="rgba(255,215,0,0.5)"/>
              {/* 팔각 별 */}
              <polygon points="72,69 76,95 100,104 76,113 72,139 68,113 44,104 68,95"
                fill="none" stroke="rgba(255,215,0,0.35)" strokeWidth="0.8"/>
              {/* 테두리 */}
              <rect x="6" y="6" width="132" height="196" rx="8"
                fill="none" stroke="rgba(255,215,0,0.4)" strokeWidth="1.5"/>
            </svg>
            <span className="relative z-10 text-amber-300/70 text-3xl">🔮</span>
          </button>
        </div>
      ) : (
        <div className="tarot-card-revealed text-center">
          {/* 카드 앞면 */}
          <div className="inline-flex flex-col items-center justify-start w-36 h-52 rounded-xl mb-4
                         overflow-hidden border-2 border-amber-400/50
                         shadow-lg shadow-amber-500/20 relative">
            {/* 실사 이미지 */}
            {!imgError ? (
              <div
                className="w-full h-full relative"
                style={
                  card.isReversed
                    ? { transform: 'rotate(180deg)', filter: 'sepia(0.3) brightness(0.9)' }
                    : {}
                }
              >
                <Image
                  src={card.imageUrl}
                  alt={card.name}
                  fill
                  sizes="144px"
                  className="object-cover"
                  onError={() => setImgError(true)}
                  priority
                />
              </div>
            ) : (
              /* 이미지 로드 실패 폴백 */
              <div
                className="w-full h-full flex flex-col items-center justify-center
                           bg-gradient-to-br from-amber-500/20 to-orange-600/20"
                style={card.isReversed ? { transform: 'rotate(180deg)' } : {}}
              >
                <span className="text-4xl mb-2">{card.symbol}</span>
                <span className="text-white font-semibold text-sm">{card.name}</span>
              </div>
            )}

            {/* 역방향 뱃지 */}
            {card.isReversed && (
              <div className="absolute top-1.5 left-1/2 -translate-x-1/2 z-10">
                <span className="px-2 py-0.5 rounded-full text-xs font-bold
                                 bg-amber-900/80 text-amber-300 border border-amber-400/50
                                 backdrop-blur-sm whitespace-nowrap">
                  ↑↓ 역방향
                </span>
              </div>
            )}
          </div>

          {/* 카드명 */}
          <p className="text-white font-semibold text-sm mb-3">
            {card.name}
            {card.isReversed && (
              <span className="ml-1.5 text-amber-400 text-xs">(역방향)</span>
            )}
          </p>

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
