'use client';

import type { HoroscopeScore, HoroscopeCategory } from '@/types';

const GAUGE_TEXT = {
  ko: {
    categories: { overall: '종합', love: '연애', career: '직장', health: '건강', money: '금전' },
    scoreUnit: '점',
    vsYesterday: 'vs 어제',
    topPercent: (n: number) => `상위 ${n}%`,
  },
  en: {
    categories: { overall: 'Total', love: 'Love', career: 'Career', health: 'Health', money: 'Money' },
    scoreUnit: 'pts',
    vsYesterday: 'vs yesterday',
    topPercent: (n: number) => `Top ${n}%`,
  },
  zh: {
    categories: { overall: '综合', love: '爱情', career: '事业', health: '健康', money: '财运' },
    scoreUnit: '分',
    vsYesterday: '对比昨天',
    topPercent: (n: number) => `前 ${n}%`,
  },
  ja: {
    categories: { overall: '総合', love: '恋愛', career: '仕事', health: '健康', money: '金運' },
    scoreUnit: '点',
    vsYesterday: '昨日比',
    topPercent: (n: number) => `上位 ${n}%`,
  },
  es: {
    categories: { overall: 'Total', love: 'Amor', career: 'Trabajo', health: 'Salud', money: 'Dinero' },
    scoreUnit: 'pts',
    vsYesterday: 'vs ayer',
    topPercent: (n: number) => `Top ${n}%`,
  },
} as const;
type GaugeLocale = keyof typeof GAUGE_TEXT;

interface OverallScoreGaugeProps {
  overallPercent: number; // 0-100
  categoryScores: Record<HoroscopeCategory, HoroscopeScore>;
  categoryDetailedScores?: Record<HoroscopeCategory, number>;
  yesterdayPercent?: number;
  percentileRank?: number; // 상위 X%
  locale?: string;
}

const categoryKeys: HoroscopeCategory[] = ['overall', 'love', 'career', 'health', 'money'];
const categoryIcons: Record<HoroscopeCategory, string> = {
  overall: '⭐', love: '❤️', career: '💼', health: '🏥', money: '💰',
};

function getMoodEmoji(pct: number): string {
  if (pct < 30) return '😰';
  if (pct < 50) return '😐';
  if (pct < 70) return '🙂';
  if (pct < 85) return '😊';
  return '🤩';
}

export default function OverallScoreGauge({
  overallPercent,
  categoryScores,
  categoryDetailedScores,
  yesterdayPercent,
  percentileRank,
  locale = 'ko',
}: OverallScoreGaugeProps) {
  const tl = GAUGE_TEXT[(locale as GaugeLocale) in GAUGE_TEXT ? (locale as GaugeLocale) : 'ko'];

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
  const delta = yesterdayPercent != null ? overallPercent - yesterdayPercent : null;

  return (
    <div className="glass-card p-6">
      <div className="flex flex-col items-center">
        {/* 원형 게이지 */}
        <div className="relative w-44 h-44 mb-4">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
            <circle
              cx="80" cy="80" r={radius}
              stroke="rgba(255,255,255,0.1)"
              strokeWidth={stroke}
              fill="none"
            />
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
            <span className="text-2xl mb-0.5">{getMoodEmoji(overallPercent)}</span>
            <span className="text-4xl font-bold text-white countup-number">
              {overallPercent}
            </span>
            <span className="text-sm text-white/50">{tl.scoreUnit}</span>
          </div>
        </div>

        {/* 어제 대비 변화 + 상위 X% */}
        <div className="flex items-center gap-3 mb-3">
          {delta != null && (
            <span className={`text-sm font-medium ${delta > 0 ? 'score-up' : delta < 0 ? 'score-down' : 'text-white/40'}`}>
              {delta > 0 ? '▲' : delta < 0 ? '▼' : '—'}{Math.abs(delta)}{tl.scoreUnit}
              <span className="text-white/30 text-xs ml-1">{tl.vsYesterday}</span>
            </span>
          )}
          {percentileRank != null && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-medium">
              {tl.topPercent(percentileRank)}
            </span>
          )}
        </div>

        {/* 5개 카테고리 미니 바 */}
        <div className="w-full grid grid-cols-5 gap-2">
          {categoryKeys.map((key) => {
            const label = tl.categories[key];
            const icon = categoryIcons[key];
            const detailedPct = categoryDetailedScores?.[key];
            const pct = detailedPct != null ? detailedPct : (categoryScores[key] / 5) * 100;
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
                <span className="text-[10px] text-white/40 block">{Math.round(pct)}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
