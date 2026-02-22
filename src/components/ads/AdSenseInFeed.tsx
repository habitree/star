'use client';

import { useEffect, useRef, useState } from 'react';
import { isAdSenseEnabled, getAdSensePublisherId } from '@/lib/adsense-config';

interface AdSenseInFeedProps {
  /**
   * 광고 슬롯 ID
   */
  adSlot: string;
  /**
   * 광고 컨테이너 클래스명
   */
  className?: string;
  /**
   * 지연 로딩 여부
   */
  lazyLoad?: boolean;
}

/**
 * Google AdSense 인-피드 광고 컴포넌트
 * 목록 형식 콘텐츠에 자연스럽게 삽입되는 광고입니다.
 * 
 * @example
 * <AdSenseInFeed adSlot="1234567890/in-feed" />
 */
export default function AdSenseInFeed({
  adSlot,
  className = '',
  lazyLoad = true,
}: AdSenseInFeedProps) {
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

    if (isLoaded) {
      return;
    }

    try {
      if (adRef.current && !adRef.current.querySelector('ins')) {
        const ins = document.createElement('ins');
        ins.className = 'adsbygoogle';
        ins.style.display = 'block';
        ins.setAttribute('data-ad-client', publisherId);
        ins.setAttribute('data-ad-slot', adSlot);
        ins.setAttribute('data-ad-format', 'fluid');
        ins.setAttribute('data-layout', 'in-feed');

        adRef.current.appendChild(ins);

        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
        setIsLoaded(true);
      }
    } catch (err) {
      console.error('AdSense in-feed error:', err);
    }
  }, [adSlot, shouldLoad, isLoaded]);

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
        rootMargin: '100px',
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
      className={`adsense-in-feed ${className}`}
      style={{ minHeight: '200px', margin: '1rem 0' }}
    />
  );
}

