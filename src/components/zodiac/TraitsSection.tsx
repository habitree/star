'use client';

import { type ZodiacTraits, type LocalizedString } from '@/types/zodiac';
import { type Locale } from '@/i18n/config';

interface TraitsSectionProps {
  traits: ZodiacTraits;
  locale: Locale;
  description?: LocalizedString;
}

const labels: Record<string, Record<Locale, string>> = {
  title: { ko: '성격 특성', en: 'Personality Traits', zh: '性格特点', ja: '性格特性', es: 'Rasgos de Personalidad' },
  positive: { ko: '긍정적 특성', en: 'Positive Traits', zh: '积极特质', ja: 'ポジティブな特性', es: 'Rasgos Positivos' },
  negative: { ko: '주의할 점', en: 'Areas to Watch', zh: '注意事项', ja: '注意点', es: 'Areas a Mejorar' },
};

export default function TraitsSection({ traits, locale, description }: TraitsSectionProps) {
  return (
    <section className="py-8">
      <h2 className="font-display text-2xl md:text-3xl font-semibold text-center mb-8">
        {labels.title[locale]}
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Positive Traits */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">&#x2728;</span>
            <h3 className="font-semibold text-lg text-green-400">
              {labels.positive[locale]}
            </h3>
          </div>
          <ul className="space-y-3">
            {traits.positive.map((trait, index) => (
              <li key={index} className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0" />
                <span className="text-white/90">{trait[locale]}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Negative Traits */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">&#x26A0;</span>
            <h3 className="font-semibold text-lg text-amber-400">
              {labels.negative[locale]}
            </h3>
          </div>
          <ul className="space-y-3">
            {traits.negative.map((trait, index) => (
              <li key={index} className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-amber-400 flex-shrink-0" />
                <span className="text-white/90">{trait[locale]}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Description (if provided) */}
      {description && (
        <div className="mt-6 glass-card p-6">
          <p className="text-white/80 leading-relaxed">
            {description[locale]}
          </p>
        </div>
      )}
    </section>
  );
}
