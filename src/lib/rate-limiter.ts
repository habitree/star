/**
 * IP 기반 In-Memory Rate Limiter
 * Cloudflare Workers 환경 호환 (Map 기반)
 */

import { NextRequest, NextResponse } from 'next/server';
import { createErrorResponse, ApiError, ErrorCode } from '@/lib/errors';

interface RateLimitEntry {
  count: number;
  resetAt: number; // Unix ms
}

const store = new Map<string, RateLimitEntry>();

// 주기적 정리 (메모리 누수 방지)
let lastCleanup = Date.now();
const CLEANUP_INTERVAL = 60_000; // 1분

function cleanup() {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;
  lastCleanup = now;
  for (const [key, entry] of store) {
    if (entry.resetAt <= now) store.delete(key);
  }
}

/** 클라이언트 IP 추출 */
function getClientIp(request: NextRequest): string {
  return (
    request.headers.get('cf-connecting-ip') ||
    request.headers.get('x-real-ip') ||
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    '0.0.0.0'
  );
}

/** Rate limit 확인. 초과 시 429 Response 반환, 통과 시 null */
export function checkRateLimit(
  request: NextRequest,
  options: { maxRequests?: number; windowMs?: number } = {}
): NextResponse | null {
  const { maxRequests = 60, windowMs = 60_000 } = options;
  const ip = getClientIp(request);
  const now = Date.now();

  cleanup();

  const entry = store.get(ip);

  if (!entry || entry.resetAt <= now) {
    store.set(ip, { count: 1, resetAt: now + windowMs });
    return null;
  }

  entry.count++;

  if (entry.count > maxRequests) {
    const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
    const error = new ApiError(
      ErrorCode.BAD_REQUEST,
      `Rate limit exceeded. Try again in ${retryAfter} seconds.`,
      { retryAfter }
    );
    return NextResponse.json(createErrorResponse(error), {
      status: 429,
      headers: {
        'Retry-After': String(retryAfter),
        'X-RateLimit-Limit': String(maxRequests),
        'X-RateLimit-Remaining': '0',
        'X-RateLimit-Reset': String(Math.ceil(entry.resetAt / 1000)),
      },
    });
  }

  return null;
}

/** Rate limit 헤더를 응답에 추가 */
export function addRateLimitHeaders(
  response: NextResponse,
  request: NextRequest,
  options: { maxRequests?: number } = {}
): NextResponse {
  const { maxRequests = 60 } = options;
  const ip = getClientIp(request);
  const entry = store.get(ip);

  if (entry) {
    response.headers.set('X-RateLimit-Limit', String(maxRequests));
    response.headers.set('X-RateLimit-Remaining', String(Math.max(0, maxRequests - entry.count)));
    response.headers.set('X-RateLimit-Reset', String(Math.ceil(entry.resetAt / 1000)));
  }

  return response;
}
