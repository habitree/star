/**
 * SEO 공통 유틸리티
 * - buildLanguageAlternates: 모든 페이지의 hreflang alternates 생성 (x-default 포함)
 */

import { locales } from '@/i18n/config';

/**
 * hreflang alternates 객체 생성
 * x-default = 한국어(ko) URL
 *
 * @param baseUrl 사이트 기본 URL (예: https://luckytoday.one)
 * @param path 경로 (예: /horoscope/daily/aries)
 */
export function buildLanguageAlternates(
  baseUrl: string,
  path: string,
): Record<string, string> {
  const langs: Record<string, string> = {};
  for (const loc of locales) {
    langs[loc] = `${baseUrl}/${loc}${path}`;
  }
  // x-default: 언어 선택 전 기본 URL = 한국어
  langs['x-default'] = `${baseUrl}/ko${path}`;
  return langs;
}
