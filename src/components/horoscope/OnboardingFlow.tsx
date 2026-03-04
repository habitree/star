'use client';

import { useState } from 'react';
import type { ZodiacSignId } from '@/types';
import type { OnboardingStep } from '@/types/engagement';
import { zodiacData } from '@/data/zodiac-info';
import { zodiacSigns } from '@/data/zodiac-signs';
import { getElementTheme } from '@/lib/element-theme';

const OB_TEXT = {
  ko: {
    welcome: {
      title: '별의 세계에 오신 것을 환영합니다',
      desc: '매일 별이 전하는 특별한 메시지를 받아보세요. 당신만을 위한 맞춤 운세가 준비되어 있습니다.',
      start: '시작하기',
      later: '나중에 할게요',
    },
    birthdate: {
      title: '생년월일을 알려주세요',
      desc: '당신의 별자리를 찾고, 맞춤 운세를 준비할게요',
      next: '다음',
      back: '← 뒤로',
    },
    element: {
      intro: (name: string, dateRange: string) => `${dateRange}에 태어난 당신은 ${name}입니다. 매일 별이 전하는 메시지를 확인해보세요!`,
      confirm: '내 운세 확인하기 ✨',
      reenter: '← 다시 입력',
      elements: { fire: '🔥 불의 원소', earth: '🌿 땅의 원소', air: '💨 바람의 원소', water: '💧 물의 원소' },
    },
  },
  en: {
    welcome: {
      title: 'Welcome to the World of Stars',
      desc: 'Receive special messages from the stars every day. Your personalized horoscope is ready.',
      start: 'Get Started',
      later: 'Maybe Later',
    },
    birthdate: {
      title: 'Enter Your Birth Date',
      desc: "We'll find your zodiac sign and prepare your personalized fortune",
      next: 'Next',
      back: '← Back',
    },
    element: {
      intro: (name: string, dateRange: string) => `Born in ${dateRange}, you are ${name}. Check the daily messages the stars have for you!`,
      confirm: 'See My Fortune ✨',
      reenter: '← Re-enter',
      elements: { fire: '🔥 Fire Element', earth: '🌿 Earth Element', air: '💨 Air Element', water: '💧 Water Element' },
    },
  },
  zh: {
    welcome: {
      title: '欢迎来到星星的世界',
      desc: '每天接收星星传递的特别信息。您的个性化运势已准备好。',
      start: '开始',
      later: '稍后再说',
    },
    birthdate: {
      title: '请输入您的生日',
      desc: '我们将找到您的星座并准备个性化运势',
      next: '下一步',
      back: '← 返回',
    },
    element: {
      intro: (name: string, dateRange: string) => `出生于${dateRange}的您是${name}。查看星星每天传递给您的信息！`,
      confirm: '查看我的运势 ✨',
      reenter: '← 重新输入',
      elements: { fire: '🔥 火元素', earth: '🌿 土元素', air: '💨 风元素', water: '💧 水元素' },
    },
  },
  ja: {
    welcome: {
      title: '星の世界へようこそ',
      desc: '毎日、星から特別なメッセージをお届けします。あなただけのパーソナライズされた占いが準備されています。',
      start: '始める',
      later: 'あとで',
    },
    birthdate: {
      title: '生年月日を教えてください',
      desc: 'あなたの星座を見つけ、パーソナライズされた運勢を準備します',
      next: '次へ',
      back: '← 戻る',
    },
    element: {
      intro: (name: string, dateRange: string) => `${dateRange}生まれのあなたは${name}です。毎日の星のメッセージを確認してください！`,
      confirm: '私の運勢を確認する ✨',
      reenter: '← 再入力',
      elements: { fire: '🔥 火のエレメント', earth: '🌿 地のエレメント', air: '💨 風のエレメント', water: '💧 水のエレメント' },
    },
  },
  es: {
    welcome: {
      title: 'Bienvenido al Mundo de las Estrellas',
      desc: 'Recibe mensajes especiales de las estrellas cada día. Tu horóscopo personalizado está listo.',
      start: 'Comenzar',
      later: 'Tal vez después',
    },
    birthdate: {
      title: 'Ingresa tu Fecha de Nacimiento',
      desc: 'Encontraremos tu signo zodiacal y prepararemos tu fortuna personalizada',
      next: 'Siguiente',
      back: '← Atrás',
    },
    element: {
      intro: (name: string, dateRange: string) => `Nacido en ${dateRange}, eres ${name}. ¡Consulta los mensajes diarios que las estrellas tienen para ti!`,
      confirm: 'Ver Mi Fortuna ✨',
      reenter: '← Volver a ingresar',
      elements: { fire: '🔥 Elemento Fuego', earth: '🌿 Elemento Tierra', air: '💨 Elemento Aire', water: '💧 Elemento Agua' },
    },
  },
} as const;
type OBLocale = keyof typeof OB_TEXT;

// Locale-aware sign name lookup
const signNameMap: Record<string, Record<string, string>> = Object.fromEntries(
  zodiacSigns.map((s) => [s.id, s.names as unknown as Record<string, string>])
);

interface OnboardingFlowProps {
  onComplete: (birthDate: string, signId: ZodiacSignId) => void;
  onSkip: () => void;
  locale?: string;
}

/** 생년월일로 별자리 계산 */
function calculateZodiacSign(month: number, day: number): ZodiacSignId {
  const ranges: [ZodiacSignId, number, number, number, number][] = [
    ['capricorn', 12, 22, 1, 19],
    ['aquarius', 1, 20, 2, 18],
    ['pisces', 2, 19, 3, 20],
    ['aries', 3, 21, 4, 19],
    ['taurus', 4, 20, 5, 20],
    ['gemini', 5, 21, 6, 21],
    ['cancer', 6, 22, 7, 22],
    ['leo', 7, 23, 8, 22],
    ['virgo', 8, 23, 9, 22],
    ['libra', 9, 23, 10, 22],
    ['scorpio', 10, 23, 11, 21],
    ['sagittarius', 11, 22, 12, 21],
  ];

  for (const [sign, sm, sd, em, ed] of ranges) {
    if ((month === sm && day >= sd) || (month === em && day <= ed)) {
      return sign;
    }
  }
  return 'capricorn';
}

export default function OnboardingFlow({ onComplete, onSkip, locale = 'ko' }: OnboardingFlowProps) {
  const tl = OB_TEXT[(locale as OBLocale) in OB_TEXT ? (locale as OBLocale) : 'ko'];
  const [step, setStep] = useState<OnboardingStep>('welcome');
  const [birthDate, setBirthDate] = useState('');
  const [detectedSign, setDetectedSign] = useState<ZodiacSignId | null>(null);

  const handleDateChange = (value: string) => {
    setBirthDate(value);
    if (value) {
      const date = new Date(value);
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const sign = calculateZodiacSign(month, day);
      setDetectedSign(sign);
    }
  };

  const handleComplete = () => {
    if (birthDate && detectedSign) {
      onComplete(birthDate, detectedSign);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="glass-card max-w-md w-full p-8 text-center animate-scale-in">

        {/* Step 1: Welcome */}
        {step === 'welcome' && (
          <div className="space-y-6">
            <div className="text-6xl animate-float">✨</div>
            <h2 className="text-2xl font-serif font-bold text-white">
              {tl.welcome.title}
            </h2>
            <p className="text-white/70 leading-relaxed">
              {tl.welcome.desc}
            </p>
            <div className="space-y-3">
              <button
                onClick={() => setStep('birthdate')}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500
                           text-white font-semibold hover:opacity-90 transition-opacity"
              >
                {tl.welcome.start}
              </button>
              <button
                onClick={onSkip}
                className="text-white/50 text-sm hover:text-white/70 transition-colors"
              >
                {tl.welcome.later}
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Birth Date */}
        {step === 'birthdate' && (
          <div className="space-y-6">
            <div className="text-5xl">🌙</div>
            <h2 className="text-xl font-serif font-bold text-white">
              {tl.birthdate.title}
            </h2>
            <p className="text-white/60 text-sm">
              {tl.birthdate.desc}
            </p>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => handleDateChange(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20
                         text-white text-center focus:outline-none focus:border-purple-500
                         transition-colors"
              max={new Date().toISOString().split('T')[0]}
            />
            {detectedSign && (
              <button
                onClick={() => setStep('element')}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500
                           text-white font-semibold hover:opacity-90 transition-opacity"
              >
                {tl.birthdate.next}
              </button>
            )}
            <button
              onClick={() => setStep('welcome')}
              className="text-white/50 text-sm hover:text-white/70 transition-colors"
            >
              {tl.birthdate.back}
            </button>
          </div>
        )}

        {/* Step 3: Element Reveal */}
        {step === 'element' && detectedSign && (
          <div className="space-y-6">
            {(() => {
              const info = zodiacData[detectedSign];
              const theme = getElementTheme(detectedSign);
              const signName = signNameMap[detectedSign]?.[locale] ?? info.name;
              return (
                <>
                  <div
                    className="text-7xl animate-pulse-slow"
                    style={{ filter: `drop-shadow(0 0 20px ${theme.glowColor})` }}
                  >
                    {info.symbol}
                  </div>
                  <h2 className="text-2xl font-serif font-bold text-white">
                    {signName}
                  </h2>
                  <p className={`text-sm font-medium ${theme.textClass}`}>
                    {tl.element.elements[info.element as keyof typeof tl.element.elements]}
                  </p>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {tl.element.intro(signName, info.dateRange)}
                  </p>
                  <button
                    onClick={handleComplete}
                    className="w-full py-3 rounded-xl text-white font-semibold
                               hover:opacity-90 transition-opacity"
                    style={{ background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.secondaryColor})` }}
                  >
                    {tl.element.confirm}
                  </button>
                  <button
                    onClick={() => setStep('birthdate')}
                    className="text-white/50 text-sm hover:text-white/70 transition-colors"
                  >
                    {tl.element.reenter}
                  </button>
                </>
              );
            })()}
          </div>
        )}

        {/* 진행 표시기 */}
        <div className="flex justify-center gap-2 mt-6">
          {(['welcome', 'birthdate', 'element'] as const).map((s) => (
            <div
              key={s}
              className={`w-2 h-2 rounded-full transition-colors ${
                step === s ? 'bg-purple-500' : 'bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
