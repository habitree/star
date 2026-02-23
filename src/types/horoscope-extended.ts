/**
 * 확장 운세 타입 정의
 * 맞춤형 운세 대시보드를 위한 타입들
 */

import type { ZodiacSignId } from './zodiac';
import type { HoroscopeScore, HoroscopeCategory } from './horoscope';

/** 확장 행운 요소 */
export interface ExtendedLuckyElements {
  number: number;
  color: string;
  time: string;
  direction: string;
  food: string;
  activity: string;
  bestPartner: ZodiacSignId;
}

/** 바이오리듬 데이터 */
export interface BiorhythmData {
  physical: number;   // -100 ~ 100
  emotional: number;  // -100 ~ 100
  intellectual: number; // -100 ~ 100
  date: string;       // ISO date string
}

/** 타로 카드 */
export interface TarotCard {
  id: number;         // 0-21 (메이저 아르카나)
  name: string;       // 한국어 이름
  symbol: string;     // 이모지 심볼
  meaning: string;    // 정방향 의미
  reversed: string;   // 역방향 의미
  advice: string;     // 조언 메시지
  isReversed: boolean; // 역방향 여부
}

/** 시간대별 운세 */
export interface TimeBasedFortune {
  period: 'morning' | 'afternoon' | 'evening';
  label: string;
  timeRange: string;
  description: string;
  score: HoroscopeScore;
  tip: string;
}

/** 운세 순위 항목 */
export interface FortuneRankingEntry {
  rank: number;
  signId: ZodiacSignId;
  totalScore: number;
  overallScore: HoroscopeScore;
}

/** 운세 트렌드 포인트 */
export interface FortuneTrendPoint {
  date: string;       // ISO date string
  dayLabel: string;   // "월", "화" 등
  score: number;      // 총점
  isToday: boolean;
}

/** 맞춤형 운세 결과 */
export interface PersonalizedHoroscopeResult {
  signId: ZodiacSignId;
  birthDate: string;
  overallScore: number; // 5개 카테고리 평균 * 20 (0-100)
  categoryScores: Record<HoroscopeCategory, HoroscopeScore>;
  categoryTexts: Record<HoroscopeCategory, string>;
  extendedLucky: ExtendedLuckyElements;
  tarot: TarotCard;
  biorhythm: BiorhythmData[];
  timeFortunes: TimeBasedFortune[];
  affirmation: string;
  ranking: FortuneRankingEntry[];
  weeklyTrend: FortuneTrendPoint[];
  compatibilityHighlight: {
    bestMatch: ZodiacSignId;
    score: number;
    message: string;
  };
}

/** 확언 템플릿 타입 */
export interface AffirmationTemplate {
  text: string;
  category: 'growth' | 'love' | 'success' | 'peace' | 'courage';
}
