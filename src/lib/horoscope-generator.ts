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
  // 원소 기반 템플릿 사용
  const text = selectTemplate(category, score, random, signId);

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
