import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/i18n/config';
import { getSiteUrl } from '@/lib/site-url';
import { buildLanguageAlternates } from '@/lib/seo-utils';
import { allArticles, getArticleBySlug } from '@/data/blog';
import { isAdSenseEnabled } from '@/lib/adsense-config';
import { AdSenseInArticle } from '@/components/ads';
import AffiliateBanner from '@/components/ads/AffiliateBanner';
import JsonLd from '@/components/seo/JsonLd';
import type { BlogSection } from '@/data/blog';

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    allArticles.map((article) => ({ locale, slug: article.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const safeLocale = locales.includes(locale as Locale) ? (locale as Locale) : 'ko';
  const article = getArticleBySlug(slug);
  if (!article) return { title: 'Not Found' };

  const content = (article.content as Record<string, { title: string; excerpt: string }>)[safeLocale] ?? article.content.ko;
  const baseUrl = getSiteUrl();
  const url = `${baseUrl}/${safeLocale}/blog/${slug}`;

  const ogImageUrl = `${baseUrl}/api/og?title=${encodeURIComponent(content.title)}`;

  return {
    title: content.title,
    description: content.excerpt,
    openGraph: {
      title: content.title,
      description: content.excerpt,
      url,
      type: 'article',
      publishedTime: article.publishedAt,
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: content.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: content.title,
      description: content.excerpt,
      images: [ogImageUrl],
    },
    alternates: {
      canonical: url,
      languages: buildLanguageAlternates(baseUrl, `/blog/${slug}`),
    },
  };
}

function renderSection(section: BlogSection, idx: number) {
  switch (section.type) {
    case 'h2':
      return (
        <h2 key={idx} className="text-xl font-semibold text-white mt-8 mb-3">
          {section.text}
        </h2>
      );
    case 'h3':
      return (
        <h3 key={idx} className="text-lg font-semibold text-white/90 mt-6 mb-2">
          {section.text}
        </h3>
      );
    case 'p':
      return (
        <p key={idx} className="text-white/75 leading-relaxed mb-4">
          {section.text}
        </p>
      );
    case 'ul':
      return (
        <ul key={idx} className="space-y-2 mb-4 pl-2">
          {section.items?.map((item, i) => (
            <li key={i} className="flex gap-2 text-white/70 text-sm leading-relaxed">
              <span className="text-purple-400 mt-0.5 shrink-0">▸</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case 'quote':
      return (
        <blockquote
          key={idx}
          className="border-l-4 border-purple-500 pl-4 py-2 my-6 bg-white/5 rounded-r-lg"
        >
          <p className="text-white/80 italic text-sm leading-relaxed">{section.text}</p>
        </blockquote>
      );
    default:
      return null;
  }
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const safeLocale = locales.includes(locale as Locale) ? (locale as Locale) : 'ko';
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const content = (article.content as Record<string, { title: string; excerpt: string; sections: BlogSection[] }>)[safeLocale] ?? article.content.ko;
  const adsEnabled = isAdSenseEnabled();
  const baseUrl = getSiteUrl();
  const pageUrl = `${baseUrl}/${safeLocale}/blog/${slug}`;

  const blogPostingJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: content.title,
    description: content.excerpt,
    url: pageUrl,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    inLanguage: safeLocale,
    articleSection: article.category === 'basics' ? 'Astrology Basics' : 'Zodiac Guides',
    author: { '@type': 'Organization', name: 'LuckyToday', url: baseUrl },
    publisher: {
      '@type': 'Organization',
      name: 'LuckyToday',
      url: baseUrl,
      logo: { '@type': 'ImageObject', url: `${baseUrl}/api/og` },
    },
    image: `${baseUrl}/api/og?title=${encodeURIComponent(content.title)}`,
  };

  const BACK_LABEL: Record<string, string> = {
    ko: '← 블로그 목록으로',
    en: '← Back to Blog',
    zh: '← 返回博客列表',
    ja: '← ブログ一覧に戻る',
    es: '← Volver al Blog',
  };

  const MIN_LABEL: Record<string, string> = {
    ko: '분 읽기', en: 'min read', zh: '分钟阅读', ja: '分で読める', es: 'min de lectura',
  };

  const DISCLAIMER: Record<string, string> = {
    ko: '이 콘텐츠는 오락 및 참고 목적으로만 제공됩니다. 의료·재정·법적 조언이 아닙니다.',
    en: 'This content is for entertainment purposes only and is not medical, financial, or legal advice.',
    zh: '本内容仅供娱乐参考，不构成医疗、财务或法律建议。',
    ja: 'このコンテンツは娯楽および参考目的のみで提供されます。医療・財務・法的助言ではありません。',
    es: 'Este contenido es solo para entretenimiento y no constituye asesoramiento médico, financiero o legal.',
  };

  const RELATED_LABEL: Record<string, string> = {
    ko: '관련 서비스',
    en: 'Related Services',
    zh: '相关服务',
    ja: '関連サービス',
    es: 'Servicios Relacionados',
  };

  // 섹션을 3개 단위로 분할하여 AdSense 삽입
  const sections = content.sections;
  const sectionGroups: BlogSection[][] = [];
  for (let i = 0; i < sections.length; i += 3) {
    sectionGroups.push(sections.slice(i, i + 3));
  }

  return (
    <main className="min-h-screen py-12 px-4">
      <JsonLd data={blogPostingJsonLd} />
      <div className="max-w-2xl mx-auto">
        {/* Back link */}
        <Link
          href={`/${safeLocale}/blog`}
          className="text-white/50 hover:text-white text-sm mb-8 inline-block transition-colors"
        >
          {BACK_LABEL[safeLocale] ?? BACK_LABEL.ko}
        </Link>

        {/* 면책조항 배너 */}
        <div className="flex items-start gap-2 mb-6 px-4 py-3 rounded-lg bg-amber-500/10 border border-amber-500/25 text-amber-200/80 text-xs leading-relaxed">
          <span className="shrink-0 mt-0.5">⚠️</span>
          <p>{DISCLAIMER[safeLocale] ?? DISCLAIMER.en}</p>
        </div>

        {/* Article header */}
        <article>
          <header className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs text-white/40">{article.publishedAt}</span>
              <span className="text-white/20">·</span>
              <span className="text-xs text-white/40">
                {article.readingTime} {MIN_LABEL[safeLocale] ?? MIN_LABEL.ko}
              </span>
              <span className="text-white/20">·</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300">
                {article.category === 'basics' ? '점성술 기초' : '별자리 가이드'}
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl font-serif font-bold text-white leading-tight mb-4">
              {content.title}
            </h1>

            <p className="text-white/60 leading-relaxed text-sm border-l-2 border-purple-500/50 pl-4">
              {content.excerpt}
            </p>
          </header>

          {/* Article body — 3섹션마다 InArticle 광고 삽입 */}
          <div className="glass-card p-6 md:p-8">
            {sectionGroups.map((group, groupIdx) => (
              <div key={groupIdx}>
                {group.map((section, sectionIdx) =>
                  renderSection(section, groupIdx * 3 + sectionIdx)
                )}
                {/* 마지막 그룹 제외하고 광고 삽입 */}
                {adsEnabled && groupIdx < sectionGroups.length - 1 && (
                  <AdSenseInArticle className="w-full" />
                )}
              </div>
            ))}
          </div>

          {/* 아티클 하단 어필리에이트 배너 */}
          <div className="mt-6 space-y-3">
            <p className="text-white/30 text-xs text-center uppercase tracking-widest">
              {RELATED_LABEL[safeLocale] ?? RELATED_LABEL.ko}
            </p>
            <AffiliateBanner program="keen" locale={safeLocale} variant="compact" />
          </div>

          {/* Footer nav */}
          <div className="mt-8 text-center">
            <Link
              href={`/${safeLocale}/blog`}
              className="inline-block px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white text-sm transition-colors"
            >
              {BACK_LABEL[safeLocale] ?? BACK_LABEL.ko}
            </Link>
          </div>
        </article>
      </div>
    </main>
  );
}
