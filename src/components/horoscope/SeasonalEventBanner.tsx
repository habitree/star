'use client';

import Link from 'next/link';
import type { SeasonalEvent, SeasonalEventType } from '@/types/engagement';
import { getContextualAffiliate } from '@/lib/affiliate-config';

interface SeasonalEventBannerProps {
  events: SeasonalEvent[];
  locale?: string;
  maxEvents?: number;
}

/** 이벤트 타입별 아이콘 */
const EVENT_ICONS: Partial<Record<SeasonalEventType, string>> = {
  mercury_retrograde: '☿️',
  full_moon: '🌕',
  new_moon: '🌑',
  solar_term: '🌿',
  zodiac_season: '⭐',
  valentine: '💕',
  white_day: '🤍',
  christmas: '🎄',
  new_year: '🎆',
  chuseok: '🌾',
  seollal: '🎊',
};

/** 이벤트 타입별 배경 스타일 */
const EVENT_STYLES: Partial<Record<SeasonalEventType, { bg: string; border: string; glow: string }>> = {
  mercury_retrograde: {
    bg: 'from-orange-500/10 to-red-500/10',
    border: 'border-orange-500/20',
    glow: 'text-orange-300',
  },
  full_moon: {
    bg: 'from-yellow-500/10 to-amber-500/10',
    border: 'border-yellow-500/20',
    glow: 'text-yellow-300',
  },
  new_moon: {
    bg: 'from-slate-500/10 to-blue-500/10',
    border: 'border-slate-500/20',
    glow: 'text-slate-300',
  },
  zodiac_season: {
    bg: 'from-purple-500/10 to-indigo-500/10',
    border: 'border-purple-500/20',
    glow: 'text-purple-300',
  },
  solar_term: {
    bg: 'from-green-500/10 to-emerald-500/10',
    border: 'border-green-500/20',
    glow: 'text-green-300',
  },
  valentine: {
    bg: 'from-pink-500/10 to-rose-500/10',
    border: 'border-pink-500/20',
    glow: 'text-pink-300',
  },
  christmas: {
    bg: 'from-red-500/10 to-green-500/10',
    border: 'border-red-500/20',
    glow: 'text-red-300',
  },
};

const DEFAULT_STYLE = {
  bg: 'from-indigo-500/10 to-purple-500/10',
  border: 'border-indigo-500/20',
  glow: 'text-indigo-300',
};

/** 어필리에이트 CTA가 있는 이벤트 타입 */
const AFFILIATE_EVENT_TYPES: SeasonalEventType[] = [
  'mercury_retrograde', 'full_moon', 'new_moon', 'valentine',
];

const CTA_TEXT: Record<string, string> = {
  ko: '자세히 알아보기 →',
  en: 'Learn More →',
  zh: '了解更多 →',
  ja: '詳しく見る →',
  es: 'Más Info →',
};

export default function SeasonalEventBanner({
  events,
  locale = 'ko',
  maxEvents = 3,
}: SeasonalEventBannerProps) {
  if (!events || events.length === 0) return null;

  const ctaLabel = CTA_TEXT[locale] ?? CTA_TEXT.en;
  const visibleEvents = events.slice(0, maxEvents);

  return (
    <div className="space-y-2 mb-4">
      {visibleEvents.map((event, i) => {
        const icon = EVENT_ICONS[event.type] ?? '✨';
        const style = EVENT_STYLES[event.type] ?? DEFAULT_STYLE;
        const hasAffiliate = AFFILIATE_EVENT_TYPES.includes(event.type);
        const affiliateLink = hasAffiliate
          ? getContextualAffiliate({}, [event.type])
          : null;

        return (
          <div
            key={`${event.type}-${i}`}
            className={`glass-card p-4 bg-gradient-to-r ${style.bg} ${style.border}`}
          >
            <div className="flex items-start gap-3">
              <span className="text-xl shrink-0 mt-0.5" aria-hidden="true">{icon}</span>
              <div className="flex-1 min-w-0">
                <p className={`font-semibold text-xs mb-1 ${style.glow}`}>{event.name}</p>
                <p className="text-white/70 text-sm leading-relaxed">{event.message}</p>
                {affiliateLink && (
                  <Link
                    href={affiliateLink.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-block mt-2 text-xs font-medium ${style.glow} hover:opacity-80 transition-opacity`}
                    onClick={() => {
                      // 어필리에이트 클릭 추적은 engagement-tracker에서 처리
                    }}
                  >
                    {affiliateLink.label[locale] ?? affiliateLink.label.en} {ctaLabel}
                  </Link>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
