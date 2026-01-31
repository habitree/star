/**
 * 일일 운세 API
 * GET /api/horoscope/daily/[sign]
 */

import { NextRequest, NextResponse } from 'next/server';
import { generateDailyHoroscope } from '@/lib/horoscope-generator';
import type { ZodiacSignId, HoroscopeResponse, DailyHoroscope } from '@/types';

export const runtime = 'edge';

// 유효한 별자리 ID 목록
const validSigns: ZodiacSignId[] = [
  'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
  'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'
];

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ sign: string }> }
): Promise<NextResponse<HoroscopeResponse<DailyHoroscope>>> {
  try {
    const { sign } = await params;
    const { searchParams } = new URL(request.url);

    // 별자리 유효성 검사
    if (!validSigns.includes(sign as ZodiacSignId)) {
      return NextResponse.json(
        {
          success: false,
          data: null,
          error: `Invalid sign: ${sign}. Valid signs are: ${validSigns.join(', ')}`,
        },
        { status: 400 }
      );
    }

    // 쿼리 파라미터 파싱
    const dateParam = searchParams.get('date');
    const locale = searchParams.get('locale') || 'ko';

    // 날짜 파싱 (기본: 오늘)
    let date: Date;
    if (dateParam) {
      date = new Date(dateParam);
      if (isNaN(date.getTime())) {
        return NextResponse.json(
          {
            success: false,
            data: null,
            error: `Invalid date format: ${dateParam}. Use YYYY-MM-DD format.`,
          },
          { status: 400 }
        );
      }
    } else {
      date = new Date();
    }

    // 운세 생성
    const horoscope = generateDailyHoroscope(sign as ZodiacSignId, date, locale);

    return NextResponse.json(
      {
        success: true,
        data: horoscope,
      },
      {
        status: 200,
        headers: {
          // 같은 날짜에 대해서는 캐시 사용
          'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
        },
      }
    );
  } catch (error) {
    console.error('Daily horoscope API error:', error);
    return NextResponse.json(
      {
        success: false,
        data: null,
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}
