/**
 * 운세 관련 타입 정의
 */

import type { ZodiacSignId, LocalizedNames } from './zodiac';

// 운세 카테고리
export type HoroscopeCategory = 'overall' | 'love' | 'career' | 'health' | 'money';

// 운세 점수 (1-5)
export type HoroscopeScore = 1 | 2 | 3 | 4 | 5;

// 다국어 텍스트
export interface LocalizedText {
  ko: string;
  en: string;
  zh: string;
  ja: string;
  es: string;
}

// 카테고리별 운세 정보
export interface CategoryHoroscope {
  score: HoroscopeScore;
  text: LocalizedText;
}

// 일일 운세
export interface DailyHoroscope {
  id: string;
  date: string; // YYYY-MM-DD
  signId: ZodiacSignId;
  overall: CategoryHoroscope;
  love: CategoryHoroscope;
  career: CategoryHoroscope;
  health: CategoryHoroscope;
  money: CategoryHoroscope;
  luckyNumber: number;
  luckyColor: string;
  luckyTime: string;
  advice: LocalizedText;
  createdAt: string;
  updatedAt: string;
}

// 주간 운세
export interface WeeklyHoroscope {
  id: string;
  weekStart: string; // YYYY-MM-DD (월요일)
  weekEnd: string; // YYYY-MM-DD (일요일)
  signId: ZodiacSignId;
  overall: CategoryHoroscope;
  love: CategoryHoroscope;
  career: CategoryHoroscope;
  health: CategoryHoroscope;
  money: CategoryHoroscope;
  weekHighlight: LocalizedText;
  challengeDay: string; // 요일
  bestDay: string; // 요일
  weeklyAdvice: LocalizedText;
  createdAt: string;
  updatedAt: string;
}

// 월간 운세
export interface MonthlyHoroscope {
  id: string;
  year: number;
  month: number; // 1-12
  signId: ZodiacSignId;
  overall: CategoryHoroscope;
  love: CategoryHoroscope;
  career: CategoryHoroscope;
  health: CategoryHoroscope;
  money: CategoryHoroscope;
  monthHighlight: LocalizedText;
  keyDates: MonthlyKeyDate[];
  monthlyAdvice: LocalizedText;
  planetaryInfluence: LocalizedText;
  createdAt: string;
  updatedAt: string;
}

// 월간 주요 날짜
export interface MonthlyKeyDate {
  date: string; // YYYY-MM-DD
  description: LocalizedText;
  category: HoroscopeCategory;
  isPositive: boolean;
}

// 운세 요청 파라미터
export interface HoroscopeRequestParams {
  signId: ZodiacSignId;
  date?: string;
  category?: HoroscopeCategory;
  locale?: string;
}

// 운세 응답 타입
export interface HoroscopeResponse<T> {
  success: boolean;
  data: T | null;
  error?: string;
}
