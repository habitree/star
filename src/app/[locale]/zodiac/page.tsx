import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { type Locale, locales } from '@/i18n/config';

export const runtime = 'edge';
import { zodiacSigns } from '@/data/zodiac-signs';
import { type Element, type ZodiacSign } from '@/types/zodiac';
import ZodiacCard from '@/components/ui/ZodiacCard';

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

const pageLabels: Record<string, Record<Locale, string>> = {
  title: {
    ko: '12별자리',
    en: '12 Zodiac Signs',
    zh: '十二星座',
    ja: '12星座',
    es: '12 Signos del Zodiaco'
  },
  subtitle: {
    ko: '별자리를 선택하여 자세한 정보를 확인하세요',
    en: 'Select a zodiac sign to learn more',
    zh: '选择一个星座了解更多',
    ja: '星座を選んで詳細を確認',
    es: 'Selecciona un signo para ver mas'
  },
};

const elementLabels: Record<Element, Record<Locale, string>> = {
  fire: { ko: '불의 별자리', en: 'Fire Signs', zh: '火象星座', ja: '火の星座', es: 'Signos de Fuego' },
  earth: { ko: '흙의 별자리', en: 'Earth Signs', zh: '土象星座', ja: '土の星座', es: 'Signos de Tierra' },
  air: { ko: '공기의 별자리', en: 'Air Signs', zh: '风象星座', ja: '風の星座', es: 'Signos de Aire' },
  water: { ko: '물의 별자리', en: 'Water Signs', zh: '水象星座', ja: '水の星座', es: 'Signos de Agua' },
};

const elementDescriptions: Record<Element, Record<Locale, string>> = {
  fire: {
    ko: '열정적이고 활기찬 에너지',
    en: 'Passionate and vibrant energy',
    zh: '热情与活力',
    ja: '情熱的で活気あるエネルギー',
    es: 'Energia apasionada y vibrante'
  },
  earth: {
    ko: '실용적이고 안정적인 성향',
    en: 'Practical and stable nature',
    zh: '务实与稳定',
    ja: '実用的で安定した性質',
    es: 'Naturaleza practica y estable'
  },
  air: {
    ko: '지적이고 소통을 중시',
    en: 'Intellectual and communicative',
    zh: '智慧与沟通',
    ja: '知的でコミュニケーション重視',
    es: 'Intelectual y comunicativo'
  },
  water: {
    ko: '감성적이고 직관적인 성향',
    en: 'Emotional and intuitive',
    zh: '感性与直觉',
    ja: '感情的で直感的',
    es: 'Emocional e intuitivo'
  },
};

const elementEmojis: Record<Element, string> = {
  fire: '\u{1F525}',
  earth: '\u{1F33F}',
  air: '\u{1F4A8}',
  water: '\u{1F4A7}',
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<Locale, string> = {
    ko: '12별자리 - 별자리 운세',
    en: '12 Zodiac Signs - Horoscope',
    zh: '十二星座 - 星座运势',
    ja: '12星座 - 星座占い',
    es: '12 Signos Zodiacales - Horoscopo',
  };

  const descriptions: Record<Locale, string> = {
    ko: '양자리부터 물고기자리까지, 12별자리의 특성과 성격을 알아보세요.',
    en: 'Discover the traits and personalities of all 12 zodiac signs, from Aries to Pisces.',
    zh: '从白羊座到双鱼座，了解十二星座的特点和性格。',
    ja: '牡羊座から魚座まで、12星座の特性と性格を知りましょう。',
    es: 'Descubre las caracteristicas de los 12 signos zodiacales, desde Aries hasta Piscis.',
  };

  return {
    title: titles[locale],
    description: descriptions[locale],
    keywords: ['zodiac', 'horoscope', 'astrology', '별자리', '운세', '점성술'],
    openGraph: {
      title: titles[locale],
      description: descriptions[locale],
      type: 'website',
    },
  };
}

function groupByElement(signs: ZodiacSign[]): Record<Element, ZodiacSign[]> {
  const grouped: Record<Element, ZodiacSign[]> = {
    fire: [],
    earth: [],
    air: [],
    water: [],
  };

  signs.forEach((sign) => {
    grouped[sign.element].push(sign);
  });

  return grouped;
}

export default async function ZodiacListPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const groupedSigns = groupByElement(zodiacSigns);
  const elementOrder: Element[] = ['fire', 'earth', 'air', 'water'];

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">{pageLabels.title[locale]}</span>
          </h1>
          <p className="text-white/60 text-lg">
            {pageLabels.subtitle[locale]}
          </p>
        </div>

        {/* Element Groups */}
        <div className="space-y-12">
          {elementOrder.map((element) => (
            <section key={element} className="fade-in">
              {/* Element Header */}
              <div className={`mb-6 p-4 rounded-xl bg-gradient-to-r ${getElementGradient(element)} bg-opacity-10`}>
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{elementEmojis[element]}</span>
                  <div>
                    <h2 className="font-display text-xl md:text-2xl font-semibold text-white">
                      {elementLabels[element][locale]}
                    </h2>
                    <p className="text-white/50 text-sm">
                      {elementDescriptions[element][locale]}
                    </p>
                  </div>
                </div>
              </div>

              {/* Zodiac Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
                {groupedSigns[element].map((sign) => (
                  <ZodiacCard
                    key={sign.id}
                    sign={sign.id}
                    locale={locale}
                    size="lg"
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

function getElementGradient(element: Element): string {
  const gradients: Record<Element, string> = {
    fire: 'from-red-500/20 to-orange-500/20',
    earth: 'from-green-500/20 to-lime-500/20',
    air: 'from-blue-500/20 to-cyan-500/20',
    water: 'from-violet-500/20 to-indigo-500/20',
  };
  return gradients[element];
}
