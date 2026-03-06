/**
 * 운세 피드백 바이어스 조정 (Phase 2)
 * 핵심 시드 패턴을 훼손하지 않고 결과 텍스트에 후처리 레이어를 추가.
 * content-pipeline.ts 내부는 절대 수정하지 않음.
 *
 * 동작:
 *  - 동일 카테고리에서 'miss' 피드백 3회 이상 → 'contrarian' 오프셋 → 다른 변형 선택
 */

import type { FeedbackReaction, FeedbackCategory } from '@/types/engagement';

export type FeedbackBias = 'contrarian' | null;

/**
 * 피드백 히스토리에서 바이어스 추출
 * getRecentFeedbackBias()의 클라이언트-사이드 순수 함수 버전
 */
export function computeFeedbackBias(
  feedbacks: Array<{ reaction: FeedbackReaction; missCategory?: FeedbackCategory }>,
  category: FeedbackCategory
): FeedbackBias {
  const relevant = feedbacks
    .filter(f => !f.missCategory || f.missCategory === category)
    .slice(0, 5);
  if (relevant.length < 3) return null;
  const misses = relevant.filter(f => f.reaction === 'miss').length;
  return misses >= 3 ? 'contrarian' : null;
}

/**
 * 바이어스를 시드 오프셋으로 변환
 * content-pipeline.ts의 seededRandom(seed) 패턴과 호환:
 * 원래 seed + 오프셋으로 다른 배열 인덱스가 선택됨
 */
export function getBiasedSeedOffset(bias: FeedbackBias): number {
  if (bias === 'contrarian') return 37; // 소수 오프셋 → 배열 순환 다양성 최대화
  return 0;
}

/**
 * 텍스트 배열에서 바이어스 적용 인덱스 계산
 * @param baseIndex   원래 선택 인덱스
 * @param totalItems  배열 크기
 * @param bias        바이어스
 */
export function applyFeedbackBias(
  baseIndex: number,
  totalItems: number,
  bias: FeedbackBias
): number {
  if (!bias || totalItems <= 1) return baseIndex;
  const offset = getBiasedSeedOffset(bias);
  return (baseIndex + offset) % totalItems;
}
