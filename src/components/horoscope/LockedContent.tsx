'use client';

import type { ContentLockStatus } from '@/types/engagement';
import { getUnlockRequirementText, getUnlockProgress } from '@/lib/content-unlock';
import { getDaysToNextMilestone } from '@/lib/streak-rewards';

const LOCKED_TEXT = {
  ko: {
    teaser: '계속 읽으려면...',
    locked: '잠긴 콘텐츠',
    progressPct: (n: number) => `${n}% 달성`,
    daysLeft: (n: number) => `${n}일 남음`,
    motivation: (progress: number): string => {
      if (progress >= 80) return '거의 다 왔어요! 조금만 더!';
      if (progress >= 60) return '절반을 넘었어요! 포기하지 마세요!';
      if (progress >= 40) return '꾸준히 성장하고 있어요!';
      return '매일 방문하면 해금할 수 있어요!';
    },
  },
  en: {
    teaser: 'To continue reading...',
    locked: 'Locked Content',
    progressPct: (n: number) => `${n}% complete`,
    daysLeft: (n: number) => `${n} days left`,
    motivation: (progress: number): string => {
      if (progress >= 80) return "Almost there! Just a little more!";
      if (progress >= 60) return "You're past halfway! Don't give up!";
      if (progress >= 40) return "You're steadily growing!";
      return 'Visit daily to unlock this content!';
    },
  },
  zh: {
    teaser: '继续阅读...',
    locked: '锁定内容',
    progressPct: (n: number) => `已完成 ${n}%`,
    daysLeft: (n: number) => `还剩 ${n} 天`,
    motivation: (progress: number): string => {
      if (progress >= 80) return '快到了！再加把劲！';
      if (progress >= 60) return '超过一半了！不要放弃！';
      if (progress >= 40) return '在稳步成长！';
      return '每天访问即可解锁此内容！';
    },
  },
  ja: {
    teaser: '続きを読むには...',
    locked: 'ロックされたコンテンツ',
    progressPct: (n: number) => `${n}% 達成`,
    daysLeft: (n: number) => `あと ${n} 日`,
    motivation: (progress: number): string => {
      if (progress >= 80) return 'もう少し！あと少しです！';
      if (progress >= 60) return '半分以上来ました！諦めないで！';
      if (progress >= 40) return '着実に成長しています！';
      return '毎日訪問してコンテンツを解放しましょう！';
    },
  },
  es: {
    teaser: 'Para continuar leyendo...',
    locked: 'Contenido Bloqueado',
    progressPct: (n: number) => `${n}% completado`,
    daysLeft: (n: number) => `${n} días restantes`,
    motivation: (progress: number): string => {
      if (progress >= 80) return '¡Casi ahí! ¡Un poco más!';
      if (progress >= 60) return '¡Superaste la mitad! ¡No te rindas!';
      if (progress >= 40) return '¡Estás creciendo constantemente!';
      return '¡Visita diariamente para desbloquear este contenido!';
    },
  },
} as const;
type LockedLocale = keyof typeof LOCKED_TEXT;

interface LockedContentProps {
  contentId: string;
  status: ContentLockStatus;
  currentStreak: number;
  children: React.ReactNode;
  locale?: string;
}

export default function LockedContent({
  contentId,
  status,
  currentStreak,
  children,
  locale = 'ko',
}: LockedContentProps) {
  if (status === 'unlocked') {
    return <>{children}</>;
  }

  const tl = LOCKED_TEXT[(locale as LockedLocale) in LOCKED_TEXT ? (locale as LockedLocale) : 'ko'];
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
          {status === 'teaser' ? tl.teaser : tl.locked}
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
              <p className="text-white/40 text-[10px]">{tl.progressPct(progress)}</p>
              {nextMilestone && (
                <p className="text-white/40 text-[10px]">{tl.daysLeft(nextMilestone.daysRemaining)}</p>
              )}
            </div>
            <p className="text-amber-300/70 text-xs mt-1.5">{tl.motivation(progress)}</p>
          </div>
        )}
      </div>
    </div>
  );
}
