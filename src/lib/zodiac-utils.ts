import type {
  ZodiacSignId,
  Element,
  ElementColors,
  CompatibilityScore,
  Modality,
} from '@/types';

/**
 * 별자리 날짜 범위 정의
 */
const ZODIAC_DATE_RANGES: Record<ZodiacSignId, { startMonth: number; startDay: number; endMonth: number; endDay: number }> = {
  aries: { startMonth: 3, startDay: 21, endMonth: 4, endDay: 19 },
  taurus: { startMonth: 4, startDay: 20, endMonth: 5, endDay: 20 },
  gemini: { startMonth: 5, startDay: 21, endMonth: 6, endDay: 20 },
  cancer: { startMonth: 6, startDay: 21, endMonth: 7, endDay: 22 },
  leo: { startMonth: 7, startDay: 23, endMonth: 8, endDay: 22 },
  virgo: { startMonth: 8, startDay: 23, endMonth: 9, endDay: 22 },
  libra: { startMonth: 9, startDay: 23, endMonth: 10, endDay: 22 },
  scorpio: { startMonth: 10, startDay: 23, endMonth: 11, endDay: 21 },
  sagittarius: { startMonth: 11, startDay: 22, endMonth: 12, endDay: 21 },
  capricorn: { startMonth: 12, startDay: 22, endMonth: 1, endDay: 19 },
  aquarius: { startMonth: 1, startDay: 20, endMonth: 2, endDay: 18 },
  pisces: { startMonth: 2, startDay: 19, endMonth: 3, endDay: 20 },
};

/**
 * 별자리별 원소 매핑
 */
const ZODIAC_ELEMENTS: Record<ZodiacSignId, Element> = {
  aries: 'fire',
  taurus: 'earth',
  gemini: 'air',
  cancer: 'water',
  leo: 'fire',
  virgo: 'earth',
  libra: 'air',
  scorpio: 'water',
  sagittarius: 'fire',
  capricorn: 'earth',
  aquarius: 'air',
  pisces: 'water',
};

/**
 * 별자리별 모달리티 매핑
 */
const ZODIAC_MODALITIES: Record<ZodiacSignId, Modality> = {
  aries: 'cardinal',
  taurus: 'fixed',
  gemini: 'mutable',
  cancer: 'cardinal',
  leo: 'fixed',
  virgo: 'mutable',
  libra: 'cardinal',
  scorpio: 'fixed',
  sagittarius: 'mutable',
  capricorn: 'cardinal',
  aquarius: 'fixed',
  pisces: 'mutable',
};

/**
 * 원소별 색상 정의
 */
const ELEMENT_COLORS: Record<Element, ElementColors> = {
  fire: {
    primary: '#EF4444', // red-500
    secondary: '#F97316', // orange-500
    gradient: 'from-red-500 to-orange-500',
  },
  earth: {
    primary: '#22C55E', // green-500
    secondary: '#84CC16', // lime-500
    gradient: 'from-green-500 to-lime-500',
  },
  air: {
    primary: '#3B82F6', // blue-500
    secondary: '#06B6D4', // cyan-500
    gradient: 'from-blue-500 to-cyan-500',
  },
  water: {
    primary: '#8B5CF6', // violet-500
    secondary: '#6366F1', // indigo-500
    gradient: 'from-violet-500 to-indigo-500',
  },
};

/**
 * 원소 간 궁합 점수 매트릭스
 */
const ELEMENT_COMPATIBILITY: Record<Element, Record<Element, number>> = {
  fire: { fire: 85, earth: 50, air: 90, water: 45 },
  earth: { fire: 50, earth: 80, air: 55, water: 85 },
  air: { fire: 90, earth: 55, air: 75, water: 60 },
  water: { fire: 45, earth: 85, air: 60, water: 80 },
};

/**
 * 모달리티 간 궁합 점수 매트릭스
 */
const MODALITY_COMPATIBILITY: Record<Modality, Record<Modality, number>> = {
  cardinal: { cardinal: 70, fixed: 75, mutable: 80 },
  fixed: { cardinal: 75, fixed: 65, mutable: 70 },
  mutable: { cardinal: 80, fixed: 70, mutable: 75 },
};

/**
 * 날짜로 별자리 반환
 */
export function getZodiacSignByDate(date: Date | string): ZodiacSignId {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const month = dateObj.getMonth() + 1; // 0-indexed를 1-indexed로 변환
  const day = dateObj.getDate();

  for (const [sign, range] of Object.entries(ZODIAC_DATE_RANGES)) {
    const { startMonth, startDay, endMonth, endDay } = range;

    // 염소자리 특수 처리 (12월-1월 걸침)
    if (sign === 'capricorn') {
      if ((month === 12 && day >= startDay) || (month === 1 && day <= endDay)) {
        return sign as ZodiacSignId;
      }
    } else {
      // 일반적인 경우
      if (
        (month === startMonth && day >= startDay) ||
        (month === endMonth && day <= endDay)
      ) {
        return sign as ZodiacSignId;
      }
    }
  }

  // 기본값 (이론적으로 도달하지 않음)
  return 'aries';
}

/**
 * 원소별 색상 반환
 */
export function getElementColor(element: Element): ElementColors {
  return ELEMENT_COLORS[element];
}

/**
 * 별자리의 원소 반환
 */
export function getZodiacElement(signId: ZodiacSignId): Element {
  return ZODIAC_ELEMENTS[signId];
}

/**
 * 별자리의 모달리티 반환
 */
export function getZodiacModality(signId: ZodiacSignId): Modality {
  return ZODIAC_MODALITIES[signId];
}

/**
 * 별자리별 색상 반환
 */
export function getZodiacColor(signId: ZodiacSignId): ElementColors {
  const element = getZodiacElement(signId);
  return getElementColor(element);
}

/**
 * 기본 궁합 점수 계산
 */
export function calculateCompatibilityScore(
  sign1: ZodiacSignId,
  sign2: ZodiacSignId
): CompatibilityScore {
  const element1 = ZODIAC_ELEMENTS[sign1];
  const element2 = ZODIAC_ELEMENTS[sign2];
  const modality1 = ZODIAC_MODALITIES[sign1];
  const modality2 = ZODIAC_MODALITIES[sign2];

  // 원소 궁합 점수 (가중치 60%)
  const elementScore = ELEMENT_COMPATIBILITY[element1][element2];

  // 모달리티 궁합 점수 (가중치 40%)
  const modalityScore = MODALITY_COMPATIBILITY[modality1][modality2];

  // 같은 별자리 보너스
  const sameSignBonus = sign1 === sign2 ? 5 : 0;

  // 가중 평균 계산
  const baseScore = elementScore * 0.6 + modalityScore * 0.4 + sameSignBonus;

  // 0-100 범위로 정규화
  return Math.round(Math.min(100, Math.max(0, baseScore)));
}

/**
 * 궁합 등급 반환
 */
export function getCompatibilityGrade(
  score: CompatibilityScore
): 'excellent' | 'good' | 'average' | 'challenging' | 'difficult' {
  if (score >= 85) return 'excellent';
  if (score >= 70) return 'good';
  if (score >= 55) return 'average';
  if (score >= 40) return 'challenging';
  return 'difficult';
}

/**
 * 별자리 순서 배열
 */
export const ZODIAC_ORDER: ZodiacSignId[] = [
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

/**
 * 별자리 ID 유효성 검사
 */
export function isValidZodiacSign(sign: string): sign is ZodiacSignId {
  return ZODIAC_ORDER.includes(sign as ZodiacSignId);
}

/**
 * 다음 별자리 반환
 */
export function getNextZodiacSign(signId: ZodiacSignId): ZodiacSignId {
  const index = ZODIAC_ORDER.indexOf(signId);
  return ZODIAC_ORDER[(index + 1) % 12];
}

/**
 * 이전 별자리 반환
 */
export function getPreviousZodiacSign(signId: ZodiacSignId): ZodiacSignId {
  const index = ZODIAC_ORDER.indexOf(signId);
  return ZODIAC_ORDER[(index + 11) % 12];
}

/**
 * 별자리 간 거리 계산 (0-6, 대칭)
 */
export function getZodiacDistance(sign1: ZodiacSignId, sign2: ZodiacSignId): number {
  const index1 = ZODIAC_ORDER.indexOf(sign1);
  const index2 = ZODIAC_ORDER.indexOf(sign2);
  const diff = Math.abs(index1 - index2);
  return Math.min(diff, 12 - diff);
}
