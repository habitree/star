'use client';

import { useState } from 'react';
import type { PersonalityExtended } from '@/types/zodiac-detail';

interface ExtendedTraitsSectionProps {
  personality: PersonalityExtended;
}

export default function ExtendedTraitsSection({ personality }: ExtendedTraitsSectionProps) {
  const [showAllStrengths, setShowAllStrengths] = useState(false);
  const [showAllWeaknesses, setShowAllWeaknesses] = useState(false);
  const [showCrisis, setShowCrisis] = useState(false);

  const displayedStrengths = showAllStrengths ? personality.strengths : personality.strengths.slice(0, 3);
  const displayedWeaknesses = showAllWeaknesses ? personality.weaknesses : personality.weaknesses.slice(0, 3);

  return (
    <section className="py-8">
      <h2 className="font-display text-2xl md:text-3xl font-semibold text-center mb-8">
        성격 특성
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Strengths */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">&#x2728;</span>
            <h3 className="font-semibold text-lg text-green-400">
              강점 ({personality.strengths.length}개)
            </h3>
          </div>
          <ul className="space-y-4">
            {displayedStrengths.map((trait, index) => (
              <li key={index}>
                <div className="flex items-center gap-3 mb-1">
                  <span className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0" />
                  <span className="text-white font-medium">{trait.title}</span>
                </div>
                <p className="text-sm text-white/60 ml-5 leading-relaxed">{trait.description}</p>
              </li>
            ))}
          </ul>
          {personality.strengths.length > 3 && (
            <button
              onClick={() => setShowAllStrengths(!showAllStrengths)}
              className="mt-4 text-sm text-zodiac-primary hover:text-zodiac-secondary transition-colors"
            >
              {showAllStrengths ? '접기' : `+${personality.strengths.length - 3}개 더 보기`}
            </button>
          )}
        </div>

        {/* Weaknesses */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">&#x26A0;</span>
            <h3 className="font-semibold text-lg text-amber-400">
              약점 ({personality.weaknesses.length}개)
            </h3>
          </div>
          <ul className="space-y-4">
            {displayedWeaknesses.map((trait, index) => (
              <li key={index}>
                <div className="flex items-center gap-3 mb-1">
                  <span className="w-2 h-2 rounded-full bg-amber-400 flex-shrink-0" />
                  <span className="text-white font-medium">{trait.title}</span>
                </div>
                <p className="text-sm text-white/60 ml-5 leading-relaxed">{trait.description}</p>
              </li>
            ))}
          </ul>
          {personality.weaknesses.length > 3 && (
            <button
              onClick={() => setShowAllWeaknesses(!showAllWeaknesses)}
              className="mt-4 text-sm text-zodiac-primary hover:text-zodiac-secondary transition-colors"
            >
              {showAllWeaknesses ? '접기' : `+${personality.weaknesses.length - 3}개 더 보기`}
            </button>
          )}
        </div>
      </div>

      {/* Crisis Pattern */}
      <div className="mt-6 glass-card p-6">
        <button
          onClick={() => setShowCrisis(!showCrisis)}
          className="w-full flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <span className="text-2xl">&#x1F6A8;</span>
            <h3 className="font-semibold text-lg text-white">위기 반응 패턴</h3>
          </div>
          <span className={`text-white/50 transition-transform duration-200 ${showCrisis ? 'rotate-180' : ''}`}>
            &#x25BC;
          </span>
        </button>

        {showCrisis && (
          <div className="mt-4 space-y-4">
            <p className="text-white/80 leading-relaxed">{personality.crisisPattern.summary}</p>
            <div className="space-y-3">
              {personality.crisisPattern.phases.map((phase, index) => (
                <div key={index} className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs text-white/60">
                    {index + 1}
                  </span>
                  <p className="text-sm text-white/70 leading-relaxed">{phase}</p>
                </div>
              ))}
            </div>
            <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
              <p className="text-sm text-amber-300/90 leading-relaxed">{personality.crisisPattern.warning}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
