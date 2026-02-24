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
  DetailedCategoryHoroscope,
  SubIndicator,
} from '@/types';
import type {
  ExtendedLuckyElements,
  TarotCard,
  TimeBasedFortune,
  FortuneRankingEntry,
  FortuneTrendPoint,
} from '@/types/horoscope-extended';
import { majorArcana } from '@/data/tarot-data';
import { luckyDirections, luckyFoods, luckyActivities } from '@/data/lucky-elements-extended';
import { affirmationTemplates } from '@/data/affirmation-templates';
import { calculateCompatibilityScore } from '@/lib/zodiac-utils';
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
  elementLuckyColors,
} from '@/data/horoscope-templates';
import { elementTemplates, type Element } from '@/data/element-templates';
import { signTemplates } from '@/data/sign-templates';
import { zodiacSigns } from '@/data/zodiac-signs';
import { getPlanetForSign, isPlanetAffectingCategory } from '@/data/planet-influences';
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
 * 별자리 정보 가져오기
 */
function getSignData(signId: ZodiacSignId) {
  return zodiacSigns.find(sign => sign.id === signId);
}

/**
 * 별자리의 원소 가져오기
 */
function getSignElement(signId: ZodiacSignId): Element {
  const signData = getSignData(signId);
  return (signData?.element || 'fire') as Element;
}

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
 * 1-5 점수 생성 (레거시, 하위호환용)
 */
function generateScore(random: () => number): HoroscopeScore {
  const weights = [0.1, 0.2, 0.4, 0.2, 0.1];
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

// ─── 세밀 점수 시스템 ─────────────────────────

/** 원소별 표준편차 */
const elementSigma: Record<string, number> = {
  fire: 22, earth: 12, air: 18, water: 16,
};

/** 별자리별 카테고리 편향 (±5~10점) */
const signCategoryBias: Record<ZodiacSignId, Partial<Record<HoroscopeCategory, number>>> = {
  aries:       { career: 5, health: 3 },
  taurus:      { money: 7, health: 3 },
  gemini:      { career: 4, love: -3 },
  cancer:      { love: 6, health: -2 },
  leo:         { career: 8, overall: 3 },
  virgo:       { health: 7, career: 3 },
  libra:       { love: 5, overall: 2 },
  scorpio:     { love: 4, money: 3 },
  sagittarius: { overall: 5, career: -3 },
  capricorn:   { career: 7, money: 5 },
  aquarius:    { overall: 4, career: 3 },
  pisces:      { love: 8, health: -3 },
};

/** 별자리별 피크 요일 (0=일, 1=월, ..., 6=토) */
const signPeakDay: Record<ZodiacSignId, number> = {
  aries: 2,       // 화(화성)
  taurus: 5,      // 금(금성)
  gemini: 3,      // 수(수성)
  cancer: 1,      // 월(달)
  leo: 0,         // 일(태양)
  virgo: 3,       // 수(수성)
  libra: 5,       // 금(금성)
  scorpio: 2,     // 화(화성)
  sagittarius: 4, // 목(목성)
  capricorn: 6,   // 토(토성)
  aquarius: 6,    // 토(토성)
  pisces: 4,      // 목(목성)
};

/**
 * Box-Muller 변환으로 가우시안 난수 생성
 */
function gaussianRandom(random: () => number, mean: number, sigma: number): number {
  const u1 = random();
  const u2 = random();
  const z = Math.sqrt(-2 * Math.log(Math.max(u1, 0.0001))) * Math.cos(2 * Math.PI * u2);
  return mean + z * sigma;
}

/**
 * 요일별 편향 계산
 */
function getDayBias(signId: ZodiacSignId, date: Date): number {
  const dayOfWeek = date.getDay();
  const peakDay = signPeakDay[signId];
  const distance = Math.min(
    Math.abs(dayOfWeek - peakDay),
    7 - Math.abs(dayOfWeek - peakDay)
  );

  if (distance === 0) return 6;   // 피크일
  if (distance === 1) return 2;   // 인접일
  if (distance >= 3) return -4;   // 반대일
  return 0;
}

/**
 * 세밀 점수 생성 (0-100)
 */
function generateDetailedScore(
  random: () => number,
  signId: ZodiacSignId,
  category: HoroscopeCategory,
  date: Date
): number {
  const element = getSignElement(signId);
  const sigma = elementSigma[element] || 16;

  // 가우시안 기반 점수 (평균 58, 약간 낙관적)
  let score = gaussianRandom(random, 58, sigma);

  // 별자리별 카테고리 편향
  const bias = signCategoryBias[signId][category] || 0;
  score += bias;

  // 요일별 편향
  score += getDayBias(signId, date);

  // 0-100 범위 클램프
  return Math.max(0, Math.min(100, Math.round(score)));
}

/**
 * 세밀 점수 → 별 등급 (비균등 임계값)
 */
function detailedToStarRating(detailedScore: number): HoroscopeScore {
  if (detailedScore < 30) return 1;  // ~8%
  if (detailedScore < 50) return 2;  // ~20%
  if (detailedScore < 70) return 3;  // ~35%
  if (detailedScore < 85) return 4;  // ~25%
  return 5;                           // ~12%
}

/** 카테고리별 서브지표 정의 */
const subIndicatorDefs: Record<HoroscopeCategory, { key: string; label: string }[]> = {
  overall: [
    { key: 'energy', label: '에너지' },
    { key: 'intuition', label: '직감' },
    { key: 'luck', label: '행운' },
  ],
  love: [
    { key: 'charm', label: '매력도' },
    { key: 'communication', label: '소통' },
    { key: 'romance', label: '로맨스' },
  ],
  career: [
    { key: 'focus', label: '집중력' },
    { key: 'leadership', label: '리더십' },
    { key: 'creativity', label: '창의성' },
  ],
  health: [
    { key: 'vitality', label: '활력' },
    { key: 'stress', label: '스트레스' },
    { key: 'sleep', label: '수면' },
  ],
  money: [
    { key: 'income', label: '수입운' },
    { key: 'spending', label: '지출주의' },
    { key: 'investment', label: '투자운' },
  ],
};

/**
 * 서브지표 생성 (부모 점수 ±15 범위)
 */
function generateSubIndicators(
  random: () => number,
  category: HoroscopeCategory,
  parentScore: number
): SubIndicator[] {
  const defs = subIndicatorDefs[category];
  return defs.map(({ key, label }) => {
    const offset = (random() - 0.5) * 30; // ±15
    const score = Math.max(0, Math.min(100, Math.round(parentScore + offset)));
    return { key, label, score };
  });
}

/**
 * 카테고리별 운세 텍스트 선택 (기존 - 범용 템플릿)
 */
function selectGenericTemplate(
  category: HoroscopeCategory,
  score: HoroscopeScore,
  random: () => number
): LocalizedText {
  const level = getTemplateLevel(score);
  const templates = horoscopeTemplates[category][level];
  return selectRandom(templates, random);
}

/**
 * 원소 기반 카테고리별 운세 텍스트 선택
 */
function selectElementTemplate(
  signId: ZodiacSignId,
  category: HoroscopeCategory,
  score: HoroscopeScore,
  random: () => number
): LocalizedText {
  const element = getSignElement(signId);
  const level = getTemplateLevel(score);
  const templates = elementTemplates[element][category][level];
  return selectRandom(templates, random);
}

/**
 * 별자리 전용 카테고리별 운세 텍스트 선택
 */
function selectSignTemplate(
  signId: ZodiacSignId,
  category: HoroscopeCategory,
  score: HoroscopeScore,
  random: () => number
): LocalizedText {
  const level = getTemplateLevel(score);
  const pool = signTemplates[signId][category][level];
  return selectRandom(pool, random);
}

/**
 * 카테고리별 운세 텍스트 선택 (3단계 우선순위)
 * - 60%: 별자리 전용 템플릿
 * - 30%: 원소 기반 템플릿
 * - 10%: 범용 템플릿
 */
function selectTemplate(
  category: HoroscopeCategory,
  score: HoroscopeScore,
  random: () => number,
  signId?: ZodiacSignId
): LocalizedText {
  if (signId) {
    const roll = random();
    if (roll < 0.60) {
      // 60%: 별자리 전용 템플릿
      return selectSignTemplate(signId, category, score, random);
    } else if (roll < 0.90) {
      // 30%: 원소 기반 템플릿
      return selectElementTemplate(signId, category, score, random);
    }
  }
  // 10%: 범용 템플릿 (또는 signId 없을 때)
  return selectGenericTemplate(category, score, random);
}

/**
 * 카테고리별 운세 생성 (DetailedCategoryHoroscope 반환, 하위호환)
 */
function generateCategoryHoroscope(
  signId: ZodiacSignId,
  date: Date,
  category: HoroscopeCategory
): DetailedCategoryHoroscope {
  const seed = generateSeed(signId, date, category);
  const random = seededRandom(seed);

  // 세밀 점수 생성
  const detailedScore = generateDetailedScore(random, signId, category, date);

  // 별 등급 파생
  const score = detailedToStarRating(detailedScore);

  // 서브지표 생성
  const subIndicators = generateSubIndicators(random, category, detailedScore);

  // 원소 기반 템플릿 사용
  const text = selectTemplate(category, score, random, signId);

  return { score, text, detailedScore, subIndicators };
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

  // 행운의 요소들 선택 (원소 기반 행운 색상 우선 사용)
  const element = getSignElement(signId);
  const elementColors = elementLuckyColors[element];
  // 70% 확률로 원소 기반 색상, 30% 확률로 전체 색상
  const luckyColor = random() < 0.7
    ? selectRandom(elementColors, random)
    : selectRandom(luckyColors, random);
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
      text: selectTemplate('overall', overallScore, random, signId),
    },
    love: {
      score: loveScore,
      text: selectTemplate('love', loveScore, random, signId),
    },
    career: {
      score: careerScore,
      text: selectTemplate('career', careerScore, random, signId),
    },
    health: {
      score: healthScore,
      text: selectTemplate('health', healthScore, random, signId),
    },
    money: {
      score: moneyScore,
      text: selectTemplate('money', moneyScore, random, signId),
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

    // 카테고리별 + 긍정/부정 세분화된 주요 날짜 설명
    const positiveDescByCategory: Record<HoroscopeCategory, LocalizedText[]> = {
      overall: [
        { ko: '좋은 기회가 찾아오는 날', en: 'A day when good opportunities come', zh: '好机会到来的一天', ja: '良い機会が訪れる日', es: 'Un día cuando llegan buenas oportunidades' },
        { ko: '행운이 함께하는 날', en: 'A day with luck', zh: '幸运伴随的一天', ja: '幸運が一緒の日', es: 'Un día con suerte' },
        { ko: '중요한 결정을 내리기 좋은 날', en: 'A good day to make important decisions', zh: '适合做重要决定的一天', ja: '重要な決定を下すのに良い日', es: 'Un buen día para tomar decisiones importantes' },
        { ko: '에너지가 최고조에 달하는 날', en: 'A day when energy peaks', zh: '能量达到顶峰的一天', ja: 'エネルギーが最高潮に達する日', es: 'Un día cuando la energía alcanza su punto máximo' },
        { ko: '모든 일이 순조롭게 흘러가는 날', en: 'A day when everything flows smoothly', zh: '一切顺利的一天', ja: 'すべてが順調に流れる日', es: 'Un día cuando todo fluye sin problemas' },
      ],
      love: [
        { ko: '로맨틱한 만남이 기대되는 날', en: 'A day when romantic encounters are expected', zh: '期待浪漫邂逅的一天', ja: 'ロマンチックな出会いが期待される日', es: 'Un día cuando se esperan encuentros románticos' },
        { ko: '연인과의 관계가 깊어지는 날', en: 'A day when relationships deepen', zh: '与恋人关系加深的一天', ja: '恋人との関係が深まる日', es: 'Un día cuando las relaciones se profundizan' },
        { ko: '고백이나 프로포즈에 좋은 날', en: 'A good day for confession or proposal', zh: '适合告白或求婚的一天', ja: '告白やプロポーズに良い日', es: 'Un buen día para confesarse o proponer' },
        { ko: '사랑의 행운이 찾아오는 날', en: 'A day when love luck arrives', zh: '爱情好运到来的一天', ja: '恋愛の幸運が訪れる日', es: 'Un día cuando llega la suerte en el amor' },
        { ko: '마음이 통하는 대화가 이루어지는 날', en: 'A day for heartfelt conversations', zh: '心灵相通的对话实现的一天', ja: '心が通じ合う会話が実現する日', es: 'Un día para conversaciones sinceras' },
      ],
      career: [
        { ko: '업무에서 큰 성과를 거두는 날', en: 'A day of great achievement at work', zh: '工作中取得大成就的一天', ja: '仕事で大きな成果を収める日', es: 'Un día de gran logro en el trabajo' },
        { ko: '승진이나 인정의 기회가 오는 날', en: 'A day when promotion or recognition comes', zh: '升职或被认可的机会来临的一天', ja: '昇進や認められるチャンスが来る日', es: 'Un día cuando llegan oportunidades de ascenso' },
        { ko: '새로운 프로젝트를 시작하기 좋은 날', en: 'A good day to start new projects', zh: '适合开始新项目的一天', ja: '新しいプロジェクトを始めるのに良い日', es: 'Un buen día para iniciar nuevos proyectos' },
        { ko: '비즈니스 미팅에서 좋은 결과가 기대되는 날', en: 'A day when good results are expected from business meetings', zh: '商务会议有望取得好结果的一天', ja: 'ビジネスミーティングで良い結果が期待される日', es: 'Un día cuando se esperan buenos resultados en reuniones de negocios' },
        { ko: '아이디어가 빛나고 창의력이 폭발하는 날', en: 'A day when ideas shine and creativity explodes', zh: '创意闪耀、创造力爆发的一天', ja: 'アイデアが輝き創造力が爆発する日', es: 'Un día cuando las ideas brillan y la creatividad explota' },
      ],
      health: [
        { ko: '새로운 운동을 시작하기 좋은 날', en: 'A good day to start new exercise', zh: '适合开始新运动的一天', ja: '新しい運動を始めるのに良い日', es: 'Un buen día para comenzar nuevo ejercicio' },
        { ko: '활력이 넘치고 컨디션이 최고인 날', en: 'A day full of vitality with peak condition', zh: '充满活力、状态最佳的一天', ja: '活力に満ち体調が最高の日', es: 'Un día lleno de vitalidad con condición óptima' },
        { ko: '건강 습관 전환에 최적의 날', en: 'An optimal day for changing health habits', zh: '改变健康习惯的最佳一天', ja: '健康習慣の転換に最適な日', es: 'Un día óptimo para cambiar hábitos de salud' },
        { ko: '심신이 안정되고 회복력이 높은 날', en: 'A day of mental and physical stability with high recovery', zh: '身心稳定、恢复力强的一天', ja: '心身が安定し回復力が高い日', es: 'Un día de estabilidad mental y física con alta recuperación' },
      ],
      money: [
        { ko: '재물운이 크게 상승하는 날', en: 'A day of greatly rising financial fortune', zh: '财运大幅上升的一天', ja: '金運が大きく上昇する日', es: 'Un día de gran aumento en la fortuna financiera' },
        { ko: '투자 결정에 좋은 날', en: 'A good day for investment decisions', zh: '适合做投资决定的一天', ja: '投資の決定に良い日', es: 'Un buen día para decisiones de inversión' },
        { ko: '예상치 못한 수입이 생기는 날', en: 'A day when unexpected income arrives', zh: '有意外收入的一天', ja: '予想外の収入がある日', es: 'Un día cuando llegan ingresos inesperados' },
        { ko: '금전적 협상에서 유리한 결과를 얻는 날', en: 'A day for favorable results in financial negotiations', zh: '在金钱谈判中获得有利结果的一天', ja: '金銭的な交渉で有利な結果を得る日', es: 'Un día para resultados favorables en negociaciones financieras' },
        { ko: '쇼핑이나 거래에서 좋은 딜을 만나는 날', en: 'A day for finding good deals in shopping or trading', zh: '购物或交易中遇到好价格的一天', ja: 'ショッピングや取引で良いディールに出会う日', es: 'Un día para encontrar buenas ofertas en compras o negocios' },
      ],
    };
    const negativeDescByCategory: Record<HoroscopeCategory, LocalizedText[]> = {
      overall: [
        { ko: '주의가 필요한 날', en: 'A day that requires caution', zh: '需要注意的一天', ja: '注意が必要な日', es: 'Un día que requiere precaución' },
        { ko: '신중함이 필요한 날', en: 'A day that requires prudence', zh: '需要谨慎的一天', ja: '慎重さが必要な日', es: 'Un día que requiere prudencia' },
        { ko: '에너지가 낮아 휴식이 필요한 날', en: 'A low energy day requiring rest', zh: '能量低需要休息的一天', ja: 'エネルギーが低く休息が必要な日', es: 'Un día de baja energía que requiere descanso' },
        { ko: '예상치 못한 변수가 생길 수 있는 날', en: 'A day when unexpected variables may arise', zh: '可能出现意想不到变数的一天', ja: '予想外の変数が生じうる日', es: 'Un día cuando pueden surgir variables inesperadas' },
      ],
      love: [
        { ko: '연인과의 갈등에 주의해야 하는 날', en: 'A day to watch for conflicts with your partner', zh: '需要注意与恋人冲突的一天', ja: '恋人との葛藤に注意すべき日', es: 'Un día para cuidar conflictos con tu pareja' },
        { ko: '감정적 결정을 피해야 하는 날', en: 'A day to avoid emotional decisions', zh: '应避免感性决定的一天', ja: '感情的な決定を避けるべき日', es: 'Un día para evitar decisiones emocionales' },
        { ko: '오해가 생기기 쉬운 날', en: 'A day when misunderstandings arise easily', zh: '容易产生误解的一天', ja: '誤解が生じやすい日', es: 'Un día cuando los malentendidos surgen fácilmente' },
      ],
      career: [
        { ko: '업무 실수에 주의해야 하는 날', en: 'A day to watch for work mistakes', zh: '需要注意工作失误的一天', ja: '仕事のミスに注意すべき日', es: 'Un día para cuidar errores en el trabajo' },
        { ko: '동료와의 갈등이 생길 수 있는 날', en: 'A day when conflicts with colleagues may arise', zh: '可能与同事发生冲突的一天', ja: '同僚との衝突が生じうる日', es: 'Un día cuando pueden surgir conflictos con colegas' },
        { ko: '중요한 결정을 미루는 것이 좋은 날', en: 'A day better for postponing important decisions', zh: '最好推迟重要决定的一天', ja: '重要な決定を延期した方が良い日', es: 'Un día mejor para posponer decisiones importantes' },
      ],
      health: [
        { ko: '체력 소모가 큰 날이므로 무리하지 마세요', en: 'A physically demanding day, so do not overexert', zh: '体力消耗大的一天，不要勉强', ja: '体力消耗が大きい日なので無理しないでください', es: 'Un día de gran desgaste físico, no te excedas' },
        { ko: '면역력이 약해지기 쉬운 날', en: 'A day when immunity weakens easily', zh: '免疫力容易下降的一天', ja: '免疫力が弱まりやすい日', es: 'Un día cuando la inmunidad se debilita fácilmente' },
        { ko: '스트레스 관리에 주의가 필요한 날', en: 'A day requiring attention to stress management', zh: '需要注意压力管理的一天', ja: 'ストレス管理に注意が必要な日', es: 'Un día que requiere atención al manejo del estrés' },
      ],
      money: [
        { ko: '충동 구매를 조심해야 하는 날', en: 'A day to beware of impulse buying', zh: '需要小心冲动购物的一天', ja: '衝動買いに気をつけるべき日', es: 'Un día para cuidar las compras impulsivas' },
        { ko: '투자 결정을 미루는 것이 좋은 날', en: 'A day better for postponing investment decisions', zh: '最好推迟投资决定的一天', ja: '投資の決定を延期した方が良い日', es: 'Un día mejor para posponer decisiones de inversión' },
        { ko: '예상치 못한 지출이 발생할 수 있는 날', en: 'A day when unexpected expenses may occur', zh: '可能有意外支出的一天', ja: '予想外の支出が発生しうる日', es: 'Un día cuando pueden ocurrir gastos inesperados' },
        { ko: '금전 관련 계약 시 꼼꼼한 확인이 필요한 날', en: 'A day requiring careful review of financial contracts', zh: '签订金钱相关合同时需要仔细确认的一天', ja: '金銭関連の契約時に細かい確認が必要な日', es: 'Un día que requiere revisión cuidadosa de contratos financieros' },
      ],
    };
    const keyDateDescriptions: LocalizedText[] = isPositive
      ? positiveDescByCategory[category]
      : negativeDescByCategory[category];

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

  // 지배 행성 정보 가져오기
  const planet = getPlanetForSign(signId);
  const overallScore = calculateAverageScore(monthlyScores.overall);

  return {
    id: `monthly-${signId}-${year}-${month}`,
    year,
    month,
    signId,
    overall: {
      score: overallScore,
      text: selectTemplate('overall', overallScore, random, signId),
    },
    love: {
      score: calculateAverageScore(monthlyScores.love),
      text: selectTemplate('love', calculateAverageScore(monthlyScores.love), random, signId),
    },
    career: {
      score: calculateAverageScore(monthlyScores.career),
      text: selectTemplate('career', calculateAverageScore(monthlyScores.career), random, signId),
    },
    health: {
      score: calculateAverageScore(monthlyScores.health),
      text: selectTemplate('health', calculateAverageScore(monthlyScores.health), random, signId),
    },
    money: {
      score: calculateAverageScore(monthlyScores.money),
      text: selectTemplate('money', calculateAverageScore(monthlyScores.money), random, signId),
    },
    monthHighlight: selectRandom(monthlyHighlightTemplates, random),
    keyDates,
    monthlyAdvice: selectRandom(adviceTemplates, random),
    // 지배 행성 영향력 (점수에 따라 긍정/부정 선택)
    planetaryInfluence: overallScore >= 3 ? planet.positiveInfluence : planet.negativeInfluence,
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

// ─── 확장 함수들 (맞춤형 대시보드용) ───────────────────

const allSignIds: ZodiacSignId[] = [
  'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
  'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'
];

/**
 * 확장 행운 요소 생성
 */
export function generateExtendedLuckyElements(
  signId: ZodiacSignId,
  date: Date = new Date()
): ExtendedLuckyElements {
  const seed = generateSeed(signId, date, 'extlucky');
  const random = seededRandom(seed);

  const element = getSignElement(signId);
  const elementColors = elementLuckyColors[element];
  const luckyColor = random() < 0.7
    ? selectRandom(elementColors, random)
    : selectRandom(luckyColors, random);

  // 베스트 파트너: 궁합 점수 기반
  const partnerScores = allSignIds
    .filter(s => s !== signId)
    .map(s => ({ signId: s, score: calculateCompatibilityScore(signId, s) }))
    .sort((a, b) => b.score - a.score);
  // 상위 3개 중 랜덤
  const bestPartner = partnerScores[Math.floor(random() * 3)].signId;

  return {
    number: selectRandom(luckyNumbers, random),
    color: luckyColor.ko,
    time: selectRandom(luckyTimes, random).ko,
    direction: selectRandom(luckyDirections, random),
    food: selectRandom(luckyFoods, random),
    activity: selectRandom(luckyActivities, random),
    bestPartner,
  };
}

/**
 * 오늘의 타로 카드 생성
 */
export function generateDailyTarot(
  signId: ZodiacSignId,
  date: Date = new Date()
): TarotCard {
  const seed = generateSeed(signId, date, 'tarot');
  const random = seededRandom(seed);

  const cardIndex = Math.floor(random() * majorArcana.length);
  const card = majorArcana[cardIndex];
  const isReversed = random() < 0.3; // 30% 확률로 역방향

  return {
    id: card.id,
    name: card.name,
    symbol: card.symbol,
    meaning: isReversed ? card.reversed : card.meaning,
    reversed: card.reversed,
    advice: card.advice,
    isReversed,
  };
}

/**
 * 시간대별 운세 생성 (피크/밸리 차별화)
 */
export function generateTimeFortune(
  signId: ZodiacSignId,
  date: Date = new Date()
): TimeBasedFortune[] {
  const periods: Array<{ period: 'morning' | 'afternoon' | 'evening'; label: string; timeRange: string }> = [
    { period: 'morning', label: '아침', timeRange: '06:00 - 12:00' },
    { period: 'afternoon', label: '오후', timeRange: '12:00 - 18:00' },
    { period: 'evening', label: '저녁', timeRange: '18:00 - 24:00' },
  ];

  // 피크/밸리 시간대 결정 (매일 변경)
  const daySeed = generateSeed(signId, date, 'time_peak');
  const dayRandom = seededRandom(daySeed);
  const peakIdx = Math.floor(dayRandom() * 3);
  const valleyIdx = (peakIdx + 1 + Math.floor(dayRandom() * 2)) % 3;

  return periods.map(({ period, label, timeRange }, idx) => {
    const seed = generateSeed(signId, date, `time_${period}`);
    const random = seededRandom(seed);

    // 세밀 점수 생성
    let detailedScore = generateDetailedScore(random, signId, 'overall', date);

    // 피크/밸리 시간대 차별화 (±12점)
    if (idx === peakIdx) detailedScore = Math.min(100, detailedScore + 12);
    else if (idx === valleyIdx) detailedScore = Math.max(0, detailedScore - 12);

    const score = detailedToStarRating(detailedScore);
    const level = getTemplateLevel(score);

    const morningDescs: Record<'high' | 'medium' | 'low', string[]> = {
      high: [
        '상쾌한 시작! 아침 에너지가 최고조입니다. 중요한 일을 오전에 처리하세요.',
        '활기찬 아침입니다. 새로운 계획을 세우기 좋은 시간이에요.',
        '아침 햇살처럼 밝은 에너지가 넘칩니다. 적극적으로 행동하세요.',
      ],
      medium: [
        '평온한 아침입니다. 차분하게 하루를 준비하세요.',
        '가벼운 운동으로 시작하면 하루가 달라집니다.',
        '아침 루틴을 잘 지키면 좋은 흐름이 이어집니다.',
      ],
      low: [
        '아침에는 에너지가 다소 낮을 수 있습니다. 무리하지 마세요.',
        '천천히 시작하세요. 오후에 에너지가 올라갑니다.',
        '아침에 중요한 결정은 피하고, 가볍게 보내세요.',
      ],
    };

    const afternoonDescs: Record<'high' | 'medium' | 'low', string[]> = {
      high: [
        '오후 에너지가 폭발합니다! 핵심 업무를 처리하기 최적의 시간입니다.',
        '사교 활동에 좋은 시간입니다. 사람들과 소통하세요.',
        '집중력이 최고인 시간대입니다. 어려운 과제를 도전하세요.',
      ],
      medium: [
        '꾸준한 오후입니다. 일상적인 업무를 차분히 처리하세요.',
        '점심 후 가벼운 산책이 오후 활력을 높여줍니다.',
        '오후 회의나 미팅에서 좋은 결과를 얻을 수 있습니다.',
      ],
      low: [
        '오후에는 잠시 쉬어가는 것이 좋습니다. 재충전의 시간을 가지세요.',
        '오후 슬럼프가 올 수 있습니다. 간단한 스트레칭을 추천합니다.',
        '중요한 결정은 오후를 피해서 내리세요.',
      ],
    };

    const eveningDescs: Record<'high' | 'medium' | 'low', string[]> = {
      high: [
        '저녁에 좋은 소식이 찾아올 수 있습니다. 기대하세요!',
        '저녁 모임이나 데이트에 최적의 시간입니다.',
        '하루의 마무리가 아름답습니다. 특별한 일이 생길 수 있어요.',
      ],
      medium: [
        '편안한 저녁을 보내세요. 충분한 휴식이 내일의 에너지가 됩니다.',
        '저녁에는 자기계발에 시간을 투자하면 좋습니다.',
        '소중한 사람과 함께하는 저녁이 위로가 됩니다.',
      ],
      low: [
        '저녁에는 일찍 쉬는 것이 좋겠습니다. 피로를 풀어주세요.',
        '과도한 야간 활동은 피하세요. 충분한 수면이 중요합니다.',
        '저녁에는 조용히 자기만의 시간을 가져보세요.',
      ],
    };

    const descMap = { morning: morningDescs, afternoon: afternoonDescs, evening: eveningDescs };
    const tipMap: Record<string, string[]> = {
      morning: ['아침 명상 추천', '따뜻한 음료로 시작', '간단한 스트레칭'],
      afternoon: ['짧은 산책 추천', '수분 보충 필수', '5분 휴식 추천'],
      evening: ['따뜻한 목욕 추천', '독서로 마무리', '감사 일기 작성'],
    };

    const description = selectRandom(descMap[period][level], random);
    const tip = selectRandom(tipMap[period], random);

    return { period, label, timeRange, description, score, tip, detailedScore };
  });
}

/**
 * 오늘의 12별자리 전체 순위 반환 (세밀 점수 기반)
 */
export function getTodayFullRanking(date: Date = new Date()): FortuneRankingEntry[] {
  const categories: HoroscopeCategory[] = ['overall', 'love', 'career', 'health', 'money'];

  const rankings = allSignIds.map((signId) => {
    const horoscope = generateDailyHoroscope(signId, date);
    const totalScore =
      horoscope.overall.score +
      horoscope.love.score +
      horoscope.career.score +
      horoscope.health.score +
      horoscope.money.score;

    // 세밀 총점 (0-500)
    let fineScore = 0;
    for (const cat of categories) {
      const catData = horoscope[cat] as DetailedCategoryHoroscope;
      fineScore += catData.detailedScore ?? (catData.score / 5) * 100;
    }

    return {
      rank: 0,
      signId,
      totalScore,
      overallScore: horoscope.overall.score,
      fineScore: Math.round(fineScore),
      percentile: 0,
      scoreDelta: undefined as number | undefined,
    };
  });

  // fineScore 기반 정렬 (사실상 동점 제거)
  rankings.sort((a, b) => b.fineScore - a.fineScore);
  rankings.forEach((entry, idx) => {
    entry.rank = idx + 1;
    entry.percentile = Math.round(((idx) / 12) * 100); // 상위 X%
  });

  // 순위간 격차 계산
  for (let i = 1; i < rankings.length; i++) {
    rankings[i].scoreDelta = rankings[i - 1].fineScore - rankings[i].fineScore;
  }

  return rankings;
}

/**
 * 주간 종합 점수 트렌드 (7일) — 정규화 + 최고/최저 마커
 */
export function getWeeklyTrend(
  signId: ZodiacSignId,
  date: Date = new Date()
): FortuneTrendPoint[] {
  const dayLabels = ['일', '월', '화', '수', '목', '금', '토'];
  const todayStr = toISODateString(date);
  const categories: HoroscopeCategory[] = ['overall', 'love', 'career', 'health', 'money'];
  const result: FortuneTrendPoint[] = [];

  for (let offset = -3; offset <= 3; offset++) {
    const d = new Date(date);
    d.setDate(d.getDate() + offset);
    const horoscope = generateDailyHoroscope(signId, d);
    const total =
      horoscope.overall.score +
      horoscope.love.score +
      horoscope.career.score +
      horoscope.health.score +
      horoscope.money.score;

    // 세밀 총점 기반 정규화 (0-100)
    let fineTotal = 0;
    for (const cat of categories) {
      const catData = horoscope[cat] as DetailedCategoryHoroscope;
      fineTotal += catData.detailedScore ?? (catData.score / 5) * 100;
    }
    const normalizedScore = Math.round(fineTotal / 5); // 0-500 → 0-100

    result.push({
      date: toISODateString(d),
      dayLabel: dayLabels[d.getDay()],
      score: total,
      isToday: toISODateString(d) === todayStr,
      normalizedScore,
    });
  }

  // 최고/최저 마커
  let minIdx = 0;
  let maxIdx = 0;
  for (let i = 1; i < result.length; i++) {
    if (result[i].normalizedScore < result[minIdx].normalizedScore) minIdx = i;
    if (result[i].normalizedScore > result[maxIdx].normalizedScore) maxIdx = i;
  }
  result[minIdx].isMin = true;
  result[maxIdx].isMax = true;

  return result;
}

/**
 * 오늘의 확언 생성
 */
export function generateDailyAffirmation(
  signId: ZodiacSignId,
  date: Date = new Date()
): string {
  const seed = generateSeed(signId, date, 'affirmation');
  const random = seededRandom(seed);
  const templates = affirmationTemplates[signId];
  return selectRandom(templates, random);
}

/** 별자리 한국어 이름 매핑 */
const signKoreanNames: Record<ZodiacSignId, string> = {
  aries: '양자리', taurus: '황소자리', gemini: '쌍둥이자리', cancer: '게자리',
  leo: '사자자리', virgo: '처녀자리', libra: '천칭자리', scorpio: '전갈자리',
  sagittarius: '사수자리', capricorn: '염소자리', aquarius: '물병자리', pisces: '물고기자리',
};

/**
 * 궁합 하이라이트 생성 (일일 변동 + 상위 5개 중 랜덤 + 확장 메시지)
 */
export function generateCompatibilityHighlight(
  signId: ZodiacSignId,
  date: Date = new Date()
): { bestMatch: ZodiacSignId; score: number; message: string } {
  const seed = generateSeed(signId, date, 'compat');
  const random = seededRandom(seed);

  const scores = allSignIds
    .filter(s => s !== signId)
    .map(s => {
      const baseScore = calculateCompatibilityScore(signId, s);
      // 일일 변동 ±8점
      const dailyVariation = Math.round((random() - 0.5) * 16);
      return { signId: s, score: Math.max(0, Math.min(100, baseScore + dailyVariation)) };
    })
    .sort((a, b) => b.score - a.score);

  // 상위 5개 중 랜덤 선택
  const topCount = Math.min(5, scores.length);
  const selected = scores[Math.floor(random() * topCount)];
  const matchName = signKoreanNames[selected.signId];

  const messages = [
    `오늘 ${matchName}와의 인연이 특별히 빛나는 날입니다.`,
    '서로의 에너지가 시너지를 만들어 놀라운 결과를 가져올 수 있어요.',
    '함께하면 어떤 어려움도 이겨낼 수 있는 환상의 조합입니다.',
    `${matchName}와 함께라면 오늘 특별한 순간이 찾아올 거예요.`,
    '두 별자리의 기운이 조화롭게 어우러지는 하루입니다.',
    '서로에게 영감을 주고받을 수 있는 최적의 궁합이에요.',
    `${matchName}의 에너지가 당신에게 긍정적인 변화를 가져다줄 수 있어요.`,
    '오늘의 별자리 배치가 두 사람의 연결고리를 강화합니다.',
    '함께 새로운 도전을 시작하기 좋은 날입니다.',
    `${matchName}와의 대화에서 뜻밖의 행운이 찾아올 수 있어요.`,
    '두 별자리의 원소가 완벽한 균형을 이루고 있습니다.',
    '서로의 장점이 극대화되는 특별한 인연의 날이에요.',
    `${matchName}에게서 오늘 중요한 힌트를 얻을 수 있습니다.`,
    '우주의 기운이 두 사람을 연결하는 특별한 날입니다.',
    '서로의 꿈과 목표를 공유하면 더 큰 시너지가 생겨요.',
  ];

  return {
    bestMatch: selected.signId,
    score: selected.score,
    message: selectRandom(messages, random),
  };
}
