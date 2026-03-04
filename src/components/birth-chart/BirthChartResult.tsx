'use client';

import { useParams } from 'next/navigation';
import type { BirthChartResult as BirthChartResultType, LocalizedText } from '@/types';
import BigThreeCard from './BigThreeCard';
import ChartWheel from './ChartWheel';

type SupportedLocale = 'ko' | 'en' | 'zh' | 'ja' | 'es';

function localizedText(text: LocalizedText, locale: string): string {
  return (text as unknown as Record<string, string>)[locale] || text.en || text.ko;
}

const ELEMENT_NAMES: Record<SupportedLocale, Record<string, string>> = {
  ko: { fire:'불', earth:'흙', air:'바람', water:'물' },
  en: { fire:'Fire', earth:'Earth', air:'Air', water:'Water' },
  zh: { fire:'火', earth:'土', air:'风', water:'水' },
  ja: { fire:'火', earth:'土', air:'風', water:'水' },
  es: { fire:'Fuego', earth:'Tierra', air:'Aire', water:'Agua' },
};

const MODALITY_NAMES: Record<SupportedLocale, Record<string, string>> = {
  ko: { cardinal:'활동궁', fixed:'고정궁', mutable:'변통궁' },
  en: { cardinal:'Cardinal', fixed:'Fixed', mutable:'Mutable' },
  zh: { cardinal:'本位宫', fixed:'固定宫', mutable:'变通宫' },
  ja: { cardinal:'活動宮', fixed:'固定宮', mutable:'柔軟宮' },
  es: { cardinal:'Cardinal', fixed:'Fijo', mutable:'Mutable' },
};

const SECTION_LABELS: Record<SupportedLocale, {
  summary: string; dominantElement: string; dominantModality: string;
  birthInfo: string; date: string; time: string; latitude: string; longitude: string;
}> = {
  ko: { summary:'차트 요약', dominantElement:'지배 원소', dominantModality:'지배 모달리티', birthInfo:'출생 정보', date:'날짜', time:'시간', latitude:'위도', longitude:'경도' },
  en: { summary:'Chart Summary', dominantElement:'Dominant Element', dominantModality:'Dominant Modality', birthInfo:'Birth Information', date:'Date', time:'Time', latitude:'Latitude', longitude:'Longitude' },
  zh: { summary:'星盘摘要', dominantElement:'主导元素', dominantModality:'主导模式', birthInfo:'出生信息', date:'日期', time:'时间', latitude:'纬度', longitude:'经度' },
  ja: { summary:'チャートサマリー', dominantElement:'支配元素', dominantModality:'支配モダリティ', birthInfo:'出生情報', date:'日付', time:'時間', latitude:'緯度', longitude:'経度' },
  es: { summary:'Resumen del Carta', dominantElement:'Elemento Dominante', dominantModality:'Modalidad Dominante', birthInfo:'Información de Nacimiento', date:'Fecha', time:'Hora', latitude:'Latitud', longitude:'Longitud' },
};

const ELEMENT_DESCRIPTIONS: Record<SupportedLocale, Record<string, string>> = {
  ko: {
    fire: '열정, 에너지, 창의성이 당신의 주요 특성입니다.',
    earth: '안정성, 실용성, 인내가 당신의 주요 특성입니다.',
    air: '지성, 소통, 사회성이 당신의 주요 특성입니다.',
    water: '감성, 직관, 공감능력이 당신의 주요 특성입니다.',
  },
  en: {
    fire: 'Passion, energy, and creativity are your key traits.',
    earth: 'Stability, practicality, and patience are your key traits.',
    air: 'Intellect, communication, and sociability are your key traits.',
    water: 'Emotion, intuition, and empathy are your key traits.',
  },
  zh: {
    fire: '热情、活力和创造力是您的主要特质。',
    earth: '稳定性、实用性和耐心是您的主要特质。',
    air: '智慧、沟通能力和社交性是您的主要特质。',
    water: '情感、直觉和同理心是您的主要特质。',
  },
  ja: {
    fire: '情熱、エネルギー、創造性があなたの主な特質です。',
    earth: '安定性、実用性、忍耐力があなたの主な特質です。',
    air: '知性、コミュニケーション力、社交性があなたの主な特質です。',
    water: '感情、直感、共感力があなたの主な特質です。',
  },
  es: {
    fire: 'La pasión, energía y creatividad son tus principales rasgos.',
    earth: 'La estabilidad, practicidad y paciencia son tus principales rasgos.',
    air: 'El intelecto, comunicación y sociabilidad son tus principales rasgos.',
    water: 'La emoción, intuición y empatía son tus principales rasgos.',
  },
};

const MODALITY_DESCRIPTIONS: Record<SupportedLocale, Record<string, string>> = {
  ko: {
    cardinal: '시작하고 이끄는 것을 좋아합니다. 주도적인 성향을 가지고 있습니다.',
    fixed: '꾸준하고 끈기 있습니다. 한번 시작하면 끝까지 해냅니다.',
    mutable: '유연하고 적응력이 뛰어납니다. 변화를 잘 받아들입니다.',
  },
  en: {
    cardinal: 'You love to initiate and lead. You have a proactive nature.',
    fixed: 'You are steady and persistent. Once you start, you see it through.',
    mutable: 'You are flexible and adaptable. You embrace change easily.',
  },
  zh: {
    cardinal: '您喜欢开创和领导，具有积极主动的性格。',
    fixed: '您稳定而坚韧，一旦开始就会坚持到底。',
    mutable: '您灵活且适应力强，能够轻松接受变化。',
  },
  ja: {
    cardinal: '開始してリードすることが好きです。主体的な性格を持っています。',
    fixed: '着実で粘り強いです。一度始めたら最後までやり遂げます。',
    mutable: '柔軟で適応力があります。変化をうまく受け入れます。',
  },
  es: {
    cardinal: 'Te encanta iniciar y liderar. Tienes una naturaleza proactiva.',
    fixed: 'Eres constante y persistente. Una vez que comienzas, lo terminas.',
    mutable: 'Eres flexible y adaptable. Aceptas el cambio con facilidad.',
  },
};

interface BirthChartResultProps {
  result: BirthChartResultType;
}

export default function BirthChartResult({ result }: BirthChartResultProps) {
  const params = useParams();
  const locale = ((params?.locale as string) || 'ko') as SupportedLocale;

  const elementNames = ELEMENT_NAMES[locale] || ELEMENT_NAMES.en;
  const modalityNames = MODALITY_NAMES[locale] || MODALITY_NAMES.en;
  const labels = SECTION_LABELS[locale] || SECTION_LABELS.en;
  const elementDescs = ELEMENT_DESCRIPTIONS[locale] || ELEMENT_DESCRIPTIONS.en;
  const modalityDescs = MODALITY_DESCRIPTIONS[locale] || MODALITY_DESCRIPTIONS.en;

  return (
    <div className="space-y-8">
      {/* 요약 */}
      <div className="glass-card p-6 rounded-2xl">
        <h2 className="text-xl font-bold text-white mb-4">{labels.summary}</h2>
        <p className="text-white/80 leading-relaxed">
          {localizedText(result.interpretation.summary, locale)}
        </p>
      </div>

      {/* 차트 휠 */}
      <div className="flex justify-center">
        <ChartWheel sunSign={result.sunSign} moonSign={result.moonSign} risingSign={result.risingSign} />
      </div>

      {/* Big Three 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <BigThreeCard
          type="sun"
          sign={result.sunSign}
          interpretation={localizedText(result.interpretation.sunSignMeaning, locale)}
        />
        <BigThreeCard
          type="moon"
          sign={result.moonSign}
          interpretation={localizedText(result.interpretation.moonSignMeaning, locale)}
        />
        <BigThreeCard
          type="rising"
          sign={result.risingSign}
          interpretation={localizedText(result.interpretation.risingSignMeaning, locale)}
        />
      </div>

      {/* 원소 & 모달리티 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="glass-card p-6 rounded-2xl">
          <h3 className="text-lg font-semibold text-white mb-3">{labels.dominantElement}</h3>
          <div className="flex items-center gap-3">
            <ElementIcon element={result.dominantElement} />
            <span className="text-2xl font-bold text-white">
              {elementNames[result.dominantElement] || result.dominantElement}
            </span>
          </div>
          <p className="mt-3 text-white/60 text-sm">
            {elementDescs[result.dominantElement] || ''}
          </p>
        </div>

        <div className="glass-card p-6 rounded-2xl">
          <h3 className="text-lg font-semibold text-white mb-3">{labels.dominantModality}</h3>
          <div className="flex items-center gap-3">
            <ModalityIcon modality={result.dominantModality} />
            <span className="text-2xl font-bold text-white">
              {modalityNames[result.dominantModality] || result.dominantModality}
            </span>
          </div>
          <p className="mt-3 text-white/60 text-sm">
            {modalityDescs[result.dominantModality] || ''}
          </p>
        </div>
      </div>

      {/* 출생 정보 */}
      <div className="glass-card p-6 rounded-2xl">
        <h3 className="text-lg font-semibold text-white mb-4">{labels.birthInfo}</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-white/50">{labels.date}</span>
            <p className="text-white font-medium">{result.input.date}</p>
          </div>
          <div>
            <span className="text-white/50">{labels.time}</span>
            <p className="text-white font-medium">{result.input.time}</p>
          </div>
          <div>
            <span className="text-white/50">{labels.latitude}</span>
            <p className="text-white font-medium">{result.input.latitude.toFixed(4)}</p>
          </div>
          <div>
            <span className="text-white/50">{labels.longitude}</span>
            <p className="text-white font-medium">{result.input.longitude.toFixed(4)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ElementIcon({ element }: { element: string }) {
  const iconStyles: Record<string, string> = {
    fire: 'text-red-400', earth: 'text-green-400', air: 'text-blue-400', water: 'text-purple-400',
  };
  const cls = `w-8 h-8 ${iconStyles[element] || 'text-white'}`;

  const icons: Record<string, JSX.Element> = {
    fire: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={cls}>
        <path fillRule="evenodd" d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177A7.547 7.547 0 016.648 6.61a.75.75 0 00-1.152.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248zM15.75 14.25a3.75 3.75 0 11-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 011.925-3.545 3.75 3.75 0 013.255 3.717z" clipRule="evenodd" />
      </svg>
    ),
    earth: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={cls}>
        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM6.262 6.072a8.25 8.25 0 1010.562-.766 4.5 4.5 0 01-1.318 1.357L14.25 7.5l.165.33a.809.809 0 01-1.086 1.085l-.604-.302a1.125 1.125 0 00-1.298.21l-.132.131c-.439.44-.439 1.152 0 1.591l.296.296c.256.257.622.374.98.314l1.17-.195c.323-.054.654.036.905.245l1.33 1.108c.32.267.46.694.358 1.1a8.7 8.7 0 01-2.288 4.04l-.723.724a1.125 1.125 0 01-1.298.21l-.153-.076a1.125 1.125 0 01-.622-1.006v-1.089c0-.298-.119-.585-.33-.796l-1.347-1.347a1.125 1.125 0 01-.21-1.298L9.75 12l-1.64-1.64a6 6 0 01-1.676-3.257l-.172-1.03z" clipRule="evenodd" />
      </svg>
    ),
    air: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={cls}>
        <path d="M4.5 6.75a.75.75 0 000 1.5h9.409a.75.75 0 00.531-1.28l-1.5-1.5A5.236 5.236 0 008.598 4.5H8.25a5.25 5.25 0 100 10.5h.348c1.386 0 2.716.55 3.692 1.53l1.5 1.5a.75.75 0 01-.531 1.28H4.5a.75.75 0 000 1.5h9.409a2.25 2.25 0 001.591-3.84l-1.5-1.5A6.736 6.736 0 008.598 13.5H8.25a3.75 3.75 0 110-7.5h.348c1.061 0 2.078.42 2.829 1.17l1.5 1.5a2.25 2.25 0 01-1.591 3.84H4.5z" />
      </svg>
    ),
    water: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={cls}>
        <path fillRule="evenodd" d="M12 2.25c-2.429 0-4.817.178-7.152.521C2.87 3.061 1.5 4.91 1.5 6.99V9c0 1.863 1.129 3.514 2.848 4.202 1.042.415 2.205.718 3.402.935V16.5a.75.75 0 001.5 0V14.31c.773.105 1.565.167 2.372.182h.006c.757-.015 1.5-.074 2.226-.174v2.182a.75.75 0 001.5 0v-2.369a15.474 15.474 0 003.402-.935C20.371 12.514 21.5 10.863 21.5 9V6.99c0-2.08-1.37-3.929-3.348-4.219A48.394 48.394 0 0012 2.25zM8.25 9a.75.75 0 01.75-.75h6a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zm0 3a.75.75 0 01.75-.75h3a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75z" clipRule="evenodd" />
      </svg>
    ),
  };
  return icons[element] || null;
}

function ModalityIcon({ modality }: { modality: string }) {
  const cls = 'w-8 h-8 text-indigo-400';
  const icons: Record<string, JSX.Element> = {
    cardinal: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={cls}>
        <path fillRule="evenodd" d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z" clipRule="evenodd" />
      </svg>
    ),
    fixed: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={cls}>
        <path fillRule="evenodd" d="M12 1.5a.75.75 0 01.75.75V4.5a.75.75 0 01-1.5 0V2.25A.75.75 0 0112 1.5zM5.636 4.136a.75.75 0 011.06 0l1.592 1.591a.75.75 0 01-1.061 1.06l-1.591-1.59a.75.75 0 010-1.061zm12.728 0a.75.75 0 010 1.06l-1.591 1.592a.75.75 0 01-1.06-1.061l1.59-1.591a.75.75 0 011.061 0zm-6.816 4.496a.75.75 0 01.82.311l5.228 7.917a.75.75 0 01-.777 1.148l-2.097-.43 1.045 3.9a.75.75 0 01-1.45.388l-1.044-3.899-1.601 1.42a.75.75 0 01-1.247-.606l.569-9.47a.75.75 0 01.554-.68zM3 10.5a.75.75 0 01.75-.75H6a.75.75 0 010 1.5H3.75A.75.75 0 013 10.5zm14.25 0a.75.75 0 01.75-.75h2.25a.75.75 0 010 1.5H18a.75.75 0 01-.75-.75zm-8.962 3.712a.75.75 0 010 1.061l-1.591 1.591a.75.75 0 11-1.061-1.06l1.591-1.592a.75.75 0 011.06 0z" clipRule="evenodd" />
      </svg>
    ),
    mutable: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={cls}>
        <path fillRule="evenodd" d="M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-3.183a.75.75 0 100 1.5h4.992a.75.75 0 00.75-.75V4.356a.75.75 0 00-1.5 0v3.18l-1.9-1.9A9 9 0 003.306 9.67a.75.75 0 101.45.388zm15.408 3.352a.75.75 0 00-.919.53 7.5 7.5 0 01-12.548 3.364l-1.902-1.903h3.183a.75.75 0 000-1.5H2.984a.75.75 0 00-.75.75v4.992a.75.75 0 001.5 0v-3.18l1.9 1.9a9 9 0 0015.059-4.035.75.75 0 00-.53-.918z" clipRule="evenodd" />
      </svg>
    ),
  };
  return icons[modality] || null;
}
