'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import type { BirthChartInput, BirthChartResult as BirthChartResultType } from '@/types';
import BirthChartForm from '@/components/birth-chart/BirthChartForm';
import BirthChartResult from '@/components/birth-chart/BirthChartResult';
import { AdSenseUnit } from '@/components/ads';
import { isAdSenseEnabled } from '@/lib/adsense-config';

type SupportedLocale = 'ko' | 'en' | 'zh' | 'ja' | 'es';

const PAGE_TEXT: Record<SupportedLocale, {
  title: string;
  subtitle: string;
  formTitle: string;
  whatIsBigThree: string;
  sunSignTitle: string; sunSignDesc: string;
  moonSignTitle: string; moonSignDesc: string;
  risingSignTitle: string; risingSignDesc: string;
  whyTimeTitle: string; whyTimeDesc: string;
  recalculate: string;
}> = {
  ko: {
    title: '출생 차트',
    subtitle: '출생 시간과 장소를 입력하여 당신만의 Big Three(태양, 달, 상승궁)를 알아보세요.',
    formTitle: '출생 정보 입력',
    whatIsBigThree: 'Big Three란?',
    sunSignTitle: '태양 별자리 (Sun Sign)',
    sunSignDesc: '당신의 핵심 자아와 정체성을 나타냅니다. 가장 널리 알려진 별자리입니다.',
    moonSignTitle: '달 별자리 (Moon Sign)',
    moonSignDesc: '내면의 감정, 본능, 무의식적 반응을 나타냅니다.',
    risingSignTitle: '상승궁 (Rising Sign)',
    risingSignDesc: '첫인상과 외부에 보이는 모습, 사회적 가면을 나타냅니다.',
    whyTimeTitle: '출생 시간이 왜 중요한가요?',
    whyTimeDesc: '달 별자리와 상승궁은 출생 시간에 따라 달라집니다. 달은 약 2.5일마다, 상승궁은 약 2시간마다 별자리가 바뀝니다. 정확한 출생 시간을 알면 더 정확한 차트를 얻을 수 있습니다.',
    recalculate: '다시 계산하기',
  },
  en: {
    title: 'Birth Chart',
    subtitle: 'Enter your birth time and place to discover your Big Three (Sun, Moon, and Rising signs).',
    formTitle: 'Enter Birth Information',
    whatIsBigThree: 'What is the Big Three?',
    sunSignTitle: 'Sun Sign',
    sunSignDesc: 'Represents your core self and identity. The most commonly known zodiac sign.',
    moonSignTitle: 'Moon Sign',
    moonSignDesc: 'Represents your inner emotions, instincts, and subconscious reactions.',
    risingSignTitle: 'Rising Sign (Ascendant)',
    risingSignDesc: 'Represents your first impression, outward appearance, and social mask.',
    whyTimeTitle: 'Why does birth time matter?',
    whyTimeDesc: 'Moon sign and rising sign change based on birth time. The Moon changes signs approximately every 2.5 days, while the rising sign changes every 2 hours. Knowing your exact birth time gives you a more accurate chart.',
    recalculate: 'Calculate Again',
  },
  zh: {
    title: '出生图',
    subtitle: '输入出生时间和地点，了解您的三巨头（太阳、月亮、上升星座）。',
    formTitle: '输入出生信息',
    whatIsBigThree: '什么是三巨头？',
    sunSignTitle: '太阳星座',
    sunSignDesc: '代表您的核心自我和身份认同。最广为人知的星座。',
    moonSignTitle: '月亮星座',
    moonSignDesc: '代表您内心的情感、本能和潜意识反应。',
    risingSignTitle: '上升星座',
    risingSignDesc: '代表第一印象、外在形象和社交面具。',
    whyTimeTitle: '为什么出生时间很重要？',
    whyTimeDesc: '月亮星座和上升星座会根据出生时间变化。月亮大约每2.5天换一个星座，上升星座大约每2小时变化一次。了解确切的出生时间可以获得更准确的星盘。',
    recalculate: '重新计算',
  },
  ja: {
    title: '出生図',
    subtitle: '生年月日と出生時刻を入力して、ビッグスリー（太陽・月・上昇星座）を調べましょう。',
    formTitle: '出生情報を入力',
    whatIsBigThree: 'ビッグスリーとは？',
    sunSignTitle: '太陽星座',
    sunSignDesc: 'あなたの核心的な自己とアイデンティティを表します。最もよく知られている星座です。',
    moonSignTitle: '月星座',
    moonSignDesc: '内面の感情、本能、無意識の反応を表します。',
    risingSignTitle: '上昇星座（アセンダント）',
    risingSignDesc: '第一印象、外見、社会的な仮面を表します。',
    whyTimeTitle: '出生時刻はなぜ重要ですか？',
    whyTimeDesc: '月星座と上昇星座は出生時刻によって変わります。月は約2.5日ごとに、上昇星座は約2時間ごとに星座が変わります。正確な出生時刻を知ることで、より正確なチャートを得ることができます。',
    recalculate: '再計算',
  },
  es: {
    title: 'Carta Natal',
    subtitle: 'Ingresa tu hora y lugar de nacimiento para descubrir tu Gran Trío (Sol, Luna, Ascendente).',
    formTitle: 'Ingresar Información de Nacimiento',
    whatIsBigThree: '¿Qué es el Gran Trío?',
    sunSignTitle: 'Signo Solar',
    sunSignDesc: 'Representa tu esencia y identidad. El signo zodiacal más conocido.',
    moonSignTitle: 'Signo Lunar',
    moonSignDesc: 'Representa tus emociones internas, instintos y reacciones subconscientes.',
    risingSignTitle: 'Ascendente (Rising Sign)',
    risingSignDesc: 'Representa tu primera impresión, apariencia externa y máscara social.',
    whyTimeTitle: '¿Por qué importa la hora de nacimiento?',
    whyTimeDesc: 'El signo lunar y el ascendente cambian según la hora de nacimiento. La Luna cambia de signo aproximadamente cada 2.5 días, mientras que el ascendente cambia cada 2 horas. Conocer tu hora exacta de nacimiento te da una carta más precisa.',
    recalculate: 'Calcular de Nuevo',
  },
};

export default function BirthChartPage() {
  const params = useParams();
  const locale = ((params?.locale as string) || 'ko') as SupportedLocale;
  const t = PAGE_TEXT[locale] || PAGE_TEXT.en;

  const [result, setResult] = useState<BirthChartResultType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (input: BirthChartInput) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/birth-chart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to calculate birth chart');
      }
      setResult(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-500 bg-clip-text text-transparent">
              {t.title}
            </span>
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">{t.subtitle}</p>
        </div>

        {error && (
          <div className="mb-8 p-4 rounded-xl bg-red-500/20 border border-red-500/30 text-red-300">
            <p>{error}</p>
          </div>
        )}

        {!result ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 입력 폼 */}
            <div className="glass-card p-8 rounded-2xl">
              <h2 className="text-2xl font-bold text-white mb-6">{t.formTitle}</h2>
              <BirthChartForm onSubmit={handleSubmit} isLoading={isLoading} />
            </div>

            {/* 설명 섹션 */}
            <div className="space-y-6">
              <div className="glass-card p-6 rounded-2xl">
                <h3 className="text-xl font-bold text-white mb-4">{t.whatIsBigThree}</h3>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
                        <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">{t.sunSignTitle}</h4>
                      <p className="text-white/60 text-sm">{t.sunSignDesc}</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
                        <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">{t.moonSignTitle}</h4>
                      <p className="text-white/60 text-sm">{t.moonSignDesc}</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
                        <path fillRule="evenodd" d="M11.47 2.47a.75.75 0 011.06 0l3.75 3.75a.75.75 0 01-1.06 1.06l-2.47-2.47V21a.75.75 0 01-1.5 0V4.81L8.78 7.28a.75.75 0 01-1.06-1.06l3.75-3.75z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">{t.risingSignTitle}</h4>
                      <p className="text-white/60 text-sm">{t.risingSignDesc}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-card p-6 rounded-2xl">
                <h3 className="text-xl font-bold text-white mb-4">{t.whyTimeTitle}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{t.whyTimeDesc}</p>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-8 flex justify-end">
              <button
                onClick={handleReset}
                className="px-6 py-2 rounded-lg bg-white/10 border border-white/20 text-white/80 hover:text-white
                  hover:bg-white/20 transition-all duration-200 flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-3.183a.75.75 0 100 1.5h4.992a.75.75 0 00.75-.75V4.356a.75.75 0 00-1.5 0v3.18l-1.9-1.9A9 9 0 003.306 9.67a.75.75 0 101.45.388zm15.408 3.352a.75.75 0 00-.919.53 7.5 7.5 0 01-12.548 3.364l-1.902-1.903h3.183a.75.75 0 000-1.5H2.984a.75.75 0 00-.75.75v4.992a.75.75 0 001.5 0v-3.18l1.9 1.9a9 9 0 0015.059-4.035.75.75 0 00-.53-.918z" clipRule="evenodd" />
                </svg>
                {t.recalculate}
              </button>
            </div>

            <BirthChartResult result={result} />

            {isAdSenseEnabled() && (
              <div className="mt-8">
                <AdSenseUnit adFormat="auto" responsive={true} className="w-full" />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
