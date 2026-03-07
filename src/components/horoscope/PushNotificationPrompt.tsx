'use client';

import { useState } from 'react';
import { subscribeToPush, savePushSubscription, getPermissionStatus } from '@/lib/push-notification';
import { trackEvent } from '@/lib/engagement-tracker';
import type { ZodiacSignId } from '@/types';

interface PushNotificationPromptProps {
  signId: ZodiacSignId;
  locale?: string;
  onGranted: (timeSlot: 'morning' | 'noon' | 'evening') => void;
  onDenied: () => void;
  onDismiss: () => void;
}

type SupportedLocale = 'ko' | 'en' | 'zh' | 'ja' | 'es';

const TEXT = {
  ko: {
    title: '🔔 매일 운세 알림받기',
    subtitle: '오늘 운세를 잊지 않도록 원하는 시간에 알려드릴게요.',
    morningLabel: '아침 (7~9시)',
    noonLabel: '점심 (12~13시)',
    eveningLabel: '저녁 (20~22시)',
    timeLabel: '알림 받을 시간',
    allowBtn: '알림 허용하기',
    denyBtn: '괜찮아요',
    benefit: '스트릭 3일 달성! 매일 알림으로 연속 방문을 이어가세요 🔥',
    successMsg: '설정 완료! 매일 운세 알림을 보내드릴게요 ✨',
    errorMsg: '알림을 허용해주시면 운세를 보내드릴 수 있어요.',
  },
  en: {
    title: '🔔 Get Daily Horoscope Alerts',
    subtitle: 'We\'ll remind you at your preferred time so you never miss your daily fortune.',
    morningLabel: 'Morning (7-9 AM)',
    noonLabel: 'Noon (12-1 PM)',
    eveningLabel: 'Evening (8-10 PM)',
    timeLabel: 'Preferred Notification Time',
    allowBtn: 'Allow Notifications',
    denyBtn: 'No thanks',
    benefit: '3-day streak! Keep your streak alive with daily reminders 🔥',
    successMsg: 'Set! We\'ll send your daily horoscope alert ✨',
    errorMsg: 'Please allow notifications to receive your horoscope.',
  },
  zh: {
    title: '🔔 接收每日运势提醒',
    subtitle: '我们会在您喜欢的时间提醒您，让您不会错过每日运势。',
    morningLabel: '早晨 (7-9时)',
    noonLabel: '中午 (12-13时)',
    eveningLabel: '晚上 (20-22时)',
    timeLabel: '偏好提醒时间',
    allowBtn: '允许通知',
    denyBtn: '不了',
    benefit: '3天连续访问！用每日提醒保持连续记录 🔥',
    successMsg: '设置完成！我们将发送您的每日运势提醒 ✨',
    errorMsg: '请允许通知以接收运势。',
  },
  ja: {
    title: '🔔 毎日の運勢アラートを受け取る',
    subtitle: 'お好みの時間にお知らせして、毎日の運勢を見逃さないようにします。',
    morningLabel: '朝 (7〜9時)',
    noonLabel: '昼 (12〜13時)',
    eveningLabel: '夜 (20〜22時)',
    timeLabel: '通知希望時間',
    allowBtn: '通知を許可',
    denyBtn: 'いいえ',
    benefit: '3日連続！毎日のリマインダーで連続記録を続けましょう 🔥',
    successMsg: '設定完了！毎日の運勢アラートをお送りします ✨',
    errorMsg: '運勢を受け取るには通知を許可してください。',
  },
  es: {
    title: '🔔 Recibe Alertas Diarias del Horóscopo',
    subtitle: 'Te recordaremos a tu hora preferida para que nunca te pierdas tu fortuna diaria.',
    morningLabel: 'Mañana (7-9 AM)',
    noonLabel: 'Mediodía (12-1 PM)',
    eveningLabel: 'Noche (8-10 PM)',
    timeLabel: 'Hora de Notificación Preferida',
    allowBtn: 'Permitir Notificaciones',
    denyBtn: 'No gracias',
    benefit: '¡Racha de 3 días! Mantén tu racha con recordatorios diarios 🔥',
    successMsg: '¡Listo! Te enviaremos tu alerta diaria del horóscopo ✨',
    errorMsg: 'Por favor permite las notificaciones para recibir tu horóscopo.',
  },
} as const;

// VAPID 공개 키 (환경 변수에서 로드, 없으면 stub)
const VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY ?? '';

export default function PushNotificationPrompt({
  signId,
  locale = 'ko',
  onGranted,
  onDenied,
  onDismiss,
}: PushNotificationPromptProps) {
  const loc: SupportedLocale = (locale as SupportedLocale) in TEXT ? (locale as SupportedLocale) : 'ko';
  const t = TEXT[loc];

  const [timeSlot, setTimeSlot] = useState<'morning' | 'noon' | 'evening'>('morning');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleAllow = async () => {
    trackEvent('push_prompt_view', { signId, action: 'allow_click' });

    if (!VAPID_PUBLIC_KEY) {
      // VAPID 키 미설정 시: 권한만 요청하고 UI 닫기 (graceful fallback)
      const perm = getPermissionStatus();
      if (perm === 'granted') {
        onGranted(timeSlot);
        return;
      }
      const result = await Notification.requestPermission?.().catch(() => 'denied');
      if (result === 'granted') {
        trackEvent('push_permission_granted', { signId, timeSlot });
        onGranted(timeSlot);
      } else {
        trackEvent('push_permission_denied', { signId });
        onDenied();
      }
      return;
    }

    setLoading(true);
    try {
      const sub = await subscribeToPush(VAPID_PUBLIC_KEY);
      if (sub) {
        await savePushSubscription(sub, { timeSlot, locale, signId });
        trackEvent('push_permission_granted', { signId, timeSlot });
        setStatus('success');
        setTimeout(() => onGranted(timeSlot), 1500);
      } else {
        trackEvent('push_permission_denied', { signId });
        setStatus('error');
        onDenied();
      }
    } catch {
      setStatus('error');
      onDenied();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card p-5 border border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 animate-scale-in">
      {/* 헤더 */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-white font-semibold text-sm">{t.title}</h3>
          <p className="text-white/60 text-xs mt-1 leading-relaxed">{t.subtitle}</p>
        </div>
        <button
          onClick={onDismiss}
          className="text-white/30 hover:text-white/60 text-sm ml-2 shrink-0"
          aria-label="닫기"
        >
          ✕
        </button>
      </div>

      {/* 혜택 배지 */}
      <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl px-3 py-2 mb-4">
        <p className="text-amber-300 text-xs font-medium">{t.benefit}</p>
      </div>

      {/* 시간대 선택 */}
      <div className="mb-4">
        <p className="text-white/50 text-xs mb-2">{t.timeLabel}</p>
        <div className="grid grid-cols-3 gap-2">
          {([
            ['morning', t.morningLabel, '🌅'],
            ['noon', t.noonLabel, '☀️'],
            ['evening', t.eveningLabel, '🌙'],
          ] as const).map(([slot, label, icon]) => (
            <button
              key={slot}
              onClick={() => setTimeSlot(slot)}
              className={`flex flex-col items-center gap-1 p-2.5 rounded-xl text-xs font-medium transition-all ${
                timeSlot === slot
                  ? 'bg-purple-500/30 ring-1 ring-purple-400/50 text-white'
                  : 'bg-white/5 text-white/60 hover:bg-white/10'
              }`}
            >
              <span>{icon}</span>
              <span className="leading-tight text-center">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 상태 메시지 */}
      {status === 'success' && (
        <p className="text-emerald-400 text-xs text-center mb-3">{t.successMsg}</p>
      )}
      {status === 'error' && (
        <p className="text-white/50 text-xs text-center mb-3">{t.errorMsg}</p>
      )}

      {/* 버튼 */}
      <div className="flex gap-2">
        <button
          onClick={handleAllow}
          disabled={loading || status === 'success'}
          className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-purple-500/40 hover:bg-purple-500/60 text-white transition-colors disabled:opacity-50"
        >
          {loading ? '...' : t.allowBtn}
        </button>
        <button
          onClick={onDenied}
          className="px-4 py-2.5 rounded-xl text-sm text-white/50 hover:text-white/80 transition-colors"
        >
          {t.denyBtn}
        </button>
      </div>
    </div>
  );
}
