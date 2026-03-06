'use client';

/**
 * BigThreeTeaser — HoroscopeClientApp 삽입용 미니 티저 (Phase 3)
 * D7+ 사용자에게 표시 (committed, power 세그먼트)
 */

import Link from 'next/link';
import type { ZodiacSignId } from '@/types';
import { zodiacData } from '@/data/zodiac-info';

const TEXT = {
  ko: {
    title: 'Big Three 별자리 알아보기',
    desc: '태양자리 너머의 나 — 달자리·상승점',
    cta: '출생 차트 보기',
    unlocked: (n: number) => `${n}개 해금됨`,
  },
  en: {
    title: 'Discover Your Big Three',
    desc: 'Beyond your Sun sign — Moon & Rising',
    cta: 'View Birth Chart',
    unlocked: (n: number) => `${n} unlocked`,
  },
  zh: {
    title: '探索你的Big Three',
    desc: '太阳星座之外 — 月亮与上升',
    cta: '查看出生图',
    unlocked: (n: number) => `已解锁${n}个`,
  },
  ja: {
    title: 'Big Threeを発見しよう',
    desc: '太陽星座の先へ — 月と上昇',
    cta: '出生図を見る',
    unlocked: (n: number) => `${n}個解放済み`,
  },
  es: {
    title: 'Descubre tu Big Three',
    desc: 'Más allá de tu signo solar — Luna y Ascendente',
    cta: 'Ver Carta Natal',
    unlocked: (n: number) => `${n} desbloqueados`,
  },
} as const;
type L = keyof typeof TEXT;

interface BigThreeTeaserProps {
  signId: ZodiacSignId;
  visitStreak: number;
  locale?: string;
}

export default function BigThreeTeaser({ signId, visitStreak, locale = 'ko' }: BigThreeTeaserProps) {
  const tl = TEXT[(locale as L) in TEXT ? (locale as L) : 'ko'];

  // 해금된 개수 (태양 = 항상, 달 = 7+, 상승 = 30+)
  const unlockedCount = 1 + (visitStreak >= 7 ? 1 : 0) + (visitStreak >= 30 ? 1 : 0);

  return (
    <div className="glass-card p-4 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border-indigo-500/20">
      <div className="flex items-center gap-3">
        <div className="text-2xl flex-shrink-0">{zodiacData[signId]?.symbol ?? '⭐'}</div>
        <div className="flex-1">
          <p className="text-white font-semibold text-sm">{tl.title}</p>
          <p className="text-white/50 text-xs">{tl.desc}</p>
          <div className="flex items-center gap-2 mt-1">
            {/* 3개 점 — 해금 상태 표시 */}
            <div className="flex gap-1">
              {[0, 1, 2].map(i => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full ${i < unlockedCount ? 'bg-indigo-400' : 'bg-white/20'}`}
                />
              ))}
            </div>
            <span className="text-indigo-300/70 text-[10px]">{tl.unlocked(unlockedCount)}</span>
          </div>
        </div>
        <Link
          href={`/${locale}/birth-chart`}
          className="flex-shrink-0 px-3 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 text-xs font-medium hover:bg-indigo-500/30 transition-colors"
        >
          {tl.cta}
        </Link>
      </div>
    </div>
  );
}
