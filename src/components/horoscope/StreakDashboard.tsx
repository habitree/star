'use client';

import { getEarnedBadges, getDaysToNextMilestone, getStreakLevel } from '@/lib/streak-rewards';
import type { Badge } from '@/types/engagement';

interface StreakDashboardProps {
  streak: number;
  longestStreak: number;
  earnedBadges: Badge[];
}

export default function StreakDashboard({ streak, longestStreak, earnedBadges }: StreakDashboardProps) {
  const level = getStreakLevel(streak);
  const nextMilestone = getDaysToNextMilestone(streak);
  const allBadges = getEarnedBadges(streak);
  const displayBadges = earnedBadges.length > 0 ? earnedBadges : allBadges;

  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-semibold text-white mb-4 text-center">나의 여정</h3>

      {/* 현재 레벨 */}
      <div className="text-center mb-5">
        <span className="text-4xl">{level.icon}</span>
        <p className={`font-bold mt-1 ${level.color}`}>{level.level}</p>
        <p className="text-white/50 text-sm">
          현재 {streak}일 연속 · 최장 {longestStreak}일
        </p>
      </div>

      {/* 배지 목록 */}
      {displayBadges.length > 0 && (
        <div className="mb-4">
          <p className="text-white/60 text-xs mb-2 text-center">획득한 배지</p>
          <div className="flex justify-center gap-3 flex-wrap">
            {displayBadges.map((badge) => (
              <div
                key={badge.id}
                className="flex flex-col items-center gap-1 p-2 rounded-xl bg-white/5"
                title={badge.description}
              >
                <span className="text-2xl">{badge.icon}</span>
                <span className="text-[10px] text-white/60">{badge.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 미달성 마일스톤 미리보기 */}
      {nextMilestone && (
        <div className="text-center border-t border-white/10 pt-3">
          <p className="text-white/50 text-xs">
            다음 목표: <span className="text-white/80 font-medium">{nextMilestone.nextMilestone}일</span>
          </p>
          <p className="text-white/40 text-[10px] mt-1">
            {nextMilestone.daysRemaining}일 남았어요!
          </p>
        </div>
      )}
    </div>
  );
}
