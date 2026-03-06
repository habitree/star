'use client';

/**
 * WinBackBanner — 이탈 복귀 배너 (Phase 1)
 * 심리: 손실 회피 × Zeigarnik — "N일간의 점수가 기다린다"
 */

import { useState } from 'react';
import { trackEvent } from '@/lib/engagement-tracker';
import type { ZodiacSignId } from '@/types';

const TEXT = {
  ko: {
    title: (days: number) => `${days}일 동안 별이 당신을 기다렸어요`,
    streakWarning: (n: number) => `${n}일 스트릭이 위험합니다`,
    previewLabel: '최근 점수 변화',
    daysAgo: (n: number) => `${n}일 전`,
    yesterday: '어제',
    today: '오늘',
    unknown: '?점',
    cta: '지금 체크인하기',
    ctaDone: '✓ 체크인 완료!',
    subtext: '체크인하면 스트릭이 복구됩니다',
  },
  en: {
    title: (days: number) => `The stars waited ${days} days for you`,
    streakWarning: (n: number) => `Your ${n}-day streak is at risk`,
    previewLabel: 'Recent score changes',
    daysAgo: (n: number) => `${n}d ago`,
    yesterday: 'Yesterday',
    today: 'Today',
    unknown: '?pts',
    cta: 'Check In Now',
    ctaDone: '✓ Checked In!',
    subtext: 'Check in to recover your streak',
  },
  zh: {
    title: (days: number) => `星星等了你${days}天`,
    streakWarning: (n: number) => `您的${n}天连续记录岌岌可危`,
    previewLabel: '近期分数变化',
    daysAgo: (n: number) => `${n}天前`,
    yesterday: '昨天',
    today: '今天',
    unknown: '?分',
    cta: '立即打卡',
    ctaDone: '✓ 打卡完成！',
    subtext: '打卡即可恢复连续记录',
  },
  ja: {
    title: (days: number) => `${days}日間、星があなたを待っていました`,
    streakWarning: (n: number) => `${n}日連続記録が危険です`,
    previewLabel: '最近のスコア変化',
    daysAgo: (n: number) => `${n}日前`,
    yesterday: '昨日',
    today: '今日',
    unknown: '?点',
    cta: '今すぐチェックイン',
    ctaDone: '✓ チェックイン完了！',
    subtext: 'チェックインでストリークを回復',
  },
  es: {
    title: (days: number) => `Las estrellas te esperaron ${days} días`,
    streakWarning: (n: number) => `Tu racha de ${n} días está en riesgo`,
    previewLabel: 'Cambios de puntuación recientes',
    daysAgo: (n: number) => `hace ${n}d`,
    yesterday: 'Ayer',
    today: 'Hoy',
    unknown: '?pts',
    cta: 'Registrarse Ahora',
    ctaDone: '✓ ¡Registrado!',
    subtext: 'Regístrate para recuperar tu racha',
  },
} as const;
type L = keyof typeof TEXT;

interface WinBackBannerProps {
  signId: ZodiacSignId;
  visitStreak: number;
  daysSinceLast: number;
  recentScores: { score: number; daysAgo: number }[]; // 최근 1-3일 점수 (없으면 빈 배열)
  todayScore: number;
  todayCheckedIn: boolean;
  onCheckIn: () => void;
  locale?: string;
}

export default function WinBackBanner({
  visitStreak,
  daysSinceLast,
  recentScores,
  todayScore,
  todayCheckedIn,
  onCheckIn,
  locale = 'ko',
}: WinBackBannerProps) {
  const tl = TEXT[(locale as L) in TEXT ? (locale as L) : 'ko'];
  const [justCheckedIn, setJustCheckedIn] = useState(false);

  const handleCheckIn = () => {
    if (todayCheckedIn || justCheckedIn) return;
    setJustCheckedIn(true);
    onCheckIn();
    trackEvent('winback_checkin', { streak: visitStreak, daysSinceLast });
  };

  // 점수 미리보기 항목 (최대 3개)
  const previewItems = recentScores.slice(0, 2).map(s => ({
    label: s.daysAgo === 1 ? tl.yesterday : tl.daysAgo(s.daysAgo),
    score: s.score,
  }));

  const done = todayCheckedIn || justCheckedIn;

  return (
    <div
      className="glass-card p-5 mb-6 bg-gradient-to-br from-red-500/10 via-orange-500/5 to-amber-500/10 border-orange-500/30 animate-fade-in-up"
      role="alert"
    >
      {/* 경고 헤더 */}
      <div className="flex items-start gap-3 mb-4">
        <span className="text-3xl flex-shrink-0">⚠️</span>
        <div>
          <p className="text-white font-semibold text-sm leading-snug">
            {tl.title(daysSinceLast)}
          </p>
          {visitStreak > 1 && (
            <p className="text-orange-300/90 text-xs mt-0.5 font-medium">
              {tl.streakWarning(visitStreak)}
            </p>
          )}
        </div>
      </div>

      {/* 점수 미리보기 타임라인 */}
      {previewItems.length > 0 && (
        <div className="mb-4">
          <p className="text-white/40 text-xs mb-2">{tl.previewLabel}</p>
          <div className="flex items-end gap-3">
            {previewItems.map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <div
                  className="w-10 rounded-t-md bg-white/20"
                  style={{ height: `${Math.round((item.score / 100) * 40) + 8}px` }}
                />
                <span className="text-white/80 text-[11px] font-semibold">{item.score}점</span>
                <span className="text-white/40 text-[10px]">{item.label}</span>
              </div>
            ))}
            {/* 오늘 (물음표) */}
            <div className="flex flex-col items-center gap-1">
              <div className="w-10 h-12 rounded-t-md bg-amber-400/30 border border-amber-400/50 border-dashed flex items-center justify-center">
                <span className="text-amber-300 text-sm font-bold">?</span>
              </div>
              <span className="text-amber-300 text-[11px] font-semibold">{done ? `${todayScore}점` : tl.unknown}</span>
              <span className="text-white/40 text-[10px]">{tl.today}</span>
            </div>
          </div>
        </div>
      )}

      {/* CTA */}
      <button
        onClick={handleCheckIn}
        disabled={done}
        className={`w-full py-3 rounded-xl font-semibold text-sm transition-all ${
          done
            ? 'bg-green-500/20 text-green-300 cursor-default'
            : 'bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:opacity-90 active:scale-95'
        }`}
      >
        {done ? tl.ctaDone : tl.cta}
      </button>
      {!done && (
        <p className="text-white/40 text-xs text-center mt-2">{tl.subtext}</p>
      )}
    </div>
  );
}
