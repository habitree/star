'use client';

/**
 * BigThreeCard — Big Three 단계별 블러/공개 카드 (Phase 3)
 * 심리: Zeigarnik(블러) + 가변 보상(해금 순간) + 매몰 비용(30일 스트릭)
 */

import { zodiacData } from '@/data/zodiac-info';
import { zodiacSigns } from '@/data/zodiac-signs';
import {
  BIG_THREE_ROLES,
  MOON_UNLOCK_MESSAGE,
  RISING_UNLOCK_MESSAGE,
  type BigThreeUnlockStatus,
} from '@/lib/birth-chart-content';
import type { ZodiacSignId } from '@/types';

type L = 'ko' | 'en' | 'zh' | 'ja' | 'es';

const TEXT = {
  ko: {
    title: 'Big Three — 나의 3개 별자리',
    synthesisCta: '합성 리딩 (프리미엄)',
    birthTimePrompt: '정확한 달자리는 출생 시간이 필요해요',
    birthTimeAdd: '출생 시간 입력하기',
    daysNeeded: (n: number) => `${n}일 뒤 해금`,
  },
  en: {
    title: 'Big Three — Your 3 Signs',
    synthesisCta: 'Synthesis Reading (Premium)',
    birthTimePrompt: 'Exact Moon sign requires birth time',
    birthTimeAdd: 'Add birth time',
    daysNeeded: (n: number) => `Unlocks in ${n} days`,
  },
  zh: {
    title: 'Big Three — 我的三个星座',
    synthesisCta: '合成解读（高级）',
    birthTimePrompt: '精确月亮星座需要出生时间',
    birthTimeAdd: '添加出生时间',
    daysNeeded: (n: number) => `${n}天后解锁`,
  },
  ja: {
    title: 'Big Three — 私の3つの星座',
    synthesisCta: '合成リーディング（プレミアム）',
    birthTimePrompt: '正確な月星座には出生時間が必要',
    birthTimeAdd: '出生時間を入力',
    daysNeeded: (n: number) => `${n}日後に解放`,
  },
  es: {
    title: 'Big Three — Tus 3 Signos',
    synthesisCta: 'Lectura de Síntesis (Premium)',
    birthTimePrompt: 'El signo lunar exacto requiere hora de nacimiento',
    birthTimeAdd: 'Añadir hora de nacimiento',
    daysNeeded: (n: number) => `Se desbloquea en ${n} días`,
  },
} as const;

function getSignName(signId: ZodiacSignId, locale: string): string {
  const s = zodiacSigns.find(s => s.id === signId);
  return s?.names[locale as keyof typeof s.names] ?? zodiacData[signId]?.name ?? signId;
}

interface BigThreeCardProps {
  sunSign: ZodiacSignId;
  moonSign: ZodiacSignId;
  risingSign: ZodiacSignId;
  unlockStatus: BigThreeUnlockStatus;
  visitStreak: number;
  hasBirthTime: boolean;
  onAddBirthTime?: () => void;
  locale?: string;
}

export default function BigThreeCard({
  sunSign,
  moonSign,
  risingSign,
  unlockStatus,
  visitStreak,
  hasBirthTime,
  onAddBirthTime,
  locale = 'ko',
}: BigThreeCardProps) {
  const tl = TEXT[(locale as L) in TEXT ? (locale as L) : 'ko'];
  const roles = BIG_THREE_ROLES;
  const moonDaysLeft = Math.max(0, 7 - visitStreak);
  const risingDaysLeft = Math.max(0, 30 - visitStreak);

  const rows: Array<{
    planet: string;
    key: 'sun' | 'moon' | 'rising';
    signId: ZodiacSignId;
    status: 'unlocked' | 'locked';
    daysLeft: number;
    unlockMessage: string;
  }> = [
    {
      planet: '☀️',
      key: 'sun',
      signId: sunSign,
      status: 'unlocked',
      daysLeft: 0,
      unlockMessage: '',
    },
    {
      planet: '🌙',
      key: 'moon',
      signId: moonSign,
      status: unlockStatus.moon,
      daysLeft: moonDaysLeft,
      unlockMessage: MOON_UNLOCK_MESSAGE[locale as L] ?? MOON_UNLOCK_MESSAGE.en,
    },
    {
      planet: '↑',
      key: 'rising',
      signId: risingSign,
      status: unlockStatus.rising,
      daysLeft: risingDaysLeft,
      unlockMessage: RISING_UNLOCK_MESSAGE[locale as L] ?? RISING_UNLOCK_MESSAGE.en,
    },
  ];

  return (
    <div className="glass-card p-5">
      <h3 className="text-sm font-semibold text-white/80 mb-4 text-center">{tl.title}</h3>

      <div className="space-y-3">
        {rows.map(row => {
          const roleInfo = roles[row.key][locale as L] ?? roles[row.key].en;
          const isUnlocked = row.status === 'unlocked';

          return (
            <div
              key={row.key}
              className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                isUnlocked
                  ? 'bg-white/5 border border-white/10'
                  : 'bg-white/3 border border-white/5 opacity-60'
              }`}
            >
              {/* 행성 아이콘 */}
              <span className="text-xl w-8 text-center flex-shrink-0">{row.planet}</span>

              {/* 별자리 정보 */}
              <div className="flex-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-white/50 text-xs">{roleInfo.role}</span>
                  <span className="text-white/30 text-xs">·</span>
                  <span className="text-white/40 text-[11px]">{roleInfo.desc}</span>
                </div>

                {isUnlocked ? (
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-lg">{zodiacData[row.signId]?.symbol}</span>
                    <span className="text-white font-semibold text-sm">
                      {getSignName(row.signId, locale)}
                    </span>
                  </div>
                ) : (
                  <div className="mt-0.5">
                    {/* 블러 표시 */}
                    <div className="flex items-center gap-2">
                      <span className="text-lg opacity-30 blur-sm select-none">
                        {zodiacData[row.signId]?.symbol}
                      </span>
                      <span className="text-white/20 font-semibold text-sm blur-sm select-none">
                        {getSignName(row.signId, locale)}
                      </span>
                    </div>
                    <p className="text-white/40 text-[10px] mt-0.5">{row.unlockMessage}</p>
                    {row.daysLeft > 0 && (
                      <div className="mt-1">
                        <div className="h-1 rounded-full bg-white/10 overflow-hidden w-24">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                            style={{
                              width: `${Math.min(100, (visitStreak / (row.key === 'moon' ? 7 : 30)) * 100)}%`
                            }}
                          />
                        </div>
                        <p className="text-white/30 text-[10px] mt-0.5">
                          {tl.daysNeeded(row.daysLeft)}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* 잠금 아이콘 */}
              {!isUnlocked && (
                <span className="text-white/20 text-lg flex-shrink-0">🔒</span>
              )}
            </div>
          );
        })}
      </div>

      {/* 출생 시간 입력 유도 */}
      {!hasBirthTime && unlockStatus.moon === 'unlocked' && (
        <div className="mt-3 p-3 rounded-lg bg-amber-500/5 border border-amber-500/20">
          <p className="text-amber-300/70 text-xs mb-2">{tl.birthTimePrompt}</p>
          {onAddBirthTime && (
            <button
              onClick={onAddBirthTime}
              className="text-xs text-amber-400 underline underline-offset-2"
            >
              {tl.birthTimeAdd}
            </button>
          )}
        </div>
      )}

      {/* 프리미엄 합성 리딩 CTA */}
      {unlockStatus.synthesis === 'locked' && (
        <button
          disabled
          className="mt-4 w-full py-2.5 rounded-xl border border-white/10 text-white/30 text-sm cursor-not-allowed"
        >
          ✨ {tl.synthesisCta}
        </button>
      )}
    </div>
  );
}
