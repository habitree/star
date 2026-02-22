'use client';

import { useEffect, useRef, useState } from 'react';
import { isAdSenseEnabled, getAdSensePublisherId } from '@/lib/adsense-config';

interface AdSenseUnitProps {
  /**
   * 광고 슬롯 ID (예: '1234567890/728x90')
   */
  adSlot: string;
  /**
   * 광고 크기 (예: '728x90', '300x250')
   */
  adFormat?: string;
  /**
   * 광고 스타일 (예: 'auto', 'horizontal', 'vertical')
   */
  adStyle?: string;
  /**
   * 반응형 광고 여부
   */
  responsive?: boolean;
  /**
   * 광고 컨테이너 클래스명
   */
  className?: string;
  /**
   * 지연 로딩 여부 (Intersection Observer 사용)
   */
  lazyLoad?: boolean;
}

/**
 * Google AdSense 수동 광고 유닛 컴포넌트
 * 
 * @example
 * <AdSenseUnit 
 *   adSlot="1234567890/728x90" 
 *   adFormat="728x90"
 *   responsive={true}
 * />
 */
export default function AdSenseUnit({
  adSlot,
  adFormat = 'auto',
  adStyle = 'display',
  responsive = true,
  className = '',
  lazyLoad = true,
}: AdSenseUnitProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(!lazyLoad);

  useEffect(() => {
    if (!isAdSenseEnabled() || !shouldLoad) {
      return;
    }

    const publisherId = getAdSensePublisherId();
    if (!publisherId) {
      return;
    }

    // 이미 로드된 경우 스킵
    if (isLoaded) {
      return;
    }

    // 광고 초기화
    try {
      if (adRef.current && !adRef.current.querySelector('ins')) {
        const ins = document.createElement('ins');
        ins.className = 'adsbygoogle';
        ins.style.display = 'block';
        ins.setAttribute('data-ad-client', publisherId);
        ins.setAttribute('data-ad-slot', adSlot);
        
        if (adFormat !== 'auto') {
          ins.setAttribute('data-ad-format', adFormat);
        }
        
        if (adStyle !== 'display') {
          ins.setAttribute('data-ad-style', adStyle);
        }
        
        if (responsive) {
          ins.setAttribute('data-full-width-responsive', 'true');
        }

        adRef.current.appendChild(ins);

        // AdSense 스크립트 푸시
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
        setIsLoaded(true);
      }
    } catch (err) {
      console.error('AdSense unit error:', err);
    }
  }, [adSlot, adFormat, adStyle, responsive, shouldLoad, isLoaded]);

  // Intersection Observer를 사용한 지연 로딩
  useEffect(() => {
    if (!lazyLoad || shouldLoad || !adRef.current) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '50px', // 뷰포트에 50px 전에 로드 시작
      }
    );

    observer.observe(adRef.current);

    return () => {
      observer.disconnect();
    };
  }, [lazyLoad, shouldLoad]);

  if (!isAdSenseEnabled()) {
    return null;
  }

  return (
    <div
      ref={adRef}
      className={`adsense-container ${className}`}
      style={{ minHeight: '100px' }}
    >
      {/* 광고는 동적으로 삽입됩니다 */}
    </div>
  );
}

