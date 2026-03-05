'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

const COOKIE_CONSENT_KEY = 'cookie-consent-accepted';

export default function CookieConsent() {
  const t = useTranslations('cookie');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!accepted) {
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-fade-in-up">
      <div className="max-w-4xl mx-auto glass-card p-4 md:p-6 flex flex-col sm:flex-row items-center gap-4">
        <div className="flex-1 text-sm text-white/80">
          <p>
            {t('message')}{' '}
            <Link
              href="/privacy"
              className="text-purple-400 hover:text-purple-300 underline"
            >
              {t('privacyLink')}
            </Link>
          </p>
        </div>
        <button
          onClick={handleAccept}
          className="flex-shrink-0 px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-full text-sm hover:opacity-90 transition-opacity"
        >
          {t('accept')}
        </button>
      </div>
    </div>
  );
}
