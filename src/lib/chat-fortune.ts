/**
 * 대화형 운세 챗 엔진
 * "별의 도사" 페르소나 기반 대화 트리
 * 감정 상태 3가지 × 12별자리 × 5개 언어 대화 분기
 * 기술: 사전 정의된 대화 트리 + seededRandom 변형 (LLM API 없음)
 */

import type { ZodiacSignId } from '@/types';
import type { EmotionState, ChatMessage } from '@/types/engagement';
import { seededRandom, generateContentSeed, selectRandom } from './content-pipeline';
import { CHAT_I18N, SIGN_NAMES, type SupportedLocale } from '@/data/chat-fortune-i18n';

/** 채팅 단계 */
export type ChatPhase = 'greeting' | 'emotion-ask' | 'emotion-response' | 'fortune-intro' | 'fortune-detail' | 'tarot-offer' | 'closing';

/** 채팅 상태 */
export interface ChatState {
  phase: ChatPhase;
  signId: ZodiacSignId;
  emotion: EmotionState | null;
  messages: ChatMessage[];
  isComplete: boolean;
  locale: SupportedLocale;
}

function getLocale(locale?: string): SupportedLocale {
  const supported: SupportedLocale[] = ['ko', 'en', 'zh', 'ja', 'es'];
  return supported.includes(locale as SupportedLocale) ? (locale as SupportedLocale) : 'ko';
}

function getSignName(signId: ZodiacSignId, locale: SupportedLocale): string {
  return SIGN_NAMES[signId]?.[locale] ?? signId;
}

function applyTemplate(template: string, vars: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, key) => vars[key] ?? `{${key}}`);
}

/** 초기 인사말 생성 */
function getGreetingMessages(signId: ZodiacSignId, date: Date, locale: SupportedLocale, birthDate?: string | null): ChatMessage[] {
  const seed = generateContentSeed(signId, date, `chat_greeting_${locale}`, birthDate);
  const random = seededRandom(seed);
  const t = CHAT_I18N[locale];
  const signName = getSignName(signId, locale);

  const hour = date.getHours();
  const timeSlot: 'morning' | 'afternoon' | 'evening' =
    hour < 12 ? 'morning' : hour < 18 ? 'afternoon' : 'evening';
  const timeGreeting = t.timeGreeting[timeSlot];

  const greetings = t.greetings.map(g => applyTemplate(g, { time: timeGreeting, sign: signName }));

  return [
    {
      id: 'greeting-1',
      sender: 'fortune-teller',
      text: selectRandom(greetings, random),
      delay: 500,
    },
  ];
}

/** 감정 질문 메시지 (요일별 분기) */
function getEmotionAskMessage(signId: ZodiacSignId, locale: SupportedLocale, date: Date = new Date()): ChatMessage {
  const t = CHAT_I18N[locale];
  const signName = getSignName(signId, locale);
  const dow = date.getDay(); // 0=일, 1=월 ...

  const questionTemplate = t.emotionQuestion[dow] ??
    (locale === 'ko'
      ? '{sign}님, 오늘 기분이 어떠신가요? 마음의 상태에 따라 별의 메시지가 달라져요.'
      : locale === 'en'
      ? '{sign}, how are you feeling today? The star\'s message changes based on your mood.'
      : locale === 'zh'
      ? '{sign}，今天感觉怎么样？根据心情的不同，星星的信息也会变化。'
      : locale === 'ja'
      ? '{sign}様、今日はお気持ちいかがですか？心の状態によって星のメッセージが変わります。'
      : '{sign}, ¿cómo te sientes hoy? El mensaje de las estrellas cambia según tu estado de ánimo.');

  return {
    id: 'emotion-ask',
    sender: 'fortune-teller',
    text: applyTemplate(questionTemplate, { sign: signName }),
    choices: [
      { id: 'positive', text: t.emotionChoices.positive, nextNodeId: 'emotion-response', emotion: 'positive' },
      { id: 'neutral', text: t.emotionChoices.neutral, nextNodeId: 'emotion-response', emotion: 'neutral' },
      { id: 'negative', text: t.emotionChoices.negative, nextNodeId: 'emotion-response', emotion: 'negative' },
    ],
    delay: 1000,
  };
}

/** 감정별 응답 메시지 */
function getEmotionResponseMessages(
  signId: ZodiacSignId,
  emotion: EmotionState,
  date: Date,
  locale: SupportedLocale
): ChatMessage[] {
  const seed = generateContentSeed(signId, date, `chat_emotion_${emotion}_${locale}`);
  const random = seededRandom(seed);
  const t = CHAT_I18N[locale];
  const signName = getSignName(signId, locale);

  const templates = t.emotionResponses[emotion];
  const text = applyTemplate(selectRandom(templates, random), { sign: signName });

  return [
    {
      id: `emotion-response-1`,
      sender: 'fortune-teller',
      text,
      delay: 800,
    },
  ];
}

/** 운세 소개 메시지 */
function getFortuneIntroMessages(
  signId: ZodiacSignId,
  emotion: EmotionState,
  date: Date,
  overallScore: number,
  locale: SupportedLocale
): ChatMessage[] {
  const seed = generateContentSeed(signId, date, `chat_fortune_intro_${locale}`);
  const random = seededRandom(seed);
  const t = CHAT_I18N[locale];
  const signName = getSignName(signId, locale);

  const scoreKey: 'high' | 'mid' | 'low' =
    overallScore >= 70 ? 'high' : overallScore >= 50 ? 'mid' : 'low';
  const scoreDesc = t.scoreDesc[scoreKey];

  const templates = t.fortuneIntros;
  const text = applyTemplate(selectRandom(templates, random), { sign: signName, scoreDesc });

  // 20% 확률 보너스 메시지
  const bonusSeed = generateContentSeed(signId, date, `chat_bonus_${locale}`);
  const bonusRandom = seededRandom(bonusSeed);
  const showBonus = bonusRandom() < 0.2;

  const messages: ChatMessage[] = [
    {
      id: 'fortune-intro-1',
      sender: 'fortune-teller',
      text,
      delay: 1000,
    },
  ];

  if (showBonus) {
    const bonusText = applyTemplate(selectRandom(t.bonusMessages, bonusRandom), { sign: signName });
    messages.push({
      id: 'fortune-bonus',
      sender: 'fortune-teller',
      text: bonusText,
      delay: 1200,
    });
  }

  return messages;
}

/** 타로 제안 메시지 */
function getTarotOfferMessage(locale: SupportedLocale): ChatMessage {
  const t = CHAT_I18N[locale];
  return {
    id: 'tarot-offer',
    sender: 'fortune-teller',
    text: t.tarotOffer,
    choices: [
      { id: 'tarot-yes', text: t.tarotChoices.yes, nextNodeId: 'closing' },
      { id: 'tarot-no', text: t.tarotChoices.no, nextNodeId: 'closing' },
    ],
    delay: 800,
  };
}

/** 마무리 메시지 */
function getClosingMessages(
  signId: ZodiacSignId,
  emotion: EmotionState,
  date: Date,
  tookTarot: boolean,
  locale: SupportedLocale
): ChatMessage[] {
  const seed = generateContentSeed(signId, date, `chat_closing_${locale}`);
  const random = seededRandom(seed);
  const t = CHAT_I18N[locale];
  const signName = getSignName(signId, locale);

  const closingKey: 'tarot' | 'no-tarot' = tookTarot ? 'tarot' : 'no-tarot';
  const templates = t.closings[closingKey];
  const text = applyTemplate(selectRandom(templates, random), { sign: signName });

  return [
    {
      id: 'closing-1',
      sender: 'fortune-teller',
      text,
      delay: 600,
    },
  ];
}

/** 채팅 초기 상태 생성 */
export function createChatState(
  signId: ZodiacSignId,
  date: Date = new Date(),
  locale?: string,
  birthDate?: string | null
): ChatState {
  const loc = getLocale(locale);
  const greetingMsgs = getGreetingMessages(signId, date, loc, birthDate);
  const emotionAsk = getEmotionAskMessage(signId, loc, date);

  return {
    phase: 'emotion-ask',
    signId,
    emotion: null,
    messages: [...greetingMsgs, emotionAsk],
    isComplete: false,
    locale: loc,
  };
}

/** 사용자 감정 선택 처리 */
export function handleEmotionChoice(
  state: ChatState,
  emotion: EmotionState,
  date: Date = new Date()
): ChatState {
  const t = CHAT_I18N[state.locale];

  const userMsg: ChatMessage = {
    id: `user-emotion-${Date.now()}`,
    sender: 'user',
    text: t.emotionChoices[emotion],
  };

  const responseMsgs = getEmotionResponseMessages(state.signId, emotion, date, state.locale);

  return {
    ...state,
    phase: 'fortune-intro',
    emotion,
    messages: [...state.messages, userMsg, ...responseMsgs],
  };
}

/** 운세 소개 진행 */
export function advanceToFortuneIntro(
  state: ChatState,
  overallScore: number,
  date: Date = new Date()
): ChatState {
  if (!state.emotion) return state;

  const introMsgs = getFortuneIntroMessages(state.signId, state.emotion, date, overallScore, state.locale);
  const tarotOffer = getTarotOfferMessage(state.locale);

  return {
    ...state,
    phase: 'tarot-offer',
    messages: [...state.messages, ...introMsgs, tarotOffer],
  };
}

/** 타로 선택 처리 */
export function handleTarotChoice(
  state: ChatState,
  accepted: boolean,
  date: Date = new Date()
): ChatState {
  if (!state.emotion) return state;

  const t = CHAT_I18N[state.locale];
  const userMsg: ChatMessage = {
    id: `user-tarot-${Date.now()}`,
    sender: 'user',
    text: accepted ? t.tarotChoices.yes : t.tarotChoices.no,
  };

  const closingMsgs = getClosingMessages(state.signId, state.emotion, date, accepted, state.locale);

  return {
    ...state,
    phase: 'closing',
    messages: [...state.messages, userMsg, ...closingMsgs],
    isComplete: true,
  };
}

/** 현재 선택지 가져오기 */
export function getCurrentChoices(state: ChatState): ChatMessage['choices'] | undefined {
  const lastMessage = [...state.messages].reverse().find(m => m.choices);
  return lastMessage?.choices;
}
