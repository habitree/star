/**
 * 참여도 추적 시스템
 * 사용자 행동 이벤트 수집/분석 (localStorage 기반)
 */

import type { EngagementEvent, EngagementEventType } from '@/types/engagement';

const STORAGE_KEY = 'zodiac-engagement-events';
const MAX_EVENTS = 200;

/** 이벤트 기록 */
export function trackEvent(
  type: EngagementEventType,
  data?: Record<string, unknown>
): void {
  if (typeof window === 'undefined') return;

  const event: EngagementEvent = {
    type,
    timestamp: new Date().toISOString(),
    data,
  };

  const events = getEvents();
  events.push(event);

  // 최대 수 초과 시 오래된 이벤트 제거
  if (events.length > MAX_EVENTS) {
    events.splice(0, events.length - MAX_EVENTS);
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  } catch {
    // localStorage quota exceeded - clear old events
    const trimmed = events.slice(-50);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
  }
}

/** 모든 이벤트 조회 */
export function getEvents(): EngagementEvent[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/** 특정 타입 이벤트 조회 */
export function getEventsByType(type: EngagementEventType): EngagementEvent[] {
  return getEvents().filter(e => e.type === type);
}

/** 오늘의 이벤트 조회 */
export function getTodayEvents(): EngagementEvent[] {
  const today = new Date().toISOString().split('T')[0];
  return getEvents().filter(e => e.timestamp.startsWith(today));
}

/** 오늘 특정 이벤트가 발생했는지 확인 */
export function hasEventToday(type: EngagementEventType): boolean {
  return getTodayEvents().some(e => e.type === type);
}

/** 세션 시작 시간 기록 */
let sessionStart: number | null = null;

export function startSession(): void {
  sessionStart = Date.now();
  trackEvent('page_view');
}

/** 세션 체류 시간 (초) */
export function getSessionDuration(): number {
  if (!sessionStart) return 0;
  return Math.floor((Date.now() - sessionStart) / 1000);
}

/** 이벤트 로그 초기화 */
export function clearEvents(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}

/** 간단한 통계 */
export function getEngagementStats(): {
  totalEvents: number;
  todayEvents: number;
  mostFrequentEvent: EngagementEventType | null;
  avgDailyEvents: number;
} {
  const events = getEvents();
  const todayEvents = getTodayEvents();

  // 가장 빈번한 이벤트
  const counts: Partial<Record<EngagementEventType, number>> = {};
  for (const e of events) {
    counts[e.type] = (counts[e.type] || 0) + 1;
  }

  let mostFrequentEvent: EngagementEventType | null = null;
  let maxCount = 0;
  for (const [type, count] of Object.entries(counts)) {
    if (count! > maxCount) {
      maxCount = count!;
      mostFrequentEvent = type as EngagementEventType;
    }
  }

  // 일 평균 이벤트
  const dates = new Set(events.map(e => e.timestamp.split('T')[0]));
  const avgDailyEvents = dates.size > 0 ? Math.round(events.length / dates.size) : 0;

  return {
    totalEvents: events.length,
    todayEvents: todayEvents.length,
    mostFrequentEvent,
    avgDailyEvents,
  };
}
