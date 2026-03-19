'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { href: '/about', label: t('about') },
    { href: '/how-it-works', label: t('howItWorks') },
    { href: `/${locale}/privacy`, label: t('privacy') },
    { href: '/terms', label: t('terms') },
    { href: '/contact', label: t('contact') },
  ];

  const contentLinks = [
    { href: '/horoscope', label: t('dailyHoroscope') },
    { href: '/horoscope/daily', label: t('allSigns') },
    { href: '/zodiac', label: t('zodiacSigns') },
    { href: '/compatibility', label: t('compatibility') },
    { href: '/birth-chart', label: t('birthChart') },
    { href: '/blog', label: t('blog') },
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
                {t('logo')}
              </span>
            </Link>
            <p className="text-white/60 text-sm max-w-md">
              {t('description')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">{t('quickLinks')}</h3>
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

          {/* Main Content (SEO internal links) */}
          <div>
            <h3 className="font-semibold text-white mb-4">{t('mainContent')}</h3>
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
        <div className="pt-8 border-t border-white/10 text-center">
          <p className="text-white/40 text-sm">
            &copy; {currentYear} {t('logo')}. {t('allRightsReserved')}
          </p>
        </div>
      </div>
    </footer>
  );
}
