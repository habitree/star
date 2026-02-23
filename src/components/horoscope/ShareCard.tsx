'use client';

import ShareButton from '@/components/ui/ShareButton';
import { zodiacData } from '@/data/zodiac-info';
import { getElementTheme, getShareCardGradient } from '@/lib/element-theme';
import type { ZodiacSignId } from '@/types';

interface ShareCardProps {
  signId: ZodiacSignId;
  score: number;
  affirmation: string;
}

export default function ShareCard({ signId, score, affirmation }: ShareCardProps) {
  const info = zodiacData[signId];
  const theme = getElementTheme(signId);
  const gradient = getShareCardGradient(signId);

  return (
    <div className="glass-card p-6 text-center">
      <h3 className="text-lg font-semibold text-white mb-4">
        오늘의 운세 공유하기
      </h3>

      {/* 공유 카드 미리보기 - 엘리먼트 테마 적용 */}
      <div
        className="inline-block p-6 rounded-2xl border border-white/10 mb-4 max-w-xs relative overflow-hidden"
        style={{ background: gradient }}
      >
        {/* 글로우 효과 */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(circle at 50% 30%, ${theme.glowColor}, transparent 70%)`,
          }}
        />

        <div className="relative z-10">
          <span
            className="text-4xl block mb-2"
            style={{ filter: `drop-shadow(0 0 12px ${theme.glowColor})` }}
          >
            {info.symbol}
          </span>
          <p className="text-white font-semibold mb-1">{info.name}</p>
          <p className="text-2xl font-bold text-white mb-1">{score}점</p>
          <div className="flex justify-center gap-0.5 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`text-sm ${star <= Math.round(score / 20) ? 'text-yellow-400' : 'text-white/20'}`}
              >
                ★
              </span>
            ))}
          </div>
          <p className="text-xs text-white/70 leading-relaxed line-clamp-2">
            &ldquo;{affirmation}&rdquo;
          </p>

          {/* 엘리먼트 태그 */}
          <span className={`inline-block mt-2 px-2 py-0.5 rounded-full text-[10px] ${theme.textClass} bg-white/10`}>
            {info.element === 'fire' ? '🔥 불' :
             info.element === 'earth' ? '🌿 흙' :
             info.element === 'air' ? '💨 바람' : '💧 물'}
          </span>
        </div>
      </div>

      <div className="flex justify-center">
        <ShareButton
          title={`${info.name} 오늘의 운세 ${score}점`}
          text={`${info.name} 오늘의 운세 - ${score}점\n"${affirmation}"`}
          label="공유하기"
        />
      </div>
    </div>
  );
}
