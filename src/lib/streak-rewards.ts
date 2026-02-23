/**
 * 스트릭/배지 보상 시스템
 * 심리학 근거: 손실 회피, 간헐적 강화, 21/30일 습관 법칙
 */

import type { Badge, StreakMilestone, StreakReward } from '@/types/engagement';

/** 스트릭 마일스톤 배지 정의 */
export const streakBadges: Record<StreakMilestone, Badge> = {
  3: {
    id: 'streak-3',
    name: '운세 초보 탐험가',
    description: '3일 연속 운세를 확인했습니다! 별과의 인연이 시작되었어요.',
    icon: '🌟',
    requiredStreak: 3,
  },
  7: {
    id: 'streak-7',
    name: '별빛 수집가',
    description: '7일 연속! 매일의 별빛을 모으고 있군요. 주간 리포트가 해금되었습니다.',
    icon: '⭐',
    requiredStreak: 7,
  },
  14: {
    id: 'streak-14',
    name: '우주의 탐구자',
    description: '14일 연속! 별들이 당신을 기억하기 시작했어요. 프리미엄 타로가 해금되었습니다.',
    icon: '🔮',
    requiredStreak: 14,
  },
  30: {
    id: 'streak-30',
    name: '별의 동반자',
    description: '30일 연속! 당신은 이제 별과 하나입니다. 월간 종합 리딩이 해금되었습니다.',
    icon: '🌙',
    requiredStreak: 30,
  },
  100: {
    id: 'streak-100',
    name: '별의 현자',
    description: '100일 연속! 전설적인 기록입니다. 숨겨진 콘텐츠가 해금되었습니다.',
    icon: '👑',
    requiredStreak: 100,
  },
};

/** 스트릭 보상 정의 */
export const streakRewards: StreakReward[] = [
  {
    milestone: 3,
    badge: streakBadges[3],
    unlockContent: 'chat-fortune',
    message: '축하합니다! 🌟 3일 연속 방문! "별의 도사"와의 대화가 해금되었습니다.',
  },
  {
    milestone: 7,
    badge: streakBadges[7],
    unlockContent: 'weekly-report',
    message: '대단해요! ⭐ 7일 연속! 주간 종합 리포트가 해금되었습니다.',
  },
  {
    milestone: 14,
    badge: streakBadges[14],
    unlockContent: 'premium-tarot',
    message: '놀라워요! 🔮 14일 연속! 프리미엄 3장 타로 스프레드가 해금되었습니다.',
  },
  {
    milestone: 30,
    badge: streakBadges[30],
    unlockContent: 'monthly-reading',
    message: '전설적이에요! 🌙 30일 연속! 월간 종합 리딩이 해금되었습니다.',
  },
  {
    milestone: 100,
    badge: streakBadges[100],
    unlockContent: 'hidden-content',
    message: '경이로워요! 👑 100일의 현자! 숨겨진 비밀 콘텐츠가 해금되었습니다.',
  },
];

/** 현재 스트릭에 해당하는 배지들 */
export function getEarnedBadges(streak: number): Badge[] {
  const milestones: StreakMilestone[] = [3, 7, 14, 30, 100];
  return milestones
    .filter(m => streak >= m)
    .map(m => streakBadges[m]);
}

/** 다음 마일스톤까지 남은 일수 */
export function getDaysToNextMilestone(streak: number): {
  nextMilestone: StreakMilestone;
  daysRemaining: number;
} | null {
  const milestones: StreakMilestone[] = [3, 7, 14, 30, 100];
  for (const milestone of milestones) {
    if (streak < milestone) {
      return {
        nextMilestone: milestone,
        daysRemaining: milestone - streak,
      };
    }
  }
  return null; // 모든 마일스톤 달성
}

/** 새로 달성한 마일스톤 확인 */
export function getNewlyEarnedReward(
  previousStreak: number,
  currentStreak: number
): StreakReward | null {
  for (const reward of streakRewards) {
    if (previousStreak < reward.milestone && currentStreak >= reward.milestone) {
      return reward;
    }
  }
  return null;
}

/** 스트릭 레벨 (표시용) */
export function getStreakLevel(streak: number): {
  level: string;
  icon: string;
  color: string;
} {
  if (streak >= 100) return { level: '별의 현자', icon: '👑', color: 'text-yellow-400' };
  if (streak >= 30) return { level: '별의 동반자', icon: '🌙', color: 'text-purple-400' };
  if (streak >= 14) return { level: '우주의 탐구자', icon: '🔮', color: 'text-blue-400' };
  if (streak >= 7) return { level: '별빛 수집가', icon: '⭐', color: 'text-cyan-400' };
  if (streak >= 3) return { level: '운세 초보 탐험가', icon: '🌟', color: 'text-green-400' };
  return { level: '별의 여행자', icon: '✨', color: 'text-white/60' };
}

/** 스트릭 유지 동기부여 메시지 */
export function getMotivationMessage(streak: number): string {
  const next = getDaysToNextMilestone(streak);
  if (!next) return '👑 모든 마일스톤을 달성한 전설적인 현자님! 별들이 경의를 표합니다.';

  if (next.daysRemaining === 1) {
    return `내일이면 ${next.nextMilestone}일 달성! 🎉 새로운 보상이 기다리고 있어요!`;
  }
  if (next.daysRemaining <= 3) {
    return `${next.nextMilestone}일까지 ${next.daysRemaining}일 남았어요! 거의 다 왔어요! 💪`;
  }
  return `${next.nextMilestone}일 달성까지 ${next.daysRemaining}일! 꾸준히 함께해요 ✨`;
}
