'use client';

import type { ContentLockStatus } from '@/types/engagement';
import { getUnlockRequirementText, getUnlockProgress } from '@/lib/content-unlock';
import { getDaysToNextMilestone } from '@/lib/streak-rewards';

interface LockedContentProps {
  contentId: string;
  status: ContentLockStatus;
  currentStreak: number;
  children: React.ReactNode;
}

/** 진행률에 따른 동기 부여 메시지 */
function getMotivationText(progress: number): string {
  if (progress >= 80) return '거의 다 왔어요! 조금만 더!';
  if (progress >= 60) return '절반을 넘었어요! 포기하지 마세요!';
  if (progress >= 40) return '꾸준히 성장하고 있어요!';
  return '매일 방문하면 해금할 수 있어요!';
}

export default function LockedContent({
  contentId,
  status,
  currentStreak,
  children,
}: LockedContentProps) {
  if (status === 'unlocked') {
    return <>{children}</>;
  }

  const requirementText = getUnlockRequirementText(contentId);
  const progress = getUnlockProgress(contentId, currentStreak);
  const nextMilestone = getDaysToNextMilestone(currentStreak);

  return (
    <div className="relative">
      {/* 티저: Sneak Preview — 콘텐츠를 선명하게 보여주다 그래디언트로 페이드 */}
      {status === 'teaser' && (
        <div className="relative overflow-hidden pointer-events-none select-none">
          <div className="max-h-[120px] overflow-hidden">
            {children}
          </div>
          {/* 하단 그래디언트 페이드 */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-zodiac-dark" />
        </div>
      )}

      {/* 잠금 정보 카드 */}
      <div className={`${status === 'teaser' ? 'relative -mt-4 z-10' : ''} glass-card p-5 flex flex-col items-center justify-center text-center`}>
        <span className="text-2xl mb-2">{progress >= 50 ? '🔓' : '🔒'}</span>
        <p className="text-white/80 text-sm font-medium mb-1">
          {status === 'teaser' ? '계속 읽으려면...' : '잠긴 콘텐츠'}
        </p>
        <p className="text-white/50 text-xs mb-3">{requirementText}</p>

        {/* 진행률 바 */}
        {progress > 0 && progress < 100 && (
          <div className="w-full max-w-[240px] mb-2">
            <div className="h-2 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between items-center mt-1.5">
              <p className="text-white/40 text-[10px]">{progress}% 달성</p>
              {nextMilestone && (
                <p className="text-white/40 text-[10px]">{nextMilestone.daysRemaining}일 남음</p>
              )}
            </div>
            <p className="text-amber-300/70 text-xs mt-1.5">{getMotivationText(progress)}</p>
          </div>
        )}
      </div>
    </div>
  );
}
