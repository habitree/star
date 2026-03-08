import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale, type Locale } from './i18n/config';
import { NextRequest, NextResponse } from 'next/server';

// ─── 국가 코드 → 로케일 매핑 ─────────────────────────────
// Cloudflare CF-IPCountry 헤더 기준 (ISO 3166-1 alpha-2)

const COUNTRY_TO_LOCALE: Record<string, Locale> = {
  // 한국어
  KR: 'ko',
  // 일본어
  JP: 'ja',
  // 중국어 (간체/번체 모두)
  CN: 'zh', TW: 'zh', HK: 'zh', MO: 'zh', SG: 'zh',
  // 영어
  US: 'en', GB: 'en', AU: 'en', CA: 'en', NZ: 'en',
  IE: 'en', ZA: 'en', IN: 'en', PH: 'en', NG: 'en',
  // 스페인어
  MX: 'es', ES: 'es', AR: 'es', CO: 'es', CL: 'es',
  PE: 'es', VE: 'es', EC: 'es', BO: 'es', PY: 'es',
  UY: 'es', CU: 'es', DO: 'es', GT: 'es', HN: 'es',
  SV: 'es', NI: 'es', CR: 'es', PA: 'es',
};

const LOCALE_COOKIE = 'NEXT_LOCALE';

// ─── 로케일 감지 (우선순위 순) ─────────────────────────────
// 1. Cookie (사용자가 직접 선택한 언어)
// 2. CF-IPCountry (Cloudflare 자동 IP 국가 감지)
// 3. Accept-Language (브라우저 언어 설정)
// 4. defaultLocale

function detectLocale(request: NextRequest): Locale {
  // 1. Cookie
  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value as Locale;
  if (cookieLocale && (locales as readonly string[]).includes(cookieLocale)) {
    return cookieLocale;
  }

  // 2. Cloudflare IP 국가 감지
  const cfCountry = request.headers.get('CF-IPCountry');
  if (cfCountry && COUNTRY_TO_LOCALE[cfCountry]) {
    return COUNTRY_TO_LOCALE[cfCountry];
  }

  // 3. Accept-Language 헤더
  const acceptLang = request.headers.get('Accept-Language') || '';
  for (const part of acceptLang.split(',')) {
    const lang = part.trim().split(';')[0].trim().toLowerCase();
    if (lang.startsWith('ko')) return 'ko';
    if (lang.startsWith('ja')) return 'ja';
    if (lang.startsWith('zh')) return 'zh';
    if (lang.startsWith('en')) return 'en';
    if (lang.startsWith('es')) return 'es';
  }

  return defaultLocale;
}

// ─── next-intl 미들웨어 (locale prefix 처리) ──────────────

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
  localeDetection: false, // 직접 감지하므로 next-intl 자동 감지 비활성화
});

// ─── 메인 미들웨어 ─────────────────────────────────────────

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // API 라우트 제외
  if (pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  // 정적 파일 및 Next.js 내부 경로 제외
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/favicon') ||
    pathname.startsWith('/sitemap') ||
    pathname.startsWith('/robots') ||
    pathname === '/ads.txt' ||
    pathname.match(/\.(ico|png|jpg|jpeg|gif|svg|webp|css|js|woff|woff2|ttf|txt)$/)
  ) {
    return NextResponse.next();
  }

  // locale 독립 정적 페이지 (ko 전용 — about/privacy/terms/contact)
  if (
    pathname === '/about' ||
    pathname === '/privacy' ||
    pathname === '/terms' ||
    pathname === '/contact'
  ) {
    return NextResponse.next();
  }

  // 사용자가 locale이 포함된 경로 직접 접근 시 → 그 locale을 쿠키에 저장
  // 예: /en/horoscope → 'en' 쿠키 저장 (다음 방문 시 영어 유지)
  const matchedLocale = locales.find(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
  if (matchedLocale) {
    const response = intlMiddleware(request);
    if (response) {
      response.cookies.set(LOCALE_COOKIE, matchedLocale, {
        maxAge: 60 * 60 * 24 * 365, // 1년
        path: '/',
        sameSite: 'lax',
      });
    }
    return response;
  }

  // locale 없는 경로 (루트 `/` 포함) → 자동 감지 후 리다이렉트
  const detectedLocale = detectLocale(request);
  const targetPath = pathname === '/' ? `/${detectedLocale}` : `/${detectedLocale}${pathname}`;
  const redirectUrl = new URL(targetPath, request.url);

  // 쿼리스트링 보존
  redirectUrl.search = request.nextUrl.search;

  const response = NextResponse.redirect(redirectUrl);
  response.cookies.set(LOCALE_COOKIE, detectedLocale, {
    maxAge: 60 * 60 * 24 * 365,
    path: '/',
    sameSite: 'lax',
  });
  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|ads.txt).*)',
  ],
};
