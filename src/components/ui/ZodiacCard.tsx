'use client';

import Link from 'next/link';
import { type ZodiacSignId, type Element } from '@/types/zodiac';
import { type Locale } from '@/i18n/config';

interface ZodiacInfo {
  symbol: string;
  names: Record<Locale, string>;
  element: Element;
  dateRange: string;
}

const zodiacData: Record<ZodiacSignId, ZodiacInfo> = {
  aries: {
    symbol: '\u2648',
    names: { ko: '양자리', en: 'Aries', zh: '白羊座', ja: 'おひつじ座', es: 'Aries' },
    element: 'fire',
    dateRange: '3/21 - 4/19',
  },
  taurus: {
    symbol: '\u2649',
    names: { ko: '황소자리', en: 'Taurus', zh: '金牛座', ja: 'おうし座', es: 'Tauro' },
    element: 'earth',
    dateRange: '4/20 - 5/20',
  },
  gemini: {
    symbol: '\u264A',
    names: { ko: '쌍둥이자리', en: 'Gemini', zh: '双子座', ja: 'ふたご座', es: 'Géminis' },
    element: 'air',
    dateRange: '5/21 - 6/20',
  },
  cancer: {
    symbol: '\u264B',
    names: { ko: '게자리', en: 'Cancer', zh: '巨蟹座', ja: 'かに座', es: 'Cáncer' },
    element: 'water',
    dateRange: '6/21 - 7/22',
  },
  leo: {
    symbol: '\u264C',
    names: { ko: '사자자리', en: 'Leo', zh: '狮子座', ja: 'しし座', es: 'Leo' },
    element: 'fire',
    dateRange: '7/23 - 8/22',
  },
  virgo: {
    symbol: '\u264D',
    names: { ko: '처녀자리', en: 'Virgo', zh: '处女座', ja: 'おとめ座', es: 'Virgo' },
    element: 'earth',
    dateRange: '8/23 - 9/22',
  },
  libra: {
    symbol: '\u264E',
    names: { ko: '천칭자리', en: 'Libra', zh: '天秤座', ja: 'てんびん座', es: 'Libra' },
    element: 'air',
    dateRange: '9/23 - 10/22',
  },
  scorpio: {
    symbol: '\u264F',
    names: { ko: '전갈자리', en: 'Scorpio', zh: '天蝎座', ja: 'さそり座', es: 'Escorpio' },
    element: 'water',
    dateRange: '10/23 - 11/21',
  },
  sagittarius: {
    symbol: '\u2650',
    names: { ko: '사수자리', en: 'Sagittarius', zh: '射手座', ja: 'いて座', es: 'Sagitario' },
    element: 'fire',
    dateRange: '11/22 - 12/21',
  },
  capricorn: {
    symbol: '\u2651',
    names: { ko: '염소자리', en: 'Capricorn', zh: '摩羯座', ja: 'やぎ座', es: 'Capricornio' },
    element: 'earth',
    dateRange: '12/22 - 1/19',
  },
  aquarius: {
    symbol: '\u2652',
    names: { ko: '물병자리', en: 'Aquarius', zh: '水瓶座', ja: 'みずがめ座', es: 'Acuario' },
    element: 'air',
    dateRange: '1/20 - 2/18',
  },
  pisces: {
    symbol: '\u2653',
    names: { ko: '물고기자리', en: 'Pisces', zh: '双鱼座', ja: 'うお座', es: 'Piscis' },
    element: 'water',
    dateRange: '2/19 - 3/20',
  },
};

interface ZodiacCardProps {
  sign: ZodiacSignId;
  locale: Locale;
  size?: 'sm' | 'md' | 'lg';
}

export default function ZodiacCard({ sign, locale, size = 'md' }: ZodiacCardProps) {
  const data = zodiacData[sign];

  const sizeClasses = {
    sm: {
      container: 'p-3',
      symbol: 'text-2xl',
      name: 'text-sm',
      date: 'text-xs',
    },
    md: {
      container: 'p-4',
      symbol: 'text-4xl',
      name: 'text-base',
      date: 'text-xs',
    },
    lg: {
      container: 'p-6',
      symbol: 'text-6xl',
      name: 'text-lg',
      date: 'text-sm',
    },
  };

  const classes = sizeClasses[size];

  return (
    <Link href={`/${locale}/zodiac/${sign}`}>
      <div
        className={`
          glass-card-hover ${classes.container}
          element-${data.element}
          flex flex-col items-center text-center
          cursor-pointer group
        `}
      >
        <span
          className={`
            ${classes.symbol} mb-2
            group-hover:scale-110 transition-transform duration-300
            filter drop-shadow-lg
          `}
        >
          {data.symbol}
        </span>
        <h3 className={`font-semibold ${classes.name} text-white mb-1`}>
          {data.names[locale]}
        </h3>
        <p className={`${classes.date} text-white/50`}>{data.dateRange}</p>
      </div>
    </Link>
  );
}

// Export zodiacData for use in other components
export { zodiacData };
