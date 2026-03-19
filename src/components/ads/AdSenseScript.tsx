'use client';

/**
 * AdSenseScript — GDPR 동의 기반 조건부 AdSense 스크립트 로더
 * cookie-consent-v2 = 'accepted' 인 경우에만 AdSense 스크립트를 로드합니다.
 */

import Script from 'next/script';
import { useState, useEffect } from 'react';
import { COOKIE_CONSENT_KEY } from '@/components/layout/CookieConsent';

const PUBLISHER_ID = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID ?? 'ca-pub-4166976105261105';

export default function AdSenseScript() {
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    // 초기 로드 시 localStorage 확인
    try {
      setConsented(localStorage.getItem(COOKIE_CONSENT_KEY) === 'accepted');
    } catch {
      // ignore
    }

    // 동의 변경 이벤트 수신
    const onUpdate = (e: Event) => {
      setConsented((e as CustomEvent<string>).detail === 'accepted');
    };
    window.addEventListener('cookie-consent-update', onUpdate);
    return () => window.removeEventListener('cookie-consent-update', onUpdate);
  }, []);

  if (!consented) return null;

  return (
    <Script
      id="adsense-script"
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${PUBLISHER_ID}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
