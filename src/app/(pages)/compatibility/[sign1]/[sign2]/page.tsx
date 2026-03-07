import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import CompatibilityResult from '@/components/compatibility/CompatibilityResult';
import { buildCompatibilityResult, zodiacKoNames } from '@/lib/compatibility-builder';
import { isValidZodiacSign } from '@/lib/zodiac-utils';
import { AdSenseUnit } from '@/components/ads';
import { isAdSenseEnabled } from '@/lib/adsense-config';
import type { ZodiacSignId } from '@/types';

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

  if (!isValidZodiacSign(sign1) || !isValidZodiacSign(sign2)) notFound();

  const result = buildCompatibilityResult(sign1 as ZodiacSignId, sign2 as ZodiacSignId);
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
