import type { MetadataRoute } from 'next';
import { ZODIAC_ORDER } from '@/lib/zodiac-utils';
import { locales } from '@/i18n/config';
import { allArticles } from '@/data/blog';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://luckytoday.one';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  // 루트 리다이렉트 (기본 로케일로 리다이렉트)
  entries.push({
    url: baseUrl,
    lastModified: now,
    changeFrequency: 'daily',
    priority: 1,
  });

  for (const locale of locales) {
    // 정적 라우트
    const staticRoutes = [
      { path: '', priority: 1.0, freq: 'daily' as const },
      { path: '/horoscope', priority: 0.9, freq: 'daily' as const },
      { path: '/horoscope/daily', priority: 0.9, freq: 'daily' as const },
      { path: '/zodiac', priority: 0.9, freq: 'weekly' as const },
      { path: '/compatibility', priority: 0.8, freq: 'weekly' as const },
      { path: '/birth-chart', priority: 0.8, freq: 'weekly' as const },
    ];

    for (const route of staticRoutes) {
      entries.push({
        url: `${baseUrl}/${locale}${route.path}`,
        lastModified: now,
        changeFrequency: route.freq,
        priority: locale === 'ko' ? route.priority : route.priority * 0.9,
      });
    }

    // 일일 운세 별자리별 페이지
    for (const sign of ZODIAC_ORDER) {
      entries.push({
        url: `${baseUrl}/${locale}/horoscope/daily/${sign}`,
        lastModified: now,
        changeFrequency: 'daily',
        priority: locale === 'ko' ? 0.8 : 0.7,
      });
    }

    // 별자리 상세 페이지
    for (const sign of ZODIAC_ORDER) {
      entries.push({
        url: `${baseUrl}/${locale}/zodiac/${sign}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: locale === 'ko' ? 0.8 : 0.7,
      });
    }

    // 블로그 목록 페이지
    entries.push({
      url: `${baseUrl}/${locale}/blog`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: locale === 'ko' ? 0.8 : 0.7,
    });

    // 블로그 아티클 페이지 (17 articles × 5 locales = 85 pages)
    for (const article of allArticles) {
      entries.push({
        url: `${baseUrl}/${locale}/blog/${article.slug}`,
        lastModified: new Date(article.publishedAt),
        changeFrequency: 'monthly',
        priority: locale === 'ko' ? 0.75 : 0.65,
      });
    }

    // 궁합 결과 페이지: 12×11 pairs × 5 locales = 660
    for (const sign1 of ZODIAC_ORDER) {
      for (const sign2 of ZODIAC_ORDER) {
        if (sign1 === sign2) continue;
        entries.push({
          url: `${baseUrl}/${locale}/compatibility/${sign1}/${sign2}`,
          lastModified: now,
          changeFrequency: 'weekly',
          priority: locale === 'ko' ? 0.6 : 0.5,
        });
      }
    }
  }

  return entries;
}
