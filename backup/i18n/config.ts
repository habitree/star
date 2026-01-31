export const locales = ['ko', 'en', 'zh', 'ja', 'es'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'ko';
