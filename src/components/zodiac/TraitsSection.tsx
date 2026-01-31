'use client';

import { type ZodiacTraits, type LocalizedString } from '@/types/zodiac';

interface TraitsSectionProps {
  traits: ZodiacTraits;
  description?: LocalizedString;
}

export default function TraitsSection({ traits, description }: TraitsSectionProps) {
  return (
    <section className="py-8">
      <h2 className="font-display text-2xl md:text-3xl font-semibold text-center mb-8">
        성격 특성
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Positive Traits */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">&#x2728;</span>
            <h3 className="font-semibold text-lg text-green-400">
              긍정적 특성
            </h3>
          </div>
          <ul className="space-y-3">
            {traits.positive.map((trait, index) => (
              <li key={index} className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0" />
                <span className="text-white/90">{trait.ko}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Negative Traits */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">&#x26A0;</span>
            <h3 className="font-semibold text-lg text-amber-400">
              주의할 점
            </h3>
          </div>
          <ul className="space-y-3">
            {traits.negative.map((trait, index) => (
              <li key={index} className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-amber-400 flex-shrink-0" />
                <span className="text-white/90">{trait.ko}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Description (if provided) */}
      {description && (
        <div className="mt-6 glass-card p-6">
          <p className="text-white/80 leading-relaxed">
            {description.ko}
          </p>
        </div>
      )}
    </section>
  );
}
