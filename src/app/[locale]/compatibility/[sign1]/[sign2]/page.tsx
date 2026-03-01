import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import CompatibilityResult from '@/components/compatibility/CompatibilityResult';
import { buildCompatibilityResult, zodiacKoNames } from '@/lib/compatibility-builder';
import { isValidZodiacSign } from '@/lib/zodiac-utils';
import { AdSenseUnit } from '@/components/ads';
import { isAdSenseEnabled } from '@/lib/adsense-config';
import { locales, type Locale } from '@/i18n/config';
import type { ZodiacSignId } from '@/types';

const signNamesByLocale: Record<Locale, Record<string, string>> = {
  ko: { aries: '양자리', taurus: '황소자리', gemini: '쌍둥이자리', cancer: '게자리', leo: '사자자리', virgo: '처녀자리', libra: '천칭자리', scorpio: '전갈자리', sagittarius: '사수자리', capricorn: '염소자리', aquarius: '물병자리', pisces: '물고기자리' },
  en: { aries: 'Aries', taurus: 'Taurus', gemini: 'Gemini', cancer: 'Cancer', leo: 'Leo', virgo: 'Virgo', libra: 'Libra', scorpio: 'Scorpio', sagittarius: 'Sagittarius', capricorn: 'Capricorn', aquarius: 'Aquarius', pisces: 'Pisces' },
  zh: { aries: '白羊座', taurus: '金牛座', gemini: '双子座', cancer: '巨蟹座', leo: '狮子座', virgo: '处女座', libra: '天秤座', scorpio: '天蝎座', sagittarius: '射手座', capricorn: '摩羯座', aquarius: '水瓶座', pisces: '双鱼座' },
  ja: { aries: '牡羊座', taurus: '牡牛座', gemini: '双子座', cancer: '蟹座', leo: '獅子座', virgo: '乙女座', libra: '天秤座', scorpio: '蠍座', sagittarius: '射手座', capricorn: '山羊座', aquarius: '水瓶座', pisces: '魚座' },
  es: { aries: 'Aries', taurus: 'Tauro', gemini: 'Géminis', cancer: 'Cáncer', leo: 'Leo', virgo: 'Virgo', libra: 'Libra', scorpio: 'Escorpio', sagittarius: 'Sagitario', capricorn: 'Capricornio', aquarius: 'Acuario', pisces: 'Piscis' },
};

const metaTitles: Record<Locale, (n1: string, n2: string) => string> = {
  ko: (n1, n2) => `${n1} ♥ ${n2} 궁합`,
  en: (n1, n2) => `${n1} ♥ ${n2} Compatibility`,
  zh: (n1, n2) => `${n1} ♥ ${n2} 配对`,
  ja: (n1, n2) => `${n1} ♥ ${n2} 相性`,
  es: (n1, n2) => `Compatibilidad ${n1} ♥ ${n2}`,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; sign1: string; sign2: string }>;
}): Promise<Metadata> {
  const { locale, sign1, sign2 } = await params;
  const safeLocale = locales.includes(locale as Locale) ? (locale as Locale) : 'ko';
  const names = signNamesByLocale[safeLocale];
  const name1 = names[sign1] || zodiacKoNames[sign1] || sign1;
  const name2 = names[sign2] || zodiacKoNames[sign2] || sign2;
  return { title: metaTitles[safeLocale](name1, name2) };
}

export default async function LocaleCompatibilityResultPage({
  params,
}: {
  params: Promise<{ locale: string; sign1: string; sign2: string }>;
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
