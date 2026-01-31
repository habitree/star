'use client';

import Link from 'next/link';
import { type ZodiacSignId, type ZodiacCompatibility } from '@/types/zodiac';
import { zodiacSigns } from '@/data/zodiac-signs';

interface CompatibilityPreviewProps {
  currentSign: ZodiacSignId;
  compatibility: ZodiacCompatibility;
}

function getSignData(signId: ZodiacSignId) {
  return zodiacSigns.find((s) => s.id === signId);
}

interface MiniCardProps {
  signId: ZodiacSignId;
  currentSign: ZodiacSignId;
  variant: 'best' | 'worst';
}

function MiniCard({ signId, currentSign, variant }: MiniCardProps) {
  const sign = getSignData(signId);
  if (!sign) return null;

  const borderColor = variant === 'best' ? 'border-green-500/30' : 'border-amber-500/30';
  const hoverBorder = variant === 'best' ? 'hover:border-green-500/60' : 'hover:border-amber-500/60';

  return (
    <Link href={`/compatibility?sign1=${currentSign}&sign2=${signId}`}>
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
          {sign.names.ko}
        </p>
      </div>
    </Link>
  );
}

export default function CompatibilityPreview({
  currentSign,
  compatibility,
}: CompatibilityPreviewProps) {
  return (
    <section className="py-8">
      <h2 className="font-display text-2xl md:text-3xl font-semibold text-center mb-8">
        궁합
      </h2>

      <div className="space-y-8">
        {/* Best Matches */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">&#x1F49A;</span>
            <h3 className="font-semibold text-lg text-green-400">
              최고의 궁합
            </h3>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {compatibility.best.map((signId) => (
              <MiniCard
                key={signId}
                signId={signId}
                currentSign={currentSign}
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
              주의할 궁합
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-4 max-w-xs">
            {compatibility.worst.map((signId) => (
              <MiniCard
                key={signId}
                signId={signId}
                currentSign={currentSign}
                variant="worst"
              />
            ))}
          </div>
        </div>
      </div>

      {/* View All Link */}
      <div className="mt-8 text-center">
        <Link
          href={`/compatibility?sign1=${currentSign}`}
          className="btn-secondary inline-flex items-center gap-2"
        >
          자세히 보기
          <span>&#x2192;</span>
        </Link>
      </div>
    </section>
  );
}
