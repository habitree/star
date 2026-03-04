'use client';

import { useState, useEffect } from 'react';
import { getStreakLevel, getMotivationMessage, getDaysToNextMilestone } from '@/lib/streak-rewards';
import { trackEvent } from '@/lib/engagement-tracker';

const CHECKIN_TEXT = {
  ko: { done: '체크인 완료!', consecutive: (n: number) => `${n}일 연속 달성!`, streakDays: (n: number) => `${n}일 연속`, complete: '✓ 완료', checkIn: '오늘의 체크인', dayUnit: '일' },
  en: { done: 'Check-in done!', consecutive: (n: number) => `${n}-day streak!`, streakDays: (n: number) => `${n} days`, complete: '✓ Done', checkIn: "Today's Check-in", dayUnit: 'd' },
  zh: { done: '打卡完成！', consecutive: (n: number) => `连续${n}天！`, streakDays: (n: number) => `连续${n}天`, complete: '✓ 完成', checkIn: '今日打卡', dayUnit: '天' },
  ja: { done: 'チェックイン完了！', consecutive: (n: number) => `${n}日連続達成！`, streakDays: (n: number) => `${n}日連続`, complete: '✓ 完了', checkIn: '今日のチェックイン', dayUnit: '日' },
  es: { done: '¡Check-in hecho!', consecutive: (n: number) => `¡${n} días seguidos!`, streakDays: (n: number) => `${n} días`, complete: '✓ Listo', checkIn: 'Check-in de hoy', dayUnit: 'd' },
} as const;
type CheckInLocale = keyof typeof CHECKIN_TEXT;

interface DailyCheckInProps {
  streak: number;
  todayCheckedIn: boolean;
  onCheckIn: () => void;
  locale?: string;
}

export default function DailyCheckIn({ streak, todayCheckedIn, onCheckIn, locale = 'ko' }: DailyCheckInProps) {
  const tl = CHECKIN_TEXT[(locale as CheckInLocale) in CHECKIN_TEXT ? (locale as CheckInLocale) : 'ko'];
  const [showAnimation, setShowAnimation] = useState(false);
  const [justCheckedIn, setJustCheckedIn] = useState(false);

  const level = getStreakLevel(streak, locale);
  const motivation = getMotivationMessage(streak, locale);
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
            <p className="text-white font-bold text-lg">{tl.done}</p>
            <p className="text-white/70 text-sm">{tl.consecutive(streak + 1)}</p>
          </div>
        </div>
      )}

      {/* 스트릭 정보 */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{level.icon}</span>
          <div>
            <p className={`text-sm font-semibold ${level.color}`}>{level.level}</p>
            <p className="text-white/50 text-xs">{tl.streakDays(streak)}</p>
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
          {todayCheckedIn || justCheckedIn ? tl.complete : tl.checkIn}
        </button>
      </div>

      {/* 진행률 바 */}
      {nextMilestone && (
        <div className="mb-2">
          <div className="flex justify-between text-xs text-white/50 mb-1">
            <span>{streak}{tl.dayUnit}</span>
            <span>{nextMilestone.nextMilestone}{tl.dayUnit}</span>
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
