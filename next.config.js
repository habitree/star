/** @type {import('next').NextConfig} */
const nextConfig = {
  // Cloudflare Pages 호환성 설정
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
