'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUser, useAuthStore } from '@/stores/auth-store';
import LanguageSelector from '@/components/ui/LanguageSelector';
import { type Locale } from '@/i18n/config';

interface HeaderProps {
  locale?: Locale;
}

export default function Header({ locale = 'ko' }: HeaderProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const user = useUser();
  const isHydrated = useAuthStore((s) => s.isHydrated);

  const navItems = [
    { href: `/${locale}`, label: locale === 'ko' ? '홈' : locale === 'en' ? 'Home' : locale === 'zh' ? '首页' : locale === 'ja' ? 'ホーム' : 'Inicio' },
    { href: `/${locale}/horoscope`, label: locale === 'ko' ? '오늘의 운세' : locale === 'en' ? 'Horoscope' : locale === 'zh' ? '运势' : locale === 'ja' ? '運勢' : 'Horoscopo' },
    { href: `/${locale}/zodiac`, label: locale === 'ko' ? '별자리' : locale === 'en' ? 'Zodiac' : locale === 'zh' ? '星座' : locale === 'ja' ? '星座' : 'Zodiaco' },
    { href: `/${locale}/compatibility`, label: locale === 'ko' ? '궁합' : locale === 'en' ? 'Compatibility' : locale === 'zh' ? '配对' : locale === 'ja' ? '相性' : 'Compatibilidad' },
    { href: `/${locale}/birth-chart`, label: locale === 'ko' ? '출생차트' : locale === 'en' ? 'Birth Chart' : locale === 'zh' ? '出生图' : locale === 'ja' ? '出生図' : 'Carta Natal' },
  ];

  const isActive = (href: string) => {
    if (href === `/${locale}`) {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-zodiac-dark/60 border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.3)]">
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-zodiac-primary/50 to-transparent" />
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-2 group">
            <span className="text-2xl transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 drop-shadow-glow-primary">✨</span>
            <span className="font-display text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-zodiac-light group-hover:from-zodiac-primary group-hover:to-zodiac-secondary transition-all">
              LuckyToday
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link text-sm font-medium tracking-wide ${isActive(item.href) ? 'active! text-zodiac-primary drop-shadow-[0_0_8px_rgba(139,92,246,0.5)]' : 'text-white/60 hover:text-white'}`}
              >
                {item.label}
              </Link>
            ))}
            {isHydrated && (
              user ? (
                <Link
                  href="/profile"
                  className={`nav-link ${pathname === '/profile' ? 'active' : ''}`}
                >
                  {locale === 'ko' ? '프로필' : 'Profile'}
                </Link>
              ) : (
                <Link href="/login" className="nav-link">
                  {locale === 'ko' ? '로그인' : 'Login'}
                </Link>
              )
            )}
            {/* 언어 선택기 */}
            <LanguageSelector />
          </nav>

          {/* Mobile: Language selector + Menu button */}
          <div className="flex items-center gap-3">
            {/* Mobile: Language selector (항상 표시) */}
            <div className="md:hidden">
              <LanguageSelector />
            </div>

            {isHydrated && (
              user ? (
                <Link
                  href="/profile"
                  className="hidden md:block px-3 py-2 text-sm text-white/80 hover:text-white"
                >
                  {locale === 'ko' ? '프로필' : 'Profile'}
                </Link>
              ) : null
            )}

            <button
              className="md:hidden p-2 text-white/70 hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-white/10">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-3 rounded-lg transition-colors ${isActive(item.href)
                      ? 'bg-white/10 text-white'
                      : 'text-white/70 hover:bg-white/5 hover:text-white'
                    }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              {isHydrated && (
                user ? (
                  <Link
                    href="/profile"
                    className={`px-4 py-3 rounded-lg transition-colors ${pathname === '/profile'
                        ? 'bg-white/10 text-white'
                        : 'text-white/70 hover:bg-white/5 hover:text-white'
                      }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {locale === 'ko' ? '프로필' : 'Profile'}
                  </Link>
                ) : (
                  <Link
                    href="/login"
                    className="px-4 py-3 rounded-lg text-white/70 hover:bg-white/5 hover:text-white"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {locale === 'ko' ? '로그인' : 'Login'}
                  </Link>
                )
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
