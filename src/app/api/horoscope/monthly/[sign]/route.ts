/**
 * 월간 운세 API
 * GET /api/horoscope/monthly/[sign]
 */

import { NextRequest, NextResponse } from 'next/server';
import { generateMonthlyHoroscope } from '@/lib/horoscope-generator';
import type { ZodiacSignId, HoroscopeResponse, MonthlyHoroscope } from '@/types';

// 유효한 별자리 ID 목록
const validSigns: ZodiacSignId[] = [
  'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
  'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'
];

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ sign: string }> }
): Promise<NextResponse<HoroscopeResponse<MonthlyHoroscope>>> {
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
    const yearParam = searchParams.get('year');
    const monthParam = searchParams.get('month');
    const locale = searchParams.get('locale') || 'ko';

    // 날짜 파싱 (기본: 이번 달)
    const now = new Date();
    let year = yearParam ? parseInt(yearParam, 10) : now.getFullYear();
    let month = monthParam ? parseInt(monthParam, 10) : now.getMonth() + 1;

    // 유효성 검사
    if (isNaN(year) || year < 2020 || year > 2100) {
      return NextResponse.json(
        {
          success: false,
          data: null,
          error: `Invalid year: ${yearParam}. Year must be between 2020 and 2100.`,
        },
        { status: 400 }
      );
    }

    if (isNaN(month) || month < 1 || month > 12) {
      return NextResponse.json(
        {
          success: false,
          data: null,
          error: `Invalid month: ${monthParam}. Month must be between 1 and 12.`,
        },
        { status: 400 }
      );
    }

    // 월간 운세 생성
    const date = new Date(year, month - 1, 1);
    const horoscope = generateMonthlyHoroscope(sign as ZodiacSignId, date, locale);

    return NextResponse.json(
      {
        success: true,
        data: horoscope,
      },
      {
        status: 200,
        headers: {
          // 월간 운세는 더 오래 캐시
          'Cache-Control': 'public, max-age=86400, stale-while-revalidate=2592000',
        },
      }
    );
  } catch (error) {
    console.error('Monthly horoscope API error:', error);
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
