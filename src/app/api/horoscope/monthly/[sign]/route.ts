/**
 * 월간 운세 API
 * GET /api/horoscope/monthly/[sign]
 */

import { NextRequest, NextResponse } from 'next/server';
import { generateMonthlyHoroscope } from '@/lib/horoscope-generator';
import {
  ApiError,
  ErrorCode,
  validateSign,
  validateLocale,
  createSuccessResponse,
  createErrorResponse,
  logError,
  type ApiResponse,
} from '@/lib/errors';
import type { ZodiacSignId, MonthlyHoroscope } from '@/types';

// 캐시 설정
const CACHE_MAX_AGE = 86400; // 24시간
const STALE_WHILE_REVALIDATE = 2592000; // 30일

/**
 * 연도 유효성 검사
 */
function validateYear(yearParam: string | null): number {
  if (!yearParam) {
    return new Date().getFullYear();
  }

  const year = parseInt(yearParam, 10);
  if (isNaN(year) || year < 2020 || year > 2100) {
    throw new ApiError(
      ErrorCode.VALIDATION_ERROR,
      `Invalid year: ${yearParam}. Year must be between 2020 and 2100.`,
      { providedYear: yearParam, validRange: { min: 2020, max: 2100 } }
    );
  }
  return year;
}

/**
 * 월 유효성 검사
 */
function validateMonth(monthParam: string | null): number {
  if (!monthParam) {
    return new Date().getMonth() + 1;
  }

  const month = parseInt(monthParam, 10);
  if (isNaN(month) || month < 1 || month > 12) {
    throw new ApiError(
      ErrorCode.VALIDATION_ERROR,
      `Invalid month: ${monthParam}. Month must be between 1 and 12.`,
      { providedMonth: monthParam, validRange: { min: 1, max: 12 } }
    );
  }
  return month;
}

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
    const yearParam = searchParams.get('year');
    const monthParam = searchParams.get('month');
    const localeParam = searchParams.get('locale') || 'ko';

    const year = validateYear(yearParam);
    const month = validateMonth(monthParam);
    const locale = validateLocale(localeParam);

    // 월간 운세 생성
    const date = new Date(year, month - 1, 1);
    const horoscope = generateMonthlyHoroscope(sign as ZodiacSignId, date, locale);

    // 성공 응답 생성
    const response = createSuccessResponse(horoscope, {
      cached: false,
      generatedAt: new Date().toISOString(),
    });

    // 캐시 헤더 계산 (월말까지 남은 시간 고려)
    const now = new Date();
    const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    const secondsUntilNextMonth = Math.floor((nextMonth.getTime() - now.getTime()) / 1000);
    const maxAge = Math.min(secondsUntilNextMonth, CACHE_MAX_AGE);

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
      endpoint: '/api/horoscope/monthly/[sign]',
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
      'Failed to generate monthly horoscope'
    );
    return NextResponse.json(createErrorResponse(apiError), {
      status: 500,
      headers: {
        'X-Response-Time': `${Date.now() - startTime}ms`,
      },
    });
  }
}
