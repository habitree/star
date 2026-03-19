export type { BlogArticle, BlogSection, BlogLocaleContent } from './types';
export { basicArticlesExpanded1 } from './basics-expanded-1';
export { basicArticlesExpanded2 } from './basics-expanded-2';
export { zodiacGuides1 } from './zodiac-guides-1';
export { advancedGuides } from './advanced-guides';
// Expanded individual zodiac guides (replacing zodiac-guides-2.ts)
export { cancerGuide } from './zodiac-guide-cancer';
export { leoGuide } from './zodiac-guide-leo';
export { virgoGuide } from './zodiac-guide-virgo';
export { libraScorpioSagittariusGuides } from './zodiac-guides-libra-scorpio-sagittarius';
export { capricornGuide } from './zodiac-guide-capricorn';
export { aquariusGuide } from './zodiac-guide-aquarius';
export { piscesGuide } from './zodiac-guide-pisces';

import { basicArticlesExpanded1 } from './basics-expanded-1';
import { basicArticlesExpanded2 } from './basics-expanded-2';
import { zodiacGuides1 } from './zodiac-guides-1';
import { advancedGuides } from './advanced-guides';
import { cancerGuide } from './zodiac-guide-cancer';
import { leoGuide } from './zodiac-guide-leo';
import { virgoGuide } from './zodiac-guide-virgo';
import { libraScorpioSagittariusGuides } from './zodiac-guides-libra-scorpio-sagittarius';
import { capricornGuide } from './zodiac-guide-capricorn';
import { aquariusGuide } from './zodiac-guide-aquarius';
import { piscesGuide } from './zodiac-guide-pisces';
import type { BlogArticle } from './types';

// Helper to normalize single or array export to array
const toArray = (x: BlogArticle | BlogArticle[]): BlogArticle[] =>
  Array.isArray(x) ? x : [x];

export const allArticles: BlogArticle[] = [
  ...basicArticlesExpanded1,
  ...basicArticlesExpanded2,
  ...zodiacGuides1,
  // zodiac-guides-2.ts removed — replaced by expanded individual files below
  ...toArray(cancerGuide),
  ...toArray(leoGuide),
  ...toArray(virgoGuide),
  ...libraScorpioSagittariusGuides,
  ...toArray(capricornGuide),
  ...toArray(aquariusGuide),
  ...toArray(piscesGuide),
  ...advancedGuides,
];

export function getArticleBySlug(slug: string): BlogArticle | undefined {
  return allArticles.find((a) => a.slug === slug);
}

export function getArticlesByCategory(category: 'basics' | 'zodiac'): BlogArticle[] {
  return allArticles.filter((a) => a.category === category);
}
