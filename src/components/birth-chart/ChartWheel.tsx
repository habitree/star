'use client';

import type { ZodiacSignId } from '@/types';

interface ChartWheelProps {
  sunSign: ZodiacSignId;
  moonSign: ZodiacSignId;
  risingSign: ZodiacSignId;
}

// 별자리 심볼
const zodiacSymbols: Record<ZodiacSignId, string> = {
  aries: '\u2648',
  taurus: '\u2649',
  gemini: '\u264A',
  cancer: '\u264B',
  leo: '\u264C',
  virgo: '\u264D',
  libra: '\u264E',
  scorpio: '\u264F',
  sagittarius: '\u2650',
  capricorn: '\u2651',
  aquarius: '\u2652',
  pisces: '\u2653',
};

// 별자리 순서
const zodiacOrder: ZodiacSignId[] = [
  'aries',
  'taurus',
  'gemini',
  'cancer',
  'leo',
  'virgo',
  'libra',
  'scorpio',
  'sagittarius',
  'capricorn',
  'aquarius',
  'pisces',
];

export default function ChartWheel({
  sunSign,
  moonSign,
  risingSign,
}: ChartWheelProps) {
  const size = 300;
  const center = size / 2;
  const outerRadius = size / 2 - 10;
  const innerRadius = outerRadius - 40;
  const planetRadius = innerRadius - 30;

  // 각 별자리의 각도 계산
  const getAngleForSign = (sign: ZodiacSignId): number => {
    const index = zodiacOrder.indexOf(sign);
    // 시작점을 위쪽(12시 방향)으로, 시계 방향으로 진행
    return index * 30 - 90;
  };

  // 각도를 라디안으로 변환
  const toRadians = (degrees: number): number => (degrees * Math.PI) / 180;

  // 극좌표를 직교좌표로 변환
  const polarToCartesian = (
    centerX: number,
    centerY: number,
    radius: number,
    angleInDegrees: number
  ) => {
    const angleInRadians = toRadians(angleInDegrees);
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  };

  // 호(arc) 경로 생성
  const describeArc = (
    x: number,
    y: number,
    radius: number,
    startAngle: number,
    endAngle: number
  ): string => {
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

    return [
      'M',
      start.x,
      start.y,
      'A',
      radius,
      radius,
      0,
      largeArcFlag,
      0,
      end.x,
      end.y,
    ].join(' ');
  };

  // 행성 위치 계산
  const getPlanetPosition = (sign: ZodiacSignId, radius: number) => {
    const angle = getAngleForSign(sign) + 15; // 별자리 중앙에 위치
    return polarToCartesian(center, center, radius, angle);
  };

  const sunPos = getPlanetPosition(sunSign, planetRadius);
  const moonPos = getPlanetPosition(moonSign, planetRadius - 25);
  const risingPos = getPlanetPosition(risingSign, outerRadius + 5);

  return (
    <div className="relative">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-90"
      >
        {/* 배경 원 */}
        <circle
          cx={center}
          cy={center}
          r={outerRadius}
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="2"
        />
        <circle
          cx={center}
          cy={center}
          r={innerRadius}
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="1"
        />
        <circle
          cx={center}
          cy={center}
          r={planetRadius - 10}
          fill="none"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="1"
        />

        {/* 12칸 구분선 */}
        {zodiacOrder.map((_, index) => {
          const angle = index * 30 - 90;
          const start = polarToCartesian(center, center, innerRadius, angle);
          const end = polarToCartesian(center, center, outerRadius, angle);
          return (
            <line
              key={index}
              x1={start.x}
              y1={start.y}
              x2={end.x}
              y2={end.y}
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="1"
            />
          );
        })}

        {/* 별자리 배경색 */}
        {zodiacOrder.map((sign, index) => {
          const startAngle = index * 30 - 90;
          const endAngle = startAngle + 30;
          const midRadius = (innerRadius + outerRadius) / 2;

          // 별자리별 원소에 따른 색상
          const elementColors: Record<string, string> = {
            aries: 'rgba(239, 68, 68, 0.15)',
            leo: 'rgba(239, 68, 68, 0.15)',
            sagittarius: 'rgba(239, 68, 68, 0.15)',
            taurus: 'rgba(34, 197, 94, 0.15)',
            virgo: 'rgba(34, 197, 94, 0.15)',
            capricorn: 'rgba(34, 197, 94, 0.15)',
            gemini: 'rgba(59, 130, 246, 0.15)',
            libra: 'rgba(59, 130, 246, 0.15)',
            aquarius: 'rgba(59, 130, 246, 0.15)',
            cancer: 'rgba(139, 92, 246, 0.15)',
            scorpio: 'rgba(139, 92, 246, 0.15)',
            pisces: 'rgba(139, 92, 246, 0.15)',
          };

          const path = `
            ${describeArc(center, center, innerRadius, startAngle, endAngle)}
            L ${polarToCartesian(center, center, outerRadius, endAngle).x} ${polarToCartesian(center, center, outerRadius, endAngle).y}
            ${describeArc(center, center, outerRadius, startAngle, endAngle).replace('M', 'L').split(' ').reverse().join(' ')}
            Z
          `;

          return (
            <path
              key={sign}
              d={describeArc(center, center, midRadius, startAngle, endAngle)}
              fill="none"
              stroke={elementColors[sign]}
              strokeWidth={outerRadius - innerRadius}
              strokeLinecap="butt"
            />
          );
        })}

        {/* 별자리 심볼 */}
        {zodiacOrder.map((sign, index) => {
          const angle = index * 30 - 90 + 15;
          const pos = polarToCartesian(
            center,
            center,
            (innerRadius + outerRadius) / 2,
            angle
          );
          const isActive =
            sign === sunSign || sign === moonSign || sign === risingSign;

          return (
            <text
              key={sign}
              x={pos.x}
              y={pos.y}
              textAnchor="middle"
              dominantBaseline="central"
              className={`
                text-lg transform rotate-90 origin-center
                ${isActive ? 'fill-white' : 'fill-white/40'}
              `}
              style={{
                transform: `rotate(90deg)`,
                transformOrigin: `${pos.x}px ${pos.y}px`,
              }}
            >
              {zodiacSymbols[sign]}
            </text>
          );
        })}

        {/* 태양 위치 */}
        <circle
          cx={sunPos.x}
          cy={sunPos.y}
          r="12"
          fill="url(#sunGradient)"
          className="filter drop-shadow-lg"
        />

        {/* 달 위치 */}
        <circle
          cx={moonPos.x}
          cy={moonPos.y}
          r="10"
          fill="url(#moonGradient)"
          className="filter drop-shadow-lg"
        />

        {/* 상승궁 표시 */}
        <g transform={`translate(${risingPos.x}, ${risingPos.y})`}>
          <polygon
            points="0,-8 6,6 -6,6"
            fill="url(#risingGradient)"
            className="filter drop-shadow-lg"
            transform="rotate(90)"
          />
        </g>

        {/* 그라디언트 정의 */}
        <defs>
          <radialGradient id="sunGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FCD34D" />
            <stop offset="100%" stopColor="#F97316" />
          </radialGradient>
          <radialGradient id="moonGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#93C5FD" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </radialGradient>
          <linearGradient id="risingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F472B6" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
        </defs>
      </svg>

      {/* 범례 */}
      <div className="flex justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-gradient-to-br from-yellow-300 to-orange-500" />
          <span className="text-white/70 text-sm">Sun</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-gradient-to-br from-blue-300 to-purple-500" />
          <span className="text-white/70 text-sm">Moon</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-b-[10px] border-l-transparent border-r-transparent border-b-pink-500" />
          <span className="text-white/70 text-sm">Rising</span>
        </div>
      </div>
    </div>
  );
}
