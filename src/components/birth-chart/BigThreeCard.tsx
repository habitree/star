'use client';

import { useParams } from 'next/navigation';
import type { ZodiacSignId } from '@/types';
import PlanetIcon, { type PlanetId } from '@/components/ui/PlanetIcon';
import ZodiacIcon from '@/components/ui/ZodiacIcon';

type SupportedLocale = 'ko' | 'en' | 'zh' | 'ja' | 'es';

interface BigThreeCardProps {
  type: 'sun' | 'moon' | 'rising';
  sign: ZodiacSignId;
  interpretation?: string;
}

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

const TYPE_LABELS: Record<SupportedLocale, Record<'sun' | 'moon' | 'rising', string>> = {
  ko: { sun:'태양', moon:'달', rising:'상승궁' },
  en: { sun:'Sun Sign', moon:'Moon Sign', rising:'Rising Sign' },
  zh: { sun:'太阳星座', moon:'月亮星座', rising:'上升星座' },
  ja: { sun:'太陽星座', moon:'月星座', rising:'上昇星座' },
  es: { sun:'Signo Solar', moon:'Signo Lunar', rising:'Ascendente' },
};

const typeConfig = {
  sun:    { planetId: 'sun' as PlanetId, gradient: 'from-yellow-400 to-orange-500', bgGradient: 'from-yellow-500/20 to-orange-500/20', borderColor: 'border-yellow-500/30' },
  moon:   { planetId: 'moon' as PlanetId, gradient: 'from-blue-400 to-purple-500', bgGradient: 'from-blue-500/20 to-purple-500/20', borderColor: 'border-blue-500/30' },
  rising: { planetId: 'sun' as PlanetId, gradient: 'from-pink-400 to-rose-500', bgGradient: 'from-pink-500/20 to-rose-500/20', borderColor: 'border-pink-500/30' },
};

export default function BigThreeCard({ type, sign, interpretation }: BigThreeCardProps) {
  const params = useParams();
  const locale = ((params?.locale as string) || 'ko') as SupportedLocale;
  const config = typeConfig[type];
  const signName = SIGN_NAMES[sign][locale] || SIGN_NAMES[sign].en;
  const typeLabel = TYPE_LABELS[locale][type];

  return (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${config.bgGradient}
        border ${config.borderColor} backdrop-blur-sm p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg`}>
      <div className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${config.gradient} opacity-10 rounded-full blur-2xl`} />

      <div className="flex items-center gap-3 mb-4">
        <div className={`p-2 rounded-lg bg-gradient-to-br ${config.gradient}`}>
          <PlanetIcon planet={config.planetId} size="sm" />
        </div>
        <span className="text-white/70 font-medium">{typeLabel}</span>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <ZodiacIcon sign={sign} size="lg" animated />
        <div>
          <h3 className="text-2xl font-bold text-white">{signName}</h3>
        </div>
      </div>

      {interpretation && (
        <p className="text-white/70 text-sm leading-relaxed">{interpretation}</p>
      )}
    </div>
  );
}
