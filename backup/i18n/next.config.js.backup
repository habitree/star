const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Cloudflare Pages 호환성 설정
  images: {
    unoptimized: true,
  },
};

module.exports = withNextIntl(nextConfig);
