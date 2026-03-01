/**
 * 스마트 크로스-피처 CTA
 * 오늘 운세 점수 기반으로 관련 기능으로 자연스럽게 안내
 */

import type { SmartCTA } from '@/types/horoscope-extended';

interface CTAContext {
  overallScore: number;
  loveScore: number;
  careerScore: number;
  healthScore: number;
  moneyScore: number;
  hasViewedBirthChart?: boolean;
  locale?: string;
}

export function getSmartCTAs(ctx: CTAContext): SmartCTA[] {
  const { overallScore, loveScore, careerScore, healthScore, moneyScore, hasViewedBirthChart, locale = 'ko' } = ctx;
  const base = `/${locale}`;
  const candidates: (SmartCTA & { priority: number })[] = [];

  // 연애운 높음 → 궁합 추천
  if (loveScore > 70) {
    candidates.push({
      id: 'compatibility-love',
      icon: '💕',
      title: '궁합 확인하기',
      description: `오늘 연애운이 ${loveScore}점! 지금 최고의 궁합 상대를 찾아보세요.`,
      href: `${base}/compatibility`,
      priority: loveScore,
    });
  }

  // 종합운 낮음 → 바이오리듬 추천
  if (overallScore < 50) {
    candidates.push({
      id: 'biorhythm-low',
      icon: '📉',
      title: '바이오리듬 확인',
      description: `운세가 낮은 날엔 바이오리듬을 체크해 내 컨디션의 이유를 파악하세요.`,
      href: `${base}/birth-chart`,
      priority: 100 - overallScore,
    });
  }

  // 출생 차트 미조회 → 안내
  if (!hasViewedBirthChart) {
    candidates.push({
      id: 'birth-chart-intro',
      icon: '🌌',
      title: '출생 차트 분석',
      description: `태어난 순간의 별자리 배치로 더 깊은 내 운명을 탐색해보세요.`,
      href: `${base}/birth-chart`,
      priority: 60,
    });
  }

  // 직장운 높음 → 직장운 상세
  if (careerScore > 75) {
    candidates.push({
      id: 'career-high',
      icon: '🚀',
      title: '오늘 직장운 상세',
      description: `직장운이 ${careerScore}점! 오늘 중요한 결정을 내려도 좋은 날입니다.`,
      href: `${base}/horoscope/daily`,
      priority: careerScore - 10,
    });
  }

  // 건강운 낮음 → 주의
  if (healthScore < 40) {
    candidates.push({
      id: 'health-warning',
      icon: '🏥',
      title: '건강운 주의',
      description: `오늘 건강운이 ${healthScore}점으로 낮아요. 무리하지 마시고 휴식을 취하세요.`,
      href: `${base}/zodiac`,
      priority: 100 - healthScore,
    });
  }

  // 금전운 높음 → 궁합 (재물 타입)
  if (moneyScore > 78 && candidates.length < 2) {
    candidates.push({
      id: 'money-high',
      icon: '💰',
      title: '별자리별 재물운',
      description: `금전운이 ${moneyScore}점! 12별자리 오늘 재물운 순위를 확인해보세요.`,
      href: `${base}/zodiac`,
      priority: moneyScore - 15,
    });
  }

  // 기본 fallback
  if (candidates.length === 0) {
    candidates.push({
      id: 'compatibility-default',
      icon: '💞',
      title: '궁합 보러가기',
      description: '내 별자리와 가장 잘 맞는 상대를 지금 확인해보세요.',
      href: `${base}/compatibility`,
      priority: 50,
    });
  }

  // 우선순위 정렬 후 최대 2개 반환
  candidates.sort((a, b) => b.priority - a.priority);
  return candidates.slice(0, 2).map(({ priority: _p, ...cta }) => cta);
}
