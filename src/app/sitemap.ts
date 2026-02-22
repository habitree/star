import type { MetadataRoute } from 'next';
import { ZODIAC_ORDER } from '@/lib/zodiac-utils';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://luckytoday.one';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/horoscope`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/horoscope/daily`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/zodiac`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/compatibility`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/birth-chart`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
  ];

  const dailySigns: MetadataRoute.Sitemap = ZODIAC_ORDER.map((sign) => ({
    url: `${baseUrl}/horoscope/daily/${sign}`,
    lastModified: now,
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }));

  const zodiacSigns: MetadataRoute.Sitemap = ZODIAC_ORDER.map((sign) => ({
    url: `${baseUrl}/zodiac/${sign}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...dailySigns, ...zodiacSigns];
}
