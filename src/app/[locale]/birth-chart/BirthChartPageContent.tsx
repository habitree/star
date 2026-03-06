'use client';

/**
 * BirthChartPageContent — Big Three 단계적 공개 (Phase 3 전면 재설계)
 * 심리: Zeigarnik(블러) + 매몰 비용(30일) + 자기이해 욕구
 */

import { useState } from 'react';
import { useUserStore } from '@/stores/user-store';
import BigThreeCard from '@/components/horoscope/BigThreeCard';
import ElementDistribution from '@/components/horoscope/ElementDistribution';
import {
  computeBigThree,
  computeElementDistribution,
  getBigThreeUnlockStatus,
} from '@/lib/birth-chart-content';
import { AdSenseUnit } from '@/components/ads';
import { isAdSenseEnabled } from '@/lib/adsense-config';
import type { ZodiacSignId } from '@/types';

type L = 'ko' | 'en' | 'zh' | 'ja' | 'es';

const TEXT = {
  ko: {
    title: '나의 Big Three',
    subtitle: '태양·달·상승점으로 나를 더 깊이 이해하세요',
    noBirthDate: '생년월일을 먼저 등록해 주세요',
    noBirthDateCta: '운세 홈으로 가기',
    advancedTitle: '정밀 출생 차트',
    advancedDesc: '출생 시간·장소를 입력해 더 정확한 차트를 계산합니다',
    advancedCta: '상세 차트 계산하기',
    birthTimeLabel: '출생 시간 (선택)',
    birthTimePlaceholder: '예: 14:30',
    birthTimeSave: '저장',
    birthTimeSaved: '저장됨 ✓',
    lockNote: (days: number) => `${days}일 더 방문하면 달자리가 해금됩니다`,
    unlock30: (days: number) => `${days}일 더 방문하면 상승점이 해금됩니다`,
  },
  en: {
    title: 'My Big Three',
    subtitle: 'Know yourself deeper through Sun, Moon & Rising',
    noBirthDate: 'Please set your birth date first',
    noBirthDateCta: 'Go to Horoscope Home',
    advancedTitle: 'Precise Birth Chart',
    advancedDesc: 'Enter birth time & place for a more accurate chart',
    advancedCta: 'Calculate Detailed Chart',
    birthTimeLabel: 'Birth Time (optional)',
    birthTimePlaceholder: 'e.g. 14:30',
    birthTimeSave: 'Save',
    birthTimeSaved: 'Saved ✓',
    lockNote: (days: number) => `Visit ${days} more days to unlock Moon sign`,
    unlock30: (days: number) => `Visit ${days} more days to unlock Rising sign`,
  },
  zh: {
    title: '我的Big Three',
    subtitle: '通过太阳、月亮、上升星座深入了解自己',
    noBirthDate: '请先设置您的出生日期',
    noBirthDateCta: '前往运势首页',
    advancedTitle: '精确出生图',
    advancedDesc: '输入出生时间和地点获取更准确的星盘',
    advancedCta: '计算详细星盘',
    birthTimeLabel: '出生时间（可选）',
    birthTimePlaceholder: '例如：14:30',
    birthTimeSave: '保存',
    birthTimeSaved: '已保存 ✓',
    lockNote: (days: number) => `再访问${days}天解锁月亮星座`,
    unlock30: (days: number) => `再访问${days}天解锁上升星座`,
  },
  ja: {
    title: '私のBig Three',
    subtitle: '太陽・月・上昇星座で自己をより深く理解する',
    noBirthDate: '先に生年月日を登録してください',
    noBirthDateCta: '運勢ホームへ',
    advancedTitle: '精密な出生図',
    advancedDesc: '出生時刻・場所を入力してより正確なチャートを計算',
    advancedCta: '詳細チャートを計算',
    birthTimeLabel: '出生時刻（任意）',
    birthTimePlaceholder: '例：14:30',
    birthTimeSave: '保存',
    birthTimeSaved: '保存済み ✓',
    lockNote: (days: number) => `あと${days}日で月星座が解放されます`,
    unlock30: (days: number) => `あと${days}日で上昇星座が解放されます`,
  },
  es: {
    title: 'Mis Big Three',
    subtitle: 'Conócete mejor con Sol, Luna y Ascendente',
    noBirthDate: 'Primero registra tu fecha de nacimiento',
    noBirthDateCta: 'Ir al Horóscopo',
    advancedTitle: 'Carta Natal Precisa',
    advancedDesc: 'Ingresa hora y lugar de nacimiento para mayor precisión',
    advancedCta: 'Calcular Carta Detallada',
    birthTimeLabel: 'Hora de Nacimiento (opcional)',
    birthTimePlaceholder: 'ej: 14:30',
    birthTimeSave: 'Guardar',
    birthTimeSaved: 'Guardado ✓',
    lockNote: (days: number) => `Visita ${days} días más para desbloquear signo lunar`,
    unlock30: (days: number) => `Visita ${days} días más para desbloquear ascendente`,
  },
} as const;

interface Props {
  locale?: string;
}

export default function BirthChartPageContent({ locale = 'ko' }: Props) {
  const tl = TEXT[(locale as L) in TEXT ? (locale as L) : 'ko'];
  const {
    birthDate, birthSign, visitStreak, birthTime, setBirthTime,
  } = useUserStore();

  const [timeInput, setTimeInput] = useState(birthTime ?? '');
  const [timeSaved, setTimeSaved] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSaveTime = () => {
    const trimmed = timeInput.trim();
    setBirthTime(trimmed || null);
    setTimeSaved(true);
    setTimeout(() => setTimeSaved(false), 2000);
  };

  if (!birthDate || !birthSign) {
    return (
      <div className="max-w-lg mx-auto mt-16 text-center">
        <p className="text-white/60 mb-4">{tl.noBirthDate}</p>
        <a
          href={`/${locale}`}
          className="inline-block px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium hover:opacity-90"
        >
          {tl.noBirthDateCta}
        </a>
      </div>
    );
  }

  const bigThree = computeBigThree(birthSign as ZodiacSignId, birthDate, birthTime, locale);
  const unlockStatus = getBigThreeUnlockStatus(visitStreak);
  const distribution = computeElementDistribution(bigThree.sun, bigThree.moon, bigThree.rising);

  return (
    <div className="max-w-xl mx-auto py-8 px-4 space-y-5">
      <h1 className="text-2xl font-bold text-white text-center">{tl.title}</h1>
      <p className="text-white/50 text-sm text-center">{tl.subtitle}</p>

      {/* Big Three 카드 */}
      <BigThreeCard
        sunSign={bigThree.sun}
        moonSign={bigThree.moon}
        risingSign={bigThree.rising}
        unlockStatus={unlockStatus}
        visitStreak={visitStreak}
        hasBirthTime={!!birthTime}
        onAddBirthTime={() => setShowAdvanced(true)}
        locale={locale}
      />

      {/* 원소 분포 */}
      {unlockStatus.moon === 'unlocked' && (
        <ElementDistribution distribution={distribution} locale={locale} />
      )}

      {/* 출생 시간 입력 */}
      <div className="glass-card p-4">
        <p className="text-white/60 text-xs mb-2">{tl.birthTimeLabel}</p>
        <div className="flex gap-2">
          <input
            type="time"
            value={timeInput}
            onChange={e => { setTimeInput(e.target.value); setTimeSaved(false); }}
            placeholder={tl.birthTimePlaceholder}
            className="flex-1 px-3 py-2 rounded-lg bg-white/10 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500/50"
          />
          <button
            onClick={handleSaveTime}
            className="px-4 py-2 rounded-lg bg-purple-500/30 border border-purple-500/30 text-purple-300 text-sm hover:bg-purple-500/40 transition-colors"
          >
            {timeSaved ? tl.birthTimeSaved : tl.birthTimeSave}
          </button>
        </div>
      </div>

      {/* 상세 차트 계산 링크 */}
      <button
        onClick={() => setShowAdvanced(!showAdvanced)}
        className="w-full py-3 rounded-xl border border-white/10 text-white/40 text-sm hover:border-white/20 hover:text-white/60 transition-colors"
      >
        {showAdvanced ? '▲' : '▼'} {tl.advancedCta}
      </button>

      {showAdvanced && (
        <div className="glass-card p-5 text-center">
          <p className="text-white/60 text-sm mb-3">{tl.advancedDesc}</p>
          <a
            href={`/${locale}/birth-chart/advanced`}
            className="inline-block px-5 py-2 rounded-full bg-gradient-to-r from-purple-500/30 to-indigo-500/30 border border-purple-500/30 text-purple-300 text-sm hover:from-purple-500/40"
          >
            {tl.advancedCta}
          </a>
        </div>
      )}

      {isAdSenseEnabled() && (
        <AdSenseUnit adFormat="auto" responsive className="w-full" />
      )}
    </div>
  );
}
