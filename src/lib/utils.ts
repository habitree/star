import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * clsx와 tailwind-merge를 조합한 클래스 병합 유틸리티
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * 날짜 포맷팅 유틸리티
 */
export function formatDate(
  date: Date | string,
  options: {
    locale?: string;
    format?: 'short' | 'medium' | 'long' | 'full';
    includeTime?: boolean;
  } = {}
): string {
  const { locale = 'ko-KR', format = 'medium', includeTime = false } = options;

  const dateObj = typeof date === 'string' ? new Date(date) : date;

  if (isNaN(dateObj.getTime())) {
    return '';
  }

  const dateFormatOptions: Intl.DateTimeFormatOptions = {
    short: { year: '2-digit', month: 'numeric', day: 'numeric' },
    medium: { year: 'numeric', month: 'short', day: 'numeric' },
    long: { year: 'numeric', month: 'long', day: 'numeric' },
    full: { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' },
  }[format];

  if (includeTime) {
    dateFormatOptions.hour = '2-digit';
    dateFormatOptions.minute = '2-digit';
  }

  return new Intl.DateTimeFormat(locale, dateFormatOptions).format(dateObj);
}

/**
 * 상대적 시간 표시 (예: '3일 전', '2시간 전')
 */
export function formatRelativeTime(
  date: Date | string,
  locale: string = 'ko-KR'
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - dateObj.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });

  if (diffDays > 0) {
    return rtf.format(-diffDays, 'day');
  } else if (diffHours > 0) {
    return rtf.format(-diffHours, 'hour');
  } else if (diffMins > 0) {
    return rtf.format(-diffMins, 'minute');
  } else {
    return rtf.format(-diffSecs, 'second');
  }
}

/**
 * 날짜를 ISO 형식 문자열로 변환 (YYYY-MM-DD)
 */
export function toISODateString(date: Date): string {
  return date.toISOString().split('T')[0];
}

/**
 * 주어진 날짜가 오늘인지 확인
 */
export function isToday(date: Date | string): boolean {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const today = new Date();
  return (
    dateObj.getDate() === today.getDate() &&
    dateObj.getMonth() === today.getMonth() &&
    dateObj.getFullYear() === today.getFullYear()
  );
}

/**
 * 주의 시작일(월요일) 가져오기
 */
export function getWeekStart(date: Date = new Date()): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  d.setDate(diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

/**
 * 주의 종료일(일요일) 가져오기
 */
export function getWeekEnd(date: Date = new Date()): Date {
  const start = getWeekStart(date);
  const end = new Date(start);
  end.setDate(end.getDate() + 6);
  end.setHours(23, 59, 59, 999);
  return end;
}
