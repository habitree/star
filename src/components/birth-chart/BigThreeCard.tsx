'use client';

import type { ZodiacSignId } from '@/types';
import PlanetIcon, { type PlanetId } from '@/components/ui/PlanetIcon';
import ZodiacIcon from '@/components/ui/ZodiacIcon';

interface BigThreeCardProps {
  type: 'sun' | 'moon' | 'rising';
  sign: ZodiacSignId;
  interpretation?: string;
}

// 별자리 심볼 및 이름
const zodiacData: Record<ZodiacSignId, { symbol: string; name: string }> = {
  aries: { symbol: '\u2648', name: '양자리' },
  taurus: { symbol: '\u2649', name: '황소자리' },
  gemini: { symbol: '\u264A', name: '쌍둥이자리' },
  cancer: { symbol: '\u264B', name: '게자리' },
  leo: { symbol: '\u264C', name: '사자자리' },
  virgo: { symbol: '\u264D', name: '처녀자리' },
  libra: { symbol: '\u264E', name: '천칭자리' },
  scorpio: { symbol: '\u264F', name: '전갈자리' },
  sagittarius: { symbol: '\u2650', name: '사수자리' },
  capricorn: { symbol: '\u2651', name: '염소자리' },
  aquarius: { symbol: '\u2652', name: '물병자리' },
  pisces: { symbol: '\u2653', name: '물고기자리' },
};

// 타입별 색상 설정
const typeConfig = {
  sun: {
    planetId: 'sun' as PlanetId,
    gradient: 'from-yellow-400 to-orange-500',
    bgGradient: 'from-yellow-500/20 to-orange-500/20',
    borderColor: 'border-yellow-500/30',
  },
  moon: {
    planetId: 'moon' as PlanetId,
    gradient: 'from-blue-400 to-purple-500',
    bgGradient: 'from-blue-500/20 to-purple-500/20',
    borderColor: 'border-blue-500/30',
  },
  rising: {
    planetId: 'sun' as PlanetId, // Rising uses ascendant symbol
    gradient: 'from-pink-400 to-rose-500',
    bgGradient: 'from-pink-500/20 to-rose-500/20',
    borderColor: 'border-pink-500/30',
  },
};

export default function BigThreeCard({
  type,
  sign,
  interpretation,
}: BigThreeCardProps) {
  const config = typeConfig[type];
  const signData = zodiacData[sign];

  const typeLabels: Record<'sun' | 'moon' | 'rising', string> = {
    sun: '태양',
    moon: '달',
    rising: '상승궁',
  };

  return (
    <div
      className={`
        relative overflow-hidden rounded-2xl
        bg-gradient-to-br ${config.bgGradient}
        border ${config.borderColor}
        backdrop-blur-sm
        p-6
        transition-all duration-300
        hover:scale-[1.02] hover:shadow-lg
      `}
    >
      {/* 배경 장식 */}
      <div
        className={`
          absolute -top-10 -right-10 w-32 h-32
          bg-gradient-to-br ${config.gradient}
          opacity-10 rounded-full blur-2xl
        `}
      />

      {/* 헤더 */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className={`
            p-2 rounded-lg
            bg-gradient-to-br ${config.gradient}
          `}
        >
          <PlanetIcon planet={config.planetId} size="sm" />
        </div>
        <span className="text-white/70 font-medium">{typeLabels[type]}</span>
      </div>

      {/* 별자리 심볼과 이름 */}
      <div className="flex items-center gap-4 mb-4">
        <ZodiacIcon sign={sign} size="lg" animated />
        <div>
          <h3 className="text-2xl font-bold text-white">
            {signData.name}
          </h3>
        </div>
      </div>

      {/* 해석 */}
      {interpretation && (
        <p className="text-white/70 text-sm leading-relaxed">{interpretation}</p>
      )}
    </div>
  );
}
