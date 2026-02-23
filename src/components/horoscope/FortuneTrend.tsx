'use client';

import type { FortuneTrendPoint } from '@/types/horoscope-extended';

interface FortuneTrendProps {
  data: FortuneTrendPoint[];
}

export default function FortuneTrend({ data }: FortuneTrendProps) {
  if (data.length === 0) return null;

  const width = 280;
  const height = 120;
  const padding = { top: 15, right: 15, bottom: 25, left: 30 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  const minScore = Math.min(...data.map(d => d.score)) - 1;
  const maxScore = Math.max(...data.map(d => d.score)) + 1;
  const range = maxScore - minScore || 1;

  const xStep = chartW / (data.length - 1);
  const toX = (i: number) => padding.left + i * xStep;
  const toY = (score: number) => padding.top + chartH - ((score - minScore) / range) * chartH;

  const pathD = data.map((d, i) =>
    `${i === 0 ? 'M' : 'L'} ${toX(i).toFixed(1)} ${toY(d.score).toFixed(1)}`
  ).join(' ');

  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-semibold text-white mb-4 text-center">
        주간 운세 트렌드
      </h3>

      <div className="flex justify-center">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full max-w-[350px]">
          {/* 그리드 라인 */}
          {[0, 0.5, 1].map((frac) => {
            const y = padding.top + chartH * (1 - frac);
            const val = Math.round(minScore + range * frac);
            return (
              <g key={frac}>
                <line
                  x1={padding.left} y1={y}
                  x2={width - padding.right} y2={y}
                  stroke="rgba(255,255,255,0.08)"
                />
                <text x={padding.left - 5} y={y + 3} fill="rgba(255,255,255,0.3)" fontSize="8" textAnchor="end">
                  {val}
                </text>
              </g>
            );
          })}

          {/* 영역 채우기 */}
          <path
            d={`${pathD} L ${toX(data.length - 1)} ${padding.top + chartH} L ${padding.left} ${padding.top + chartH} Z`}
            fill="url(#trendGradient)"
          />
          <defs>
            <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(168,85,247,0.3)" />
              <stop offset="100%" stopColor="rgba(168,85,247,0)" />
            </linearGradient>
          </defs>

          {/* 라인 */}
          <path
            d={pathD}
            fill="none"
            stroke="#a855f7"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* 포인트 + 레이블 */}
          {data.map((d, i) => (
            <g key={i}>
              <circle
                cx={toX(i)} cy={toY(d.score)}
                r={d.isToday ? 5 : 3}
                fill={d.isToday ? '#a855f7' : 'rgba(168,85,247,0.5)'}
                stroke={d.isToday ? 'white' : 'none'}
                strokeWidth={d.isToday ? 2 : 0}
              />
              <text
                x={toX(i)} y={height - 5}
                fill={d.isToday ? 'white' : 'rgba(255,255,255,0.4)'}
                fontSize="9"
                textAnchor="middle"
                fontWeight={d.isToday ? 'bold' : 'normal'}
              >
                {d.dayLabel}
              </text>
              {d.isToday && (
                <text
                  x={toX(i)} y={toY(d.score) - 10}
                  fill="white" fontSize="9" textAnchor="middle" fontWeight="bold"
                >
                  {d.score}
                </text>
              )}
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}
