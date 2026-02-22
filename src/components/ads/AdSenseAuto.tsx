'use client';

import { useEffect } from 'react';
import { isAdSenseEnabled, getAdSensePublisherId } from '@/lib/adsense-config';

/**
 * Google AdSense 자동 광고 컴포넌트
 * Google이 페이지를 분석하여 최적 위치에 광고를 자동으로 배치합니다.
 */
export default function AdSenseAuto() {
  useEffect(() => {
    if (!isAdSenseEnabled()) {
      return;
    }

    const publisherId = getAdSensePublisherId();
    if (!publisherId) {
      return;
    }

    // 자동 광고 스크립트가 이미 로드되었는지 확인
    const ag = window.adsbygoogle;
    if (ag && 'loaded' in ag && ag.loaded) {
      return;
    }

    // AdSense 자동 광고 스크립트 로드
    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch (err) {
      console.error('AdSense auto ads error:', err);
    }
  }, []);

  // 자동 광고는 스크립트만 로드하면 되므로 빈 컴포넌트 반환
  return null;
}

// TypeScript를 위한 전역 타입 선언 (Google AdSense 스크립트가 배열 + loaded 속성 사용)
declare global {
  interface Window {
    adsbygoogle: unknown[] & { loaded?: boolean };
  }
}

