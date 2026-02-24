'use client';

import { useState } from 'react';
import type { TimeBasedFortune as TimeBasedFortuneType } from '@/types/horoscope-extended';

interface TimeBasedFortuneProps {
  fortunes: TimeBasedFortuneType[];
}

function getCurrentPeriod(): 'morning' | 'afternoon' | 'evening' {
  const hour = new Date().getHours();
  if (hour < 12) return 'morning';
  if (hour < 18) return 'afternoon';
  return 'evening';
}

export default function TimeBasedFortune({ fortunes }: TimeBasedFortuneProps) {
  const currentPeriod = getCurrentPeriod();
  const [activePeriod, setActivePeriod] = useState(currentPeriod);

  const activeFortune = fortunes.find(f => f.period === activePeriod);

  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-semibold text-white mb-4 text-center">
        시간대별 운세
      </h3>

      {/* 탭 */}
      <div className="flex rounded-xl bg-white/5 p-1 mb-4">
        {fortunes.map(f => {
          const isActive = f.period === activePeriod;
          const isCurrent = f.period === currentPeriod;
          return (
            <button
              key={f.period}
              onClick={() => setActivePeriod(f.period)}
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all
                ${isActive
                  ? 'bg-purple-500/30 text-white'
                  : 'text-white/50 hover:text-white/70'
                }`}
            >
              {f.label}
              {isCurrent && <span className="ml-1 text-[10px] text-purple-300">지금</span>}
            </button>
          );
        })}
      </div>

      {/* 내용 */}
      {activeFortune && (
        <div
          className="animate-fade-in-up rounded-xl p-4"
          style={{
            backgroundColor: `rgba(168, 85, 247, ${Math.min(0.15, activeFortune.detailedScore / 800)})`,
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-white/40">{activeFortune.timeRange}</span>
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map(s => (
                  <span
                    key={s}
                    className={`text-sm ${s <= activeFortune.score ? 'star-filled' : 'star-empty'}`}
                  >
                    ★
                  </span>
                ))}
              </div>
              {/* 점수 배지 */}
              <span className="text-xs font-bold text-white/80 px-1.5 py-0.5 rounded bg-white/10 tabular-nums">
                {activeFortune.detailedScore}점
              </span>
            </div>
          </div>

          {/* 퍼센트 바 */}
          <div className="h-1 rounded-full bg-white/10 overflow-hidden mb-3">
            <div
              className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
              style={{ width: `${activeFortune.detailedScore}%` }}
            />
          </div>

          <p className="text-white/85 text-sm leading-relaxed mb-3">
            {activeFortune.description}
          </p>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 text-xs text-white/60">
            <span>💡</span>
            {activeFortune.tip}
          </div>
        </div>
      )}
    </div>
  );
}
