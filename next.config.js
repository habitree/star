import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Cloudflare Pages 호환성 설정
  images: {
    unoptimized: true,
  },
  // OneDrive 환경에서 sharp DLL 복사 오류 방지
  // sign-templates, element-templates는 Supabase에서 런타임 로드하므로 번들 제외
  outputFileTracingExcludes: {
    '*': [
      'node_modules/@img/sharp-win32-x64/**',
      'node_modules/sharp/**',
      'src/data/sign-templates/**',
      'src/data/element-templates.ts',
    ],
  },
};

export default withNextIntl(nextConfig);
