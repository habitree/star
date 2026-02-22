'use client';

import { useEffect, useRef, useState } from 'react';
import { isAdSenseEnabled, getAdSensePublisherId } from '@/lib/adsense-config';

interface AdSenseInArticleProps {
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
 * Google AdSense 인-아티클 광고 컴포넌트
 * 콘텐츠 중간에 자연스럽게 배치되는 광고입니다.
 * 
 * @example
 * <AdSenseInArticle adSlot="1234567890/in-article" />
 */
export default function AdSenseInArticle({
  adSlot,
  className = '',
  lazyLoad = true,
}: AdSenseInArticleProps) {
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
        ins.setAttribute('data-layout', 'in-article');

        adRef.current.appendChild(ins);

        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
        setIsLoaded(true);
      }
    } catch (err) {
      console.error('AdSense in-article error:', err);
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
      className={`adsense-in-article ${className}`}
      style={{ minHeight: '250px', margin: '2rem 0' }}
    />
  );
}

