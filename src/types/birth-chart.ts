/**
 * 출생 차트 관련 타입 정의
 */

import type { ZodiacSignId, LocalizedNames } from './zodiac';
import type { LocalizedText } from './horoscope';

// 출생 차트 입력
export interface BirthChartInput {
  date: string; // YYYY-MM-DD
  time: string; // HH:mm (24시간 형식)
  latitude: number; // 위도 (-90 ~ 90)
  longitude: number; // 경도 (-180 ~ 180)
  timezone: string; // IANA 시간대 (예: 'Asia/Seoul')
}

// 행성 위치
export interface PlanetPosition {
  planet: Planet;
  sign: ZodiacSignId;
  degree: number; // 0-360
  retrograde: boolean;
  house: number; // 1-12
}

// 행성 타입
export type Planet =
  | 'sun'
  | 'moon'
  | 'mercury'
  | 'venus'
  | 'mars'
  | 'jupiter'
  | 'saturn'
  | 'uranus'
  | 'neptune'
  | 'pluto';

// 하우스 정보
export interface HouseInfo {
  house: number; // 1-12
  sign: ZodiacSignId;
  degree: number;
  planets: Planet[];
}

// 애스펙트 (행성 간 각도 관계)
export interface Aspect {
  planet1: Planet;
  planet2: Planet;
  type: AspectType;
  degree: number;
  orb: number; // 오차 범위
  isApplying: boolean;
}

// 애스펙트 타입
export type AspectType =
  | 'conjunction' // 0도
  | 'sextile' // 60도
  | 'square' // 90도
  | 'trine' // 120도
  | 'opposition'; // 180도

// 출생 차트 결과
export interface BirthChartResult {
  id: string;
  input: BirthChartInput;
  sunSign: ZodiacSignId;
  moonSign: ZodiacSignId;
  risingSign: ZodiacSignId; // 어센던트
  planets: PlanetPosition[];
  houses: HouseInfo[];
  aspects: Aspect[];
  dominantElement: string;
  dominantModality: string;
  interpretation: BirthChartInterpretation;
  createdAt: string;
}

// 출생 차트 해석
export interface BirthChartInterpretation {
  summary: LocalizedText;
  sunSignMeaning: LocalizedText;
  moonSignMeaning: LocalizedText;
  risingSignMeaning: LocalizedText;
  planetaryInsights: PlanetaryInsight[];
  lifeThemes: LocalizedText[];
}

// 행성별 인사이트
export interface PlanetaryInsight {
  planet: Planet;
  sign: ZodiacSignId;
  house: number;
  interpretation: LocalizedText;
}

// 출생 차트 요청 파라미터
export interface BirthChartRequestParams {
  birthDate: string;
  birthTime: string;
  birthPlace: {
    latitude: number;
    longitude: number;
    timezone: string;
    placeName?: string;
  };
  locale?: string;
}

// 행성 정보
export interface PlanetInfo {
  id: Planet;
  names: LocalizedNames;
  symbol: string;
  keywords: string[];
  rulesSign: ZodiacSignId[];
}

// 하우스 의미
export interface HouseMeaning {
  house: number;
  names: LocalizedNames;
  keywords: string[];
  lifeArea: LocalizedText;
}
