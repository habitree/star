/**
 * 지배행성 영향력 데이터
 * 각 행성이 운세 카테고리에 미치는 영향을 정의합니다.
 */

import type { LocalizedText, HoroscopeCategory, ZodiacSignId } from '@/types';

export interface PlanetInfluence {
  id: string;
  name: LocalizedText;
  signs: ZodiacSignId[];
  affectedCategories: HoroscopeCategory[];
  positiveInfluence: LocalizedText;
  negativeInfluence: LocalizedText;
}

export const planetInfluences: Record<string, PlanetInfluence> = {
  mars: {
    id: 'mars',
    name: { ko: '화성', en: 'Mars', zh: '火星', ja: '火星', es: 'Marte' },
    signs: ['aries'],
    affectedCategories: ['career', 'health'],
    positiveInfluence: {
      ko: '화성의 에너지가 강력한 추진력과 용기를 부여합니다.',
      en: 'Mars energy grants powerful drive and courage.',
      zh: '火星的能量赋予强大的推动力和勇气。',
      ja: '火星のエネルギーが強力な推進力と勇気を与えます。',
      es: 'La energía de Marte otorga impulso poderoso y coraje.',
    },
    negativeInfluence: {
      ko: '화성의 영향으로 충동적인 행동에 주의가 필요합니다.',
      en: 'Mars influence requires caution against impulsive actions.',
      zh: '火星的影响需要注意冲动行为。',
      ja: '火星の影響で衝動的な行動に注意が必要です。',
      es: 'La influencia de Marte requiere precaución contra acciones impulsivas.',
    },
  },
  venus: {
    id: 'venus',
    name: { ko: '금성', en: 'Venus', zh: '金星', ja: '金星', es: 'Venus' },
    signs: ['taurus', 'libra'],
    affectedCategories: ['love', 'money'],
    positiveInfluence: {
      ko: '금성의 은총이 사랑과 풍요를 가져옵니다.',
      en: 'Venus grace brings love and abundance.',
      zh: '金星的恩惠带来爱情和富足。',
      ja: '金星の恩恵が愛と豊かさをもたらします。',
      es: 'La gracia de Venus trae amor y abundancia.',
    },
    negativeInfluence: {
      ko: '금성의 영향으로 물질적 욕심이나 감정적 집착에 주의하세요.',
      en: 'Venus influence warns against material greed or emotional attachment.',
      zh: '金星的影响提醒注意物质贪婪或情感执着。',
      ja: '金星の影響で物質的な欲望や感情的な執着に注意してください。',
      es: 'La influencia de Venus advierte contra la codicia material o el apego emocional.',
    },
  },
  mercury: {
    id: 'mercury',
    name: { ko: '수성', en: 'Mercury', zh: '水星', ja: '水星', es: 'Mercurio' },
    signs: ['gemini', 'virgo'],
    affectedCategories: ['career', 'overall'],
    positiveInfluence: {
      ko: '수성이 지적 능력과 소통 능력을 높여줍니다.',
      en: 'Mercury enhances intellectual and communication abilities.',
      zh: '水星提升智力和沟通能力。',
      ja: '水星が知的能力とコミュニケーション能力を高めます。',
      es: 'Mercurio mejora las habilidades intelectuales y de comunicación.',
    },
    negativeInfluence: {
      ko: '수성의 영향으로 과도한 분석이나 의사소통 오류에 주의하세요.',
      en: 'Mercury influence warns against over-analysis or communication errors.',
      zh: '水星的影响提醒注意过度分析或沟通错误。',
      ja: '水星の影響で過度な分析やコミュニケーションの誤りに注意してください。',
      es: 'La influencia de Mercurio advierte contra el análisis excesivo o errores de comunicación.',
    },
  },
  moon: {
    id: 'moon',
    name: { ko: '달', en: 'Moon', zh: '月亮', ja: '月', es: 'Luna' },
    signs: ['cancer'],
    affectedCategories: ['love', 'health'],
    positiveInfluence: {
      ko: '달의 영향으로 감정적 직관이 높아지고 치유의 에너지가 흐릅니다.',
      en: 'Moon influence heightens emotional intuition and flows healing energy.',
      zh: '月亮的影响提高情感直觉，流动治愈能量。',
      ja: '月の影響で感情的な直感が高まり、癒しのエネルギーが流れます。',
      es: 'La influencia de la Luna aumenta la intuición emocional y fluye energía curativa.',
    },
    negativeInfluence: {
      ko: '달의 영향으로 감정 기복이나 과민함에 주의하세요.',
      en: 'Moon influence warns against mood swings or oversensitivity.',
      zh: '月亮的影响提醒注意情绪波动或过敏。',
      ja: '月の影響で感情の起伏や過敏さに注意してください。',
      es: 'La influencia de la Luna advierte contra cambios de humor o hipersensibilidad.',
    },
  },
  sun: {
    id: 'sun',
    name: { ko: '태양', en: 'Sun', zh: '太阳', ja: '太陽', es: 'Sol' },
    signs: ['leo'],
    affectedCategories: ['overall', 'career'],
    positiveInfluence: {
      ko: '태양의 에너지가 자신감과 리더십을 빛나게 합니다.',
      en: 'Sun energy makes confidence and leadership shine.',
      zh: '太阳的能量使自信和领导力闪耀。',
      ja: '太陽のエネルギーが自信とリーダーシップを輝かせます。',
      es: 'La energía del Sol hace brillar la confianza y el liderazgo.',
    },
    negativeInfluence: {
      ko: '태양의 영향으로 자만심이나 과도한 자기주장에 주의하세요.',
      en: 'Sun influence warns against arrogance or excessive self-assertion.',
      zh: '太阳的影响提醒注意自负或过度自我主张。',
      ja: '太陽の影響で傲慢さや過度な自己主張に注意してください。',
      es: 'La influencia del Sol advierte contra la arrogancia o la autoafirmación excesiva.',
    },
  },
  jupiter: {
    id: 'jupiter',
    name: { ko: '목성', en: 'Jupiter', zh: '木星', ja: '木星', es: 'Júpiter' },
    signs: ['sagittarius'],
    affectedCategories: ['money', 'overall'],
    positiveInfluence: {
      ko: '목성의 축복이 행운과 확장의 기회를 가져옵니다.',
      en: 'Jupiter blessing brings opportunities for luck and expansion.',
      zh: '木星的祝福带来幸运和扩展的机会。',
      ja: '木星の祝福が幸運と拡大の機会をもたらします。',
      es: 'La bendición de Júpiter trae oportunidades de suerte y expansión.',
    },
    negativeInfluence: {
      ko: '목성의 영향으로 과욕이나 무모한 낙관에 주의하세요.',
      en: 'Jupiter influence warns against greed or reckless optimism.',
      zh: '木星的影响提醒注意贪婪或鲁莽的乐观。',
      ja: '木星の影響で過欲や無謀な楽観に注意してください。',
      es: 'La influencia de Júpiter advierte contra la codicia o el optimismo imprudente.',
    },
  },
  saturn: {
    id: 'saturn',
    name: { ko: '토성', en: 'Saturn', zh: '土星', ja: '土星', es: 'Saturno' },
    signs: ['capricorn'],
    affectedCategories: ['career', 'health'],
    positiveInfluence: {
      ko: '토성이 책임감과 인내심을 통해 성장의 기회를 제공합니다.',
      en: 'Saturn provides growth opportunities through responsibility and patience.',
      zh: '土星通过责任感和耐心提供成长机会。',
      ja: '土星が責任感と忍耐を通じて成長の機会を提供します。',
      es: 'Saturno proporciona oportunidades de crecimiento a través de la responsabilidad y la paciencia.',
    },
    negativeInfluence: {
      ko: '토성의 영향으로 지나친 엄격함이나 비관에 주의하세요.',
      en: 'Saturn influence warns against excessive strictness or pessimism.',
      zh: '土星的影响提醒注意过度严格或悲观。',
      ja: '土星の影響で過度な厳格さや悲観に注意してください。',
      es: 'La influencia de Saturno advierte contra la rigidez excesiva o el pesimismo.',
    },
  },
  uranus: {
    id: 'uranus',
    name: { ko: '천왕성', en: 'Uranus', zh: '天王星', ja: '天王星', es: 'Urano' },
    signs: ['aquarius'],
    affectedCategories: ['overall', 'career'],
    positiveInfluence: {
      ko: '천왕성이 혁신적인 아이디어와 독창성을 불어넣습니다.',
      en: 'Uranus inspires innovative ideas and originality.',
      zh: '天王星激发创新思想和独创性。',
      ja: '天王星が革新的なアイデアと独創性を吹き込みます。',
      es: 'Urano inspira ideas innovadoras y originalidad.',
    },
    negativeInfluence: {
      ko: '천왕성의 영향으로 예측 불가능한 변화나 반항심에 주의하세요.',
      en: 'Uranus influence warns against unpredictable changes or rebellion.',
      zh: '天王星的影响提醒注意不可预测的变化或叛逆。',
      ja: '天王星の影響で予測不可能な変化や反抗心に注意してください。',
      es: 'La influencia de Urano advierte contra cambios impredecibles o rebeldía.',
    },
  },
  neptune: {
    id: 'neptune',
    name: { ko: '해왕성', en: 'Neptune', zh: '海王星', ja: '海王星', es: 'Neptuno' },
    signs: ['pisces'],
    affectedCategories: ['love', 'health'],
    positiveInfluence: {
      ko: '해왕성이 영적 감수성과 창의적 영감을 높여줍니다.',
      en: 'Neptune enhances spiritual sensitivity and creative inspiration.',
      zh: '海王星增强灵性敏感度和创意灵感。',
      ja: '海王星が霊的な感受性と創造的なインスピレーションを高めます。',
      es: 'Neptuno mejora la sensibilidad espiritual y la inspiración creativa.',
    },
    negativeInfluence: {
      ko: '해왕성의 영향으로 환상에 빠지거나 현실 도피에 주의하세요.',
      en: 'Neptune influence warns against falling into fantasy or escapism.',
      zh: '海王星的影响提醒注意陷入幻想或逃避现实。',
      ja: '海王星の影響で幻想に陥ったり現実逃避に注意してください。',
      es: 'La influencia de Neptuno advierte contra caer en fantasía o escapismo.',
    },
  },
  pluto: {
    id: 'pluto',
    name: { ko: '명왕성', en: 'Pluto', zh: '冥王星', ja: '冥王星', es: 'Plutón' },
    signs: ['scorpio'],
    affectedCategories: ['overall', 'money'],
    positiveInfluence: {
      ko: '명왕성이 깊은 변화와 재생의 힘을 부여합니다.',
      en: 'Pluto grants the power of deep transformation and regeneration.',
      zh: '冥王星赋予深层变革和再生的力量。',
      ja: '冥王星が深い変化と再生の力を与えます。',
      es: 'Plutón otorga el poder de transformación profunda y regeneración.',
    },
    negativeInfluence: {
      ko: '명왕성의 영향으로 집착이나 권력욕에 주의하세요.',
      en: 'Pluto influence warns against obsession or power hunger.',
      zh: '冥王星的影响提醒注意执着或权力欲。',
      ja: '冥王星の影響で執着や権力欲に注意してください。',
      es: 'La influencia de Plutón advierte contra la obsesión o el ansia de poder.',
    },
  },
};

// 별자리별 지배 행성 매핑
export const signToPlanet: Record<ZodiacSignId, string> = {
  aries: 'mars',
  taurus: 'venus',
  gemini: 'mercury',
  cancer: 'moon',
  leo: 'sun',
  virgo: 'mercury',
  libra: 'venus',
  scorpio: 'pluto',
  sagittarius: 'jupiter',
  capricorn: 'saturn',
  aquarius: 'uranus',
  pisces: 'neptune',
};

/**
 * 별자리의 지배 행성 정보 가져오기
 */
export function getPlanetForSign(signId: ZodiacSignId): PlanetInfluence {
  const planetId = signToPlanet[signId];
  return planetInfluences[planetId];
}

/**
 * 행성 영향력이 특정 카테고리에 적용되는지 확인
 */
export function isPlanetAffectingCategory(
  signId: ZodiacSignId,
  category: HoroscopeCategory
): boolean {
  const planet = getPlanetForSign(signId);
  return planet.affectedCategories.includes(category);
}
