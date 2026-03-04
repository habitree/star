'use client';

import ShareButton from '@/components/ui/ShareButton';
import { zodiacData } from '@/data/zodiac-info';
import { zodiacSigns } from '@/data/zodiac-signs';
import { getElementTheme, getShareCardGradient } from '@/lib/element-theme';
import type { ZodiacSignId } from '@/types';

const SHARE_TEXT = {
  ko: {
    title: '오늘의 운세 공유하기',
    scoreLabel: (n: number) => `${n}점`,
    shareBtn: '공유하기',
    shareTitle: (name: string, score: number) => `${name} 오늘의 운세 ${score}점`,
    shareText: (name: string, score: number, affirmation: string) => `${name} 오늘의 운세 - ${score}점\n"${affirmation}"`,
    elements: { fire: '🔥 불', earth: '🌿 흙', air: '💨 바람', water: '💧 물' },
  },
  en: {
    title: "Share Today's Fortune",
    scoreLabel: (n: number) => `${n} pts`,
    shareBtn: 'Share',
    shareTitle: (name: string, score: number) => `${name} Today's Fortune: ${score} pts`,
    shareText: (name: string, score: number, affirmation: string) => `${name} Today's Fortune - ${score} pts\n"${affirmation}"`,
    elements: { fire: '🔥 Fire', earth: '🌿 Earth', air: '💨 Air', water: '💧 Water' },
  },
  zh: {
    title: '分享今日运势',
    scoreLabel: (n: number) => `${n}分`,
    shareBtn: '分享',
    shareTitle: (name: string, score: number) => `${name} 今日运势 ${score}分`,
    shareText: (name: string, score: number, affirmation: string) => `${name} 今日运势 - ${score}分\n"${affirmation}"`,
    elements: { fire: '🔥 火', earth: '🌿 土', air: '💨 风', water: '💧 水' },
  },
  ja: {
    title: '今日の運勢をシェア',
    scoreLabel: (n: number) => `${n}点`,
    shareBtn: 'シェアする',
    shareTitle: (name: string, score: number) => `${name} 今日の運勢 ${score}点`,
    shareText: (name: string, score: number, affirmation: string) => `${name} 今日の運勢 - ${score}点\n「${affirmation}」`,
    elements: { fire: '🔥 火', earth: '🌿 地', air: '💨 風', water: '💧 水' },
  },
  es: {
    title: 'Compartir Fortuna de Hoy',
    scoreLabel: (n: number) => `${n} pts`,
    shareBtn: 'Compartir',
    shareTitle: (name: string, score: number) => `${name} Fortuna de Hoy: ${score} pts`,
    shareText: (name: string, score: number, affirmation: string) => `${name} Fortuna de Hoy - ${score} pts\n"${affirmation}"`,
    elements: { fire: '🔥 Fuego', earth: '🌿 Tierra', air: '💨 Aire', water: '💧 Agua' },
  },
} as const;
type ShareLocale = keyof typeof SHARE_TEXT;

// Locale-aware sign name lookup
const signNameMap: Record<string, Record<string, string>> = Object.fromEntries(
  zodiacSigns.map((s) => [s.id, s.names as unknown as Record<string, string>])
);

interface ShareCardProps {
  signId: ZodiacSignId;
  score: number;
  affirmation: string;
  locale?: string;
}

export default function ShareCard({ signId, score, affirmation, locale = 'ko' }: ShareCardProps) {
  const tl = SHARE_TEXT[(locale as ShareLocale) in SHARE_TEXT ? (locale as ShareLocale) : 'ko'];
  const info = zodiacData[signId];
  const signName = signNameMap[signId]?.[locale] ?? info.name;
  const theme = getElementTheme(signId);
  const gradient = getShareCardGradient(signId);

  return (
    <div className="glass-card p-6 text-center">
      <h3 className="text-lg font-semibold text-white mb-4">
        {tl.title}
      </h3>

      {/* 공유 카드 미리보기 - 엘리먼트 테마 적용 */}
      <div
        className="inline-block p-6 rounded-2xl border border-white/10 mb-4 max-w-xs relative overflow-hidden"
        style={{ background: gradient }}
      >
        {/* 글로우 효과 */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(circle at 50% 30%, ${theme.glowColor}, transparent 70%)`,
          }}
        />

        <div className="relative z-10">
          <span
            className="text-4xl block mb-2"
            style={{ filter: `drop-shadow(0 0 12px ${theme.glowColor})` }}
          >
            {info.symbol}
          </span>
          <p className="text-white font-semibold mb-1">{signName}</p>
          <p className="text-2xl font-bold text-white mb-1">{tl.scoreLabel(score)}</p>
          <div className="flex justify-center gap-0.5 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`text-sm ${star <= Math.round(score / 20) ? 'text-yellow-400' : 'text-white/20'}`}
              >
                ★
              </span>
            ))}
          </div>
          <p className="text-xs text-white/70 leading-relaxed line-clamp-2">
            &ldquo;{affirmation}&rdquo;
          </p>

          {/* 엘리먼트 태그 */}
          <span className={`inline-block mt-2 px-2 py-0.5 rounded-full text-[10px] ${theme.textClass} bg-white/10`}>
            {tl.elements[info.element as keyof typeof tl.elements]}
          </span>
        </div>
      </div>

      <div className="flex justify-center">
        <ShareButton
          title={tl.shareTitle(signName, score)}
          text={tl.shareText(signName, score, affirmation)}
          label={tl.shareBtn}
        />
      </div>
    </div>
  );
}
