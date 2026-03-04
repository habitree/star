'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import ScoreGauge from './ScoreGauge';
import type { ZodiacSignId, CompatibilityResult as CompatibilityResultType, LocalizedText } from '@/types';
import { getGradeLabel, getCompatibilityGrade } from '@/data/compatibility-data';

type SupportedLocale = 'ko' | 'en' | 'zh' | 'ja' | 'es';

const SIGN_NAMES: Record<ZodiacSignId, Record<SupportedLocale, string>> = {
  aries:       { ko:'양자리', en:'Aries', zh:'白羊座', ja:'牡羊座', es:'Aries' },
  taurus:      { ko:'황소자리', en:'Taurus', zh:'金牛座', ja:'牡牛座', es:'Tauro' },
  gemini:      { ko:'쌍둥이자리', en:'Gemini', zh:'双子座', ja:'双子座', es:'Géminis' },
  cancer:      { ko:'게자리', en:'Cancer', zh:'巨蟹座', ja:'蟹座', es:'Cáncer' },
  leo:         { ko:'사자자리', en:'Leo', zh:'狮子座', ja:'獅子座', es:'Leo' },
  virgo:       { ko:'처녀자리', en:'Virgo', zh:'处女座', ja:'乙女座', es:'Virgo' },
  libra:       { ko:'천칭자리', en:'Libra', zh:'天秤座', ja:'天秤座', es:'Libra' },
  scorpio:     { ko:'전갈자리', en:'Scorpio', zh:'天蝎座', ja:'蠍座', es:'Escorpio' },
  sagittarius: { ko:'사수자리', en:'Sagittarius', zh:'射手座', ja:'射手座', es:'Sagitario' },
  capricorn:   { ko:'염소자리', en:'Capricorn', zh:'摩羯座', ja:'山羊座', es:'Capricornio' },
  aquarius:    { ko:'물병자리', en:'Aquarius', zh:'水瓶座', ja:'水瓶座', es:'Acuario' },
  pisces:      { ko:'물고기자리', en:'Pisces', zh:'双鱼座', ja:'魚座', es:'Piscis' },
};

const elementColors: Record<string, string> = {
  fire: 'from-red-500 to-orange-500',
  earth: 'from-green-500 to-lime-500',
  air: 'from-blue-500 to-cyan-500',
  water: 'from-violet-500 to-indigo-500',
};

const SIGN_ELEMENTS: Record<ZodiacSignId, string> = {
  aries:'fire', leo:'fire', sagittarius:'fire',
  taurus:'earth', virgo:'earth', capricorn:'earth',
  gemini:'air', libra:'air', aquarius:'air',
  cancer:'water', scorpio:'water', pisces:'water',
};

type CategoryKey = 'love' | 'friendship' | 'work';

const CATEGORY_LABELS: Record<SupportedLocale, Record<CategoryKey, string>> = {
  ko: { love:'연애', friendship:'우정', work:'업무' },
  en: { love:'Love', friendship:'Friendship', work:'Work' },
  zh: { love:'爱情', friendship:'友情', work:'事业' },
  ja: { love:'恋愛', friendship:'友情', work:'仕事' },
  es: { love:'Amor', friendship:'Amistad', work:'Trabajo' },
};

const SECTION_LABELS: Record<SupportedLocale, {
  overall: string; categories: string; advice: string;
  element: string; modality: string; checkAnother: string;
}> = {
  ko: { overall:'종합 궁합', categories:'카테고리별 궁합', advice:'조언', element:'원소 궁합', modality:'모달리티 궁합', checkAnother:'다른 궁합 확인' },
  en: { overall:'Overall Compatibility', categories:'Category Compatibility', advice:'Advice', element:'Element Compatibility', modality:'Modality Compatibility', checkAnother:'Check Another Compatibility' },
  zh: { overall:'综合配对', categories:'分类配对', advice:'建议', element:'元素配对', modality:'模式配对', checkAnother:'查看其他配对' },
  ja: { overall:'総合相性', categories:'カテゴリ別相性', advice:'アドバイス', element:'元素相性', modality:'モダリティ相性', checkAnother:'他の相性を確認' },
  es: { overall:'Compatibilidad General', categories:'Compatibilidad por Categoría', advice:'Consejo', element:'Compatibilidad Elemental', modality:'Compatibilidad de Modalidad', checkAnother:'Ver Otra Compatibilidad' },
};

const MODALITY_LABELS: Record<SupportedLocale, Record<string, string>> = {
  ko: { cardinal:'시작형', fixed:'고정형', mutable:'변화형' },
  en: { cardinal:'Cardinal', fixed:'Fixed', mutable:'Mutable' },
  zh: { cardinal:'本位', fixed:'固定', mutable:'变通' },
  ja: { cardinal:'活動宮', fixed:'固定宮', mutable:'柔軟宮' },
  es: { cardinal:'Cardinal', fixed:'Fijo', mutable:'Mutable' },
};

function localizedText(text: LocalizedText, locale: string): string {
  return (text as unknown as Record<string, string>)[locale] || text.en || text.ko;
}

interface CompatibilityResultProps {
  result: CompatibilityResultType;
}

export default function CompatibilityResult({ result }: CompatibilityResultProps) {
  const params = useParams();
  const locale = ((params?.locale as string) || 'ko') as SupportedLocale;

  const getSignName = (signId: ZodiacSignId) =>
    SIGN_NAMES[signId][locale] || SIGN_NAMES[signId].en;

  const sign1Element = SIGN_ELEMENTS[result.sign1];
  const sign2Element = SIGN_ELEMENTS[result.sign2];
  const sign1Symbol = SIGN_NAMES[result.sign1] ? '♈♉♊♋♌♍♎♏♐♑♒♓'.split('')[
    ['aries','taurus','gemini','cancer','leo','virgo','libra','scorpio','sagittarius','capricorn','aquarius','pisces'].indexOf(result.sign1)
  ] : '';
  const sign2Symbol = SIGN_NAMES[result.sign2] ? '♈♉♊♋♌♍♎♏♐♑♒♓'.split('')[
    ['aries','taurus','gemini','cancer','leo','virgo','libra','scorpio','sagittarius','capricorn','aquarius','pisces'].indexOf(result.sign2)
  ] : '';

  const grade = getCompatibilityGrade(result.overallScore);
  const gradeLabel = getGradeLabel(grade, locale);
  const categoryLabels = CATEGORY_LABELS[locale] || CATEGORY_LABELS.en;
  const sectionLabels = SECTION_LABELS[locale] || SECTION_LABELS.en;
  const modalityLabels = MODALITY_LABELS[locale] || MODALITY_LABELS.en;

  const getCategoryIcon = (category: CategoryKey) => {
    switch (category) {
      case 'love':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        );
      case 'friendship':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
          </svg>
        );
      case 'work':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* 두 별자리 헤더 */}
      <div className="glass-card p-8">
        <div className="flex items-center justify-center gap-6 md:gap-12 mb-8">
          <Link href={`/${locale}/zodiac/${result.sign1}`} className="group text-center">
            <div className={`w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br ${elementColors[sign1Element]}
                           flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
              <span className="text-4xl md:text-5xl">{sign1Symbol}</span>
            </div>
            <h3 className="text-lg md:text-xl font-semibold text-white group-hover:text-purple-300 transition-colors">
              {getSignName(result.sign1)}
            </h3>
          </Link>

          <div className="text-pink-500 animate-pulse">
            <svg className="w-10 h-10 md:w-14 md:h-14" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>

          <Link href={`/${locale}/zodiac/${result.sign2}`} className="group text-center">
            <div className={`w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br ${elementColors[sign2Element]}
                           flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
              <span className="text-4xl md:text-5xl">{sign2Symbol}</span>
            </div>
            <h3 className="text-lg md:text-xl font-semibold text-white group-hover:text-purple-300 transition-colors">
              {getSignName(result.sign2)}
            </h3>
          </Link>
        </div>

        <div className="text-center">
          <h2 className="text-xl md:text-2xl font-bold text-white/80 mb-4">
            {sectionLabels.overall}
          </h2>
          <div className="flex flex-col items-center gap-4">
            <ScoreGauge score={result.overallScore} size={160} strokeWidth={12} />
            <span className={`text-lg font-semibold px-4 py-2 rounded-full
                           ${grade === 'excellent' ? 'bg-green-500/20 text-green-400' :
                             grade === 'good' ? 'bg-blue-500/20 text-blue-400' :
                             grade === 'average' ? 'bg-amber-500/20 text-amber-400' :
                             grade === 'challenging' ? 'bg-orange-500/20 text-orange-400' :
                             'bg-red-500/20 text-red-400'}`}>
              {gradeLabel}
            </span>
          </div>
        </div>
      </div>

      {/* 카테고리별 점수 */}
      <div className="glass-card p-6 md:p-8">
        <h2 className="text-xl font-bold text-white mb-6">{sectionLabels.categories}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(['love', 'friendship', 'work'] as const).map((category) => (
            <div
              key={category}
              className="bg-white/5 rounded-xl p-6 text-center hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center justify-center gap-2 text-white/70 mb-4">
                {getCategoryIcon(category)}
                <span className="font-medium">{categoryLabels[category]}</span>
              </div>
              <ScoreGauge
                score={result.categories[category].score}
                size={100}
                strokeWidth={8}
                label={categoryLabels[category]}
                showLabel={true}
              />
            </div>
          ))}
        </div>
      </div>

      {/* 조언 */}
      <div className="glass-card p-6 md:p-8">
        <h2 className="text-xl font-bold text-white mb-4">{sectionLabels.advice}</h2>
        <p className="text-white/80 text-lg leading-relaxed">
          {localizedText(result.advice, locale)}
        </p>
      </div>

      {/* 원소 & 모달리티 궁합 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-6">
          <h3 className="text-lg font-bold text-white mb-4">{sectionLabels.element}</h3>
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${elementColors[result.elementCompatibility.element1]}
                           flex items-center justify-center`}>
              <span className="text-xl">{sign1Symbol}</span>
            </div>
            <span className="text-2xl text-white/50">+</span>
            <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${elementColors[result.elementCompatibility.element2]}
                           flex items-center justify-center`}>
              <span className="text-xl">{sign2Symbol}</span>
            </div>
            <div className="ml-auto">
              <ScoreGauge score={result.elementCompatibility.score} size={60} strokeWidth={5} />
            </div>
          </div>
          <p className="text-white/70 text-sm">
            {localizedText(result.elementCompatibility.description, locale)}
          </p>
        </div>

        <div className="glass-card p-6">
          <h3 className="text-lg font-bold text-white mb-4">{sectionLabels.modality}</h3>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <span className="text-white/80">{modalityLabels[result.modalityCompatibility.modality1] ?? result.modalityCompatibility.modality1}</span>
              <span className="text-white/50">+</span>
              <span className="text-white/80">{modalityLabels[result.modalityCompatibility.modality2] ?? result.modalityCompatibility.modality2}</span>
            </div>
            <ScoreGauge score={result.modalityCompatibility.score} size={60} strokeWidth={5} />
          </div>
          <p className="text-white/70 text-sm">
            {localizedText(result.modalityCompatibility.description, locale)}
          </p>
        </div>
      </div>

      {/* 다른 궁합 확인 */}
      <div className="text-center">
        <Link
          href={`/${locale}/compatibility`}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600
                     rounded-lg font-semibold text-white hover:from-purple-700 hover:to-pink-700
                     transition-all duration-300 transform hover:scale-105"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          {sectionLabels.checkAnother}
        </Link>
      </div>
    </div>
  );
}
