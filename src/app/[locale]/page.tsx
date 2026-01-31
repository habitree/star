'use client';

import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import ZodiacCard from '@/components/ui/ZodiacCard';
import { type ZodiacSignId } from '@/types/zodiac';
import { type Locale } from '@/i18n/config';

const zodiacSigns: ZodiacSignId[] = [
  'aries',
  'taurus',
  'gemini',
  'cancer',
  'leo',
  'virgo',
  'libra',
  'scorpio',
  'sagittarius',
  'capricorn',
  'aquarius',
  'pisces',
];

export default function HomePage() {
  const t = useTranslations('home');
  const params = useParams();
  const locale = params.locale as Locale;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-zodiac-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-zodiac-secondary/20 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto text-center">
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-6 fade-in">
            <span className="text-gradient">{t('title')}</span>
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10 fade-in">
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* Zodiac Grid Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-center mb-12">
            {t('selectZodiac')}
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
            {zodiacSigns.map((sign, index) => (
              <div
                key={sign}
                className="fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <ZodiacCard sign={sign} locale={locale} size="md" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Horoscope Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card p-8 md:p-12">
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-center mb-6">
              {t('quickHoroscope')}
            </h2>
            <p className="text-white/70 text-center mb-8">
              {t('quickHoroscopeDesc')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/${locale}/horoscope`} className="btn-primary text-center">
                {t('viewHoroscope')}
              </Link>
              <Link href={`/${locale}/compatibility`} className="btn-secondary text-center">
                {t('checkCompatibility')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="glass-card-hover p-6 text-center">
              <div className="text-4xl mb-4">&#x2728;</div>
              <h3 className="font-semibold text-lg mb-2">{t('feature1Title')}</h3>
              <p className="text-white/60 text-sm">{t('feature1Desc')}</p>
            </div>

            {/* Feature 2 */}
            <div className="glass-card-hover p-6 text-center">
              <div className="text-4xl mb-4">&#x2764;</div>
              <h3 className="font-semibold text-lg mb-2">{t('feature2Title')}</h3>
              <p className="text-white/60 text-sm">{t('feature2Desc')}</p>
            </div>

            {/* Feature 3 */}
            <div className="glass-card-hover p-6 text-center">
              <div className="text-4xl mb-4">&#x1F4CA;</div>
              <h3 className="font-semibold text-lg mb-2">{t('feature3Title')}</h3>
              <p className="text-white/60 text-sm">{t('feature3Desc')}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
