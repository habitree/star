'use client';

import { useState, useEffect, useCallback } from 'react';
import { useUserStore } from '@/stores/user-store';
import {
  generateDailyHoroscope,
  generateExtendedLuckyElements,
  generateDailyTarot,
  generateTimeFortune,
  getTodayFullRanking,
  getExtendedTrend,
  getMonthCalendar,
  generateDailyAffirmation,
  generateCompatibilityHighlight,
} from '@/lib/horoscope-generator';
import { getSmartCTAs } from '@/lib/smart-cta';
import { getBiorhythmWeek } from '@/lib/biorhythm';
import { getNewlyEarnedReward } from '@/lib/streak-rewards';
import { getContentStatus } from '@/lib/content-unlock';
import { startSession, trackEvent } from '@/lib/engagement-tracker';
import { getActiveEvents } from '@/lib/seasonal-scheduler';
import { generateDailyMicroStory, getTomorrowTeaser } from '@/lib/micro-story';
import { generateEmotionResponse } from '@/lib/emotion-response';
import BirthDateForm from './BirthDateForm';
import WelcomeBack from './WelcomeBack';
import PersonalizedResult from './PersonalizedResult';
import OnboardingFlow from './OnboardingFlow';
import DailyCheckIn from './DailyCheckIn';
import StarIntro from './StarIntro';
import FortuneChatBot from './FortuneChatBot';
import StreakDashboard from './StreakDashboard';
import type { ZodiacSignId, HoroscopeCategory, DetailedCategoryHoroscope, SubIndicator } from '@/types';
import type { ContentLockStatus } from '@/types/engagement';
import type { SmartCTA, CalendarDayData } from '@/types/horoscope-extended';

export default function HoroscopeClientApp() {
  const {
    birthDate, birthSign,
    visitStreak, longestStreak, earnedBadges,
    unlockedContentIds, completedActions,
    onboardingCompleted, todayCheckedIn, lastCheckInDate,
    history,
    setBirthDate, recordHoroscopeView, addToHistory,
    performCheckIn, addBadge, unlockContent, completeAction,
    completeOnboarding,
  } = useUserStore();

  const [hydrated, setHydrated] = useState(false);
  const [currentSign, setCurrentSign] = useState<ZodiacSignId | null>(null);
  const [currentBirthDate, setCurrentBirthDate] = useState<string | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showStarIntro, setShowStarIntro] = useState(false);
  const [newRewardMessage, setNewRewardMessage] = useState<string | null>(null);

  // 하이드레이션 처리
  useEffect(() => {
    setHydrated(true);
    startSession();
  }, []);

  // 오늘 체크인 리셋 (날짜 변경 감지)
  useEffect(() => {
    if (!hydrated) return;
    const today = new Date().toISOString().split('T')[0];
    if (lastCheckInDate !== today) {
      // todayCheckedIn will naturally be false for new day via store logic
    }
  }, [hydrated, lastCheckInDate]);

  useEffect(() => {
    if (hydrated && birthDate && birthSign) {
      setCurrentSign(birthSign);
      setCurrentBirthDate(birthDate);
      const prevStreak = visitStreak;
      recordHoroscopeView();

      // 새 마일스톤 확인
      const newStreak = useUserStore.getState().visitStreak;
      const reward = getNewlyEarnedReward(prevStreak, newStreak);
      if (reward) {
        addBadge(reward.badge);
        unlockContent(reward.unlockContent);
        setNewRewardMessage(reward.message);
        setTimeout(() => setNewRewardMessage(null), 5000);
      }
    } else if (hydrated && !birthDate && !onboardingCompleted) {
      setShowOnboarding(true);
    }
  }, [hydrated, birthDate, birthSign]); // eslint-disable-line react-hooks/exhaustive-deps

  // 오늘 방문 기록 저장 (카테고리 점수 포함, 중복 방지는 store에서 처리)
  useEffect(() => {
    if (!hydrated || !currentSign) return;
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    const alreadySaved = useUserStore.getState().history.some(
      h => h.date === todayStr && h.signId === currentSign
    );
    if (alreadySaved) return;

    const horoscope = generateDailyHoroscope(currentSign, today, 'ko');
    const cats = ['overall', 'love', 'career', 'health', 'money'] as const;
    const scores: Record<string, number> = {};
    let total = 0;
    for (const cat of cats) {
      const catData = horoscope[cat] as import('@/types').DetailedCategoryHoroscope;
      const s = catData.detailedScore ?? (catData.score / 5) * 100;
      scores[cat] = Math.round(s);
      total += s;
    }
    addToHistory({
      signId: currentSign,
      overallScore: Math.round(total / cats.length),
      type: 'daily',
      visited: true,
      categoryScores: {
        overall: scores.overall,
        love: scores.love,
        career: scores.career,
        health: scores.health,
        money: scores.money,
      },
    });
  }, [hydrated, currentSign]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleBirthDateSubmit = (date: string, signId: ZodiacSignId) => {
    setBirthDate(date, signId);
    setCurrentSign(signId);
    setCurrentBirthDate(date);
    setShowStarIntro(true);
    recordHoroscopeView();
    completeAction('view-basic-fortune');
    trackEvent('horoscope_view', { signId });
  };

  const handleOnboardingComplete = (date: string, signId: ZodiacSignId) => {
    setShowOnboarding(false);
    completeOnboarding();
    handleBirthDateSubmit(date, signId);
    trackEvent('onboarding_complete', { signId });
  };

  const handleReset = () => {
    setCurrentSign(null);
    setCurrentBirthDate(null);
    useUserStore.getState().clearBirthDate();
  };

  const handleStarIntroComplete = useCallback(() => {
    setShowStarIntro(false);
  }, []);

  const handleCheckIn = () => {
    const prevStreak = visitStreak;
    performCheckIn();
    const newStreak = useUserStore.getState().visitStreak;
    const reward = getNewlyEarnedReward(prevStreak, newStreak);
    if (reward) {
      addBadge(reward.badge);
      unlockContent(reward.unlockContent);
      setNewRewardMessage(reward.message);
      setTimeout(() => setNewRewardMessage(null), 5000);
    }
  };

  // 하이드레이션 전 — 로딩 스피너 (BirthDateForm flash 방지)
  if (!hydrated) {
    return (
      <div className="max-w-2xl mx-auto mt-8 flex flex-col items-center justify-center py-20">
        <div className="w-10 h-10 border-2 border-white/20 border-t-zodiac-primary rounded-full animate-spin" />
        <p className="mt-4 text-white/40 text-sm">운세를 불러오는 중...</p>
      </div>
    );
  }

  // 온보딩
  if (showOnboarding) {
    return (
      <OnboardingFlow
        onComplete={handleOnboardingComplete}
        onSkip={() => setShowOnboarding(false)}
      />
    );
  }

  // 별자리 인트로 애니메이션
  if (showStarIntro && currentSign) {
    return <StarIntro signId={currentSign} onComplete={handleStarIntroComplete} />;
  }

  // 생년월일 미입력
  if (!currentSign || !currentBirthDate) {
    return (
      <div className="max-w-2xl mx-auto mt-8">
        <BirthDateForm onSubmit={handleBirthDateSubmit} />
      </div>
    );
  }

  // 맞춤 결과 생성
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];
  const horoscope = generateDailyHoroscope(currentSign, today, 'ko');

  const categories: HoroscopeCategory[] = ['overall', 'love', 'career', 'health', 'money'];

  const categoryScores: Record<HoroscopeCategory, 1 | 2 | 3 | 4 | 5> = {
    overall: horoscope.overall.score,
    love: horoscope.love.score,
    career: horoscope.career.score,
    health: horoscope.health.score,
    money: horoscope.money.score,
  };

  const categoryTexts: Record<HoroscopeCategory, string> = {
    overall: horoscope.overall.text.ko,
    love: horoscope.love.text.ko,
    career: horoscope.career.text.ko,
    health: horoscope.health.text.ko,
    money: horoscope.money.text.ko,
  };

  // 세밀 점수 추출 (DetailedCategoryHoroscope)
  const categoryDetailedScores = {} as Record<HoroscopeCategory, number>;
  const categorySubIndicators = {} as Record<HoroscopeCategory, SubIndicator[]>;
  for (const cat of categories) {
    const catData = horoscope[cat] as DetailedCategoryHoroscope;
    categoryDetailedScores[cat] = catData.detailedScore ?? (catData.score / 5) * 100;
    categorySubIndicators[cat] = catData.subIndicators ?? [];
  }

  // overallPercent를 detailedScore 평균으로 계산
  const detailedAvg = Object.values(categoryDetailedScores).reduce((a, b) => a + b, 0) / categories.length;
  const overallPercent = Math.round(detailedAvg);

  const extendedLucky = generateExtendedLuckyElements(currentSign, today);
  const tarot = generateDailyTarot(currentSign, today);
  const timeFortunes = generateTimeFortune(currentSign, today);
  const ranking = getTodayFullRanking(today);
  const affirmation = generateDailyAffirmation(currentSign, today);
  const compatibilityHighlight = generateCompatibilityHighlight(currentSign, today);
  const biorhythm = getBiorhythmWeek(currentBirthDate);

  // 방문한 날 Set 추출 (signId 일치 항목만)
  const visitedDates = new Set(
    history
      .filter(h => h.signId === currentSign && h.visited)
      .map(h => h.date)
  );
  // 오늘은 항상 방문한 날로 처리 (히스토리는 useEffect에서 저장)
  visitedDates.add(todayStr);

  // 확장 트렌드 (30일 과거 + 오늘 + 7일 미래)
  const extendedTrend = getExtendedTrend(currentSign, today, visitedDates);

  // 이번 달 캘린더 데이터
  const calendarData = getMonthCalendar(currentSign, today, visitedDates);

  // 스마트 CTA
  const smartCTAs: SmartCTA[] = getSmartCTAs({
    overallScore: overallPercent,
    loveScore: categoryDetailedScores.love,
    careerScore: categoryDetailedScores.career,
    healthScore: categoryDetailedScores.health,
    moneyScore: categoryDetailedScores.money,
    hasViewedBirthChart: completedActions.includes('view-birth-chart'),
    locale: 'ko',
  });

  // 시즌 이벤트 (다중 이벤트 지원)
  const activeEvents = getActiveEvents(today);

  // 마이크로 스토리
  const microStory = generateDailyMicroStory(currentSign, today);
  const tomorrowTeaser = getTomorrowTeaser(currentSign, today);

  // 콘텐츠 해금 상태
  const contentOptions = {
    hasBirthDate: true,
    currentStreak: visitStreak,
    completedActions,
    unlockedIds: unlockedContentIds,
  };

  const contentStatuses: Record<string, ContentLockStatus> = {
    'basic-fortune': getContentStatus('basic-fortune', contentOptions),
    'tarot-card': getContentStatus('tarot-card', contentOptions),
    'biorhythm': getContentStatus('biorhythm', contentOptions),
    'chat-fortune': getContentStatus('chat-fortune', contentOptions),
    'weekly-report': getContentStatus('weekly-report', contentOptions),
  };

  // 어제 점수 (세밀 점수 기반)
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayHoroscope = generateDailyHoroscope(currentSign, yesterday, 'ko');
  const yesterdayCategoryScores = {} as Record<HoroscopeCategory, number>;
  let yesterdayDetailedTotal = 0;
  for (const cat of categories) {
    const catData = yesterdayHoroscope[cat] as DetailedCategoryHoroscope;
    const dScore = catData.detailedScore ?? (catData.score / 5) * 100;
    yesterdayCategoryScores[cat] = dScore;
    yesterdayDetailedTotal += dScore;
  }
  const yesterdayPercent = Math.round(yesterdayDetailedTotal / categories.length);

  // 순위에서 percentileRank 추출
  const myRankEntry = ranking.find(e => e.signId === currentSign);
  const percentileRank = myRankEntry?.percentile;

  return (
    <div className="max-w-2xl mx-auto mt-6">
      {/* 새 보상 알림 */}
      {newRewardMessage && (
        <div className="glass-card p-4 mb-4 text-center animate-scale-in bg-gradient-to-r from-yellow-500/10 to-amber-500/10 border-yellow-500/30">
          <p className="text-white text-sm font-medium">{newRewardMessage}</p>
        </div>
      )}

      {/* 일일 체크인 */}
      <div className="mb-4">
        <DailyCheckIn
          streak={visitStreak}
          todayCheckedIn={todayCheckedIn}
          onCheckIn={handleCheckIn}
        />
      </div>

      {/* 시즌 이벤트 배너 (다중 표시) */}
      {activeEvents.length > 0 && (
        <div className="space-y-2 mb-4">
          {activeEvents.slice(0, 3).map((event, i) => (
            <div key={`${event.type}-${i}`} className="glass-card p-4 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border-indigo-500/20">
              <p className="text-white/90 text-xs font-semibold mb-1">{event.name}</p>
              <p className="text-white/70 text-sm leading-relaxed">{event.message}</p>
            </div>
          ))}
        </div>
      )}

      {/* 재방문 환영 */}
      {visitStreak > 0 && (
        <WelcomeBack
          signId={currentSign}
          visitStreak={visitStreak}
          yesterdayScore={yesterdayPercent}
          todayScore={overallPercent}
        />
      )}

      {/* 맞춤 결과 대시보드 */}
      <PersonalizedResult
        signId={currentSign}
        overallPercent={overallPercent}
        categoryScores={categoryScores}
        categoryTexts={categoryTexts}
        categoryDetailedScores={categoryDetailedScores}
        categorySubIndicators={categorySubIndicators}
        yesterdayPercent={yesterdayPercent}
        yesterdayCategoryScores={yesterdayCategoryScores}
        percentileRank={percentileRank}
        affirmation={affirmation}
        timeFortunes={timeFortunes}
        extendedLucky={extendedLucky}
        tarot={tarot}
        biorhythm={biorhythm}
        extendedTrend={extendedTrend}
        calendarData={calendarData}
        calendarYear={today.getFullYear()}
        calendarMonth={today.getMonth()}
        ranking={ranking}
        compatibilityHighlight={compatibilityHighlight}
        contentStatuses={contentStatuses}
        visitStreak={visitStreak}
        microStory={microStory}
        tomorrowTeaser={tomorrowTeaser}
        smartCTAs={smartCTAs}
        visitedDates={visitedDates}
      />

      {/* 별의 도사 채팅 */}
      {contentStatuses['chat-fortune'] === 'unlocked' && (
        <div className="mt-6">
          <FortuneChatBot
            signId={currentSign}
            overallScore={overallPercent}
          />
        </div>
      )}

      {/* 스트릭 대시보드 */}
      {visitStreak >= 3 && (
        <div className="mt-6">
          <StreakDashboard
            streak={visitStreak}
            longestStreak={longestStreak}
            earnedBadges={earnedBadges}
          />
        </div>
      )}

      {/* 마이크로 스토리 */}
      <div className="mt-6 glass-card p-5">
        <h3 className="text-lg font-semibold text-white mb-3 text-center">오늘의 별자리 이야기</h3>
        <p className="text-white/90 font-medium text-sm mb-2">{microStory.title}</p>
        <p className="text-white/70 text-sm leading-relaxed mb-3">{microStory.content}</p>
        <p className="text-amber-300/80 text-sm italic mb-3">&ldquo;{microStory.moral}&rdquo;</p>
        <div className="border-t border-white/10 pt-3">
          <p className="text-white/40 text-xs text-center">
            📖 {tomorrowTeaser}
          </p>
        </div>
      </div>

      {/* 다른 생년월일로 보기 */}
      <div className="text-center mt-8 mb-4">
        <button
          onClick={handleReset}
          className="px-5 py-2 rounded-full text-sm font-medium
                     bg-white/10 hover:bg-white/20 text-white/70 hover:text-white
                     transition-colors"
        >
          다른 생년월일로 보기
        </button>
      </div>
    </div>
  );
}
