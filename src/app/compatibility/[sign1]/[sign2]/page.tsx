import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import CompatibilityResult from '@/components/compatibility/CompatibilityResult';
import { getCompatibilityData } from '@/data/compatibility-data';
import { getZodiacElement, getZodiacModality, isValidZodiacSign } from '@/lib/zodiac-utils';
import { AdSenseUnit } from '@/components/ads';
import { isAdSenseEnabled } from '@/lib/adsense-config';
import type { ZodiacSignId, CompatibilityResult as CompatibilityResultType, LocalizedText } from '@/types';

const zodiacKoNames: Record<string, string> = {
  aries: '양자리', taurus: '황소자리', gemini: '쌍둥이자리', cancer: '게자리',
  leo: '사자자리', virgo: '처녀자리', libra: '천칭자리', scorpio: '전갈자리',
  sagittarius: '사수자리', capricorn: '염소자리', aquarius: '물병자리', pisces: '물고기자리',
};

const elementScores: Record<string, number> = {
  'fire-fire': 85, 'earth-earth': 80, 'air-air': 75, 'water-water': 80,
  'fire-air': 90, 'air-fire': 90, 'earth-water': 85, 'water-earth': 85,
  'fire-water': 45, 'water-fire': 45, 'earth-air': 55, 'air-earth': 55,
  'fire-earth': 50, 'earth-fire': 50, 'air-water': 60, 'water-air': 60,
};

function getElementDescription(e1: string, e2: string): LocalizedText {
  const map: Record<string, LocalizedText> = {
    'fire-fire':   { ko: '불의 원소가 만나 열정이 배가됩니다.', en: 'Fire elements meet, doubling the passion.', zh: '火元素相遇，激情加倍。', ja: '火の元素が出会い、情熱が倍増します。', es: 'Los elementos de fuego se encuentran, duplicando la pasión.' },
    'earth-earth': { ko: '흙의 원소가 만나 안정적인 기반을 만듭니다.', en: 'Earth elements meet, creating a stable foundation.', zh: '土元素相遇，创造稳定的基础。', ja: '土の元素が出会い、安定した基盤を作ります。', es: 'Los elementos de tierra se encuentran, creando una base estable.' },
    'air-air':     { ko: '공기의 원소가 만나 지적인 교류가 활발합니다.', en: 'Air elements meet, creating lively intellectual exchange.', zh: '风元素相遇，智慧交流活跃。', ja: '風の元素が出会い、知的な交流が活発になります。', es: 'Los elementos de aire se encuentran, creando un intercambio intelectual animado.' },
    'water-water': { ko: '물의 원소가 만나 깊은 감정적 유대를 형성합니다.', en: 'Water elements meet, forming deep emotional bonds.', zh: '水元素相遇，形成深厚的情感纽带。', ja: '水の元素が出会い、深い感情的な絆を形成します。', es: 'Los elementos de agua se encuentran, formando lazos emocionales profundos.' },
    'fire-air':    { ko: '불과 공기가 만나 서로에게 활력을 불어넣습니다.', en: 'Fire and air meet, energizing each other.', zh: '火与风相遇，互相注入活力。', ja: '火と風が出会い、お互いに活力を与えます。', es: 'Fuego y aire se encuentran, energizándose mutuamente.' },
    'earth-water': { ko: '흙과 물이 만나 풍요로운 관계를 만듭니다.', en: 'Earth and water meet, creating a fruitful relationship.', zh: '土与水相遇，创造丰富的关系。', ja: '土と水が出会い、実りある関係を作ります。', es: 'Tierra y agua se encuentran, creando una relación fructífera.' },
    'fire-water':  { ko: '불과 물이 만나 도전적이지만 균형을 찾을 수 있습니다.', en: 'Fire and water meet, challenging but can find balance.', zh: '火与水相遇，有挑战但可以找到平衡。', ja: '火と水が出会い、挑戦的ですがバランスを見つけられます。', es: 'Fuego y agua se encuentran, desafiante pero pueden encontrar equilibrio.' },
    'earth-air':   { ko: '흙과 공기가 만나 서로 다른 관점을 배웁니다.', en: 'Earth and air meet, learning different perspectives.', zh: '土与风相遇，学习不同的观点。', ja: '土と風が出会い、異なる視点を学びます。', es: 'Tierra y aire se encuentran, aprendiendo diferentes perspectivas.' },
    'fire-earth':  { ko: '불과 흙이 만나 인내심이 필요합니다.', en: 'Fire and earth meet, requiring patience.', zh: '火与土相遇，需要耐心。', ja: '火と土が出会い、忍耐が必要です。', es: 'Fuego y tierra se encuentran, requiriendo paciencia.' },
    'air-water':   { ko: '공기와 물이 만나 이해하려는 노력이 필요합니다.', en: 'Air and water meet, requiring effort to understand.', zh: '风与水相遇，需要努力理解。', ja: '風と水が出会い、理解しようとする努力が必要です。', es: 'Aire y agua se encuentran, requiriendo esfuerzo para entender.' },
  };
  return map[`${e1}-${e2}`] || map[`${e2}-${e1}`] || {
    ko: '두 원소가 만나 특별한 관계를 형성합니다.', en: 'Two elements meet to form a special relationship.',
    zh: '两种元素相遇，形成特殊的关系。', ja: '二つの元素が出会い、特別な関係を形成します。', es: 'Dos elementos se encuentran para formar una relación especial.',
  };
}

function getModalityDescription(m1: string, m2: string): LocalizedText {
  if (m1 === m2) {
    const same: Record<string, LocalizedText> = {
      cardinal: { ko: '두 시작형 별자리가 만나 리더십을 나눠야 합니다.', en: 'Two cardinal signs meet, needing to share leadership.', zh: '两个开创星座相遇，需要分享领导权。', ja: 'カーディナルサイン同士が出会い、リーダーシップを共有する必要があります。', es: 'Dos signos cardinales se encuentran, necesitando compartir liderazgo.' },
      fixed:    { ko: '두 고정형 별자리가 만나 서로 타협이 필요합니다.', en: 'Two fixed signs meet, requiring compromise.', zh: '两个固定星座相遇，需要妥协。', ja: '固定サイン同士が出会い、妥協が必要です。', es: 'Dos signos fijos se encuentran, requiriendo compromiso.' },
      mutable:  { ko: '두 변화형 별자리가 만나 방향 설정이 필요합니다.', en: 'Two mutable signs meet, flexible but need direction.', zh: '两个变动星座相遇，灵活但需要方向。', ja: 'ミュータブルサイン同士が出会い、方向設定が必要です。', es: 'Dos signos mutables se encuentran, flexibles pero necesitan dirección.' },
    };
    return same[m1] || same['mutable'];
  }
  return {
    ko: '서로 다른 유형의 별자리가 만나 상호 보완적인 관계를 만듭니다.',
    en: 'Different modalities meet, complementing each other.',
    zh: '不同模式相遇，互相补充。', ja: '異なるモダリティが出会い、お互いを補完します。', es: 'Diferentes modalidades se encuentran, complementándose.',
  };
}

function buildResult(sign1: ZodiacSignId, sign2: ZodiacSignId): CompatibilityResultType | null {
  const data = getCompatibilityData(sign1, sign2);
  if (!data) return null;

  const element1 = getZodiacElement(sign1);
  const element2 = getZodiacElement(sign2);
  const modality1 = getZodiacModality(sign1);
  const modality2 = getZodiacModality(sign2);
  const elementScore = elementScores[`${element1}-${element2}`] || 70;
  const modalityScore = modality1 === modality2 ? 65 : 80;

  const koLabels: Record<string, string> = { love: '연애', friendship: '우정', work: '업무' };
  const enLabels: Record<string, string> = { love: 'Love', friendship: 'Friendship', work: 'Work' };
  const zhLabels: Record<string, string> = { love: '爱情', friendship: '友情', work: '工作' };
  const jaLabels: Record<string, string> = { love: '恋愛', friendship: '友情', work: '仕事' };
  const esLabels: Record<string, string> = { love: 'amor', friendship: 'amistad', work: 'trabajo' };

  const createCategory = (score: number, cat: string) => ({
    score,
    description: {
      ko: `${koLabels[cat]} 궁합 ${score}점`,
      en: `${enLabels[cat]} compatibility ${score}%`,
      zh: `${zhLabels[cat]}相性 ${score}分`,
      ja: `${jaLabels[cat]}相性 ${score}点`,
      es: `Compatibilidad de ${esLabels[cat]} ${score}%`,
    },
    strengths: [] as LocalizedText[],
    challenges: [] as LocalizedText[],
  });

  return {
    id: `${sign1}-${sign2}`,
    sign1, sign2,
    overallScore: data.overall,
    categories: {
      love:       createCategory(data.love, 'love'),
      friendship: createCategory(data.friendship, 'friendship'),
      work:       createCategory(data.work, 'work'),
    },
    advice: data.advice,
    elementCompatibility:  { element1, element2, score: elementScore, description: getElementDescription(element1, element2) },
    modalityCompatibility: { modality1, modality2, score: modalityScore, description: getModalityDescription(modality1, modality2) },
    createdAt: new Date().toISOString(),
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ sign1: string; sign2: string }>;
}): Promise<Metadata> {
  const { sign1, sign2 } = await params;
  const name1 = zodiacKoNames[sign1] || sign1;
  const name2 = zodiacKoNames[sign2] || sign2;
  return {
    title: `${name1} ♥ ${name2} 궁합`,
    description: `${name1}과 ${name2}의 궁합을 분석합니다. 연애, 우정, 업무 궁합을 확인해보세요.`,
  };
}

export default async function CompatibilityResultPage({
  params,
}: {
  params: Promise<{ sign1: string; sign2: string }>;
}) {
  const { sign1, sign2 } = await params;

  if (!isValidZodiacSign(sign1) || !isValidZodiacSign(sign2)) {
    notFound();
  }

  const result = buildResult(sign1 as ZodiacSignId, sign2 as ZodiacSignId);
  if (!result) notFound();

  return (
    <div className="min-h-screen py-12 px-4">
      <CompatibilityResult result={result} />
      {isAdSenseEnabled() && (
        <div className="mt-8 max-w-4xl mx-auto">
          <AdSenseUnit adFormat="auto" responsive={true} className="w-full" />
        </div>
      )}
    </div>
  );
}
