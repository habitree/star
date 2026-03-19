/**
 * /api/og — 동적 OG 이미지 생성
 * ?title=TEXT&sign=aries&subtitle=TEXT
 * 1200×630px, 다크 코스믹 테마
 */

import { ImageResponse } from 'next/og';
import type { NextRequest } from 'next/server';

export const runtime = 'edge';

const SIGN_SYMBOLS: Record<string, string> = {
  aries: '♈', taurus: '♉', gemini: '♊', cancer: '♋',
  leo: '♌', virgo: '♍', libra: '♎', scorpio: '♏',
  sagittarius: '♐', capricorn: '♑', aquarius: '♒', pisces: '♓',
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') ?? 'LuckyToday — Daily Horoscope';
  const sign = searchParams.get('sign') ?? '';
  const subtitle = searchParams.get('subtitle') ?? '';

  const symbol = SIGN_SYMBOLS[sign] ?? '✨';

  const imgResp = new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* 보라/핑크 글로우 오버레이 */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              'radial-gradient(ellipse at 25% 25%, rgba(120,80,200,0.4) 0%, transparent 55%), radial-gradient(ellipse at 75% 75%, rgba(200,80,150,0.25) 0%, transparent 55%)',
            display: 'flex',
          }}
        />

        {/* 별 아이콘 */}
        <div
          style={{
            fontSize: 110,
            marginBottom: 20,
            lineHeight: 1,
            filter: 'drop-shadow(0 0 24px rgba(180,130,255,0.9))',
          }}
        >
          {symbol}
        </div>

        {/* 메인 타이틀 */}
        <div
          style={{
            fontSize: title.length > 40 ? 44 : 54,
            fontWeight: 'bold',
            color: 'white',
            textAlign: 'center',
            maxWidth: 940,
            lineHeight: 1.25,
            padding: '0 40px',
            textShadow: '0 2px 24px rgba(0,0,0,0.6)',
          }}
        >
          {title}
        </div>

        {/* 서브타이틀 (선택적) */}
        {subtitle && (
          <div
            style={{
              fontSize: 26,
              color: 'rgba(220, 200, 255, 0.75)',
              marginTop: 14,
              textAlign: 'center',
              maxWidth: 800,
            }}
          >
            {subtitle}
          </div>
        )}

        {/* 도메인 배지 */}
        <div
          style={{
            marginTop: 28,
            fontSize: 22,
            color: 'rgba(200,180,255,0.65)',
            letterSpacing: '0.08em',
            borderTop: '1px solid rgba(255,255,255,0.15)',
            paddingTop: 16,
          }}
        >
          luckytoday.one
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
  return new Response(imgResp.body, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
    },
  });
}
