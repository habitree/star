import { ZodiacSign } from '@/types/zodiac';

export const zodiacSigns: ZodiacSign[] = [
  // 1. Aries (양자리) - Fire, Cardinal - 3/21-4/19
  {
    id: 'aries',
    names: {
      ko: '양자리',
      en: 'Aries',
      zh: '白羊座',
      ja: '牡羊座',
      es: 'Aries',
    },
    symbol: '♈',
    element: 'fire',
    modality: 'cardinal',
    rulingPlanet: {
      ko: '화성',
      en: 'Mars',
      zh: '火星',
      ja: '火星',
      es: 'Marte',
    },
    dateRange: {
      start: '03-21',
      end: '04-19',
    },
    traits: {
      positive: [
        {
          ko: '용감함',
          en: 'Courageous',
          zh: '勇敢',
          ja: '勇敢',
          es: 'Valiente',
        },
        {
          ko: '열정적',
          en: 'Passionate',
          zh: '热情',
          ja: '情熱的',
          es: 'Apasionado',
        },
        {
          ko: '리더십',
          en: 'Leadership',
          zh: '领导力',
          ja: 'リーダーシップ',
          es: 'Liderazgo',
        },
      ],
      negative: [
        {
          ko: '충동적',
          en: 'Impulsive',
          zh: '冲动',
          ja: '衝動的',
          es: 'Impulsivo',
        },
        {
          ko: '성급함',
          en: 'Impatient',
          zh: '急躁',
          ja: 'せっかち',
          es: 'Impaciente',
        },
        {
          ko: '공격적',
          en: 'Aggressive',
          zh: '好斗',
          ja: '攻撃的',
          es: 'Agresivo',
        },
      ],
    },
    compatibility: {
      best: ['leo', 'sagittarius', 'gemini'],
      worst: ['cancer', 'capricorn'],
    },
  },

  // 2. Taurus (황소자리) - Earth, Fixed - 4/20-5/20
  {
    id: 'taurus',
    names: {
      ko: '황소자리',
      en: 'Taurus',
      zh: '金牛座',
      ja: '牡牛座',
      es: 'Tauro',
    },
    symbol: '♉',
    element: 'earth',
    modality: 'fixed',
    rulingPlanet: {
      ko: '금성',
      en: 'Venus',
      zh: '金星',
      ja: '金星',
      es: 'Venus',
    },
    dateRange: {
      start: '04-20',
      end: '05-20',
    },
    traits: {
      positive: [
        {
          ko: '신뢰할 수 있음',
          en: 'Reliable',
          zh: '可靠',
          ja: '信頼できる',
          es: 'Confiable',
        },
        {
          ko: '인내심',
          en: 'Patient',
          zh: '耐心',
          ja: '忍耐強い',
          es: 'Paciente',
        },
        {
          ko: '헌신적',
          en: 'Devoted',
          zh: '忠诚',
          ja: '献身的',
          es: 'Devoto',
        },
      ],
      negative: [
        {
          ko: '고집스러움',
          en: 'Stubborn',
          zh: '固执',
          ja: '頑固',
          es: 'Terco',
        },
        {
          ko: '소유욕',
          en: 'Possessive',
          zh: '占有欲强',
          ja: '所有欲が強い',
          es: 'Posesivo',
        },
        {
          ko: '변화 거부',
          en: 'Uncompromising',
          zh: '不妥协',
          ja: '妥協しない',
          es: 'Inflexible',
        },
      ],
    },
    compatibility: {
      best: ['virgo', 'capricorn', 'cancer'],
      worst: ['leo', 'aquarius'],
    },
  },

  // 3. Gemini (쌍둥이자리) - Air, Mutable - 5/21-6/21
  {
    id: 'gemini',
    names: {
      ko: '쌍둥이자리',
      en: 'Gemini',
      zh: '双子座',
      ja: '双子座',
      es: 'Géminis',
    },
    symbol: '♊',
    element: 'air',
    modality: 'mutable',
    rulingPlanet: {
      ko: '수성',
      en: 'Mercury',
      zh: '水星',
      ja: '水星',
      es: 'Mercurio',
    },
    dateRange: {
      start: '05-21',
      end: '06-21',
    },
    traits: {
      positive: [
        {
          ko: '적응력',
          en: 'Adaptable',
          zh: '适应力强',
          ja: '適応力がある',
          es: 'Adaptable',
        },
        {
          ko: '호기심',
          en: 'Curious',
          zh: '好奇心强',
          ja: '好奇心旺盛',
          es: 'Curioso',
        },
        {
          ko: '재치있음',
          en: 'Witty',
          zh: '机智',
          ja: 'ウィットに富む',
          es: 'Ingenioso',
        },
      ],
      negative: [
        {
          ko: '변덕스러움',
          en: 'Inconsistent',
          zh: '善变',
          ja: '気まぐれ',
          es: 'Inconstante',
        },
        {
          ko: '우유부단',
          en: 'Indecisive',
          zh: '优柔寡断',
          ja: '優柔不断',
          es: 'Indeciso',
        },
        {
          ko: '피상적',
          en: 'Superficial',
          zh: '肤浅',
          ja: '表面的',
          es: 'Superficial',
        },
      ],
    },
    compatibility: {
      best: ['libra', 'aquarius', 'aries'],
      worst: ['virgo', 'pisces'],
    },
  },

  // 4. Cancer (게자리) - Water, Cardinal - 6/22-7/22
  {
    id: 'cancer',
    names: {
      ko: '게자리',
      en: 'Cancer',
      zh: '巨蟹座',
      ja: '蟹座',
      es: 'Cáncer',
    },
    symbol: '♋',
    element: 'water',
    modality: 'cardinal',
    rulingPlanet: {
      ko: '달',
      en: 'Moon',
      zh: '月亮',
      ja: '月',
      es: 'Luna',
    },
    dateRange: {
      start: '06-22',
      end: '07-22',
    },
    traits: {
      positive: [
        {
          ko: '보호본능',
          en: 'Protective',
          zh: '保护欲强',
          ja: '保護的',
          es: 'Protector',
        },
        {
          ko: '직관적',
          en: 'Intuitive',
          zh: '直觉敏锐',
          ja: '直感的',
          es: 'Intuitivo',
        },
        {
          ko: '가정적',
          en: 'Nurturing',
          zh: '有爱心',
          ja: '養育的',
          es: 'Protector',
        },
      ],
      negative: [
        {
          ko: '감정기복',
          en: 'Moody',
          zh: '情绪化',
          ja: '気分屋',
          es: 'Temperamental',
        },
        {
          ko: '의심많음',
          en: 'Suspicious',
          zh: '多疑',
          ja: '疑い深い',
          es: 'Desconfiado',
        },
        {
          ko: '집착',
          en: 'Clingy',
          zh: '依赖性强',
          ja: '執着的',
          es: 'Dependiente',
        },
      ],
    },
    compatibility: {
      best: ['scorpio', 'pisces', 'taurus'],
      worst: ['aries', 'libra'],
    },
  },

  // 5. Leo (사자자리) - Fire, Fixed - 7/23-8/22
  {
    id: 'leo',
    names: {
      ko: '사자자리',
      en: 'Leo',
      zh: '狮子座',
      ja: '獅子座',
      es: 'Leo',
    },
    symbol: '♌',
    element: 'fire',
    modality: 'fixed',
    rulingPlanet: {
      ko: '태양',
      en: 'Sun',
      zh: '太阳',
      ja: '太陽',
      es: 'Sol',
    },
    dateRange: {
      start: '07-23',
      end: '08-22',
    },
    traits: {
      positive: [
        {
          ko: '자신감',
          en: 'Confident',
          zh: '自信',
          ja: '自信がある',
          es: 'Seguro',
        },
        {
          ko: '관대함',
          en: 'Generous',
          zh: '慷慨',
          ja: '寛大',
          es: 'Generoso',
        },
        {
          ko: '카리스마',
          en: 'Charismatic',
          zh: '有魅力',
          ja: 'カリスマ的',
          es: 'Carismático',
        },
      ],
      negative: [
        {
          ko: '자기중심적',
          en: 'Self-centered',
          zh: '以自我为中心',
          ja: '自己中心的',
          es: 'Egocéntrico',
        },
        {
          ko: '오만함',
          en: 'Arrogant',
          zh: '傲慢',
          ja: '傲慢',
          es: 'Arrogante',
        },
        {
          ko: '허영심',
          en: 'Vain',
          zh: '虚荣',
          ja: '虚栄心が強い',
          es: 'Vanidoso',
        },
      ],
    },
    compatibility: {
      best: ['aries', 'sagittarius', 'libra'],
      worst: ['taurus', 'scorpio'],
    },
  },

  // 6. Virgo (처녀자리) - Earth, Mutable - 8/23-9/22
  {
    id: 'virgo',
    names: {
      ko: '처녀자리',
      en: 'Virgo',
      zh: '处女座',
      ja: '乙女座',
      es: 'Virgo',
    },
    symbol: '♍',
    element: 'earth',
    modality: 'mutable',
    rulingPlanet: {
      ko: '수성',
      en: 'Mercury',
      zh: '水星',
      ja: '水星',
      es: 'Mercurio',
    },
    dateRange: {
      start: '08-23',
      end: '09-22',
    },
    traits: {
      positive: [
        {
          ko: '분석적',
          en: 'Analytical',
          zh: '善于分析',
          ja: '分析的',
          es: 'Analítico',
        },
        {
          ko: '꼼꼼함',
          en: 'Meticulous',
          zh: '一丝不苟',
          ja: '几帳面',
          es: 'Meticuloso',
        },
        {
          ko: '실용적',
          en: 'Practical',
          zh: '务实',
          ja: '実用的',
          es: 'Práctico',
        },
      ],
      negative: [
        {
          ko: '비판적',
          en: 'Critical',
          zh: '挑剔',
          ja: '批判的',
          es: 'Crítico',
        },
        {
          ko: '걱정많음',
          en: 'Worrier',
          zh: '忧虑',
          ja: '心配性',
          es: 'Preocupado',
        },
        {
          ko: '완벽주의',
          en: 'Perfectionist',
          zh: '完美主义',
          ja: '完璧主義',
          es: 'Perfeccionista',
        },
      ],
    },
    compatibility: {
      best: ['taurus', 'capricorn', 'cancer'],
      worst: ['gemini', 'sagittarius'],
    },
  },

  // 7. Libra (천칭자리) - Air, Cardinal - 9/23-10/22
  {
    id: 'libra',
    names: {
      ko: '천칭자리',
      en: 'Libra',
      zh: '天秤座',
      ja: '天秤座',
      es: 'Libra',
    },
    symbol: '♎',
    element: 'air',
    modality: 'cardinal',
    rulingPlanet: {
      ko: '금성',
      en: 'Venus',
      zh: '金星',
      ja: '金星',
      es: 'Venus',
    },
    dateRange: {
      start: '09-23',
      end: '10-22',
    },
    traits: {
      positive: [
        {
          ko: '공정함',
          en: 'Fair-minded',
          zh: '公正',
          ja: '公正',
          es: 'Justo',
        },
        {
          ko: '외교적',
          en: 'Diplomatic',
          zh: '善于外交',
          ja: '外交的',
          es: 'Diplomático',
        },
        {
          ko: '조화로움',
          en: 'Harmonious',
          zh: '和谐',
          ja: '調和的',
          es: 'Armonioso',
        },
      ],
      negative: [
        {
          ko: '우유부단',
          en: 'Indecisive',
          zh: '优柔寡断',
          ja: '優柔不断',
          es: 'Indeciso',
        },
        {
          ko: '갈등회피',
          en: 'Avoids confrontation',
          zh: '回避冲突',
          ja: '対立を避ける',
          es: 'Evita conflictos',
        },
        {
          ko: '자기연민',
          en: 'Self-pitying',
          zh: '自怜',
          ja: '自己憐憫',
          es: 'Autocompasivo',
        },
      ],
    },
    compatibility: {
      best: ['gemini', 'aquarius', 'leo'],
      worst: ['cancer', 'capricorn'],
    },
  },

  // 8. Scorpio (전갈자리) - Water, Fixed - 10/23-11/21
  {
    id: 'scorpio',
    names: {
      ko: '전갈자리',
      en: 'Scorpio',
      zh: '天蝎座',
      ja: '蠍座',
      es: 'Escorpio',
    },
    symbol: '♏',
    element: 'water',
    modality: 'fixed',
    rulingPlanet: {
      ko: '명왕성',
      en: 'Pluto',
      zh: '冥王星',
      ja: '冥王星',
      es: 'Plutón',
    },
    dateRange: {
      start: '10-23',
      end: '11-21',
    },
    traits: {
      positive: [
        {
          ko: '열정적',
          en: 'Passionate',
          zh: '热情',
          ja: '情熱的',
          es: 'Apasionado',
        },
        {
          ko: '통찰력',
          en: 'Resourceful',
          zh: '洞察力强',
          ja: '洞察力がある',
          es: 'Perspicaz',
        },
        {
          ko: '충성심',
          en: 'Loyal',
          zh: '忠诚',
          ja: '忠実',
          es: 'Leal',
        },
      ],
      negative: [
        {
          ko: '질투심',
          en: 'Jealous',
          zh: '嫉妒',
          ja: '嫉妬深い',
          es: 'Celoso',
        },
        {
          ko: '비밀스러움',
          en: 'Secretive',
          zh: '神秘',
          ja: '秘密主義',
          es: 'Reservado',
        },
        {
          ko: '복수심',
          en: 'Vengeful',
          zh: '报复心强',
          ja: '復讐心がある',
          es: 'Vengativo',
        },
      ],
    },
    compatibility: {
      best: ['cancer', 'pisces', 'virgo'],
      worst: ['leo', 'aquarius'],
    },
  },

  // 9. Sagittarius (사수자리) - Fire, Mutable - 11/22-12/21
  {
    id: 'sagittarius',
    names: {
      ko: '사수자리',
      en: 'Sagittarius',
      zh: '射手座',
      ja: '射手座',
      es: 'Sagitario',
    },
    symbol: '♐',
    element: 'fire',
    modality: 'mutable',
    rulingPlanet: {
      ko: '목성',
      en: 'Jupiter',
      zh: '木星',
      ja: '木星',
      es: 'Júpiter',
    },
    dateRange: {
      start: '11-22',
      end: '12-21',
    },
    traits: {
      positive: [
        {
          ko: '낙관적',
          en: 'Optimistic',
          zh: '乐观',
          ja: '楽観的',
          es: 'Optimista',
        },
        {
          ko: '모험심',
          en: 'Adventurous',
          zh: '爱冒险',
          ja: '冒険心がある',
          es: 'Aventurero',
        },
        {
          ko: '정직함',
          en: 'Honest',
          zh: '诚实',
          ja: '正直',
          es: 'Honesto',
        },
      ],
      negative: [
        {
          ko: '무책임',
          en: 'Irresponsible',
          zh: '不负责任',
          ja: '無責任',
          es: 'Irresponsable',
        },
        {
          ko: '과장함',
          en: 'Exaggerating',
          zh: '夸张',
          ja: '誇張する',
          es: 'Exagerado',
        },
        {
          ko: '참을성 없음',
          en: 'Restless',
          zh: '浮躁',
          ja: '落ち着きがない',
          es: 'Inquieto',
        },
      ],
    },
    compatibility: {
      best: ['aries', 'leo', 'aquarius'],
      worst: ['virgo', 'pisces'],
    },
  },

  // 10. Capricorn (염소자리) - Earth, Cardinal - 12/22-1/19
  {
    id: 'capricorn',
    names: {
      ko: '염소자리',
      en: 'Capricorn',
      zh: '摩羯座',
      ja: '山羊座',
      es: 'Capricornio',
    },
    symbol: '♑',
    element: 'earth',
    modality: 'cardinal',
    rulingPlanet: {
      ko: '토성',
      en: 'Saturn',
      zh: '土星',
      ja: '土星',
      es: 'Saturno',
    },
    dateRange: {
      start: '12-22',
      end: '01-19',
    },
    traits: {
      positive: [
        {
          ko: '야망',
          en: 'Ambitious',
          zh: '有野心',
          ja: '野心的',
          es: 'Ambicioso',
        },
        {
          ko: '훈련됨',
          en: 'Disciplined',
          zh: '自律',
          ja: '規律正しい',
          es: 'Disciplinado',
        },
        {
          ko: '책임감',
          en: 'Responsible',
          zh: '负责任',
          ja: '責任感がある',
          es: 'Responsable',
        },
      ],
      negative: [
        {
          ko: '비관적',
          en: 'Pessimistic',
          zh: '悲观',
          ja: '悲観的',
          es: 'Pesimista',
        },
        {
          ko: '융통성 없음',
          en: 'Rigid',
          zh: '固执',
          ja: '融通が利かない',
          es: 'Rígido',
        },
        {
          ko: '냉담함',
          en: 'Cold',
          zh: '冷漠',
          ja: '冷淡',
          es: 'Frío',
        },
      ],
    },
    compatibility: {
      best: ['taurus', 'virgo', 'scorpio'],
      worst: ['aries', 'libra'],
    },
  },

  // 11. Aquarius (물병자리) - Air, Fixed - 1/20-2/18
  {
    id: 'aquarius',
    names: {
      ko: '물병자리',
      en: 'Aquarius',
      zh: '水瓶座',
      ja: '水瓶座',
      es: 'Acuario',
    },
    symbol: '♒',
    element: 'air',
    modality: 'fixed',
    rulingPlanet: {
      ko: '천왕성',
      en: 'Uranus',
      zh: '天王星',
      ja: '天王星',
      es: 'Urano',
    },
    dateRange: {
      start: '01-20',
      end: '02-18',
    },
    traits: {
      positive: [
        {
          ko: '독창적',
          en: 'Original',
          zh: '独创',
          ja: '独創的',
          es: 'Original',
        },
        {
          ko: '진보적',
          en: 'Progressive',
          zh: '进步',
          ja: '進歩的',
          es: 'Progresista',
        },
        {
          ko: '인도주의적',
          en: 'Humanitarian',
          zh: '人道主义',
          ja: '人道主義的',
          es: 'Humanitario',
        },
      ],
      negative: [
        {
          ko: '감정 표현 부족',
          en: 'Emotionally detached',
          zh: '情感疏离',
          ja: '感情的に距離がある',
          es: 'Emocionalmente distante',
        },
        {
          ko: '고집스러움',
          en: 'Stubborn',
          zh: '固执',
          ja: '頑固',
          es: 'Terco',
        },
        {
          ko: '반항적',
          en: 'Rebellious',
          zh: '叛逆',
          ja: '反抗的',
          es: 'Rebelde',
        },
      ],
    },
    compatibility: {
      best: ['gemini', 'libra', 'sagittarius'],
      worst: ['taurus', 'scorpio'],
    },
  },

  // 12. Pisces (물고기자리) - Water, Mutable - 2/19-3/20
  {
    id: 'pisces',
    names: {
      ko: '물고기자리',
      en: 'Pisces',
      zh: '双鱼座',
      ja: '魚座',
      es: 'Piscis',
    },
    symbol: '♓',
    element: 'water',
    modality: 'mutable',
    rulingPlanet: {
      ko: '해왕성',
      en: 'Neptune',
      zh: '海王星',
      ja: '海王星',
      es: 'Neptuno',
    },
    dateRange: {
      start: '02-19',
      end: '03-20',
    },
    traits: {
      positive: [
        {
          ko: '공감능력',
          en: 'Empathetic',
          zh: '有同理心',
          ja: '共感力がある',
          es: 'Empático',
        },
        {
          ko: '창의적',
          en: 'Creative',
          zh: '有创意',
          ja: '創造的',
          es: 'Creativo',
        },
        {
          ko: '직관적',
          en: 'Intuitive',
          zh: '直觉敏锐',
          ja: '直感的',
          es: 'Intuitivo',
        },
      ],
      negative: [
        {
          ko: '현실도피',
          en: 'Escapist',
          zh: '逃避现实',
          ja: '現実逃避的',
          es: 'Escapista',
        },
        {
          ko: '우유부단',
          en: 'Indecisive',
          zh: '优柔寡断',
          ja: '優柔不断',
          es: 'Indeciso',
        },
        {
          ko: '쉽게 영향받음',
          en: 'Easily influenced',
          zh: '容易受影响',
          ja: '影響されやすい',
          es: 'Fácilmente influenciable',
        },
      ],
    },
    compatibility: {
      best: ['cancer', 'scorpio', 'taurus'],
      worst: ['gemini', 'sagittarius'],
    },
  },
];
