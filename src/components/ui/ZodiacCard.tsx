'use client';

import Link from 'next/link';
import { type ZodiacSignId, type Element } from '@/types/zodiac';
import ZodiacIcon from '@/components/ui/ZodiacIcon';
import FavoriteButton from '@/components/ui/FavoriteButton';

interface ZodiacInfo {
  symbol: string;
  name: string;
  element: Element;
  dateRange: string;
}

const zodiacData: Record<ZodiacSignId, ZodiacInfo> = {
  aries: {
    symbol: '\u2648',
    name: '양자리',
    element: 'fire',
    dateRange: '3/21 - 4/19',
  },
  taurus: {
    symbol: '\u2649',
    name: '황소자리',
    element: 'earth',
    dateRange: '4/20 - 5/20',
  },
  gemini: {
    symbol: '\u264A',
    name: '쌍둥이자리',
    element: 'air',
    dateRange: '5/21 - 6/20',
  },
  cancer: {
    symbol: '\u264B',
    name: '게자리',
    element: 'water',
    dateRange: '6/21 - 7/22',
  },
  leo: {
    symbol: '\u264C',
    name: '사자자리',
    element: 'fire',
    dateRange: '7/23 - 8/22',
  },
  virgo: {
    symbol: '\u264D',
    name: '처녀자리',
    element: 'earth',
    dateRange: '8/23 - 9/22',
  },
  libra: {
    symbol: '\u264E',
    name: '천칭자리',
    element: 'air',
    dateRange: '9/23 - 10/22',
  },
  scorpio: {
    symbol: '\u264F',
    name: '전갈자리',
    element: 'water',
    dateRange: '10/23 - 11/21',
  },
  sagittarius: {
    symbol: '\u2650',
    name: '사수자리',
    element: 'fire',
    dateRange: '11/22 - 12/21',
  },
  capricorn: {
    symbol: '\u2651',
    name: '염소자리',
    element: 'earth',
    dateRange: '12/22 - 1/19',
  },
  aquarius: {
    symbol: '\u2652',
    name: '물병자리',
    element: 'air',
    dateRange: '1/20 - 2/18',
  },
  pisces: {
    symbol: '\u2653',
    name: '물고기자리',
    element: 'water',
    dateRange: '2/19 - 3/20',
  },
};

interface ZodiacCardProps {
  sign: ZodiacSignId;
  size?: 'sm' | 'md' | 'lg';
  showFavorite?: boolean;
}

// Map card size to icon size
const iconSizeMap = {
  sm: 'sm' as const,
  md: 'md' as const,
  lg: 'lg' as const,
};

export default function ZodiacCard({ sign, size = 'md', showFavorite = true }: ZodiacCardProps) {
  const data = zodiacData[sign];

  const sizeClasses = {
    sm: {
      container: 'p-3',
      name: 'text-sm',
      date: 'text-xs',
    },
    md: {
      container: 'p-4',
      name: 'text-base',
      date: 'text-xs',
    },
    lg: {
      container: 'p-6',
      name: 'text-lg',
      date: 'text-sm',
    },
  };

  const classes = sizeClasses[size];

  return (
    <div className="relative group perspective-1000">
      <Link href={`/zodiac/${sign}`}>
        <div
          className={`
            glass-card-hover ${classes.container}
            background-gradient-${data.element} relative overflow-hidden
            flex flex-col items-center text-center
            cursor-pointer transform-gpu transition-all duration-300
            hover:-translate-y-2 hover:shadow-[0_10px_40px_-10px_rgba(255,255,255,0.2)]
          `}
        >
          {/* subtle glow overlay based on element */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

          <div className="mb-3 group-hover:scale-110 group-hover:drop-shadow-glow-primary transition-all duration-300 relative z-10 w-full flex justify-center">
            <ZodiacIcon sign={sign} size={iconSizeMap[size]} animated />
          </div>
          <h3 className={`font-semibold ${classes.name} text-white mb-1 relative z-10 tracking-wide`}>
            {data.name}
          </h3>
          <p className={`${classes.date} text-white/60 font-medium relative z-10`}>{data.dateRange}</p>
        </div>
      </Link>

      {/* Favorite Button */}
      {showFavorite && (
        <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <FavoriteButton signId={sign} size="sm" />
        </div>
      )}
    </div>
  );
}

// Export zodiacData for use in other components
export { zodiacData };
