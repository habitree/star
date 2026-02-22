'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUser, useAuthStore } from '@/stores/auth-store';

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const user = useUser();
  const isHydrated = useAuthStore((s) => s.isHydrated);


  const navItems = [
    { href: '/', label: '홈' },
    { href: '/horoscope', label: '오늘의 운세' },
    { href: '/zodiac', label: '별자리' },
    { href: '/compatibility', label: '궁합' },
    { href: '/birth-chart', label: '출생차트' },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg bg-zodiac-dark/80 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl">&#x2B50;</span>
            <span className="font-display text-xl font-bold text-gradient group-hover:opacity-80 transition-opacity">
              별자리 운세
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link ${isActive(item.href) ? 'active' : ''}`}
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
                  프로필
                </Link>
              ) : (
                <Link href="/login" className="nav-link">
                  로그인
                </Link>
              )
            )}
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4">
            {isHydrated && (
              user ? (
                <Link
                  href="/profile"
                  className="md:hidden px-3 py-2 text-sm text-white/80 hover:text-white"
                >
                  프로필
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="md:hidden px-3 py-2 text-sm text-white/80 hover:text-white"
                >
                  로그인
                </Link>
              )
            )}
            <button
              className="md:hidden p-2 text-white/70 hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
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
                  className={`px-4 py-3 rounded-lg transition-colors ${
                    isActive(item.href)
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
                    className={`px-4 py-3 rounded-lg transition-colors ${
                      pathname === '/profile'
                        ? 'bg-white/10 text-white'
                        : 'text-white/70 hover:bg-white/5 hover:text-white'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    프로필
                  </Link>
                ) : (
                  <Link
                    href="/login"
                    className="px-4 py-3 rounded-lg text-white/70 hover:bg-white/5 hover:text-white"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    로그인
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
