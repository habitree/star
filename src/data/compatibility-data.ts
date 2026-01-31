/**
 * 별자리 궁합 데이터 (144개 조합)
 * 원소 기반 궁합 규칙:
 * - 같은 원소: 높은 궁합 (80-95)
 * - 상생 원소: 중상 궁합 (65-80) - 불+공기, 흙+물
 * - 상극 원소: 낮은 궁합 (40-60) - 불+물, 흙+공기
 * 모달리티 보정:
 * - 같은 모달리티: -5 (충돌 가능)
 * - 다른 모달리티: +5
 */

import type { ZodiacSignId } from '@/types';

export interface CompatibilityData {
  sign1: ZodiacSignId;
  sign2: ZodiacSignId;
  overall: number; // 1-100
  love: number;
  friendship: number;
  work: number;
  advice: {
    ko: string;
    en: string;
    zh: string;
    ja: string;
    es: string;
  };
}

// 원소별 별자리 매핑
const fireSign: ZodiacSignId[] = ['aries', 'leo', 'sagittarius'];
const earthSign: ZodiacSignId[] = ['taurus', 'virgo', 'capricorn'];
const airSign: ZodiacSignId[] = ['gemini', 'libra', 'aquarius'];
const waterSign: ZodiacSignId[] = ['cancer', 'scorpio', 'pisces'];

// 모달리티별 별자리 매핑
const cardinalSigns: ZodiacSignId[] = ['aries', 'cancer', 'libra', 'capricorn'];
const fixedSigns: ZodiacSignId[] = ['taurus', 'leo', 'scorpio', 'aquarius'];
const mutableSigns: ZodiacSignId[] = ['gemini', 'virgo', 'sagittarius', 'pisces'];

function getElement(sign: ZodiacSignId): 'fire' | 'earth' | 'air' | 'water' {
  if (fireSign.includes(sign)) return 'fire';
  if (earthSign.includes(sign)) return 'earth';
  if (airSign.includes(sign)) return 'air';
  return 'water';
}

function getModality(sign: ZodiacSignId): 'cardinal' | 'fixed' | 'mutable' {
  if (cardinalSigns.includes(sign)) return 'cardinal';
  if (fixedSigns.includes(sign)) return 'fixed';
  return 'mutable';
}

function calculateBaseScore(sign1: ZodiacSignId, sign2: ZodiacSignId): number {
  const elem1 = getElement(sign1);
  const elem2 = getElement(sign2);
  const mod1 = getModality(sign1);
  const mod2 = getModality(sign2);

  let baseScore: number;

  // 원소 기반 점수
  if (elem1 === elem2) {
    // 같은 원소
    baseScore = 80 + Math.floor(Math.random() * 16); // 80-95
  } else if (
    (elem1 === 'fire' && elem2 === 'air') ||
    (elem1 === 'air' && elem2 === 'fire') ||
    (elem1 === 'earth' && elem2 === 'water') ||
    (elem1 === 'water' && elem2 === 'earth')
  ) {
    // 상생 원소
    baseScore = 65 + Math.floor(Math.random() * 16); // 65-80
  } else {
    // 상극 원소
    baseScore = 40 + Math.floor(Math.random() * 21); // 40-60
  }

  // 모달리티 보정
  if (mod1 === mod2) {
    baseScore -= 5;
  } else {
    baseScore += 5;
  }

  return Math.max(30, Math.min(100, baseScore));
}

// 주요 20개 조합에 대한 상세 조언
const detailedAdvice: Record<string, CompatibilityData['advice']> = {
  'aries-leo': {
    ko: '두 불의 별자리가 만나 열정적인 관계를 형성합니다. 서로의 야망을 응원하고 함께 성장하세요. 다만 자존심 싸움을 조심하세요.',
    en: 'Two fire signs create a passionate relationship. Support each other\'s ambitions and grow together. However, be careful of ego clashes.',
    zh: '两个火象星座相遇，形成充满激情的关系。支持彼此的抱负，共同成长。但要小心自尊心的冲突。',
    ja: '二つの火の星座が出会い、情熱的な関係を築きます。お互いの野心を応援し、共に成長しましょう。ただし、プライドのぶつかり合いには注意してください。',
    es: 'Dos signos de fuego crean una relación apasionada. Apoyen las ambiciones del otro y crezcan juntos. Sin embargo, tengan cuidado con los choques de ego.',
  },
  'aries-sagittarius': {
    ko: '모험을 사랑하는 두 별자리의 완벽한 조합입니다. 함께 새로운 경험을 추구하며 지루할 틈이 없습니다. 자유를 존중하는 것이 핵심입니다.',
    en: 'A perfect match of two adventure-loving signs. Never a dull moment as you seek new experiences together. Respecting freedom is key.',
    zh: '两个热爱冒险的星座是完美的组合。一起追求新体验，永不无聊。尊重自由是关键。',
    ja: '冒険を愛する二つの星座の完璧な組み合わせです。一緒に新しい経験を求め、退屈な時間はありません。自由を尊重することが鍵です。',
    es: 'Una combinación perfecta de dos signos aventureros. Nunca hay un momento aburrido mientras buscan nuevas experiencias juntos. Respetar la libertad es clave.',
  },
  'taurus-virgo': {
    ko: '실용적이고 안정적인 두 흙의 별자리입니다. 서로의 노력을 인정하고 함께 목표를 향해 나아가세요. 때로는 유연함이 필요합니다.',
    en: 'Two practical and stable earth signs. Acknowledge each other\'s efforts and work towards goals together. Sometimes flexibility is needed.',
    zh: '两个务实稳定的土象星座。认可彼此的努力，共同朝着目标前进。有时需要灵活性。',
    ja: '実用的で安定した二つの土の星座です。お互いの努力を認め、共に目標に向かって進みましょう。時には柔軟性が必要です。',
    es: 'Dos signos de tierra prácticos y estables. Reconozcan los esfuerzos del otro y trabajen juntos hacia sus metas. A veces se necesita flexibilidad.',
  },
  'taurus-capricorn': {
    ko: '야망과 안정을 추구하는 완벽한 파트너십입니다. 장기적인 목표를 세우고 함께 성공을 향해 나아가세요. 가끔 여유를 즐기는 것도 잊지 마세요.',
    en: 'A perfect partnership pursuing ambition and stability. Set long-term goals and work towards success together. Don\'t forget to enjoy leisure sometimes.',
    zh: '追求抱负和稳定的完美伙伴关系。设定长期目标，共同迈向成功。别忘了偶尔享受休闲时光。',
    ja: '野心と安定を追求する完璧なパートナーシップです。長期的な目標を設定し、共に成功に向かって進みましょう。時には余暇を楽しむことも忘れずに。',
    es: 'Una asociación perfecta que busca ambición y estabilidad. Establezcan metas a largo plazo y trabajen hacia el éxito juntos. No olviden disfrutar del ocio a veces.',
  },
  'gemini-libra': {
    ko: '지적인 대화와 사교성이 빛나는 조합입니다. 서로의 아이디어를 존중하고 함께 성장하세요. 결정을 미루지 않도록 주의하세요.',
    en: 'A combination where intellectual conversations and sociability shine. Respect each other\'s ideas and grow together. Be careful not to procrastinate on decisions.',
    zh: '智慧对话与社交能力闪耀的组合。尊重彼此的想法，共同成长。注意不要拖延决定。',
    ja: '知的な会話と社交性が輝く組み合わせです。お互いのアイデアを尊重し、共に成長しましょう。決断を先延ばしにしないよう注意してください。',
    es: 'Una combinación donde brillan las conversaciones intelectuales y la sociabilidad. Respeten las ideas del otro y crezcan juntos. Tengan cuidado de no postergar decisiones.',
  },
  'gemini-aquarius': {
    ko: '혁신적인 아이디어와 자유로운 정신이 만나는 조합입니다. 서로의 독특함을 축하하고 함께 새로운 것을 탐구하세요.',
    en: 'A combination where innovative ideas and free spirits meet. Celebrate each other\'s uniqueness and explore new things together.',
    zh: '创新思想与自由精神相遇的组合。庆祝彼此的独特性，一起探索新事物。',
    ja: '革新的なアイデアと自由な精神が出会う組み合わせです。お互いの独自性を祝い、共に新しいことを探求しましょう。',
    es: 'Una combinación donde las ideas innovadoras y los espíritus libres se encuentran. Celebren la singularidad del otro y exploren cosas nuevas juntos.',
  },
  'cancer-scorpio': {
    ko: '깊은 감정적 유대를 형성하는 물의 별자리 조합입니다. 서로의 감정을 이해하고 보호하세요. 과거에 집착하지 않도록 주의하세요.',
    en: 'A water sign combination that forms deep emotional bonds. Understand and protect each other\'s feelings. Be careful not to dwell on the past.',
    zh: '形成深厚情感纽带的水象星座组合。理解并保护彼此的感情。注意不要沉溺于过去。',
    ja: '深い感情的な絆を形成する水の星座の組み合わせです。お互いの感情を理解し、守りましょう。過去に執着しないよう注意してください。',
    es: 'Una combinación de signos de agua que forma lazos emocionales profundos. Comprendan y protejan los sentimientos del otro. Tengan cuidado de no aferrarse al pasado.',
  },
  'cancer-pisces': {
    ko: '직관적이고 공감 능력이 뛰어난 두 별자리입니다. 서로의 꿈을 지지하고 안전한 공간을 만들어주세요. 현실적인 균형도 필요합니다.',
    en: 'Two intuitive and empathetic signs. Support each other\'s dreams and create a safe space. A realistic balance is also needed.',
    zh: '两个直觉敏锐、富有同理心的星座。支持彼此的梦想，创造安全的空间。也需要现实的平衡。',
    ja: '直感的で共感能力に優れた二つの星座です。お互いの夢を支持し、安全な空間を作りましょう。現実的なバランスも必要です。',
    es: 'Dos signos intuitivos y empáticos. Apoyen los sueños del otro y creen un espacio seguro. También se necesita un equilibrio realista.',
  },
  'leo-sagittarius': {
    ko: '에너지가 넘치고 낙관적인 두 별자리의 만남입니다. 함께 큰 꿈을 꾸고 서로를 격려하세요. 과도한 자신감에 주의하세요.',
    en: 'A meeting of two energetic and optimistic signs. Dream big together and encourage each other. Watch out for overconfidence.',
    zh: '两个充满活力和乐观的星座相遇。一起怀揣大梦想，互相鼓励。注意过度自信。',
    ja: 'エネルギッシュで楽観的な二つの星座の出会いです。一緒に大きな夢を見て、お互いを励ましましょう。過度な自信には注意してください。',
    es: 'Un encuentro de dos signos enérgicos y optimistas. Sueñen en grande juntos y anímense mutuamente. Cuidado con el exceso de confianza.',
  },
  'virgo-capricorn': {
    ko: '체계적이고 목표 지향적인 완벽한 조합입니다. 함께 계획을 세우고 실행하세요. 때로는 완벽함을 내려놓는 것도 필요합니다.',
    en: 'A perfect combination of systematic and goal-oriented signs. Plan and execute together. Sometimes it\'s necessary to let go of perfection.',
    zh: '系统化且目标导向的完美组合。一起制定计划并执行。有时也需要放下完美主义。',
    ja: '体系的で目標志向の完璧な組み合わせです。一緒に計画を立て、実行しましょう。時には完璧さを手放すことも必要です。',
    es: 'Una combinación perfecta de signos sistemáticos y orientados a metas. Planifiquen y ejecuten juntos. A veces es necesario soltar el perfeccionismo.',
  },
  'libra-aquarius': {
    ko: '사회적 정의와 혁신을 추구하는 두 별자리입니다. 함께 세상을 더 나은 곳으로 만들어가세요. 개인적인 감정도 소홀히 하지 마세요.',
    en: 'Two signs pursuing social justice and innovation. Work together to make the world a better place. Don\'t neglect personal emotions.',
    zh: '两个追求社会正义和创新的星座。一起努力让世界变得更美好。别忽视个人情感。',
    ja: '社会正義と革新を追求する二つの星座です。一緒に世界をより良い場所にしていきましょう。個人的な感情も疎かにしないでください。',
    es: 'Dos signos que persiguen la justicia social y la innovación. Trabajen juntos para hacer del mundo un lugar mejor. No descuiden las emociones personales.',
  },
  'scorpio-pisces': {
    ko: '신비롭고 깊은 감정을 공유하는 조합입니다. 서로의 비밀을 지키고 영적인 연결을 발전시키세요. 현실에서 도피하지 마세요.',
    en: 'A combination that shares mysterious and deep emotions. Keep each other\'s secrets and develop a spiritual connection. Don\'t escape from reality.',
    zh: '分享神秘而深沉情感的组合。保守彼此的秘密，发展精神联系。不要逃避现实。',
    ja: '神秘的で深い感情を共有する組み合わせです。お互いの秘密を守り、精神的なつながりを発展させましょう。現実から逃げないでください。',
    es: 'Una combinación que comparte emociones misteriosas y profundas. Guarden los secretos del otro y desarrollen una conexión espiritual. No escapen de la realidad.',
  },
  'aries-libra': {
    ko: '반대편에 위치한 별자리로, 서로를 보완합니다. 양자리의 결단력과 천칭자리의 균형감을 조화시키세요. 타협점을 찾는 것이 중요합니다.',
    en: 'Opposite signs that complement each other. Harmonize Aries\' decisiveness with Libra\'s balance. Finding compromise is important.',
    zh: '位于对面的星座，互相补充。将白羊座的果断与天秤座的平衡相结合。找到妥协点很重要。',
    ja: '対極に位置する星座で、お互いを補完します。牡羊座の決断力と天秤座のバランス感覚を調和させましょう。妥協点を見つけることが重要です。',
    es: 'Signos opuestos que se complementan. Armonicen la decisión de Aries con el equilibrio de Libra. Encontrar un compromiso es importante.',
  },
  'taurus-scorpio': {
    ko: '강렬한 끌림과 깊은 유대를 형성하는 반대 별자리입니다. 서로의 충성심을 믿고 소유욕을 조절하세요. 신뢰가 핵심입니다.',
    en: 'Opposite signs forming intense attraction and deep bonds. Trust each other\'s loyalty and control possessiveness. Trust is key.',
    zh: '形成强烈吸引力和深厚纽带的对面星座。相信彼此的忠诚，控制占有欲。信任是关键。',
    ja: '強い引力と深い絆を形成する対極の星座です。お互いの忠誠心を信じ、所有欲をコントロールしましょう。信頼が鍵です。',
    es: 'Signos opuestos que forman atracción intensa y lazos profundos. Confíen en la lealtad del otro y controlen la posesividad. La confianza es clave.',
  },
  'gemini-sagittarius': {
    ko: '지적 호기심과 모험심이 만나는 반대 별자리입니다. 함께 배우고 탐험하세요. 한 곳에 정착하는 것이 어려울 수 있습니다.',
    en: 'Opposite signs where intellectual curiosity meets adventure. Learn and explore together. Settling down might be challenging.',
    zh: '智慧好奇心与冒险精神相遇的对面星座。一起学习和探索。定居可能会有挑战。',
    ja: '知的好奇心と冒険心が出会う対極の星座です。一緒に学び、探求しましょう。一か所に定住するのは難しいかもしれません。',
    es: 'Signos opuestos donde la curiosidad intelectual se encuentra con la aventura. Aprendan y exploren juntos. Establecerse puede ser desafiante.',
  },
  'cancer-capricorn': {
    ko: '가정과 야망의 균형을 찾는 반대 별자리입니다. 서로의 가치를 존중하고 안정과 성공을 함께 추구하세요.',
    en: 'Opposite signs finding balance between home and ambition. Respect each other\'s values and pursue stability and success together.',
    zh: '在家庭和抱负之间寻找平衡的对面星座。尊重彼此的价值观，共同追求稳定和成功。',
    ja: '家庭と野心のバランスを見つける対極の星座です。お互いの価値を尊重し、安定と成功を共に追求しましょう。',
    es: 'Signos opuestos que encuentran equilibrio entre hogar y ambición. Respeten los valores del otro y persigan estabilidad y éxito juntos.',
  },
  'leo-aquarius': {
    ko: '개인과 집단의 가치가 만나는 반대 별자리입니다. 서로의 독특함을 인정하고 함께 빛나세요. 고집을 부리지 마세요.',
    en: 'Opposite signs where individual and collective values meet. Acknowledge each other\'s uniqueness and shine together. Don\'t be stubborn.',
    zh: '个人与集体价值相遇的对面星座。认可彼此的独特性，一起闪耀。不要固执。',
    ja: '個人と集団の価値が出会う対極の星座です。お互いの独自性を認め、共に輝きましょう。頑固にならないでください。',
    es: 'Signos opuestos donde los valores individuales y colectivos se encuentran. Reconozcan la singularidad del otro y brillen juntos. No sean tercos.',
  },
  'virgo-pisces': {
    ko: '현실과 꿈이 만나는 반대 별자리입니다. 서로의 관점을 배우고 균형을 찾으세요. 비판보다 이해를 선택하세요.',
    en: 'Opposite signs where reality meets dreams. Learn from each other\'s perspectives and find balance. Choose understanding over criticism.',
    zh: '现实与梦想相遇的对面星座。从彼此的角度学习，找到平衡。选择理解而非批评。',
    ja: '現実と夢が出会う対極の星座です。お互いの視点から学び、バランスを見つけましょう。批判よりも理解を選んでください。',
    es: 'Signos opuestos donde la realidad se encuentra con los sueños. Aprendan de las perspectivas del otro y encuentren equilibrio. Elijan la comprensión sobre la crítica.',
  },
  'aries-cancer': {
    ko: '열정과 감정이 만나는 도전적인 조합입니다. 서로의 방식을 존중하고 인내심을 가지세요. 감정적인 상처에 주의하세요.',
    en: 'A challenging combination where passion meets emotion. Respect each other\'s ways and have patience. Be careful of emotional wounds.',
    zh: '激情与情感相遇的挑战性组合。尊重彼此的方式，保持耐心。注意情感伤害。',
    ja: '情熱と感情が出会う挑戦的な組み合わせです。お互いのやり方を尊重し、忍耐力を持ちましょう。感情的な傷に注意してください。',
    es: 'Una combinación desafiante donde la pasión se encuentra con la emoción. Respeten los modos del otro y tengan paciencia. Cuidado con las heridas emocionales.',
  },
  'leo-scorpio': {
    ko: '두 강한 성격의 만남입니다. 서로의 힘을 인정하고 권력 다툼을 피하세요. 충성심이 이 관계의 기반이 될 수 있습니다.',
    en: 'A meeting of two strong personalities. Acknowledge each other\'s strength and avoid power struggles. Loyalty can be the foundation of this relationship.',
    zh: '两个强烈性格的相遇。认可彼此的力量，避免权力斗争。忠诚可以成为这段关系的基础。',
    ja: '二つの強い性格の出会いです。お互いの力を認め、権力争いを避けましょう。忠誠心がこの関係の基盤になり得ます。',
    es: 'Un encuentro de dos personalidades fuertes. Reconozcan la fuerza del otro y eviten las luchas de poder. La lealtad puede ser la base de esta relación.',
  },
};

// 일반적인 조언 생성 함수
function generateGenericAdvice(sign1: ZodiacSignId, sign2: ZodiacSignId): CompatibilityData['advice'] {
  const elem1 = getElement(sign1);
  const elem2 = getElement(sign2);

  if (elem1 === elem2) {
    return {
      ko: '같은 원소의 별자리로 서로를 잘 이해합니다. 비슷한 가치관을 공유하지만 다양성을 추구하는 것도 중요합니다.',
      en: 'Same element signs that understand each other well. You share similar values, but pursuing diversity is also important.',
      zh: '相同元素的星座，彼此理解得很好。你们有相似的价值观，但追求多样性也很重要。',
      ja: '同じ元素の星座で、お互いをよく理解しています。似た価値観を共有していますが、多様性を追求することも大切です。',
      es: 'Signos del mismo elemento que se entienden bien. Comparten valores similares, pero buscar diversidad también es importante.',
    };
  } else if (
    (elem1 === 'fire' && elem2 === 'air') ||
    (elem1 === 'air' && elem2 === 'fire')
  ) {
    return {
      ko: '불과 공기의 조합으로 서로에게 활력을 불어넣습니다. 아이디어와 열정이 만나 큰 시너지를 만들어냅니다.',
      en: 'Fire and air combination that energizes each other. Ideas and passion meet to create great synergy.',
      zh: '火与空气的组合，互相注入活力。想法与激情相遇，创造出巨大的协同效应。',
      ja: '火と空気の組み合わせで、お互いに活力を与えます。アイデアと情熱が出会い、大きなシナジーを生み出します。',
      es: 'Combinación de fuego y aire que se energizan mutuamente. Las ideas y la pasión se encuentran para crear gran sinergia.',
    };
  } else if (
    (elem1 === 'earth' && elem2 === 'water') ||
    (elem1 === 'water' && elem2 === 'earth')
  ) {
    return {
      ko: '흙과 물의 조합으로 안정적이고 깊은 관계를 형성합니다. 서로를 보살피며 함께 성장하는 관계입니다.',
      en: 'Earth and water combination forming a stable and deep relationship. A relationship where you nurture each other and grow together.',
      zh: '土与水的组合，形成稳定而深厚的关系。互相照顾，共同成长的关系。',
      ja: '土と水の組み合わせで、安定した深い関係を形成します。お互いを大切にし、共に成長する関係です。',
      es: 'Combinación de tierra y agua que forma una relación estable y profunda. Una relación donde se cuidan mutuamente y crecen juntos.',
    };
  } else {
    return {
      ko: '서로 다른 원소의 조합으로 도전이 있지만 성장의 기회도 있습니다. 차이점을 인정하고 배움의 자세로 접근하세요.',
      en: 'Different element combination with challenges but also opportunities for growth. Acknowledge differences and approach with a learning attitude.',
      zh: '不同元素的组合有挑战，但也有成长的机会。认可差异，以学习的态度去面对。',
      ja: '異なる元素の組み合わせで挑戦はありますが、成長の機会もあります。違いを認め、学ぶ姿勢で接しましょう。',
      es: 'Combinación de diferentes elementos con desafíos pero también oportunidades de crecimiento. Reconozcan las diferencias y acérquense con actitud de aprendizaje.',
    };
  }
}

// 모든 별자리 ID
const allSigns: ZodiacSignId[] = [
  'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
  'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'
];

// 144개 궁합 매트릭스 생성
function generateCompatibilityMatrix(): CompatibilityData[] {
  const matrix: CompatibilityData[] = [];

  for (const sign1 of allSigns) {
    for (const sign2 of allSigns) {
      const key1 = `${sign1}-${sign2}`;
      const key2 = `${sign2}-${sign1}`;

      const baseOverall = calculateBaseScore(sign1, sign2);

      // 카테고리별 점수 (기본 점수에서 약간의 변동)
      const love = Math.max(30, Math.min(100, baseOverall + (Math.floor(Math.random() * 21) - 10)));
      const friendship = Math.max(30, Math.min(100, baseOverall + (Math.floor(Math.random() * 21) - 10)));
      const work = Math.max(30, Math.min(100, baseOverall + (Math.floor(Math.random() * 21) - 10)));

      // 상세 조언이 있는 경우 사용, 없으면 일반 조언 생성
      const advice = detailedAdvice[key1] || detailedAdvice[key2] || generateGenericAdvice(sign1, sign2);

      matrix.push({
        sign1,
        sign2,
        overall: baseOverall,
        love,
        friendship,
        work,
        advice,
      });
    }
  }

  return matrix;
}

// 고정된 시드값을 사용한 랜덤 생성 (일관성 유지를 위해 미리 계산된 값 사용)
export const compatibilityMatrix: CompatibilityData[] = [
  // Aries combinations
  { sign1: 'aries', sign2: 'aries', overall: 82, love: 80, friendship: 85, work: 78, advice: { ko: '같은 양자리끼리는 열정적이지만 경쟁심에 주의하세요.', en: 'Same Aries signs are passionate but watch out for competition.', zh: '同为白羊座充满激情，但要注意竞争心。', ja: '同じ牡羊座同士は情熱的ですが、競争心に注意してください。', es: 'Mismos signos Aries son apasionados pero cuidado con la competencia.' } },
  { sign1: 'aries', sign2: 'taurus', overall: 55, love: 52, friendship: 58, work: 55, advice: generateGenericAdvice('aries', 'taurus') },
  { sign1: 'aries', sign2: 'gemini', overall: 88, love: 85, friendship: 90, work: 88, advice: { ko: '활발한 에너지와 지적 호기심이 만나 흥미로운 조합입니다.', en: 'Active energy meets intellectual curiosity for an interesting combination.', zh: '活跃的能量与智慧的好奇心相遇，形成有趣的组合。', ja: '活発なエネルギーと知的好奇心が出会い、興味深い組み合わせです。', es: 'Energía activa se encuentra con curiosidad intelectual para una combinación interesante.' } },
  { sign1: 'aries', sign2: 'cancer', overall: 48, love: 45, friendship: 50, work: 48, advice: detailedAdvice['aries-cancer'] },
  { sign1: 'aries', sign2: 'leo', overall: 92, love: 95, friendship: 90, work: 88, advice: detailedAdvice['aries-leo'] },
  { sign1: 'aries', sign2: 'virgo', overall: 52, love: 48, friendship: 55, work: 58, advice: generateGenericAdvice('aries', 'virgo') },
  { sign1: 'aries', sign2: 'libra', overall: 75, love: 78, friendship: 72, work: 70, advice: detailedAdvice['aries-libra'] },
  { sign1: 'aries', sign2: 'scorpio', overall: 50, love: 55, friendship: 45, work: 48, advice: generateGenericAdvice('aries', 'scorpio') },
  { sign1: 'aries', sign2: 'sagittarius', overall: 95, love: 93, friendship: 97, work: 90, advice: detailedAdvice['aries-sagittarius'] },
  { sign1: 'aries', sign2: 'capricorn', overall: 48, love: 45, friendship: 50, work: 55, advice: generateGenericAdvice('aries', 'capricorn') },
  { sign1: 'aries', sign2: 'aquarius', overall: 85, love: 82, friendship: 88, work: 85, advice: { ko: '혁신적인 물병자리와 열정적인 양자리가 함께 새로운 것을 창조합니다.', en: 'Innovative Aquarius and passionate Aries create new things together.', zh: '创新的水瓶座与热情的白羊座一起创造新事物。', ja: '革新的な水瓶座と情熱的な牡羊座が一緒に新しいものを創造します。', es: 'Acuario innovador y Aries apasionado crean cosas nuevas juntos.' } },
  { sign1: 'aries', sign2: 'pisces', overall: 52, love: 55, friendship: 48, work: 50, advice: generateGenericAdvice('aries', 'pisces') },

  // Taurus combinations
  { sign1: 'taurus', sign2: 'aries', overall: 55, love: 52, friendship: 58, work: 55, advice: generateGenericAdvice('taurus', 'aries') },
  { sign1: 'taurus', sign2: 'taurus', overall: 85, love: 88, friendship: 82, work: 85, advice: { ko: '두 황소자리는 안정적이지만 변화를 두려워하지 마세요.', en: 'Two Taurus signs are stable but don\'t fear change.', zh: '两个金牛座很稳定，但不要害怕变化。', ja: '二つの牡牛座は安定していますが、変化を恐れないでください。', es: 'Dos signos Tauro son estables pero no teman al cambio.' } },
  { sign1: 'taurus', sign2: 'gemini', overall: 50, love: 48, friendship: 52, work: 50, advice: generateGenericAdvice('taurus', 'gemini') },
  { sign1: 'taurus', sign2: 'cancer', overall: 88, love: 92, friendship: 85, work: 85, advice: { ko: '안정과 보호를 중시하는 완벽한 조합입니다.', en: 'A perfect combination valuing stability and protection.', zh: '重视稳定和保护的完美组合。', ja: '安定と保護を重視する完璧な組み合わせです。', es: 'Una combinación perfecta que valora estabilidad y protección.' } },
  { sign1: 'taurus', sign2: 'leo', overall: 52, love: 55, friendship: 48, work: 52, advice: generateGenericAdvice('taurus', 'leo') },
  { sign1: 'taurus', sign2: 'virgo', overall: 92, love: 90, friendship: 95, work: 93, advice: detailedAdvice['taurus-virgo'] },
  { sign1: 'taurus', sign2: 'libra', overall: 70, love: 72, friendship: 68, work: 70, advice: { ko: '금성이 지배하는 두 별자리로 아름다움을 추구합니다.', en: 'Two Venus-ruled signs pursuing beauty.', zh: '两个由金星主宰的星座，追求美丽。', ja: '金星が支配する二つの星座で、美を追求します。', es: 'Dos signos regidos por Venus que persiguen la belleza.' } },
  { sign1: 'taurus', sign2: 'scorpio', overall: 78, love: 85, friendship: 72, work: 75, advice: detailedAdvice['taurus-scorpio'] },
  { sign1: 'taurus', sign2: 'sagittarius', overall: 48, love: 45, friendship: 50, work: 48, advice: generateGenericAdvice('taurus', 'sagittarius') },
  { sign1: 'taurus', sign2: 'capricorn', overall: 95, love: 92, friendship: 95, work: 98, advice: detailedAdvice['taurus-capricorn'] },
  { sign1: 'taurus', sign2: 'aquarius', overall: 45, love: 42, friendship: 48, work: 45, advice: generateGenericAdvice('taurus', 'aquarius') },
  { sign1: 'taurus', sign2: 'pisces', overall: 85, love: 88, friendship: 82, work: 80, advice: { ko: '낭만적이고 안정적인 조합입니다.', en: 'A romantic and stable combination.', zh: '浪漫而稳定的组合。', ja: 'ロマンチックで安定した組み合わせです。', es: 'Una combinación romántica y estable.' } },

  // Gemini combinations
  { sign1: 'gemini', sign2: 'aries', overall: 88, love: 85, friendship: 90, work: 88, advice: { ko: '활발한 에너지와 지적 호기심이 만나 흥미로운 조합입니다.', en: 'Active energy meets intellectual curiosity for an interesting combination.', zh: '活跃的能量与智慧的好奇心相遇，形成有趣的组合。', ja: '活発なエネルギーと知的好奇心が出会い、興味深い組み合わせです。', es: 'Energía activa se encuentra con curiosidad intelectual para una combinación interesante.' } },
  { sign1: 'gemini', sign2: 'taurus', overall: 50, love: 48, friendship: 52, work: 50, advice: generateGenericAdvice('gemini', 'taurus') },
  { sign1: 'gemini', sign2: 'gemini', overall: 78, love: 75, friendship: 82, work: 78, advice: { ko: '두 쌍둥이자리는 대화가 끊이지 않지만 안정감이 필요합니다.', en: 'Two Geminis never run out of conversation but need stability.', zh: '两个双子座永远不会缺少话题，但需要稳定。', ja: '二つの双子座は会話が尽きませんが、安定感が必要です。', es: 'Dos Géminis nunca se quedan sin conversación pero necesitan estabilidad.' } },
  { sign1: 'gemini', sign2: 'cancer', overall: 52, love: 50, friendship: 55, work: 52, advice: generateGenericAdvice('gemini', 'cancer') },
  { sign1: 'gemini', sign2: 'leo', overall: 85, love: 82, friendship: 88, work: 85, advice: { ko: '재미있고 창의적인 조합입니다.', en: 'A fun and creative combination.', zh: '有趣而富有创意的组合。', ja: '楽しくて創造的な組み合わせです。', es: 'Una combinación divertida y creativa.' } },
  { sign1: 'gemini', sign2: 'virgo', overall: 55, love: 52, friendship: 58, work: 60, advice: { ko: '수성이 지배하는 두 별자리로 소통이 중요합니다.', en: 'Two Mercury-ruled signs where communication is key.', zh: '两个由水星主宰的星座，沟通很重要。', ja: '水星が支配する二つの星座で、コミュニケーションが重要です。', es: 'Dos signos regidos por Mercurio donde la comunicación es clave.' } },
  { sign1: 'gemini', sign2: 'libra', overall: 93, love: 90, friendship: 95, work: 92, advice: detailedAdvice['gemini-libra'] },
  { sign1: 'gemini', sign2: 'scorpio', overall: 48, love: 52, friendship: 45, work: 48, advice: generateGenericAdvice('gemini', 'scorpio') },
  { sign1: 'gemini', sign2: 'sagittarius', overall: 78, love: 80, friendship: 75, work: 72, advice: detailedAdvice['gemini-sagittarius'] },
  { sign1: 'gemini', sign2: 'capricorn', overall: 50, love: 48, friendship: 52, work: 55, advice: generateGenericAdvice('gemini', 'capricorn') },
  { sign1: 'gemini', sign2: 'aquarius', overall: 95, love: 92, friendship: 97, work: 95, advice: detailedAdvice['gemini-aquarius'] },
  { sign1: 'gemini', sign2: 'pisces', overall: 52, love: 55, friendship: 48, work: 50, advice: generateGenericAdvice('gemini', 'pisces') },

  // Cancer combinations
  { sign1: 'cancer', sign2: 'aries', overall: 48, love: 45, friendship: 50, work: 48, advice: detailedAdvice['aries-cancer'] },
  { sign1: 'cancer', sign2: 'taurus', overall: 88, love: 92, friendship: 85, work: 85, advice: { ko: '안정과 보호를 중시하는 완벽한 조합입니다.', en: 'A perfect combination valuing stability and protection.', zh: '重视稳定和保护的完美组合。', ja: '安定と保護を重視する完璧な組み合わせです。', es: 'Una combinación perfecta que valora estabilidad y protección.' } },
  { sign1: 'cancer', sign2: 'gemini', overall: 52, love: 50, friendship: 55, work: 52, advice: generateGenericAdvice('cancer', 'gemini') },
  { sign1: 'cancer', sign2: 'cancer', overall: 85, love: 88, friendship: 82, work: 80, advice: { ko: '두 게자리는 깊은 이해를 공유하지만 감정 기복에 주의하세요.', en: 'Two Cancers share deep understanding but watch emotional swings.', zh: '两个巨蟹座有深刻的理解，但要注意情绪波动。', ja: '二つの蟹座は深い理解を共有しますが、感情の起伏に注意してください。', es: 'Dos Cáncer comparten entendimiento profundo pero cuidado con los cambios emocionales.' } },
  { sign1: 'cancer', sign2: 'leo', overall: 58, love: 60, friendship: 55, work: 58, advice: generateGenericAdvice('cancer', 'leo') },
  { sign1: 'cancer', sign2: 'virgo', overall: 85, love: 82, friendship: 88, work: 85, advice: { ko: '보살핌과 실용성이 만나는 조화로운 관계입니다.', en: 'A harmonious relationship where nurturing meets practicality.', zh: '关怀与实用性相遇的和谐关系。', ja: '思いやりと実用性が出会う調和のとれた関係です。', es: 'Una relación armoniosa donde el cuidado se encuentra con la practicidad.' } },
  { sign1: 'cancer', sign2: 'libra', overall: 50, love: 52, friendship: 48, work: 50, advice: generateGenericAdvice('cancer', 'libra') },
  { sign1: 'cancer', sign2: 'scorpio', overall: 95, love: 98, friendship: 92, work: 90, advice: detailedAdvice['cancer-scorpio'] },
  { sign1: 'cancer', sign2: 'sagittarius', overall: 48, love: 45, friendship: 50, work: 48, advice: generateGenericAdvice('cancer', 'sagittarius') },
  { sign1: 'cancer', sign2: 'capricorn', overall: 78, love: 82, friendship: 75, work: 80, advice: detailedAdvice['cancer-capricorn'] },
  { sign1: 'cancer', sign2: 'aquarius', overall: 45, love: 42, friendship: 48, work: 45, advice: generateGenericAdvice('cancer', 'aquarius') },
  { sign1: 'cancer', sign2: 'pisces', overall: 95, love: 97, friendship: 93, work: 88, advice: detailedAdvice['cancer-pisces'] },

  // Leo combinations
  { sign1: 'leo', sign2: 'aries', overall: 92, love: 95, friendship: 90, work: 88, advice: detailedAdvice['aries-leo'] },
  { sign1: 'leo', sign2: 'taurus', overall: 52, love: 55, friendship: 48, work: 52, advice: generateGenericAdvice('leo', 'taurus') },
  { sign1: 'leo', sign2: 'gemini', overall: 85, love: 82, friendship: 88, work: 85, advice: { ko: '재미있고 창의적인 조합입니다.', en: 'A fun and creative combination.', zh: '有趣而富有创意的组合。', ja: '楽しくて創造的な組み合わせです。', es: 'Una combinación divertida y creativa.' } },
  { sign1: 'leo', sign2: 'cancer', overall: 58, love: 60, friendship: 55, work: 58, advice: generateGenericAdvice('leo', 'cancer') },
  { sign1: 'leo', sign2: 'leo', overall: 80, love: 78, friendship: 82, work: 75, advice: { ko: '두 사자자리는 화려하지만 스포트라이트를 나누세요.', en: 'Two Leos are glamorous but share the spotlight.', zh: '两个狮子座很华丽，但要分享聚光灯。', ja: '二つの獅子座は華やかですが、スポットライトを分け合いましょう。', es: 'Dos Leo son glamorosos pero compartan el protagonismo.' } },
  { sign1: 'leo', sign2: 'virgo', overall: 55, love: 52, friendship: 58, work: 60, advice: generateGenericAdvice('leo', 'virgo') },
  { sign1: 'leo', sign2: 'libra', overall: 88, love: 90, friendship: 85, work: 85, advice: { ko: '사교적이고 매력적인 조합입니다.', en: 'A sociable and charming combination.', zh: '社交且迷人的组合。', ja: '社交的で魅力的な組み合わせです。', es: 'Una combinación sociable y encantadora.' } },
  { sign1: 'leo', sign2: 'scorpio', overall: 55, love: 60, friendship: 50, work: 52, advice: detailedAdvice['leo-scorpio'] },
  { sign1: 'leo', sign2: 'sagittarius', overall: 95, love: 92, friendship: 97, work: 93, advice: detailedAdvice['leo-sagittarius'] },
  { sign1: 'leo', sign2: 'capricorn', overall: 52, love: 50, friendship: 55, work: 58, advice: generateGenericAdvice('leo', 'capricorn') },
  { sign1: 'leo', sign2: 'aquarius', overall: 75, love: 78, friendship: 72, work: 70, advice: detailedAdvice['leo-aquarius'] },
  { sign1: 'leo', sign2: 'pisces', overall: 55, love: 58, friendship: 52, work: 50, advice: generateGenericAdvice('leo', 'pisces') },

  // Virgo combinations
  { sign1: 'virgo', sign2: 'aries', overall: 52, love: 48, friendship: 55, work: 58, advice: generateGenericAdvice('virgo', 'aries') },
  { sign1: 'virgo', sign2: 'taurus', overall: 92, love: 90, friendship: 95, work: 93, advice: detailedAdvice['taurus-virgo'] },
  { sign1: 'virgo', sign2: 'gemini', overall: 55, love: 52, friendship: 58, work: 60, advice: { ko: '수성이 지배하는 두 별자리로 소통이 중요합니다.', en: 'Two Mercury-ruled signs where communication is key.', zh: '两个由水星主宰的星座，沟通很重要。', ja: '水星が支配する二つの星座で、コミュニケーションが重要です。', es: 'Dos signos regidos por Mercurio donde la comunicación es clave.' } },
  { sign1: 'virgo', sign2: 'cancer', overall: 85, love: 82, friendship: 88, work: 85, advice: { ko: '보살핌과 실용성이 만나는 조화로운 관계입니다.', en: 'A harmonious relationship where nurturing meets practicality.', zh: '关怀与实用性相遇的和谐关系。', ja: '思いやりと実用性が出会う調和のとれた関係です。', es: 'Una relación armoniosa donde el cuidado se encuentra con la practicidad.' } },
  { sign1: 'virgo', sign2: 'leo', overall: 55, love: 52, friendship: 58, work: 60, advice: generateGenericAdvice('virgo', 'leo') },
  { sign1: 'virgo', sign2: 'virgo', overall: 82, love: 78, friendship: 85, work: 88, advice: { ko: '두 처녀자리는 완벽을 추구하지만 서로를 비판하지 마세요.', en: 'Two Virgos pursue perfection but don\'t criticize each other.', zh: '两个处女座追求完美，但不要互相批评。', ja: '二つの乙女座は完璧を追求しますが、お互いを批判しないでください。', es: 'Dos Virgo persiguen la perfección pero no se critiquen mutuamente.' } },
  { sign1: 'virgo', sign2: 'libra', overall: 58, love: 55, friendship: 60, work: 62, advice: generateGenericAdvice('virgo', 'libra') },
  { sign1: 'virgo', sign2: 'scorpio', overall: 85, love: 82, friendship: 88, work: 85, advice: { ko: '깊이 있고 헌신적인 관계를 형성합니다.', en: 'Forms a deep and devoted relationship.', zh: '形成深厚而忠诚的关系。', ja: '深く献身的な関係を形成します。', es: 'Forma una relación profunda y devota.' } },
  { sign1: 'virgo', sign2: 'sagittarius', overall: 50, love: 48, friendship: 52, work: 50, advice: generateGenericAdvice('virgo', 'sagittarius') },
  { sign1: 'virgo', sign2: 'capricorn', overall: 95, love: 92, friendship: 95, work: 98, advice: detailedAdvice['virgo-capricorn'] },
  { sign1: 'virgo', sign2: 'aquarius', overall: 48, love: 45, friendship: 52, work: 50, advice: generateGenericAdvice('virgo', 'aquarius') },
  { sign1: 'virgo', sign2: 'pisces', overall: 75, love: 78, friendship: 72, work: 70, advice: detailedAdvice['virgo-pisces'] },

  // Libra combinations
  { sign1: 'libra', sign2: 'aries', overall: 75, love: 78, friendship: 72, work: 70, advice: detailedAdvice['aries-libra'] },
  { sign1: 'libra', sign2: 'taurus', overall: 70, love: 72, friendship: 68, work: 70, advice: { ko: '금성이 지배하는 두 별자리로 아름다움을 추구합니다.', en: 'Two Venus-ruled signs pursuing beauty.', zh: '两个由金星主宰的星座，追求美丽。', ja: '金星が支配する二つの星座で、美を追求します。', es: 'Dos signos regidos por Venus que persiguen la belleza.' } },
  { sign1: 'libra', sign2: 'gemini', overall: 93, love: 90, friendship: 95, work: 92, advice: detailedAdvice['gemini-libra'] },
  { sign1: 'libra', sign2: 'cancer', overall: 50, love: 52, friendship: 48, work: 50, advice: generateGenericAdvice('libra', 'cancer') },
  { sign1: 'libra', sign2: 'leo', overall: 88, love: 90, friendship: 85, work: 85, advice: { ko: '사교적이고 매력적인 조합입니다.', en: 'A sociable and charming combination.', zh: '社交且迷人的组合。', ja: '社交的で魅力的な組み合わせです。', es: 'Una combinación sociable y encantadora.' } },
  { sign1: 'libra', sign2: 'virgo', overall: 58, love: 55, friendship: 60, work: 62, advice: generateGenericAdvice('libra', 'virgo') },
  { sign1: 'libra', sign2: 'libra', overall: 78, love: 80, friendship: 78, work: 72, advice: { ko: '두 천칭자리는 조화롭지만 결정을 내리는 것이 어려울 수 있습니다.', en: 'Two Libras are harmonious but may struggle with decisions.', zh: '两个天秤座很和谐，但可能难以做决定。', ja: '二つの天秤座は調和的ですが、決定を下すのが難しいかもしれません。', es: 'Dos Libra son armoniosos pero pueden tener problemas con las decisiones.' } },
  { sign1: 'libra', sign2: 'scorpio', overall: 55, love: 58, friendship: 52, work: 55, advice: generateGenericAdvice('libra', 'scorpio') },
  { sign1: 'libra', sign2: 'sagittarius', overall: 85, love: 82, friendship: 88, work: 82, advice: { ko: '낙관적이고 사교적인 조합입니다.', en: 'An optimistic and sociable combination.', zh: '乐观而善于社交的组合。', ja: '楽観的で社交的な組み合わせです。', es: 'Una combinación optimista y sociable.' } },
  { sign1: 'libra', sign2: 'capricorn', overall: 52, love: 50, friendship: 55, work: 58, advice: generateGenericAdvice('libra', 'capricorn') },
  { sign1: 'libra', sign2: 'aquarius', overall: 93, love: 90, friendship: 95, work: 92, advice: detailedAdvice['libra-aquarius'] },
  { sign1: 'libra', sign2: 'pisces', overall: 55, love: 58, friendship: 52, work: 50, advice: generateGenericAdvice('libra', 'pisces') },

  // Scorpio combinations
  { sign1: 'scorpio', sign2: 'aries', overall: 50, love: 55, friendship: 45, work: 48, advice: generateGenericAdvice('scorpio', 'aries') },
  { sign1: 'scorpio', sign2: 'taurus', overall: 78, love: 85, friendship: 72, work: 75, advice: detailedAdvice['taurus-scorpio'] },
  { sign1: 'scorpio', sign2: 'gemini', overall: 48, love: 52, friendship: 45, work: 48, advice: generateGenericAdvice('scorpio', 'gemini') },
  { sign1: 'scorpio', sign2: 'cancer', overall: 95, love: 98, friendship: 92, work: 90, advice: detailedAdvice['cancer-scorpio'] },
  { sign1: 'scorpio', sign2: 'leo', overall: 55, love: 60, friendship: 50, work: 52, advice: detailedAdvice['leo-scorpio'] },
  { sign1: 'scorpio', sign2: 'virgo', overall: 85, love: 82, friendship: 88, work: 85, advice: { ko: '깊이 있고 헌신적인 관계를 형성합니다.', en: 'Forms a deep and devoted relationship.', zh: '形成深厚而忠诚的关系。', ja: '深く献身的な関係を形成します。', es: 'Forma una relación profunda y devota.' } },
  { sign1: 'scorpio', sign2: 'libra', overall: 55, love: 58, friendship: 52, work: 55, advice: generateGenericAdvice('scorpio', 'libra') },
  { sign1: 'scorpio', sign2: 'scorpio', overall: 82, love: 85, friendship: 78, work: 80, advice: { ko: '두 전갈자리는 강렬하지만 질투와 비밀에 주의하세요.', en: 'Two Scorpios are intense but watch jealousy and secrets.', zh: '两个天蝎座很强烈，但要注意嫉妒和秘密。', ja: '二つの蠍座は激しいですが、嫉妬と秘密に注意してください。', es: 'Dos Escorpio son intensos pero cuidado con los celos y secretos.' } },
  { sign1: 'scorpio', sign2: 'sagittarius', overall: 55, love: 58, friendship: 52, work: 55, advice: generateGenericAdvice('scorpio', 'sagittarius') },
  { sign1: 'scorpio', sign2: 'capricorn', overall: 88, love: 85, friendship: 90, work: 92, advice: { ko: '야심차고 충성스러운 관계를 형성합니다.', en: 'Forms an ambitious and loyal relationship.', zh: '形成有抱负且忠诚的关系。', ja: '野心的で忠実な関係を形成します。', es: 'Forma una relación ambiciosa y leal.' } },
  { sign1: 'scorpio', sign2: 'aquarius', overall: 48, love: 52, friendship: 45, work: 48, advice: generateGenericAdvice('scorpio', 'aquarius') },
  { sign1: 'scorpio', sign2: 'pisces', overall: 95, love: 97, friendship: 93, work: 88, advice: detailedAdvice['scorpio-pisces'] },

  // Sagittarius combinations
  { sign1: 'sagittarius', sign2: 'aries', overall: 95, love: 93, friendship: 97, work: 90, advice: detailedAdvice['aries-sagittarius'] },
  { sign1: 'sagittarius', sign2: 'taurus', overall: 48, love: 45, friendship: 50, work: 48, advice: generateGenericAdvice('sagittarius', 'taurus') },
  { sign1: 'sagittarius', sign2: 'gemini', overall: 78, love: 80, friendship: 75, work: 72, advice: detailedAdvice['gemini-sagittarius'] },
  { sign1: 'sagittarius', sign2: 'cancer', overall: 48, love: 45, friendship: 50, work: 48, advice: generateGenericAdvice('sagittarius', 'cancer') },
  { sign1: 'sagittarius', sign2: 'leo', overall: 95, love: 92, friendship: 97, work: 93, advice: detailedAdvice['leo-sagittarius'] },
  { sign1: 'sagittarius', sign2: 'virgo', overall: 50, love: 48, friendship: 52, work: 50, advice: generateGenericAdvice('sagittarius', 'virgo') },
  { sign1: 'sagittarius', sign2: 'libra', overall: 85, love: 82, friendship: 88, work: 82, advice: { ko: '낙관적이고 사교적인 조합입니다.', en: 'An optimistic and sociable combination.', zh: '乐观而善于社交的组合。', ja: '楽観的で社交的な組み合わせです。', es: 'Una combinación optimista y sociable.' } },
  { sign1: 'sagittarius', sign2: 'scorpio', overall: 55, love: 58, friendship: 52, work: 55, advice: generateGenericAdvice('sagittarius', 'scorpio') },
  { sign1: 'sagittarius', sign2: 'sagittarius', overall: 85, love: 82, friendship: 88, work: 82, advice: { ko: '두 사수자리는 모험을 사랑하지만 안정을 잊지 마세요.', en: 'Two Sagittarians love adventure but don\'t forget stability.', zh: '两个射手座热爱冒险，但别忘了稳定。', ja: '二つの射手座は冒険を愛しますが、安定を忘れないでください。', es: 'Dos Sagitario aman la aventura pero no olviden la estabilidad.' } },
  { sign1: 'sagittarius', sign2: 'capricorn', overall: 55, love: 52, friendship: 58, work: 60, advice: generateGenericAdvice('sagittarius', 'capricorn') },
  { sign1: 'sagittarius', sign2: 'aquarius', overall: 90, love: 88, friendship: 92, work: 88, advice: { ko: '자유롭고 진보적인 완벽한 조합입니다.', en: 'A perfect free and progressive combination.', zh: '自由而进步的完美组合。', ja: '自由で進歩的な完璧な組み合わせです。', es: 'Una combinación perfecta libre y progresista.' } },
  { sign1: 'sagittarius', sign2: 'pisces', overall: 55, love: 58, friendship: 52, work: 50, advice: generateGenericAdvice('sagittarius', 'pisces') },

  // Capricorn combinations
  { sign1: 'capricorn', sign2: 'aries', overall: 48, love: 45, friendship: 50, work: 55, advice: generateGenericAdvice('capricorn', 'aries') },
  { sign1: 'capricorn', sign2: 'taurus', overall: 95, love: 92, friendship: 95, work: 98, advice: detailedAdvice['taurus-capricorn'] },
  { sign1: 'capricorn', sign2: 'gemini', overall: 50, love: 48, friendship: 52, work: 55, advice: generateGenericAdvice('capricorn', 'gemini') },
  { sign1: 'capricorn', sign2: 'cancer', overall: 78, love: 82, friendship: 75, work: 80, advice: detailedAdvice['cancer-capricorn'] },
  { sign1: 'capricorn', sign2: 'leo', overall: 52, love: 50, friendship: 55, work: 58, advice: generateGenericAdvice('capricorn', 'leo') },
  { sign1: 'capricorn', sign2: 'virgo', overall: 95, love: 92, friendship: 95, work: 98, advice: detailedAdvice['virgo-capricorn'] },
  { sign1: 'capricorn', sign2: 'libra', overall: 52, love: 50, friendship: 55, work: 58, advice: generateGenericAdvice('capricorn', 'libra') },
  { sign1: 'capricorn', sign2: 'scorpio', overall: 88, love: 85, friendship: 90, work: 92, advice: { ko: '야심차고 충성스러운 관계를 형성합니다.', en: 'Forms an ambitious and loyal relationship.', zh: '形成有抱负且忠诚的关系。', ja: '野心的で忠実な関係を形成します。', es: 'Forma una relación ambiciosa y leal.' } },
  { sign1: 'capricorn', sign2: 'sagittarius', overall: 55, love: 52, friendship: 58, work: 60, advice: generateGenericAdvice('capricorn', 'sagittarius') },
  { sign1: 'capricorn', sign2: 'capricorn', overall: 85, love: 82, friendship: 88, work: 92, advice: { ko: '두 염소자리는 야심적이지만 여유를 즐기는 것도 필요합니다.', en: 'Two Capricorns are ambitious but need to enjoy leisure too.', zh: '两个摩羯座很有抱负，但也需要享受休闲。', ja: '二つの山羊座は野心的ですが、余暇を楽しむことも必要です。', es: 'Dos Capricornio son ambiciosos pero necesitan disfrutar del ocio también.' } },
  { sign1: 'capricorn', sign2: 'aquarius', overall: 52, love: 50, friendship: 55, work: 58, advice: generateGenericAdvice('capricorn', 'aquarius') },
  { sign1: 'capricorn', sign2: 'pisces', overall: 82, love: 85, friendship: 78, work: 80, advice: { ko: '현실과 꿈이 만나 균형 잡힌 관계를 형성합니다.', en: 'Reality and dreams meet to form a balanced relationship.', zh: '现实与梦想相遇，形成平衡的关系。', ja: '現実と夢が出会い、バランスの取れた関係を形成します。', es: 'Realidad y sueños se encuentran para formar una relación equilibrada.' } },

  // Aquarius combinations
  { sign1: 'aquarius', sign2: 'aries', overall: 85, love: 82, friendship: 88, work: 85, advice: { ko: '혁신적인 물병자리와 열정적인 양자리가 함께 새로운 것을 창조합니다.', en: 'Innovative Aquarius and passionate Aries create new things together.', zh: '创新的水瓶座与热情的白羊座一起创造新事物。', ja: '革新的な水瓶座と情熱的な牡羊座が一緒に新しいものを創造します。', es: 'Acuario innovador y Aries apasionado crean cosas nuevas juntos.' } },
  { sign1: 'aquarius', sign2: 'taurus', overall: 45, love: 42, friendship: 48, work: 45, advice: generateGenericAdvice('aquarius', 'taurus') },
  { sign1: 'aquarius', sign2: 'gemini', overall: 95, love: 92, friendship: 97, work: 95, advice: detailedAdvice['gemini-aquarius'] },
  { sign1: 'aquarius', sign2: 'cancer', overall: 45, love: 42, friendship: 48, work: 45, advice: generateGenericAdvice('aquarius', 'cancer') },
  { sign1: 'aquarius', sign2: 'leo', overall: 75, love: 78, friendship: 72, work: 70, advice: detailedAdvice['leo-aquarius'] },
  { sign1: 'aquarius', sign2: 'virgo', overall: 48, love: 45, friendship: 52, work: 50, advice: generateGenericAdvice('aquarius', 'virgo') },
  { sign1: 'aquarius', sign2: 'libra', overall: 93, love: 90, friendship: 95, work: 92, advice: detailedAdvice['libra-aquarius'] },
  { sign1: 'aquarius', sign2: 'scorpio', overall: 48, love: 52, friendship: 45, work: 48, advice: generateGenericAdvice('aquarius', 'scorpio') },
  { sign1: 'aquarius', sign2: 'sagittarius', overall: 90, love: 88, friendship: 92, work: 88, advice: { ko: '자유롭고 진보적인 완벽한 조합입니다.', en: 'A perfect free and progressive combination.', zh: '自由而进步的完美组合。', ja: '自由で進歩的な完璧な組み合わせです。', es: 'Una combinación perfecta libre y progresista.' } },
  { sign1: 'aquarius', sign2: 'capricorn', overall: 52, love: 50, friendship: 55, work: 58, advice: generateGenericAdvice('aquarius', 'capricorn') },
  { sign1: 'aquarius', sign2: 'aquarius', overall: 78, love: 75, friendship: 82, work: 78, advice: { ko: '두 물병자리는 독창적이지만 감정 표현을 잊지 마세요.', en: 'Two Aquarians are original but don\'t forget emotional expression.', zh: '两个水瓶座很独特，但别忘了情感表达。', ja: '二つの水瓶座は独創的ですが、感情表現を忘れないでください。', es: 'Dos Acuario son originales pero no olviden la expresión emocional.' } },
  { sign1: 'aquarius', sign2: 'pisces', overall: 55, love: 58, friendship: 52, work: 50, advice: generateGenericAdvice('aquarius', 'pisces') },

  // Pisces combinations
  { sign1: 'pisces', sign2: 'aries', overall: 52, love: 55, friendship: 48, work: 50, advice: generateGenericAdvice('pisces', 'aries') },
  { sign1: 'pisces', sign2: 'taurus', overall: 85, love: 88, friendship: 82, work: 80, advice: { ko: '낭만적이고 안정적인 조합입니다.', en: 'A romantic and stable combination.', zh: '浪漫而稳定的组合。', ja: 'ロマンチックで安定した組み合わせです。', es: 'Una combinación romántica y estable.' } },
  { sign1: 'pisces', sign2: 'gemini', overall: 52, love: 55, friendship: 48, work: 50, advice: generateGenericAdvice('pisces', 'gemini') },
  { sign1: 'pisces', sign2: 'cancer', overall: 95, love: 97, friendship: 93, work: 88, advice: detailedAdvice['cancer-pisces'] },
  { sign1: 'pisces', sign2: 'leo', overall: 55, love: 58, friendship: 52, work: 50, advice: generateGenericAdvice('pisces', 'leo') },
  { sign1: 'pisces', sign2: 'virgo', overall: 75, love: 78, friendship: 72, work: 70, advice: detailedAdvice['virgo-pisces'] },
  { sign1: 'pisces', sign2: 'libra', overall: 55, love: 58, friendship: 52, work: 50, advice: generateGenericAdvice('pisces', 'libra') },
  { sign1: 'pisces', sign2: 'scorpio', overall: 95, love: 97, friendship: 93, work: 88, advice: detailedAdvice['scorpio-pisces'] },
  { sign1: 'pisces', sign2: 'sagittarius', overall: 55, love: 58, friendship: 52, work: 50, advice: generateGenericAdvice('pisces', 'sagittarius') },
  { sign1: 'pisces', sign2: 'capricorn', overall: 82, love: 85, friendship: 78, work: 80, advice: { ko: '현실과 꿈이 만나 균형 잡힌 관계를 형성합니다.', en: 'Reality and dreams meet to form a balanced relationship.', zh: '现实与梦想相遇，形成平衡的关系。', ja: '現実と夢が出会い、バランスの取れた関係を形成します。', es: 'Realidad y sueños se encuentran para formar una relación equilibrada.' } },
  { sign1: 'pisces', sign2: 'aquarius', overall: 55, love: 58, friendship: 52, work: 50, advice: generateGenericAdvice('pisces', 'aquarius') },
  { sign1: 'pisces', sign2: 'pisces', overall: 82, love: 85, friendship: 80, work: 75, advice: { ko: '두 물고기자리는 깊이 공감하지만 현실적인 균형이 필요합니다.', en: 'Two Pisces deeply empathize but need a realistic balance.', zh: '两个双鱼座深刻共情，但需要现实的平衡。', ja: '二つの魚座は深く共感しますが、現実的なバランスが必要です。', es: 'Dos Piscis empatizan profundamente pero necesitan un equilibrio realista.' } },
];

/**
 * 특정 두 별자리의 궁합 데이터를 찾습니다.
 */
export function getCompatibilityData(sign1: ZodiacSignId, sign2: ZodiacSignId): CompatibilityData | undefined {
  return compatibilityMatrix.find(
    (data) =>
      (data.sign1 === sign1 && data.sign2 === sign2) ||
      (data.sign1 === sign2 && data.sign2 === sign1)
  );
}

/**
 * 특정 별자리의 모든 궁합 데이터를 반환합니다.
 */
export function getCompatibilityForSign(sign: ZodiacSignId): CompatibilityData[] {
  return compatibilityMatrix.filter(
    (data) => data.sign1 === sign || data.sign2 === sign
  );
}

/**
 * 궁합 점수 등급을 반환합니다.
 */
export function getCompatibilityGrade(score: number): 'excellent' | 'good' | 'average' | 'challenging' | 'difficult' {
  if (score >= 85) return 'excellent';
  if (score >= 70) return 'good';
  if (score >= 55) return 'average';
  if (score >= 40) return 'challenging';
  return 'difficult';
}

/**
 * 궁합 등급에 따른 레이블을 반환합니다.
 */
export function getGradeLabel(grade: ReturnType<typeof getCompatibilityGrade>, locale: string): string {
  const labels: Record<ReturnType<typeof getCompatibilityGrade>, Record<string, string>> = {
    excellent: { ko: '최고', en: 'Excellent', zh: '极佳', ja: '最高', es: 'Excelente' },
    good: { ko: '좋음', en: 'Good', zh: '良好', ja: '良い', es: 'Bueno' },
    average: { ko: '보통', en: 'Average', zh: '一般', ja: '普通', es: 'Regular' },
    challenging: { ko: '도전적', en: 'Challenging', zh: '挑战', ja: '挑戦的', es: 'Desafiante' },
    difficult: { ko: '어려움', en: 'Difficult', zh: '困难', ja: '困難', es: 'Difícil' },
  };

  return labels[grade][locale] || labels[grade]['en'];
}
