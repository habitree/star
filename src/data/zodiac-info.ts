/**
 * 별자리 기본 정보 (서버/클라이언트 공용)
 */

import { type ZodiacSignId, type Element } from '@/types/zodiac';

export interface ZodiacInfo {
  symbol: string;
  name: string;
  element: Element;
  dateRange: string;
}

export const zodiacData: Record<ZodiacSignId, ZodiacInfo> = {
  aries: { symbol: '\u2648', name: '양자리', element: 'fire', dateRange: '3/21 - 4/19' },
  taurus: { symbol: '\u2649', name: '황소자리', element: 'earth', dateRange: '4/20 - 5/20' },
  gemini: { symbol: '\u264A', name: '쌍둥이자리', element: 'air', dateRange: '5/21 - 6/21' },
  cancer: { symbol: '\u264B', name: '게자리', element: 'water', dateRange: '6/22 - 7/22' },
  leo: { symbol: '\u264C', name: '사자자리', element: 'fire', dateRange: '7/23 - 8/22' },
  virgo: { symbol: '\u264D', name: '처녀자리', element: 'earth', dateRange: '8/23 - 9/22' },
  libra: { symbol: '\u264E', name: '천칭자리', element: 'air', dateRange: '9/23 - 10/22' },
  scorpio: { symbol: '\u264F', name: '전갈자리', element: 'water', dateRange: '10/23 - 11/21' },
  sagittarius: { symbol: '\u2650', name: '사수자리', element: 'fire', dateRange: '11/22 - 12/21' },
  capricorn: { symbol: '\u2651', name: '염소자리', element: 'earth', dateRange: '12/22 - 1/19' },
  aquarius: { symbol: '\u2652', name: '물병자리', element: 'air', dateRange: '1/20 - 2/18' },
  pisces: { symbol: '\u2653', name: '물고기자리', element: 'water', dateRange: '2/19 - 3/20' },
};

export const getZodiacInfo = (signId: ZodiacSignId): ZodiacInfo | undefined => {
  return zodiacData[signId];
};

export const getZodiacName = (signId: ZodiacSignId): string => {
  return zodiacData[signId]?.name || signId;
};

export const isValidZodiacId = (id: string): id is ZodiacSignId => {
  return id in zodiacData;
};
