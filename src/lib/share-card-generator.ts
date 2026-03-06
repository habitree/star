/**
 * 공유 카드 생성 유틸리티 (Phase 4)
 * next/og ImageResponse와 함께 사용하는 카드 설정 생성기
 */

import type { ZodiacSignId } from '@/types';

export type ShareCardType = 'daily' | 'compatibility' | 'badge' | 'seasonal';

export interface DailyCardParams {
  type: 'daily';
  sign: ZodiacSignId;
  score: number;
  locale: string;
  date: string;
  signSymbol?: string;
  signName?: string;
  preview?: string; // 운세 한 줄 요약 (최대 50자)
}

export interface CompatibilityCardParams {
  type: 'compatibility';
  sign1: ZodiacSignId;
  sign2: ZodiacSignId;
  score: number;
  locale: string;
  sign1Symbol?: string;
  sign2Symbol?: string;
  sign1Name?: string;
  sign2Name?: string;
}

export interface BadgeCardParams {
  type: 'badge';
  streak: number;
  badgeName: string;
  badgeIcon: string;
  locale: string;
}

export interface SeasonalCardParams {
  type: 'seasonal';
  eventName: string;
  sign: ZodiacSignId;
  locale: string;
  signSymbol?: string;
}

export type ShareCardParams =
  | DailyCardParams
  | CompatibilityCardParams
  | BadgeCardParams
  | SeasonalCardParams;

/** 원소별 그라디언트 색상 */
export const ELEMENT_GRADIENTS: Record<string, [string, string]> = {
  fire:  ['#ef4444', '#f97316'],
  earth: ['#16a34a', '#65a30d'],
  air:   ['#0284c7', '#818cf8'],
  water: ['#1d4ed8', '#7c3aed'],
};

const SIGN_ELEMENTS: Record<ZodiacSignId, string> = {
  aries: 'fire', leo: 'fire', sagittarius: 'fire',
  taurus: 'earth', virgo: 'earth', capricorn: 'earth',
  gemini: 'air', libra: 'air', aquarius: 'air',
  cancer: 'water', scorpio: 'water', pisces: 'water',
};

export function getSignElement(signId: ZodiacSignId): string {
  return SIGN_ELEMENTS[signId] ?? 'fire';
}

export function getSignGradient(signId: ZodiacSignId): [string, string] {
  const elem = getSignElement(signId);
  return ELEMENT_GRADIENTS[elem] ?? ['#7c3aed', '#6d28d9'];
}

/** 카드 URL 생성 */
export function buildShareCardUrl(params: ShareCardParams, baseUrl: string = ''): string {
  const url = new URL(`${baseUrl}/api/share-card`);
  url.searchParams.set('type', params.type);
  url.searchParams.set('locale', params.locale);

  if (params.type === 'daily') {
    url.searchParams.set('sign', params.sign);
    url.searchParams.set('score', String(params.score));
    url.searchParams.set('date', params.date);
    if (params.preview) url.searchParams.set('preview', params.preview);
  } else if (params.type === 'compatibility') {
    url.searchParams.set('sign1', params.sign1);
    url.searchParams.set('sign2', params.sign2);
    url.searchParams.set('score', String(params.score));
  } else if (params.type === 'badge') {
    url.searchParams.set('streak', String(params.streak));
    url.searchParams.set('badgeName', params.badgeName);
    url.searchParams.set('badgeIcon', params.badgeIcon);
  } else if (params.type === 'seasonal') {
    url.searchParams.set('sign', params.sign);
    url.searchParams.set('eventName', params.eventName);
  }

  return url.toString();
}

/** 공유 텍스트 생성 */
type ShareTextFn = (...args: (string | number)[]) => string;
export const SHARE_TEXT: Record<string, Record<string, ShareTextFn>> = {
  daily: {
    ko: (score, sign) => `${sign} 오늘 운세 ${score}점 🌟 당신의 운세도 확인해보세요!`,
    en: (score, sign) => `${sign} horoscope today: ${score}pts 🌟 Check yours!`,
    zh: (score, sign) => `${sign}今日运势${score}分 🌟 看看你的运势！`,
    ja: (score, sign) => `${sign}の今日の運勢${score}点 🌟 あなたの運勢も！`,
    es: (score, sign) => `${sign} hoy: ${score}pts 🌟 ¡Revisa tu horóscopo!`,
  },
  compatibility: {
    ko: (score, s1, s2) => `${s1} × ${s2} 궁합 ${score}% 💕 우리 궁합 확인!`,
    en: (score, s1, s2) => `${s1} × ${s2} compatibility: ${score}% 💕`,
    zh: (score, s1, s2) => `${s1} × ${s2} 配对${score}% 💕`,
    ja: (score, s1, s2) => `${s1} × ${s2} 相性${score}% 💕`,
    es: (score, s1, s2) => `${s1} × ${s2} compatibilidad: ${score}% 💕`,
  },
};
