'use client';

import { type ZodiacSign, type Element, type Modality } from '@/types/zodiac';
import { type Locale } from '@/i18n/config';
import { getElementColor } from '@/lib/zodiac-utils';

interface ZodiacHeaderProps {
  sign: ZodiacSign;
  locale: Locale;
}

const elementLabels: Record<Element, Record<Locale, string>> = {
  fire: { ko: '불', en: 'Fire', zh: '火', ja: '火', es: 'Fuego' },
  earth: { ko: '흙', en: 'Earth', zh: '土', ja: '土', es: 'Tierra' },
  air: { ko: '공기', en: 'Air', zh: '风', ja: '風', es: 'Aire' },
  water: { ko: '물', en: 'Water', zh: '水', ja: '水', es: 'Agua' },
};

const modalityLabels: Record<Modality, Record<Locale, string>> = {
  cardinal: { ko: '활동궁', en: 'Cardinal', zh: '本位宫', ja: '活動宮', es: 'Cardinal' },
  fixed: { ko: '고정궁', en: 'Fixed', zh: '固定宫', ja: '固定宮', es: 'Fijo' },
  mutable: { ko: '변통궁', en: 'Mutable', zh: '变动宫', ja: '変動宮', es: 'Mutable' },
};

const labels: Record<string, Record<Locale, string>> = {
  period: { ko: '기간', en: 'Period', zh: '时间', ja: '期間', es: 'Periodo' },
  element: { ko: '원소', en: 'Element', zh: '元素', ja: '元素', es: 'Elemento' },
  modality: { ko: '모달리티', en: 'Modality', zh: '三方宫', ja: '三区分', es: 'Modalidad' },
  rulingPlanet: { ko: '지배 행성', en: 'Ruling Planet', zh: '守护星', ja: '支配星', es: 'Planeta Regente' },
};

function formatDateRange(start: string, end: string): string {
  const [startMonth, startDay] = start.split('-');
  const [endMonth, endDay] = end.split('-');
  return `${parseInt(startMonth)}/${parseInt(startDay)} - ${parseInt(endMonth)}/${parseInt(endDay)}`;
}

export default function ZodiacHeader({ sign, locale }: ZodiacHeaderProps) {
  const colors = getElementColor(sign.element);

  return (
    <div className={`relative overflow-hidden rounded-3xl p-8 md:p-12 bg-gradient-to-br ${colors.gradient} bg-opacity-20`}>
      {/* Background glow */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      <div className="relative z-10">
        {/* Symbol and Name */}
        <div className="flex flex-col items-center text-center mb-8">
          <span className="text-8xl md:text-9xl mb-4 filter drop-shadow-2xl animate-pulse-slow">
            {sign.symbol}
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-2">
            {sign.names[locale]}
          </h1>
          <p className="text-white/60 text-lg">
            {sign.names.en !== sign.names[locale] ? sign.names.en : ''}
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {/* Period */}
          <div className="glass-card p-4 text-center">
            <p className="text-white/50 text-xs mb-1">{labels.period[locale]}</p>
            <p className="text-white font-semibold">
              {formatDateRange(sign.dateRange.start, sign.dateRange.end)}
            </p>
          </div>

          {/* Element */}
          <div className={`glass-card p-4 text-center element-${sign.element}`}>
            <p className="text-white/50 text-xs mb-1">{labels.element[locale]}</p>
            <p className="text-white font-semibold">
              {elementLabels[sign.element][locale]}
            </p>
          </div>

          {/* Modality */}
          <div className="glass-card p-4 text-center">
            <p className="text-white/50 text-xs mb-1">{labels.modality[locale]}</p>
            <p className="text-white font-semibold">
              {modalityLabels[sign.modality][locale]}
            </p>
          </div>

          {/* Ruling Planet */}
          <div className="glass-card p-4 text-center">
            <p className="text-white/50 text-xs mb-1">{labels.rulingPlanet[locale]}</p>
            <p className="text-white font-semibold">
              {sign.rulingPlanet[locale]}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
