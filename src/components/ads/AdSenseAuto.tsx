'use client';

/**
 * Google AdSense 자동 광고 컴포넌트
 *
 * 자동 광고(Auto ads)는 layout.tsx의 next/script로 adsbygoogle.js를 로드하면
 * Google이 자동으로 페이지를 분석하여 최적 위치에 광고를 배치합니다.
 * 별도의 push({}) 호출이 필요 없습니다.
 *
 * 이 컴포넌트는 하위 호환성을 위해 유지하되, 실제 동작은 하지 않습니다.
 */
export default function AdSenseAuto() {
  return null;
}

// TypeScript를 위한 전역 타입 선언 (Google AdSense 스크립트가 배열 + loaded 속성 사용)
declare global {
  interface Window {
    adsbygoogle: unknown[] & { loaded?: boolean };
  }
}
