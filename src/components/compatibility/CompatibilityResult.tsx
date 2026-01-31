'use client';

import Link from 'next/link';
import ScoreGauge from './ScoreGauge';
import type { ZodiacSignId, CompatibilityResult as CompatibilityResultType } from '@/types';
import type { Locale } from '@/i18n/config';
import { getGradeLabel, getCompatibilityGrade } from '@/data/compatibility-data';

interface ZodiacInfo {
  symbol: string;
  names: Record<Locale, string>;
  element: string;
}

const zodiacData: Record<ZodiacSignId, ZodiacInfo> = {
  aries: { symbol: '\u2648', names: { ko: '양자리', en: 'Aries', zh: '白羊座', ja: 'おひつじ座', es: 'Aries' }, element: 'fire' },
  taurus: { symbol: '\u2649', names: { ko: '황소자리', en: 'Taurus', zh: '金牛座', ja: 'おうし座', es: 'Tauro' }, element: 'earth' },
  gemini: { symbol: '\u264A', names: { ko: '쌍둥이자리', en: 'Gemini', zh: '双子座', ja: 'ふたご座', es: 'Geminis' }, element: 'air' },
  cancer: { symbol: '\u264B', names: { ko: '게자리', en: 'Cancer', zh: '巨蟹座', ja: 'かに座', es: 'Cancer' }, element: 'water' },
  leo: { symbol: '\u264C', names: { ko: '사자자리', en: 'Leo', zh: '狮子座', ja: 'しし座', es: 'Leo' }, element: 'fire' },
  virgo: { symbol: '\u264D', names: { ko: '처녀자리', en: 'Virgo', zh: '处女座', ja: 'おとめ座', es: 'Virgo' }, element: 'earth' },
  libra: { symbol: '\u264E', names: { ko: '천칭자리', en: 'Libra', zh: '天秤座', ja: 'てんびん座', es: 'Libra' }, element: 'air' },
  scorpio: { symbol: '\u264F', names: { ko: '전갈자리', en: 'Scorpio', zh: '天蝎座', ja: 'さそり座', es: 'Escorpio' }, element: 'water' },
  sagittarius: { symbol: '\u2650', names: { ko: '사수자리', en: 'Sagittarius', zh: '射手座', ja: 'いて座', es: 'Sagitario' }, element: 'fire' },
  capricorn: { symbol: '\u2651', names: { ko: '염소자리', en: 'Capricorn', zh: '摩羯座', ja: 'やぎ座', es: 'Capricornio' }, element: 'earth' },
  aquarius: { symbol: '\u2652', names: { ko: '물병자리', en: 'Aquarius', zh: '水瓶座', ja: 'みずがめ座', es: 'Acuario' }, element: 'air' },
  pisces: { symbol: '\u2653', names: { ko: '물고기자리', en: 'Pisces', zh: '双鱼座', ja: 'うお座', es: 'Piscis' }, element: 'water' },
};

const elementColors: Record<string, string> = {
  fire: 'from-red-500 to-orange-500',
  earth: 'from-green-500 to-lime-500',
  air: 'from-blue-500 to-cyan-500',
  water: 'from-violet-500 to-indigo-500',
};

const categoryLabels: Record<string, Record<Locale, string>> = {
  love: { ko: '연애', en: 'Love', zh: '爱情', ja: '恋愛', es: 'Amor' },
  friendship: { ko: '우정', en: 'Friendship', zh: '友情', ja: '友情', es: 'Amistad' },
  work: { ko: '업무', en: 'Work', zh: '工作', ja: '仕事', es: 'Trabajo' },
};

const sectionLabels: Record<string, Record<Locale, string>> = {
  overall: { ko: '종합 궁합', en: 'Overall Compatibility', zh: '综合配对', ja: '総合相性', es: 'Compatibilidad General' },
  categories: { ko: '카테고리별 궁합', en: 'Category Compatibility', zh: '分类配对', ja: 'カテゴリー別相性', es: 'Compatibilidad por Categoria' },
  advice: { ko: '조언', en: 'Advice', zh: '建议', ja: 'アドバイス', es: 'Consejo' },
  element: { ko: '원소 궁합', en: 'Element Compatibility', zh: '元素配对', ja: '元素の相性', es: 'Compatibilidad Elemental' },
  modality: { ko: '모달리티 궁합', en: 'Modality Compatibility', zh: '模式配对', ja: 'モダリティ相性', es: 'Compatibilidad Modal' },
  checkAnother: { ko: '다른 궁합 확인', en: 'Check Another', zh: '查看其他配对', ja: '他の相性を確認', es: 'Ver Otra Compatibilidad' },
};

interface CompatibilityResultProps {
  result: CompatibilityResultType;
  locale: Locale;
}

export default function CompatibilityResult({ result, locale }: CompatibilityResultProps) {
  const sign1Data = zodiacData[result.sign1];
  const sign2Data = zodiacData[result.sign2];
  const grade = getCompatibilityGrade(result.overallScore);
  const gradeLabel = getGradeLabel(grade, locale);

  const getCategoryIcon = (category: string) => {
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
          {/* 첫 번째 별자리 */}
          <Link href={`/${locale}/zodiac/${result.sign1}`} className="group text-center">
            <div className={`w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br ${elementColors[sign1Data.element]}
                           flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300
                           shadow-lg`}>
              <span className="text-4xl md:text-5xl">{sign1Data.symbol}</span>
            </div>
            <h3 className="text-lg md:text-xl font-semibold text-white group-hover:text-purple-300 transition-colors">
              {sign1Data.names[locale]}
            </h3>
          </Link>

          {/* 하트 아이콘 */}
          <div className="text-pink-500 animate-pulse">
            <svg className="w-10 h-10 md:w-14 md:h-14" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>

          {/* 두 번째 별자리 */}
          <Link href={`/${locale}/zodiac/${result.sign2}`} className="group text-center">
            <div className={`w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br ${elementColors[sign2Data.element]}
                           flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300
                           shadow-lg`}>
              <span className="text-4xl md:text-5xl">{sign2Data.symbol}</span>
            </div>
            <h3 className="text-lg md:text-xl font-semibold text-white group-hover:text-purple-300 transition-colors">
              {sign2Data.names[locale]}
            </h3>
          </Link>
        </div>

        {/* 종합 점수 */}
        <div className="text-center">
          <h2 className="text-xl md:text-2xl font-bold text-white/80 mb-4">
            {sectionLabels.overall[locale]}
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
        <h2 className="text-xl font-bold text-white mb-6">{sectionLabels.categories[locale]}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(['love', 'friendship', 'work'] as const).map((category) => (
            <div
              key={category}
              className="bg-white/5 rounded-xl p-6 text-center hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center justify-center gap-2 text-white/70 mb-4">
                {getCategoryIcon(category)}
                <span className="font-medium">{categoryLabels[category][locale]}</span>
              </div>
              <ScoreGauge
                score={result.categories[category].score}
                size={100}
                strokeWidth={8}
                label={categoryLabels[category][locale]}
                showLabel={true}
              />
            </div>
          ))}
        </div>
      </div>

      {/* 조언 */}
      <div className="glass-card p-6 md:p-8">
        <h2 className="text-xl font-bold text-white mb-4">{sectionLabels.advice[locale]}</h2>
        <p className="text-white/80 text-lg leading-relaxed">
          {result.advice[locale as keyof typeof result.advice] || result.advice.en}
        </p>
      </div>

      {/* 원소 & 모달리티 궁합 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 원소 궁합 */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-bold text-white mb-4">{sectionLabels.element[locale]}</h3>
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${elementColors[result.elementCompatibility.element1]}
                           flex items-center justify-center`}>
              <span className="text-xl">{sign1Data.symbol}</span>
            </div>
            <span className="text-2xl text-white/50">+</span>
            <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${elementColors[result.elementCompatibility.element2]}
                           flex items-center justify-center`}>
              <span className="text-xl">{sign2Data.symbol}</span>
            </div>
            <div className="ml-auto">
              <ScoreGauge score={result.elementCompatibility.score} size={60} strokeWidth={5} />
            </div>
          </div>
          <p className="text-white/70 text-sm">
            {result.elementCompatibility.description[locale as keyof typeof result.elementCompatibility.description] ||
             result.elementCompatibility.description.en}
          </p>
        </div>

        {/* 모달리티 궁합 */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-bold text-white mb-4">{sectionLabels.modality[locale]}</h3>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <span className="text-white/80 capitalize">{result.modalityCompatibility.modality1}</span>
              <span className="text-white/50">+</span>
              <span className="text-white/80 capitalize">{result.modalityCompatibility.modality2}</span>
            </div>
            <ScoreGauge score={result.modalityCompatibility.score} size={60} strokeWidth={5} />
          </div>
          <p className="text-white/70 text-sm">
            {result.modalityCompatibility.description[locale as keyof typeof result.modalityCompatibility.description] ||
             result.modalityCompatibility.description.en}
          </p>
        </div>
      </div>

      {/* 다른 궁합 확인 버튼 */}
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
          {sectionLabels.checkAnother[locale]}
        </Link>
      </div>
    </div>
  );
}
