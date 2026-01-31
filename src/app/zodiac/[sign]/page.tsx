import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { zodiacSigns } from '@/data/zodiac-signs';
import { type ZodiacSignId } from '@/types/zodiac';
import { isValidZodiacSign, ZODIAC_ORDER } from '@/lib/zodiac-utils';
import ZodiacHeader from '@/components/zodiac/ZodiacHeader';
import TraitsSection from '@/components/zodiac/TraitsSection';
import CompatibilityPreview from '@/components/zodiac/CompatibilityPreview';

interface PageProps {
  params: Promise<{ sign: string }>;
}

const dailyMessages: string[] = [
  '오늘은 새로운 기회가 찾아올 수 있습니다.',
  '긍정적인 에너지가 당신을 감싸고 있습니다.',
  '중요한 결정을 내리기 좋은 날입니다.',
  '주변 사람들과의 관계가 더욱 돈독해질 것입니다.',
];

export function generateStaticParams() {
  return ZODIAC_ORDER.map((sign) => ({ sign }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { sign } = await params;

  if (!isValidZodiacSign(sign)) {
    return { title: 'Not Found' };
  }

  const zodiacSign = zodiacSigns.find((s) => s.id === sign);
  if (!zodiacSign) {
    return { title: 'Not Found' };
  }

  const name = zodiacSign.names.ko;

  return {
    title: `${name} - 성격, 특성, 궁합 | 별자리 운세`,
    description: `${name}의 성격 특성, 긍정적/부정적 특성, 그리고 다른 별자리와의 궁합을 알아보세요.`,
    keywords: [zodiacSign.names.en.toLowerCase(), 'zodiac', 'horoscope', 'compatibility', name, '별자리', '운세'],
  };
}

function getRandomScore(signId: string): number {
  const today = new Date();
  const seed = today.getDate() + today.getMonth() * 31 + signId.length;
  return 65 + (seed % 30);
}

function getRandomMessage(signId: string): string {
  const today = new Date();
  const seed = today.getDate() + signId.length;
  return dailyMessages[seed % dailyMessages.length];
}

export default async function ZodiacDetailPage({ params }: PageProps) {
  const { sign } = await params;

  if (!isValidZodiacSign(sign)) {
    notFound();
  }

  const zodiacSign = zodiacSigns.find((s) => s.id === sign);
  if (!zodiacSign) {
    notFound();
  }

  const fortuneScore = getRandomScore(sign);
  const fortuneMessage = getRandomMessage(sign);

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Navigation */}
        <nav className="mb-6">
          <Link
            href="/zodiac"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors"
          >
            <span>&#x2190;</span>
            <span>별자리 목록</span>
          </Link>
        </nav>

        {/* Header Section */}
        <ZodiacHeader sign={zodiacSign} />

        {/* Traits Section */}
        <div className="mt-8">
          <TraitsSection traits={zodiacSign.traits} />
        </div>

        {/* Compatibility Section */}
        <div className="mt-8">
          <CompatibilityPreview
            currentSign={zodiacSign.id}
            compatibility={zodiacSign.compatibility}
          />
        </div>

        {/* Today's Horoscope Preview */}
        <section className="mt-8 py-8">
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-center mb-8">
            오늘의 운세 미리보기
          </h2>

          <div className="glass-card p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Score Circle */}
              <div className="flex-shrink-0">
                <div className="relative w-24 h-24">
                  <svg className="w-24 h-24 transform -rotate-90">
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      className="text-white/10"
                    />
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      stroke="url(#gradient)"
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray={`${(fortuneScore / 100) * 251.2} 251.2`}
                      strokeLinecap="round"
                      className="transition-all duration-1000"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#8B5CF6" />
                        <stop offset="100%" stopColor="#EC4899" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-white">{fortuneScore}</span>
                    <span className="text-xs text-white/50">종합운</span>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className="flex-1 text-center md:text-left">
                <p className="text-white/80 text-lg leading-relaxed mb-4">
                  {fortuneMessage}
                </p>
                <Link
                  href={`/horoscope?sign=${sign}`}
                  className="btn-primary inline-flex items-center gap-2"
                >
                  자세히 보기
                  <span>&#x2192;</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
