import { Metadata } from 'next';
import Link from 'next/link';
import { locales, type Locale } from '@/i18n/config';
import { getSiteUrl } from '@/lib/site-url';
import { buildLanguageAlternates } from '@/lib/seo-utils';
import { allArticles } from '@/data/blog';

const BLOG_META = {
  ko: { title: '별자리 점성술 가이드 & 블로그', description: '서양 점성술의 기초부터 12별자리 심층 분석까지. 운세, 궁합, 달의 위상, 수성 역행에 대한 전문 가이드를 만나보세요.', basics: '점성술 기초', zodiac: '별자리 가이드', readMore: '자세히 읽기', min: '분 읽기' },
  en: { title: 'Astrology Guides & Blog', description: 'From Western astrology basics to deep-dive zodiac sign analyses. Expert guides on horoscopes, compatibility, moon phases, and Mercury retrograde.', basics: 'Astrology Basics', zodiac: 'Zodiac Guides', readMore: 'Read More', min: 'min read' },
  zh: { title: '占星指南与博客', description: '从西方占星基础到12星座深度分析。星座运势、配对、月相和水星逆行的专业指南。', basics: '占星基础', zodiac: '星座指南', readMore: '阅读更多', min: '分钟阅读' },
  ja: { title: '占星術ガイド＆ブログ', description: '西洋占星術の基礎から12星座の深掘り分析まで。運勢、相性、月相、水星逆行についての専門ガイド。', basics: '占星術の基礎', zodiac: '星座ガイド', readMore: '続きを読む', min: '分で読める' },
  es: { title: 'Guías de Astrología y Blog', description: 'Desde los fundamentos de la astrología occidental hasta análisis profundos de los signos zodiacales.', basics: 'Fundamentos de Astrología', zodiac: 'Guías Zodiacales', readMore: 'Leer más', min: 'min de lectura' },
} as const;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = locales.includes(locale as Locale) ? (locale as Locale) : 'ko';
  const meta = BLOG_META[safeLocale];
  const baseUrl = getSiteUrl();
  const url = `${baseUrl}/${safeLocale}/blog`;
  return {
    title: meta.title,
    description: meta.description,
    openGraph: { title: meta.title, description: meta.description, url, type: 'website' },
    alternates: { canonical: url, languages: buildLanguageAlternates(baseUrl, '/blog') },
  };
}

export default async function BlogListPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const safeLocale = locales.includes(locale as Locale) ? (locale as Locale) : 'ko';
  const tl = BLOG_META[safeLocale];

  const basicArticles = allArticles.filter((a) => a.category === 'basics');
  const zodiacArticles = allArticles.filter((a) => a.category === 'zodiac');

  const getContent = (article: (typeof allArticles)[0]) =>
    (article.content as Record<string, { title: string; excerpt: string }>)[safeLocale] ??
    article.content.ko;

  const ArticleCard = ({ article }: { article: (typeof allArticles)[0] }) => {
    const content = getContent(article);
    return (
      <Link
        href={`/${safeLocale}/blog/${article.slug}`}
        className="glass-card p-5 hover:bg-white/10 transition-colors group"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-white/40">
            {article.publishedAt} · {article.readingTime}{tl.min}
          </span>
        </div>
        <h3 className="text-base font-semibold text-white group-hover:text-purple-300 transition-colors leading-snug mb-2">
          {content.title}
        </h3>
        <p className="text-white/60 text-sm leading-relaxed line-clamp-2">
          {content.excerpt}
        </p>
        <span className="mt-3 inline-block text-xs text-purple-400 group-hover:text-purple-300">
          {tl.readMore} →
        </span>
      </Link>
    );
  };

  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
            ✨ {tl.title}
          </h1>
          <p className="text-white/60 max-w-2xl mx-auto leading-relaxed">
            {tl.description}
          </p>
        </div>

        {/* Basics Section */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-white mb-5 pb-2 border-b border-white/10">
            📚 {tl.basics}
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {basicArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </section>

        {/* Zodiac Guides */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-5 pb-2 border-b border-white/10">
            ♈ {tl.zodiac}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {zodiacArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
