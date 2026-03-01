'use client';

import { useState } from 'react';
import type { CalendarDayData, TrendCategory } from '@/types/horoscope-extended';

interface FortuneCalendarProps {
  data: CalendarDayData[];      // 현재 달 데이터
  year: number;
  month: number;                // 0-indexed
  onMonthChange: (delta: number) => void;
  visitStreak?: number;
}

const DAY_LABELS = ['일', '월', '화', '수', '목', '금', '토'];

const categoryMeta: { key: TrendCategory; label: string; icon: string }[] = [
  { key: 'overall', label: '종합', icon: '⭐' },
  { key: 'love',    label: '연애', icon: '❤️' },
  { key: 'career',  label: '직장', icon: '💼' },
  { key: 'health',  label: '건강', icon: '🏥' },
  { key: 'money',   label: '금전', icon: '💰' },
];

function scoreToColor(score: number, opacity: number = 1): string {
  // 0-40: 붉은계열, 40-65: 보라, 65-100: 초록계열
  if (score < 40) return `rgba(239,68,68,${opacity * 0.7})`;
  if (score < 65) return `rgba(168,85,247,${opacity * 0.7})`;
  return `rgba(34,197,94,${opacity * 0.7})`;
}

export default function FortuneCalendar({
  data,
  year,
  month,
  onMonthChange,
}: FortuneCalendarProps) {
  const [selectedDay, setSelectedDay] = useState<CalendarDayData | null>(null);

  // 달의 첫째 날 요일 (0=일)
  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const monthName = `${year}년 ${month + 1}월`;

  // 6×7 그리드 생성 (빈 칸 포함)
  const cells: (CalendarDayData | null)[] = [
    ...Array(firstDayOfWeek).fill(null),
    ...data,
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  // 방문일 연속 체크
  const visitedSet = new Set(data.filter(d => d.isVisited).map(d => d.date));

  return (
    <div className="glass-card p-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => onMonthChange(-1)}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors text-sm"
        >
          ‹
        </button>
        <h3 className="text-lg font-semibold text-white">{monthName} 운세 캘린더</h3>
        <button
          onClick={() => onMonthChange(1)}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors text-sm"
        >
          ›
        </button>
      </div>

      {/* 요일 헤더 */}
      <div className="grid grid-cols-7 gap-1 mb-1">
        {DAY_LABELS.map((d, i) => (
          <div
            key={d}
            className="text-center text-xs font-medium py-1"
            style={{ color: i === 0 ? '#f87171' : i === 6 ? '#60a5fa' : 'rgba(255,255,255,0.4)' }}
          >
            {d}
          </div>
        ))}
      </div>

      {/* 날짜 그리드 */}
      <div className="grid grid-cols-7 gap-1">
        {cells.map((cell, idx) => {
          if (!cell) return <div key={idx} />;

          const isSelected = selectedDay?.date === cell.date;
          const opacity = cell.isVisited ? 1 : 0.35;

          // 스트릭 연결선: 오른쪽 이웃이 방문일이면 연결
          const nextDate = new Date(cell.date);
          nextDate.setDate(nextDate.getDate() + 1);
          const nextStr = nextDate.toISOString().split('T')[0];
          const hasStreakRight = cell.isVisited && visitedSet.has(nextStr);

          return (
            <div key={cell.date} className="relative">
              {/* 스트릭 연결선 */}
              {hasStreakRight && (
                <div
                  className="absolute top-1/2 right-0 h-0.5 w-1/2 -translate-y-1/2 z-0"
                  style={{ backgroundColor: 'rgba(168,85,247,0.4)' }}
                />
              )}

              <button
                onClick={() => setSelectedDay(isSelected ? null : cell)}
                className="relative z-10 w-full aspect-square rounded-lg flex flex-col items-center justify-center transition-all"
                style={{
                  backgroundColor: isSelected
                    ? 'rgba(168,85,247,0.4)'
                    : scoreToColor(cell.normalizedScore, opacity),
                  border: cell.isToday ? '1.5px solid rgba(255,255,255,0.7)' : 'none',
                  transform: isSelected ? 'scale(0.95)' : undefined,
                }}
              >
                <span
                  className="text-xs font-bold leading-none"
                  style={{ color: cell.isToday ? 'white' : `rgba(255,255,255,${opacity * 0.9})` }}
                >
                  {cell.day}
                </span>
                {cell.isVisited && (
                  <span className="text-[8px] leading-none mt-0.5 opacity-80">✓</span>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* 선택한 날 카테고리 점수 */}
      {selectedDay && (
        <div className="mt-4 p-4 rounded-xl bg-white/5 animate-fade-in-up">
          <p className="text-white/60 text-xs mb-3 text-center">
            {selectedDay.date} {selectedDay.isVisited ? '✓ 방문한 날' : ''}
          </p>
          <div className="space-y-2">
            {categoryMeta.map(({ key, label, icon }) => {
              const score = selectedDay.categoryScores[key] ?? selectedDay.normalizedScore;
              return (
                <div key={key} className="flex items-center gap-2">
                  <span className="text-sm w-4">{icon}</span>
                  <span className="text-xs text-white/60 w-10">{label}</span>
                  <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${score}%`,
                        backgroundColor: scoreToColor(score, 1),
                      }}
                    />
                  </div>
                  <span className="text-xs text-white/80 w-7 text-right tabular-nums">{score}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 범례 */}
      <div className="flex justify-center gap-3 mt-3 text-[10px] text-white/40">
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm inline-block" style={{ backgroundColor: 'rgba(239,68,68,0.6)' }} />낮음</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm inline-block" style={{ backgroundColor: 'rgba(168,85,247,0.6)' }} />보통</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm inline-block" style={{ backgroundColor: 'rgba(34,197,94,0.6)' }} />좋음</span>
        <span className="flex items-center gap-1">✓ 방문</span>
      </div>
    </div>
  );
}
