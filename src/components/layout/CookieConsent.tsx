'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';

export const COOKIE_CONSENT_KEY = 'cookie-consent-v2';

export type ConsentValue = 'accepted' | 'rejected';

function getStoredConsent(): ConsentValue | null {
  try {
    return localStorage.getItem(COOKIE_CONSENT_KEY) as ConsentValue | null;
  } catch {
    return null;
  }
}

function storeConsent(value: ConsentValue) {
  try {
    localStorage.setItem(COOKIE_CONSENT_KEY, value);
    window.dispatchEvent(new CustomEvent('cookie-consent-update', { detail: value }));
  } catch {
    // ignore
  }
}

export default function CookieConsent() {
  const t = useTranslations('cookie');
  const locale = useLocale();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const existing = getStoredConsent();
    if (!existing) {
      const timer = setTimeout(() => setIsVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    storeConsent('accepted');
    setIsVisible(false);
  };

  const handleReject = () => {
    storeConsent('rejected');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-3 md:p-4 animate-fade-in-up">
      <div className="max-w-4xl mx-auto glass-card p-4 md:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1 text-sm text-white/80 leading-relaxed">
          <p>
            {t('message')}{' '}
            <Link
              href={`/${locale}/privacy`}
              className="text-purple-400 hover:text-purple-300 underline"
            >
              {t('privacyLink')}
            </Link>
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={handleReject}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white/70 font-medium rounded-full text-sm transition-colors"
          >
            {t('reject')}
          </button>
          <button
            onClick={handleAccept}
            className="px-5 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-full text-sm hover:opacity-90 transition-opacity"
          >
            {t('accept')}
          </button>
        </div>
      </div>
    </div>
  );
}
