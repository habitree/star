'use client';

import { useState, useRef, useEffect } from 'react';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { locales, type Locale } from '@/i18n/config';

const languageNames: Record<Locale, { native: string; flag: string }> = {
  ko: { native: '한국어', flag: '🇰🇷' },
  en: { native: 'English', flag: '🇺🇸' },
  zh: { native: '中文', flag: '🇨🇳' },
  ja: { native: '日本語', flag: '🇯🇵' },
  es: { native: 'Español', flag: '🇪🇸' },
};

export default function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = params.locale as Locale;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const handleLanguageChange = (newLocale: Locale) => {
    // Replace the current locale in the pathname with the new locale
    const newPathname = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
    router.push(newPathname);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
        aria-label="Select language"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="text-base">{languageNames[currentLocale].flag}</span>
        <span className="text-sm text-white/80 hidden sm:inline">
          {languageNames[currentLocale].native}
        </span>
        <svg
          className={`w-4 h-4 text-white/50 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      <div
        className={`dropdown-menu ${isOpen ? 'open' : ''}`}
        role="listbox"
        aria-label="Language options"
      >
        {locales.map((locale) => (
          <button
            key={locale}
            onClick={() => handleLanguageChange(locale)}
            className={`dropdown-item w-full flex items-center gap-3 ${
              locale === currentLocale ? 'bg-white/10 text-white' : ''
            }`}
            role="option"
            aria-selected={locale === currentLocale}
          >
            <span className="text-base">{languageNames[locale].flag}</span>
            <span>{languageNames[locale].native}</span>
            {locale === currentLocale && (
              <svg
                className="w-4 h-4 ml-auto text-zodiac-primary"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
