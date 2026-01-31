'use client';

import { useTranslations } from 'next-intl';
import type { ZodiacSignId } from '@/types';
import type { Locale } from '@/i18n/config';

interface BigThreeCardProps {
  type: 'sun' | 'moon' | 'rising';
  sign: ZodiacSignId;
  locale: Locale;
  interpretation?: string;
}

// 별자리 심볼 및 이름
const zodiacData: Record<
  ZodiacSignId,
  { symbol: string; names: Record<Locale, string> }
> = {
  aries: {
    symbol: '\u2648',
    names: { ko: '양자리', en: 'Aries', zh: '白羊座', ja: '牡羊座', es: 'Aries' },
  },
  taurus: {
    symbol: '\u2649',
    names: { ko: '황소자리', en: 'Taurus', zh: '金牛座', ja: '牡牛座', es: 'Tauro' },
  },
  gemini: {
    symbol: '\u264A',
    names: { ko: '쌍둥이자리', en: 'Gemini', zh: '双子座', ja: '双子座', es: 'Geminis' },
  },
  cancer: {
    symbol: '\u264B',
    names: { ko: '게자리', en: 'Cancer', zh: '巨蟹座', ja: '蟹座', es: 'Cancer' },
  },
  leo: {
    symbol: '\u264C',
    names: { ko: '사자자리', en: 'Leo', zh: '狮子座', ja: '獅子座', es: 'Leo' },
  },
  virgo: {
    symbol: '\u264D',
    names: { ko: '처녀자리', en: 'Virgo', zh: '处女座', ja: '乙女座', es: 'Virgo' },
  },
  libra: {
    symbol: '\u264E',
    names: { ko: '천칭자리', en: 'Libra', zh: '天秤座', ja: '天秤座', es: 'Libra' },
  },
  scorpio: {
    symbol: '\u264F',
    names: { ko: '전갈자리', en: 'Scorpio', zh: '天蝎座', ja: '蠍座', es: 'Escorpio' },
  },
  sagittarius: {
    symbol: '\u2650',
    names: { ko: '사수자리', en: 'Sagittarius', zh: '射手座', ja: '射手座', es: 'Sagitario' },
  },
  capricorn: {
    symbol: '\u2651',
    names: { ko: '염소자리', en: 'Capricorn', zh: '摩羯座', ja: '山羊座', es: 'Capricornio' },
  },
  aquarius: {
    symbol: '\u2652',
    names: { ko: '물병자리', en: 'Aquarius', zh: '水瓶座', ja: '水瓶座', es: 'Acuario' },
  },
  pisces: {
    symbol: '\u2653',
    names: { ko: '물고기자리', en: 'Pisces', zh: '双鱼座', ja: '魚座', es: 'Piscis' },
  },
};

// 타입별 아이콘 및 색상
const typeConfig = {
  sun: {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6"
      >
        <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
      </svg>
    ),
    gradient: 'from-yellow-400 to-orange-500',
    bgGradient: 'from-yellow-500/20 to-orange-500/20',
    borderColor: 'border-yellow-500/30',
  },
  moon: {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6"
      >
        <path
          fillRule="evenodd"
          d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
          clipRule="evenodd"
        />
      </svg>
    ),
    gradient: 'from-blue-400 to-purple-500',
    bgGradient: 'from-blue-500/20 to-purple-500/20',
    borderColor: 'border-blue-500/30',
  },
  rising: {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6"
      >
        <path
          fillRule="evenodd"
          d="M11.47 2.47a.75.75 0 011.06 0l3.75 3.75a.75.75 0 01-1.06 1.06l-2.47-2.47V21a.75.75 0 01-1.5 0V4.81L8.78 7.28a.75.75 0 01-1.06-1.06l3.75-3.75z"
          clipRule="evenodd"
        />
      </svg>
    ),
    gradient: 'from-pink-400 to-rose-500',
    bgGradient: 'from-pink-500/20 to-rose-500/20',
    borderColor: 'border-pink-500/30',
  },
};

export default function BigThreeCard({
  type,
  sign,
  locale,
  interpretation,
}: BigThreeCardProps) {
  const t = useTranslations('birthChart');

  const config = typeConfig[type];
  const signData = zodiacData[sign];

  const typeLabels: Record<'sun' | 'moon' | 'rising', string> = {
    sun: t('bigThree.sun'),
    moon: t('bigThree.moon'),
    rising: t('bigThree.rising'),
  };

  return (
    <div
      className={`
        relative overflow-hidden rounded-2xl
        bg-gradient-to-br ${config.bgGradient}
        border ${config.borderColor}
        backdrop-blur-sm
        p-6
        transition-all duration-300
        hover:scale-[1.02] hover:shadow-lg
      `}
    >
      {/* 배경 장식 */}
      <div
        className={`
          absolute -top-10 -right-10 w-32 h-32
          bg-gradient-to-br ${config.gradient}
          opacity-10 rounded-full blur-2xl
        `}
      />

      {/* 헤더 */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className={`
            p-2 rounded-lg
            bg-gradient-to-br ${config.gradient}
            text-white
          `}
        >
          {config.icon}
        </div>
        <span className="text-white/70 font-medium">{typeLabels[type]}</span>
      </div>

      {/* 별자리 심볼과 이름 */}
      <div className="flex items-center gap-4 mb-4">
        <span
          className={`
            text-5xl filter drop-shadow-lg
            bg-gradient-to-br ${config.gradient}
            bg-clip-text text-transparent
          `}
        >
          {signData.symbol}
        </span>
        <div>
          <h3 className="text-2xl font-bold text-white">
            {signData.names[locale]}
          </h3>
          {locale !== 'en' && (
            <p className="text-white/50 text-sm">{signData.names.en}</p>
          )}
        </div>
      </div>

      {/* 해석 */}
      {interpretation && (
        <p className="text-white/70 text-sm leading-relaxed">{interpretation}</p>
      )}
    </div>
  );
}
