/**
 * Big Three 출생 차트 콘텐츠 (Phase 3)
 * 심리: Zeigarnik(블러) + 매몰 비용(30일 달성 후 공개)
 */

import type { BigThreeStage } from '@/types/engagement';
import type { ZodiacSignId } from '@/types';

export interface BigThreeSign {
  planet: '☀️' | '🌙' | '↑';
  role: string;
  signId: ZodiacSignId;
  signName: string;
  description: string;
  unlockStage: BigThreeStage;
  requiredStreak: number | null; // null = 항상 공개
}

export interface BigThreeUnlockStatus {
  sun: 'unlocked';
  moon: 'unlocked' | 'locked';
  rising: 'unlocked' | 'locked';
  synthesis: 'unlocked' | 'locked';
}

/** 스트릭 기반 Big Three 해금 상태 */
export function getBigThreeUnlockStatus(visitStreak: number): BigThreeUnlockStatus {
  return {
    sun: 'unlocked',
    moon: visitStreak >= 7 ? 'unlocked' : 'locked',
    rising: visitStreak >= 30 ? 'unlocked' : 'locked',
    synthesis: 'locked', // 미래 프리미엄
  };
}

/** 달자리 계산 (출생 시간 없을 때 근사값) */
function computeMoonSign(birthDateStr: string): ZodiacSignId {
  const date = new Date(birthDateStr);
  // 달은 약 2.5일마다 별자리 이동 (12별자리 × 2.5일 = 30일 주기)
  const dayOfYear = Math.floor(
    (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24)
  );
  const signs: ZodiacSignId[] = [
    'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
    'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces',
  ];
  // 2.5일 주기 오프셋
  const idx = Math.floor(dayOfYear / 2.5) % 12;
  return signs[idx];
}

/** 상승점(어센던트) 계산 (시간 없을 때 출생월 기반 근사값) */
function computeRisingSign(birthDateStr: string, birthTime: string | null): ZodiacSignId {
  const date = new Date(birthDateStr);
  const signs: ZodiacSignId[] = [
    'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
    'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces',
  ];
  if (birthTime) {
    const [h] = birthTime.split(':').map(Number);
    // 어센던트는 약 2시간마다 이동 (24시간 / 12별자리)
    const risingOffset = Math.floor(h / 2);
    const birthMonth = date.getMonth();
    return signs[(birthMonth + risingOffset) % 12];
  }
  // 시간 미입력: 출생월 기반 근사
  const birthMonth = date.getMonth();
  return signs[(birthMonth + 4) % 12];
}

/** Big Three 전체 계산 */
export function computeBigThree(
  sunSignId: ZodiacSignId,
  birthDateStr: string,
  birthTime: string | null,
  locale: string = 'ko'
): {
  sun: ZodiacSignId;
  moon: ZodiacSignId;
  rising: ZodiacSignId;
} {
  return {
    sun: sunSignId,
    moon: computeMoonSign(birthDateStr),
    rising: computeRisingSign(birthDateStr, birthTime),
  };
}

/** 원소 계산 */
const SIGN_ELEMENTS: Record<ZodiacSignId, 'fire' | 'earth' | 'air' | 'water'> = {
  aries: 'fire', leo: 'fire', sagittarius: 'fire',
  taurus: 'earth', virgo: 'earth', capricorn: 'earth',
  gemini: 'air', libra: 'air', aquarius: 'air',
  cancer: 'water', scorpio: 'water', pisces: 'water',
};

export interface ElementDistribution {
  fire: number;   // 0-100 percent
  earth: number;
  air: number;
  water: number;
}

export function computeElementDistribution(
  sun: ZodiacSignId,
  moon: ZodiacSignId,
  rising: ZodiacSignId
): ElementDistribution {
  const elems = [SIGN_ELEMENTS[sun], SIGN_ELEMENTS[moon], SIGN_ELEMENTS[rising]];
  const counts = { fire: 0, earth: 0, air: 0, water: 0 };
  for (const e of elems) counts[e]++;
  return {
    fire:  Math.round((counts.fire  / 3) * 100),
    earth: Math.round((counts.earth / 3) * 100),
    air:   Math.round((counts.air   / 3) * 100),
    water: Math.round((counts.water / 3) * 100),
  };
}

/** Big Three 역할 설명 (다국어) */
export const BIG_THREE_ROLES = {
  sun: {
    ko: { role: '태양자리', desc: '나의 핵심 자아' },
    en: { role: 'Sun Sign', desc: 'Your core identity' },
    zh: { role: '太阳星座', desc: '核心自我' },
    ja: { role: '太陽星座', desc: '核心的な自己' },
    es: { role: 'Signo Solar', desc: 'Tu identidad esencial' },
  },
  moon: {
    ko: { role: '달자리', desc: '나의 내면 감정' },
    en: { role: 'Moon Sign', desc: 'Your inner emotions' },
    zh: { role: '月亮星座', desc: '内心情感' },
    ja: { role: '月星座', desc: '内なる感情' },
    es: { role: 'Signo Lunar', desc: 'Tus emociones internas' },
  },
  rising: {
    ko: { role: '상승점', desc: '타인에게 보이는 나' },
    en: { role: 'Rising Sign', desc: 'How others see you' },
    zh: { role: '上升星座', desc: '他人眼中的你' },
    ja: { role: '上昇星座', desc: '他者から見た自分' },
    es: { role: 'Ascendente', desc: 'Cómo te ven los demás' },
  },
} as const;

/** 달 해금 메시지 (다국어) */
export const MOON_UNLOCK_MESSAGE = {
  ko: '7일 연속 방문으로 달자리가 해금됩니다',
  en: 'Unlock your Moon sign with a 7-day streak',
  zh: '连续7天访问解锁月亮星座',
  ja: '7日連続でアクセスして月星座を解放',
  es: 'Desbloquea tu signo lunar con 7 días seguidos',
} as const;

export const RISING_UNLOCK_MESSAGE = {
  ko: '30일 연속 방문으로 상승점이 해금됩니다',
  en: 'Unlock your Rising sign with a 30-day streak',
  zh: '连续30天访问解锁上升星座',
  ja: '30日連続でアクセスして上昇星座を解放',
  es: 'Desbloquea tu ascendente con 30 días seguidos',
} as const;
