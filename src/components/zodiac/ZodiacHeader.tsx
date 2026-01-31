'use client';

import { type ZodiacSign, type Element, type Modality } from '@/types/zodiac';
import { getElementColor } from '@/lib/zodiac-utils';
import ZodiacIcon from '@/components/ui/ZodiacIcon';
import ElementIcon from '@/components/ui/ElementIcon';

interface ZodiacHeaderProps {
  sign: ZodiacSign;
}

const elementLabels: Record<Element, string> = {
  fire: '불',
  earth: '흙',
  air: '공기',
  water: '물',
};

const modalityLabels: Record<Modality, string> = {
  cardinal: '활동궁',
  fixed: '고정궁',
  mutable: '변통궁',
};

function formatDateRange(start: string, end: string): string {
  const [startMonth, startDay] = start.split('-');
  const [endMonth, endDay] = end.split('-');
  return `${parseInt(startMonth)}/${parseInt(startDay)} - ${parseInt(endMonth)}/${parseInt(endDay)}`;
}

export default function ZodiacHeader({ sign }: ZodiacHeaderProps) {
  const colors = getElementColor(sign.element);

  return (
    <div className={`relative overflow-hidden rounded-3xl p-8 md:p-12 bg-gradient-to-br ${colors.gradient} bg-opacity-20`}>
      {/* Background glow */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      <div className="relative z-10">
        {/* Symbol and Name */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="mb-4 animate-pulse-slow">
            <ZodiacIcon sign={sign.id} size="xl" animated />
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-2">
            {sign.names.ko}
          </h1>
          <p className="text-white/60 text-lg">
            {sign.names.en}
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {/* Period */}
          <div className="glass-card p-4 text-center">
            <p className="text-white/50 text-xs mb-1">기간</p>
            <p className="text-white font-semibold">
              {formatDateRange(sign.dateRange.start, sign.dateRange.end)}
            </p>
          </div>

          {/* Element */}
          <div className={`glass-card p-4 text-center element-${sign.element}`}>
            <p className="text-white/50 text-xs mb-1">원소</p>
            <div className="flex items-center justify-center gap-2">
              <ElementIcon element={sign.element} size="sm" animated />
              <p className="text-white font-semibold">
                {elementLabels[sign.element]}
              </p>
            </div>
          </div>

          {/* Modality */}
          <div className="glass-card p-4 text-center">
            <p className="text-white/50 text-xs mb-1">모달리티</p>
            <p className="text-white font-semibold">
              {modalityLabels[sign.modality]}
            </p>
          </div>

          {/* Ruling Planet */}
          <div className="glass-card p-4 text-center">
            <p className="text-white/50 text-xs mb-1">지배 행성</p>
            <p className="text-white font-semibold">
              {sign.rulingPlanet.ko}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
