/**
 * 운세 생성 유틸리티
 * 날짜와 별자리를 기반으로 결정적(deterministic) 운세를 생성합니다.
 */

import type {
  DailyHoroscope,
  WeeklyHoroscope,
  MonthlyHoroscope,
  HoroscopeScore,
  LocalizedText,
  CategoryHoroscope,
  HoroscopeCategory,
  MonthlyKeyDate,
  ZodiacSignId,
} from '@/types';
import {
  horoscopeTemplates,
  luckyColors,
  luckyNumbers,
  luckyTimes,
  adviceTemplates,
  weeklyHighlightTemplates,
  monthlyHighlightTemplates,
  planetaryInfluenceTemplates,
  dayNames,
} from '@/data/horoscope-templates';
import { toISODateString, getWeekStart, getWeekEnd } from '@/lib/utils';

// 별자리 ID를 숫자로 변환 (시드 생성용)
const signIdToNumber: Record<ZodiacSignId, number> = {
  aries: 1,
  taurus: 2,
  gemini: 3,
  cancer: 4,
  leo: 5,
  virgo: 6,
  libra: 7,
  scorpio: 8,
  sagittarius: 9,
  capricorn: 10,
  aquarius: 11,
  pisces: 12,
};

/**
 * 시드 기반 결정적 랜덤 함수
 * 같은 시드는 항상 같은 결과를 반환합니다.
 */
function seededRandom(seed: number): () => number {
  let currentSeed = seed;
  return () => {
    // Linear Congruential Generator (LCG)
    currentSeed = (currentSeed * 1664525 + 1013904223) % 4294967296;
    return currentSeed / 4294967296;
  };
}

/**
 * 날짜와 별자리로부터 시드 생성
 */
function generateSeed(signId: ZodiacSignId, date: Date, category?: string): number {
  const signNumber = signIdToNumber[signId];
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  // 카테고리별로 다른 시드를 생성하기 위해 카테고리 해시 추가
  const categoryHash = category ? category.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) : 0;

  return year * 10000000 + month * 100000 + day * 1000 + signNumber * 10 + categoryHash;
}

/**
 * 점수에 따른 템플릿 레벨 결정
 */
function getTemplateLevel(score: HoroscopeScore): 'high' | 'medium' | 'low' {
  if (score >= 4) return 'high';
  if (score === 3) return 'medium';
  return 'low';
}

/**
 * 배열에서 랜덤하게 요소 선택
 */
function selectRandom<T>(array: T[], random: () => number): T {
  const index = Math.floor(random() * array.length);
  return array[index];
}

/**
 * 1-5 점수 생성
 */
function generateScore(random: () => number): HoroscopeScore {
  // 가중치를 적용하여 중간 점수가 더 많이 나오도록 함
  const weights = [0.1, 0.2, 0.4, 0.2, 0.1]; // 1, 2, 3, 4, 5 점수 확률
  const rand = random();
  let cumulative = 0;

  for (let i = 0; i < weights.length; i++) {
    cumulative += weights[i];
    if (rand < cumulative) {
      return (i + 1) as HoroscopeScore;
    }
  }

  return 3;
}

/**
 * 카테고리별 운세 텍스트 선택
 */
function selectTemplate(
  category: HoroscopeCategory,
  score: HoroscopeScore,
  random: () => number
): LocalizedText {
  const level = getTemplateLevel(score);
  const templates = horoscopeTemplates[category][level];
  return selectRandom(templates, random);
}

/**
 * 카테고리별 운세 생성
 */
function generateCategoryHoroscope(
  signId: ZodiacSignId,
  date: Date,
  category: HoroscopeCategory
): CategoryHoroscope {
  const seed = generateSeed(signId, date, category);
  const random = seededRandom(seed);
  const score = generateScore(random);
  const text = selectTemplate(category, score, random);

  return { score, text };
}

/**
 * 일일 운세 생성
 */
export function generateDailyHoroscope(
  signId: ZodiacSignId,
  date: Date = new Date(),
  locale: string = 'ko'
): DailyHoroscope {
  const dateStr = toISODateString(date);
  const baseSeed = generateSeed(signId, date);
  const random = seededRandom(baseSeed);

  // 각 카테고리별 운세 생성
  const overall = generateCategoryHoroscope(signId, date, 'overall');
  const love = generateCategoryHoroscope(signId, date, 'love');
  const career = generateCategoryHoroscope(signId, date, 'career');
  const health = generateCategoryHoroscope(signId, date, 'health');
  const money = generateCategoryHoroscope(signId, date, 'money');

  // 행운의 요소들 선택
  const luckyColor = selectRandom(luckyColors, random);
  const luckyNumber = selectRandom(luckyNumbers, random);
  const luckyTime = selectRandom(luckyTimes, random);
  const advice = selectRandom(adviceTemplates, random);

  // 타임스탬프 생성
  const now = new Date().toISOString();

  return {
    id: `daily-${signId}-${dateStr}`,
    date: dateStr,
    signId,
    overall,
    love,
    career,
    health,
    money,
    luckyNumber,
    luckyColor: luckyColor[locale as keyof LocalizedText] || luckyColor.ko,
    luckyTime: luckyTime[locale as keyof LocalizedText] || luckyTime.ko,
    advice,
    createdAt: now,
    updatedAt: now,
  };
}

/**
 * 주간 운세 생성
 */
export function generateWeeklyHoroscope(
  signId: ZodiacSignId,
  date: Date = new Date(),
  locale: string = 'ko'
): WeeklyHoroscope {
  const weekStart = getWeekStart(date);
  const weekEnd = getWeekEnd(date);
  const weekStartStr = toISODateString(weekStart);
  const weekEndStr = toISODateString(weekEnd);

  // 주간 시드 생성 (주의 시작일 기준)
  const baseSeed = generateSeed(signId, weekStart, 'weekly');
  const random = seededRandom(baseSeed);

  // 7일치 운세의 평균으로 주간 점수 계산
  const dailyScores: Record<HoroscopeCategory, number[]> = {
    overall: [],
    love: [],
    career: [],
    health: [],
    money: [],
  };

  const categories: HoroscopeCategory[] = ['overall', 'love', 'career', 'health', 'money'];

  for (let i = 0; i < 7; i++) {
    const dayDate = new Date(weekStart);
    dayDate.setDate(dayDate.getDate() + i);

    for (const category of categories) {
      const horoscope = generateCategoryHoroscope(signId, dayDate, category);
      dailyScores[category].push(horoscope.score);
    }
  }

  // 각 카테고리의 평균 점수 계산
  const calculateAverageScore = (scores: number[]): HoroscopeScore => {
    const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
    return Math.round(avg) as HoroscopeScore;
  };

  const overallScore = calculateAverageScore(dailyScores.overall);
  const loveScore = calculateAverageScore(dailyScores.love);
  const careerScore = calculateAverageScore(dailyScores.career);
  const healthScore = calculateAverageScore(dailyScores.health);
  const moneyScore = calculateAverageScore(dailyScores.money);

  // 최고/최저 점수 요일 찾기
  const totalDailyScores = dailyScores.overall.map((score, index) => ({
    dayIndex: index,
    total: Object.values(dailyScores).reduce((sum, scores) => sum + scores[index], 0),
  }));

  const bestDayIndex = totalDailyScores.reduce((best, current) =>
    current.total > best.total ? current : best
  ).dayIndex;

  const challengeDayIndex = totalDailyScores.reduce((worst, current) =>
    current.total < worst.total ? current : worst
  ).dayIndex;

  const bestDayDate = new Date(weekStart);
  bestDayDate.setDate(bestDayDate.getDate() + bestDayIndex);
  const challengeDayDate = new Date(weekStart);
  challengeDayDate.setDate(challengeDayDate.getDate() + challengeDayIndex);

  const now = new Date().toISOString();

  return {
    id: `weekly-${signId}-${weekStartStr}`,
    weekStart: weekStartStr,
    weekEnd: weekEndStr,
    signId,
    overall: {
      score: overallScore,
      text: selectTemplate('overall', overallScore, random),
    },
    love: {
      score: loveScore,
      text: selectTemplate('love', loveScore, random),
    },
    career: {
      score: careerScore,
      text: selectTemplate('career', careerScore, random),
    },
    health: {
      score: healthScore,
      text: selectTemplate('health', healthScore, random),
    },
    money: {
      score: moneyScore,
      text: selectTemplate('money', moneyScore, random),
    },
    weekHighlight: selectRandom(weeklyHighlightTemplates, random),
    bestDay: dayNames[bestDayDate.getDay()][locale as keyof LocalizedText] || dayNames[bestDayDate.getDay()].ko,
    challengeDay: dayNames[challengeDayDate.getDay()][locale as keyof LocalizedText] || dayNames[challengeDayDate.getDay()].ko,
    weeklyAdvice: selectRandom(adviceTemplates, random),
    createdAt: now,
    updatedAt: now,
  };
}

/**
 * 월간 운세 생성
 */
export function generateMonthlyHoroscope(
  signId: ZodiacSignId,
  date: Date = new Date(),
  locale: string = 'ko'
): MonthlyHoroscope {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  // 월간 시드 생성
  const monthDate = new Date(year, month - 1, 1);
  const baseSeed = generateSeed(signId, monthDate, 'monthly');
  const random = seededRandom(baseSeed);

  // 한 달의 일수 계산
  const daysInMonth = new Date(year, month, 0).getDate();

  // 월간 카테고리별 점수 계산 (주간 평균의 평균)
  const categories: HoroscopeCategory[] = ['overall', 'love', 'career', 'health', 'money'];
  const monthlyScores: Record<HoroscopeCategory, number[]> = {
    overall: [],
    love: [],
    career: [],
    health: [],
    money: [],
  };

  // 4주간의 데이터 수집
  for (let week = 0; week < 4; week++) {
    const weekDate = new Date(year, month - 1, 1 + week * 7);
    const weeklyHoroscope = generateWeeklyHoroscope(signId, weekDate, locale);

    for (const category of categories) {
      monthlyScores[category].push(weeklyHoroscope[category].score);
    }
  }

  const calculateAverageScore = (scores: number[]): HoroscopeScore => {
    const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
    return Math.round(avg) as HoroscopeScore;
  };

  // 주요 날짜 생성 (월 중 중요한 3-5일)
  const keyDates: MonthlyKeyDate[] = [];
  const numKeyDates = 3 + Math.floor(random() * 3); // 3-5개

  const usedDays = new Set<number>();
  for (let i = 0; i < numKeyDates; i++) {
    let day = Math.floor(random() * daysInMonth) + 1;
    while (usedDays.has(day)) {
      day = (day % daysInMonth) + 1;
    }
    usedDays.add(day);

    const keyDate = new Date(year, month - 1, day);
    const category = selectRandom(categories, random);
    const isPositive = random() > 0.3; // 70% 확률로 긍정적

    const keyDateDescriptions: LocalizedText[] = isPositive
      ? [
          { ko: '좋은 기회가 찾아오는 날', en: 'A day when good opportunities come', zh: '好机会到来的一天', ja: '良い機会が訪れる日', es: 'Un día cuando llegan buenas oportunidades' },
          { ko: '행운이 함께하는 날', en: 'A day with luck', zh: '幸运伴随的一天', ja: '幸運が一緒の日', es: 'Un día con suerte' },
          { ko: '중요한 결정을 내리기 좋은 날', en: 'A good day to make important decisions', zh: '适合做重要决定的一天', ja: '重要な決定を下すのに良い日', es: 'Un buen día para tomar decisiones importantes' },
        ]
      : [
          { ko: '주의가 필요한 날', en: 'A day that requires caution', zh: '需要注意的一天', ja: '注意が必要な日', es: 'Un día que requiere precaución' },
          { ko: '신중함이 필요한 날', en: 'A day that requires prudence', zh: '需要谨慎的一天', ja: '慎重さが必要な日', es: 'Un día que requiere prudencia' },
        ];

    keyDates.push({
      date: toISODateString(keyDate),
      description: selectRandom(keyDateDescriptions, random),
      category,
      isPositive,
    });
  }

  // 날짜순 정렬
  keyDates.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const now = new Date().toISOString();

  return {
    id: `monthly-${signId}-${year}-${month}`,
    year,
    month,
    signId,
    overall: {
      score: calculateAverageScore(monthlyScores.overall),
      text: selectTemplate('overall', calculateAverageScore(monthlyScores.overall), random),
    },
    love: {
      score: calculateAverageScore(monthlyScores.love),
      text: selectTemplate('love', calculateAverageScore(monthlyScores.love), random),
    },
    career: {
      score: calculateAverageScore(monthlyScores.career),
      text: selectTemplate('career', calculateAverageScore(monthlyScores.career), random),
    },
    health: {
      score: calculateAverageScore(monthlyScores.health),
      text: selectTemplate('health', calculateAverageScore(monthlyScores.health), random),
    },
    money: {
      score: calculateAverageScore(monthlyScores.money),
      text: selectTemplate('money', calculateAverageScore(monthlyScores.money), random),
    },
    monthHighlight: selectRandom(monthlyHighlightTemplates, random),
    keyDates,
    monthlyAdvice: selectRandom(adviceTemplates, random),
    planetaryInfluence: selectRandom(planetaryInfluenceTemplates, random),
    createdAt: now,
    updatedAt: now,
  };
}

/**
 * 오늘의 운세 순위 계산 (12별자리 중 상위 3개)
 */
export function getTodayTopSigns(
  date: Date = new Date(),
  limit: number = 3
): { signId: ZodiacSignId; score: number }[] {
  const signs: ZodiacSignId[] = [
    'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
    'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'
  ];

  const rankings = signs.map((signId) => {
    const horoscope = generateDailyHoroscope(signId, date);
    const totalScore =
      horoscope.overall.score +
      horoscope.love.score +
      horoscope.career.score +
      horoscope.health.score +
      horoscope.money.score;

    return { signId, score: totalScore };
  });

  // 점수 내림차순 정렬
  rankings.sort((a, b) => b.score - a.score);

  return rankings.slice(0, limit);
}

/**
 * 모든 별자리의 오늘 운세 가져오기
 */
export function getAllDailyHoroscopes(
  date: Date = new Date(),
  locale: string = 'ko'
): DailyHoroscope[] {
  const signs: ZodiacSignId[] = [
    'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
    'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'
  ];

  return signs.map((signId) => generateDailyHoroscope(signId, date, locale));
}
