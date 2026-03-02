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
import LockedContent from './LockedContent';
import ParticleEffect from './ParticleEffect';
import TypingReveal from './TypingReveal';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import type { ZodiacSignId, HoroscopeCategory, SubIndicator } from '@/types';
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
}

const categoryMeta: { key: HoroscopeCategory; label: string; icon: string }[] = [
  { key: 'overall', label: '종합운', icon: '⭐' },
  { key: 'love', label: '연애운', icon: '❤️' },
  { key: 'career', label: '직장운', icon: '💼' },
  { key: 'health', label: '건강운', icon: '🏥' },
  { key: 'money', label: '금전운', icon: '💰' },
];

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
  } = props;

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
            {info.element === 'fire' ? '🔥 불의 원소' : info.element === 'earth' ? '🌿 땅의 원소' : info.element === 'air' ? '💨 바람의 원소' : '💧 물의 원소'}
          </span>
        </div>
      </RevealSection>

      {/* ① ‑b 일일 리듬 타임라인 */}
      <RevealSection delay={80}>
        <DailyRhythm timeFortunes={timeFortunes} />
      </RevealSection>

      {/* ② 종합 점수 게이지 */}
      <RevealSection delay={100}>
        <OverallScoreGauge
          overallPercent={overallPercent}
          categoryScores={categoryScores}
          categoryDetailedScores={categoryDetailedScores}
          yesterdayPercent={yesterdayPercent}
          percentileRank={percentileRank}
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
        <TimeBasedFortune fortunes={timeFortunes} />
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
          <h3 className="text-lg font-semibold text-white text-center">카테고리별 운세</h3>
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
          <SmartCTASection ctas={smartCTAs} />
        </RevealSection>
      )}

      {/* ⑦ 확장 행운 요소 */}
      <RevealSection>
        <LuckyElements lucky={extendedLucky} />
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
        <LockedContent contentId="biorhythm" status={getStatus('biorhythm')} currentStreak={streak}>
          <BiorhythmChart data={biorhythm} />
        </LockedContent>
      </RevealSection>

      {/* ⑪ 30일 트렌드 */}
      <RevealSection>
        <FortuneTrend data={extendedTrend} />
      </RevealSection>

      {/* ⑪‑b 월간 운세 캘린더 */}
      <RevealSection>
        <FortuneCalendar
          data={dynCalData}
          year={calDisplay.year}
          month={calDisplay.month}
          onMonthChange={handleMonthChange}
          visitStreak={props.visitStreak}
        />
      </RevealSection>

      {/* ⑫ 별자리 순위 */}
      <RevealSection>
        <FortuneRanking ranking={ranking} mySignId={signId} />
      </RevealSection>

      {/* ⑬ 궁합 하이라이트 */}
      <RevealSection>
        <div className="glass-card p-6 text-center">
          <h3 className="text-lg font-semibold text-white mb-3">오늘의 궁합 하이라이트</h3>
          <div className="flex items-center justify-center gap-3 mb-3">
            <div style={{ filter: `drop-shadow(0 0 10px ${theme.glowColor})` }}>
              <ZodiacIcon sign={signId} size="md" />
            </div>
            <span className="text-white/30">×</span>
            <ZodiacIcon sign={compatibilityHighlight.bestMatch} size="md" />
          </div>
          <p className="text-white font-medium">{bestMatchInfo.name}</p>
          <p className={`text-sm ${theme.textClass} mb-2`}>궁합 점수: {compatibilityHighlight.score}점</p>
          <p className="text-sm text-white/70 leading-relaxed">{compatibilityHighlight.message}</p>
          <Link
            href="/compatibility"
            className="inline-block mt-3 px-5 py-2 rounded-full text-sm font-medium
                       bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            자세한 궁합 보기
          </Link>
        </div>
      </RevealSection>

      {/* ⑭ 친구와 비교 */}
      <RevealSection>
        <FortuneComparison mySignId={signId} />
      </RevealSection>

      {/* ⑮ 공유 카드 */}
      <RevealSection>
        <ShareCard signId={signId} score={overallPercent} affirmation={affirmation} />
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
          <h3 className="text-lg font-semibold text-white mb-4">더 알아보기</h3>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/compatibility"
              className="px-5 py-2.5 rounded-full text-sm font-medium bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              별자리 궁합
            </Link>
            <Link
              href="/birth-chart"
              className="px-5 py-2.5 rounded-full text-sm font-medium bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              출생 차트
            </Link>
            <Link
              href={`/zodiac/${signId}`}
              className="px-5 py-2.5 rounded-full text-sm font-medium bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              {info.name} 상세 정보
            </Link>
            <Link
              href={`/horoscope/daily/${signId}`}
              className="px-5 py-2.5 rounded-full text-sm font-medium bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              상세 운세 페이지
            </Link>
          </div>
        </div>
      </RevealSection>
    </div>
  );
}
