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
import { startSession, trackEvent, trackRetentionView } from '@/lib/engagement-tracker';
import { getActiveEvents } from '@/lib/seasonal-scheduler';
import { generateDailyMicroStory, getTomorrowTeaser } from '@/lib/micro-story';
import { generateEmotionResponse } from '@/lib/emotion-response';
import { zodiacData } from '@/data/zodiac-info';
import { zodiacSigns } from '@/data/zodiac-signs';
import BirthDateForm from './BirthDateForm';
import WelcomeBack from './WelcomeBack';
import WinBackBanner from './WinBackBanner';
import PersonalizedResult from './PersonalizedResult';
import OnboardingFlow from './OnboardingFlow';
import DailyCheckIn from './DailyCheckIn';
import StarIntro from './StarIntro';
import FortuneChatBot from './FortuneChatBot';
import StreakDashboard from './StreakDashboard';
import BigThreeTeaser from './BigThreeTeaser';
import SeasonalEventBanner from './SeasonalEventBanner';
import PushNotificationPrompt from './PushNotificationPrompt';
import type { ZodiacSignId, HoroscopeCategory, DetailedCategoryHoroscope, SubIndicator } from '@/types';
import type { ContentLockStatus } from '@/types/engagement';
import type { SmartCTA, CalendarDayData } from '@/types/horoscope-extended';
import { getUserSegment, getDaysSinceLastVisit } from '@/lib/user-segment';

const UI_TEXT = {
  ko: {
    loading: '운세를 불러오는 중...',
    today: '오늘',
    dark: '다크', light: '라이트', system: '시스템',
    changeSign: '별자리 변경', close: '닫기',
    selectSign: '보고 싶은 별자리를 선택하세요',
    microStoryTitle: '오늘의 별자리 이야기',
    resetBtn: '다른 생년월일로 보기',
    checkInSection: '오늘의 체크인',
    welcomeSection: '오늘 운세 요약',
  },
  en: {
    loading: 'Loading your horoscope...',
    today: 'Today',
    dark: 'Dark', light: 'Light', system: 'System',
    changeSign: 'Change Sign', close: 'Close',
    selectSign: 'Select a zodiac sign',
    microStoryTitle: "Today's Star Story",
    resetBtn: 'Try Another Birth Date',
    checkInSection: "Today's Check-In",
    welcomeSection: 'Horoscope Summary',
  },
  zh: {
    loading: '加载运势中...',
    today: '今天',
    dark: '深色', light: '浅色', system: '系统',
    changeSign: '更改星座', close: '关闭',
    selectSign: '选择星座',
    microStoryTitle: '今日星座故事',
    resetBtn: '用其他出生日期查看',
    checkInSection: '今日签到',
    welcomeSection: '运势摘要',
  },
  ja: {
    loading: '運勢を読み込み中...',
    today: '今日',
    dark: 'ダーク', light: 'ライト', system: 'システム',
    changeSign: '星座を変更', close: '閉じる',
    selectSign: '星座を選択してください',
    microStoryTitle: '今日の星座物語',
    resetBtn: '別の生年月日で見る',
    checkInSection: '今日のチェックイン',
    welcomeSection: '運勢サマリー',
  },
  es: {
    loading: 'Cargando tu horóscopo...',
    today: 'Hoy',
    dark: 'Oscuro', light: 'Claro', system: 'Sistema',
    changeSign: 'Cambiar Signo', close: 'Cerrar',
    selectSign: 'Selecciona tu signo del zodiaco',
    microStoryTitle: 'Historia del Zodiaco de Hoy',
    resetBtn: 'Ver con otra fecha de nacimiento',
    checkInSection: 'Check-in de hoy',
    welcomeSection: 'Resumen del Horóscopo',
    winBackWelcome: '¡Bienvenido de vuelta! Tu racha se ha restaurado 🌟',
  },
} as const;

const WIN_BACK_WELCOME: Record<string, string> = {
  ko: '다시 돌아오셨군요! 스트릭이 복구됩니다 🌟',
  en: 'Welcome back! Your streak is restored 🌟',
  zh: '欢迎回来！您的连续记录已恢复 🌟',
  ja: 'おかえりなさい！ストリークが復活しました 🌟',
  es: '¡Bienvenido de vuelta! Tu racha se ha restaurado 🌟',
};

type SupportedLocale = keyof typeof UI_TEXT;

export default function HoroscopeClientApp({ locale = 'ko' }: { locale?: string }) {
  const t = UI_TEXT[(locale as SupportedLocale) in UI_TEXT ? (locale as SupportedLocale) : 'ko'];
  const {
    birthDate, birthSign, birthTime,
    visitStreak, longestStreak, earnedBadges,
    unlockedContentIds, completedActions,
    onboardingCompleted, todayCheckedIn, lastCheckInDate,
    lastVisit,
    history,
    preferences,
    fortuneFeedback,
    pushPermissionStatus, pushPromptDismissed,
    setBirthDate, recordHoroscopeView, addToHistory,
    performCheckIn, addBadge, unlockContent, completeAction,
    completeOnboarding,
    setTheme,
    recordWinBack,
    setPushPermissionStatus, setNotificationTimeSlot, dismissPushPrompt,
  } = useUserStore();

  const [hydrated, setHydrated] = useState(false);
  const [currentSign, setCurrentSign] = useState<ZodiacSignId | null>(null);
  const [currentBirthDate, setCurrentBirthDate] = useState<string | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showStarIntro, setShowStarIntro] = useState(false);
  const [newRewardMessage, setNewRewardMessage] = useState<string | null>(null);
  const [showSignSelector, setShowSignSelector] = useState(false);
  const today = new Date();
  const localeForDate = locale === 'zh' ? 'zh-CN' : locale === 'ja' ? 'ja-JP' : locale === 'es' ? 'es-ES' : locale === 'en' ? 'en-US' : 'ko-KR';
  const todayLabel = today.toLocaleDateString(localeForDate, {
    month: 'long',
    day: 'numeric',
    weekday: 'short',
  });

  const ALL_SIGNS: ZodiacSignId[] = [
    'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
    'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces',
  ];

  // 하이드레이션 처리
  useEffect(() => {
    setHydrated(true);
    startSession();
    trackRetentionView({ surface: 'daily-main', action: 'view' });
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

    const horoscope = generateDailyHoroscope(currentSign, today, locale, currentBirthDate, birthTime);
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
    setShowSignSelector(false);
    useUserStore.getState().clearBirthDate();
  };

  const handleSignChange = (newSignId: ZodiacSignId) => {
    const dateToKeep = currentBirthDate ?? new Date().toISOString().split('T')[0];
    setBirthDate(dateToKeep, newSignId);
    setCurrentSign(newSignId);
    setShowSignSelector(false);
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
        <p className="mt-4 text-white/40 text-sm">{t.loading}</p>
      </div>
    );
  }

  // 온보딩
  if (showOnboarding) {
    return (
      <OnboardingFlow
        onComplete={handleOnboardingComplete}
        onSkip={() => setShowOnboarding(false)}
        locale={locale}
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
        <BirthDateForm onSubmit={handleBirthDateSubmit} locale={locale} />
      </div>
    );
  }

  const todayStr = today.toISOString().split('T')[0];

  // 사용자 세그먼트 계산
  const userSegment = getUserSegment({
    onboardingCompleted,
    visitStreak,
    lastVisit,
    lastCheckInDate,
  });
  const daysSinceLast = getDaysSinceLastVisit(lastVisit, lastCheckInDate);

  const horoscope = generateDailyHoroscope(currentSign, today, locale, currentBirthDate, birthTime, fortuneFeedback);

  const categories: HoroscopeCategory[] = ['overall', 'love', 'career', 'health', 'money'];

  const categoryScores: Record<HoroscopeCategory, 1 | 2 | 3 | 4 | 5> = {
    overall: horoscope.overall.score,
    love: horoscope.love.score,
    career: horoscope.career.score,
    health: horoscope.health.score,
    money: horoscope.money.score,
  };

  const getLocalizedText = (textObj: { ko: string; en: string; zh: string; ja: string; es: string }) =>
    (textObj as Record<string, string>)[locale] ?? textObj.en ?? textObj.ko;

  const categoryTexts: Record<HoroscopeCategory, string> = {
    overall: getLocalizedText(horoscope.overall.text),
    love: getLocalizedText(horoscope.love.text),
    career: getLocalizedText(horoscope.career.text),
    health: getLocalizedText(horoscope.health.text),
    money: getLocalizedText(horoscope.money.text),
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
  const extendedTrend = getExtendedTrend(currentSign, today, visitedDates, currentBirthDate, birthTime);

  // 이번 달 캘린더 데이터
  const calendarData = getMonthCalendar(currentSign, today, visitedDates, currentBirthDate, birthTime);

  // 시즌 이벤트 (다중 이벤트 지원)
  const activeEvents = getActiveEvents(today, locale);

  // 스마트 CTA
  const smartCTAs: SmartCTA[] = getSmartCTAs({
    overallScore: overallPercent,
    loveScore: categoryDetailedScores.love,
    careerScore: categoryDetailedScores.career,
    healthScore: categoryDetailedScores.health,
    moneyScore: categoryDetailedScores.money,
    hasViewedBirthChart: completedActions.includes('view-birth-chart'),
    locale,
    activeEventTypes: activeEvents.map(e => e.type),
  });

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
  const yesterdayHoroscope = generateDailyHoroscope(currentSign, yesterday, locale, currentBirthDate, birthTime);
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

  const handleThemeToggle = () => {
    const next =
      preferences.theme === 'dark'
        ? 'light'
        : preferences.theme === 'light'
        ? 'system'
        : 'dark';
    setTheme(next);
  };

  return (
    <div className="max-w-2xl mx-auto mt-6 space-y-4">
      {/* 상단 헤더 영역 */}
      <header className="flex items-center justify-between px-1">
        <div className="flex flex-col">
          <span className="text-xs text-white/40">{t.today}</span>
          <span className="text-sm font-medium text-white/90">{todayLabel}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleThemeToggle}
            className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-border-subtle bg-surface-elevated/70 text-[11px] text-text-muted hover:bg-surface-highest/90 hover:text-text-primary transition-colors"
            aria-label="테마 변경"
          >
            <span>
              {preferences.theme === 'dark'
                ? t.dark
                : preferences.theme === 'light'
                ? t.light
                : t.system}
            </span>
          </button>
        </div>
      </header>
      {/* 새 보상 알림 */}
      {newRewardMessage && (
        <div className="glass-card p-4 mb-4 text-center animate-scale-in bg-gradient-to-r from-yellow-500/10 to-amber-500/10 border-yellow-500/30">
          <p className="text-white text-sm font-medium">{newRewardMessage}</p>
        </div>
      )}

      {/* 오늘 체크인 + 스트릭 요약 */}
      <section aria-label={t.checkInSection} className="mt-2">
        <DailyCheckIn
          streak={visitStreak}
          todayCheckedIn={todayCheckedIn}
          onCheckIn={handleCheckIn}
          locale={locale}
        />
      </section>

      {/* Push 알림 프롬프트 (streak 3일 달성 + 아직 권한 미설정 + 미dismissed) */}
      {visitStreak >= 3 && pushPermissionStatus === 'default' && !pushPromptDismissed && (
        <section aria-label="push-notification-prompt">
          <PushNotificationPrompt
            signId={currentSign}
            locale={locale}
            onGranted={(slot) => {
              setPushPermissionStatus('granted');
              setNotificationTimeSlot(slot);
              trackEvent('push_permission_granted', { signId: currentSign, timeSlot: slot });
            }}
            onDenied={() => {
              setPushPermissionStatus('denied');
              dismissPushPrompt();
              trackEvent('push_permission_denied', { signId: currentSign });
            }}
            onDismiss={() => {
              dismissPushPrompt();
            }}
          />
        </section>
      )}

      {/* 시즌 이벤트 배너 */}
      <SeasonalEventBanner events={activeEvents} locale={locale} maxEvents={3} />

      {/* Win-Back 배너 (at-risk 세그먼트 — 3일+ 미방문) */}
      {userSegment === 'at-risk' && (
        <section aria-label="win-back">
          <WinBackBanner
            signId={currentSign}
            visitStreak={visitStreak}
            daysSinceLast={daysSinceLast}
            recentScores={history
              .filter(h => h.signId === currentSign)
              .slice(0, 2)
              .map((h, i) => ({ score: h.overallScore, daysAgo: i + 1 }))}
            todayScore={overallPercent}
            todayCheckedIn={todayCheckedIn}
            onCheckIn={() => {
              handleCheckIn();
              recordWinBack();
              trackEvent('winback_checkin', { streak: visitStreak });
              // 마일스톤 미달 시에도 Win-Back 환영 메시지 표시
              if (!newRewardMessage) {
                const msg = WIN_BACK_WELCOME[locale] ?? WIN_BACK_WELCOME.ko;
                setNewRewardMessage(msg);
                setTimeout(() => setNewRewardMessage(null), 4000);
              }
            }}
            locale={locale}
          />
        </section>
      )}

      {/* 재방문 환영 + 오늘 한 줄 요약 (at-risk 아닌 경우) */}
      {visitStreak > 0 && userSegment !== 'at-risk' && (
        <section aria-label={t.welcomeSection}>
          <WelcomeBack
            signId={currentSign}
            visitStreak={visitStreak}
            yesterdayScore={yesterdayPercent}
            todayScore={overallPercent}
            locale={locale}
          />
        </section>
      )}

      {/* 현재 별자리 표시 + 변경 버튼 */}
      <div className="glass-card p-3 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{zodiacData[currentSign].symbol}</span>
            <div>
              <p className="text-white font-semibold text-sm">{zodiacSigns.find(s => s.id === currentSign)?.names[locale as keyof typeof zodiacSigns[0]['names']] ?? zodiacData[currentSign].name}</p>
              <p className="text-white/40 text-xs">{zodiacData[currentSign].dateRange}</p>
            </div>
          </div>
          <button
            onClick={() => setShowSignSelector(prev => !prev)}
            className="text-xs px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-colors"
          >
            {showSignSelector ? t.close : t.changeSign}
          </button>
        </div>

        {showSignSelector && (
          <div className="mt-3 pt-3 border-t border-white/10">
            <p className="text-white/50 text-xs text-center mb-3">{t.selectSign}</p>
            <div className="grid grid-cols-6 gap-1.5">
              {ALL_SIGNS.map((sign) => {
                const signMeta = zodiacSigns.find((s) => s.id === sign);
                const signLabel = signMeta?.names[(locale as SupportedLocale) in signMeta.names ? locale as keyof typeof signMeta.names : 'ko'] ?? zodiacData[sign].name;
                return (
                <button
                  key={sign}
                  onClick={() => handleSignChange(sign)}
                  className={`flex flex-col items-center gap-0.5 p-2 rounded-xl transition-all text-center
                    ${sign === currentSign
                      ? 'bg-zodiac-primary/30 ring-1 ring-zodiac-primary/60'
                      : 'hover:bg-white/10'}`}
                >
                  <span className="text-xl">{zodiacData[sign].symbol}</span>
                  <span className="text-white/60 text-[10px] leading-tight">{signLabel}</span>
                </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* 맞춤 결과 대시보드 */}
      <PersonalizedResult
        signId={currentSign}
        overallPercent={overallPercent}
        locale={locale}
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
        fortuneFeedback={fortuneFeedback}
      />

      {/* Big Three 티저 (engaged D3+, committed, power 세그먼트) */}
      {(userSegment === 'engaged' || userSegment === 'committed' || userSegment === 'power') && visitStreak >= 3 && (
        <div className="mt-4">
          <BigThreeTeaser signId={currentSign} visitStreak={visitStreak} locale={locale} />
        </div>
      )}

      {/* 별의 도사 채팅 */}
      {contentStatuses['chat-fortune'] === 'unlocked' && (
        <div className="mt-6">
          <FortuneChatBot
            signId={currentSign}
            overallScore={overallPercent}
            locale={locale}
            birthDate={currentBirthDate}
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
            locale={locale}
          />
        </div>
      )}

      {/* 마이크로 스토리 */}
      <div className="mt-6 glass-card p-5">
        <h3 className="text-lg font-semibold text-white mb-3 text-center">{t.microStoryTitle}</h3>
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
          {t.resetBtn}
        </button>
      </div>
    </div>
  );
}
