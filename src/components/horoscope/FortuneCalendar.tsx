'use client';

/**
 * FortuneCalendar — 운세 히트맵 캘린더
 *
 * 2025-2026 트렌드 디자인:
 *  - 5단계 점수 색상 그라데이션 (우주 테마)
 *  - 카테고리별 색상 전환 탭 (FortuneTrend 통일)
 *  - 월간 통계 스트립 (평균·스트릭·방문일)
 *  - 오늘 펄스 링 애니메이션 (트리거)
 *  - 👑 이달 최고의 날 왕관 (가변 보상)
 *  - 🔥 스트릭 연결선 (손실 회피)
 *  - 선택일 확장 카드 (카테고리별 색상 바)
 *  - 미래일 shimmer 힌트 (자이가르닉)
 */

import { useState, useMemo } from 'react';
import type { CalendarDayData, TrendCategory } from '@/types/horoscope-extended';

interface FortuneCalendarProps {
  data: CalendarDayData[];
  year: number;
  month: number;
  onMonthChange: (delta: number) => void;
  visitStreak?: number;
  locale?: string;
}

// ── 다국어 ──────────────────────────────────────────────────────────────
const CAL_TEXT = {
  ko: {
    days: ['일', '월', '화', '수', '목', '금', '토'],
    months: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
    calendarSuffix: '운세 캘린더', yearSuffix: '년 ', prevMonth: '이전 달', nextMonth: '다음 달',
    avgLabel: '월평균', streakLabel: '🔥 연속', visitLabel: '✅ 방문', dayUnit: '일',
    visited: '✓ 방문한 날', notVisited: '미방문', bestDayBadge: '🏆 이달 최고의 날',
    catLabels: { overall: '종합', love: '연애', career: '직장', health: '건강', money: '금전' },
    scoreTiers: { top: '최고', good: '좋음', avg: '보통', caution: '주의', low: '낮음', bestMonth: '이달 최고' },
  },
  en: {
    days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    months: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    calendarSuffix: 'Fortune Calendar', yearSuffix: ' ', prevMonth: 'Previous', nextMonth: 'Next',
    avgLabel: 'Avg', streakLabel: '🔥 Streak', visitLabel: '✅ Visits', dayUnit: 'd',
    visited: '✓ Visited', notVisited: 'Not visited', bestDayBadge: '🏆 Best day',
    catLabels: { overall: 'All', love: 'Love', career: 'Work', health: 'Health', money: 'Money' },
    scoreTiers: { top: 'Great', good: 'Good', avg: 'OK', caution: 'Low', low: 'Poor', bestMonth: 'Best' },
  },
  zh: {
    days: ['日', '一', '二', '三', '四', '五', '六'],
    months: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
    calendarSuffix: '运势日历', yearSuffix: '年', prevMonth: '上月', nextMonth: '下月',
    avgLabel: '月均', streakLabel: '🔥 连续', visitLabel: '✅ 访问', dayUnit: '天',
    visited: '✓ 已访问', notVisited: '未访问', bestDayBadge: '🏆 本月最佳',
    catLabels: { overall: '综合', love: '爱情', career: '事业', health: '健康', money: '财运' },
    scoreTiers: { top: '极好', good: '好', avg: '普通', caution: '注意', low: '差', bestMonth: '最佳' },
  },
  ja: {
    days: ['日', '月', '火', '水', '木', '金', '土'],
    months: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
    calendarSuffix: '運勢カレンダー', yearSuffix: '年', prevMonth: '前月', nextMonth: '翌月',
    avgLabel: '月平均', streakLabel: '🔥 連続', visitLabel: '✅ 訪問', dayUnit: '日',
    visited: '✓ 訪問済み', notVisited: '未訪問', bestDayBadge: '🏆 今月最高の日',
    catLabels: { overall: '総合', love: '恋愛', career: '仕事', health: '健康', money: '金運' },
    scoreTiers: { top: '最高', good: '良い', avg: '普通', caution: '注意', low: '低い', bestMonth: '最高' },
  },
  es: {
    days: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
    months: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
    calendarSuffix: 'Calendario de Fortuna', yearSuffix: ' ', prevMonth: 'Anterior', nextMonth: 'Siguiente',
    avgLabel: 'Prom', streakLabel: '🔥 Racha', visitLabel: '✅ Visitas', dayUnit: 'd',
    visited: '✓ Visitado', notVisited: 'No visitado', bestDayBadge: '🏆 Mejor día',
    catLabels: { overall: 'Gral', love: 'Amor', career: 'Trabajo', health: 'Salud', money: 'Dinero' },
    scoreTiers: { top: 'Excelente', good: 'Bueno', avg: 'Normal', caution: 'Bajo', low: 'Malo', bestMonth: 'Mejor' },
  },
} as const;
type CalLocale = keyof typeof CAL_TEXT;

// ── 카테고리 색상 시스템 (FortuneTrend와 통일) ──────────────────────────
const categoryColors: Record<TrendCategory, { icon: string; color: string; rgb: string }> = {
  overall: { icon: '⭐', color: '#a855f7', rgb: '168,85,247' },
  love:    { icon: '💕', color: '#ec4899', rgb: '236,72,153' },
  career:  { icon: '💼', color: '#3b82f6', rgb: '59,130,246' },
  health:  { icon: '🌿', color: '#22c55e', rgb: '34,197,94' },
  money:   { icon: '✨', color: '#f59e0b', rgb: '245,158,11' },
};

// ── 5단계 점수 → 우주 색상 티어 ────────────────────────────────────────
interface ScoreTier {
  gradient: string;
  glow: string;
  textColor: string;
  border: string;
  emoji: string;
  label: string;
}

function getScoreTier(score: number, tiers?: { top: string; good: string; avg: string; caution: string; low: string; bestMonth: string }): ScoreTier {
  const t = tiers ?? CAL_TEXT.ko.scoreTiers;
  if (score >= 85) return {
    gradient: 'linear-gradient(135deg, rgba(251,191,36,0.42) 0%, rgba(245,158,11,0.22) 100%)',
    glow: '0 0 14px rgba(251,191,36,0.65)',
    textColor: '#fcd34d',
    border: 'rgba(251,191,36,0.55)',
    emoji: '🌟',
    label: t.top,
  };
  if (score >= 70) return {
    gradient: 'linear-gradient(135deg, rgba(16,185,129,0.4) 0%, rgba(5,150,105,0.22) 100%)',
    glow: '0 0 12px rgba(16,185,129,0.5)',
    textColor: '#34d399',
    border: 'rgba(16,185,129,0.48)',
    emoji: '✨',
    label: t.good,
  };
  if (score >= 50) return {
    gradient: 'linear-gradient(135deg, rgba(99,102,241,0.38) 0%, rgba(139,92,246,0.18) 100%)',
    glow: '0 0 10px rgba(99,102,241,0.4)',
    textColor: '#a5b4fc',
    border: 'rgba(99,102,241,0.38)',
    emoji: '🔮',
    label: t.avg,
  };
  if (score >= 30) return {
    gradient: 'linear-gradient(135deg, rgba(249,115,22,0.38) 0%, rgba(234,88,12,0.18) 100%)',
    glow: '0 0 10px rgba(249,115,22,0.4)',
    textColor: '#fb923c',
    border: 'rgba(249,115,22,0.38)',
    emoji: '⚡',
    label: t.caution,
  };
  return {
    gradient: 'linear-gradient(135deg, rgba(239,68,68,0.38) 0%, rgba(185,28,28,0.18) 100%)',
    glow: '0 0 10px rgba(239,68,68,0.4)',
    textColor: '#fca5a5',
    border: 'rgba(239,68,68,0.38)',
    emoji: '🌑',
    label: t.low,
  };
}

// ── 오늘 날짜 문자열 ────────────────────────────────────────────────────
const todayStr = new Date().toISOString().split('T')[0];

export default function FortuneCalendar({
  data,
  year,
  month,
  onMonthChange,
  visitStreak = 0,
  locale = 'ko',
}: FortuneCalendarProps) {
  const [selectedDay, setSelectedDay] = useState<CalendarDayData | null>(null);
  const [activeCategory, setActiveCategory] = useState<TrendCategory>('overall');

  const tl = CAL_TEXT[(locale as CalLocale) in CAL_TEXT ? (locale as CalLocale) : 'ko'];
  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const catConfig = categoryColors[activeCategory];
  const categoryConfig = Object.fromEntries(
    (Object.keys(categoryColors) as TrendCategory[]).map(k => [k, { ...categoryColors[k], label: tl.catLabels[k] }])
  ) as Record<TrendCategory, { icon: string; color: string; rgb: string; label: string }>;

  // ── 월간 통계 계산 ───────────────────────────────────────────────────
  const stats = useMemo(() => {
    const past = data.filter(d => d.date <= todayStr);
    if (past.length === 0) return { avg: 0, bestDay: null, visitCount: 0 };

    const scores = past.map(d => d.categoryScores[activeCategory] ?? d.normalizedScore);
    const max = Math.max(...scores);
    const bestIdx = scores.lastIndexOf(max);
    return {
      avg: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length),
      bestDay: past[bestIdx] ?? null,
      visitCount: data.filter(d => d.isVisited).length,
    };
  }, [data, activeCategory]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── 6×7 그리드 ──────────────────────────────────────────────────────
  const cells: (CalendarDayData | null)[] = [
    ...Array(firstDayOfWeek).fill(null),
    ...data,
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  const visitedSet = new Set(data.filter(d => d.isVisited).map(d => d.date));

  return (
    <div className="glass-card p-5 overflow-hidden">

      {/* ────────────────────────────────── 헤더 ── */}
      <div className="mb-4">

        {/* 월 네비게이션 */}
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={() => { setSelectedDay(null); onMonthChange(-1); }}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all hover:scale-110 flex items-center justify-center font-bold text-base"
            aria-label={tl.prevMonth}
          >
            ‹
          </button>

          <div className="text-center">
            <h3 className="text-base font-bold text-white tracking-tight">
              <span className="text-purple-400">{year}</span>
              <span className="text-white/60 font-normal text-sm">{tl.yearSuffix}</span>
              <span className="text-white">{tl.months[month]}</span>
              <span className="text-white/60 font-normal text-sm"> {tl.calendarSuffix}</span>
            </h3>
          </div>

          <button
            onClick={() => { setSelectedDay(null); onMonthChange(1); }}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all hover:scale-110 flex items-center justify-center font-bold text-base"
            aria-label={tl.nextMonth}
          >
            ›
          </button>
        </div>

        {/* 월간 통계 스트립 */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          {/* 월평균 */}
          <div
            className="text-center py-2 px-1 rounded-xl border transition-all"
            style={{
              background: stats.avg ? getScoreTier(stats.avg, tl.scoreTiers).gradient : 'rgba(255,255,255,0.04)',
              borderColor: stats.avg ? getScoreTier(stats.avg, tl.scoreTiers).border : 'rgba(255,255,255,0.08)',
            }}
          >
            <p className="text-white/40 text-[9px] mb-0.5 leading-none">{tl.avgLabel}</p>
            <p
              className="text-sm font-bold tabular-nums leading-none"
              style={{ color: stats.avg ? getScoreTier(stats.avg, tl.scoreTiers).textColor : 'rgba(255,255,255,0.3)' }}
            >
              {stats.avg || '--'}
            </p>
          </div>
          {/* 스트릭 */}
          <div className="text-center py-2 px-1 rounded-xl border border-orange-500/25 bg-gradient-to-br from-orange-500/15 to-red-500/10">
            <p className="text-orange-300/50 text-[9px] mb-0.5 leading-none">{tl.streakLabel}</p>
            <p className="text-sm font-bold text-orange-300 leading-none tabular-nums">{visitStreak}<span className="text-[9px] font-normal text-orange-300/60">{tl.dayUnit}</span></p>
          </div>
          {/* 방문일 */}
          <div className="text-center py-2 px-1 rounded-xl border border-purple-500/25 bg-gradient-to-br from-purple-500/15 to-indigo-500/10">
            <p className="text-purple-300/50 text-[9px] mb-0.5 leading-none">{tl.visitLabel}</p>
            <p className="text-sm font-bold text-purple-300 leading-none tabular-nums">{stats.visitCount}<span className="text-[9px] font-normal text-purple-300/60">{tl.dayUnit}</span></p>
          </div>
        </div>

        {/* 카테고리 탭 */}
        <div className="flex gap-1">
          {(Object.entries(categoryConfig) as [TrendCategory, (typeof categoryConfig)[TrendCategory]][]).map(([key, cfg]) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className="flex-1 py-1.5 rounded-lg text-[11px] font-semibold transition-all duration-200"
              style={{
                background: activeCategory === key
                  ? `linear-gradient(135deg, rgba(${cfg.rgb},0.35) 0%, rgba(${cfg.rgb},0.15) 100%)`
                  : 'rgba(255,255,255,0.05)',
                color: activeCategory === key ? cfg.color : 'rgba(255,255,255,0.35)',
                border: activeCategory === key
                  ? `1px solid rgba(${cfg.rgb},0.5)`
                  : '1px solid rgba(255,255,255,0.06)',
                boxShadow: activeCategory === key ? `0 0 8px rgba(${cfg.rgb},0.25)` : 'none',
                transform: activeCategory === key ? 'scale(1.04)' : 'scale(1)',
              }}
            >
              {cfg.icon}
            </button>
          ))}
        </div>
      </div>

      {/* ────────────────────────────── 요일 헤더 ── */}
      <div className="grid grid-cols-7 gap-1 mb-1.5">
        {tl.days.map((d, i) => (
          <div
            key={d}
            className="text-center text-[10px] font-bold py-0.5 tracking-wide"
            style={{ color: i === 0 ? '#f87171' : i === 6 ? '#7dd3fc' : 'rgba(255,255,255,0.3)' }}
          >
            {d}
          </div>
        ))}
      </div>

      {/* ────────────────────────────── 날짜 그리드 ── */}
      <div className="grid grid-cols-7 gap-1">
        {cells.map((cell, idx) => {
          if (!cell) return <div key={`e-${idx}`} className="aspect-square" />;

          const score = cell.categoryScores[activeCategory] ?? cell.normalizedScore;
          const tier = getScoreTier(score, tl.scoreTiers);
          const isBestDay = stats.bestDay?.date === cell.date;
          const isSelected = selectedDay?.date === cell.date;
          const isFuture = cell.date > todayStr;

          // 스트릭 연결 (오른쪽)
          const nextD = new Date(cell.date);
          nextD.setDate(nextD.getDate() + 1);
          const hasStreakRight = cell.isVisited && visitedSet.has(nextD.toISOString().split('T')[0]);

          return (
            <div key={cell.date} className="relative">
              {/* 스트릭 연결선 */}
              {hasStreakRight && (
                <div
                  className="absolute top-1/2 right-0 h-[2px] w-[55%] -translate-y-1/2 z-0 rounded-full"
                  style={{
                    background: `linear-gradient(90deg, rgba(${catConfig.rgb},0.7), rgba(${catConfig.rgb},0.1))`,
                  }}
                />
              )}

              <button
                onClick={() => setSelectedDay(isSelected ? null : cell)}
                className="relative z-10 w-full aspect-square rounded-xl flex flex-col items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
                style={{
                  background: isFuture
                    ? 'rgba(255,255,255,0.03)'
                    : isSelected
                    ? `linear-gradient(135deg, rgba(${catConfig.rgb},0.55) 0%, rgba(${catConfig.rgb},0.25) 100%)`
                    : tier.gradient,
                  border: cell.isToday
                    ? '1.5px solid rgba(255,255,255,0.8)'
                    : isSelected
                    ? `1.5px solid rgba(${catConfig.rgb},0.75)`
                    : cell.isVisited
                    ? `1px solid ${tier.border}`
                    : '1px solid rgba(255,255,255,0.06)',
                  boxShadow: isSelected
                    ? `0 0 16px rgba(${catConfig.rgb},0.5), ${tier.glow}`
                    : cell.isToday
                    ? `0 0 14px rgba(255,255,255,0.25), ${tier.glow}`
                    : cell.isVisited
                    ? tier.glow
                    : 'none',
                  opacity: isFuture ? 0.38 : 1,
                }}
              >
                {/* 오늘 — 바깥 펄스 링 */}
                {cell.isToday && (
                  <span
                    className="absolute inset-0 rounded-xl animate-ping"
                    style={{
                      backgroundColor: tier.textColor,
                      opacity: 0.18,
                      animationDuration: '2s',
                    }}
                  />
                )}

                {/* 날짜 숫자 */}
                <span
                  className="leading-none font-bold"
                  style={{
                    fontSize: '11px',
                    color: cell.isToday
                      ? 'white'
                      : isFuture
                      ? 'rgba(255,255,255,0.28)'
                      : tier.textColor,
                  }}
                >
                  {cell.day}
                </span>

                {/* 방문 체크 */}
                {cell.isVisited && !isBestDay && (
                  <span
                    className="leading-none mt-0.5"
                    style={{ fontSize: '7px', color: tier.textColor, opacity: 0.9 }}
                  >
                    ✓
                  </span>
                )}

                {/* 👑 이달 최고의 날 */}
                {isBestDay && (
                  <span className="leading-none mt-0.5" style={{ fontSize: '8px' }}>
                    👑
                  </span>
                )}

                {/* 미래일 힌트 */}
                {isFuture && (
                  <span className="leading-none mt-0.5 opacity-40" style={{ fontSize: '7px', color: 'rgba(255,255,255,0.5)' }}>
                    ···
                  </span>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* ────────────────────────── 선택한 날 상세 카드 ── */}
      {selectedDay && (() => {
        const activeScore = selectedDay.categoryScores[activeCategory] ?? selectedDay.normalizedScore;
        const activeTier = getScoreTier(activeScore, tl.scoreTiers);
        const isBest = stats.bestDay?.date === selectedDay.date;

        return (
          <div
            className="mt-4 rounded-2xl p-4 animate-fade-in-up border"
            style={{
              background: `linear-gradient(135deg, rgba(${catConfig.rgb},0.18) 0%, rgba(0,0,0,0.35) 100%)`,
              borderColor: `rgba(${catConfig.rgb},0.35)`,
              boxShadow: `0 4px 20px rgba(${catConfig.rgb},0.15)`,
            }}
          >
            {/* 선택일 헤더 */}
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-white font-semibold text-sm">
                  {activeTier.emoji} {selectedDay.date.replace(/-/g, '.')}
                </p>
                <p className="text-white/40 text-[10px] mt-0.5">
                  {selectedDay.isVisited ? tl.visited : tl.notVisited}
                  {isBest ? ` · ${tl.bestDayBadge}` : ''}
                </p>
              </div>
              {/* 점수 원형 배지 */}
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm shrink-0"
                style={{
                  background: `radial-gradient(circle, rgba(${catConfig.rgb},0.3) 0%, rgba(${catConfig.rgb},0.1) 100%)`,
                  color: catConfig.color,
                  border: `2px solid rgba(${catConfig.rgb},0.55)`,
                  boxShadow: `0 0 12px rgba(${catConfig.rgb},0.35)`,
                }}
              >
                {activeScore}
              </div>
            </div>

            {/* 카테고리별 점수 바 */}
            <div className="space-y-2">
              {(Object.entries(categoryConfig) as [TrendCategory, { icon: string; color: string; rgb: string; label: string }][]).map(([key, cfg]) => {
                const s = selectedDay.categoryScores[key] ?? selectedDay.normalizedScore;
                const isActive = key === activeCategory;
                return (
                  <div key={key} className="flex items-center gap-2">
                    <span className="text-sm w-5 text-center shrink-0">{cfg.icon}</span>
                    <span
                      className="text-[10px] w-8 shrink-0 font-medium"
                      style={{ color: isActive ? cfg.color : 'rgba(255,255,255,0.45)' }}
                    >
                      {cfg.label}
                    </span>
                    <div className="flex-1 h-2 rounded-full overflow-hidden bg-white/8">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${s}%`,
                          background: isActive
                            ? `linear-gradient(90deg, ${cfg.color}, ${cfg.color}cc)`
                            : `rgba(${cfg.rgb},0.6)`,
                          boxShadow: isActive ? `0 0 6px rgba(${cfg.rgb},0.5)` : 'none',
                        }}
                      />
                    </div>
                    <span
                      className="text-[11px] font-bold w-7 text-right tabular-nums shrink-0"
                      style={{ color: isActive ? cfg.color : 'rgba(255,255,255,0.55)' }}
                    >
                      {s}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })()}

      {/* ────────────────────────────────── 범례 ── */}
      <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 mt-3.5">
        {[
          { emoji: '🌑', label: tl.scoreTiers.low,     color: '#fca5a5' },
          { emoji: '⚡', label: tl.scoreTiers.caution, color: '#fb923c' },
          { emoji: '🔮', label: tl.scoreTiers.avg,     color: '#a5b4fc' },
          { emoji: '✨', label: tl.scoreTiers.good,    color: '#34d399' },
          { emoji: '🌟', label: tl.scoreTiers.top,     color: '#fcd34d' },
          { emoji: '👑', label: tl.scoreTiers.bestMonth, color: '#fcd34d' },
        ].map(({ emoji, label, color }) => (
          <span
            key={label}
            className="flex items-center gap-0.5 text-[9px]"
            style={{ color }}
          >
            {emoji} {label}
          </span>
        ))}
      </div>
    </div>
  );
}
