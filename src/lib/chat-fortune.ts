/**
 * 대화형 운세 챗 엔진
 * "별의 도사" 페르소나 기반 대화 트리
 * 감정 상태 3가지 × 12별자리 대화 분기
 * 기술: 사전 정의된 대화 트리 + seededRandom 변형 (LLM API 없음)
 */

import type { ZodiacSignId } from '@/types';
import type { EmotionState, ChatMessage } from '@/types/engagement';
import { seededRandom, generateContentSeed, selectRandom, signKoreanNames } from './content-pipeline';

/** 채팅 단계 */
export type ChatPhase = 'greeting' | 'emotion-ask' | 'emotion-response' | 'fortune-intro' | 'fortune-detail' | 'tarot-offer' | 'closing';

/** 채팅 상태 */
export interface ChatState {
  phase: ChatPhase;
  signId: ZodiacSignId;
  emotion: EmotionState | null;
  messages: ChatMessage[];
  isComplete: boolean;
}

/** 초기 인사말 생성 */
function getGreetingMessages(signId: ZodiacSignId, date: Date): ChatMessage[] {
  const seed = generateContentSeed(signId, date, 'chat_greeting');
  const random = seededRandom(seed);
  const signName = signKoreanNames[signId];

  const hour = date.getHours();
  const timeGreeting = hour < 12 ? '좋은 아침이에요' : hour < 18 ? '반가워요' : '고요한 밤이네요';

  const greetings = [
    `${timeGreeting}, ${signName}님. 별의 도사입니다. 오늘 별들이 당신에게 전하고 싶은 이야기가 있어요.`,
    `어서 오세요, ${signName}님. 오늘 밤하늘에 당신의 별이 유독 빛나고 있어요.`,
    `${timeGreeting}, ${signName}님. 오늘 우주의 기운이 당신 주위를 감싸고 있는 것이 느껴져요.`,
  ];

  return [
    {
      id: 'greeting-1',
      sender: 'fortune-teller',
      text: selectRandom(greetings, random),
      delay: 500,
    },
  ];
}

/** 감정 질문 메시지 */
function getEmotionAskMessage(signId: ZodiacSignId): ChatMessage {
  const signName = signKoreanNames[signId];
  return {
    id: 'emotion-ask',
    sender: 'fortune-teller',
    text: `${signName}님, 오늘 아침 기분이 어떠신가요? 마음의 상태에 따라 별의 메시지가 달라져요.`,
    choices: [
      { id: 'positive', text: '기분이 좋아요! ✨', nextNodeId: 'emotion-response', emotion: 'positive' },
      { id: 'neutral', text: '그냥 보통이에요', nextNodeId: 'emotion-response', emotion: 'neutral' },
      { id: 'negative', text: '좀 힘들어요...', nextNodeId: 'emotion-response', emotion: 'negative' },
    ],
    delay: 1000,
  };
}

/** 감정별 응답 메시지 */
function getEmotionResponseMessages(
  signId: ZodiacSignId,
  emotion: EmotionState,
  date: Date
): ChatMessage[] {
  const seed = generateContentSeed(signId, date, `chat_emotion_${emotion}`);
  const random = seededRandom(seed);
  const signName = signKoreanNames[signId];

  const responses: Record<EmotionState, string[]> = {
    positive: [
      `${signName}님의 밝은 기운이 저에게까지 전해지네요! 오늘 별들도 당신의 기쁨에 함께하고 있어요.`,
      `역시 ${signName}님답게 빛나고 계시군요! 이 좋은 에너지가 오늘 하루를 더욱 특별하게 만들어줄 거예요.`,
      `그 활력이 느껴져요! 오늘 별의 흐름도 당신의 기분과 잘 맞아요.`,
    ],
    neutral: [
      `차분한 에너지군요. 사실 이런 날이 운세를 가장 잘 읽을 수 있는 날이에요.`,
      `평온한 마음... 좋아요. 맑은 호수처럼 고요할 때 별빛이 가장 선명하게 비치거든요.`,
      `그런 날도 있죠. 하지만 오늘의 별은 ${signName}님에게 작은 설렘을 준비했어요.`,
    ],
    negative: [
      `마음이 무거우시군요... 별이 당신의 마음을 읽었나 봐요. 하지만 걱정 마세요, 오후부터는 목성의 보호를 받게 됩니다.`,
      `그런 날이 있죠. 하지만 알고 계셨나요? 가장 어두운 밤에 가장 밝은 별이 보인다는 것을.`,
      `${signName}님, 힘든 감정도 지나갈 거예요. 오늘 별이 특별한 위로의 메시지를 준비했어요.`,
    ],
  };

  return [
    {
      id: `emotion-response-1`,
      sender: 'fortune-teller',
      text: selectRandom(responses[emotion], random),
      delay: 800,
    },
  ];
}

/** 운세 소개 메시지 */
function getFortuneIntroMessages(
  signId: ZodiacSignId,
  emotion: EmotionState,
  date: Date,
  overallScore: number
): ChatMessage[] {
  const seed = generateContentSeed(signId, date, 'chat_fortune_intro');
  const random = seededRandom(seed);

  const scoreDesc = overallScore >= 70 ? '아주 좋은 기운' :
                    overallScore >= 50 ? '안정적인 기운' : '조심스러운 기운';

  const intros: string[] = [
    `오늘 ${signKoreanNames[signId]}의 별자리에 ${scoreDesc}이 흐르고 있어요. 자세히 살펴볼까요?`,
    `별들의 배치를 보니... ${scoreDesc}이 감지돼요. 하나씩 풀어드릴게요.`,
    `오늘의 천체 흐름을 읽어보니, ${scoreDesc}이 당신을 감싸고 있네요.`,
  ];

  return [
    {
      id: 'fortune-intro-1',
      sender: 'fortune-teller',
      text: selectRandom(intros, random),
      delay: 1000,
    },
  ];
}

/** 타로 제안 메시지 */
function getTarotOfferMessage(): ChatMessage {
  return {
    id: 'tarot-offer',
    sender: 'fortune-teller',
    text: '오늘 당신에게 특별히 전해드리고 싶은 카드가 있어요. 뽑아보시겠어요?',
    choices: [
      { id: 'tarot-yes', text: '네, 뽑아볼게요! 🃏', nextNodeId: 'closing' },
      { id: 'tarot-no', text: '오늘은 괜찮아요', nextNodeId: 'closing' },
    ],
    delay: 800,
  };
}

/** 마무리 메시지 */
function getClosingMessages(
  signId: ZodiacSignId,
  emotion: EmotionState,
  date: Date,
  tookTarot: boolean
): ChatMessage[] {
  const seed = generateContentSeed(signId, date, 'chat_closing');
  const random = seededRandom(seed);
  const signName = signKoreanNames[signId];

  const closings: string[] = tookTarot
    ? [
        `${signName}님, 카드의 메시지도 함께 확인해보세요. 오늘도 별과 함께 빛나는 하루 되세요! ✨`,
        `좋은 선택이에요! 타로의 메시지가 오늘의 길잡이가 될 거예요. 내일 또 뵐게요, ${signName}님.`,
      ]
    : [
        `${signName}님, 오늘도 좋은 하루 보내세요. 별이 항상 당신 곁에 있을게요. ✨`,
        `내일은 또 다른 별의 메시지가 기다리고 있을 거예요. 내일 또 뵐게요, ${signName}님!`,
      ];

  return [
    {
      id: 'closing-1',
      sender: 'fortune-teller',
      text: selectRandom(closings, random),
      delay: 600,
    },
  ];
}

/** 채팅 초기 상태 생성 */
export function createChatState(
  signId: ZodiacSignId,
  date: Date = new Date()
): ChatState {
  const greetingMsgs = getGreetingMessages(signId, date);
  const emotionAsk = getEmotionAskMessage(signId);

  return {
    phase: 'emotion-ask',
    signId,
    emotion: null,
    messages: [...greetingMsgs, emotionAsk],
    isComplete: false,
  };
}

/** 사용자 감정 선택 처리 */
export function handleEmotionChoice(
  state: ChatState,
  emotion: EmotionState,
  date: Date = new Date()
): ChatState {
  const userMsg: ChatMessage = {
    id: `user-emotion-${Date.now()}`,
    sender: 'user',
    text: emotion === 'positive' ? '기분이 좋아요! ✨' :
          emotion === 'neutral' ? '그냥 보통이에요' : '좀 힘들어요...',
  };

  const responseMsgs = getEmotionResponseMessages(state.signId, emotion, date);

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

  const introMsgs = getFortuneIntroMessages(state.signId, state.emotion, date, overallScore);
  const tarotOffer = getTarotOfferMessage();

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

  const userMsg: ChatMessage = {
    id: `user-tarot-${Date.now()}`,
    sender: 'user',
    text: accepted ? '네, 뽑아볼게요! 🃏' : '오늘은 괜찮아요',
  };

  const closingMsgs = getClosingMessages(state.signId, state.emotion, date, accepted);

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
