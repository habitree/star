/**
 * 콘텐츠 해금 시스템
 * Zeigarnik 효과 + 손실 회피 + 점진적 공개
 */

import type { UnlockableContent, ContentLockStatus } from '@/types/engagement';

/** 해금 가능한 콘텐츠 정의 */
export const unlockableContents: UnlockableContent[] = [
  {
    id: 'basic-fortune',
    name: '기본 운세 5영역',
    description: '종합운, 연애운, 직장운, 건강운, 금전운',
    unlockCondition: { type: 'birthdate' },
    status: 'locked',
  },
  {
    id: 'tarot-card',
    name: '오늘의 타로',
    description: '매일 한 장의 타로 카드 리딩',
    unlockCondition: { type: 'action', requiredAction: 'view-basic-fortune' },
    status: 'locked',
  },
  {
    id: 'biorhythm',
    name: '바이오리듬',
    description: '7일간의 신체·감정·지성 바이오리듬',
    unlockCondition: { type: 'streak', requiredStreak: 2 },
    status: 'locked',
  },
  {
    id: 'chat-fortune',
    name: '별의 도사 대화',
    description: '"별의 도사"와 1:1 대화형 운세',
    unlockCondition: { type: 'streak', requiredStreak: 3 },
    status: 'locked',
  },
  {
    id: 'weekly-report',
    name: '주간 종합 리포트',
    description: '7일간의 운세 변화를 종합 분석',
    unlockCondition: { type: 'streak', requiredStreak: 7 },
    status: 'locked',
  },
  {
    id: 'premium-tarot',
    name: '프리미엄 3장 타로',
    description: '과거-현재-미래 3장 타로 스프레드',
    unlockCondition: { type: 'streak', requiredStreak: 14 },
    status: 'locked',
  },
  {
    id: 'monthly-reading',
    name: '월간 종합 리딩',
    description: '한 달의 운세를 종합적으로 분석한 특별 리딩',
    unlockCondition: { type: 'streak', requiredStreak: 30 },
    status: 'locked',
  },
  {
    id: 'deep-sign-analysis',
    name: '별자리 심층 분석',
    description: '당신의 별자리의 숨겨진 성격, 잠재력, 그림자 면까지 분석',
    unlockCondition: { type: 'streak', requiredStreak: 45 },
    status: 'locked',
  },
  {
    id: 'planet-reading',
    name: '행성 배치 리딩',
    description: '현재 행성 배치가 당신에게 미치는 영향 분석',
    unlockCondition: { type: 'streak', requiredStreak: 60 },
    status: 'locked',
  },
  {
    id: 'guardian-reading',
    name: '수호 별자리 리딩',
    description: '당신을 지켜주는 수호 별자리와 그 의미를 해석',
    unlockCondition: { type: 'streak', requiredStreak: 75 },
    status: 'locked',
  },
  {
    id: 'quarterly-forecast',
    name: '분기 예측 리딩',
    description: '다가올 3개월의 운세 흐름을 미리 예측하는 특별 리딩',
    unlockCondition: { type: 'streak', requiredStreak: 90 },
    status: 'locked',
  },
  {
    id: 'hidden-content',
    name: '숨겨진 비밀 콘텐츠',
    description: '100일의 현자만을 위한 특별 콘텐츠',
    unlockCondition: { type: 'streak', requiredStreak: 100 },
    status: 'locked',
  },
];

/** 콘텐츠 잠금 상태 확인 */
export function getContentStatus(
  contentId: string,
  options: {
    hasBirthDate: boolean;
    currentStreak: number;
    completedActions: string[];
    unlockedIds: string[];
  }
): ContentLockStatus {
  // 이미 해금된 경우
  if (options.unlockedIds.includes(contentId)) return 'unlocked';

  const content = unlockableContents.find(c => c.id === contentId);
  if (!content) return 'locked';

  const { unlockCondition } = content;

  switch (unlockCondition.type) {
    case 'birthdate':
      return options.hasBirthDate ? 'unlocked' : 'locked';

    case 'streak':
      if (!unlockCondition.requiredStreak) return 'locked';
      if (options.currentStreak >= unlockCondition.requiredStreak) return 'unlocked';
      // 50% 이상 달성 시 티저 표시
      if (options.currentStreak >= unlockCondition.requiredStreak * 0.5) return 'teaser';
      return 'locked';

    case 'action':
      return unlockCondition.requiredAction &&
             options.completedActions.includes(unlockCondition.requiredAction)
        ? 'unlocked'
        : 'locked';

    case 'visit':
      return 'locked'; // 기본 잠금

    default:
      return 'locked';
  }
}

/** 모든 콘텐츠의 잠금 상태 조회 */
export function getAllContentStatuses(options: {
  hasBirthDate: boolean;
  currentStreak: number;
  completedActions: string[];
  unlockedIds: string[];
}): Record<string, ContentLockStatus> {
  const result: Record<string, ContentLockStatus> = {};
  for (const content of unlockableContents) {
    result[content.id] = getContentStatus(content.id, options);
  }
  return result;
}

/** 해금 조건 설명 텍스트 */
export function getUnlockRequirementText(contentId: string): string {
  const content = unlockableContents.find(c => c.id === contentId);
  if (!content) return '';

  const { unlockCondition } = content;
  switch (unlockCondition.type) {
    case 'birthdate':
      return '생년월일을 입력하면 해금됩니다';
    case 'streak':
      return `${unlockCondition.requiredStreak}일 연속 방문하면 해금됩니다`;
    case 'action':
      return '기본 운세를 확인하면 해금됩니다';
    case 'visit':
      return `${unlockCondition.requiredVisits}번 방문하면 해금됩니다`;
    default:
      return '특별 조건을 충족하면 해금됩니다';
  }
}

/** 해금 진행률 (0-100) */
export function getUnlockProgress(
  contentId: string,
  currentStreak: number
): number {
  const content = unlockableContents.find(c => c.id === contentId);
  if (!content) return 0;

  if (content.unlockCondition.type === 'streak' && content.unlockCondition.requiredStreak) {
    return Math.min(100, Math.round((currentStreak / content.unlockCondition.requiredStreak) * 100));
  }

  return 0;
}

/** 다음에 해금될 콘텐츠 */
export function getNextUnlockable(currentStreak: number): UnlockableContent | null {
  const streakContents = unlockableContents
    .filter(c => c.unlockCondition.type === 'streak' && c.unlockCondition.requiredStreak)
    .sort((a, b) => (a.unlockCondition.requiredStreak || 0) - (b.unlockCondition.requiredStreak || 0));

  for (const content of streakContents) {
    if (currentStreak < (content.unlockCondition.requiredStreak || 0)) {
      return content;
    }
  }
  return null;
}
