'use client';

import { getEarnedBadges, getDaysToNextMilestone, getStreakLevel, getBadgeName } from '@/lib/streak-rewards';
import { trackRetentionView } from '@/lib/engagement-tracker';
import type { Badge } from '@/types/engagement';

const STREAK_TEXT = {
  ko: {
    ariaLabel: '스트릭 및 배지 요약', title: '나의 여정',
    current: '현재', days: '일 연속', longest: '최장', longestDays: '일 기록',
    badges: '획득한 배지', nextGoal: '다음 목표:', streak: '일 스트릭',
    daysRemain: '앞으로', daysMore: '일만 더 채우면 새로운 보상이 열려요.',
  },
  en: {
    ariaLabel: 'Streak & badge summary', title: 'My Journey',
    current: 'Current', days: '-day streak', longest: 'Best', longestDays: ' days',
    badges: 'Earned Badges', nextGoal: 'Next goal:', streak: '-day streak',
    daysRemain: 'Just', daysMore: ' more days to unlock a new reward.',
  },
  zh: {
    ariaLabel: '连续记录和徽章摘要', title: '我的旅程',
    current: '当前', days: '天连续', longest: '最长', longestDays: '天记录',
    badges: '获得的徽章', nextGoal: '下一目标：', streak: '天连续',
    daysRemain: '还需', daysMore: '天即可解锁新奖励。',
  },
  ja: {
    ariaLabel: 'ストリーク・バッジ概要', title: '私の旅',
    current: '現在', days: '日連続', longest: '最長', longestDays: '日記録',
    badges: '獲得バッジ', nextGoal: '次の目標：', streak: '日ストリーク',
    daysRemain: 'あと', daysMore: '日で新しい報酬が解放されます。',
  },
  es: {
    ariaLabel: 'Resumen de racha y insignias', title: 'Mi Viaje',
    current: 'Actual', days: ' días seguidos', longest: 'Mejor', longestDays: ' días',
    badges: 'Insignias obtenidas', nextGoal: 'Siguiente meta:', streak: '-días de racha',
    daysRemain: 'Solo', daysMore: ' días más para desbloquear una nueva recompensa.',
  },
} as const;
type StreakLocale = keyof typeof STREAK_TEXT;

interface StreakDashboardProps {
  streak: number;
  longestStreak: number;
  earnedBadges: Badge[];
  locale?: string;
}

export default function StreakDashboard({ streak, longestStreak, earnedBadges, locale = 'ko' }: StreakDashboardProps) {
  const tl = STREAK_TEXT[(locale as StreakLocale) in STREAK_TEXT ? (locale as StreakLocale) : 'ko'];
  const level = getStreakLevel(streak, locale);
  const nextMilestone = getDaysToNextMilestone(streak);
  const allBadges = getEarnedBadges(streak);
  const displayBadges = earnedBadges.length > 0 ? earnedBadges : allBadges;

  if (streak > 0) {
    trackRetentionView({ surface: 'streak-dashboard', action: 'view' });
  }

  return (
    <section aria-label={tl.ariaLabel} className="glass-card p-6">
      <h3 className="text-lg font-semibold text-white mb-4 text-center">{tl.title}</h3>

      {/* 현재 레벨 + 원형 진행 뷰 */}
      <div className="flex flex-col items-center mb-5">
        <div className="relative mb-3">
          <div className="w-20 h-20 rounded-full border-2 border-yellow-400/40 flex items-center justify-center shadow-glow-sm">
            <span className="text-3xl">{level.icon}</span>
          </div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/60 border border-white/10">
            <p className={`text-[11px] font-semibold ${level.color}`}>{level.level}</p>
          </div>
        </div>
        <p className="text-white/60 text-xs mb-1">
          {tl.current} <span className="font-semibold text-white">{streak}</span>{tl.days}
        </p>
        <p className="text-white/40 text-[11px]">
          {tl.longest} <span className="font-medium text-white/70">{longestStreak}</span>{tl.longestDays}
        </p>
      </div>

      {/* 배지 목록 */}
      {displayBadges.length > 0 && (
        <div className="mb-4">
          <p className="text-white/60 text-xs mb-2 text-center">{tl.badges}</p>
          <div className="grid grid-cols-3 gap-3">
            {displayBadges.map((badge) => (
              <div
                key={badge.id}
                className="flex flex-col items-center gap-1 p-2 rounded-2xl bg-surface-elevated/80 border border-border-subtle shadow-card-inner animate-badge-earn"
                title={badge.description}
              >
                <span className="text-2xl drop-shadow-glow">{badge.icon}</span>
                <span className="text-[10px] text-white/70 text-center leading-tight">{getBadgeName(badge.id, locale)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 미달성 마일스톤 미리보기 */}
      {nextMilestone && (
        <div className="mt-3 pt-3 border-t border-white/10 text-center">
          <p className="text-white/50 text-xs mb-1">
            {tl.nextGoal}&nbsp;
            <span className="text-white/85 font-medium">{nextMilestone.nextMilestone}{tl.streak}</span>
          </p>
          <p className="text-white/40 text-[11px]">
            {tl.daysRemain} <span className="font-semibold text-white/70">{nextMilestone.daysRemaining}</span>{tl.daysMore}
          </p>
        </div>
      )}
    </section>
  );
}
