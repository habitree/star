/**
 * /api/share-card — OG 이미지 생성 (Phase 4)
 * next/og ImageResponse — Cloudflare Workers/OpenNext 호환
 */

import { ImageResponse } from 'next/og';
import type { NextRequest } from 'next/server';
import { getSignGradient } from '@/lib/share-card-generator';
import type { ZodiacSignId } from '@/types';

export const runtime = 'edge';

const SIGN_SYMBOLS: Record<string, string> = {
  aries: '♈', taurus: '♉', gemini: '♊', cancer: '♋',
  leo: '♌', virgo: '♍', libra: '♎', scorpio: '♏',
  sagittarius: '♐', capricorn: '♑', aquarius: '♒', pisces: '♓',
};

const SITE_NAME = 'star.example.com';

const UI_TEXT = {
  ko: { today: '오늘 운세', pts: '점', compat: '궁합', badge: '일 달성!', streak: '일 연속', tiaser: '→ 당신의 운세도' },
  en: { today: "Today's Horoscope", pts: 'pts', compat: 'Compatibility', badge: ' days!', streak: ' day streak', tiaser: '→ Check yours' },
  zh: { today: '今日运势', pts: '分', compat: '配对', badge: '天！', streak: '天连续', tiaser: '→ 查看你的运势' },
  ja: { today: '今日の運勢', pts: '点', compat: '相性', badge: '日達成！', streak: '日連続', tiaser: '→ あなたの運勢も' },
  es: { today: 'Horóscopo Hoy', pts: 'pts', compat: 'Compatibilidad', badge: ' días!', streak: ' días seguidos', tiaser: '→ El tuyo también' },
} as const;
type L = keyof typeof UI_TEXT;
type TL = { today: string; pts: string; compat: string; badge: string; streak: string; tiaser: string };

const W = 1200;
const H = 630;

function el(type: string, props: Record<string, unknown>, ...children: unknown[]) {
  return { type, props: { ...props, children: children.length === 1 ? children[0] : children } };
}

function buildDailyCard(sign: string, score: number, preview: string, g1: string, g2: string, tl: TL) {
  const symbol = SIGN_SYMBOLS[sign] ?? '✦';
  return el('div', {
    style: {
      width: W, height: H,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      background: `linear-gradient(135deg, ${g1}22, #0a0a1a, ${g2}22)`,
      fontFamily: 'sans-serif', position: 'relative',
    },
  },
    el('div', { style: { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 400, height: 400, background: `radial-gradient(circle, ${g1}33, transparent 70%)`, borderRadius: '50%' } }),
    el('div', { style: { fontSize: 120, color: g1, marginBottom: 8 } }, symbol),
    el('div', { style: { fontSize: 28, color: 'rgba(255,255,255,0.5)', marginBottom: 12 } }, tl.today),
    el('div', { style: { fontSize: 96, fontWeight: 800, color: 'white', lineHeight: 1, marginBottom: 16, textShadow: `0 0 40px ${g1}` } },
      score, el('span', { style: { fontSize: 48, color: 'rgba(255,255,255,0.6)' } }, tl.pts)
    ),
    ...(preview ? [el('div', { style: { fontSize: 22, color: 'rgba(255,255,255,0.75)', maxWidth: 800, textAlign: 'center', marginBottom: 24, padding: '0 40px' } }, `"${preview}"`)] : []),
    el('div', { style: { position: 'absolute', bottom: 40, display: 'flex', alignItems: 'center', gap: 20, color: 'rgba(255,255,255,0.4)', fontSize: 20 } },
      el('span', {}, `⭐ ${SITE_NAME}`),
      el('span', { style: { color: g2 } }, tl.tiaser)
    )
  );
}

function buildCompatCard(sign1: string, sign2: string, score: number, g1: string, g2: string, tl: TL) {
  const sym1 = SIGN_SYMBOLS[sign1] ?? '✦';
  const sym2 = SIGN_SYMBOLS[sign2] ?? '✦';
  return el('div', {
    style: {
      width: W, height: H, display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      background: `linear-gradient(135deg, ${g1}22, #0a0a1a, ${g2}22)`,
      fontFamily: 'sans-serif',
    },
  },
    el('div', { style: { display: 'flex', alignItems: 'center', gap: 40, marginBottom: 24 } },
      el('span', { style: { fontSize: 100, color: g1 } }, sym1),
      el('span', { style: { fontSize: 60, color: 'rgba(255,150,200,0.8)' } }, '💕'),
      el('span', { style: { fontSize: 100, color: g2 } }, sym2)
    ),
    el('div', { style: { fontSize: 96, fontWeight: 800, color: 'white', lineHeight: 1, textShadow: '0 0 40px rgba(255,150,200,0.5)' } },
      score, el('span', { style: { fontSize: 48, color: 'rgba(255,255,255,0.5)' } }, '%')
    ),
    el('div', { style: { fontSize: 28, color: 'rgba(255,255,255,0.5)', marginTop: 16 } }, tl.compat),
    el('div', { style: { position: 'absolute', bottom: 40, color: 'rgba(255,255,255,0.4)', fontSize: 20 } }, `⭐ ${SITE_NAME}`)
  );
}

function buildBadgeCard(streak: number, badgeName: string, badgeIcon: string, tl: TL) {
  return el('div', {
    style: {
      width: W, height: H, display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(135deg, #1a0a3a, #0a0a1a, #0a2030)',
      fontFamily: 'sans-serif',
    },
  },
    el('div', { style: { fontSize: 120, marginBottom: 16 } }, badgeIcon),
    el('div', { style: { fontSize: 64, fontWeight: 800, color: 'white', marginBottom: 8 } }, `${streak}${tl.badge}`),
    el('div', { style: { fontSize: 32, color: 'rgba(255,215,0,0.8)', marginBottom: 8 } }, `"${badgeName}"`),
    el('div', { style: { fontSize: 24, color: 'rgba(255,255,255,0.4)' } }, `${streak}${tl.streak}`),
    el('div', { style: { position: 'absolute', bottom: 40, color: 'rgba(255,255,255,0.4)', fontSize: 20 } }, `⭐ ${SITE_NAME}`)
  );
}

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const type = searchParams.get('type') ?? 'daily';
  const locale = (searchParams.get('locale') ?? 'ko') as L;
  const tl = UI_TEXT[locale in UI_TEXT ? locale : 'ko'];

  try {
    if (type === 'daily') {
      const sign = (searchParams.get('sign') ?? 'leo') as ZodiacSignId;
      const score = Number(searchParams.get('score') ?? 75);
      const preview = searchParams.get('preview') ?? '';
      const [g1, g2] = getSignGradient(sign);
      return new ImageResponse(buildDailyCard(sign, score, preview, g1, g2, tl) as never, { width: W, height: H });
    }

    if (type === 'compatibility') {
      const sign1 = (searchParams.get('sign1') ?? 'leo') as ZodiacSignId;
      const sign2 = (searchParams.get('sign2') ?? 'aries') as ZodiacSignId;
      const score = Number(searchParams.get('score') ?? 80);
      const [g1] = getSignGradient(sign1);
      const [, g2] = getSignGradient(sign2);
      return new ImageResponse(buildCompatCard(sign1, sign2, score, g1, g2, tl) as never, { width: W, height: H });
    }

    if (type === 'badge') {
      const streak = Number(searchParams.get('streak') ?? 7);
      const badgeName = searchParams.get('badgeName') ?? '별의 동반자';
      const badgeIcon = searchParams.get('badgeIcon') ?? '🔮';
      return new ImageResponse(buildBadgeCard(streak, badgeName, badgeIcon, tl) as never, { width: W, height: H });
    }

    // 기본 폴백
    return new ImageResponse(
      el('div', { style: { width: W, height: H, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a1a', color: 'white', fontSize: 48 } }, `⭐ ${SITE_NAME}`) as never,
      { width: W, height: H }
    );
  } catch {
    return new Response('Failed to generate image', { status: 500 });
  }
}
