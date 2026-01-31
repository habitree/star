import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { locales, type Locale } from '@/i18n/config';

export const runtime = 'edge';
import CompatibilityForm from '@/components/compatibility/CompatibilityForm';

interface Props {
  params: Promise<{ locale: Locale }>;
}

const pageContent: Record<Locale, { title: string; description: string; subtitle: string }> = {
  ko: {
    title: '별자리 궁합',
    description: '두 별자리의 궁합을 확인해보세요. 연애, 우정, 업무 궁합을 상세하게 분석해드립니다.',
    subtitle: '두 별자리를 선택하고 궁합을 확인하세요',
  },
  en: {
    title: 'Zodiac Compatibility',
    description: 'Check the compatibility between two zodiac signs. We provide detailed analysis for love, friendship, and work.',
    subtitle: 'Select two signs and check their compatibility',
  },
  zh: {
    title: '星座配对',
    description: '查看两个星座之间的配对情况。我们提供爱情、友情和工作的详细分析。',
    subtitle: '选择两个星座并查看配对结果',
  },
  ja: {
    title: '星座の相性',
    description: '2つの星座の相性をチェックしましょう。恋愛、友情、仕事の相性を詳しく分析します。',
    subtitle: '2つの星座を選択して相性を確認',
  },
  es: {
    title: 'Compatibilidad Zodiacal',
    description: 'Verifica la compatibilidad entre dos signos zodiacales. Proporcionamos analisis detallado para amor, amistad y trabajo.',
    subtitle: 'Selecciona dos signos y verifica su compatibilidad',
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const content = pageContent[locale] || pageContent.en;

  return {
    title: content.title,
    description: content.description,
    openGraph: {
      title: content.title,
      description: content.description,
    },
  };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function CompatibilityPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const content = pageContent[locale] || pageContent.en;

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* 페이지 헤더 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {content.title}
          </h1>
          <p className="text-lg text-white/70">
            {content.subtitle}
          </p>
        </div>

        {/* 궁합 폼 */}
        <CompatibilityForm locale={locale} />

        {/* 추가 정보 */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard
            icon={
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            }
            title={locale === 'ko' ? '연애 궁합' : locale === 'ja' ? '恋愛相性' : locale === 'zh' ? '爱情配对' : locale === 'es' ? 'Compatibilidad Amorosa' : 'Love Compatibility'}
            description={locale === 'ko' ? '로맨틱한 관계의 조화를 분석합니다' : locale === 'ja' ? 'ロマンチックな関係の調和を分析' : locale === 'zh' ? '分析浪漫关系的和谐度' : locale === 'es' ? 'Analiza la armonia romantica' : 'Analyze romantic relationship harmony'}
          />
          <InfoCard
            icon={
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
              </svg>
            }
            title={locale === 'ko' ? '우정 궁합' : locale === 'ja' ? '友情相性' : locale === 'zh' ? '友情配对' : locale === 'es' ? 'Compatibilidad de Amistad' : 'Friendship Compatibility'}
            description={locale === 'ko' ? '친구로서의 케미를 확인합니다' : locale === 'ja' ? '友人としての相性を確認' : locale === 'zh' ? '确认作为朋友的默契' : locale === 'es' ? 'Verifica la quimica como amigos' : 'Check chemistry as friends'}
          />
          <InfoCard
            icon={
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z" />
              </svg>
            }
            title={locale === 'ko' ? '업무 궁합' : locale === 'ja' ? '仕事相性' : locale === 'zh' ? '工作配对' : locale === 'es' ? 'Compatibilidad Laboral' : 'Work Compatibility'}
            description={locale === 'ko' ? '직장에서의 협력 가능성을 분석합니다' : locale === 'ja' ? '職場での協力の可能性を分析' : locale === 'zh' ? '分析工作中的合作可能性' : locale === 'es' ? 'Analiza la cooperacion laboral' : 'Analyze workplace cooperation potential'}
          />
        </div>
      </div>
    </div>
  );
}

function InfoCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="glass-card p-6 text-center">
      <div className="text-purple-400 flex justify-center mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-white/60 text-sm">{description}</p>
    </div>
  );
}
