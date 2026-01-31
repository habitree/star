/**
 * 궁합 관련 타입 정의
 */

import type { ZodiacSignId, Element, LocalizedNames } from './zodiac';
import type { LocalizedText } from './horoscope';

// 궁합 점수 (0-100)
export type CompatibilityScore = number;

// 궁합 카테고리
export type CompatibilityCategory = 'love' | 'friendship' | 'work';

// 카테고리별 궁합 정보
export interface CategoryCompatibility {
  score: CompatibilityScore;
  description: LocalizedText;
  strengths: LocalizedText[];
  challenges: LocalizedText[];
}

// 궁합 결과
export interface CompatibilityResult {
  id: string;
  sign1: ZodiacSignId;
  sign2: ZodiacSignId;
  overallScore: CompatibilityScore;
  categories: {
    love: CategoryCompatibility;
    friendship: CategoryCompatibility;
    work: CategoryCompatibility;
  };
  advice: LocalizedText;
  elementCompatibility: ElementCompatibility;
  modalityCompatibility: ModalityCompatibility;
  createdAt: string;
}

// 원소 궁합
export interface ElementCompatibility {
  element1: Element;
  element2: Element;
  score: CompatibilityScore;
  description: LocalizedText;
}

// 모달리티 궁합
export interface ModalityCompatibility {
  modality1: string;
  modality2: string;
  score: CompatibilityScore;
  description: LocalizedText;
}

// 궁합 요청 파라미터
export interface CompatibilityRequestParams {
  sign1: ZodiacSignId;
  sign2: ZodiacSignId;
  category?: CompatibilityCategory;
  locale?: string;
}

// 궁합 매트릭스 (모든 별자리 간 궁합)
export type CompatibilityMatrix = {
  [K in ZodiacSignId]: {
    [J in ZodiacSignId]: CompatibilityScore;
  };
};

// 궁합 등급
export type CompatibilityGrade = 'excellent' | 'good' | 'average' | 'challenging' | 'difficult';

// 궁합 등급 정보
export interface CompatibilityGradeInfo {
  grade: CompatibilityGrade;
  minScore: number;
  maxScore: number;
  label: LocalizedText;
  color: string;
}

// 궁합 요약
export interface CompatibilitySummary {
  sign1: ZodiacSignId;
  sign2: ZodiacSignId;
  overallScore: CompatibilityScore;
  grade: CompatibilityGrade;
  quickAdvice: LocalizedText;
}
