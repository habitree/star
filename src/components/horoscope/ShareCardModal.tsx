'use client';

/**
 * ShareCardModal — 공유 카드 미리보기 + 공유 버튼 모달 (Phase 4)
 * 심리: 사회적 정체성 + Zeigarnik (카드에 "전체 운세는 →" 티저)
 */

import { useState } from 'react';
import ViralShareButton from '@/components/ui/ViralShareButton';
import { buildShareCardUrl } from '@/lib/share-card-generator';
import type { ShareCardParams } from '@/lib/share-card-generator';

const TEXT = {
  ko: { title: '공유 카드', close: '닫기', preview: '미리보기', loadingPreview: '카드 생성 중...' },
  en: { title: 'Share Card', close: 'Close', preview: 'Preview', loadingPreview: 'Generating card...' },
  zh: { title: '分享卡片', close: '关闭', preview: '预览', loadingPreview: '生成卡片中...' },
  ja: { title: 'シェアカード', close: '閉じる', preview: 'プレビュー', loadingPreview: 'カード生成中...' },
  es: { title: 'Tarjeta de Compartir', close: 'Cerrar', preview: 'Vista previa', loadingPreview: 'Generando tarjeta...' },
} as const;
type L = keyof typeof TEXT;

export type { ShareCardParams };

interface ShareCardModalProps {
  params: ShareCardParams;
  shareText: string;
  shareUrl?: string;
  onClose: () => void;
}

export default function ShareCardModal({
  params,
  shareText,
  shareUrl,
  onClose,
}: ShareCardModalProps) {
  const locale = params.locale;
  const tl = TEXT[(locale as L) in TEXT ? (locale as L) : 'ko'];
  const [imgLoaded, setImgLoaded] = useState(false);

  const imageUrl = buildShareCardUrl(params);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="w-full max-w-sm bg-surface-elevated rounded-2xl p-5 space-y-4 animate-fade-in-up">
        {/* 헤더 */}
        <div className="flex items-center justify-between">
          <h3 className="text-white font-semibold text-sm">{tl.title}</h3>
          <button
            onClick={onClose}
            className="text-white/40 hover:text-white/80 text-sm transition-colors"
          >
            {tl.close} ✕
          </button>
        </div>

        {/* 이미지 미리보기 */}
        <div className="relative rounded-xl overflow-hidden aspect-[1200/630] bg-white/5">
          {!imgLoaded && (
            <div className="absolute inset-0 flex items-center justify-center text-white/30 text-xs">
              {tl.loadingPreview}
            </div>
          )}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt="Share card preview"
            className={`w-full h-full object-cover transition-opacity duration-300 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImgLoaded(true)}
          />
        </div>

        {/* 공유 버튼 */}
        <ViralShareButton
          imageUrl={imageUrl}
          shareText={shareText}
          shareUrl={shareUrl}
          locale={locale}
          cardType={params.type}
        />
      </div>
    </div>
  );
}
