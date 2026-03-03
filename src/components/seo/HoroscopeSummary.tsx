/**
 * HoroscopeSummary — GEO citation-friendly 운세 요약 블록
 *
 * AI 검색엔진이 인용할 수 있도록 구조화된 50-70단어 요약을 제공합니다.
 * - <time dateTime> : Perplexity/AI 신선도 신호
 * - id="horoscope-daily-summary" : SpeakableSpecification cssSelector
 * - 점수 5개 grid : citation-friendly 구조화 데이터
 */

export interface HoroscopeSummaryScores {
  overall: number;
  love: number;
  career: number;
  health: number;
  money: number;
}

interface HoroscopeSummaryProps {
  signName: string;
  signSymbol: string;
  dateFormatted: string;
  isoDate: string;
  /** locale-resolved 운세 한 줄 요약 */
  overallText: string;
  scores: HoroscopeSummaryScores;
  locale: string;
}

const scoreLabels: Record<string, Record<string, string>> = {
  ko: { overall: '종합운', love: '연애운', career: '직장운', health: '건강운', money: '금전운' },
  en: { overall: 'Overall', love: 'Love', career: 'Career', health: 'Health', money: 'Money' },
  zh: { overall: '综合运', love: '爱情运', career: '事业运', health: '健康运', money: '财运' },
  ja: { overall: '総合運', love: '恋愛運', career: '仕事運', health: '健康運', money: '金運' },
  es: { overall: 'General', love: 'Amor', career: 'Trabajo', health: 'Salud', money: 'Dinero' },
};

const summaryPrefixes: Record<string, (sign: string) => string> = {
  ko: (sign) => `${sign} 오늘의 운세 요약`,
  en: (sign) => `${sign} Daily Horoscope Summary`,
  zh: (sign) => `${sign}今日运势概览`,
  ja: (sign) => `${sign}今日の運勢まとめ`,
  es: (sign) => `Resumen del Horóscopo Diario de ${sign}`,
};

export default function HoroscopeSummary({
  signName,
  signSymbol,
  dateFormatted,
  isoDate,
  overallText,
  scores,
  locale,
}: HoroscopeSummaryProps) {
  const safeLocale = scoreLabels[locale] ? locale : 'en';
  const labels = scoreLabels[safeLocale];
  const prefixFn = summaryPrefixes[safeLocale] ?? summaryPrefixes.en;
  const scoreEntries = Object.entries(scores) as [keyof HoroscopeSummaryScores, number][];

  return (
    <div
      id="horoscope-daily-summary"
      className="glass-card p-6 mb-8 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border border-purple-400/20"
      aria-label={prefixFn(signName)}
    >
      {/* 헤더: 별자리명 + 날짜 */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-3xl" role="img" aria-label={signName}>{signSymbol}</span>
        <div>
          <p className="text-white font-semibold text-lg">{prefixFn(signName)}</p>
          <time dateTime={isoDate} className="text-white/50 text-sm">
            {dateFormatted}
          </time>
        </div>
      </div>

      {/* 운세 요약 텍스트 */}
      <p className="text-white/85 leading-relaxed text-sm mb-5">
        {overallText}
      </p>

      {/* 5개 점수 그리드 */}
      <div className="grid grid-cols-5 gap-2">
        {scoreEntries.map(([key, value]) => (
          <div key={key} className="text-center p-2 bg-white/5 rounded-lg">
            <p className="text-white/50 text-xs mb-1">{labels[key]}</p>
            <p className="text-white font-bold text-base tabular-nums">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
