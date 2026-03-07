/**
 * 시즌 이벤트 연동 업셀 데이터
 * 수성역행 / 보름달 / 일식 번들 5개 언어
 */

import type { SeasonalEventType } from '@/types/engagement';

export interface SeasonalUpsell {
  eventType: SeasonalEventType;
  title: Record<string, string>;
  description: Record<string, string>;
  cta: Record<string, string>;
  icon: string;
  affiliateTarget: 'moon-reading' | 'lifereader' | 'keen';
}

export const SEASONAL_UPSELLS: Partial<Record<SeasonalEventType, SeasonalUpsell>> = {
  mercury_retrograde: {
    eventType: 'mercury_retrograde',
    icon: '☿️',
    affiliateTarget: 'lifereader',
    title: {
      ko: '수성 역행 기간 특별 리딩',
      en: 'Mercury Retrograde Special Reading',
      zh: '水星逆行特别解读',
      ja: '水星逆行スペシャルリーディング',
      es: 'Lectura Especial de Mercurio Retrógrado',
    },
    description: {
      ko: '수성 역행 중 소통·계약·여행의 혼란을 예방하는 개인 리딩을 받아보세요.',
      en: 'Get a personal reading to navigate communication & travel chaos during retrograde.',
      zh: '获取个人解读，帮助您在逆行期间应对沟通、合同和旅行中的混乱。',
      ja: '逆行中のコミュニケーション・契約・旅行の混乱を防ぐ個人リーディングを受けましょう。',
      es: 'Obtén una lectura personal para navegar el caos de comunicación y viajes durante el retrógrado.',
    },
    cta: {
      ko: '혼란 예방 리딩 받기',
      en: 'Get Retrograde Guidance',
      zh: '获取逆行指导',
      ja: '逆行ガイダンスを受ける',
      es: 'Obtener Guía de Retrógrado',
    },
  },
  full_moon: {
    eventType: 'full_moon',
    icon: '🌕',
    affiliateTarget: 'keen',
    title: {
      ko: '보름달 문 리딩',
      en: 'Full Moon Reading',
      zh: '满月解读',
      ja: '満月リーディング',
      es: 'Lectura de Luna Llena',
    },
    description: {
      ko: '보름달의 강력한 에너지가 절정에 달한 지금, 달이 당신의 운명에 미치는 영향을 알아보세요.',
      en: "The full moon's energy is at its peak — discover how it shapes your destiny.",
      zh: '满月能量达到顶峰，了解它如何影响您的命运。',
      ja: '満月のエネルギーが最高潮の今、月があなたの運命に与える影響を確認しましょう。',
      es: 'La energía de la luna llena está en su punto máximo — descubre cómo moldea tu destino.',
    },
    cta: {
      ko: '보름달 리딩 받기',
      en: 'Get Full Moon Reading',
      zh: '获取满月解读',
      ja: '満月リーディングを受ける',
      es: 'Obtener Lectura de Luna Llena',
    },
  },
  new_moon: {
    eventType: 'new_moon',
    icon: '🌑',
    affiliateTarget: 'lifereader',
    title: {
      ko: '새달 새출발 리딩',
      en: 'New Moon Fresh Start Reading',
      zh: '新月新开始解读',
      ja: '新月スタートリーディング',
      es: 'Lectura de Nueva Luna y Nuevo Comienzo',
    },
    description: {
      ko: '그믐달은 새로운 시작의 에너지. 다음 달 목표를 별의 가이드와 함께 설정하세요.',
      en: 'New moon brings fresh energy. Set your next-month intentions with stellar guidance.',
      zh: '新月带来全新能量，在星辰指引下设定下个月的目标。',
      ja: '新月は新たな始まりのエネルギー。次の月の目標を星の導きで設定しましょう。',
      es: 'La luna nueva trae energía fresca. Establece tus intenciones con guía estelar.',
    },
    cta: {
      ko: '새달 목표 리딩',
      en: 'Get New Moon Guidance',
      zh: '获取新月指导',
      ja: '新月ガイダンスを受ける',
      es: 'Obtener Guía de Nueva Luna',
    },
  },
  valentine: {
    eventType: 'valentine',
    icon: '💕',
    affiliateTarget: 'keen',
    title: {
      ko: '발렌타인 궁합 리딩',
      en: "Valentine's Compatibility Reading",
      zh: '情人节配对解读',
      ja: 'バレンタイン相性リーディング',
      es: 'Lectura de Compatibilidad de San Valentín',
    },
    description: {
      ko: '발렌타인에 운명의 상대와의 궁합을 전문가에게 물어보세요.',
      en: "Ask an expert about your soulmate compatibility this Valentine's Day.",
      zh: '在情人节向专家询问您与命中注定之人的配对情况。',
      ja: 'バレンタインに運命の相手との相性を専門家に聞いてみましょう。',
      es: 'Pregunta a un experto sobre tu compatibilidad con tu alma gemela en San Valentín.',
    },
    cta: {
      ko: '궁합 전문가 상담',
      en: 'Consult Love Expert',
      zh: '咨询爱情专家',
      ja: '愛の専門家に相談',
      es: 'Consultar Experto en Amor',
    },
  },
};

export function getSeasonalUpsell(eventType: SeasonalEventType): SeasonalUpsell | null {
  return SEASONAL_UPSELLS[eventType] ?? null;
}
