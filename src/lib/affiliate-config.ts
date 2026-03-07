/**
 * 어필리에이트 프로그램 설정
 * Moon Reading (75% 수수료), LifeReader ($80/고객), Keen ($100/고객)
 */

export type AffiliateProgram = 'moon-reading' | 'lifereader' | 'keen';

export interface AffiliateLink {
  program: AffiliateProgram;
  url: string;
  label: Record<string, string>;
  description: Record<string, string>;
  badge: string;
}

export const AFFILIATE_LINKS: Record<AffiliateProgram, AffiliateLink> = {
  'moon-reading': {
    program: 'moon-reading',
    // TODO: 신청 후 실제 어필리에이트 URL로 교체 (https://moonreading.com/affiliates)
    url: 'https://moonreading.com',
    label: {
      ko: '나만의 문 리딩 받기',
      en: 'Get My Moon Reading',
      zh: '获取我的月亮解读',
      ja: 'ムーンリーディングを受ける',
      es: 'Obtener Mi Lectura de Luna',
    },
    description: {
      ko: '달의 위상이 당신의 인생에 미치는 영향을 무료로 알아보세요.',
      en: 'Discover how the moon phase influences your life — free reading.',
      zh: '免费了解月相对您生活的影响。',
      ja: '月の満ち欠けがあなたの人生に与える影響を無料で確認。',
      es: 'Descubre gratis cómo la fase lunar influye en tu vida.',
    },
    badge: '🌙',
  },
  'lifereader': {
    program: 'lifereader',
    // TODO: 신청 후 실제 어필리에이트 URL로 교체
    url: 'https://www.lifereader.com',
    label: {
      ko: '전문 점성가와 1:1 상담',
      en: 'Chat with a Psychic',
      zh: '与专业占星师一对一咨询',
      ja: 'プロの占星家と1対1で相談',
      es: 'Hablar con un Psíquico',
    },
    description: {
      ko: '검증된 전문 점성가와 라이브 상담으로 궁합과 운명을 탐색하세요.',
      en: 'Start a live reading with a verified psychic — explore love & destiny.',
      zh: '与经过验证的专业占星师进行实时咨询，探索爱情与命运。',
      ja: '認定占い師との実際の鑑定で愛と運命を探りましょう。',
      es: 'Comienza una lectura en vivo con un psíquico verificado.',
    },
    badge: '🔮',
  },
  'keen': {
    program: 'keen',
    // TODO: 신청 후 실제 어필리에이트 URL로 교체
    url: 'https://www.keen.com',
    label: {
      ko: 'Keen 전문가 상담',
      en: 'Get a Reading on Keen',
      zh: '在Keen获取专业解读',
      ja: 'Keenで鑑定を受ける',
      es: 'Obtener Lectura en Keen',
    },
    description: {
      ko: '궁합 · 운세 · 타로 전문가의 심층 상담을 받아보세요.',
      en: 'In-depth reading from compatibility, horoscope & tarot experts.',
      zh: '获取配对、运势和塔罗专家的深度解读。',
      ja: '相性・運勢・タロット専門家の深い鑑定を受けましょう。',
      es: 'Lectura profunda de expertos en compatibilidad, horóscopo y tarot.',
    },
    badge: '⭐',
  },
};

export function getAffiliateLink(program: AffiliateProgram): AffiliateLink {
  return AFFILIATE_LINKS[program];
}

interface ScoreContext {
  loveScore?: number;
  overallScore?: number;
}

/**
 * 운세 점수 + 시즌 이벤트 기반으로 가장 적합한 어필리에이트 링크 반환
 */
export function getContextualAffiliate(
  scores: ScoreContext,
  activeEventTypes: string[] = []
): AffiliateLink {
  // 수성역행 → 소통/라이브 상담 강조
  if (activeEventTypes.includes('mercury_retrograde')) {
    return AFFILIATE_LINKS['lifereader'];
  }
  // 보름달/그믐달 → keen (궁합/운명)
  if (activeEventTypes.includes('full_moon') || activeEventTypes.includes('new_moon')) {
    return AFFILIATE_LINKS['keen'];
  }
  // 발렌타인 → keen 궁합
  if (activeEventTypes.includes('valentine')) {
    return AFFILIATE_LINKS['keen'];
  }
  // 연애운 높음 → keen (궁합 전문)
  if ((scores.loveScore ?? 0) > 70) {
    return AFFILIATE_LINKS['keen'];
  }
  // 기본 → lifereader (라이브 상담)
  return AFFILIATE_LINKS['lifereader'];
}
