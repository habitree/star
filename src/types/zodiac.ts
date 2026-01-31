/**
 * 12별자리 관련 타입 정의
 */

// 원소 (4원소)
export type Element = 'fire' | 'earth' | 'air' | 'water';

// 모달리티 (3분류)
export type Modality = 'cardinal' | 'fixed' | 'mutable';

// 별자리 ID 타입
export type ZodiacSignId =
  | 'aries'
  | 'taurus'
  | 'gemini'
  | 'cancer'
  | 'leo'
  | 'virgo'
  | 'libra'
  | 'scorpio'
  | 'sagittarius'
  | 'capricorn'
  | 'aquarius'
  | 'pisces';

// 다국어 문자열 (5개 언어: 한/영/중/일/스)
export interface LocalizedString {
  ko: string;
  en: string;
  zh: string;
  ja: string;
  es: string;
}

// LocalizedNames alias (다른 파일에서 사용)
export type LocalizedNames = LocalizedString;

// 날짜 범위 (MM-DD 형식)
export interface DateRange {
  start: string; // MM-DD format
  end: string; // MM-DD format
}

// 별자리 특성 (다국어)
export interface ZodiacTraits {
  positive: [LocalizedString, LocalizedString, LocalizedString];
  negative: [LocalizedString, LocalizedString, LocalizedString];
}

// 궁합 정보
export interface ZodiacCompatibility {
  best: [ZodiacSignId, ZodiacSignId, ZodiacSignId];
  worst: [ZodiacSignId, ZodiacSignId];
}

// 별자리 정의
export interface ZodiacSign {
  id: ZodiacSignId;
  names: LocalizedString;
  symbol: string;
  element: Element;
  modality: Modality;
  rulingPlanet: LocalizedString;
  dateRange: DateRange;
  traits: ZodiacTraits;
  compatibility: ZodiacCompatibility;
}

// 원소별 색상 정보
export interface ElementColors {
  primary: string;
  secondary: string;
  gradient: string;
}

// 별자리 맵 타입
export type ZodiacSignMap = Record<ZodiacSignId, ZodiacSign>;
