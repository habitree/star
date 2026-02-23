'use client';

import type { ContentLockStatus } from '@/types/engagement';
import { getUnlockRequirementText, getUnlockProgress } from '@/lib/content-unlock';

interface LockedContentProps {
  contentId: string;
  status: ContentLockStatus;
  currentStreak: number;
  children: React.ReactNode;
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

  return (
    <div className="relative">
      {/* 티저: 흐리게 표시 */}
      {status === 'teaser' && (
        <div className="opacity-30 blur-[2px] pointer-events-none select-none">
          {children}
        </div>
      )}

      {/* 잠금 오버레이 */}
      <div className={`${status === 'teaser' ? 'absolute inset-0' : ''} glass-card p-6 flex flex-col items-center justify-center text-center min-h-[120px]`}>
        <span className="text-3xl mb-2">🔒</span>
        <p className="text-white/80 text-sm font-medium mb-1">잠긴 콘텐츠</p>
        <p className="text-white/50 text-xs mb-3">{requirementText}</p>

        {/* 진행률 */}
        {progress > 0 && progress < 100 && (
          <div className="w-full max-w-[200px]">
            <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-white/40 text-[10px] mt-1">{progress}% 달성</p>
          </div>
        )}
      </div>
    </div>
  );
}
