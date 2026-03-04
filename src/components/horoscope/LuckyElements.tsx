'use client';

import { zodiacData } from '@/data/zodiac-info';
import { zodiacSigns } from '@/data/zodiac-signs';
import type { ExtendedLuckyElements } from '@/types/horoscope-extended';

const LUCKY_TEXT = {
  ko: {
    title: '오늘의 행운 요소',
    partnerLabel: '오늘의 베스트 파트너',
    items: {
      number:    '행운의 숫자',
      color:     '행운의 색상',
      time:      '행운의 시간',
      direction: '행운의 방향',
      food:      '행운의 음식',
      activity:  '행운의 활동',
    },
  },
  en: {
    title: "Today's Lucky Elements",
    partnerLabel: "Today's Best Partner",
    items: {
      number:    'Lucky Number',
      color:     'Lucky Color',
      time:      'Lucky Time',
      direction: 'Lucky Direction',
      food:      'Lucky Food',
      activity:  'Lucky Activity',
    },
  },
  zh: {
    title: '今日幸运要素',
    partnerLabel: '今日最佳伙伴',
    items: {
      number:    '幸运数字',
      color:     '幸运颜色',
      time:      '幸运时间',
      direction: '幸运方向',
      food:      '幸运食物',
      activity:  '幸运活动',
    },
  },
  ja: {
    title: '今日のラッキー要素',
    partnerLabel: '今日のベストパートナー',
    items: {
      number:    'ラッキーナンバー',
      color:     'ラッキーカラー',
      time:      'ラッキータイム',
      direction: 'ラッキー方向',
      food:      'ラッキーフード',
      activity:  'ラッキー活動',
    },
  },
  es: {
    title: 'Elementos de Suerte de Hoy',
    partnerLabel: 'Mejor Pareja de Hoy',
    items: {
      number:    'Número de Suerte',
      color:     'Color de Suerte',
      time:      'Hora de Suerte',
      direction: 'Dirección de Suerte',
      food:      'Comida de Suerte',
      activity:  'Actividad de Suerte',
    },
  },
} as const;
type LuckyLocale = keyof typeof LUCKY_TEXT;

// Locale-aware sign name lookup
const signNameMap: Record<string, Record<string, string>> = Object.fromEntries(
  zodiacSigns.map((s) => [s.id, s.names as unknown as Record<string, string>])
);

interface LuckyElementsProps {
  lucky: ExtendedLuckyElements;
  locale?: string;
}

const itemKeys: (keyof ExtendedLuckyElements)[] = ['number', 'color', 'time', 'direction', 'food', 'activity'];
const itemIcons: Record<string, string> = {
  number: '🔢', color: '🎨', time: '⏰', direction: '🧭', food: '🍽️', activity: '✨',
};

export default function LuckyElements({ lucky, locale = 'ko' }: LuckyElementsProps) {
  const tl = LUCKY_TEXT[(locale as LuckyLocale) in LUCKY_TEXT ? (locale as LuckyLocale) : 'ko'];
  const partnerInfo = zodiacData[lucky.bestPartner];
  const partnerName = signNameMap[lucky.bestPartner]?.[locale] ?? partnerInfo.name;

  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-semibold text-white mb-4 text-center">
        {tl.title}
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {itemKeys.map((key) => (
          <div key={key} className="text-center p-3 bg-white/5 rounded-xl">
            <span className="text-lg">{itemIcons[key]}</span>
            <p className="text-[10px] text-white/40 mt-1">{tl.items[key as keyof typeof tl.items]}</p>
            <p className="text-sm font-semibold text-white mt-0.5">
              {String(lucky[key])}
            </p>
          </div>
        ))}
      </div>

      {/* 베스트 파트너 */}
      <div className="mt-4 p-3 bg-pink-500/10 border border-pink-500/20 rounded-xl text-center">
        <p className="text-xs text-white/50 mb-1">{tl.partnerLabel}</p>
        <div className="flex items-center justify-center gap-2">
          <span className="text-2xl">{partnerInfo.symbol}</span>
          <span className="text-white font-semibold">{partnerName}</span>
        </div>
      </div>
    </div>
  );
}
