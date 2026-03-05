export interface BlogSection {
  type: 'h2' | 'h3' | 'p' | 'ul' | 'quote';
  text?: string;
  items?: string[];
}

export interface BlogLocaleContent {
  title: string;
  excerpt: string;
  sections: BlogSection[];
}

export interface BlogArticle {
  slug: string;
  category: 'basics' | 'zodiac';
  sign?: string;
  publishedAt: string;
  readingTime: number;
  content: {
    ko: BlogLocaleContent;
    en: BlogLocaleContent;
    zh: BlogLocaleContent;
    ja: BlogLocaleContent;
    es: BlogLocaleContent;
  };
}
