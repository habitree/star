'use client';

/**
 * FortuneFeedback — 당일 운세 즉시 반응 (Phase 2)
 * 심리: 확증 편향 + 투자 → "맞아요" 누르면 더 믿게 됨
 */

import { useState } from 'react';
import { useUserStore } from '@/stores/user-store';
import { trackEvent } from '@/lib/engagement-tracker';
import type { FeedbackCategory } from '@/types/engagement';
import type { ZodiacSignId } from '@/types';

const TEXT = {
  ko: {
    question: '오늘 운세가 마음에 드셨나요?',
    great: '✨ 맞아요!',
    okay: '😊 보통이에요',
    miss: '🤔 글쎄요',
    missQuestion: '어떤 부분이 달랐나요?',
    categories: {
      love: '💕 연애운',
      career: '💼 직장운',
      health: '💚 건강운',
      money: '💰 금전운',
      overall: '🌟 종합운',
    },
    thanks: '피드백 감사해요! 내일 운세에 반영할게요 🌙',
  },
  en: {
    question: "How was today's horoscope?",
    great: '✨ Spot on!',
    okay: '😊 So-so',
    miss: '🤔 Not quite',
    missQuestion: 'Which area was off?',
    categories: {
      love: '💕 Love',
      career: '💼 Career',
      health: '💚 Health',
      money: '💰 Money',
      overall: '🌟 Overall',
    },
    thanks: "Thanks for the feedback! We'll adjust tomorrow's reading 🌙",
  },
  zh: {
    question: '今天的运势符合您的情况吗？',
    great: '✨ 很准！',
    okay: '😊 一般般',
    miss: '🤔 不太准',
    missQuestion: '哪个方面有出入？',
    categories: {
      love: '💕 爱情运',
      career: '💼 事业运',
      health: '💚 健康运',
      money: '💰 财运',
      overall: '🌟 综合运',
    },
    thanks: '感谢您的反馈！明天的运势会调整 🌙',
  },
  ja: {
    question: '今日の運勢はいかがでしたか？',
    great: '✨ ぴったり！',
    okay: '😊 まあまあ',
    miss: '🤔 いまいち',
    missQuestion: 'どの部分が違いましたか？',
    categories: {
      love: '💕 恋愛運',
      career: '💼 仕事運',
      health: '💚 健康運',
      money: '💰 金運',
      overall: '🌟 総合運',
    },
    thanks: 'フィードバックありがとう！明日の運勢に反映します 🌙',
  },
  es: {
    question: '¿Cómo fue el horóscopo de hoy?',
    great: '✨ ¡Certero!',
    okay: '😊 Regular',
    miss: '🤔 No tanto',
    missQuestion: '¿Qué área estuvo mal?',
    categories: {
      love: '💕 Amor',
      career: '💼 Carrera',
      health: '💚 Salud',
      money: '💰 Dinero',
      overall: '🌟 General',
    },
    thanks: '¡Gracias! Lo ajustaremos mañana 🌙',
  },
} as const;
type L = keyof typeof TEXT;

const CATS: FeedbackCategory[] = ['love', 'career', 'health', 'money', 'overall'];

interface FortuneFeedbackProps {
  signId: ZodiacSignId;
  locale?: string;
}

export default function FortuneFeedback({ signId, locale = 'ko' }: FortuneFeedbackProps) {
  const tl = TEXT[(locale as L) in TEXT ? (locale as L) : 'ko'];
  const { addFortuneFeedback, fortuneFeedback } = useUserStore();

  const today = new Date().toISOString().split('T')[0];
  const alreadyFeedback = fortuneFeedback.some(
    f => f.date === today && f.signId === signId && !f.isRetro
  );

  const [step, setStep] = useState<'question' | 'miss-detail' | 'done'>(
    alreadyFeedback ? 'done' : 'question'
  );

  const handleReaction = (reaction: 'great' | 'okay') => {
    addFortuneFeedback({ signId, reaction, isRetro: false });
    trackEvent('fortune_feedback', { reaction, signId });
    setStep('done');
  };

  const handleMiss = () => setStep('miss-detail');

  const handleMissCategory = (cat: FeedbackCategory) => {
    addFortuneFeedback({ signId, reaction: 'miss', missCategory: cat, isRetro: false });
    trackEvent('fortune_feedback', { reaction: 'miss', category: cat, signId });
    setStep('done');
  };

  if (step === 'done') {
    return (
      <div className="glass-card p-4 text-center border-white/10">
        <p className="text-white/60 text-sm">{tl.thanks}</p>
      </div>
    );
  }

  if (step === 'miss-detail') {
    return (
      <div className="glass-card p-4 border-white/10">
        <p className="text-white/70 text-sm text-center mb-3">{tl.missQuestion}</p>
        <div className="flex flex-wrap gap-2 justify-center">
          {CATS.map(cat => (
            <button
              key={cat}
              onClick={() => handleMissCategory(cat)}
              className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/80 text-xs transition-colors"
            >
              {tl.categories[cat]}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card p-4 border-white/10">
      <p className="text-white/70 text-sm text-center mb-3">{tl.question}</p>
      <div className="flex gap-2 justify-center">
        <button
          onClick={() => handleReaction('great')}
          className="flex-1 py-2 rounded-xl bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border border-yellow-500/30 text-yellow-300 text-sm font-medium hover:from-yellow-500/30 hover:to-amber-500/30 transition-all active:scale-95"
        >
          {tl.great}
        </button>
        <button
          onClick={() => handleReaction('okay')}
          className="flex-1 py-2 rounded-xl bg-white/10 border border-white/10 text-white/70 text-sm font-medium hover:bg-white/20 transition-all active:scale-95"
        >
          {tl.okay}
        </button>
        <button
          onClick={handleMiss}
          className="flex-1 py-2 rounded-xl bg-white/10 border border-white/10 text-white/50 text-sm font-medium hover:bg-white/20 transition-all active:scale-95"
        >
          {tl.miss}
        </button>
      </div>
    </div>
  );
}
