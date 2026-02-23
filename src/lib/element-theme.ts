/**
 * 별자리 엘리먼트별 테마 색상 시스템
 * 4원소(불, 흙, 바람, 물)에 따른 비주얼 테마
 */

import type { ZodiacSignId } from '@/types';
import type { ElementTheme } from '@/types/engagement';

/** 별자리 → 원소 매핑 */
export const signToElement: Record<ZodiacSignId, ElementTheme['element']> = {
  aries: 'fire', leo: 'fire', sagittarius: 'fire',
  taurus: 'earth', virgo: 'earth', capricorn: 'earth',
  gemini: 'air', libra: 'air', aquarius: 'air',
  cancer: 'water', scorpio: 'water', pisces: 'water',
};

/** 원소별 테마 정의 */
export const elementThemes: Record<ElementTheme['element'], ElementTheme> = {
  fire: {
    element: 'fire',
    primaryColor: '#ef4444',
    secondaryColor: '#f97316',
    gradientFrom: 'from-red-500/20',
    gradientTo: 'to-orange-500/20',
    glowColor: 'rgba(239, 68, 68, 0.4)',
    particleType: 'flame',
    bgClass: 'bg-gradient-to-br from-red-500/10 to-orange-500/10',
    textClass: 'text-red-300',
    borderClass: 'border-red-500/30',
  },
  earth: {
    element: 'earth',
    primaryColor: '#22c55e',
    secondaryColor: '#84cc16',
    gradientFrom: 'from-green-500/20',
    gradientTo: 'to-lime-500/20',
    glowColor: 'rgba(34, 197, 94, 0.4)',
    particleType: 'leaf',
    bgClass: 'bg-gradient-to-br from-green-500/10 to-lime-500/10',
    textClass: 'text-green-300',
    borderClass: 'border-green-500/30',
  },
  air: {
    element: 'air',
    primaryColor: '#3b82f6',
    secondaryColor: '#06b6d4',
    gradientFrom: 'from-blue-500/20',
    gradientTo: 'to-cyan-500/20',
    glowColor: 'rgba(59, 130, 246, 0.4)',
    particleType: 'wind',
    bgClass: 'bg-gradient-to-br from-blue-500/10 to-cyan-500/10',
    textClass: 'text-blue-300',
    borderClass: 'border-blue-500/30',
  },
  water: {
    element: 'water',
    primaryColor: '#8b5cf6',
    secondaryColor: '#6366f1',
    gradientFrom: 'from-purple-500/20',
    gradientTo: 'to-indigo-500/20',
    glowColor: 'rgba(139, 92, 246, 0.4)',
    particleType: 'droplet',
    bgClass: 'bg-gradient-to-br from-purple-500/10 to-indigo-500/10',
    textClass: 'text-purple-300',
    borderClass: 'border-purple-500/30',
  },
};

/** 별자리 ID로 테마 가져오기 */
export function getElementTheme(signId: ZodiacSignId): ElementTheme {
  const element = signToElement[signId];
  return elementThemes[element];
}

/** 원소별 CSS 변수 스타일 객체 */
export function getElementCSSVars(signId: ZodiacSignId): React.CSSProperties {
  const theme = getElementTheme(signId);
  return {
    '--element-primary': theme.primaryColor,
    '--element-secondary': theme.secondaryColor,
    '--element-glow': theme.glowColor,
  } as React.CSSProperties;
}

/** 원소별 그라데이션 클래스 */
export function getElementGradientClass(signId: ZodiacSignId): string {
  const theme = getElementTheme(signId);
  return `${theme.gradientFrom} ${theme.gradientTo}`;
}

/** 원소별 글로우 스타일 */
export function getElementGlowStyle(signId: ZodiacSignId): React.CSSProperties {
  const theme = getElementTheme(signId);
  return {
    boxShadow: `0 0 20px ${theme.glowColor}, 0 0 40px ${theme.glowColor}`,
  };
}

/** 공유카드용 그라데이션 */
export function getShareCardGradient(signId: ZodiacSignId): string {
  const theme = getElementTheme(signId);
  return `linear-gradient(135deg, ${theme.primaryColor}40, ${theme.secondaryColor}40)`;
}
