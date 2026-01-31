/**
 * 별자리 기본 정보 (서버/클라이언트 공용)
 */

import { type ZodiacSignId, type Element } from '@/types/zodiac';
import { type Locale } from '@/i18n/config';

export interface ZodiacInfo {
  symbol: string;
  names: Record<Locale, string>;
  element: Element;
  dateRange: string;
}

export const zodiacData: Record<ZodiacSignId, ZodiacInfo> = {
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
    dateRange: '5/21 - 6/21',
  },
  cancer: {
    symbol: '\u264B',
    names: { ko: '게자리', en: 'Cancer', zh: '巨蟹座', ja: 'かに座', es: 'Cáncer' },
    element: 'water',
    dateRange: '6/22 - 7/22',
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

export const getZodiacInfo = (signId: ZodiacSignId): ZodiacInfo | undefined => {
  return zodiacData[signId];
};

export const getZodiacName = (signId: ZodiacSignId, locale: Locale): string => {
  return zodiacData[signId]?.names[locale] || zodiacData[signId]?.names.en || signId;
};

export const isValidZodiacId = (id: string): id is ZodiacSignId => {
  return id in zodiacData;
};
