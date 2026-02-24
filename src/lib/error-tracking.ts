/**
 * 에러 트래킹 시스템
 * 클라이언트 에러 수집 + 구조화 로깅. 향후 Sentry 연동 준비.
 */

interface ErrorEntry {
  timestamp: string;
  message: string;
  stack?: string;
  componentStack?: string;
  url?: string;
  userAgent?: string;
  extra?: Record<string, unknown>;
}

const ERROR_BUFFER_KEY = 'zodiac-error-buffer';
const MAX_BUFFER_SIZE = 50;

/** 에러 캡처 */
export function captureError(
  error: Error | string,
  extra?: Record<string, unknown>
): void {
  try {
    const entry: ErrorEntry = {
      timestamp: new Date().toISOString(),
      message: typeof error === 'string' ? error : error.message,
      stack: typeof error === 'string' ? undefined : error.stack,
      url: typeof window !== 'undefined' ? window.location.href : undefined,
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
      extra,
    };

    // 콘솔 출력 (개발 중)
    console.error('[ErrorTracker]', entry.message, extra);

    // 버퍼에 저장
    if (typeof window !== 'undefined') {
      const buffer = getErrorBuffer();
      buffer.push(entry);
      if (buffer.length > MAX_BUFFER_SIZE) {
        buffer.splice(0, buffer.length - MAX_BUFFER_SIZE);
      }
      try {
        localStorage.setItem(ERROR_BUFFER_KEY, JSON.stringify(buffer));
      } catch {
        // localStorage 용량 초과 시 버퍼 절반 정리
        buffer.splice(0, Math.floor(buffer.length / 2));
        localStorage.setItem(ERROR_BUFFER_KEY, JSON.stringify(buffer));
      }
    }
  } catch {
    // 에러 트래킹 자체의 실패는 무시
  }
}

/** 에러 버퍼 조회 */
export function getErrorBuffer(): ErrorEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(ERROR_BUFFER_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/** 에러 버퍼 초기화 */
export function clearErrorBuffer(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(ERROR_BUFFER_KEY);
  }
}

/** 에러 통계 */
export function getErrorStats(): {
  total: number;
  last24h: number;
  topMessages: { message: string; count: number }[];
} {
  const buffer = getErrorBuffer();
  const now = Date.now();
  const dayAgo = now - 24 * 60 * 60 * 1000;

  const last24h = buffer.filter(
    (e) => new Date(e.timestamp).getTime() > dayAgo
  ).length;

  // 상위 에러 메시지
  const messageCounts: Record<string, number> = {};
  for (const entry of buffer) {
    const key = entry.message.slice(0, 100);
    messageCounts[key] = (messageCounts[key] || 0) + 1;
  }
  const topMessages = Object.entries(messageCounts)
    .map(([message, count]) => ({ message, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return { total: buffer.length, last24h, topMessages };
}

/** 글로벌 에러 핸들러 등록 (layout에서 1회 호출) */
export function initGlobalErrorHandler(): void {
  if (typeof window === 'undefined') return;

  window.addEventListener('error', (event) => {
    captureError(event.error || event.message, {
      source: 'window.onerror',
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
    });
  });

  window.addEventListener('unhandledrejection', (event) => {
    const reason = event.reason;
    captureError(
      reason instanceof Error ? reason : String(reason),
      { source: 'unhandledrejection' }
    );
  });
}
