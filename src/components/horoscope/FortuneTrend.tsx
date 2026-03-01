'use client';

import { useState, useRef } from 'react';
import type { ExtendedTrendPoint, TrendCategory } from '@/types/horoscope-extended';

interface FortuneTrendProps {
  data: ExtendedTrendPoint[];
}

const categoryConfig: Record<TrendCategory, { label: string; icon: string; color: string }> = {
  overall: { label: '종합', icon: '⭐', color: '#a855f7' },
  love:    { label: '연애', icon: '❤️', color: '#ec4899' },
  career:  { label: '직장', icon: '💼', color: '#3b82f6' },
  health:  { label: '건강', icon: '🏥', color: '#22c55e' },
  money:   { label: '금전', icon: '💰', color: '#f59e0b' },
};

function buildBezierPath(pts: { x: number; y: number }[]): string {
  if (pts.length < 2) return '';
  let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
  for (let i = 1; i < pts.length; i++) {
    const p0 = pts[i - 1];
    const p1 = pts[i];
    const cp1x = (p0.x + (p1.x - p0.x) / 3).toFixed(1);
    const cp2x = (p1.x - (p1.x - p0.x) / 3).toFixed(1);
    d += ` C ${cp1x} ${p0.y.toFixed(1)}, ${cp2x} ${p1.y.toFixed(1)}, ${p1.x.toFixed(1)} ${p1.y.toFixed(1)}`;
  }
  return d;
}

export default function FortuneTrend({ data }: FortuneTrendProps) {
  const [category, setCategory] = useState<TrendCategory>('overall');
  const scrollRef = useRef<HTMLDivElement>(null);

  if (data.length === 0) return null;

  const cfg = categoryConfig[category];
  const scores = data.map(d =>
    category === 'overall' ? d.normalizedScore : (d.categoryScores[category] ?? d.normalizedScore)
  );

  // Chart dimensions
  const pointSpacing = 11;
  const padL = 28;
  const padR = 10;
  const padT = 24;
  const padB = 28;
  const chartH = 110;
  const svgH = padT + chartH + padB;
  const svgW = padL + data.length * pointSpacing + padR;

  const minScore = Math.max(0, Math.min(...scores) - 8);
  const maxScore = Math.min(100, Math.max(...scores) + 8);
  const range = maxScore - minScore || 1;

  const toX = (i: number) => padL + i * pointSpacing;
  const toY = (s: number) => padT + chartH - ((s - minScore) / range) * chartH;

  const todayIdx = data.findIndex(d => d.isToday);

  const allPts = scores.map((s, i) => ({ x: toX(i), y: toY(s) }));
  const pastPts = allPts.slice(0, todayIdx + 1);
  const futurePts = todayIdx >= 0 ? allPts.slice(todayIdx) : [];
  const pastPath = buildBezierPath(pastPts);
  const futurePath = buildBezierPath(futurePts);
  const todayX = todayIdx >= 0 ? toX(todayIdx) : null;
  const todayY = todayIdx >= 0 ? toY(scores[todayIdx]) : null;

  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-semibold text-white mb-3 text-center">30일 운세 트렌드</h3>

      {/* 카테고리 탭 */}
      <div className="flex justify-center gap-1 mb-4 flex-wrap">
        {(Object.keys(categoryConfig) as TrendCategory[]).map(cat => {
          const active = cat === category;
          const c = categoryConfig[cat];
          return (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className="px-2.5 py-1 rounded-full text-xs font-medium transition-all"
              style={active
                ? { backgroundColor: `${c.color}33`, color: 'white', border: `1px solid ${c.color}66` }
                : { backgroundColor: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)' }
              }
            >
              {c.icon} {c.label}
            </button>
          );
        })}
      </div>

      {/* 스크롤 가능한 차트 */}
      <div ref={scrollRef} className="overflow-x-auto pb-1" style={{ scrollbarWidth: 'thin' }}>
        <svg width={svgW} height={svgH}>
          <defs>
            <linearGradient id={`tg-${category}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={cfg.color} stopOpacity="0.25" />
              <stop offset="100%" stopColor={cfg.color} stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* 그리드 라인 */}
          {[0, 0.25, 0.5, 0.75, 1].map(frac => {
            const y = padT + chartH * (1 - frac);
            const val = Math.round(minScore + range * frac);
            return (
              <g key={frac}>
                <line x1={padL} y1={y} x2={svgW - padR} y2={y} stroke="rgba(255,255,255,0.06)" />
                <text x={padL - 4} y={y + 3} fill="rgba(255,255,255,0.25)" fontSize="7" textAnchor="end">{val}</text>
              </g>
            );
          })}

          {/* 오늘 세로 기준선 */}
          {todayX !== null && (
            <>
              <line
                x1={todayX} y1={padT} x2={todayX} y2={padT + chartH}
                stroke="rgba(255,255,255,0.25)" strokeDasharray="4 3" strokeWidth="1"
              />
              <text x={todayX} y={padT - 6} fill="white" fontSize="8" textAnchor="middle" fontWeight="bold">오늘</text>
            </>
          )}

          {/* 과거 영역 채우기 */}
          {pastPath && todayIdx >= 0 && (
            <path
              d={`${pastPath} L ${toX(todayIdx)} ${padT + chartH} L ${padL} ${padT + chartH} Z`}
              fill={`url(#tg-${category})`}
            />
          )}

          {/* 과거 라인 (실선) */}
          {pastPath && (
            <path d={pastPath} fill="none" stroke={cfg.color} strokeWidth="2" strokeLinecap="round" />
          )}

          {/* 미래 라인 (점선) */}
          {futurePath && (
            <path
              d={futurePath} fill="none"
              stroke={cfg.color} strokeWidth="1.5"
              strokeDasharray="5 4" strokeLinecap="round" opacity="0.45"
            />
          )}

          {/* 데이터 포인트 */}
          {data.map((d, i) => {
            const x = toX(i);
            const y = toY(scores[i]);

            if (d.isToday) {
              return (
                <g key={i}>
                  <circle cx={x} cy={y} r={8} fill={cfg.color} opacity="0.2" />
                  <circle cx={x} cy={y} r={5} fill={cfg.color} stroke="white" strokeWidth="1.5" />
                </g>
              );
            }
            if (d.isFuture) {
              return <circle key={i} cx={x} cy={y} r={2} fill="none" stroke={cfg.color} strokeWidth="1" opacity="0.4" />;
            }
            if (d.isVisited) {
              return <circle key={i} cx={x} cy={y} r={3} fill={cfg.color} stroke="white" strokeWidth="1" />;
            }
            return <circle key={i} cx={x} cy={y} r={2} fill="none" stroke={cfg.color} strokeWidth="1" opacity="0.35" />;
          })}

          {/* 날짜 레이블 — 오늘 + 매 7번째 */}
          {data.map((d, i) => {
            if (!d.isToday && i % 7 !== 0) return null;
            return (
              <text
                key={i}
                x={toX(i)} y={svgH - 4}
                fill={d.isToday ? 'white' : 'rgba(255,255,255,0.3)'}
                fontSize="7" textAnchor="middle"
                fontWeight={d.isToday ? 'bold' : 'normal'}
              >
                {d.isToday ? '오늘' : d.dayLabel}
              </text>
            );
          })}

          {/* 오늘 점수 표시 */}
          {todayX !== null && todayY !== null && (
            <text x={todayX} y={todayY - 10} fill="white" fontSize="9" textAnchor="middle" fontWeight="bold">
              {scores[todayIdx]}
            </text>
          )}
        </svg>
      </div>

      {/* 범례 */}
      <div className="flex justify-center gap-4 mt-2 text-xs text-white/40">
        <span style={{ color: cfg.color }}>● 방문한 날</span>
        <span>○ 미방문</span>
        <span className="opacity-60">- - 미래 예측</span>
      </div>
    </div>
  );
}
