/**
 * 운세 적중 통계 계산
 * 사용자 피드백 데이터를 집계해 카테고리별 적중률 계산
 * 심리: 자기실현적 예언 + 확증 편향 ("별과 당신의 직감이 X% 일치합니다")
 */

import type { FortuneFeedback, FeedbackCategory, AccuracyStats } from '@/types/engagement';

/**
 * 피드백 목록으로 적중 통계 계산
 * @param feedbacks FortuneFeedback[] from user-store
 * @param signId 특정 별자리로 필터링
 */
export function calculateAccuracyStats(
  feedbacks: FortuneFeedback[],
  signId?: string
): AccuracyStats | null {
  const filtered = signId
    ? feedbacks.filter(f => f.signId === signId)
    : feedbacks;

  if (filtered.length < 5) return null;

  const total = filtered.length;
  const hits = filtered.filter(f => f.reaction === 'great' || f.reaction === 'okay').length;
  const accuracy = Math.round((hits / total) * 100);

  // 카테고리별 적중률
  const categories: FeedbackCategory[] = ['love', 'career', 'health', 'money', 'overall'];
  const categoryAccuracy: Partial<Record<FeedbackCategory, number>> = {};

  for (const cat of categories) {
    const catFeedbacks = filtered.filter(
      f => !f.missCategory || f.missCategory === cat
    );
    if (catFeedbacks.length < 2) continue;
    const catHits = catFeedbacks.filter(f => f.reaction !== 'miss').length;
    categoryAccuracy[cat] = Math.round((catHits / catFeedbacks.length) * 100);
  }

  const bestCategory = getBestCategory(categoryAccuracy);

  // 최근 연속 스트릭 계산
  const sorted = [...filtered].sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  let greatStreak = 0;
  let missStreak = 0;
  for (const f of sorted) {
    if (f.reaction === 'great') {
      greatStreak++;
      if (missStreak > 0) break;
    } else {
      break;
    }
  }
  for (const f of sorted) {
    if (f.reaction === 'miss') {
      missStreak++;
      if (greatStreak > 0) break;
    } else {
      break;
    }
  }

  return {
    totalFeedbacks: total,
    accuracy,
    categoryAccuracy,
    bestCategory,
    streak: { greatStreak, missStreak },
  };
}

export function getBestCategory(
  categoryAccuracy: Partial<Record<FeedbackCategory, number>>
): FeedbackCategory | null {
  let best: FeedbackCategory | null = null;
  let bestScore = -1;

  for (const [cat, score] of Object.entries(categoryAccuracy) as [FeedbackCategory, number][]) {
    if (score > bestScore) {
      bestScore = score;
      best = cat;
    }
  }
  return best;
}

/**
 * 적중률에 따른 배지 문자열 반환
 */
export function getAccuracyBadge(accuracy: number): string {
  if (accuracy >= 90) return '🌟';
  if (accuracy >= 75) return '⭐';
  if (accuracy >= 60) return '✨';
  if (accuracy >= 45) return '🌙';
  return '🔮';
}
