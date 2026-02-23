'use client';

import type { HoroscopeScore, HoroscopeCategory } from '@/types';

interface OverallScoreGaugeProps {
  overallPercent: number; // 0-100
  categoryScores: Record<HoroscopeCategory, HoroscopeScore>;
}

const categoryMeta: { key: HoroscopeCategory; label: string; icon: string }[] = [
  { key: 'overall', label: '종합', icon: '⭐' },
  { key: 'love', label: '연애', icon: '❤️' },
  { key: 'career', label: '직장', icon: '💼' },
  { key: 'health', label: '건강', icon: '🏥' },
  { key: 'money', label: '금전', icon: '💰' },
];

export default function OverallScoreGauge({ overallPercent, categoryScores }: OverallScoreGaugeProps) {
  const radius = 70;
  const stroke = 10;
  const circumference = 2 * Math.PI * radius;
  const progress = (overallPercent / 100) * circumference;

  const getScoreColor = (pct: number) => {
    if (pct >= 80) return '#22c55e';
    if (pct >= 60) return '#a855f7';
    if (pct >= 40) return '#f59e0b';
    return '#ef4444';
  };

  const color = getScoreColor(overallPercent);

  return (
    <div className="glass-card p-6">
      <div className="flex flex-col items-center">
        {/* 원형 게이지 */}
        <div className="relative w-44 h-44 mb-4">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
            {/* 배경 원 */}
            <circle
              cx="80" cy="80" r={radius}
              stroke="rgba(255,255,255,0.1)"
              strokeWidth={stroke}
              fill="none"
            />
            {/* 진행 원 */}
            <circle
              cx="80" cy="80" r={radius}
              stroke={color}
              strokeWidth={stroke}
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference - progress}
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          {/* 중앙 점수 */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold text-white countup-number">
              {overallPercent}
            </span>
            <span className="text-sm text-white/50">점</span>
          </div>
        </div>

        {/* 5개 카테고리 미니 바 */}
        <div className="w-full grid grid-cols-5 gap-2">
          {categoryMeta.map(({ key, label, icon }) => {
            const score = categoryScores[key];
            const pct = (score / 5) * 100;
            return (
              <div key={key} className="text-center">
                <span className="text-sm">{icon}</span>
                <div className="h-1.5 rounded-full bg-white/10 mt-1 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${pct}%`, backgroundColor: getScoreColor(pct) }}
                  />
                </div>
                <span className="text-[10px] text-white/50 mt-0.5 block">{label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
