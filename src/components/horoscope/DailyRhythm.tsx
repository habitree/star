'use client';

import type { TimeBasedFortune } from '@/types/horoscope-extended';

interface DailyRhythmProps {
  timeFortunes: TimeBasedFortune[];
}

const periodMeta = {
  morning:   { icon: '🌅', label: '아침', range: '06-12시' },
  afternoon: { icon: '☀️', label: '오후', range: '12-18시' },
  evening:   { icon: '🌙', label: '저녁', range: '18-24시' },
} as const;

function getCurrentPeriod(): 'morning' | 'afternoon' | 'evening' {
  const h = new Date().getHours();
  if (h < 12) return 'morning';
  if (h < 18) return 'afternoon';
  return 'evening';
}

export default function DailyRhythm({ timeFortunes }: DailyRhythmProps) {
  const currentPeriod = getCurrentPeriod();
  const periodOrder: ('morning' | 'afternoon' | 'evening')[] = ['morning', 'afternoon', 'evening'];
  const currentIdx = periodOrder.indexOf(currentPeriod);

  return (
    <div className="glass-card p-5">
      <p className="text-xs text-white/40 text-center mb-4 tracking-wider uppercase">하루의 리듬</p>

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
          const meta = periodMeta[period];
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
                  {meta.icon}
                </div>
              </div>

              {/* 레이블 */}
              <div className="text-center">
                <p className={`text-xs font-medium ${isCurrent ? 'text-white' : 'text-white/50'}`}>
                  {meta.label}
                  {isCurrent && <span className="ml-1 text-purple-300 text-[10px]">지금</span>}
                </p>
                {fortune && (
                  <p className={`text-xs tabular-nums mt-0.5 ${isCurrent ? 'text-purple-300 font-bold' : 'text-white/30'}`}>
                    {fortune.detailedScore}점
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
