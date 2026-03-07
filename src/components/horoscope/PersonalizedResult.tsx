'use client';

import { useState } from 'react';
import Link from 'next/link';
import ZodiacIcon from '@/components/ui/ZodiacIcon';
import { zodiacData } from '@/data/zodiac-info';
import { isAdSenseEnabled } from '@/lib/adsense-config';
import { AdSenseUnit, AdSenseInArticle } from '@/components/ads';
import { getElementTheme, getElementCSSVars } from '@/lib/element-theme';
import { getMonthCalendar } from '@/lib/horoscope-generator';
import ScoreBar from '@/components/ui/ScoreBar';
import OverallScoreGauge from './OverallScoreGauge';
import TarotCard from './TarotCard';
import BiorhythmChart from './BiorhythmChart';
import FortuneRanking from './FortuneRanking';
import FortuneTrend from './FortuneTrend';
import FortuneCalendar from './FortuneCalendar';
import DailyRhythm from './DailyRhythm';
import SmartCTASection from './SmartCTASection';
import LuckyElements from './LuckyElements';
import TimeBasedFortune from './TimeBasedFortune';
import FortuneComparison from './FortuneComparison';
import ShareCard from './ShareCard';
import FortuneFeedback from './FortuneFeedback';
import FortuneAccuracyStats from './FortuneAccuracyStats';
import LockedContent from './LockedContent';
import ParticleEffect from './ParticleEffect';
import TypingReveal from './TypingReveal';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import type { ZodiacSignId, HoroscopeCategory, SubIndicator } from '@/types';
import type { FortuneFeedback as FortuneFeedbackItem } from '@/types/engagement';
import { calculateAccuracyStats } from '@/lib/fortune-stats';
import type {
  ExtendedLuckyElements,
  TarotCard as TarotCardType,
  BiorhythmData,
  TimeBasedFortune as TimeBasedFortuneType,
  FortuneRankingEntry,
  ExtendedTrendPoint,
  CalendarDayData,
  SmartCTA,
} from '@/types/horoscope-extended';
import type { ContentLockStatus } from '@/types/engagement';

interface MicroStoryData {
  title: string;
  content: string;
  moral: string;
  teaser: string;
}

const RESULT_TEXT = {
  ko: {
    catLabels: { overall: '종합운', love: '연애운', career: '직장운', health: '건강운', money: '금전운' },
    elements: { fire: '🔥 불의 원소', earth: '🌿 땅의 원소', air: '💨 바람의 원소', water: '💧 물의 원소' },
    categorySection: '카테고리별 운세',
    compatSection: '오늘의 궁합 하이라이트',
    compatScore: '궁합 점수: ',
    compatDetail: '자세한 궁합 보기',
    learnMore: '더 알아보기',
    compatibility: '별자리 궁합',
    birthChart: '출생 차트',
    details: '상세 정보',
    detailPage: '상세 운세 페이지',
  },
  en: {
    catLabels: { overall: 'Overall', love: 'Love', career: 'Career', health: 'Health', money: 'Money' },
    elements: { fire: '🔥 Fire Element', earth: '🌿 Earth Element', air: '💨 Air Element', water: '💧 Water Element' },
    categorySection: 'Category Horoscopes',
    compatSection: "Today's Compatibility",
    compatScore: 'Score: ',
    compatDetail: 'View Compatibility',
    learnMore: 'Learn More',
    compatibility: 'Compatibility',
    birthChart: 'Birth Chart',
    details: 'Details',
    detailPage: 'Detailed Horoscope',
  },
  zh: {
    catLabels: { overall: '综合运', love: '爱情运', career: '事业运', health: '健康运', money: '财运' },
    elements: { fire: '🔥 火元素', earth: '🌿 土元素', air: '💨 风元素', water: '💧 水元素' },
    categorySection: '各类别运势',
    compatSection: '今日配对亮点',
    compatScore: '配对分数：',
    compatDetail: '查看详细配对',
    learnMore: '了解更多',
    compatibility: '星座配对',
    birthChart: '出生星盘',
    details: '详细信息',
    detailPage: '详细运势页面',
  },
  ja: {
    catLabels: { overall: '総合運', love: '恋愛運', career: '仕事運', health: '健康運', money: '金運' },
    elements: { fire: '🔥 火のエレメント', earth: '🌿 地のエレメント', air: '💨 風のエレメント', water: '💧 水のエレメント' },
    categorySection: 'カテゴリ別運勢',
    compatSection: '今日の相性ハイライト',
    compatScore: '相性スコア：',
    compatDetail: '詳細な相性を見る',
    learnMore: '詳しく見る',
    compatibility: '星座相性',
    birthChart: '出生チャート',
    details: '詳細情報',
    detailPage: '詳細運勢ページ',
  },
  es: {
    catLabels: { overall: 'General', love: 'Amor', career: 'Trabajo', health: 'Salud', money: 'Dinero' },
    elements: { fire: '🔥 Elemento Fuego', earth: '🌿 Elemento Tierra', air: '💨 Elemento Aire', water: '💧 Elemento Agua' },
    categorySection: 'Horóscopos por Categoría',
    compatSection: 'Compatibilidad de Hoy',
    compatScore: 'Puntuación: ',
    compatDetail: 'Ver Compatibilidad',
    learnMore: 'Más Info',
    compatibility: 'Compatibilidad',
    birthChart: 'Carta Natal',
    details: 'Detalles',
    detailPage: 'Horóscopo Detallado',
  },
} as const;
type ResultLocale = keyof typeof RESULT_TEXT;


interface PersonalizedResultProps {
  signId: ZodiacSignId;
  overallPercent: number;
  categoryScores: Record<HoroscopeCategory, 1 | 2 | 3 | 4 | 5>;
  categoryTexts: Record<HoroscopeCategory, string>;
  categoryDetailedScores?: Record<HoroscopeCategory, number>;
  categorySubIndicators?: Record<HoroscopeCategory, SubIndicator[]>;
  yesterdayPercent?: number;
  yesterdayCategoryScores?: Record<HoroscopeCategory, number>;
  percentileRank?: number;
  affirmation: string;
  timeFortunes: TimeBasedFortuneType[];
  extendedLucky: ExtendedLuckyElements;
  tarot: TarotCardType;
  biorhythm: BiorhythmData[];
  extendedTrend: ExtendedTrendPoint[];
  calendarData: CalendarDayData[];
  calendarYear: number;
  calendarMonth: number;
  ranking: FortuneRankingEntry[];
  compatibilityHighlight: { bestMatch: ZodiacSignId; score: number; message: string };
  contentStatuses?: Record<string, ContentLockStatus>;
  visitStreak?: number;
  microStory?: MicroStoryData;
  tomorrowTeaser?: string;
  smartCTAs?: SmartCTA[];
  visitedDates?: Set<string>;
  locale?: string;
  fortuneFeedback?: FortuneFeedbackItem[];
}

const CAT_ICONS: Record<HoroscopeCategory, string> = {
  overall: '⭐', love: '❤️', career: '💼', health: '🏥', money: '💰',
};

function RevealSection({ children, className = '', delay = 0 }: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${className} ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function PersonalizedResult(props: PersonalizedResultProps) {
  const {
    signId, overallPercent, categoryScores, categoryTexts,
    categoryDetailedScores, categorySubIndicators,
    yesterdayPercent, yesterdayCategoryScores, percentileRank,
    affirmation, timeFortunes, extendedLucky, tarot,
    biorhythm, extendedTrend, calendarData, calendarYear, calendarMonth,
    ranking, compatibilityHighlight,
    contentStatuses, smartCTAs = [], visitedDates = new Set<string>(),
    locale = 'ko',
  } = props;
  const tl = RESULT_TEXT[(locale as ResultLocale) in RESULT_TEXT ? (locale as ResultLocale) : 'ko'];
  const categoryMeta = (Object.keys(CAT_ICONS) as HoroscopeCategory[]).map(key => ({
    key,
    label: tl.catLabels[key],
    icon: CAT_ICONS[key],
  }));

  const [calDisplay, setCalDisplay] = useState({ year: calendarYear, month: calendarMonth });
  const [dynCalData, setDynCalData] = useState<CalendarDayData[]>(calendarData);

  const handleMonthChange = (delta: number) => {
    const d = new Date(calDisplay.year, calDisplay.month + delta, 1);
    const newYear = d.getFullYear();
    const newMonth = d.getMonth();
    setCalDisplay({ year: newYear, month: newMonth });
    setDynCalData(getMonthCalendar(signId, d, visitedDates));
  };

  const info = zodiacData[signId];
  const bestMatchInfo = zodiacData[compatibilityHighlight.bestMatch];
  const adsEnabled = isAdSenseEnabled();
  const theme = getElementTheme(signId);
  const cssVars = getElementCSSVars(signId);

  // 기본 콘텐츠 상태
  const getStatus = (id: string): ContentLockStatus =>
    contentStatuses?.[id] ?? 'unlocked';

  const streak = props.visitStreak ?? 0;
  const accuracyStats = props.fortuneFeedback
    ? calculateAccuracyStats(props.fortuneFeedback, signId)
    : null;

  return (
    <div className="space-y-6 relative" style={cssVars}>
      {/* 파티클 이펙트 */}
      <ParticleEffect type={theme.particleType} color={theme.glowColor} count={6} />

      {/* ① 별자리 헤더 - 엘리먼트 테마 적용 */}
      <RevealSection>
        <div className={`glass-card p-6 text-center element-${info.element} relative overflow-hidden`}>
          <div
            className="mb-2 flex justify-center"
            style={{ filter: `drop-shadow(0 0 20px ${theme.glowColor})` }}
          >
            <ZodiacIcon sign={signId} size="xl" animated />
          </div>
          <h2 className="text-2xl font-serif font-bold text-white">
            <TypingReveal text={info.name} speed={80} />
          </h2>
          <p className="text-white/50 text-sm mt-1">{info.dateRange}</p>
          <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium
            ${info.element === 'fire' ? 'bg-red-500/20 text-red-300 element-glow-fire' : ''}
            ${info.element === 'earth' ? 'bg-green-500/20 text-green-300 element-glow-earth' : ''}
            ${info.element === 'air' ? 'bg-blue-500/20 text-blue-300 element-glow-air' : ''}
            ${info.element === 'water' ? 'bg-purple-500/20 text-purple-300 element-glow-water' : ''}
          `}>
            {tl.elements[info.element as keyof typeof tl.elements]}
          </span>
        </div>
      </RevealSection>

      {/* ① ‑b 일일 리듬 타임라인 */}
      <RevealSection delay={80}>
        <DailyRhythm timeFortunes={timeFortunes} locale={locale} />
      </RevealSection>

      {/* ② 종합 점수 게이지 */}
      <RevealSection delay={100}>
        <OverallScoreGauge
          overallPercent={overallPercent}
          categoryScores={categoryScores}
          categoryDetailedScores={categoryDetailedScores}
          yesterdayPercent={yesterdayPercent}
          percentileRank={percentileRank}
          locale={locale}
        />
      </RevealSection>

      {/* ③ 오늘의 확언 */}
      <RevealSection delay={150}>
        <div className={`glass-card p-5 border-${theme.element === 'fire' ? 'red' : theme.element === 'earth' ? 'green' : theme.element === 'air' ? 'blue' : 'purple'}-500/20`}
          style={{ background: `linear-gradient(135deg, ${theme.primaryColor}10, ${theme.secondaryColor}10)` }}
        >
          <p className="text-center text-white/90 text-sm leading-relaxed italic">
            &ldquo;{affirmation}&rdquo;
          </p>
        </div>
      </RevealSection>

      {/* ④ 시간대별 운세 */}
      <RevealSection delay={200}>
        <TimeBasedFortune fortunes={timeFortunes} locale={locale} />
      </RevealSection>

      {/* ⑤ AdSense 배너 */}
      {adsEnabled && (
        <div>
          <AdSenseUnit adFormat="auto" responsive={true} className="w-full" />
        </div>
      )}

      {/* ⑥ 카테고리별 상세 운세 */}
      <RevealSection>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white text-center">{tl.categorySection}</h3>
          {categoryMeta.map(({ key, label, icon }) => {
            const dScore = categoryDetailedScores?.[key];
            const subs = categorySubIndicators?.[key];
            const yesterdayDScore = yesterdayCategoryScores?.[key];
            const delta = dScore != null && yesterdayDScore != null ? dScore - yesterdayDScore : null;

            return (
              <div key={key} className="glass-card p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">{icon}</span>
                  <span className="text-white font-medium text-sm">{label}</span>
                  {delta != null && delta !== 0 && (
                    <span className={`text-xs font-medium ml-auto ${delta > 0 ? 'score-up' : 'score-down'}`}>
                      {delta > 0 ? '▲' : '▼'}{Math.abs(delta)}
                    </span>
                  )}
                </div>
                <div className="mb-3">
                  <ScoreBar
                    score={categoryScores[key]}
                    variant="detailed"
                    showValue
                    detailedScore={dScore}
                    subIndicators={subs}
                  />
                </div>
                <p className="text-white/75 text-sm leading-relaxed">{categoryTexts[key]}</p>
              </div>
            );
          })}
        </div>
      </RevealSection>

      {/* ⑥‑b 스마트 CTA */}
      {smartCTAs.length > 0 && (
        <RevealSection>
          <SmartCTASection ctas={smartCTAs} locale={locale} />
        </RevealSection>
      )}

      {/* ⑥‑c 운세 피드백 (SmartCTA 바로 아래) */}
      <RevealSection>
        <FortuneFeedback signId={signId} locale={locale} />
      </RevealSection>

      {/* ⑥‑d 운세 적중 통계 (피드백 5개 이상 시 표시) */}
      {accuracyStats && (
        <RevealSection>
          <FortuneAccuracyStats stats={accuracyStats} locale={locale} />
        </RevealSection>
      )}

      {/* ⑦ 확장 행운 요소 */}
      <RevealSection>
        <LuckyElements lucky={extendedLucky} locale={locale} />
      </RevealSection>

      {/* ⑧ 오늘의 타로 */}
      <RevealSection>
        <TarotCard card={tarot} />
      </RevealSection>

      {/* ⑨ AdSense 인아티클 */}
      {adsEnabled && (
        <div>
          <AdSenseInArticle className="w-full" />
        </div>
      )}

      {/* ⑩ 바이오리듬 */}
      <RevealSection>
        <LockedContent contentId="biorhythm" status={getStatus('biorhythm')} currentStreak={streak} locale={locale}>
          <BiorhythmChart data={biorhythm} />
        </LockedContent>
      </RevealSection>

      {/* ⑪ 30일 트렌드 */}
      <RevealSection>
        <FortuneTrend data={extendedTrend} locale={locale} />
      </RevealSection>

      {/* ⑪‑b 월간 운세 캘린더 */}
      <RevealSection>
        <FortuneCalendar
          data={dynCalData}
          year={calDisplay.year}
          month={calDisplay.month}
          onMonthChange={handleMonthChange}
          visitStreak={props.visitStreak}
          locale={locale}
        />
      </RevealSection>

      {/* ⑫ 별자리 순위 */}
      <RevealSection>
        <FortuneRanking ranking={ranking} mySignId={signId} locale={locale} />
      </RevealSection>

      {/* ⑬ 궁합 하이라이트 */}
      <RevealSection>
        <div className="glass-card p-6 text-center">
          <h3 className="text-lg font-semibold text-white mb-3">{tl.compatSection}</h3>
          <div className="flex items-center justify-center gap-3 mb-3">
            <div style={{ filter: `drop-shadow(0 0 10px ${theme.glowColor})` }}>
              <ZodiacIcon sign={signId} size="md" />
            </div>
            <span className="text-white/30">×</span>
            <ZodiacIcon sign={compatibilityHighlight.bestMatch} size="md" />
          </div>
          <p className="text-white font-medium">{bestMatchInfo.name}</p>
          <p className={`text-sm ${theme.textClass} mb-2`}>{tl.compatScore}{compatibilityHighlight.score}</p>
          <p className="text-sm text-white/70 leading-relaxed">{compatibilityHighlight.message}</p>
          <Link
            href="/compatibility"
            className="inline-block mt-3 px-5 py-2 rounded-full text-sm font-medium
                       bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            {tl.compatDetail}
          </Link>
        </div>
      </RevealSection>

      {/* ⑭ 친구와 비교 */}
      <RevealSection>
        <FortuneComparison mySignId={signId} locale={locale} />
      </RevealSection>

      {/* ⑮ 공유 카드 */}
      <RevealSection>
        <ShareCard signId={signId} score={overallPercent} affirmation={affirmation} locale={locale} />
      </RevealSection>

      {/* ⑯ AdSense 배너 */}
      {adsEnabled && (
        <div>
          <AdSenseUnit adFormat="auto" responsive={true} className="w-full" />
        </div>
      )}

      {/* ⑰ 관련 콘텐츠 링크 */}
      <RevealSection>
        <div className="glass-card p-6 text-center">
          <h3 className="text-lg font-semibold text-white mb-4">{tl.learnMore}</h3>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/compatibility"
              className="px-5 py-2.5 rounded-full text-sm font-medium bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              {tl.compatibility}
            </Link>
            <Link
              href="/birth-chart"
              className="px-5 py-2.5 rounded-full text-sm font-medium bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              {tl.birthChart}
            </Link>
            <Link
              href={`/zodiac/${signId}`}
              className="px-5 py-2.5 rounded-full text-sm font-medium bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              {info.name} {tl.details}
            </Link>
            <Link
              href={`/horoscope/daily/${signId}`}
              className="px-5 py-2.5 rounded-full text-sm font-medium bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              {tl.detailPage}
            </Link>
          </div>
        </div>
      </RevealSection>
    </div>
  );
}
