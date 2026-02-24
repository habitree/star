'use client';

import type { SubIndicator } from '@/types';

interface ScoreBarProps {
  score: 1 | 2 | 3 | 4 | 5;
  label?: string;
  variant?: 'stars' | 'bar' | 'detailed';
  showValue?: boolean;
  detailedScore?: number;
  subIndicators?: SubIndicator[];
}

export default function ScoreBar({
  score,
  label,
  variant = 'stars',
  showValue = false,
  detailedScore,
  subIndicators,
}: ScoreBarProps) {
  const percentage = detailedScore != null ? detailedScore : (score / 5) * 100;

  if (variant === 'bar') {
    return (
      <div className="w-full">
        {label && (
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-white/70">{label}</span>
            {showValue && (
              <span className="text-sm font-medium text-white">
                {detailedScore != null ? `${detailedScore}점` : `${score}/5`}
              </span>
            )}
          </div>
        )}
        <div className="score-bar">
          <div
            className="score-bar-fill"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    );
  }

  if (variant === 'detailed') {
    // 세밀 점수 → 0-5 소수 (반별 렌더링)
    const starValue = detailedScore != null ? (detailedScore / 100) * 5 : score;
    const fullStars = Math.floor(starValue);
    const hasHalf = (starValue - fullStars) >= 0.25 && (starValue - fullStars) < 0.75;
    const roundedUp = (starValue - fullStars) >= 0.75;

    return (
      <div className="w-full space-y-3">
        {/* 별점 + 퍼센트 바 */}
        <div className="flex items-center gap-3">
          {label && <span className="text-sm text-white/70 min-w-[52px]">{label}</span>}
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => {
              const isFull = star <= fullStars || (star === fullStars + 1 && roundedUp);
              const isHalf = !isFull && star === fullStars + 1 && hasHalf;
              return (
                <span key={star} className="relative text-lg leading-none">
                  {isFull ? (
                    <span className="star-filled">&#x2605;</span>
                  ) : isHalf ? (
                    <span className="star-half-container">
                      <span className="star-empty absolute inset-0">&#x2605;</span>
                      <span className="star-half star-filled">&#x2605;</span>
                    </span>
                  ) : (
                    <span className="star-empty">&#x2605;</span>
                  )}
                </span>
              );
            })}
          </div>
          {detailedScore != null && (
            <span className="text-sm font-bold text-white ml-auto tabular-nums">
              {detailedScore}점
            </span>
          )}
        </div>

        {/* 퍼센트 바 */}
        <div className="score-bar h-1.5">
          <div
            className="score-bar-fill"
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* 서브지표 */}
        {subIndicators && subIndicators.length > 0 && (
          <div className="grid grid-cols-3 gap-2 mt-2">
            {subIndicators.map((si) => (
              <div key={si.key} className="text-center">
                <span className="text-[10px] text-white/40 block mb-0.5">{si.label}</span>
                <div className="sub-indicator-bar">
                  <div
                    className="sub-indicator-fill"
                    style={{ width: `${si.score}%` }}
                  />
                </div>
                <span className="text-[10px] text-white/50 block mt-0.5">{si.score}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Stars variant (default)
  return (
    <div className="flex items-center gap-2">
      {label && <span className="text-sm text-white/70 mr-2">{label}</span>}
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`text-lg ${
              star <= score ? 'star-filled' : 'star-empty'
            }`}
          >
            &#x2605;
          </span>
        ))}
      </div>
      {showValue && (
        <span className="text-sm font-medium text-white ml-2">
          {detailedScore != null ? `${detailedScore}점` : `${score}/5`}
        </span>
      )}
    </div>
  );
}

// Additional component for displaying multiple scores
interface ScoreGridProps {
  scores: {
    label: string;
    score: 1 | 2 | 3 | 4 | 5;
    detailedScore?: number;
    subIndicators?: SubIndicator[];
  }[];
  variant?: 'stars' | 'bar' | 'detailed';
}

export function ScoreGrid({ scores, variant = 'bar' }: ScoreGridProps) {
  return (
    <div className="space-y-4">
      {scores.map((item, index) => (
        <ScoreBar
          key={index}
          label={item.label}
          score={item.score}
          variant={variant}
          showValue={variant === 'bar' || variant === 'detailed'}
          detailedScore={item.detailedScore}
          subIndicators={item.subIndicators}
        />
      ))}
    </div>
  );
}
