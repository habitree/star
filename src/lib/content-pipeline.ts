/**
 * 콘텐츠 생성 파이프라인
 * 기존 horoscope-generator.ts 패턴 확장
 * 모든 콘텐츠는 seededRandom 기반 (API 비용 0)
 */

import type { ZodiacSignId } from '@/types';
import type { EmotionState } from '@/types/engagement';

// 별자리 ID → 숫자
const signIdToNumber: Record<ZodiacSignId, number> = {
  aries: 1, taurus: 2, gemini: 3, cancer: 4, leo: 5, virgo: 6,
  libra: 7, scorpio: 8, sagittarius: 9, capricorn: 10, aquarius: 11, pisces: 12,
};

/** 시드 기반 결정적 랜덤 (LCG) */
export function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

/** 날짜+별자리+카테고리로 시드 생성 */
export function generateContentSeed(
  signId: ZodiacSignId,
  date: Date,
  category: string
): number {
  const signNum = signIdToNumber[signId];
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const catHash = category.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  return y * 10000000 + m * 100000 + d * 1000 + signNum * 10 + catHash;
}

/** 배열에서 시드 기반 랜덤 선택 */
export function selectRandom<T>(arr: T[], random: () => number): T {
  return arr[Math.floor(random() * arr.length)];
}

/** 가중치 기반 랜덤 선택 */
export function weightedSelect<T>(
  items: T[],
  weights: number[],
  random: () => number
): T {
  const total = weights.reduce((a, b) => a + b, 0);
  let r = random() * total;
  for (let i = 0; i < items.length; i++) {
    r -= weights[i];
    if (r <= 0) return items[i];
  }
  return items[items.length - 1];
}

/** 감정 상태 기반 콘텐츠 톤 조절 */
export function getEmotionTone(emotion: EmotionState): {
  warmth: number;    // 0-1 (높을수록 따뜻)
  energy: number;    // 0-1 (높을수록 에너지틱)
  mysticism: number; // 0-1 (높을수록 신비로움)
} {
  switch (emotion) {
    case 'positive':
      return { warmth: 0.8, energy: 0.9, mysticism: 0.5 };
    case 'neutral':
      return { warmth: 0.6, energy: 0.5, mysticism: 0.7 };
    case 'negative':
      return { warmth: 0.9, energy: 0.3, mysticism: 0.6 };
  }
}

/** 일일 콘텐츠 해시 (같은 날 같은 콘텐츠 보장) */
export function getDailyHash(date: Date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}${m}${d}`;
}

/** 시간대 판별 */
export function getTimePeriod(date: Date = new Date()): 'morning' | 'afternoon' | 'evening' {
  const hour = date.getHours();
  if (hour < 12) return 'morning';
  if (hour < 18) return 'afternoon';
  return 'evening';
}

/** 별자리 한국어 이름 매핑 */
export const signKoreanNames: Record<ZodiacSignId, string> = {
  aries: '양자리', taurus: '황소자리', gemini: '쌍둥이자리',
  cancer: '게자리', leo: '사자자리', virgo: '처녀자리',
  libra: '천칭자리', scorpio: '전갈자리', sagittarius: '사수자리',
  capricorn: '염소자리', aquarius: '물병자리', pisces: '물고기자리',
};

/** 별자리 원소 매핑 */
export const signElements: Record<ZodiacSignId, 'fire' | 'earth' | 'air' | 'water'> = {
  aries: 'fire', taurus: 'earth', gemini: 'air', cancer: 'water',
  leo: 'fire', virgo: 'earth', libra: 'air', scorpio: 'water',
  sagittarius: 'fire', capricorn: 'earth', aquarius: 'air', pisces: 'water',
};

/** 텍스트 셔플 (시드 기반) */
export function shuffleArray<T>(arr: T[], random: () => number): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
