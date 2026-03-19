export type { BlogArticle, BlogSection, BlogLocaleContent } from './types';
export { basicArticles } from './basics';
export { zodiacGuides1 } from './zodiac-guides-1';
export { zodiacGuides2 } from './zodiac-guides-2';
export { advancedGuides } from './advanced-guides';

import { basicArticles } from './basics';
import { zodiacGuides1 } from './zodiac-guides-1';
import { zodiacGuides2 } from './zodiac-guides-2';
import { advancedGuides } from './advanced-guides';
import type { BlogArticle } from './types';

export const allArticles: BlogArticle[] = [
  ...basicArticles,
  ...zodiacGuides1,
  ...zodiacGuides2,
  ...advancedGuides,
];

export function getArticleBySlug(slug: string): BlogArticle | undefined {
  return allArticles.find((a) => a.slug === slug);
}

export function getArticlesByCategory(category: 'basics' | 'zodiac'): BlogArticle[] {
  return allArticles.filter((a) => a.category === category);
}
