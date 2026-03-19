/**
 * robots.ts — GEO-optimized (Generative Engine Optimization)
 * NOTE: public/robots.txt takes precedence in Next.js static serving.
 * This file serves as fallback and must stay in sync with public/robots.txt.
 *
 * Strategy: Explicitly allow all major AI crawlers for maximum GEO exposure.
 * Disallow only private/auth pages and internal API endpoints.
 */
import type { MetadataRoute } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://luckytoday.one';

const PRIVATE_PATHS = ['/login', '/signup', '/profile', '/api/push/'];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // ─── Google AdSense (허용 필수 — 광고 매칭) ───────────────
      { userAgent: 'Mediapartners-Google', allow: '/' },
      { userAgent: 'AdsBot-Google', allow: '/' },
      { userAgent: 'AdsBot-Google-Mobile', allow: '/' },

      // ─── Google-Extended (Gemini AI — GEO) ────────────────────
      { userAgent: 'Google-Extended', allow: '/' },

      // ─── Googlebot ────────────────────────────────────────────
      { userAgent: 'Googlebot', allow: '/', disallow: PRIVATE_PATHS },
      { userAgent: 'Googlebot-Image', allow: '/' },
      { userAgent: 'Googlebot-News', allow: '/' },

      // ─── Bing ─────────────────────────────────────────────────
      { userAgent: 'Bingbot', allow: '/', disallow: PRIVATE_PATHS },
      { userAgent: 'MicrosoftPreview', allow: '/' },

      // ─── OpenAI / ChatGPT (GEO 핵심) ──────────────────────────
      { userAgent: 'GPTBot', allow: '/', disallow: PRIVATE_PATHS },
      { userAgent: 'ChatGPT-User', allow: '/' },

      // ─── Anthropic / Claude (GEO) ─────────────────────────────
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'anthropic-ai', allow: '/' },

      // ─── Perplexity AI (GEO) ──────────────────────────────────
      { userAgent: 'PerplexityBot', allow: '/' },

      // ─── Apple Intelligence (GEO) ─────────────────────────────
      { userAgent: 'Applebot', allow: '/' },
      { userAgent: 'Applebot-Extended', allow: '/' },

      // ─── Meta AI (GEO) ────────────────────────────────────────
      { userAgent: 'Meta-ExternalAgent', allow: '/' },
      { userAgent: 'Meta-ExternalFetcher', allow: '/' },

      // ─── Amazon / Alexa (GEO) ─────────────────────────────────
      { userAgent: 'Amazonbot', allow: '/' },

      // ─── Cohere AI (GEO) ──────────────────────────────────────
      { userAgent: 'cohere-ai', allow: '/' },

      // ─── You.com AI Search (GEO) ──────────────────────────────
      { userAgent: 'YouBot', allow: '/' },

      // ─── Diffbot 지식 그래프 (GEO) ────────────────────────────
      { userAgent: 'Diffbot', allow: '/' },

      // ─── 아시아 검색엔진 ──────────────────────────────────────
      { userAgent: 'Yeti', allow: '/' },
      { userAgent: 'DuckDuckBot', allow: '/' },

      // ─── 기본 규칙 ────────────────────────────────────────────
      // /api/og: OG 이미지 엔드포인트 — 소셜/AI 미리보기에 필요
      {
        userAgent: '*',
        allow: ['/', '/api/og'],
        disallow: [
          '/login',
          '/signup',
          '/profile',
          '/api/push/',
          '/api/share-card',
          '/api/horoscope/',
          '/api/birth-chart',
          '/api/compatibility',
          '/_next/static/',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
