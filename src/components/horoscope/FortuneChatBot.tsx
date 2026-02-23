'use client';

import { useState, useEffect, useRef } from 'react';
import type { ZodiacSignId } from '@/types';
import type { EmotionState, ChatMessage } from '@/types/engagement';
import {
  createChatState,
  handleEmotionChoice,
  advanceToFortuneIntro,
  handleTarotChoice,
  getCurrentChoices,
  type ChatState,
} from '@/lib/chat-fortune';
import { trackEvent } from '@/lib/engagement-tracker';

interface FortuneChatBotProps {
  signId: ZodiacSignId;
  overallScore: number;
  onTarotRequested?: () => void;
  onComplete?: () => void;
}

export default function FortuneChatBot({
  signId,
  overallScore,
  onTarotRequested,
  onComplete,
}: FortuneChatBotProps) {
  const [chatState, setChatState] = useState<ChatState | null>(null);
  const [visibleCount, setVisibleCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 채팅 초기화
  const initChat = () => {
    const state = createChatState(signId);
    setChatState(state);
    setVisibleCount(0);
    setIsOpen(true);
    trackEvent('chat_start', { signId });
  };

  // 메시지 순차 표시
  useEffect(() => {
    if (!chatState) return;
    if (visibleCount >= chatState.messages.length) return;

    const nextMsg = chatState.messages[visibleCount];
    const delay = nextMsg.delay || 500;

    const timer = setTimeout(() => {
      setVisibleCount((prev) => prev + 1);
    }, delay);

    return () => clearTimeout(timer);
  }, [chatState, visibleCount]);

  // 스크롤 자동
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [visibleCount]);

  // 선택지 클릭
  const handleChoice = (choiceId: string) => {
    if (!chatState) return;

    if (chatState.phase === 'emotion-ask') {
      const emotion = choiceId as EmotionState;
      let newState = handleEmotionChoice(chatState, emotion);
      newState = advanceToFortuneIntro(newState, overallScore);
      setChatState(newState);
      setVisibleCount(chatState.messages.length); // user msg will trigger cascade
    } else if (chatState.phase === 'tarot-offer') {
      const accepted = choiceId === 'tarot-yes';
      const newState = handleTarotChoice(chatState, accepted);
      setChatState(newState);
      setVisibleCount(chatState.messages.length);
      if (accepted) onTarotRequested?.();
      trackEvent('chat_complete', { signId, tookTarot: accepted });
      onComplete?.();
    }
  };

  const visibleMessages = chatState?.messages.slice(0, visibleCount) || [];
  const currentChoices = chatState ? getCurrentChoices({
    ...chatState,
    messages: visibleMessages,
  }) : undefined;
  const showChoices = currentChoices && visibleCount >= (chatState?.messages.length || 0);

  if (!isOpen) {
    return (
      <div className="glass-card p-5 text-center">
        <p className="text-white/70 text-sm mb-3">별의 도사와 대화하기</p>
        <button
          onClick={initChat}
          className="px-5 py-2.5 rounded-full text-sm font-medium
                     bg-gradient-to-r from-purple-500 to-pink-500
                     text-white hover:opacity-90 transition-opacity active:scale-95"
        >
          🔮 대화 시작하기
        </button>
      </div>
    );
  }

  return (
    <div className="glass-card p-4 max-h-[500px] flex flex-col">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-3 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="text-xl">🔮</span>
          <span className="text-white font-medium text-sm">별의 도사</span>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-white/40 hover:text-white/70 text-sm transition-colors"
        >
          ✕
        </button>
      </div>

      {/* 메시지 영역 */}
      <div className="flex-1 overflow-y-auto space-y-3 mb-3 min-h-[200px] max-h-[350px]">
        {visibleMessages.map((msg) => (
          <div
            key={msg.id}
            className={`animate-chat-in ${
              msg.sender === 'fortune-teller'
                ? 'flex justify-start'
                : 'flex justify-end'
            }`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                msg.sender === 'fortune-teller'
                  ? 'bg-white/10 text-white/90 rounded-tl-sm'
                  : 'bg-purple-500/30 text-white rounded-tr-sm'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {/* 타이핑 인디케이터 */}
        {visibleCount < (chatState?.messages.length || 0) && (
          <div className="flex justify-start">
            <div className="bg-white/10 rounded-2xl rounded-tl-sm px-4 py-3">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* 선택지 */}
      {showChoices && currentChoices && (
        <div className="flex flex-col gap-2 border-t border-white/10 pt-3">
          {currentChoices.map((choice) => (
            <button
              key={choice.id}
              onClick={() => handleChoice(choice.id)}
              className="w-full px-4 py-2.5 rounded-xl text-sm font-medium
                         bg-white/10 hover:bg-white/20 text-white/90
                         transition-colors active:scale-[0.98] text-left"
            >
              {choice.text}
            </button>
          ))}
        </div>
      )}

      {/* 완료 상태 */}
      {chatState?.isComplete && (
        <div className="text-center pt-3 border-t border-white/10">
          <button
            onClick={initChat}
            className="text-white/50 text-xs hover:text-white/70 transition-colors"
          >
            다시 대화하기
          </button>
        </div>
      )}
    </div>
  );
}
