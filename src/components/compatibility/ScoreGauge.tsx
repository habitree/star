'use client';

interface ScoreGaugeProps {
  score: number; // 0-100
  size?: number;
  strokeWidth?: number;
  color?: string;
  backgroundColor?: string;
  showLabel?: boolean;
  label?: string;
  animated?: boolean;
}

export default function ScoreGauge({
  score,
  size = 120,
  strokeWidth = 8,
  color,
  backgroundColor = 'rgba(255, 255, 255, 0.1)',
  showLabel = true,
  label,
  animated = true,
}: ScoreGaugeProps) {
  // 점수에 따른 색상 결정
  const getScoreColor = (score: number): string => {
    if (color) return color;
    if (score >= 85) return '#22C55E'; // green-500
    if (score >= 70) return '#3B82F6'; // blue-500
    if (score >= 55) return '#F59E0B'; // amber-500
    if (score >= 40) return '#F97316'; // orange-500
    return '#EF4444'; // red-500
  };

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const scoreColor = getScoreColor(score);

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg
        width={size}
        height={size}
        className={`transform -rotate-90 ${animated ? 'transition-all duration-1000 ease-out' : ''}`}
      >
        {/* 배경 원 */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
        />
        {/* 진행 원 */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={scoreColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={animated ? strokeDashoffset : strokeDashoffset}
          strokeLinecap="round"
          className={animated ? 'transition-all duration-1000 ease-out' : ''}
          style={{
            filter: `drop-shadow(0 0 6px ${scoreColor}40)`,
          }}
        />
      </svg>
      {/* 중앙 텍스트 */}
      {showLabel && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="font-bold"
            style={{
              fontSize: size * 0.28,
              color: scoreColor,
              textShadow: `0 0 10px ${scoreColor}40`,
            }}
          >
            {score}
          </span>
          {label && (
            <span
              className="text-white/60"
              style={{ fontSize: size * 0.12 }}
            >
              {label}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
