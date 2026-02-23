/**
 * 감정 상태별 맞춤 응답 전략
 * 바넘 효과 + 동기부여 인터뷰 기법 적용
 */

import type { ZodiacSignId } from '@/types';
import type { EmotionState } from '@/types/engagement';
import { seededRandom, generateContentSeed, selectRandom, signKoreanNames } from './content-pipeline';

/** 감정별 공감 응답 */
const empathyResponses: Record<EmotionState, string[]> = {
  positive: [
    '오늘 기분이 좋으시군요! 별도 당신과 함께 기뻐하고 있어요.',
    '밝은 에너지가 느껴져요. 좋은 일이 계속될 거예요.',
    '그 활력 에너지가 주변 사람들에게도 전해질 거예요.',
    '행복한 기운이 오늘의 운세를 더욱 빛나게 해줄 거예요.',
    '긍정의 파장이 우주에 전해지고 있어요.',
  ],
  neutral: [
    '차분한 에너지가 느껴지네요. 그것도 좋은 상태예요.',
    '평온한 마음이 오늘의 운세를 더 선명하게 보여줄 거예요.',
    '고요한 물에 비치는 달처럼, 맑은 마음 상태군요.',
    '편안한 상태에서 직감이 가장 잘 작동해요.',
    '안정된 마음이 좋은 결정을 만들어요.',
  ],
  negative: [
    '마음이 무거우시군요. 별이 당신 곁에 있다는 것을 기억하세요.',
    '힘든 감정도 지나갈 거예요. 오늘의 운세가 위로가 될 거예요.',
    '어둠 뒤에 반드시 빛이 찾아옵니다. 곧 나아질 거예요.',
    '그런 마음이 드는 것은 자연스러운 거예요. 당신은 혼자가 아니에요.',
    '지금의 감정을 인정하는 것이 치유의 시작이에요.',
  ],
};

/** 감정별 전환 메시지 (운세로 이어지는) */
const transitionMessages: Record<EmotionState, string[]> = {
  positive: [
    '이 좋은 기운을 유지하면서, 오늘의 별자리 메시지를 확인해볼까요?',
    '오늘의 운세가 당신의 좋은 기분에 날개를 달아줄 거예요.',
    '별들이 오늘 특별한 메시지를 준비했어요. 확인해보세요!',
  ],
  neutral: [
    '오늘의 운세가 하루에 작은 설렘을 더해줄 거예요.',
    '별들이 당신에게 전하고 싶은 이야기가 있어요.',
    '차분한 마음으로 오늘의 메시지를 받아보세요.',
  ],
  negative: [
    '하지만 별들이 오늘 당신에게 특별한 위로를 준비했어요.',
    '오늘의 운세에서 작은 희망을 발견하실 수 있을 거예요.',
    '별의 메시지가 마음을 어루만져줄 거예요. 함께 확인해볼까요?',
  ],
};

/** 시간대별 인사말 */
const timeGreetings: Record<'morning' | 'afternoon' | 'evening', string[]> = {
  morning: [
    '좋은 아침이에요!',
    '상쾌한 아침이네요!',
    '새로운 하루가 시작되었어요!',
  ],
  afternoon: [
    '활기찬 오후에요!',
    '오후의 햇살처럼 밝게!',
    '하루의 중반을 잘 보내고 계시네요!',
  ],
  evening: [
    '편안한 저녁이에요.',
    '하루를 마무리하는 시간이네요.',
    '고요한 밤하늘의 별처럼.',
  ],
};

/** 감정 기반 맞춤 응답 생성 */
export function generateEmotionResponse(
  signId: ZodiacSignId,
  emotion: EmotionState,
  date: Date = new Date()
): {
  greeting: string;
  empathy: string;
  transition: string;
  tone: 'warm' | 'energetic' | 'calm';
} {
  const seed = generateContentSeed(signId, date, `emotion_${emotion}`);
  const random = seededRandom(seed);
  const signName = signKoreanNames[signId];

  const hour = date.getHours();
  const timePeriod: 'morning' | 'afternoon' | 'evening' =
    hour < 12 ? 'morning' : hour < 18 ? 'afternoon' : 'evening';

  const greeting = `${selectRandom(timeGreetings[timePeriod], random)} ${signName}님,`;
  const empathy = selectRandom(empathyResponses[emotion], random);
  const transition = selectRandom(transitionMessages[emotion], random);

  const tone: 'warm' | 'energetic' | 'calm' =
    emotion === 'positive' ? 'energetic' :
    emotion === 'negative' ? 'warm' : 'calm';

  return { greeting, empathy, transition, tone };
}

/** 감정별 추천 활동 */
export function getRecommendedActivity(
  emotion: EmotionState,
  signId: ZodiacSignId,
  date: Date = new Date()
): string {
  const seed = generateContentSeed(signId, date, `activity_${emotion}`);
  const random = seededRandom(seed);

  const activities: Record<EmotionState, string[]> = {
    positive: [
      '이 좋은 에너지를 활용해 미뤄둔 계획을 실행해보세요.',
      '감사 일기를 작성하면 이 행복이 더 오래 지속돼요.',
      '좋은 기운을 나누면 더 큰 행운이 돌아와요. 주변에 연락해보세요.',
      '창의적인 활동에 도전하기 완벽한 컨디션이에요.',
    ],
    neutral: [
      '가벼운 산책이 하루에 활력을 더해줄 거예요.',
      '좋아하는 음악을 들으며 자기만의 시간을 가져보세요.',
      '5분 명상으로 내면의 소리에 귀 기울여보세요.',
      '새로운 것을 배워보는 건 어떨까요? 작은 변화가 큰 기쁨이 돼요.',
    ],
    negative: [
      '따뜻한 차 한 잔과 함께 깊은 호흡을 해보세요.',
      '좋아하는 향초를 켜고 편안한 음악을 들어보세요.',
      '마음을 글로 표현하면 한결 가벼워질 거예요.',
      '사랑하는 사람에게 안부 전화를 걸어보세요.',
    ],
  };

  return selectRandom(activities[emotion], random);
}

/** 감정 상태에 맞는 운세 해석 프레임 */
export function getInterpretationFrame(
  emotion: EmotionState,
  score: number
): string {
  if (emotion === 'positive') {
    if (score >= 70) return '기분 좋은 날에 운세까지 좋다니, 오늘은 정말 당신의 날이에요!';
    if (score >= 50) return '좋은 기분이 오늘의 작은 도전도 가볍게 넘기게 해줄 거예요.';
    return '긍정적인 마인드가 오늘의 어려움을 기회로 바꿔줄 거예요.';
  }
  if (emotion === 'negative') {
    if (score >= 70) return '마음은 무겁지만, 별들은 당신에게 좋은 기운을 보내고 있어요. 곧 나아질 거예요.';
    if (score >= 50) return '지금은 힘들어도, 별의 흐름이 당신을 보호하고 있어요.';
    return '가장 어두운 밤이 가장 밝은 별을 보여주듯, 이 시간도 지나갈 거예요.';
  }
  // neutral
  if (score >= 70) return '차분한 마음으로 오늘의 좋은 흐름을 받아들여보세요.';
  if (score >= 50) return '평온한 하루가 될 거예요. 작은 것에서 행복을 찾아보세요.';
  return '고요한 에너지가 필요한 날이에요. 자기 자신에게 집중하세요.';
}
