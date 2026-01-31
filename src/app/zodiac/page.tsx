import { Metadata } from 'next';
import { zodiacSigns } from '@/data/zodiac-signs';
import { type Element, type ZodiacSign } from '@/types/zodiac';
import ZodiacCard from '@/components/ui/ZodiacCard';

export const metadata: Metadata = {
  title: '12별자리 - 별자리 운세',
  description: '양자리부터 물고기자리까지, 12별자리의 특성과 성격을 알아보세요.',
  keywords: ['zodiac', 'horoscope', 'astrology', '별자리', '운세', '점성술'],
};

const elementLabels: Record<Element, string> = {
  fire: '불의 별자리',
  earth: '흙의 별자리',
  air: '공기의 별자리',
  water: '물의 별자리',
};

const elementDescriptions: Record<Element, string> = {
  fire: '열정적이고 활기찬 에너지',
  earth: '실용적이고 안정적인 성향',
  air: '지적이고 소통을 중시',
  water: '감성적이고 직관적인 성향',
};

const elementEmojis: Record<Element, string> = {
  fire: '\u{1F525}',
  earth: '\u{1F33F}',
  air: '\u{1F4A8}',
  water: '\u{1F4A7}',
};

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

function getElementGradient(element: Element): string {
  const gradients: Record<Element, string> = {
    fire: 'from-red-500/20 to-orange-500/20',
    earth: 'from-green-500/20 to-lime-500/20',
    air: 'from-blue-500/20 to-cyan-500/20',
    water: 'from-violet-500/20 to-indigo-500/20',
  };
  return gradients[element];
}

export default async function ZodiacListPage() {
  const groupedSigns = groupByElement(zodiacSigns);
  const elementOrder: Element[] = ['fire', 'earth', 'air', 'water'];

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">12별자리</span>
          </h1>
          <p className="text-white/60 text-lg">
            별자리를 선택하여 자세한 정보를 확인하세요
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
                      {elementLabels[element]}
                    </h2>
                    <p className="text-white/50 text-sm">
                      {elementDescriptions[element]}
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
