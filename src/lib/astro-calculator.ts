/**
 * 출생 차트 천문학적 계산 유틸리티
 * MVP 버전: 간소화된 공식 사용
 */

import type { ZodiacSignId, BirthChartInput, BirthChartResult, LocalizedText } from '@/types';
import { ZODIAC_ORDER } from './zodiac-utils';

/**
 * 날짜로 태양 별자리 계산 (정확)
 */
export function calculateSunSign(date: Date): ZodiacSignId {
  const month = date.getMonth() + 1;
  const day = date.getDate();

  // 별자리 날짜 범위
  const zodiacDates: { sign: ZodiacSignId; startMonth: number; startDay: number; endMonth: number; endDay: number }[] = [
    { sign: 'capricorn', startMonth: 12, startDay: 22, endMonth: 1, endDay: 19 },
    { sign: 'aquarius', startMonth: 1, startDay: 20, endMonth: 2, endDay: 18 },
    { sign: 'pisces', startMonth: 2, startDay: 19, endMonth: 3, endDay: 20 },
    { sign: 'aries', startMonth: 3, startDay: 21, endMonth: 4, endDay: 19 },
    { sign: 'taurus', startMonth: 4, startDay: 20, endMonth: 5, endDay: 20 },
    { sign: 'gemini', startMonth: 5, startDay: 21, endMonth: 6, endDay: 20 },
    { sign: 'cancer', startMonth: 6, startDay: 21, endMonth: 7, endDay: 22 },
    { sign: 'leo', startMonth: 7, startDay: 23, endMonth: 8, endDay: 22 },
    { sign: 'virgo', startMonth: 8, startDay: 23, endMonth: 9, endDay: 22 },
    { sign: 'libra', startMonth: 9, startDay: 23, endMonth: 10, endDay: 22 },
    { sign: 'scorpio', startMonth: 10, startDay: 23, endMonth: 11, endDay: 21 },
    { sign: 'sagittarius', startMonth: 11, startDay: 22, endMonth: 12, endDay: 21 },
  ];

  for (const { sign, startMonth, startDay, endMonth, endDay } of zodiacDates) {
    // 염소자리 특수 처리 (12월-1월 걸침)
    if (sign === 'capricorn') {
      if ((month === 12 && day >= startDay) || (month === 1 && day <= endDay)) {
        return sign;
      }
    } else {
      if ((month === startMonth && day >= startDay) || (month === endMonth && day <= endDay)) {
        return sign;
      }
    }
  }

  return 'aries'; // 기본값
}

/**
 * 달 별자리 계산 (간소화 버전)
 * 달은 약 27.3일에 황도대를 한 바퀴 돌므로, 각 별자리에 약 2.3일 머뭄
 * 시간도 고려하여 더 정확하게 계산
 */
export function calculateMoonSign(date: Date, hour: number = 12): ZodiacSignId {
  // 기준일: 2000년 1월 1일 0시 (달이 양자리에 있었던 대략적인 시점)
  const referenceDate = new Date(2000, 0, 1, 0, 0, 0);

  // 기준일로부터의 경과 시간 (시간 단위)
  const totalHours = (date.getTime() - referenceDate.getTime()) / (1000 * 60 * 60) + hour;

  // 달의 공전 주기: 약 27.3일 = 655.2시간
  const moonCycleDays = 27.3;
  const hoursPerSign = (moonCycleDays * 24) / 12; // 각 별자리에 머무는 시간: ~54.6시간

  // 현재 달이 위치한 별자리 인덱스 계산
  const moonPosition = (totalHours / hoursPerSign) % 12;
  const signIndex = Math.floor(moonPosition);

  return ZODIAC_ORDER[signIndex];
}

/**
 * 상승궁(어센던트) 계산 (간소화 버전)
 * 상승궁은 출생 시각과 위도에 따라 결정됨
 * 하루에 황도대를 한 바퀴 돌므로 2시간마다 별자리가 바뀜
 */
export function calculateRisingSign(date: Date, hour: number, latitude: number): ZodiacSignId {
  // 태양 별자리를 기준으로 시작점 설정
  const sunSign = calculateSunSign(date);
  const sunSignIndex = ZODIAC_ORDER.indexOf(sunSign);

  // 시간에 따른 오프셋 (2시간마다 1 별자리 이동)
  // 일출 시각 (대략 6시)을 기준으로 상승궁은 태양 별자리와 같음
  const hourOffset = Math.floor((hour - 6 + 24) % 24 / 2);

  // 위도 보정 (고위도에서는 별자리 이동 속도가 불균일하지만 간소화를 위해 선형으로 계산)
  const latitudeCorrection = Math.round((latitude / 90) * 0.5);

  // 최종 상승궁 인덱스
  const risingIndex = (sunSignIndex + hourOffset + latitudeCorrection + 12) % 12;

  return ZODIAC_ORDER[risingIndex];
}

/**
 * Big Three 해석 텍스트 생성
 */
function generateInterpretation(
  sunSign: ZodiacSignId,
  moonSign: ZodiacSignId,
  risingSign: ZodiacSignId
): {
  summary: LocalizedText;
  sunSignMeaning: LocalizedText;
  moonSignMeaning: LocalizedText;
  risingSignMeaning: LocalizedText;
} {
  const signNames: Record<ZodiacSignId, { ko: string; en: string; zh: string; ja: string; es: string }> = {
    aries: { ko: '양자리', en: 'Aries', zh: '白羊座', ja: '牡羊座', es: 'Aries' },
    taurus: { ko: '황소자리', en: 'Taurus', zh: '金牛座', ja: '牡牛座', es: 'Tauro' },
    gemini: { ko: '쌍둥이자리', en: 'Gemini', zh: '双子座', ja: '双子座', es: 'Geminis' },
    cancer: { ko: '게자리', en: 'Cancer', zh: '巨蟹座', ja: '蟹座', es: 'Cancer' },
    leo: { ko: '사자자리', en: 'Leo', zh: '狮子座', ja: '獅子座', es: 'Leo' },
    virgo: { ko: '처녀자리', en: 'Virgo', zh: '处女座', ja: '乙女座', es: 'Virgo' },
    libra: { ko: '천칭자리', en: 'Libra', zh: '天秤座', ja: '天秤座', es: 'Libra' },
    scorpio: { ko: '전갈자리', en: 'Scorpio', zh: '天蝎座', ja: '蠍座', es: 'Escorpio' },
    sagittarius: { ko: '사수자리', en: 'Sagittarius', zh: '射手座', ja: '射手座', es: 'Sagitario' },
    capricorn: { ko: '염소자리', en: 'Capricorn', zh: '摩羯座', ja: '山羊座', es: 'Capricornio' },
    aquarius: { ko: '물병자리', en: 'Aquarius', zh: '水瓶座', ja: '水瓶座', es: 'Acuario' },
    pisces: { ko: '물고기자리', en: 'Pisces', zh: '双鱼座', ja: '魚座', es: 'Piscis' },
  };

  const sunMeanings: Record<ZodiacSignId, LocalizedText> = {
    aries: {
      ko: '당신의 핵심 자아는 열정적이고 개척자적인 에너지를 가지고 있습니다. 도전을 두려워하지 않고 앞으로 나아가는 성향이 있습니다.',
      en: 'Your core self possesses passionate, pioneering energy. You tend to move forward without fear of challenges.',
      zh: '你的核心自我拥有充满激情的开拓者能量。你倾向于无惧挑战地前进。',
      ja: 'あなたの核心は情熱的で開拓者的なエネルギーを持っています。挑戦を恐れずに前進する傾向があります。',
      es: 'Tu yo esencial posee una energia apasionada y pionera. Tiendes a avanzar sin miedo a los desafios.',
    },
    taurus: {
      ko: '당신의 핵심 자아는 안정적이고 인내심 있는 에너지를 가지고 있습니다. 신뢰할 수 있고 실용적인 접근 방식을 선호합니다.',
      en: 'Your core self has stable and patient energy. You prefer reliable and practical approaches.',
      zh: '你的核心自我拥有稳定和耐心的能量。你喜欢可靠和实用的方法。',
      ja: 'あなたの核心は安定した忍耐強いエネルギーを持っています。信頼できる実用的なアプローチを好みます。',
      es: 'Tu yo esencial tiene una energia estable y paciente. Prefieres enfoques confiables y practicos.',
    },
    gemini: {
      ko: '당신의 핵심 자아는 호기심 많고 다재다능한 에너지를 가지고 있습니다. 소통과 학습을 통해 성장합니다.',
      en: 'Your core self has curious and versatile energy. You grow through communication and learning.',
      zh: '你的核心自我拥有好奇和多才多艺的能量。你通过沟通和学习成长。',
      ja: 'あなたの核心は好奇心旺盛で多才なエネルギーを持っています。コミュニケーションと学習を通じて成長します。',
      es: 'Tu yo esencial tiene energia curiosa y versatil. Creces a traves de la comunicacion y el aprendizaje.',
    },
    cancer: {
      ko: '당신의 핵심 자아는 보호적이고 감정적으로 깊은 에너지를 가지고 있습니다. 가족과 안전을 중요시합니다.',
      en: 'Your core self has protective and emotionally deep energy. You value family and security.',
      zh: '你的核心自我拥有保护性和情感深度的能量。你重视家庭和安全。',
      ja: 'あなたの核心は保護的で感情的に深いエネルギーを持っています。家族と安全を大切にします。',
      es: 'Tu yo esencial tiene energia protectora y emocionalmente profunda. Valoras la familia y la seguridad.',
    },
    leo: {
      ko: '당신의 핵심 자아는 창조적이고 자신감 있는 에너지를 가지고 있습니다. 주목받고 빛나는 것을 즐깁니다.',
      en: 'Your core self has creative and confident energy. You enjoy being noticed and shining.',
      zh: '你的核心自我拥有创造性和自信的能量。你喜欢被关注和发光。',
      ja: 'あなたの核心は創造的で自信に満ちたエネルギーを持っています。注目を浴び輝くことを楽しみます。',
      es: 'Tu yo esencial tiene energia creativa y segura. Disfrutas ser notado y brillar.',
    },
    virgo: {
      ko: '당신의 핵심 자아는 분석적이고 세심한 에너지를 가지고 있습니다. 완벽함을 추구하고 도움을 주는 것을 좋아합니다.',
      en: 'Your core self has analytical and meticulous energy. You pursue perfection and enjoy helping others.',
      zh: '你的核心自我拥有分析性和细致的能量。你追求完美并喜欢帮助他人。',
      ja: 'あなたの核心は分析的で細心なエネルギーを持っています。完璧を追求し、人を助けることを好みます。',
      es: 'Tu yo esencial tiene energia analitica y meticulosa. Buscas la perfeccion y disfrutas ayudar a otros.',
    },
    libra: {
      ko: '당신의 핵심 자아는 조화롭고 외교적인 에너지를 가지고 있습니다. 균형과 아름다움을 추구합니다.',
      en: 'Your core self has harmonious and diplomatic energy. You seek balance and beauty.',
      zh: '你的核心自我拥有和谐和外交的能量。你追求平衡和美丽。',
      ja: 'あなたの核心は調和的で外交的なエネルギーを持っています。バランスと美を追求します。',
      es: 'Tu yo esencial tiene energia armoniosa y diplomatica. Buscas el equilibrio y la belleza.',
    },
    scorpio: {
      ko: '당신의 핵심 자아는 강렬하고 변형적인 에너지를 가지고 있습니다. 깊은 진실과 의미를 추구합니다.',
      en: 'Your core self has intense and transformative energy. You seek deep truth and meaning.',
      zh: '你的核心自我拥有强烈和变革的能量。你追求深刻的真理和意义。',
      ja: 'あなたの核心は強烈で変容的なエネルギーを持っています。深い真実と意味を追求します。',
      es: 'Tu yo esencial tiene energia intensa y transformadora. Buscas la verdad profunda y el significado.',
    },
    sagittarius: {
      ko: '당신의 핵심 자아는 모험적이고 철학적인 에너지를 가지고 있습니다. 자유와 지식의 확장을 추구합니다.',
      en: 'Your core self has adventurous and philosophical energy. You seek freedom and expansion of knowledge.',
      zh: '你的核心自我拥有冒险和哲学的能量。你追求自由和知识的扩展。',
      ja: 'あなたの核心は冒険的で哲学的なエネルギーを持っています。自由と知識の拡大を追求します。',
      es: 'Tu yo esencial tiene energia aventurera y filosofica. Buscas la libertad y la expansion del conocimiento.',
    },
    capricorn: {
      ko: '당신의 핵심 자아는 야심차고 훈련된 에너지를 가지고 있습니다. 목표 달성과 성취를 중요시합니다.',
      en: 'Your core self has ambitious and disciplined energy. You value goal achievement and accomplishment.',
      zh: '你的核心自我拥有雄心和纪律的能量。你重视目标达成和成就。',
      ja: 'あなたの核心は野心的で規律正しいエネルギーを持っています。目標達成と成果を重視します。',
      es: 'Tu yo esencial tiene energia ambiciosa y disciplinada. Valoras el logro de metas y los logros.',
    },
    aquarius: {
      ko: '당신의 핵심 자아는 혁신적이고 인도주의적인 에너지를 가지고 있습니다. 독창성과 진보를 추구합니다.',
      en: 'Your core self has innovative and humanitarian energy. You seek originality and progress.',
      zh: '你的核心自我拥有创新和人道主义的能量。你追求独创性和进步。',
      ja: 'あなたの核心は革新的で人道主義的なエネルギーを持っています。独創性と進歩を追求します。',
      es: 'Tu yo esencial tiene energia innovadora y humanitaria. Buscas la originalidad y el progreso.',
    },
    pisces: {
      ko: '당신의 핵심 자아는 직관적이고 공감적인 에너지를 가지고 있습니다. 영적인 연결과 창의성을 추구합니다.',
      en: 'Your core self has intuitive and empathetic energy. You seek spiritual connection and creativity.',
      zh: '你的核心自我拥有直觉和共情的能量。你追求精神连接和创造力。',
      ja: 'あなたの核心は直感的で共感的なエネルギーを持っています。精神的なつながりと創造性を追求します。',
      es: 'Tu yo esencial tiene energia intuitiva y empatica. Buscas la conexion espiritual y la creatividad.',
    },
  };

  const moonMeanings: Record<ZodiacSignId, LocalizedText> = {
    aries: {
      ko: '감정적으로 즉각적이고 열정적입니다. 느낌을 바로 표현하는 편입니다.',
      en: 'Emotionally immediate and passionate. You tend to express feelings right away.',
      zh: '情感上直接而热情。你倾向于立即表达感受。',
      ja: '感情的に即座で情熱的です。すぐに感情を表現する傾向があります。',
      es: 'Emocionalmente inmediato y apasionado. Tiendes a expresar sentimientos de inmediato.',
    },
    taurus: {
      ko: '감정적으로 안정적이고 충실합니다. 편안함과 안정을 추구합니다.',
      en: 'Emotionally stable and loyal. You seek comfort and stability.',
      zh: '情感上稳定和忠诚。你追求舒适和稳定。',
      ja: '感情的に安定していて忠実です。快適さと安定を求めます。',
      es: 'Emocionalmente estable y leal. Buscas comodidad y estabilidad.',
    },
    gemini: {
      ko: '감정적으로 호기심이 많고 변화무쌍합니다. 대화를 통해 감정을 처리합니다.',
      en: 'Emotionally curious and changeable. You process emotions through conversation.',
      zh: '情感上好奇且多变。你通过对话处理情绪。',
      ja: '感情的に好奇心旺盛で変わりやすいです。会話を通じて感情を処理します。',
      es: 'Emocionalmente curioso y cambiante. Procesas emociones a traves de la conversacion.',
    },
    cancer: {
      ko: '감정적으로 깊고 보호적입니다. 안전하고 친밀한 환경을 필요로 합니다.',
      en: 'Emotionally deep and protective. You need a safe and intimate environment.',
      zh: '情感上深刻且保护性强。你需要安全和亲密的环境。',
      ja: '感情的に深く保護的です。安全で親密な環境を必要とします。',
      es: 'Emocionalmente profundo y protector. Necesitas un ambiente seguro e intimo.',
    },
    leo: {
      ko: '감정적으로 따뜻하고 관대합니다. 인정과 애정을 주고받는 것을 좋아합니다.',
      en: 'Emotionally warm and generous. You enjoy giving and receiving recognition and affection.',
      zh: '情感上温暖和慷慨。你喜欢给予和接受认可和爱情。',
      ja: '感情的に温かく寛大です。認められ、愛情を与え受けることを楽しみます。',
      es: 'Emocionalmente calido y generoso. Disfrutas dar y recibir reconocimiento y afecto.',
    },
    virgo: {
      ko: '감정적으로 분석적이고 실용적입니다. 도움을 주면서 안정감을 느낍니다.',
      en: 'Emotionally analytical and practical. You feel secure when helping others.',
      zh: '情感上分析性和实用。你在帮助他人时感到安全。',
      ja: '感情的に分析的で実用的です。人を助けることで安心感を得ます。',
      es: 'Emocionalmente analitico y practico. Te sientes seguro cuando ayudas a otros.',
    },
    libra: {
      ko: '감정적으로 조화를 추구합니다. 관계에서 균형과 공정함을 중요시합니다.',
      en: 'Emotionally seeks harmony. You value balance and fairness in relationships.',
      zh: '情感上追求和谐。你在关系中重视平衡和公平。',
      ja: '感情的に調和を求めます。関係においてバランスと公正さを重視します。',
      es: 'Emocionalmente busca la armonia. Valoras el equilibrio y la justicia en las relaciones.',
    },
    scorpio: {
      ko: '감정적으로 강렬하고 깊습니다. 진정한 감정적 연결을 갈망합니다.',
      en: 'Emotionally intense and deep. You crave genuine emotional connections.',
      zh: '情感上强烈而深刻。你渴望真正的情感连接。',
      ja: '感情的に強烈で深いです。真の感情的なつながりを渇望します。',
      es: 'Emocionalmente intenso y profundo. Anhelas conexiones emocionales genuinas.',
    },
    sagittarius: {
      ko: '감정적으로 낙관적이고 자유롭습니다. 새로운 경험을 통해 감정적으로 성장합니다.',
      en: 'Emotionally optimistic and free. You grow emotionally through new experiences.',
      zh: '情感上乐观和自由。你通过新体验在情感上成长。',
      ja: '感情的に楽観的で自由です。新しい経験を通じて感情的に成長します。',
      es: 'Emocionalmente optimista y libre. Creces emocionalmente a traves de nuevas experiencias.',
    },
    capricorn: {
      ko: '감정적으로 신중하고 책임감 있습니다. 감정을 통제하려는 경향이 있습니다.',
      en: 'Emotionally cautious and responsible. You tend to control your emotions.',
      zh: '情感上谨慎和负责任。你倾向于控制你的情绪。',
      ja: '感情的に慎重で責任感があります。感情をコントロールしようとする傾向があります。',
      es: 'Emocionalmente cauteloso y responsable. Tiendes a controlar tus emociones.',
    },
    aquarius: {
      ko: '감정적으로 독립적이고 객관적입니다. 감정에서 한 발 물러서 관찰합니다.',
      en: 'Emotionally independent and objective. You step back to observe your emotions.',
      zh: '情感上独立和客观。你退后一步来观察你的情绪。',
      ja: '感情的に独立していて客観的です。一歩引いて感情を観察します。',
      es: 'Emocionalmente independiente y objetivo. Te alejas para observar tus emociones.',
    },
    pisces: {
      ko: '감정적으로 민감하고 공감적입니다. 다른 사람의 감정을 쉽게 흡수합니다.',
      en: 'Emotionally sensitive and empathetic. You easily absorb others feelings.',
      zh: '情感上敏感和共情。你容易吸收他人的感受。',
      ja: '感情的に敏感で共感的です。他人の感情を容易に吸収します。',
      es: 'Emocionalmente sensible y empatico. Absorbes facilmente los sentimientos de otros.',
    },
  };

  const risingMeanings: Record<ZodiacSignId, LocalizedText> = {
    aries: {
      ko: '당신은 자신감 있고 활력 넘치는 첫인상을 줍니다. 직접적이고 솔직한 태도로 다가갑니다.',
      en: 'You give a confident and energetic first impression. You approach with a direct and honest attitude.',
      zh: '你给人自信和充满活力的第一印象。你以直接和诚实的态度接近。',
      ja: '自信に満ちた活力ある第一印象を与えます。直接的で正直な態度で接します。',
      es: 'Das una primera impresion segura y energetica. Te acercas con una actitud directa y honesta.',
    },
    taurus: {
      ko: '당신은 차분하고 신뢰할 수 있는 첫인상을 줍니다. 안정감 있고 현실적인 태도를 보입니다.',
      en: 'You give a calm and reliable first impression. You show a stable and realistic attitude.',
      zh: '你给人平静和可靠的第一印象。你展现稳定和现实的态度。',
      ja: '落ち着いて信頼できる第一印象を与えます。安定していて現実的な態度を示します。',
      es: 'Das una primera impresion tranquila y confiable. Muestras una actitud estable y realista.',
    },
    gemini: {
      ko: '당신은 호기심 많고 재치 있는 첫인상을 줍니다. 대화를 통해 쉽게 친해집니다.',
      en: 'You give a curious and witty first impression. You easily connect through conversation.',
      zh: '你给人好奇和机智的第一印象。你通过对话容易建立联系。',
      ja: '好奇心旺盛でウィットに富んだ第一印象を与えます。会話を通じて簡単に親しくなります。',
      es: 'Das una primera impresion curiosa e ingeniosa. Te conectas facilmente a traves de la conversacion.',
    },
    cancer: {
      ko: '당신은 따뜻하고 보호적인 첫인상을 줍니다. 다른 사람의 감정에 민감하게 반응합니다.',
      en: 'You give a warm and protective first impression. You respond sensitively to others emotions.',
      zh: '你给人温暖和保护性的第一印象。你对他人的情绪反应敏感。',
      ja: '温かく保護的な第一印象を与えます。他人の感情に敏感に反応します。',
      es: 'Das una primera impresion calida y protectora. Respondes sensiblemente a las emociones de otros.',
    },
    leo: {
      ko: '당신은 당당하고 카리스마 있는 첫인상을 줍니다. 자연스럽게 주목을 받습니다.',
      en: 'You give a dignified and charismatic first impression. You naturally attract attention.',
      zh: '你给人有尊严和魅力的第一印象。你自然地吸引注意力。',
      ja: '堂々としてカリスマ的な第一印象を与えます。自然と注目を集めます。',
      es: 'Das una primera impresion digna y carismatica. Atraes atencion naturalmente.',
    },
    virgo: {
      ko: '당신은 세심하고 지적인 첫인상을 줍니다. 실용적이고 도움이 되는 태도를 보입니다.',
      en: 'You give a meticulous and intellectual first impression. You show a practical and helpful attitude.',
      zh: '你给人细心和知性的第一印象。你展现实用和乐于助人的态度。',
      ja: '細心で知的な第一印象を与えます。実用的で助けになる態度を示します。',
      es: 'Das una primera impresion meticulosa e intelectual. Muestras una actitud practica y servicial.',
    },
    libra: {
      ko: '당신은 우아하고 사교적인 첫인상을 줍니다. 조화롭고 매력적인 태도를 보입니다.',
      en: 'You give an elegant and sociable first impression. You show a harmonious and charming attitude.',
      zh: '你给人优雅和善于社交的第一印象。你展现和谐和迷人的态度。',
      ja: 'エレガントで社交的な第一印象を与えます。調和的で魅力的な態度を示します。',
      es: 'Das una primera impresion elegante y sociable. Muestras una actitud armoniosa y encantadora.',
    },
    scorpio: {
      ko: '당신은 신비롭고 강렬한 첫인상을 줍니다. 깊이 있고 통찰력 있는 태도를 보입니다.',
      en: 'You give a mysterious and intense first impression. You show a deep and insightful attitude.',
      zh: '你给人神秘和强烈的第一印象。你展现深刻和有洞察力的态度。',
      ja: '神秘的で強烈な第一印象を与えます。深く洞察力のある態度を示します。',
      es: 'Das una primera impresion misteriosa e intensa. Muestras una actitud profunda y perspicaz.',
    },
    sagittarius: {
      ko: '당신은 낙관적이고 모험적인 첫인상을 줍니다. 열린 마음과 유머가 있습니다.',
      en: 'You give an optimistic and adventurous first impression. You have an open mind and humor.',
      zh: '你给人乐观和冒险的第一印象。你有开放的心态和幽默感。',
      ja: '楽観的で冒険的な第一印象を与えます。開かれた心とユーモアがあります。',
      es: 'Das una primera impresion optimista y aventurera. Tienes una mente abierta y humor.',
    },
    capricorn: {
      ko: '당신은 진지하고 야심 있는 첫인상을 줍니다. 책임감 있고 성숙한 태도를 보입니다.',
      en: 'You give a serious and ambitious first impression. You show a responsible and mature attitude.',
      zh: '你给人严肃和有野心的第一印象。你展现负责任和成熟的态度。',
      ja: '真剣で野心的な第一印象を与えます。責任感があり成熟した態度を示します。',
      es: 'Das una primera impresion seria y ambiciosa. Muestras una actitud responsable y madura.',
    },
    aquarius: {
      ko: '당신은 독특하고 진보적인 첫인상을 줍니다. 독립적이고 친근한 태도를 보입니다.',
      en: 'You give a unique and progressive first impression. You show an independent and friendly attitude.',
      zh: '你给人独特和进步的第一印象。你展现独立和友好的态度。',
      ja: 'ユニークで進歩的な第一印象を与えます。独立していて親しみやすい態度を示します。',
      es: 'Das una primera impresion unica y progresista. Muestras una actitud independiente y amigable.',
    },
    pisces: {
      ko: '당신은 부드럽고 공감적인 첫인상을 줍니다. 예술적이고 직관적인 태도를 보입니다.',
      en: 'You give a gentle and empathetic first impression. You show an artistic and intuitive attitude.',
      zh: '你给人温柔和共情的第一印象。你展现艺术性和直觉的态度。',
      ja: '優しく共感的な第一印象を与えます。芸術的で直感的な態度を示します。',
      es: 'Das una primera impresion suave y empatica. Muestras una actitud artistica e intuitiva.',
    },
  };

  return {
    summary: {
      ko: `당신의 태양은 ${signNames[sunSign].ko}, 달은 ${signNames[moonSign].ko}, 상승궁은 ${signNames[risingSign].ko}입니다. 이 조합은 당신만의 독특한 에너지 패턴을 형성합니다.`,
      en: `Your Sun is in ${signNames[sunSign].en}, Moon in ${signNames[moonSign].en}, and Rising in ${signNames[risingSign].en}. This combination forms your unique energy pattern.`,
      zh: `你的太阳在${signNames[sunSign].zh}，月亮在${signNames[moonSign].zh}，上升在${signNames[risingSign].zh}。这个组合形成了你独特的能量模式。`,
      ja: `あなたの太陽は${signNames[sunSign].ja}、月は${signNames[moonSign].ja}、上昇は${signNames[risingSign].ja}です。この組み合わせがあなた独自のエネルギーパターンを形成します。`,
      es: `Tu Sol esta en ${signNames[sunSign].es}, Luna en ${signNames[moonSign].es}, y Ascendente en ${signNames[risingSign].es}. Esta combinacion forma tu patron de energia unico.`,
    },
    sunSignMeaning: sunMeanings[sunSign],
    moonSignMeaning: moonMeanings[moonSign],
    risingSignMeaning: risingMeanings[risingSign],
  };
}

/**
 * 전체 출생 차트 계산
 */
export function calculateBirthChart(input: BirthChartInput): BirthChartResult {
  const date = new Date(input.date);
  const [hours, minutes] = input.time.split(':').map(Number);
  const hour = hours + minutes / 60;

  const sunSign = calculateSunSign(date);
  const moonSign = calculateMoonSign(date, hour);
  const risingSign = calculateRisingSign(date, hour, input.latitude);

  const interpretation = generateInterpretation(sunSign, moonSign, risingSign);

  // 원소 분포 계산
  const elements = {
    fire: ['aries', 'leo', 'sagittarius'],
    earth: ['taurus', 'virgo', 'capricorn'],
    air: ['gemini', 'libra', 'aquarius'],
    water: ['cancer', 'scorpio', 'pisces'],
  };

  const elementCounts: Record<string, number> = { fire: 0, earth: 0, air: 0, water: 0 };
  for (const sign of [sunSign, moonSign, risingSign]) {
    for (const [element, signs] of Object.entries(elements)) {
      if (signs.includes(sign)) {
        elementCounts[element]++;
      }
    }
  }

  const dominantElement = Object.entries(elementCounts).reduce((a, b) =>
    a[1] > b[1] ? a : b
  )[0];

  // 모달리티 분포 계산
  const modalities = {
    cardinal: ['aries', 'cancer', 'libra', 'capricorn'],
    fixed: ['taurus', 'leo', 'scorpio', 'aquarius'],
    mutable: ['gemini', 'virgo', 'sagittarius', 'pisces'],
  };

  const modalityCounts: Record<string, number> = { cardinal: 0, fixed: 0, mutable: 0 };
  for (const sign of [sunSign, moonSign, risingSign]) {
    for (const [modality, signs] of Object.entries(modalities)) {
      if (signs.includes(sign)) {
        modalityCounts[modality]++;
      }
    }
  }

  const dominantModality = Object.entries(modalityCounts).reduce((a, b) =>
    a[1] > b[1] ? a : b
  )[0];

  return {
    id: `bc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    input,
    sunSign,
    moonSign,
    risingSign,
    planets: [], // MVP에서는 빈 배열
    houses: [], // MVP에서는 빈 배열
    aspects: [], // MVP에서는 빈 배열
    dominantElement,
    dominantModality,
    interpretation: {
      ...interpretation,
      planetaryInsights: [],
      lifeThemes: [],
    },
    createdAt: new Date().toISOString(),
  };
}
