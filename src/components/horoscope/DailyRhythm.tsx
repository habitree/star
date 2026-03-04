'use client';

import type { TimeBasedFortune } from '@/types/horoscope-extended';

const PERIOD_LABELS = {
  ko: { morning: '아침', afternoon: '오후', evening: '저녁', now: '지금', rhythm: '하루의 리듬', score: '점' },
  en: { morning: 'Morning', afternoon: 'Afternoon', evening: 'Evening', now: 'Now', rhythm: 'Daily Rhythm', score: 'pt' },
  zh: { morning: '早晨', afternoon: '下午', evening: '傍晚', now: '现在', rhythm: '每日节律', score: '分' },
  ja: { morning: '朝', afternoon: '午後', evening: '夜', now: '今', rhythm: 'デイリーリズム', score: '点' },
  es: { morning: 'Mañana', afternoon: 'Tarde', evening: 'Noche', now: 'Ahora', rhythm: 'Ritmo Diario', score: 'pt' },
} as const;
type PLocale = keyof typeof PERIOD_LABELS;

const PERIOD_RANGES = {
  morning: '06-12',
  afternoon: '12-18',
  evening: '18-24',
} as const;

const PERIOD_ICONS = {
  morning: '🌅',
  afternoon: '☀️',
  evening: '🌙',
} as const;

interface DailyRhythmProps {
  timeFortunes: TimeBasedFortune[];
  locale?: string;
}

function getCurrentPeriod(): 'morning' | 'afternoon' | 'evening' {
  const h = new Date().getHours();
  if (h < 12) return 'morning';
  if (h < 18) return 'afternoon';
  return 'evening';
}

export default function DailyRhythm({ timeFortunes, locale = 'ko' }: DailyRhythmProps) {
  const tl = PERIOD_LABELS[(locale as PLocale) in PERIOD_LABELS ? (locale as PLocale) : 'ko'];
  const currentPeriod = getCurrentPeriod();
  const periodOrder: ('morning' | 'afternoon' | 'evening')[] = ['morning', 'afternoon', 'evening'];
  const currentIdx = periodOrder.indexOf(currentPeriod);

  return (
    <div className="glass-card p-5">
      <p className="text-xs text-white/40 text-center mb-4 tracking-wider uppercase">{tl.rhythm}</p>

      {/* 타임라인 */}
      <div className="relative flex items-center justify-between px-4">
        {/* 연결선 배경 */}
        <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 h-0.5 bg-white/10" />

        {/* 진행된 부분 색상 라인 */}
        {currentIdx > 0 && (
          <div
            className="absolute top-1/2 -translate-y-1/2 h-0.5 bg-gradient-to-r from-purple-500/60 to-purple-500/30"
            style={{
              left: '2rem',
              width: `calc(${(currentIdx / 2) * 100}% - 0rem)`,
            }}
          />
        )}

        {periodOrder.map((period, idx) => {
          const fortune = timeFortunes.find(f => f.period === period);
          const isCurrent = period === currentPeriod;
          const isPast = idx < currentIdx;

          return (
            <div key={period} className="relative z-10 flex flex-col items-center gap-2">
              {/* 노드 */}
              <div className="relative">
                {isCurrent && (
                  <div className="absolute inset-0 rounded-full animate-ping bg-purple-500/40" style={{ margin: '-4px' }} />
                )}
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-xl transition-all
                    ${isCurrent ? 'ring-2 ring-purple-400 ring-offset-1 ring-offset-transparent' : ''}
                    ${isPast ? 'opacity-70' : isCurrent ? 'opacity-100' : 'opacity-40'}
                  `}
                  style={{
                    backgroundColor: isCurrent
                      ? 'rgba(168,85,247,0.3)'
                      : isPast
                      ? 'rgba(255,255,255,0.1)'
                      : 'rgba(255,255,255,0.05)',
                    border: isCurrent
                      ? '1.5px solid rgba(168,85,247,0.6)'
                      : isPast
                      ? '1px solid rgba(255,255,255,0.2)'
                      : '1px dashed rgba(255,255,255,0.15)',
                  }}
                >
                  {PERIOD_ICONS[period]}
                </div>
              </div>

              {/* 레이블 */}
              <div className="text-center">
                <p className={`text-xs font-medium ${isCurrent ? 'text-white' : 'text-white/50'}`}>
                  {tl[period]}
                  {isCurrent && <span className="ml-1 text-purple-300 text-[10px]">{tl.now}</span>}
                </p>
                {fortune && (
                  <p className={`text-xs tabular-nums mt-0.5 ${isCurrent ? 'text-purple-300 font-bold' : 'text-white/30'}`}>
                    {fortune.detailedScore}{tl.score}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* 현재 시간대 한 줄 요약 */}
      {(() => {
        const cur = timeFortunes.find(f => f.period === currentPeriod);
        if (!cur) return null;
        const tip = cur.description.length > 30 ? cur.description.slice(0, 28) + '…' : cur.description;
        return (
          <p className="text-center text-xs text-white/60 mt-4 leading-relaxed px-2">{tip}</p>
        );
      })()}
    </div>
  );
}
