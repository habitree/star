/**
 * 운세 생성 로직 단위 테스트
 */

import { describe, it, expect, beforeEach } from 'vitest';
import {
  generateDailyHoroscope,
  generateWeeklyHoroscope,
  generateMonthlyHoroscope,
  getTodayTopSigns,
  getAllDailyHoroscopes,
} from '../horoscope-generator';
import type { ZodiacSignId, HoroscopeScore } from '@/types';

describe('horoscope-generator', () => {
  // 결정적 테스트를 위한 고정 날짜
  const testDate = new Date('2024-03-15');
  const testSign: ZodiacSignId = 'aries';

  describe('generateDailyHoroscope', () => {
    it('should generate daily horoscope with all required fields', () => {
      const horoscope = generateDailyHoroscope(testSign, testDate, 'ko');

      expect(horoscope).toBeDefined();
      expect(horoscope.id).toBe(`daily-${testSign}-2024-03-15`);
      expect(horoscope.date).toBe('2024-03-15');
      expect(horoscope.signId).toBe(testSign);

      // 카테고리별 점수 확인
      expect(horoscope.overall).toBeDefined();
      expect(horoscope.overall.score).toBeGreaterThanOrEqual(1);
      expect(horoscope.overall.score).toBeLessThanOrEqual(5);
      expect(horoscope.overall.text).toBeDefined();
      expect(horoscope.overall.text.ko).toBeTruthy();

      expect(horoscope.love).toBeDefined();
      expect(horoscope.career).toBeDefined();
      expect(horoscope.health).toBeDefined();
      expect(horoscope.money).toBeDefined();

      // 행운 요소 확인
      expect(horoscope.luckyNumber).toBeGreaterThanOrEqual(1);
      expect(horoscope.luckyNumber).toBeLessThanOrEqual(99);
      expect(horoscope.luckyColor).toBeTruthy();
      expect(horoscope.luckyTime).toBeTruthy();

      // 조언 확인
      expect(horoscope.advice).toBeDefined();
      expect(horoscope.advice.ko).toBeTruthy();

      // 타임스탬프 확인
      expect(horoscope.createdAt).toBeTruthy();
      expect(horoscope.updatedAt).toBeTruthy();
    });

    it('should be deterministic - same input produces same output', () => {
      const horoscope1 = generateDailyHoroscope(testSign, testDate, 'ko');
      const horoscope2 = generateDailyHoroscope(testSign, testDate, 'ko');

      expect(horoscope1.overall.score).toBe(horoscope2.overall.score);
      expect(horoscope1.love.score).toBe(horoscope2.love.score);
      expect(horoscope1.career.score).toBe(horoscope2.career.score);
      expect(horoscope1.health.score).toBe(horoscope2.health.score);
      expect(horoscope1.money.score).toBe(horoscope2.money.score);
      expect(horoscope1.luckyNumber).toBe(horoscope2.luckyNumber);
    });

    it('should produce different results for different dates', () => {
      const date1 = new Date('2024-03-15');
      const date2 = new Date('2024-03-16');

      const horoscope1 = generateDailyHoroscope(testSign, date1, 'ko');
      const horoscope2 = generateDailyHoroscope(testSign, date2, 'ko');

      // 날짜가 다르면 적어도 하나의 값은 달라야 함
      const isDifferent =
        horoscope1.overall.score !== horoscope2.overall.score ||
        horoscope1.luckyNumber !== horoscope2.luckyNumber;

      expect(isDifferent).toBe(true);
    });

    it('should produce different results for different signs', () => {
      const sign1: ZodiacSignId = 'aries';
      const sign2: ZodiacSignId = 'taurus';

      const horoscope1 = generateDailyHoroscope(sign1, testDate, 'ko');
      const horoscope2 = generateDailyHoroscope(sign2, testDate, 'ko');

      // 별자리가 다르면 적어도 하나의 값은 달라야 함
      const isDifferent =
        horoscope1.overall.score !== horoscope2.overall.score ||
        horoscope1.luckyNumber !== horoscope2.luckyNumber;

      expect(isDifferent).toBe(true);
    });

    it('should generate valid scores (1-5)', () => {
      const allSigns: ZodiacSignId[] = [
        'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
        'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'
      ];

      for (const sign of allSigns) {
        const horoscope = generateDailyHoroscope(sign, testDate, 'ko');
        const scores: HoroscopeScore[] = [
          horoscope.overall.score,
          horoscope.love.score,
          horoscope.career.score,
          horoscope.health.score,
          horoscope.money.score,
        ];

        for (const score of scores) {
          expect(score).toBeGreaterThanOrEqual(1);
          expect(score).toBeLessThanOrEqual(5);
        }
      }
    });
  });

  describe('generateWeeklyHoroscope', () => {
    it('should generate weekly horoscope with all required fields', () => {
      const horoscope = generateWeeklyHoroscope(testSign, testDate, 'ko');

      expect(horoscope).toBeDefined();
      expect(horoscope.signId).toBe(testSign);
      expect(horoscope.weekStart).toBeTruthy();
      expect(horoscope.weekEnd).toBeTruthy();

      // 카테고리별 점수 확인
      expect(horoscope.overall).toBeDefined();
      expect(horoscope.love).toBeDefined();
      expect(horoscope.career).toBeDefined();
      expect(horoscope.health).toBeDefined();
      expect(horoscope.money).toBeDefined();

      // 주간 특별 필드 확인
      expect(horoscope.weekHighlight).toBeDefined();
      expect(horoscope.bestDay).toBeTruthy();
      expect(horoscope.challengeDay).toBeTruthy();
      expect(horoscope.weeklyAdvice).toBeDefined();
    });

    it('should have week start before week end', () => {
      const horoscope = generateWeeklyHoroscope(testSign, testDate, 'ko');

      const start = new Date(horoscope.weekStart);
      const end = new Date(horoscope.weekEnd);

      expect(start.getTime()).toBeLessThan(end.getTime());
    });

    it('should be deterministic', () => {
      const horoscope1 = generateWeeklyHoroscope(testSign, testDate, 'ko');
      const horoscope2 = generateWeeklyHoroscope(testSign, testDate, 'ko');

      expect(horoscope1.overall.score).toBe(horoscope2.overall.score);
      expect(horoscope1.weekStart).toBe(horoscope2.weekStart);
      expect(horoscope1.weekEnd).toBe(horoscope2.weekEnd);
    });
  });

  describe('generateMonthlyHoroscope', () => {
    it('should generate monthly horoscope with all required fields', () => {
      const horoscope = generateMonthlyHoroscope(testSign, testDate, 'ko');

      expect(horoscope).toBeDefined();
      expect(horoscope.signId).toBe(testSign);
      expect(horoscope.year).toBe(2024);
      expect(horoscope.month).toBe(3);

      // 카테고리별 점수 확인
      expect(horoscope.overall).toBeDefined();
      expect(horoscope.love).toBeDefined();
      expect(horoscope.career).toBeDefined();
      expect(horoscope.health).toBeDefined();
      expect(horoscope.money).toBeDefined();

      // 월간 특별 필드 확인
      expect(horoscope.monthHighlight).toBeDefined();
      expect(horoscope.keyDates).toBeDefined();
      expect(Array.isArray(horoscope.keyDates)).toBe(true);
      expect(horoscope.keyDates.length).toBeGreaterThanOrEqual(3);
      expect(horoscope.keyDates.length).toBeLessThanOrEqual(5);
      expect(horoscope.monthlyAdvice).toBeDefined();
      expect(horoscope.planetaryInfluence).toBeDefined();
    });

    it('should have valid key dates within the month', () => {
      const horoscope = generateMonthlyHoroscope(testSign, testDate, 'ko');

      for (const keyDate of horoscope.keyDates) {
        const date = new Date(keyDate.date);
        expect(date.getMonth() + 1).toBe(horoscope.month);
        expect(date.getFullYear()).toBe(horoscope.year);
        expect(keyDate.description).toBeDefined();
        expect(keyDate.category).toBeTruthy();
        expect(typeof keyDate.isPositive).toBe('boolean');
      }
    });

    it('should be deterministic', () => {
      const horoscope1 = generateMonthlyHoroscope(testSign, testDate, 'ko');
      const horoscope2 = generateMonthlyHoroscope(testSign, testDate, 'ko');

      expect(horoscope1.overall.score).toBe(horoscope2.overall.score);
      expect(horoscope1.keyDates.length).toBe(horoscope2.keyDates.length);
    });
  });

  describe('getTodayTopSigns', () => {
    it('should return top 3 signs by default', () => {
      const topSigns = getTodayTopSigns(testDate);

      expect(topSigns).toBeDefined();
      expect(topSigns.length).toBe(3);
    });

    it('should return specified number of signs', () => {
      const topSigns = getTodayTopSigns(testDate, 5);

      expect(topSigns.length).toBe(5);
    });

    it('should be sorted by score in descending order', () => {
      const topSigns = getTodayTopSigns(testDate);

      for (let i = 1; i < topSigns.length; i++) {
        expect(topSigns[i - 1].score).toBeGreaterThanOrEqual(topSigns[i].score);
      }
    });

    it('should return valid sign IDs', () => {
      const validSigns: ZodiacSignId[] = [
        'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
        'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'
      ];

      const topSigns = getTodayTopSigns(testDate);

      for (const { signId } of topSigns) {
        expect(validSigns).toContain(signId);
      }
    });
  });

  describe('getAllDailyHoroscopes', () => {
    it('should return horoscopes for all 12 signs', () => {
      const horoscopes = getAllDailyHoroscopes(testDate, 'ko');

      expect(horoscopes).toBeDefined();
      expect(horoscopes.length).toBe(12);
    });

    it('should contain all zodiac signs', () => {
      const horoscopes = getAllDailyHoroscopes(testDate, 'ko');
      const signIds = horoscopes.map(h => h.signId);

      const allSigns: ZodiacSignId[] = [
        'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
        'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'
      ];

      for (const sign of allSigns) {
        expect(signIds).toContain(sign);
      }
    });
  });
});
