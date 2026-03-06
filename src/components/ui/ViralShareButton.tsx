'use client';

/**
 * ViralShareButton — 이미지 다운로드 + Web Share API 통합 (Phase 4)
 */

import { useState } from 'react';
import { trackEvent } from '@/lib/engagement-tracker';

const TEXT = {
  ko: { share: '공유하기', download: '이미지 저장', copying: '준비 중...', error: '공유 실패' },
  en: { share: 'Share', download: 'Save Image', copying: 'Preparing...', error: 'Share failed' },
  zh: { share: '分享', download: '保存图片', copying: '准备中...', error: '分享失败' },
  ja: { share: 'シェア', download: '画像を保存', copying: '準備中...', error: 'シェア失敗' },
  es: { share: 'Compartir', download: 'Guardar imagen', copying: 'Preparando...', error: 'Error al compartir' },
} as const;
type L = keyof typeof TEXT;

interface ViralShareButtonProps {
  imageUrl: string;          // /api/share-card?... URL
  shareText: string;
  shareUrl?: string;         // 공유할 페이지 URL
  locale?: string;
  cardType?: string;
  className?: string;
}

export default function ViralShareButton({
  imageUrl,
  shareText,
  shareUrl,
  locale = 'ko',
  cardType = 'daily',
  className = '',
}: ViralShareButtonProps) {
  const tl = TEXT[(locale as L) in TEXT ? (locale as L) : 'ko'];
  const [loading, setLoading] = useState(false);

  const handleShare = async () => {
    if (loading) return;
    setLoading(true);
    trackEvent('share_card_generate', { type: cardType, locale });

    try {
      // Web Share API 지원 여부 확인
      if (navigator.share) {
        await navigator.share({
          title: '별자리 운세',
          text: shareText,
          url: shareUrl ?? window.location.href,
        });
        trackEvent('viral_link_click', { type: cardType, method: 'web-share' });
      } else {
        // 폴백: 이미지 새 탭으로 열기
        window.open(imageUrl, '_blank');
        trackEvent('viral_link_click', { type: cardType, method: 'open-image' });
      }
    } catch {
      // 사용자가 공유 취소 — 정상 케이스
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    try {
      const res = await fetch(imageUrl);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `horoscope-${cardType}-${new Date().toISOString().split('T')[0]}.png`;
      a.click();
      URL.revokeObjectURL(url);
      trackEvent('viral_link_click', { type: cardType, method: 'download' });
    } catch {
      window.open(imageUrl, '_blank');
    }
  };

  return (
    <div className={`flex gap-2 ${className}`}>
      <button
        onClick={handleShare}
        disabled={loading}
        className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium hover:opacity-90 active:scale-95 transition-all disabled:opacity-50"
      >
        <span>📤</span>
        <span>{loading ? tl.copying : tl.share}</span>
      </button>
      <button
        onClick={handleDownload}
        className="px-4 py-2.5 rounded-xl bg-white/10 border border-white/10 text-white/70 text-sm hover:bg-white/20 transition-colors active:scale-95"
        title={tl.download}
      >
        💾
      </button>
    </div>
  );
}
