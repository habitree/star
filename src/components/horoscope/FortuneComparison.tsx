'use client';

import { useState } from 'react';
import { getZodiacSignByDate } from '@/lib/zodiac-utils';
import { generateDailyHoroscope } from '@/lib/horoscope-generator';
import { zodiacData } from '@/data/zodiac-info';
import { zodiacSigns } from '@/data/zodiac-signs';
import type { ZodiacSignId, HoroscopeCategory } from '@/types';

const FC_TEXT = {
  ko: {
    title: '친구와 운세 비교',
    label: '친구 생년월일을 입력하세요',
    cats: { overall: '종합', love: '연애', career: '직장', health: '건강', money: '금전' },
  },
  en: {
    title: "Compare Fortune with a Friend",
    label: "Enter your friend's birth date",
    cats: { overall: 'Total', love: 'Love', career: 'Career', health: 'Health', money: 'Money' },
  },
  zh: {
    title: '与朋友对比运势',
    label: '输入朋友的生日',
    cats: { overall: '综合', love: '爱情', career: '事业', health: '健康', money: '财运' },
  },
  ja: {
    title: '友達と運勢を比較',
    label: '友達の生年月日を入力してください',
    cats: { overall: '総合', love: '恋愛', career: '仕事', health: '健康', money: '金運' },
  },
  es: {
    title: 'Comparar Fortuna con un Amigo',
    label: 'Ingresa la fecha de nacimiento de tu amigo',
    cats: { overall: 'Total', love: 'Amor', career: 'Trabajo', health: 'Salud', money: 'Dinero' },
  },
} as const;
type FCLocale = keyof typeof FC_TEXT;

const catIcons: Record<HoroscopeCategory, string> = {
  overall: '⭐', love: '❤️', career: '💼', health: '🏥', money: '💰',
};
const catKeys: HoroscopeCategory[] = ['overall', 'love', 'career', 'health', 'money'];

// Locale-aware sign name lookup
const signNameMap: Record<string, Record<string, string>> = Object.fromEntries(
  zodiacSigns.map((s) => [s.id, s.names as unknown as Record<string, string>])
);

interface FortuneComparisonProps {
  mySignId: ZodiacSignId;
  locale?: string;
}

export default function FortuneComparison({ mySignId, locale = 'ko' }: FortuneComparisonProps) {
  const tl = FC_TEXT[(locale as FCLocale) in FC_TEXT ? (locale as FCLocale) : 'ko'];
  const [friendDate, setFriendDate] = useState('');
  const [friendSign, setFriendSign] = useState<ZodiacSignId | null>(null);

  const now = new Date();
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setFriendDate(val);
    if (val) {
      const [y, m, d] = val.split('-').map(Number);
      setFriendSign(getZodiacSignByDate(new Date(y, m - 1, d)));
    } else {
      setFriendSign(null);
    }
  };

  const myHoroscope = generateDailyHoroscope(mySignId, new Date(), locale);
  const friendHoroscope = friendSign
    ? generateDailyHoroscope(friendSign, new Date(), locale)
    : null;

  const myInfo = zodiacData[mySignId];
  const myName = signNameMap[mySignId]?.[locale] ?? myInfo.name;
  const friendInfo = friendSign ? zodiacData[friendSign] : null;
  const friendName = friendSign ? (signNameMap[friendSign]?.[locale] ?? friendInfo?.name ?? friendSign) : null;

  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-semibold text-white mb-4 text-center">
        {tl.title}
      </h3>

      <div className="mb-4">
        <label className="block text-sm text-white/60 mb-2 text-center">
          {tl.label}
        </label>
        <input
          type="date"
          value={friendDate}
          onChange={handleDateChange}
          max={today}
          className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20
                     text-white text-center text-sm
                     focus:outline-none focus:ring-2 focus:ring-purple-500/50
                     [color-scheme:dark]"
        />
      </div>

      {friendSign && friendHoroscope && friendInfo && (
        <div className="animate-fade-in-up space-y-3">
          {/* 헤더 */}
          <div className="flex justify-between items-center px-2">
            <div className="text-center">
              <span className="text-2xl">{myInfo.symbol}</span>
              <p className="text-xs text-white/60 mt-1">{myName}</p>
            </div>
            <span className="text-white/30 text-sm">VS</span>
            <div className="text-center">
              <span className="text-2xl">{friendInfo.symbol}</span>
              <p className="text-xs text-white/60 mt-1">{friendName}</p>
            </div>
          </div>

          {/* 비교 바 */}
          {catKeys.map((key) => {
            const myScore = myHoroscope[key].score;
            const friendScore = friendHoroscope[key].score;
            return (
              <div key={key} className="flex items-center gap-2">
                <span className="w-6 text-center text-sm font-bold text-white">{myScore}</span>
                <div className="flex-1 h-3 rounded-full bg-white/10 relative overflow-hidden">
                  <div
                    className="absolute left-0 top-0 h-full rounded-l-full bg-purple-500/60"
                    style={{ width: `${(myScore / 5) * 50}%` }}
                  />
                  <div
                    className="absolute right-0 top-0 h-full rounded-r-full bg-pink-500/60"
                    style={{ width: `${(friendScore / 5) * 50}%` }}
                  />
                </div>
                <span className="w-6 text-center text-sm font-bold text-white">{friendScore}</span>
                <span className="text-[10px] text-white/40 w-8">{tl.cats[key as keyof typeof tl.cats]}</span>
                <span className="text-sm">{catIcons[key]}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
