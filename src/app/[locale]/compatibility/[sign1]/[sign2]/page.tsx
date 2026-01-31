import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { locales, type Locale } from '@/i18n/config';

export const runtime = 'edge';
import { zodiacSigns } from '@/data/zodiac-signs';
import { getCompatibilityData, getCompatibilityGrade, getGradeLabel } from '@/data/compatibility-data';
import { getZodiacElement, getZodiacModality, isValidZodiacSign } from '@/lib/zodiac-utils';
import CompatibilityResult from '@/components/compatibility/CompatibilityResult';
import type { ZodiacSignId, CompatibilityResult as CompatibilityResultType, LocalizedText } from '@/types';

interface Props {
  params: Promise<{ locale: Locale; sign1: string; sign2: string }>;
}

// 유효한 별자리 ID 배열
const validSigns: ZodiacSignId[] = [
  'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
  'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces',
];

// 정적 경로 생성 (모든 로케일 x 모든 별자리 조합)
export function generateStaticParams() {
  const params: { locale: Locale; sign1: ZodiacSignId; sign2: ZodiacSignId }[] = [];

  for (const locale of locales) {
    for (const sign1 of validSigns) {
      for (const sign2 of validSigns) {
        params.push({ locale, sign1, sign2 });
      }
    }
  }

  return params;
}

// 동적 메타데이터 생성
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, sign1, sign2 } = await params;

  // 유효성 검사
  if (!isValidZodiacSign(sign1) || !isValidZodiacSign(sign2)) {
    return {
      title: 'Not Found',
    };
  }

  const sign1Data = zodiacSigns.find((s) => s.id === sign1);
  const sign2Data = zodiacSigns.find((s) => s.id === sign2);

  if (!sign1Data || !sign2Data) {
    return {
      title: 'Not Found',
    };
  }

  const sign1Name = sign1Data.names[locale as keyof typeof sign1Data.names] || sign1Data.names.en;
  const sign2Name = sign2Data.names[locale as keyof typeof sign2Data.names] || sign2Data.names.en;

  const compatibilityData = getCompatibilityData(sign1 as ZodiacSignId, sign2 as ZodiacSignId);
  const score = compatibilityData?.overall || 0;
  const grade = getCompatibilityGrade(score);
  const gradeLabel = getGradeLabel(grade, locale);

  const titles: Record<Locale, string> = {
    ko: `${sign1Name}와 ${sign2Name} 궁합 - ${score}% (${gradeLabel})`,
    en: `${sign1Name} and ${sign2Name} Compatibility - ${score}% (${gradeLabel})`,
    zh: `${sign1Name}与${sign2Name}配对 - ${score}% (${gradeLabel})`,
    ja: `${sign1Name}と${sign2Name}の相性 - ${score}% (${gradeLabel})`,
    es: `Compatibilidad ${sign1Name} y ${sign2Name} - ${score}% (${gradeLabel})`,
  };

  const descriptions: Record<Locale, string> = {
    ko: `${sign1Name}와 ${sign2Name}의 연애, 우정, 업무 궁합을 확인하세요. 종합 궁합 ${score}%로 ${gradeLabel} 수준입니다.`,
    en: `Check the love, friendship, and work compatibility between ${sign1Name} and ${sign2Name}. Overall compatibility ${score}% rated ${gradeLabel}.`,
    zh: `查看${sign1Name}和${sign2Name}的爱情、友情和工作配对。综合配对${score}%，评级为${gradeLabel}。`,
    ja: `${sign1Name}と${sign2Name}の恋愛、友情、仕事の相性をチェック。総合相性${score}%で${gradeLabel}レベルです。`,
    es: `Verifica la compatibilidad amorosa, de amistad y laboral entre ${sign1Name} y ${sign2Name}. Compatibilidad general ${score}% calificada como ${gradeLabel}.`,
  };

  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    openGraph: {
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
    },
  };
}

// 원소 궁합 설명 생성
function getElementDescription(element1: string, element2: string): LocalizedText {
  const descriptions: Record<string, LocalizedText> = {
    'fire-fire': {
      ko: '불의 원소가 만나 열정이 배가됩니다.',
      en: 'Fire elements meet, doubling the passion.',
      zh: '火元素相遇，激情加倍。',
      ja: '火の元素が出会い、情熱が倍増します。',
      es: 'Los elementos de fuego se encuentran, duplicando la pasion.',
    },
    'earth-earth': {
      ko: '흙의 원소가 만나 안정적인 기반을 만듭니다.',
      en: 'Earth elements meet, creating a stable foundation.',
      zh: '土元素相遇，创造稳定的基础。',
      ja: '土の元素が出会い、安定した基盤を作ります。',
      es: 'Los elementos de tierra se encuentran, creando una base estable.',
    },
    'air-air': {
      ko: '공기의 원소가 만나 지적인 교류가 활발합니다.',
      en: 'Air elements meet, creating lively intellectual exchange.',
      zh: '风元素相遇，智慧交流活跃。',
      ja: '風の元素が出会い、知的な交流が活発になります。',
      es: 'Los elementos de aire se encuentran, creando un intercambio intelectual animado.',
    },
    'water-water': {
      ko: '물의 원소가 만나 깊은 감정적 유대를 형성합니다.',
      en: 'Water elements meet, forming deep emotional bonds.',
      zh: '水元素相遇，形成深厚的情感纽带。',
      ja: '水の元素が出会い、深い感情的な絆を形成します。',
      es: 'Los elementos de agua se encuentran, formando lazos emocionales profundos.',
    },
    'fire-air': {
      ko: '불과 공기가 만나 서로에게 활력을 불어넣습니다.',
      en: 'Fire and air meet, energizing each other.',
      zh: '火与风相遇，互相注入活力。',
      ja: '火と風が出会い、お互いに活力を与えます。',
      es: 'Fuego y aire se encuentran, energizandose mutuamente.',
    },
    'earth-water': {
      ko: '흙과 물이 만나 풍요로운 관계를 만듭니다.',
      en: 'Earth and water meet, creating a fruitful relationship.',
      zh: '土与水相遇，创造丰富的关系。',
      ja: '土と水が出会い、実りある関係を作ります。',
      es: 'Tierra y agua se encuentran, creando una relacion fructifera.',
    },
    'fire-water': {
      ko: '불과 물이 만나 도전적이지만 균형을 찾을 수 있습니다.',
      en: 'Fire and water meet, challenging but can find balance.',
      zh: '火与水相遇，有挑战但可以找到平衡。',
      ja: '火と水が出会い、挑戦的ですがバランスを見つけられます。',
      es: 'Fuego y agua se encuentran, desafiante pero pueden encontrar equilibrio.',
    },
    'earth-air': {
      ko: '흙과 공기가 만나 서로 다른 관점을 배웁니다.',
      en: 'Earth and air meet, learning different perspectives.',
      zh: '土与风相遇，学习不同的观点。',
      ja: '土と風が出会い、異なる視点を学びます。',
      es: 'Tierra y aire se encuentran, aprendiendo diferentes perspectivas.',
    },
    'fire-earth': {
      ko: '불과 흙이 만나 인내심이 필요합니다.',
      en: 'Fire and earth meet, requiring patience.',
      zh: '火与土相遇，需要耐心。',
      ja: '火と土が出会い、忍耐が必要です。',
      es: 'Fuego y tierra se encuentran, requiriendo paciencia.',
    },
    'air-water': {
      ko: '공기와 물이 만나 이해하려는 노력이 필요합니다.',
      en: 'Air and water meet, requiring effort to understand.',
      zh: '风与水相遇，需要努力理解。',
      ja: '風と水が出会い、理解しようとする努力が必要です。',
      es: 'Aire y agua se encuentran, requiriendo esfuerzo para entender.',
    },
  };

  const key1 = `${element1}-${element2}`;
  const key2 = `${element2}-${element1}`;

  return descriptions[key1] || descriptions[key2] || {
    ko: '두 원소가 만나 특별한 관계를 형성합니다.',
    en: 'Two elements meet to form a special relationship.',
    zh: '两种元素相遇，形成特殊的关系。',
    ja: '二つの元素が出会い、特別な関係を形成します。',
    es: 'Dos elementos se encuentran para formar una relacion especial.',
  };
}

// 모달리티 궁합 설명 생성
function getModalityDescription(modality1: string, modality2: string): LocalizedText {
  if (modality1 === modality2) {
    const sameModalityDesc: Record<string, LocalizedText> = {
      cardinal: {
        ko: '두 카디널 사인이 만나 리더십을 공유해야 합니다.',
        en: 'Two cardinal signs meet, needing to share leadership.',
        zh: '两个开创星座相遇，需要分享领导权。',
        ja: '二つのカーディナルサインが出会い、リーダーシップを共有する必要があります。',
        es: 'Dos signos cardinales se encuentran, necesitando compartir liderazgo.',
      },
      fixed: {
        ko: '두 고정 사인이 만나 타협이 필요합니다.',
        en: 'Two fixed signs meet, requiring compromise.',
        zh: '两个固定星座相遇，需要妥协。',
        ja: '二つの固定サインが出会い、妥協が必要です。',
        es: 'Dos signos fijos se encuentran, requiriendo compromiso.',
      },
      mutable: {
        ko: '두 변화 사인이 만나 유연하지만 방향 설정이 필요합니다.',
        en: 'Two mutable signs meet, flexible but need direction.',
        zh: '两个变动星座相遇，灵活但需要方向。',
        ja: '二つのミュータブルサインが出会い、柔軟ですが方向設定が必要です。',
        es: 'Dos signos mutables se encuentran, flexibles pero necesitan direccion.',
      },
    };
    return sameModalityDesc[modality1] || sameModalityDesc['mutable'];
  }

  return {
    ko: '다른 모달리티가 만나 서로를 보완합니다.',
    en: 'Different modalities meet, complementing each other.',
    zh: '不同模式相遇，互相补充。',
    ja: '異なるモダリティが出会い、お互いを補完します。',
    es: 'Diferentes modalidades se encuentran, complementandose.',
  };
}

export default async function CompatibilityResultPage({ params }: Props) {
  const { locale, sign1, sign2 } = await params;
  setRequestLocale(locale);

  // 유효성 검사
  if (!isValidZodiacSign(sign1) || !isValidZodiacSign(sign2)) {
    notFound();
  }

  // 궁합 데이터 가져오기
  const compatibilityData = getCompatibilityData(sign1 as ZodiacSignId, sign2 as ZodiacSignId);

  if (!compatibilityData) {
    notFound();
  }

  // 별자리 정보 가져오기
  const sign1Info = zodiacSigns.find((s) => s.id === sign1);
  const sign2Info = zodiacSigns.find((s) => s.id === sign2);

  if (!sign1Info || !sign2Info) {
    notFound();
  }

  // 원소와 모달리티 정보
  const element1 = getZodiacElement(sign1 as ZodiacSignId);
  const element2 = getZodiacElement(sign2 as ZodiacSignId);
  const modality1 = getZodiacModality(sign1 as ZodiacSignId);
  const modality2 = getZodiacModality(sign2 as ZodiacSignId);

  // 원소 궁합 점수 계산
  const elementScores: Record<string, number> = {
    'fire-fire': 85, 'earth-earth': 80, 'air-air': 75, 'water-water': 80,
    'fire-air': 90, 'air-fire': 90, 'earth-water': 85, 'water-earth': 85,
    'fire-water': 45, 'water-fire': 45, 'earth-air': 55, 'air-earth': 55,
    'fire-earth': 50, 'earth-fire': 50, 'air-water': 60, 'water-air': 60,
  };

  const elementKey = `${element1}-${element2}`;
  const elementScore = elementScores[elementKey] || 70;

  // 모달리티 궁합 점수
  const modalityScore = modality1 === modality2 ? 65 : 80;

  // 카테고리별 상세 정보 생성
  const createCategoryCompatibility = (score: number, category: string) => ({
    score,
    description: {
      ko: `${category} 분야에서 ${score}점의 궁합을 보입니다.`,
      en: `Shows ${score}% compatibility in ${category}.`,
      zh: `在${category}方面显示${score}%的相性。`,
      ja: `${category}分野で${score}%の相性を示しています。`,
      es: `Muestra ${score}% de compatibilidad en ${category}.`,
    },
    strengths: [],
    challenges: [],
  });

  // 결과 객체 생성
  const result: CompatibilityResultType = {
    id: `${sign1}-${sign2}`,
    sign1: sign1 as ZodiacSignId,
    sign2: sign2 as ZodiacSignId,
    overallScore: compatibilityData.overall,
    categories: {
      love: createCategoryCompatibility(compatibilityData.love, 'love'),
      friendship: createCategoryCompatibility(compatibilityData.friendship, 'friendship'),
      work: createCategoryCompatibility(compatibilityData.work, 'work'),
    },
    advice: compatibilityData.advice,
    elementCompatibility: {
      element1,
      element2,
      score: elementScore,
      description: getElementDescription(element1, element2),
    },
    modalityCompatibility: {
      modality1,
      modality2,
      score: modalityScore,
      description: getModalityDescription(modality1, modality2),
    },
    createdAt: new Date().toISOString(),
  };

  const sign1Name = sign1Info.names[locale as keyof typeof sign1Info.names] || sign1Info.names.en;
  const sign2Name = sign2Info.names[locale as keyof typeof sign2Info.names] || sign2Info.names.en;

  const pageTitle: Record<Locale, string> = {
    ko: `${sign1Name} & ${sign2Name} 궁합`,
    en: `${sign1Name} & ${sign2Name} Compatibility`,
    zh: `${sign1Name} & ${sign2Name} 配对`,
    ja: `${sign1Name} & ${sign2Name} 相性`,
    es: `Compatibilidad ${sign1Name} & ${sign2Name}`,
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* 페이지 헤더 */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {pageTitle[locale] || pageTitle.en}
          </h1>
        </div>

        {/* 궁합 결과 */}
        <CompatibilityResult result={result} locale={locale} />
      </div>
    </div>
  );
}
