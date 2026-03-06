'use client';

/**
 * RetroFeedback — 전일 운세 회상 피드백 (Phase 2)
 * WelcomeBack 섹션 내 조건부 표시
 * 심리: 매몰 비용 + 사이가르닉 — "어제 운세가 맞았는지 궁금하다"
 */

import { useState } from 'react';
import { useUserStore } from '@/stores/user-store';
import { trackEvent } from '@/lib/engagement-tracker';
import type { ZodiacSignId } from '@/types';

const TEXT = {
  ko: {
    label: (score: number) => `어제 운세 ${score}점`,
    question: '실제로는 어떠셨나요? 별이 궁금해합니다.',
    good: '⭐ 잘 맞았어요',
    okay: '😐 보통이었어요',
    miss: '🌑 별로였어요',
    thanks: '솔직한 피드백 감사해요 🌟',
  },
  en: {
    label: (score: number) => `Yesterday's score: ${score}pts`,
    question: 'How did it actually go? The stars are curious.',
    good: '⭐ Very accurate',
    okay: '😐 So-so',
    miss: '🌑 Not really',
    thanks: 'Thanks for the honest feedback 🌟',
  },
  zh: {
    label: (score: number) => `昨日运势 ${score}分`,
    question: '实际情况如何？星星很好奇。',
    good: '⭐ 很准',
    okay: '😐 一般',
    miss: '🌑 不太准',
    thanks: '感谢您的诚实反馈 🌟',
  },
  ja: {
    label: (score: number) => `昨日の運勢 ${score}点`,
    question: '実際はどうでしたか？星が気になっています。',
    good: '⭐ よく当たった',
    okay: '😐 まあまあ',
    miss: '🌑 あまり',
    thanks: '正直なフィードバックありがとう 🌟',
  },
  es: {
    label: (score: number) => `Ayer: ${score}pts`,
    question: '¿Cómo fue realmente? Las estrellas tienen curiosidad.',
    good: '⭐ Muy certero',
    okay: '😐 Regular',
    miss: '🌑 No mucho',
    thanks: 'Gracias por el feedback honesto 🌟',
  },
} as const;
type L = keyof typeof TEXT;

interface RetroFeedbackProps {
  signId: ZodiacSignId;
  yesterdayScore: number;
  locale?: string;
}

export default function RetroFeedback({ signId, yesterdayScore, locale = 'ko' }: RetroFeedbackProps) {
  const tl = TEXT[(locale as L) in TEXT ? (locale as L) : 'ko'];
  const { addFortuneFeedback, fortuneFeedback } = useUserStore();

  const yesterday = (() => {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return d.toISOString().split('T')[0];
  })();

  const alreadyDone = fortuneFeedback.some(
    f => f.date === yesterday && f.signId === signId && f.isRetro
  );

  const [done, setDone] = useState(alreadyDone);

  const handleChoice = (reaction: 'great' | 'okay' | 'miss') => {
    // 어제 날짜로 저장 — addFortuneFeedback은 today를 쓰므로 직접 처리
    const store = useUserStore.getState();
    const fb = store.fortuneFeedback;
    const existing = fb.filter(
      f => !(f.date === yesterday && f.signId === signId && f.isRetro)
    );
    useUserStore.setState({
      fortuneFeedback: [
        { date: yesterday, signId, reaction, isRetro: true },
        ...existing,
      ].slice(0, 30),
    });
    trackEvent('retro_feedback', { reaction, signId });
    setDone(true);
  };

  if (done) {
    return (
      <p className="text-white/40 text-xs text-center mt-2">{tl.thanks}</p>
    );
  }

  return (
    <div className="mt-3 pt-3 border-t border-white/10">
      <p className="text-white/50 text-xs mb-1">{tl.label(yesterdayScore)}</p>
      <p className="text-white/70 text-sm mb-2">{tl.question}</p>
      <div className="flex gap-2">
        {([['great', tl.good], ['okay', tl.okay], ['miss', tl.miss]] as const).map(([r, label]) => (
          <button
            key={r}
            onClick={() => handleChoice(r as 'great' | 'okay' | 'miss')}
            className="flex-1 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white/70 text-xs transition-colors active:scale-95"
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
