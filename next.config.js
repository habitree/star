/** @type {import('next').NextConfig} */
const nextConfig = {
  // Cloudflare Pages 호환성 설정
  images: {
    unoptimized: true,
  },
  // OneDrive 환경에서 sharp DLL 복사 오류 방지
  outputFileTracingExcludes: {
    '*': ['node_modules/@img/sharp-win32-x64/**', 'node_modules/sharp/**'],
  },
};

export default nextConfig;
