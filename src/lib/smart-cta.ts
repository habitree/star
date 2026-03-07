/**
 * 스마트 크로스-피처 CTA
 * 오늘 운세 점수 기반으로 관련 기능으로 자연스럽게 안내
 * 5개 언어 완전 지원 + 시즌 이벤트 연동
 */

import type { SmartCTA } from '@/types/horoscope-extended';
import type { SeasonalEventType } from '@/types/engagement';

type SupportedLocale = 'ko' | 'en' | 'zh' | 'ja' | 'es';

interface CTAContext {
  overallScore: number;
  loveScore: number;
  careerScore: number;
  healthScore: number;
  moneyScore: number;
  hasViewedBirthChart?: boolean;
  locale?: string;
  activeEventTypes?: SeasonalEventType[];
}

// 5개 언어 CTA 텍스트 맵
const CTA_TEXT = {
  'compatibility-love': {
    icon: '💕',
    title: { ko: '궁합 확인하기', en: 'Check Compatibility', zh: '查看配对', ja: '相性を確認', es: 'Ver Compatibilidad' },
    description: {
      ko: (score: number) => `오늘 연애운이 ${score}점! 지금 최고의 궁합 상대를 찾아보세요.`,
      en: (score: number) => `Love score ${score} today! Find your best match right now.`,
      zh: (score: number) => `今日爱情运${score}分！立即找到您最佳匹配。`,
      ja: (score: number) => `今日の恋愛運${score}点！最高の相性の相手を今すぐ見つけましょう。`,
      es: (score: number) => `¡Puntuación de amor ${score} hoy! Encuentra tu mejor pareja ahora.`,
    },
  },
  'biorhythm-low': {
    icon: '📉',
    title: { ko: '바이오리듬 확인', en: 'Check Biorhythm', zh: '查看生物节律', ja: 'バイオリズム確認', es: 'Ver Biorritmo' },
    description: {
      ko: () => '운세가 낮은 날엔 바이오리듬을 체크해 내 컨디션의 이유를 파악하세요.',
      en: () => 'Low fortune day — check your biorhythm to understand your condition.',
      zh: () => '运势较低时，检查生物节律以了解您的状态原因。',
      ja: () => '運勢が低い日はバイオリズムをチェックして、コンディションの理由を把握しましょう。',
      es: () => 'Día de baja fortuna — revisa tu biorritmo para entender tu condición.',
    },
  },
  'birth-chart-intro': {
    icon: '🌌',
    title: { ko: '출생 차트 분석', en: 'Birth Chart Analysis', zh: '出生星盘分析', ja: '出生チャート分析', es: 'Análisis de Carta Natal' },
    description: {
      ko: () => '태어난 순간의 별자리 배치로 더 깊은 내 운명을 탐색해보세요.',
      en: () => 'Explore deeper destiny with your birth star alignment.',
      zh: () => '通过出生时刻的星座排列探索更深层的命运。',
      ja: () => '生まれた瞬間の星座配置でより深い運命を探求しましょう。',
      es: () => 'Explora tu destino más profundo con la alineación estelar de tu nacimiento.',
    },
  },
  'career-high': {
    icon: '🚀',
    title: { ko: '오늘 직장운 상세', en: 'Career Fortune Details', zh: '今日事业运详情', ja: '今日の仕事運詳細', es: 'Detalles de Fortuna Laboral' },
    description: {
      ko: (score: number) => `직장운이 ${score}점! 오늘 중요한 결정을 내려도 좋은 날입니다.`,
      en: (score: number) => `Career score ${score}! A great day to make important decisions.`,
      zh: (score: number) => `事业运${score}分！今天是做重要决定的好日子。`,
      ja: (score: number) => `仕事運${score}点！今日は重要な決断を下すのに良い日です。`,
      es: (score: number) => `¡Puntuación laboral ${score}! Un gran día para tomar decisiones importantes.`,
    },
  },
  'health-warning': {
    icon: '🏥',
    title: { ko: '건강운 주의', en: 'Health Alert', zh: '健康运注意', ja: '健康運注意', es: 'Alerta de Salud' },
    description: {
      ko: (score: number) => `오늘 건강운이 ${score}점으로 낮아요. 무리하지 마시고 휴식을 취하세요.`,
      en: (score: number) => `Health score ${score} — take it easy and rest today.`,
      zh: (score: number) => `今日健康运${score}分偏低，请不要过度劳累，好好休息。`,
      ja: (score: number) => `今日の健康運${score}点と低めです。無理せず休息を取りましょう。`,
      es: (score: number) => `Puntuación de salud ${score} — tómatelo con calma y descansa hoy.`,
    },
  },
  'money-high': {
    icon: '💰',
    title: { ko: '별자리별 재물운', en: 'Zodiac Wealth Fortune', zh: '星座财运排行', ja: '星座別金運', es: 'Fortuna de Riqueza por Signo' },
    description: {
      ko: (score: number) => `금전운이 ${score}점! 12별자리 오늘 재물운 순위를 확인해보세요.`,
      en: (score: number) => `Money score ${score}! See today's wealth ranking for all 12 signs.`,
      zh: (score: number) => `财运${score}分！查看今日12星座财运排行榜。`,
      ja: (score: number) => `金運${score}点！12星座の今日の財運ランキングを確認しましょう。`,
      es: (score: number) => `¡Puntuación de dinero ${score}! Ve el ranking de riqueza de hoy para los 12 signos.`,
    },
  },
  'compatibility-default': {
    icon: '💞',
    title: { ko: '궁합 보러가기', en: 'View Compatibility', zh: '查看配对', ja: '相性を見る', es: 'Ver Compatibilidad' },
    description: {
      ko: () => '내 별자리와 가장 잘 맞는 상대를 지금 확인해보세요.',
      en: () => 'See which signs match you best right now.',
      zh: () => '立即查看哪个星座与您最般配。',
      ja: () => '今すぐ自分の星座と最も相性の良い相手を確認しましょう。',
      es: () => 'Ve qué signos te combinan mejor ahora mismo.',
    },
  },
  'mercury-retrograde': {
    icon: '☿️',
    title: { ko: '수성역행 대비하기', en: 'Prepare for Retrograde', zh: '应对水星逆行', ja: '逆行に備える', es: 'Prepárate para el Retrógrado' },
    description: {
      ko: () => '수성 역행 기간! 소통과 계약에 각별히 주의하세요. 심층 가이드를 확인하세요.',
      en: () => 'Mercury retrograde is active! Double-check communications and contracts.',
      zh: () => '水星逆行期间！特别注意沟通和合同。查看深度指南。',
      ja: () => '水星逆行中！コミュニケーションと契約に特に注意してください。',
      es: () => '¡Mercurio retrógrado activo! Revisa bien comunicaciones y contratos.',
    },
  },
  'full-moon-special': {
    icon: '🌕',
    title: { ko: '보름달 특별 운세', en: 'Full Moon Special', zh: '满月特别运势', ja: '満月特別運勢', es: 'Especial Luna Llena' },
    description: {
      ko: () => '보름달의 강력한 에너지가 당신의 감정을 증폭시킵니다. 특별 리딩을 확인하세요.',
      en: () => "The full moon's energy amplifies your emotions. Check the special reading.",
      zh: () => '满月的强大能量放大您的情绪。查看特别解读。',
      ja: () => '満月の強力なエネルギーがあなたの感情を増幅します。特別リーディングを確認しましょう。',
      es: () => 'La energía de la luna llena amplifica tus emociones. Consulta la lectura especial.',
    },
  },
  'streak-milestone': {
    icon: '🔥',
    title: { ko: '연속 방문 보상', en: 'Streak Reward', zh: '连续访问奖励', ja: '連続訪問報酬', es: 'Recompensa de Racha' },
    description: {
      ko: () => '연속 방문 달성! 특별 콘텐츠가 해금됩니다. 지금 확인해보세요.',
      en: () => 'Streak milestone reached! Special content has been unlocked for you.',
      zh: () => '连续访问达成！特别内容已为您解锁。立即查看。',
      ja: () => '連続訪問達成！特別なコンテンツがアンロックされました。今すぐ確認しましょう。',
      es: () => '¡Hito de racha alcanzado! Se ha desbloqueado contenido especial para ti.',
    },
  },
} as const;

type CTAId = keyof typeof CTA_TEXT;

function getLocale(locale: string): SupportedLocale {
  const supported: SupportedLocale[] = ['ko', 'en', 'zh', 'ja', 'es'];
  return supported.includes(locale as SupportedLocale) ? (locale as SupportedLocale) : 'en';
}

export function getSmartCTAs(ctx: CTAContext): SmartCTA[] {
  const { overallScore, loveScore, careerScore, healthScore, moneyScore, hasViewedBirthChart, locale = 'ko', activeEventTypes = [] } = ctx;
  const loc = getLocale(locale);
  const base = `/${locale}`;
  const candidates: (SmartCTA & { priority: number })[] = [];

  function makeCTA(id: CTAId, score: number, href: string, priority: number): SmartCTA & { priority: number } {
    const ctaDef = CTA_TEXT[id];
    const descFn = ctaDef.description[loc] as (s: number) => string;
    return {
      id,
      icon: ctaDef.icon,
      title: ctaDef.title[loc],
      description: descFn(score),
      href,
      priority,
    };
  }

  // 시즌 이벤트 CTA (최우선)
  if (activeEventTypes.includes('mercury_retrograde')) {
    candidates.push(makeCTA('mercury-retrograde', 0, `${base}/horoscope/daily`, 95));
  }
  if (activeEventTypes.includes('full_moon')) {
    candidates.push(makeCTA('full-moon-special', 0, `${base}/horoscope/daily`, 90));
  }

  // 연애운 높음 → 궁합 추천
  if (loveScore > 70) {
    candidates.push(makeCTA('compatibility-love', loveScore, `${base}/compatibility`, loveScore));
  }

  // 종합운 낮음 → 바이오리듬 추천
  if (overallScore < 50) {
    candidates.push(makeCTA('biorhythm-low', overallScore, `${base}/birth-chart`, 100 - overallScore));
  }

  // 출생 차트 미조회 → 안내
  if (!hasViewedBirthChart) {
    candidates.push(makeCTA('birth-chart-intro', 0, `${base}/birth-chart`, 60));
  }

  // 직장운 높음 → 직장운 상세
  if (careerScore > 75) {
    candidates.push(makeCTA('career-high', careerScore, `${base}/horoscope/daily`, careerScore - 10));
  }

  // 건강운 낮음 → 주의
  if (healthScore < 40) {
    candidates.push(makeCTA('health-warning', healthScore, `${base}/zodiac`, 100 - healthScore));
  }

  // 금전운 높음 → 별자리 재물운
  if (moneyScore > 78 && candidates.length < 2) {
    candidates.push(makeCTA('money-high', moneyScore, `${base}/zodiac`, moneyScore - 15));
  }

  // 기본 fallback
  if (candidates.length === 0) {
    candidates.push(makeCTA('compatibility-default', 0, `${base}/compatibility`, 50));
  }

  // 우선순위 정렬 후 최대 2개 반환
  candidates.sort((a, b) => b.priority - a.priority);
  return candidates.slice(0, 2).map(({ priority: _p, ...cta }) => cta);
}
