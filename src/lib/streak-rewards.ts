/**
 * 스트릭/배지 보상 시스템
 * 심리학 근거: 손실 회피, 간헐적 강화, 21/30일 습관 법칙
 */

import type { Badge, StreakMilestone, StreakReward } from '@/types/engagement';

/** 스트릭 마일스톤 배지 정의 */
export const streakBadges: Record<StreakMilestone, Badge> = {
  3: {
    id: 'streak-3',
    name: '운세 초보 탐험가',
    description: '3일 연속 운세를 확인했습니다! 별과의 인연이 시작되었어요.',
    icon: '🌟',
    requiredStreak: 3,
  },
  7: {
    id: 'streak-7',
    name: '별빛 수집가',
    description: '7일 연속! 매일의 별빛을 모으고 있군요. 주간 리포트가 해금되었습니다.',
    icon: '⭐',
    requiredStreak: 7,
  },
  14: {
    id: 'streak-14',
    name: '우주의 탐구자',
    description: '14일 연속! 별들이 당신을 기억하기 시작했어요. 프리미엄 타로가 해금되었습니다.',
    icon: '🔮',
    requiredStreak: 14,
  },
  30: {
    id: 'streak-30',
    name: '별의 동반자',
    description: '30일 연속! 당신은 이제 별과 하나입니다. 월간 종합 리딩이 해금되었습니다.',
    icon: '🌙',
    requiredStreak: 30,
  },
  45: {
    id: 'streak-45',
    name: '성운의 여행자',
    description: '45일 연속! 성운 너머의 비밀이 열립니다. 별자리 심층 분석이 해금되었습니다.',
    icon: '🌌',
    requiredStreak: 45,
  },
  60: {
    id: 'streak-60',
    name: '은하수의 탐험가',
    description: '60일 연속! 은하수를 건너는 여정이 계속됩니다. 행성 배치 리딩이 해금되었습니다.',
    icon: '🪐',
    requiredStreak: 60,
  },
  75: {
    id: 'streak-75',
    name: '별자리의 수호자',
    description: '75일 연속! 별자리가 당신을 수호자로 인정합니다. 수호 별자리 리딩이 해금되었습니다.',
    icon: '🛡️',
    requiredStreak: 75,
  },
  90: {
    id: 'streak-90',
    name: '우주의 예언자',
    description: '90일 연속! 우주의 흐름이 당신에게 속삭입니다. 분기 예측 리딩이 해금되었습니다.',
    icon: '🌠',
    requiredStreak: 90,
  },
  100: {
    id: 'streak-100',
    name: '별의 현자',
    description: '100일 연속! 전설적인 기록입니다. 숨겨진 콘텐츠가 해금되었습니다.',
    icon: '👑',
    requiredStreak: 100,
  },
};

/** 배지 다국어 이름 (locale 기반 표시용) */
const badgeNames: Record<string, Record<string, string>> = {
  'streak-3':   { ko: '운세 초보 탐험가', en: 'Fortune Novice',       zh: '命运初学者',    ja: '占い初心者',        es: 'Aprendiz del Destino' },
  'streak-7':   { ko: '별빛 수집가',       en: 'Starlight Collector', zh: '星光收藏家',    ja: '星明り採集家',      es: 'Coleccionista de Estrellas' },
  'streak-14':  { ko: '우주의 탐구자',     en: 'Cosmic Explorer',     zh: '宇宙探索者',    ja: '宇宙の探求者',      es: 'Explorador Cósmico' },
  'streak-30':  { ko: '별의 동반자',       en: 'Star Companion',      zh: '星星伴侣',      ja: '星の伴侶',          es: 'Compañero de las Estrellas' },
  'streak-45':  { ko: '성운의 여행자',     en: 'Nebula Traveler',     zh: '星云旅行者',    ja: '星雲の旅人',        es: 'Viajero de la Nebulosa' },
  'streak-60':  { ko: '은하수의 탐험가',   en: 'Milky Way Explorer',  zh: '银河探险家',    ja: '天の川の探検家',    es: 'Explorador de la Vía Láctea' },
  'streak-75':  { ko: '별자리의 수호자',   en: 'Zodiac Guardian',     zh: '星座守护者',    ja: '星座の守護者',      es: 'Guardián del Zodíaco' },
  'streak-90':  { ko: '우주의 예언자',     en: 'Cosmic Prophet',      zh: '宇宙预言者',    ja: '宇宙の預言者',      es: 'Profeta Cósmico' },
  'streak-100': { ko: '별의 현자',         en: 'Star Sage',           zh: '星星贤者',      ja: '星の賢者',          es: 'Sabio de las Estrellas' },
};

/** 배지 이름을 locale에 맞게 반환 */
export function getBadgeName(badgeId: string, locale = 'ko'): string {
  return badgeNames[badgeId]?.[locale] ?? badgeNames[badgeId]?.['ko'] ?? badgeId;
}

/** 스트릭 보상 정의 */
export const streakRewards: StreakReward[] = [
  {
    milestone: 3,
    badge: streakBadges[3],
    unlockContent: 'chat-fortune',
    message: '축하합니다! 🌟 3일 연속 방문! "별의 도사"와의 대화가 해금되었습니다.',
  },
  {
    milestone: 7,
    badge: streakBadges[7],
    unlockContent: 'weekly-report',
    message: '대단해요! ⭐ 7일 연속! 주간 종합 리포트가 해금되었습니다.',
  },
  {
    milestone: 14,
    badge: streakBadges[14],
    unlockContent: 'premium-tarot',
    message: '놀라워요! 🔮 14일 연속! 프리미엄 3장 타로 스프레드가 해금되었습니다.',
  },
  {
    milestone: 30,
    badge: streakBadges[30],
    unlockContent: 'monthly-reading',
    message: '전설적이에요! 🌙 30일 연속! 월간 종합 리딩이 해금되었습니다.',
  },
  {
    milestone: 45,
    badge: streakBadges[45],
    unlockContent: 'deep-sign-analysis',
    message: '놀라워요! 🌌 45일 연속! 별자리 심층 분석이 해금되었습니다.',
  },
  {
    milestone: 60,
    badge: streakBadges[60],
    unlockContent: 'planet-reading',
    message: '대단해요! 🪐 60일 연속! 행성 배치 리딩이 해금되었습니다.',
  },
  {
    milestone: 75,
    badge: streakBadges[75],
    unlockContent: 'guardian-reading',
    message: '경이로워요! 🛡️ 75일 연속! 수호 별자리 리딩이 해금되었습니다.',
  },
  {
    milestone: 90,
    badge: streakBadges[90],
    unlockContent: 'quarterly-forecast',
    message: '전설적이에요! 🌠 90일 연속! 분기 예측 리딩이 해금되었습니다.',
  },
  {
    milestone: 100,
    badge: streakBadges[100],
    unlockContent: 'hidden-content',
    message: '경이로워요! 👑 100일의 현자! 숨겨진 비밀 콘텐츠가 해금되었습니다.',
  },
];

/** 현재 스트릭에 해당하는 배지들 */
export function getEarnedBadges(streak: number): Badge[] {
  const milestones: StreakMilestone[] = [3, 7, 14, 30, 45, 60, 75, 90, 100];
  return milestones
    .filter(m => streak >= m)
    .map(m => streakBadges[m]);
}

/** 다음 마일스톤까지 남은 일수 */
export function getDaysToNextMilestone(streak: number): {
  nextMilestone: StreakMilestone;
  daysRemaining: number;
} | null {
  const milestones: StreakMilestone[] = [3, 7, 14, 30, 45, 60, 75, 90, 100];
  for (const milestone of milestones) {
    if (streak < milestone) {
      return {
        nextMilestone: milestone,
        daysRemaining: milestone - streak,
      };
    }
  }
  return null; // 모든 마일스톤 달성
}

/** 새로 달성한 마일스톤 확인 */
export function getNewlyEarnedReward(
  previousStreak: number,
  currentStreak: number
): StreakReward | null {
  for (const reward of streakRewards) {
    if (previousStreak < reward.milestone && currentStreak >= reward.milestone) {
      return reward;
    }
  }
  return null;
}

/** 스트릭 레벨 다국어 */
const STREAK_LEVEL_NAMES: Record<string, Record<string, string>> = {
  sage:       { ko: '별의 현자',       en: 'Star Sage',            zh: '星星贤者',      ja: '星の賢者',       es: 'Sabio de las Estrellas' },
  prophet:    { ko: '우주의 예언자',   en: 'Cosmic Prophet',       zh: '宇宙预言者',    ja: '宇宙の預言者',   es: 'Profeta Cósmico' },
  guardian:   { ko: '별자리의 수호자', en: 'Zodiac Guardian',      zh: '星座守护者',    ja: '星座の守護者',   es: 'Guardián del Zodíaco' },
  explorer:   { ko: '은하수의 탐험가', en: 'Milky Way Explorer',   zh: '银河探险家',    ja: '天の川の探検家', es: 'Explorador de la Vía Láctea' },
  traveler:   { ko: '성운의 여행자',   en: 'Nebula Traveler',      zh: '星云旅行者',    ja: '星雲の旅人',     es: 'Viajero de la Nebulosa' },
  companion:  { ko: '별의 동반자',     en: 'Star Companion',       zh: '星星伴侣',      ja: '星の伴侶',       es: 'Compañero de las Estrellas' },
  seeker:     { ko: '우주의 탐구자',   en: 'Cosmic Seeker',        zh: '宇宙探索者',    ja: '宇宙の探求者',   es: 'Buscador Cósmico' },
  collector:  { ko: '별빛 수집가',     en: 'Starlight Collector',  zh: '星光收藏家',    ja: '星明り採集家',   es: 'Coleccionista de Estrellas' },
  novice:     { ko: '운세 초보 탐험가',en: 'Fortune Novice',       zh: '命运初学者',    ja: '占い初心者',     es: 'Aprendiz del Destino' },
  wanderer:   { ko: '별의 여행자',     en: 'Star Wanderer',        zh: '星星旅行者',    ja: '星の旅人',       es: 'Viajero Estelar' },
};

/** 스트릭 레벨 (표시용) */
export function getStreakLevel(streak: number, locale = 'ko'): {
  level: string;
  icon: string;
  color: string;
} {
  const name = (key: string) => STREAK_LEVEL_NAMES[key]?.[locale] ?? STREAK_LEVEL_NAMES[key]?.['ko'] ?? key;
  if (streak >= 100) return { level: name('sage'),      icon: '👑', color: 'text-yellow-400' };
  if (streak >= 90)  return { level: name('prophet'),   icon: '🌠', color: 'text-amber-400' };
  if (streak >= 75)  return { level: name('guardian'),  icon: '🛡️', color: 'text-rose-400' };
  if (streak >= 60)  return { level: name('explorer'),  icon: '🪐', color: 'text-orange-400' };
  if (streak >= 45)  return { level: name('traveler'),  icon: '🌌', color: 'text-indigo-400' };
  if (streak >= 30)  return { level: name('companion'), icon: '🌙', color: 'text-purple-400' };
  if (streak >= 14)  return { level: name('seeker'),    icon: '🔮', color: 'text-blue-400' };
  if (streak >= 7)   return { level: name('collector'), icon: '⭐', color: 'text-cyan-400' };
  if (streak >= 3)   return { level: name('novice'),    icon: '🌟', color: 'text-green-400' };
  return               { level: name('wanderer'),  icon: '✨', color: 'text-white/60' };
}

/** 스트릭 유지 동기부여 메시지 (다국어) */
const MOTIVATION_TEXT: Record<string, {
  legend: string;
  tomorrow: (n: number) => string;
  almostThere: (n: number, d: number) => string;
  keepGoing: (n: number, d: number) => string;
}> = {
  ko: {
    legend: '👑 모든 마일스톤을 달성한 전설적인 현자님! 별들이 경의를 표합니다.',
    tomorrow: (n) => `내일이면 ${n}일 달성! 🎉 새로운 보상이 기다리고 있어요!`,
    almostThere: (n, d) => `${n}일까지 ${d}일 남았어요! 거의 다 왔어요! 💪`,
    keepGoing: (n, d) => `${n}일 달성까지 ${d}일! 꾸준히 함께해요 ✨`,
  },
  en: {
    legend: '👑 Legendary sage who achieved all milestones! The stars bow to you.',
    tomorrow: (n) => `One more day to reach ${n}! 🎉 A new reward awaits!`,
    almostThere: (n, d) => `Only ${d} days to ${n}! Almost there! 💪`,
    keepGoing: (n, d) => `${d} days to reach ${n}! Keep going ✨`,
  },
  zh: {
    legend: '👑 达成所有里程碑的传奇贤者！星星向您致敬。',
    tomorrow: (n) => `明天就能达成${n}天！🎉 新奖励在等待你！`,
    almostThere: (n, d) => `距${n}天还剩${d}天！快到了！💪`,
    keepGoing: (n, d) => `距${n}天还剩${d}天！继续加油 ✨`,
  },
  ja: {
    legend: '👑 全マイルストーンを達成した伝説の賢者！星々があなたに敬意を表します。',
    tomorrow: (n) => `あと1日で${n}日達成！🎉 新しい報酬が待っています！`,
    almostThere: (n, d) => `${n}日まであと${d}日！もう少しです！💪`,
    keepGoing: (n, d) => `${n}日達成まで${d}日！一緒に続けましょう ✨`,
  },
  es: {
    legend: '👑 ¡Sabio legendario que logró todos los hitos! Las estrellas te rinden homenaje.',
    tomorrow: (n) => `¡Un día más para llegar a ${n}! 🎉 ¡Una nueva recompensa te espera!`,
    almostThere: (n, d) => `¡Solo ${d} días para ${n}! ¡Casi ahí! 💪`,
    keepGoing: (n, d) => `¡${d} días para llegar a ${n}! Sigue adelante ✨`,
  },
};

/** 스트릭 유지 동기부여 메시지 */
export function getMotivationMessage(streak: number, locale = 'ko'): string {
  const tl = MOTIVATION_TEXT[locale] ?? MOTIVATION_TEXT['ko'];
  const next = getDaysToNextMilestone(streak);
  if (!next) return tl.legend;

  if (next.daysRemaining === 1) return tl.tomorrow(next.nextMilestone);
  if (next.daysRemaining <= 3) return tl.almostThere(next.nextMilestone, next.daysRemaining);
  return tl.keepGoing(next.nextMilestone, next.daysRemaining);
}
