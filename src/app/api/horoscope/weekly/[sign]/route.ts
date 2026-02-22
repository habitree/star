/**
 * 주간 운세 API
 * GET /api/horoscope/weekly/[sign]
 */

import { NextRequest, NextResponse } from 'next/server';
import { generateWeeklyHoroscope } from '@/lib/horoscope-generator';
import {
  ApiError,
  ErrorCode,
  validateSign,
  validateDate,
  validateLocale,
  createSuccessResponse,
  createErrorResponse,
  logError,
  type ApiResponse,
} from '@/lib/errors';
import type { ZodiacSignId, WeeklyHoroscope } from '@/types';

// 캐시 설정
const CACHE_MAX_AGE = 21600; // 6시간
const STALE_WHILE_REVALIDATE = 604800; // 7일

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ sign: string }> }
): Promise<NextResponse> {
  const startTime = Date.now();

  try {
    const { sign } = await params;
    const { searchParams } = new URL(request.url);

    // 별자리 유효성 검사
    validateSign(sign);

    // 쿼리 파라미터 파싱 및 검증
    const dateParam = searchParams.get('date');
    const localeParam = searchParams.get('locale') || 'ko';
    const locale = validateLocale(localeParam);

    // 날짜 파싱 (기본: 오늘 - 해당 주의 운세를 반환)
    const date = dateParam ? validateDate(dateParam) : new Date();

    // 주간 운세 생성
    const horoscope = generateWeeklyHoroscope(sign as ZodiacSignId, date, locale);

    // 성공 응답 생성
    const response = createSuccessResponse(horoscope, {
      cached: false,
      generatedAt: new Date().toISOString(),
    });

    // 캐시 헤더 계산 (주말까지 남은 시간 고려)
    const now = new Date();
    const dayOfWeek = now.getDay();
    const daysUntilSunday = dayOfWeek === 0 ? 0 : 7 - dayOfWeek;
    const sundayMidnight = new Date(now);
    sundayMidnight.setDate(sundayMidnight.getDate() + daysUntilSunday);
    sundayMidnight.setHours(24, 0, 0, 0);
    const secondsUntilSunday = Math.floor((sundayMidnight.getTime() - now.getTime()) / 1000);
    const maxAge = Math.min(secondsUntilSunday, CACHE_MAX_AGE);

    return NextResponse.json(response, {
      status: 200,
      headers: {
        'Cache-Control': `public, max-age=${maxAge}, stale-while-revalidate=${STALE_WHILE_REVALIDATE}`,
        'X-Response-Time': `${Date.now() - startTime}ms`,
        'X-Cache-Status': 'MISS',
      },
    });
  } catch (error) {
    // 에러 로깅
    logError(error instanceof Error ? error : new Error(String(error)), {
      endpoint: '/api/horoscope/weekly/[sign]',
      method: 'GET',
      url: request.url,
    });

    // ApiError인 경우 해당 상태 코드 사용
    if (error instanceof ApiError) {
      return NextResponse.json(createErrorResponse(error), {
        status: error.statusCode,
        headers: {
          'X-Response-Time': `${Date.now() - startTime}ms`,
        },
      });
    }

    // 일반 에러
    const apiError = new ApiError(
      ErrorCode.GENERATION_ERROR,
      'Failed to generate weekly horoscope'
    );
    return NextResponse.json(createErrorResponse(apiError), {
      status: 500,
      headers: {
        'X-Response-Time': `${Date.now() - startTime}ms`,
      },
    });
  }
}
