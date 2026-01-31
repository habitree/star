'use client';

interface ScoreBarProps {
  score: 1 | 2 | 3 | 4 | 5;
  label?: string;
  variant?: 'stars' | 'bar';
  showValue?: boolean;
}

export default function ScoreBar({
  score,
  label,
  variant = 'stars',
  showValue = false,
}: ScoreBarProps) {
  const percentage = (score / 5) * 100;

  if (variant === 'bar') {
    return (
      <div className="w-full">
        {label && (
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-white/70">{label}</span>
            {showValue && (
              <span className="text-sm font-medium text-white">{score}/5</span>
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

  // Stars variant
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
        <span className="text-sm font-medium text-white ml-2">{score}/5</span>
      )}
    </div>
  );
}

// Additional component for displaying multiple scores
interface ScoreGridProps {
  scores: {
    label: string;
    score: 1 | 2 | 3 | 4 | 5;
  }[];
  variant?: 'stars' | 'bar';
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
          showValue={variant === 'bar'}
        />
      ))}
    </div>
  );
}
