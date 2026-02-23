/**
 * 바이오리듬 계산기
 * 생년월일 기반 신체/감정/지성 주기 계산 (sin 함수)
 */

import type { BiorhythmData } from '@/types/horoscope-extended';

const PHYSICAL_CYCLE = 23;
const EMOTIONAL_CYCLE = 28;
const INTELLECTUAL_CYCLE = 33;

/**
 * 생년월일로부터 경과 일수 계산
 */
function daysSinceBirth(birthDate: Date, targetDate: Date): number {
  const diffMs = targetDate.getTime() - birthDate.getTime();
  return Math.floor(diffMs / (1000 * 60 * 60 * 24));
}

/**
 * 특정 날짜의 바이오리듬 값 계산
 * @returns -100 ~ 100
 */
function calculateCycle(days: number, cycleDays: number): number {
  return Math.round(Math.sin((2 * Math.PI * days) / cycleDays) * 100);
}

/**
 * 특정 날짜의 바이오리듬 데이터 계산
 */
export function calculateBiorhythm(birthDate: Date, targetDate: Date): BiorhythmData {
  const days = daysSinceBirth(birthDate, targetDate);
  return {
    physical: calculateCycle(days, PHYSICAL_CYCLE),
    emotional: calculateCycle(days, EMOTIONAL_CYCLE),
    intellectual: calculateCycle(days, INTELLECTUAL_CYCLE),
    date: targetDate.toISOString().split('T')[0],
  };
}

/**
 * 7일간 바이오리듬 데이터 생성 (3일 과거 + 오늘 + 3일 미래)
 */
export function getBiorhythmWeek(birthDateStr: string, todayStr?: string): BiorhythmData[] {
  const birthDate = new Date(birthDateStr);
  const today = todayStr ? new Date(todayStr) : new Date();
  const result: BiorhythmData[] = [];

  for (let offset = -3; offset <= 3; offset++) {
    const date = new Date(today);
    date.setDate(date.getDate() + offset);
    result.push(calculateBiorhythm(birthDate, date));
  }

  return result;
}
