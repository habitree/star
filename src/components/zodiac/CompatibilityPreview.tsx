'use client';

import Link from 'next/link';
import { type ZodiacSignId, type ZodiacCompatibility } from '@/types/zodiac';
import { type Locale } from '@/i18n/config';
import { zodiacSigns } from '@/data/zodiac-signs';

interface CompatibilityPreviewProps {
  currentSign: ZodiacSignId;
  compatibility: ZodiacCompatibility;
  locale: Locale;
}

const labels: Record<string, Record<Locale, string>> = {
  title: { ko: '궁합', en: 'Compatibility', zh: '配对', ja: '相性', es: 'Compatibilidad' },
  bestMatch: { ko: '최고의 궁합', en: 'Best Matches', zh: '最佳搭配', ja: '最高の相性', es: 'Mejores Parejas' },
  challenging: { ko: '주의할 궁합', en: 'Challenging Matches', zh: '需注意', ja: '注意が必要', es: 'Relaciones Desafiantes' },
  viewDetails: { ko: '자세히 보기', en: 'View Details', zh: '查看详情', ja: '詳しく見る', es: 'Ver Detalles' },
};

function getSignData(signId: ZodiacSignId) {
  return zodiacSigns.find((s) => s.id === signId);
}

interface MiniCardProps {
  signId: ZodiacSignId;
  currentSign: ZodiacSignId;
  locale: Locale;
  variant: 'best' | 'worst';
}

function MiniCard({ signId, currentSign, locale, variant }: MiniCardProps) {
  const sign = getSignData(signId);
  if (!sign) return null;

  const borderColor = variant === 'best' ? 'border-green-500/30' : 'border-amber-500/30';
  const hoverBorder = variant === 'best' ? 'hover:border-green-500/60' : 'hover:border-amber-500/60';

  return (
    <Link href={`/${locale}/compatibility?sign1=${currentSign}&sign2=${signId}`}>
      <div
        className={`
          glass-card p-4 text-center cursor-pointer
          border-2 ${borderColor} ${hoverBorder}
          transition-all duration-300 hover:scale-105
        `}
      >
        <span className="text-3xl mb-2 block filter drop-shadow-lg">
          {sign.symbol}
        </span>
        <p className="text-white font-medium text-sm">
          {sign.names[locale]}
        </p>
      </div>
    </Link>
  );
}

export default function CompatibilityPreview({
  currentSign,
  compatibility,
  locale,
}: CompatibilityPreviewProps) {
  return (
    <section className="py-8">
      <h2 className="font-display text-2xl md:text-3xl font-semibold text-center mb-8">
        {labels.title[locale]}
      </h2>

      <div className="space-y-8">
        {/* Best Matches */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">&#x1F49A;</span>
            <h3 className="font-semibold text-lg text-green-400">
              {labels.bestMatch[locale]}
            </h3>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {compatibility.best.map((signId) => (
              <MiniCard
                key={signId}
                signId={signId}
                currentSign={currentSign}
                locale={locale}
                variant="best"
              />
            ))}
          </div>
        </div>

        {/* Challenging Matches */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">&#x1F9E1;</span>
            <h3 className="font-semibold text-lg text-amber-400">
              {labels.challenging[locale]}
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-4 max-w-xs">
            {compatibility.worst.map((signId) => (
              <MiniCard
                key={signId}
                signId={signId}
                currentSign={currentSign}
                locale={locale}
                variant="worst"
              />
            ))}
          </div>
        </div>
      </div>

      {/* View All Link */}
      <div className="mt-8 text-center">
        <Link
          href={`/${locale}/compatibility?sign1=${currentSign}`}
          className="btn-secondary inline-flex items-center gap-2"
        >
          {labels.viewDetails[locale]}
          <span>&#x2192;</span>
        </Link>
      </div>
    </section>
  );
}
