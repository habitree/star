/**
 * 사용자 참여도/리텐션 시스템 타입 정의
 */

import type { ZodiacSignId } from './zodiac';
import type { HoroscopeCategory } from './horoscope';

/** 감정 상태 */
export type EmotionState = 'positive' | 'neutral' | 'negative';

/** 스트릭 마일스톤 */
export type StreakMilestone = 3 | 7 | 14 | 30 | 45 | 60 | 75 | 90 | 100;

/** 배지 정보 */
export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  requiredStreak: StreakMilestone;
  unlockedAt?: string; // ISO date
}

/** 스트릭 마일스톤 보상 정의 */
export interface StreakReward {
  milestone: StreakMilestone;
  badge: Badge;
  unlockContent: string; // 해금되는 콘텐츠 ID
  message: string;
}

/** 콘텐츠 잠금 상태 */
export type ContentLockStatus = 'locked' | 'unlocked' | 'teaser';

/** 해금 가능한 콘텐츠 */
export interface UnlockableContent {
  id: string;
  name: string;
  description: string;
  unlockCondition: UnlockCondition;
  status: ContentLockStatus;
}

/** 해금 조건 */
export interface UnlockCondition {
  type: 'streak' | 'visit' | 'action' | 'birthdate' | 'premium';
  requiredStreak?: number;
  requiredVisits?: number;
  requiredAction?: string;
}

/** 대화형 운세 챗 메시지 */
export interface ChatMessage {
  id: string;
  sender: 'fortune-teller' | 'user';
  text: string;
  choices?: ChatChoice[];
  delay?: number; // ms before showing
}

/** 대화 선택지 */
export interface ChatChoice {
  id: string;
  text: string;
  nextNodeId: string;
  emotion?: EmotionState;
}

/** 대화 트리 노드 */
export interface ChatNode {
  id: string;
  messages: ChatMessage[];
  nextNodeId?: string; // auto-advance
}

/** 대화 시나리오 */
export interface ChatScenario {
  signId: ZodiacSignId;
  emotion: EmotionState;
  dayOfWeek: number; // 0-6
  nodes: Record<string, ChatNode>;
  startNodeId: string;
}

/** 사용자 세그먼트 */
export type UserSegment =
  | 'at-risk'    // 3일+ 미방문 (최우선)
  | 'new'        // 온보딩 미완료
  | 'explorer'   // streak <= 2
  | 'engaged'    // streak 3-7
  | 'committed'  // streak 8-29
  | 'power';     // streak 30+

/** 피드백 반응 */
export type FeedbackReaction = 'great' | 'okay' | 'miss';

/** 피드백 카테고리 */
export type FeedbackCategory = 'love' | 'career' | 'health' | 'money' | 'overall';

/** 운세 피드백 */
export interface FortuneFeedback {
  date: string;              // YYYY-MM-DD
  signId: string;
  reaction: FeedbackReaction;
  missCategory?: FeedbackCategory; // 'miss' 선택 시 세부 카테고리
  isRetro: boolean;          // 전일 회상(true) vs 당일 즉시(false)
}

/** Big Three 단계 */
export type BigThreeStage = 'sun' | 'moon' | 'rising' | 'synthesis';

/** 참여도 이벤트 타입 */
export type EngagementEventType =
  | 'page_view'
  | 'horoscope_view'
  | 'tarot_reveal'
  | 'share_click'
  | 'chat_start'
  | 'chat_complete'
  | 'streak_milestone'
  | 'content_unlock'
  | 'onboarding_complete'
  | 'checkin_complete'
  | 'section_scroll'
  | 'ui_interaction'
  | 'winback_view'
  | 'winback_checkin'
  | 'fortune_feedback'
  | 'retro_feedback'
  | 'share_card_generate'
  | 'viral_link_click';

/** 참여도 이벤트 */
export interface EngagementEvent {
  type: EngagementEventType;
  timestamp: string;
  data?: Record<string, unknown>;
}

/** 시즌/이벤트 타입 */
export type SeasonalEventType =
  | 'mercury_retrograde'
  | 'full_moon'
  | 'new_moon'
  | 'solar_term'
  | 'zodiac_season'
  | 'valentine'
  | 'white_day'
  | 'christmas'
  | 'new_year'
  | 'chuseok'
  | 'seollal';

/** 시즌 이벤트 */
export interface SeasonalEvent {
  type: SeasonalEventType;
  name: string;
  startDate: string; // MM-DD
  endDate: string;   // MM-DD
  message: string;
  specialContent?: string;
}

/** 엘리먼트 테마 */
export interface ElementTheme {
  element: 'fire' | 'earth' | 'air' | 'water';
  primaryColor: string;
  secondaryColor: string;
  gradientFrom: string;
  gradientTo: string;
  glowColor: string;
  particleType: 'flame' | 'leaf' | 'wind' | 'droplet';
  bgClass: string;
  textClass: string;
  borderClass: string;
}

/** 마이크로 스토리 */
export interface MicroStory {
  title: string;
  content: string;
  moral: string;
  relatedSign: ZodiacSignId;
}

/** 온보딩 단계 */
export type OnboardingStep = 'welcome' | 'birthdate' | 'element' | 'first-fortune' | 'complete';

/** 사용자 참여 상태 (스토어 확장용) */
export interface EngagementState {
  // 스트릭
  currentStreak: number;
  longestStreak: number;
  lastCheckInDate: string | null;

  // 배지
  earnedBadges: Badge[];

  // 콘텐츠 해금
  unlockedContentIds: string[];

  // 온보딩
  onboardingCompleted: boolean;
  onboardingStep: OnboardingStep;

  // 참여 이벤트 로그
  recentEvents: EngagementEvent[];

  // 일일 체크인
  todayCheckedIn: boolean;

  // 채팅 상태
  chatHistory: ChatMessage[];
  lastChatDate: string | null;
}
