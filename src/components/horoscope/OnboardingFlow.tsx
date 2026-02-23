'use client';

import { useState } from 'react';
import type { ZodiacSignId } from '@/types';
import type { OnboardingStep } from '@/types/engagement';
import { zodiacData } from '@/data/zodiac-info';
import { getElementTheme } from '@/lib/element-theme';

interface OnboardingFlowProps {
  onComplete: (birthDate: string, signId: ZodiacSignId) => void;
  onSkip: () => void;
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

export default function OnboardingFlow({ onComplete, onSkip }: OnboardingFlowProps) {
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
              별의 세계에 오신 것을 환영합니다
            </h2>
            <p className="text-white/70 leading-relaxed">
              매일 별이 전하는 특별한 메시지를 받아보세요.
              당신만을 위한 맞춤 운세가 준비되어 있습니다.
            </p>
            <div className="space-y-3">
              <button
                onClick={() => setStep('birthdate')}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500
                           text-white font-semibold hover:opacity-90 transition-opacity"
              >
                시작하기
              </button>
              <button
                onClick={onSkip}
                className="text-white/50 text-sm hover:text-white/70 transition-colors"
              >
                나중에 할게요
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Birth Date */}
        {step === 'birthdate' && (
          <div className="space-y-6">
            <div className="text-5xl">🌙</div>
            <h2 className="text-xl font-serif font-bold text-white">
              생년월일을 알려주세요
            </h2>
            <p className="text-white/60 text-sm">
              당신의 별자리를 찾고, 맞춤 운세를 준비할게요
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
                다음
              </button>
            )}
            <button
              onClick={() => setStep('welcome')}
              className="text-white/50 text-sm hover:text-white/70 transition-colors"
            >
              ← 뒤로
            </button>
          </div>
        )}

        {/* Step 3: Element Reveal */}
        {step === 'element' && detectedSign && (
          <div className="space-y-6">
            {(() => {
              const info = zodiacData[detectedSign];
              const theme = getElementTheme(detectedSign);
              return (
                <>
                  <div
                    className="text-7xl animate-pulse-slow"
                    style={{ filter: `drop-shadow(0 0 20px ${theme.glowColor})` }}
                  >
                    {info.symbol}
                  </div>
                  <h2 className="text-2xl font-serif font-bold text-white">
                    {info.name}
                  </h2>
                  <p className={`text-sm font-medium ${theme.textClass}`}>
                    {info.element === 'fire' ? '🔥 불의 원소' :
                     info.element === 'earth' ? '🌿 땅의 원소' :
                     info.element === 'air' ? '💨 바람의 원소' : '💧 물의 원소'}
                  </p>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {info.dateRange}에 태어난 당신은 <strong className="text-white">{info.name}</strong>입니다.
                    매일 별이 전하는 메시지를 확인해보세요!
                  </p>
                  <button
                    onClick={handleComplete}
                    className="w-full py-3 rounded-xl text-white font-semibold
                               hover:opacity-90 transition-opacity"
                    style={{ background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.secondaryColor})` }}
                  >
                    내 운세 확인하기 ✨
                  </button>
                  <button
                    onClick={() => setStep('birthdate')}
                    className="text-white/50 text-sm hover:text-white/70 transition-colors"
                  >
                    ← 다시 입력
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
