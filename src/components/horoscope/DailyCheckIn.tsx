'use client';

import { useState, useEffect } from 'react';
import { getStreakLevel, getMotivationMessage, getDaysToNextMilestone } from '@/lib/streak-rewards';
import { trackEvent } from '@/lib/engagement-tracker';

interface DailyCheckInProps {
  streak: number;
  todayCheckedIn: boolean;
  onCheckIn: () => void;
}

export default function DailyCheckIn({ streak, todayCheckedIn, onCheckIn }: DailyCheckInProps) {
  const [showAnimation, setShowAnimation] = useState(false);
  const [justCheckedIn, setJustCheckedIn] = useState(false);

  const level = getStreakLevel(streak);
  const motivation = getMotivationMessage(streak);
  const nextMilestone = getDaysToNextMilestone(streak);

  const handleCheckIn = () => {
    if (todayCheckedIn) return;
    setShowAnimation(true);
    setJustCheckedIn(true);
    onCheckIn();
    trackEvent('checkin_complete', { streak: streak + 1 });

    setTimeout(() => setShowAnimation(false), 2000);
  };

  // 진행률 계산
  const progressPercent = nextMilestone
    ? Math.round(((nextMilestone.nextMilestone - nextMilestone.daysRemaining) / nextMilestone.nextMilestone) * 100)
    : 100;

  return (
    <div className="glass-card p-5 relative overflow-hidden">
      {/* 체크인 애니메이션 */}
      {showAnimation && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-10 animate-fade-in-up">
          <div className="text-center">
            <div className="text-5xl mb-2 animate-scale-in">🎉</div>
            <p className="text-white font-bold text-lg">체크인 완료!</p>
            <p className="text-white/70 text-sm">{streak + 1}일 연속 달성!</p>
          </div>
        </div>
      )}

      {/* 스트릭 정보 */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{level.icon}</span>
          <div>
            <p className={`text-sm font-semibold ${level.color}`}>{level.level}</p>
            <p className="text-white/50 text-xs">{streak}일 연속</p>
          </div>
        </div>

        {/* 체크인 버튼 */}
        <button
          onClick={handleCheckIn}
          disabled={todayCheckedIn || justCheckedIn}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            todayCheckedIn || justCheckedIn
              ? 'bg-green-500/20 text-green-300 cursor-default'
              : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90 active:scale-95'
          }`}
        >
          {todayCheckedIn || justCheckedIn ? '✓ 완료' : '오늘의 체크인'}
        </button>
      </div>

      {/* 진행률 바 */}
      {nextMilestone && (
        <div className="mb-2">
          <div className="flex justify-between text-xs text-white/50 mb-1">
            <span>{streak}일</span>
            <span>{nextMilestone.nextMilestone}일</span>
          </div>
          <div className="h-2 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-1000"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      )}

      {/* 동기부여 메시지 */}
      <p className="text-white/60 text-xs text-center mt-2">
        {motivation}
      </p>
    </div>
  );
}
