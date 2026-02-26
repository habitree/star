import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import ZodiacCard from '@/components/ui/ZodiacCard';
import FavoritesSection from '@/components/ui/FavoritesSection';
import { AdSenseUnit, AdSenseInFeed } from '@/components/ads';
import { isAdSenseEnabled } from '@/lib/adsense-config';
import { type ZodiacSignId } from '@/types/zodiac';
import { type Locale } from '@/i18n/config';
import OnboardingPrompt from '@/components/horoscope/OnboardingPrompt';

const zodiacSigns: ZodiacSignId[] = [
  'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
  'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces',
];

export default async function LocaleHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home' });

  return (
    <div className="min-h-screen">
      {/* Cosmic Hero Section */}
      <section className="relative py-24 px-4 overflow-hidden min-h-[70vh] flex flex-col items-center justify-center">
        {/* Deep Space Background Decor */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-zodiac-primary/20 rounded-full blur-[100px] animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-zodiac-secondary/10 rounded-full blur-[120px] animate-float" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-zodiac-accent/5 rounded-full blur-[80px] animate-spin-slow" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center stagger-fade-in">
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full glass-card border-white/20 text-zodiac-accent text-sm font-medium tracking-wider uppercase backdrop-blur-md">
            ✨ Mystical Cosmic Journey
          </div>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-8 tracking-tight drop-shadow-glow-primary">
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-zodiac-light to-zodiac-primary">
              {t('title')}
            </span>
          </h1>
          <p className="text-lg md:text-2xl text-white/80 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
            {t('subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/${locale}/horoscope`} className="btn-primary text-center px-8 py-4 text-lg">
              {t('viewHoroscope')}
            </Link>
            <Link href={`/${locale}/zodiac`} className="btn-secondary text-center px-8 py-4 text-lg">
              {t('selectZodiac')}
            </Link>
          </div>
        </div>
      </section>

      {/* Favorites Section */}
      <FavoritesSection className="py-8 px-4 max-w-6xl mx-auto" />

      {/* Hero 아래 배너 광고 */}
      {isAdSenseEnabled() && (
        <div className="py-4 px-4 max-w-6xl mx-auto">
          <AdSenseUnit adFormat="auto" responsive={true} className="w-full" />
        </div>
      )}

      {/* Zodiac Grid Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-center mb-12">
            {t('selectZodiac')}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
            {zodiacSigns.map((sign, index) => (
              <div key={sign} className="fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                <ZodiacCard sign={sign} size="md" locale={locale as Locale} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Horoscope Section */}
      <section className="py-20 px-4 relative">
        <div className="absolute inset-0 bg-glass-overlay pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="glass-card-hover p-10 md:p-16 border-zodiac-primary/30 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-zodiac-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 flex flex-col items-center">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-6 text-white drop-shadow-md">
                {t('quickHoroscope')}
              </h2>
              <p className="text-white/80 text-center mb-10 text-lg">
                {t('quickHoroscopeDesc')}
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center w-full max-w-md">
                <Link href={`/${locale}/horoscope`} className="btn-primary text-center flex-1 py-4 text-lg">
                  {t('viewHoroscope')}
                </Link>
                <Link href={`/${locale}/compatibility`} className="btn-secondary text-center flex-1 py-4 text-lg">
                  {t('checkCompatibility')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-card-hover p-8 text-center group">
              <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300 drop-shadow-glow-primary">✨</div>
              <h3 className="font-semibold text-xl mb-3 text-white">{t('feature1Title')}</h3>
              <p className="text-white/70 leading-relaxed">{t('feature1Desc')}</p>
            </div>
            <div className="glass-card-hover p-8 text-center group">
              <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300 drop-shadow-glow-primary">💫</div>
              <h3 className="font-semibold text-xl mb-3 text-white">{t('feature2Title')}</h3>
              <p className="text-white/70 leading-relaxed">{t('feature2Desc')}</p>
            </div>
            <div className="glass-card-hover p-8 text-center group">
              <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300 drop-shadow-glow-primary">🔭</div>
              <h3 className="font-semibold text-xl mb-3 text-white">{t('feature3Title')}</h3>
              <p className="text-white/70 leading-relaxed">{t('feature3Desc')}</p>
            </div>
          </div>

          {isAdSenseEnabled() && (
            <div className="mt-8">
              <AdSenseInFeed className="w-full" />
            </div>
          )}
        </div>
      </section>

      {/* 비침습적 온보딩 프롬프트 (클라이언트 컴포넌트) */}
      <OnboardingPrompt locale={locale as Locale} />
    </div>
  );
}
