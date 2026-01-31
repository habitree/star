'use client';

// Size variants in pixels
const sizeMap = {
  sm: 32,
  md: 48,
  lg: 64,
} as const;

type Size = keyof typeof sizeMap;

interface LoadingSpinnerProps {
  size?: Size;
  text?: string;
}

export default function LoadingSpinner({
  size = 'md',
  text,
}: LoadingSpinnerProps) {
  const pixelSize = sizeMap[size];

  // Zodiac symbols for the spinner
  const zodiacSymbols = [
    '\u2648', // Aries
    '\u2649', // Taurus
    '\u264A', // Gemini
    '\u264B', // Cancer
    '\u264C', // Leo
    '\u264D', // Virgo
    '\u264E', // Libra
    '\u264F', // Scorpio
    '\u2650', // Sagittarius
    '\u2651', // Capricorn
    '\u2652', // Aquarius
    '\u2653', // Pisces
  ];

  // Text size based on spinner size
  const textSizeClass = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  }[size];

  // Symbol size based on spinner size
  const symbolSize = {
    sm: 8,
    md: 10,
    lg: 14,
  }[size];

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes spin-reverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }
        @keyframes pulse-opacity {
          0%,
          100% {
            opacity: 0.4;
          }
          50% {
            opacity: 1;
          }
        }
        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
        .spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        .spin-reverse {
          animation: spin-reverse 12s linear infinite;
        }
        .pulse-opacity {
          animation: pulse-opacity 2s ease-in-out infinite;
        }
      `}</style>

      <div
        className="relative"
        style={{ width: pixelSize, height: pixelSize }}
        role="status"
        aria-label="Loading"
      >
        {/* Outer ring - zodiac wheel */}
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 w-full h-full spin-slow"
        >
          {/* Outer glow circle */}
          <circle
            cx="50"
            cy="50"
            r="46"
            fill="none"
            stroke="url(#zodiacGradient)"
            strokeWidth="1"
            opacity="0.3"
          />

          {/* Zodiac symbols positioned around the circle */}
          {zodiacSymbols.map((symbol, index) => {
            const angle = (index * 30 - 90) * (Math.PI / 180);
            const x = 50 + 38 * Math.cos(angle);
            const y = 50 + 38 * Math.sin(angle);
            return (
              <text
                key={index}
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="white"
                fontSize={symbolSize}
                opacity={0.6}
                style={{
                  animation: `pulse-opacity 2s ease-in-out infinite`,
                  animationDelay: `${index * 0.15}s`,
                }}
              >
                {symbol}
              </text>
            );
          })}

          {/* Gradient definition */}
          <defs>
            <linearGradient
              id="zodiacGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#818cf8" />
              <stop offset="50%" stopColor="#c084fc" />
              <stop offset="100%" stopColor="#f472b6" />
            </linearGradient>
            <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#c084fc" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#818cf8" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>

        {/* Inner ring - constellation pattern */}
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 w-full h-full spin-reverse"
        >
          {/* Inner decorative ring */}
          <circle
            cx="50"
            cy="50"
            r="28"
            fill="none"
            stroke="url(#zodiacGradient)"
            strokeWidth="0.5"
            strokeDasharray="4 4"
            opacity="0.4"
          />

          {/* Constellation dots */}
          {[0, 60, 120, 180, 240, 300].map((angle, index) => {
            const rad = (angle - 90) * (Math.PI / 180);
            const x = 50 + 22 * Math.cos(rad);
            const y = 50 + 22 * Math.sin(rad);
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r="2"
                fill="white"
                opacity="0.7"
                style={{
                  animation: `twinkle 1.5s ease-in-out infinite`,
                  animationDelay: `${index * 0.25}s`,
                }}
              />
            );
          })}
        </svg>

        {/* Center glow */}
        <div
          className="absolute inset-0 flex items-center justify-center pulse-opacity"
          style={{
            background:
              'radial-gradient(circle, rgba(192, 132, 252, 0.3) 0%, transparent 70%)',
          }}
        >
          {/* Central star */}
          <svg viewBox="0 0 24 24" className="w-1/4 h-1/4" fill="white">
            <path
              d="M12 2L14.09 8.26L20.85 9.27L15.92 14.14L17.18 20.85L12 17.77L6.82 20.85L8.08 14.14L3.15 9.27L9.91 8.26L12 2Z"
              opacity="0.8"
            />
          </svg>
        </div>
      </div>

      {/* Optional text label */}
      {text && (
        <p className={`${textSizeClass} text-white/70 animate-pulse`}>{text}</p>
      )}
    </div>
  );
}

// Export size map for consistency
export { sizeMap };
