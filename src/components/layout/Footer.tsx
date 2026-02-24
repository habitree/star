'use client';

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { href: '/about', label: '소개' },
    { href: '/privacy', label: '개인정보처리방침' },
    { href: '/terms', label: '이용약관' },
    { href: '/contact', label: '문의하기' },
  ];

  const contentLinks = [
    { href: '/horoscope', label: '오늘의 운세' },
    { href: '/horoscope/daily', label: '12별자리 일일 운세' },
    { href: '/zodiac', label: '12별자리 목록' },
    { href: '/compatibility', label: '별자리 궁합' },
    { href: '/birth-chart', label: '출생 차트' },
  ];

  return (
    <footer className="border-t border-white/10 bg-zodiac-dark/50 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="text-2xl">&#x2B50;</span>
              <span className="font-display text-xl font-bold text-gradient">
                별자리 운세
              </span>
            </Link>
            <p className="text-white/60 text-sm max-w-md">
              12별자리의 오늘의 운세, 별자리 궁합, 출생 차트를 확인하세요. 매일 업데이트되는 정확한 운세 정보를 제공합니다.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">바로가기</h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 주요 콘텐츠 (SEO 내부 링크) */}
          <div>
            <h3 className="font-semibold text-white mb-4">주요 콘텐츠</h3>
            <ul className="space-y-2">
              {contentLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">
            &copy; {currentYear} 별자리 운세. 모든 권리 보유.
          </p>

          {/* Social Links - 소셜 계정 개설 후 활성화 */}
        </div>
      </div>
    </footer>
  );
}
