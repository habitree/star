/**
 * 별자리 상세 정보 타입 정의
 */

import type { ZodiacSignId, LocalizedString } from './zodiac';

export interface DecanInfo {
  number: 1 | 2 | 3;
  dateRange: string;
  subRuler: LocalizedString;
  description: string;
  keywords: string[];
}

export interface PersonalityExtended {
  strengths: { title: string; description: string }[];
  weaknesses: { title: string; description: string }[];
  crisisPattern: {
    summary: string;
    phases: string[];
    warning: string;
  };
}

export interface LoveProfile {
  datingStyle: string;
  soloTraits: string;
  coupleTraits: string;
  warnings: string[];
  detailedCompatibility: { signId: ZodiacSignId; score: number; description: string }[];
}

export interface CareerProfile {
  workStyle: string;
  suitableJobs: { title: string; reason: string }[];
  leadershipType: string;
}

export interface HealthProfile {
  governedBodyParts: string[];
  vulnerabilities: { area: string; description: string }[];
  recommendedActivities: string[];
  stressManagement: string[];
}

export interface FinanceProfile {
  spendingPattern: string;
  investmentTendency: string;
  tips: string[];
}

export interface SymbolicData {
  luckyColors: { name: string; meaning: string }[];
  gemstones: { name: string; meaning: string }[];
  luckyNumbers: number[];
  flowers: string[];
  animals: string[];
  luckyDay: string;
}

export interface Celebrity {
  name: string;
  birthday?: string;
  description: string;
  isKorean: boolean;
}

export interface ZodiacDetailData {
  signId: ZodiacSignId;
  decans: [DecanInfo, DecanInfo, DecanInfo];
  personality: PersonalityExtended;
  love: LoveProfile;
  career: CareerProfile;
  health: HealthProfile;
  finance: FinanceProfile;
  symbolic: SymbolicData;
  mythology: { greekMyth: string; easternConnection: string };
  celebrities: Celebrity[];
}
