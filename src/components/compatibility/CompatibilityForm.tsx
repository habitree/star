'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import type { ZodiacSignId } from '@/types';

type SupportedLocale = 'ko' | 'en' | 'zh' | 'ja' | 'es';

const SIGN_NAMES: Record<ZodiacSignId, Record<SupportedLocale, string>> = {
  aries:       { ko:'양자리', en:'Aries', zh:'白羊座', ja:'牡羊座', es:'Aries' },
  taurus:      { ko:'황소자리', en:'Taurus', zh:'金牛座', ja:'牡牛座', es:'Tauro' },
  gemini:      { ko:'쌍둥이자리', en:'Gemini', zh:'双子座', ja:'双子座', es:'Géminis' },
  cancer:      { ko:'게자리', en:'Cancer', zh:'巨蟹座', ja:'蟹座', es:'Cáncer' },
  leo:         { ko:'사자자리', en:'Leo', zh:'狮子座', ja:'獅子座', es:'Leo' },
  virgo:       { ko:'처녀자리', en:'Virgo', zh:'处女座', ja:'乙女座', es:'Virgo' },
  libra:       { ko:'천칭자리', en:'Libra', zh:'天秤座', ja:'天秤座', es:'Libra' },
  scorpio:     { ko:'전갈자리', en:'Scorpio', zh:'天蝎座', ja:'蠍座', es:'Escorpio' },
  sagittarius: { ko:'사수자리', en:'Sagittarius', zh:'射手座', ja:'射手座', es:'Sagitario' },
  capricorn:   { ko:'염소자리', en:'Capricorn', zh:'摩羯座', ja:'山羊座', es:'Capricornio' },
  aquarius:    { ko:'물병자리', en:'Aquarius', zh:'水瓶座', ja:'水瓶座', es:'Acuario' },
  pisces:      { ko:'물고기자리', en:'Pisces', zh:'双鱼座', ja:'魚座', es:'Piscis' },
};

const ZODIAC_SYMBOLS: Record<ZodiacSignId, string> = {
  aries:'♈', taurus:'♉', gemini:'♊', cancer:'♋', leo:'♌', virgo:'♍',
  libra:'♎', scorpio:'♏', sagittarius:'♐', capricorn:'♑', aquarius:'♒', pisces:'♓',
};

const SIGNS_ORDER: ZodiacSignId[] = [
  'aries','taurus','gemini','cancer','leo','virgo',
  'libra','scorpio','sagittarius','capricorn','aquarius','pisces',
];

const UI_TEXT: Record<SupportedLocale, {
  firstSign: string; secondSign: string; placeholder: string; submit: string;
}> = {
  ko: { firstSign: '첫 번째 별자리', secondSign: '두 번째 별자리', placeholder: '별자리를 선택하세요', submit: '궁합 확인' },
  en: { firstSign: 'First Sign', secondSign: 'Second Sign', placeholder: 'Select a sign', submit: 'Check Compatibility' },
  zh: { firstSign: '第一个星座', secondSign: '第二个星座', placeholder: '请选择星座', submit: '查看配对' },
  ja: { firstSign: '最初の星座', secondSign: '2番目の星座', placeholder: '星座を選択', submit: '相性を確認' },
  es: { firstSign: 'Primer Signo', secondSign: 'Segundo Signo', placeholder: 'Selecciona un signo', submit: 'Ver Compatibilidad' },
};

interface CompatibilityFormProps {
  initialSign1?: ZodiacSignId;
  initialSign2?: ZodiacSignId;
  onSubmit?: (sign1: ZodiacSignId, sign2: ZodiacSignId) => void;
}

export default function CompatibilityForm({
  initialSign1,
  initialSign2,
  onSubmit,
}: CompatibilityFormProps) {
  const router = useRouter();
  const params = useParams();
  const locale = ((params?.locale as string) || 'ko') as SupportedLocale;
  const ui = UI_TEXT[locale] || UI_TEXT.en;

  const [sign1, setSign1] = useState<ZodiacSignId | ''>(initialSign1 || '');
  const [sign2, setSign2] = useState<ZodiacSignId | ''>(initialSign2 || '');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sign1 || !sign2) return;
    setIsLoading(true);
    if (onSubmit) {
      onSubmit(sign1, sign2);
      setIsLoading(false);
    } else {
      router.push(`/${locale}/compatibility/${sign1}/${sign2}`);
    }
  };

  const getSignName = (signId: ZodiacSignId) =>
    SIGN_NAMES[signId][locale] || SIGN_NAMES[signId].en;

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="glass-card p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* 첫 번째 별자리 */}
          <div className="space-y-2">
            <label className="block text-white/80 text-sm font-medium">
              {ui.firstSign}
            </label>
            <div className="relative">
              <select
                value={sign1}
                onChange={(e) => setSign1(e.target.value as ZodiacSignId)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white
                           appearance-none cursor-pointer hover:bg-white/10 transition-colors
                           focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              >
                <option value="" className="bg-gray-900">{ui.placeholder}</option>
                {SIGNS_ORDER.map((id) => (
                  <option key={id} value={id} className="bg-gray-900">
                    {ZODIAC_SYMBOLS[id]} {getSignName(id)}
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
                <span className="text-2xl">{ZODIAC_SYMBOLS[sign1]}</span>
                <span>{getSignName(sign1)}</span>
              </div>
            )}
          </div>

          {/* 두 번째 별자리 */}
          <div className="space-y-2">
            <label className="block text-white/80 text-sm font-medium">
              {ui.secondSign}
            </label>
            <div className="relative">
              <select
                value={sign2}
                onChange={(e) => setSign2(e.target.value as ZodiacSignId)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white
                           appearance-none cursor-pointer hover:bg-white/10 transition-colors
                           focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              >
                <option value="" className="bg-gray-900">{ui.placeholder}</option>
                {SIGNS_ORDER.map((id) => (
                  <option key={id} value={id} className="bg-gray-900">
                    {ZODIAC_SYMBOLS[id]} {getSignName(id)}
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
                <span className="text-2xl">{ZODIAC_SYMBOLS[sign2]}</span>
                <span>{getSignName(sign2)}</span>
              </div>
            )}
          </div>
        </div>

        {/* 선택된 별자리 시각화 */}
        {sign1 && sign2 && (
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="text-center">
              <span className="text-5xl block mb-2">{ZODIAC_SYMBOLS[sign1]}</span>
              <span className="text-white/70 text-sm">{getSignName(sign1)}</span>
            </div>
            <div className="text-4xl text-purple-400 animate-pulse">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
            <div className="text-center">
              <span className="text-5xl block mb-2">{ZODIAC_SYMBOLS[sign2]}</span>
              <span className="text-white/70 text-sm">{getSignName(sign2)}</span>
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
            ui.submit
          )}
        </button>
      </div>
    </form>
  );
}
