/**
 * 사용자 세그먼트 분류 (Phase 1 — 심리학 기반 세그먼트)
 * Hook Model: 세그먼트마다 트리거·동기·능력이 다름
 */

import type { UserSegment } from '@/types/engagement';

interface SegmentInput {
  onboardingCompleted: boolean;
  visitStreak: number;
  lastVisit: string | null;   // ISO datetime
  lastCheckInDate: string | null; // YYYY-MM-DD
}

/**
 * 마지막 방문으로부터 경과 일수 계산
 * lastVisit (ISO) 또는 lastCheckInDate (YYYY-MM-DD) 중 더 최근 값을 기준으로 함
 */
export function getDaysSinceLastVisit(
  lastVisit: string | null,
  lastCheckInDate: string | null
): number {
  const todayMs = new Date().setHours(0, 0, 0, 0);

  let latestMs = 0;
  if (lastVisit) {
    const ms = new Date(lastVisit).setHours(0, 0, 0, 0);
    if (ms > latestMs) latestMs = ms;
  }
  if (lastCheckInDate) {
    const ms = new Date(lastCheckInDate).setHours(0, 0, 0, 0);
    if (ms > latestMs) latestMs = ms;
  }

  if (latestMs === 0) return 999; // 신규 사용자 — 방문 기록 없음
  return Math.floor((todayMs - latestMs) / (1000 * 60 * 60 * 24));
}

/**
 * 사용자 세그먼트 분류
 * 우선순위: at-risk → new → explorer → engaged → committed → power
 */
export function getUserSegment(input: SegmentInput): UserSegment {
  const daysSince = getDaysSinceLastVisit(input.lastVisit, input.lastCheckInDate);

  // 3일 이상 미방문 — 손실 회피 트리거 최우선
  if (daysSince >= 3) return 'at-risk';

  // 온보딩 미완료 — 신규 사용자
  if (!input.onboardingCompleted) return 'new';

  const { visitStreak } = input;

  if (visitStreak <= 2) return 'explorer';
  if (visitStreak <= 7) return 'engaged';
  if (visitStreak <= 29) return 'committed';
  return 'power';
}

/** 세그먼트별 CTA 설정 */
export interface SegmentCTAConfig {
  showWinBack: boolean;
  show7DayCountdown: boolean;
  showBigThreeTeaser: boolean;
  showViralShare: boolean;
  showBadgePreview: boolean;
}

export function getSegmentCTAConfig(segment: UserSegment): SegmentCTAConfig {
  return {
    showWinBack:        segment === 'at-risk',
    show7DayCountdown:  segment === 'engaged',
    showBigThreeTeaser: segment === 'committed' || segment === 'power',
    showViralShare:     segment === 'power',
    showBadgePreview:   segment === 'new' || segment === 'explorer',
  };
}
