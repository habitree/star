'use client';

import Link from 'next/link';
import ScoreGauge from './ScoreGauge';
import type { ZodiacSignId, CompatibilityResult as CompatibilityResultType } from '@/types';
import { getGradeLabel, getCompatibilityGrade } from '@/data/compatibility-data';

interface ZodiacInfo {
  symbol: string;
  name: string;
  element: string;
}

const zodiacData: Record<ZodiacSignId, ZodiacInfo> = {
  aries: { symbol: '\u2648', name: '양자리', element: 'fire' },
  taurus: { symbol: '\u2649', name: '황소자리', element: 'earth' },
  gemini: { symbol: '\u264A', name: '쌍둥이자리', element: 'air' },
  cancer: { symbol: '\u264B', name: '게자리', element: 'water' },
  leo: { symbol: '\u264C', name: '사자자리', element: 'fire' },
  virgo: { symbol: '\u264D', name: '처녀자리', element: 'earth' },
  libra: { symbol: '\u264E', name: '천칭자리', element: 'air' },
  scorpio: { symbol: '\u264F', name: '전갈자리', element: 'water' },
  sagittarius: { symbol: '\u2650', name: '사수자리', element: 'fire' },
  capricorn: { symbol: '\u2651', name: '염소자리', element: 'earth' },
  aquarius: { symbol: '\u2652', name: '물병자리', element: 'air' },
  pisces: { symbol: '\u2653', name: '물고기자리', element: 'water' },
};

const elementColors: Record<string, string> = {
  fire: 'from-red-500 to-orange-500',
  earth: 'from-green-500 to-lime-500',
  air: 'from-blue-500 to-cyan-500',
  water: 'from-violet-500 to-indigo-500',
};

const categoryLabels: Record<string, string> = {
  love: '연애',
  friendship: '우정',
  work: '업무',
};

const sectionLabels = {
  overall: '종합 궁합',
  categories: '카테고리별 궁합',
  advice: '조언',
  element: '원소 궁합',
  modality: '모달리티 궁합',
  checkAnother: '다른 궁합 확인',
};

interface CompatibilityResultProps {
  result: CompatibilityResultType;
}

export default function CompatibilityResult({ result }: CompatibilityResultProps) {
  const sign1Data = zodiacData[result.sign1];
  const sign2Data = zodiacData[result.sign2];
  const grade = getCompatibilityGrade(result.overallScore);
  const gradeLabel = getGradeLabel(grade, 'ko');

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
          <Link href={`/zodiac/${result.sign1}`} className="group text-center">
            <div className={`w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br ${elementColors[sign1Data.element]}
                           flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300
                           shadow-lg`}>
              <span className="text-4xl md:text-5xl">{sign1Data.symbol}</span>
            </div>
            <h3 className="text-lg md:text-xl font-semibold text-white group-hover:text-purple-300 transition-colors">
              {sign1Data.name}
            </h3>
          </Link>

          {/* 하트 아이콘 */}
          <div className="text-pink-500 animate-pulse">
            <svg className="w-10 h-10 md:w-14 md:h-14" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>

          {/* 두 번째 별자리 */}
          <Link href={`/zodiac/${result.sign2}`} className="group text-center">
            <div className={`w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br ${elementColors[sign2Data.element]}
                           flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300
                           shadow-lg`}>
              <span className="text-4xl md:text-5xl">{sign2Data.symbol}</span>
            </div>
            <h3 className="text-lg md:text-xl font-semibold text-white group-hover:text-purple-300 transition-colors">
              {sign2Data.name}
            </h3>
          </Link>
        </div>

        {/* 종합 점수 */}
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
          {result.advice.ko || result.advice.en}
        </p>
      </div>

      {/* 원소 & 모달리티 궁합 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 원소 궁합 */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-bold text-white mb-4">{sectionLabels.element}</h3>
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
            {result.elementCompatibility.description.ko || result.elementCompatibility.description.en}
          </p>
        </div>

        {/* 모달리티 궁합 */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-bold text-white mb-4">{sectionLabels.modality}</h3>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <span className="text-white/80 capitalize">{result.modalityCompatibility.modality1}</span>
              <span className="text-white/50">+</span>
              <span className="text-white/80 capitalize">{result.modalityCompatibility.modality2}</span>
            </div>
            <ScoreGauge score={result.modalityCompatibility.score} size={60} strokeWidth={5} />
          </div>
          <p className="text-white/70 text-sm">
            {result.modalityCompatibility.description.ko || result.modalityCompatibility.description.en}
          </p>
        </div>
      </div>

      {/* 다른 궁합 확인 버튼 */}
      <div className="text-center">
        <Link
          href="/compatibility"
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
