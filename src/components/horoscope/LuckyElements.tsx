'use client';

import { zodiacData } from '@/data/zodiac-info';
import type { ExtendedLuckyElements } from '@/types/horoscope-extended';

interface LuckyElementsProps {
  lucky: ExtendedLuckyElements;
}

const items: { key: keyof ExtendedLuckyElements; label: string; icon: string }[] = [
  { key: 'number', label: '행운의 숫자', icon: '🔢' },
  { key: 'color', label: '행운의 색상', icon: '🎨' },
  { key: 'time', label: '행운의 시간', icon: '⏰' },
  { key: 'direction', label: '행운의 방향', icon: '🧭' },
  { key: 'food', label: '행운의 음식', icon: '🍽️' },
  { key: 'activity', label: '행운의 활동', icon: '✨' },
];

export default function LuckyElements({ lucky }: LuckyElementsProps) {
  const partnerInfo = zodiacData[lucky.bestPartner];

  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-semibold text-white mb-4 text-center">
        오늘의 행운 요소
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {items.map(({ key, label, icon }) => (
          <div key={key} className="text-center p-3 bg-white/5 rounded-xl">
            <span className="text-lg">{icon}</span>
            <p className="text-[10px] text-white/40 mt-1">{label}</p>
            <p className="text-sm font-semibold text-white mt-0.5">
              {String(lucky[key])}
            </p>
          </div>
        ))}
      </div>

      {/* 베스트 파트너 */}
      <div className="mt-4 p-3 bg-pink-500/10 border border-pink-500/20 rounded-xl text-center">
        <p className="text-xs text-white/50 mb-1">오늘의 베스트 파트너</p>
        <div className="flex items-center justify-center gap-2">
          <span className="text-2xl">{partnerInfo.symbol}</span>
          <span className="text-white font-semibold">{partnerInfo.name}</span>
        </div>
      </div>
    </div>
  );
}
