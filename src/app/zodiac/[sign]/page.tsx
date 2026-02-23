import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { zodiacSigns } from '@/data/zodiac-signs';
import { getZodiacDetail } from '@/data/zodiac-details';
import { type ZodiacSignId } from '@/types/zodiac';
import { isValidZodiacSign, ZODIAC_ORDER } from '@/lib/zodiac-utils';
import ZodiacHeader from '@/components/zodiac/ZodiacHeader';
import DecanSection from '@/components/zodiac/DecanSection';
import ExtendedTraitsSection from '@/components/zodiac/ExtendedTraitsSection';
import CareerSection from '@/components/zodiac/CareerSection';
import HealthSection from '@/components/zodiac/HealthSection';
import FinanceSection from '@/components/zodiac/FinanceSection';
import SymbolicSection from '@/components/zodiac/SymbolicSection';
import CompatibilityPreview from '@/components/zodiac/CompatibilityPreview';
import CelebritySection from '@/components/zodiac/CelebritySection';
import MythologySection from '@/components/zodiac/MythologySection';
import ShareButton from '@/components/ui/ShareButton';
import { AdSenseInArticle } from '@/components/ads';
import { getAdSensePublisherId } from '@/lib/adsense-config';
import { getSiteUrl } from '@/lib/site-url';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import JsonLd from '@/components/seo/JsonLd';

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

  const detail = getZodiacDetail(sign as ZodiacSignId);
  const name = zodiacSign.names.ko;
  const baseUrl = getSiteUrl();
  const url = `${baseUrl}/zodiac/${sign}`;

  const decanKeywords = detail.decans.flatMap((d) => d.keywords.slice(0, 3));
  const jobKeywords = detail.career.suitableJobs.slice(0, 3).map((j) => j.title);
  const description = `${name}의 데칸별 성격, ${detail.personality.strengths.length}개 강점·약점, 직업 적성(${jobKeywords.join(', ')}), 건강, 재물운, 궁합, 신화까지. ${name} 완벽 가이드.`;

  return {
    title: `${name} 완벽 가이드 - 데칸, 성격, 직업, 건강, 궁합 | 별자리 운세`,
    description,
    keywords: [
      zodiacSign.names.en.toLowerCase(),
      name,
      `${name} 성격`,
      `${name} 궁합`,
      `${name} 직업`,
      `${name} 데칸`,
      '별자리',
      '운세',
      ...decanKeywords.slice(0, 5),
    ],
    openGraph: {
      title: `${name} 완벽 가이드 - 데칸, 성격, 직업, 건강, 궁합 | 별자리 운세`,
      description,
      url,
      type: 'website',
    },
    alternates: { canonical: url },
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

  const detail = getZodiacDetail(sign as ZodiacSignId);
  const fortuneScore = getRandomScore(sign);
  const fortuneMessage = getRandomMessage(sign);
  const baseUrl = getSiteUrl();
  const pageUrl = `${baseUrl}/zodiac/${sign}`;
  const name = zodiacSign.names.ko;

  const webPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url: pageUrl,
    name: `${name} 완벽 가이드 - 데칸, 성격, 직업, 건강, 궁합 | 별자리 운세`,
    description: `${name}의 데칸별 성격, 강점·약점, 직업 적성, 건강, 재물운, 궁합, 신화까지. ${name} 완벽 가이드.`,
    publisher: {
      '@type': 'Organization',
      name: '별자리 운세',
      url: baseUrl,
    },
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `${name}의 성격 특성은?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${name}의 주요 강점은 ${detail.personality.strengths.slice(0, 3).map((s) => s.title).join(', ')} 등이 있으며, 주의할 점으로는 ${detail.personality.weaknesses.slice(0, 3).map((w) => w.title).join(', ')} 등이 있습니다.`,
        },
      },
      {
        '@type': 'Question',
        name: `${name}에게 적합한 직업은?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${name}에게 적합한 직업으로는 ${detail.career.suitableJobs.slice(0, 5).map((j) => j.title).join(', ')} 등이 있습니다.`,
        },
      },
      {
        '@type': 'Question',
        name: `${name} 데칸 분류란?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${name}은 3개의 데칸으로 나뉩니다: 1데칸(${detail.decans[0].dateRange}), 2데칸(${detail.decans[1].dateRange}), 3데칸(${detail.decans[2].dateRange}). 각 데칸마다 부지배행성과 성격 특성이 다릅니다.`,
        },
      },
    ],
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <JsonLd data={webPageJsonLd} />
      <JsonLd data={faqJsonLd} />
      <div className="max-w-4xl mx-auto">
        <Breadcrumbs
          baseUrl={baseUrl}
          items={[
            { label: '홈', href: '/' },
            { label: '별자리', href: '/zodiac' },
            { label: name, href: `/zodiac/${sign}` },
          ]}
          className="mb-6"
        />
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
        <div className="mt-4 flex justify-end">
          <ShareButton
            title={`${name} 완벽 가이드 | 별자리 운세`}
            text={`${name} 별자리 데칸·성격·궁합·직업 완벽 가이드`}
            label="공유하기"
          />
        </div>

        {/* Decan Section */}
        <div className="mt-8">
          <DecanSection decans={detail.decans} signName={name} />
        </div>

        {/* Extended Traits Section (replaces TraitsSection) */}
        <div className="mt-8">
          <ExtendedTraitsSection personality={detail.personality} />
        </div>

        {/* Career Section */}
        <div className="mt-8">
          <CareerSection career={detail.career} />
        </div>

        {/* Health Section */}
        <div className="mt-8">
          <HealthSection health={detail.health} />
        </div>

        {/* Finance Section */}
        <div className="mt-8">
          <FinanceSection finance={detail.finance} />
        </div>

        {/* Symbolic Section */}
        <div className="mt-8">
          <SymbolicSection symbolic={detail.symbolic} />
        </div>

        {/* 콘텐츠 중간 인-아티클 광고 */}
        {getAdSensePublisherId() && (
          <div className="mt-8">
            <AdSenseInArticle
              adSlot={`${getAdSensePublisherId()}/zodiac-detail-in-article`}
              className="w-full"
            />
          </div>
        )}

        {/* Compatibility Section */}
        <div className="mt-8">
          <CompatibilityPreview
            currentSign={zodiacSign.id}
            compatibility={zodiacSign.compatibility}
          />
        </div>

        {/* Celebrity Section */}
        <div className="mt-8">
          <CelebritySection celebrities={detail.celebrities} signName={name} />
        </div>

        {/* Mythology Section */}
        <div className="mt-8">
          <MythologySection mythology={detail.mythology} />
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
                  href={`/horoscope/daily/${sign}`}
                  className="btn-primary inline-flex items-center gap-2"
                >
                  자세히 보기
                  <span>&#x2192;</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 관련 링크 (SEO·체류 강화) */}
        <section className="mt-8 glass-card p-6" aria-label="관련 콘텐츠">
          <h2 className="text-lg font-semibold text-white mb-4 text-center">
            더 알아보기
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href={`/horoscope/daily/${sign}`}
              className="px-5 py-2.5 rounded-full text-sm font-medium bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              {name} 오늘의 운세
            </Link>
            <Link
              href="/compatibility"
              className="px-5 py-2.5 rounded-full text-sm font-medium bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              별자리 궁합
            </Link>
            <Link
              href="/birth-chart"
              className="px-5 py-2.5 rounded-full text-sm font-medium bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              출생 차트
            </Link>
            <Link
              href="/horoscope/daily"
              className="px-5 py-2.5 rounded-full text-sm font-medium bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              12별자리 일일 운세
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
