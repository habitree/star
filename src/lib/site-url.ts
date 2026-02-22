/**
 * SEO·메타용 사이트 절대 URL (배포 도메인)
 */
export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? 'https://luckytoday.one';
}
