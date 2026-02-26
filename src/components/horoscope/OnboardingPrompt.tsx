'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useUserStore } from '@/stores/user-store';
import { type Locale } from '@/i18n/config';

const promptText: Record<Locale, { title: string; desc: string; cta: string }> = {
  ko: {
    title: '생년월일을 입력하면 맞춤 운세를 받을 수 있어요',
    desc: '나만의 별자리 운세, 바이오리듬, 타로까지 무료로 확인하세요',
    cta: '맞춤 운세 시작하기',
  },
  en: {
    title: 'Enter your birth date for personalized horoscope',
    desc: 'Get your unique horoscope, biorhythm, and tarot readings for free',
    cta: 'Start My Horoscope',
  },
  zh: {
    title: '输入生日获取个性化运势',
    desc: '免费获取您的星座运势、生物节律和塔罗牌解读',
    cta: '开始我的运势',
  },
  ja: {
    title: '生年月日を入力してパーソナル運勢を受け取る',
    desc: 'あなただけの運勢、バイオリズム、タロットを無料でチェック',
    cta: '運勢を始める',
  },
  es: {
    title: 'Ingresa tu fecha de nacimiento para tu horoscopo personalizado',
    desc: 'Obtén tu horoscopo único, biorritmo y lecturas de tarot gratis',
    cta: 'Comenzar Mi Horoscopo',
  },
};

export default function OnboardingPrompt({ locale }: { locale: Locale }) {
  const [showPrompt, setShowPrompt] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const state = useUserStore.getState();
      if (!state.birthDate && !state.onboardingCompleted) {
        setShowPrompt(true);
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!showPrompt || dismissed) return null;

  const text = promptText[locale] ?? promptText.ko;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 max-w-md mx-auto animate-slide-up">
      <div className="glass-card p-5 border-zodiac-primary/30 bg-gradient-to-r from-zodiac-primary/20 to-purple-500/20 shadow-2xl">
        <button
          onClick={() => setDismissed(true)}
          className="absolute top-2 right-3 text-white/40 hover:text-white text-lg"
          aria-label="닫기"
        >
          &times;
        </button>
        <p className="text-white font-medium text-sm mb-2">{text.title}</p>
        <p className="text-white/60 text-xs mb-3">{text.desc}</p>
        <Link
          href={`/${locale}/horoscope`}
          className="inline-block px-5 py-2 rounded-full text-sm font-medium bg-zodiac-primary hover:bg-zodiac-primary/80 text-white transition-colors"
        >
          {text.cta}
        </Link>
      </div>
    </div>
  );
}
