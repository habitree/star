'use client';

import { useEffect, useRef, useState } from 'react';
import { isAdSenseEnabled, getAdSensePublisherId } from '@/lib/adsense-config';

interface AdSenseInArticleProps {
  adSlot?: string;
  className?: string;
  lazyLoad?: boolean;
}

export default function AdSenseInArticle({
  adSlot = '',
  className = '',
  lazyLoad = true,
}: AdSenseInArticleProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(!lazyLoad);
  const initialized = useRef(false);

  // Intersection Observer 지연 로딩
  useEffect(() => {
    if (!lazyLoad || shouldLoad || !adRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );

    observer.observe(adRef.current);
    return () => observer.disconnect();
  }, [lazyLoad, shouldLoad]);

  // 광고 삽입
  useEffect(() => {
    if (!isAdSenseEnabled() || !shouldLoad || initialized.current || !adRef.current) return;

    const publisherId = getAdSensePublisherId();
    if (!publisherId) return;

    if (adRef.current.querySelector('ins.adsbygoogle')) return;

    try {
      const ins = document.createElement('ins');
      ins.className = 'adsbygoogle';
      ins.style.display = 'block';
      ins.style.textAlign = 'center';
      ins.setAttribute('data-ad-client', publisherId);
      if (adSlot) {
        ins.setAttribute('data-ad-slot', adSlot);
      }
      ins.setAttribute('data-ad-format', 'fluid');
      ins.setAttribute('data-ad-layout', 'in-article');

      adRef.current.appendChild(ins);
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      initialized.current = true;
    } catch (err) {
      console.error('AdSense in-article error:', err);
    }
  }, [adSlot, shouldLoad]);

  if (!isAdSenseEnabled()) return null;

  return (
    <div
      ref={adRef}
      className={`adsense-in-article ${className}`}
      style={{ minHeight: '250px', margin: '2rem 0' }}
    />
  );
}
