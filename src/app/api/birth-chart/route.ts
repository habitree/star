import { NextRequest, NextResponse } from 'next/server';
import { calculateBirthChart } from '@/lib/astro-calculator';
import type { BirthChartInput, BirthChartResult } from '@/types';

/**
 * 출생 차트 계산 API
 * POST /api/birth-chart
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // 입력 유효성 검사
    const validationError = validateInput(body);
    if (validationError) {
      return NextResponse.json(
        { success: false, error: validationError },
        { status: 400 }
      );
    }

    const input: BirthChartInput = {
      date: body.date,
      time: body.time || '12:00',
      latitude: body.latitude,
      longitude: body.longitude,
      timezone: body.timezone || 'UTC',
    };

    // 출생 차트 계산
    const result: BirthChartResult = calculateBirthChart(input);

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('Birth chart calculation error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to calculate birth chart',
      },
      { status: 500 }
    );
  }
}

/**
 * 입력 유효성 검사
 */
function validateInput(body: Record<string, unknown>): string | null {
  // 날짜 검사
  if (!body.date || typeof body.date !== 'string') {
    return 'Date is required (YYYY-MM-DD format)';
  }

  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(body.date)) {
    return 'Invalid date format. Use YYYY-MM-DD';
  }

  const date = new Date(body.date);
  if (isNaN(date.getTime())) {
    return 'Invalid date';
  }

  // 시간 검사 (선택사항)
  if (body.time) {
    if (typeof body.time !== 'string') {
      return 'Invalid time format';
    }

    const timeRegex = /^([01]?\d|2[0-3]):([0-5]\d)$/;
    if (!timeRegex.test(body.time)) {
      return 'Invalid time format. Use HH:mm (24-hour format)';
    }
  }

  // 위도 검사
  if (body.latitude === undefined || body.latitude === null) {
    return 'Latitude is required';
  }

  const latitude = Number(body.latitude);
  if (isNaN(latitude) || latitude < -90 || latitude > 90) {
    return 'Latitude must be between -90 and 90';
  }

  // 경도 검사
  if (body.longitude === undefined || body.longitude === null) {
    return 'Longitude is required';
  }

  const longitude = Number(body.longitude);
  if (isNaN(longitude) || longitude < -180 || longitude > 180) {
    return 'Longitude must be between -180 and 180';
  }

  return null;
}

/**
 * OPTIONS 요청 처리 (CORS)
 */
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
