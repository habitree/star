'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { ZodiacSignId } from '@/types';
import type { Locale } from '@/i18n/config';

interface ZodiacOption {
  id: ZodiacSignId;
  symbol: string;
  name: string;
}

const zodiacOptions: Record<Locale, ZodiacOption[]> = {
  ko: [
    { id: 'aries', symbol: '\u2648', name: '양자리' },
    { id: 'taurus', symbol: '\u2649', name: '황소자리' },
    { id: 'gemini', symbol: '\u264A', name: '쌍둥이자리' },
    { id: 'cancer', symbol: '\u264B', name: '게자리' },
    { id: 'leo', symbol: '\u264C', name: '사자자리' },
    { id: 'virgo', symbol: '\u264D', name: '처녀자리' },
    { id: 'libra', symbol: '\u264E', name: '천칭자리' },
    { id: 'scorpio', symbol: '\u264F', name: '전갈자리' },
    { id: 'sagittarius', symbol: '\u2650', name: '사수자리' },
    { id: 'capricorn', symbol: '\u2651', name: '염소자리' },
    { id: 'aquarius', symbol: '\u2652', name: '물병자리' },
    { id: 'pisces', symbol: '\u2653', name: '물고기자리' },
  ],
  en: [
    { id: 'aries', symbol: '\u2648', name: 'Aries' },
    { id: 'taurus', symbol: '\u2649', name: 'Taurus' },
    { id: 'gemini', symbol: '\u264A', name: 'Gemini' },
    { id: 'cancer', symbol: '\u264B', name: 'Cancer' },
    { id: 'leo', symbol: '\u264C', name: 'Leo' },
    { id: 'virgo', symbol: '\u264D', name: 'Virgo' },
    { id: 'libra', symbol: '\u264E', name: 'Libra' },
    { id: 'scorpio', symbol: '\u264F', name: 'Scorpio' },
    { id: 'sagittarius', symbol: '\u2650', name: 'Sagittarius' },
    { id: 'capricorn', symbol: '\u2651', name: 'Capricorn' },
    { id: 'aquarius', symbol: '\u2652', name: 'Aquarius' },
    { id: 'pisces', symbol: '\u2653', name: 'Pisces' },
  ],
  zh: [
    { id: 'aries', symbol: '\u2648', name: '白羊座' },
    { id: 'taurus', symbol: '\u2649', name: '金牛座' },
    { id: 'gemini', symbol: '\u264A', name: '双子座' },
    { id: 'cancer', symbol: '\u264B', name: '巨蟹座' },
    { id: 'leo', symbol: '\u264C', name: '狮子座' },
    { id: 'virgo', symbol: '\u264D', name: '处女座' },
    { id: 'libra', symbol: '\u264E', name: '天秤座' },
    { id: 'scorpio', symbol: '\u264F', name: '天蝎座' },
    { id: 'sagittarius', symbol: '\u2650', name: '射手座' },
    { id: 'capricorn', symbol: '\u2651', name: '摩羯座' },
    { id: 'aquarius', symbol: '\u2652', name: '水瓶座' },
    { id: 'pisces', symbol: '\u2653', name: '双鱼座' },
  ],
  ja: [
    { id: 'aries', symbol: '\u2648', name: 'おひつじ座' },
    { id: 'taurus', symbol: '\u2649', name: 'おうし座' },
    { id: 'gemini', symbol: '\u264A', name: 'ふたご座' },
    { id: 'cancer', symbol: '\u264B', name: 'かに座' },
    { id: 'leo', symbol: '\u264C', name: 'しし座' },
    { id: 'virgo', symbol: '\u264D', name: 'おとめ座' },
    { id: 'libra', symbol: '\u264E', name: 'てんびん座' },
    { id: 'scorpio', symbol: '\u264F', name: 'さそり座' },
    { id: 'sagittarius', symbol: '\u2650', name: 'いて座' },
    { id: 'capricorn', symbol: '\u2651', name: 'やぎ座' },
    { id: 'aquarius', symbol: '\u2652', name: 'みずがめ座' },
    { id: 'pisces', symbol: '\u2653', name: 'うお座' },
  ],
  es: [
    { id: 'aries', symbol: '\u2648', name: 'Aries' },
    { id: 'taurus', symbol: '\u2649', name: 'Tauro' },
    { id: 'gemini', symbol: '\u264A', name: 'Geminis' },
    { id: 'cancer', symbol: '\u264B', name: 'Cancer' },
    { id: 'leo', symbol: '\u264C', name: 'Leo' },
    { id: 'virgo', symbol: '\u264D', name: 'Virgo' },
    { id: 'libra', symbol: '\u264E', name: 'Libra' },
    { id: 'scorpio', symbol: '\u264F', name: 'Escorpio' },
    { id: 'sagittarius', symbol: '\u2650', name: 'Sagitario' },
    { id: 'capricorn', symbol: '\u2651', name: 'Capricornio' },
    { id: 'aquarius', symbol: '\u2652', name: 'Acuario' },
    { id: 'pisces', symbol: '\u2653', name: 'Piscis' },
  ],
};

const labels: Record<Locale, { sign1: string; sign2: string; button: string; placeholder: string }> = {
  ko: { sign1: '첫 번째 별자리', sign2: '두 번째 별자리', button: '궁합 확인', placeholder: '별자리를 선택하세요' },
  en: { sign1: 'First Sign', sign2: 'Second Sign', button: 'Check Compatibility', placeholder: 'Select a sign' },
  zh: { sign1: '第一个星座', sign2: '第二个星座', button: '查看配对', placeholder: '选择星座' },
  ja: { sign1: '最初の星座', sign2: '2番目の星座', button: '相性を確認', placeholder: '星座を選択' },
  es: { sign1: 'Primer Signo', sign2: 'Segundo Signo', button: 'Ver Compatibilidad', placeholder: 'Selecciona un signo' },
};

interface CompatibilityFormProps {
  locale: Locale;
  initialSign1?: ZodiacSignId;
  initialSign2?: ZodiacSignId;
  onSubmit?: (sign1: ZodiacSignId, sign2: ZodiacSignId) => void;
}

export default function CompatibilityForm({
  locale,
  initialSign1,
  initialSign2,
  onSubmit,
}: CompatibilityFormProps) {
  const router = useRouter();
  const [sign1, setSign1] = useState<ZodiacSignId | ''>(initialSign1 || '');
  const [sign2, setSign2] = useState<ZodiacSignId | ''>(initialSign2 || '');
  const [isLoading, setIsLoading] = useState(false);

  const options = zodiacOptions[locale] || zodiacOptions.en;
  const label = labels[locale] || labels.en;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sign1 || !sign2) return;

    setIsLoading(true);

    if (onSubmit) {
      onSubmit(sign1, sign2);
      setIsLoading(false);
    } else {
      // URL로 이동
      router.push(`/${locale}/compatibility/${sign1}/${sign2}`);
    }
  };

  const getSelectedOption = (signId: ZodiacSignId | '') => {
    if (!signId) return null;
    return options.find((opt) => opt.id === signId);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="glass-card p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* 첫 번째 별자리 선택 */}
          <div className="space-y-2">
            <label className="block text-white/80 text-sm font-medium">
              {label.sign1}
            </label>
            <div className="relative">
              <select
                value={sign1}
                onChange={(e) => setSign1(e.target.value as ZodiacSignId)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white
                           appearance-none cursor-pointer hover:bg-white/10 transition-colors
                           focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              >
                <option value="" className="bg-gray-900">
                  {label.placeholder}
                </option>
                {options.map((option) => (
                  <option key={option.id} value={option.id} className="bg-gray-900">
                    {option.symbol} {option.name}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/50">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            {sign1 && (
              <div className="flex items-center gap-2 mt-2 text-white/60">
                <span className="text-2xl">{getSelectedOption(sign1)?.symbol}</span>
                <span>{getSelectedOption(sign1)?.name}</span>
              </div>
            )}
          </div>

          {/* 두 번째 별자리 선택 */}
          <div className="space-y-2">
            <label className="block text-white/80 text-sm font-medium">
              {label.sign2}
            </label>
            <div className="relative">
              <select
                value={sign2}
                onChange={(e) => setSign2(e.target.value as ZodiacSignId)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white
                           appearance-none cursor-pointer hover:bg-white/10 transition-colors
                           focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              >
                <option value="" className="bg-gray-900">
                  {label.placeholder}
                </option>
                {options.map((option) => (
                  <option key={option.id} value={option.id} className="bg-gray-900">
                    {option.symbol} {option.name}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/50">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            {sign2 && (
              <div className="flex items-center gap-2 mt-2 text-white/60">
                <span className="text-2xl">{getSelectedOption(sign2)?.symbol}</span>
                <span>{getSelectedOption(sign2)?.name}</span>
              </div>
            )}
          </div>
        </div>

        {/* 선택된 별자리 시각화 */}
        {sign1 && sign2 && (
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="text-center">
              <span className="text-5xl block mb-2">{getSelectedOption(sign1)?.symbol}</span>
              <span className="text-white/70 text-sm">{getSelectedOption(sign1)?.name}</span>
            </div>
            <div className="text-4xl text-purple-400 animate-pulse">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
            <div className="text-center">
              <span className="text-5xl block mb-2">{getSelectedOption(sign2)?.symbol}</span>
              <span className="text-white/70 text-sm">{getSelectedOption(sign2)?.name}</span>
            </div>
          </div>
        )}

        {/* 제출 버튼 */}
        <button
          type="submit"
          disabled={!sign1 || !sign2 || isLoading}
          className="w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-pink-600
                     rounded-lg font-semibold text-white text-lg
                     hover:from-purple-700 hover:to-pink-700
                     disabled:opacity-50 disabled:cursor-not-allowed
                     transition-all duration-300 transform hover:scale-[1.02]
                     shadow-lg hover:shadow-purple-500/25"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Loading...
            </span>
          ) : (
            label.button
          )}
        </button>
      </div>
    </form>
  );
}
