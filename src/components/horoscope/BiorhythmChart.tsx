'use client';

import type { BiorhythmData } from '@/types/horoscope-extended';

interface BiorhythmChartProps {
  data: BiorhythmData[];
}

export default function BiorhythmChart({ data }: BiorhythmChartProps) {
  if (data.length === 0) return null;

  const width = 320;
  const height = 160;
  const padding = { top: 20, right: 20, bottom: 30, left: 35 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  const xStep = chartW / (data.length - 1);

  const toY = (value: number) => {
    // value: -100 ~ 100 → padding.top ~ padding.top + chartH
    return padding.top + chartH / 2 - (value / 100) * (chartH / 2);
  };

  const toX = (i: number) => padding.left + i * xStep;

  const buildPath = (key: 'physical' | 'emotional' | 'intellectual') => {
    return data.map((d, i) =>
      `${i === 0 ? 'M' : 'L'} ${toX(i).toFixed(1)} ${toY(d[key]).toFixed(1)}`
    ).join(' ');
  };

  // 7일 데이터 중 4번째(index 3)가 항상 오늘
  const todayIndex = 3;

  const lines = [
    { key: 'physical' as const, color: '#ef4444', label: '신체' },
    { key: 'emotional' as const, color: '#3b82f6', label: '감정' },
    { key: 'intellectual' as const, color: '#eab308', label: '지성' },
  ];

  const dayLabels = data.map(d => {
    const date = new Date(d.date);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  });

  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-semibold text-white mb-4 text-center">
        바이오리듬
      </h3>

      {/* 범례 */}
      <div className="flex justify-center gap-4 mb-3">
        {lines.map(({ label, color }) => (
          <div key={label} className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 rounded" style={{ backgroundColor: color }} />
            <span className="text-xs text-white/60">{label}</span>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full max-w-[400px]">
          {/* 0선 */}
          <line
            x1={padding.left} y1={toY(0)}
            x2={width - padding.right} y2={toY(0)}
            stroke="rgba(255,255,255,0.15)" strokeDasharray="4 4"
          />

          {/* Y축 레이블 */}
          {[100, 0, -100].map(v => (
            <text
              key={v} x={padding.left - 5} y={toY(v) + 3}
              fill="rgba(255,255,255,0.4)" fontSize="9" textAnchor="end"
            >
              {v}
            </text>
          ))}

          {/* 라인들 */}
          {lines.map(({ key, color }) => (
            <path
              key={key}
              d={buildPath(key)}
              fill="none"
              stroke={color}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}

          {/* 오늘 마커 */}
          {todayIndex >= 0 && (
            <>
              <line
                x1={toX(todayIndex)} y1={padding.top}
                x2={toX(todayIndex)} y2={height - padding.bottom}
                stroke="rgba(255,255,255,0.2)" strokeDasharray="3 3"
              />
              {lines.map(({ key, color }) => (
                <circle
                  key={key}
                  cx={toX(todayIndex)}
                  cy={toY(data[todayIndex][key])}
                  r="4"
                  fill={color}
                  stroke="white"
                  strokeWidth="1.5"
                />
              ))}
            </>
          )}

          {/* X축 날짜 레이블 */}
          {dayLabels.map((label, i) => (
            <text
              key={i}
              x={toX(i)}
              y={height - 5}
              fill={i === todayIndex ? 'white' : 'rgba(255,255,255,0.4)'}
              fontSize="9"
              textAnchor="middle"
              fontWeight={i === todayIndex ? 'bold' : 'normal'}
            >
              {label}
            </text>
          ))}
        </svg>
      </div>

      {/* 오늘 수치 */}
      {todayIndex >= 0 && (
        <div className="grid grid-cols-3 gap-3 mt-4">
          {lines.map(({ key, color, label }) => {
            const value = data[todayIndex][key];
            return (
              <div key={key} className="text-center p-2 rounded-lg bg-white/5">
                <p className="text-xs text-white/50 mb-1">{label}</p>
                <p className="text-lg font-bold" style={{ color }}>
                  {value > 0 ? '+' : ''}{value}%
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
