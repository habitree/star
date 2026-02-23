'use client';

import { useState } from 'react';
import { getZodiacSignByDate } from '@/lib/zodiac-utils';
import { generateDailyHoroscope } from '@/lib/horoscope-generator';
import { zodiacData } from '@/data/zodiac-info';
import type { ZodiacSignId, HoroscopeCategory } from '@/types';

interface FortuneComparisonProps {
  mySignId: ZodiacSignId;
}

const categories: { key: HoroscopeCategory; label: string; icon: string }[] = [
  { key: 'overall', label: '종합', icon: '⭐' },
  { key: 'love', label: '연애', icon: '❤️' },
  { key: 'career', label: '직장', icon: '💼' },
  { key: 'health', label: '건강', icon: '🏥' },
  { key: 'money', label: '금전', icon: '💰' },
];

export default function FortuneComparison({ mySignId }: FortuneComparisonProps) {
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

  const myHoroscope = generateDailyHoroscope(mySignId, new Date(), 'ko');
  const friendHoroscope = friendSign
    ? generateDailyHoroscope(friendSign, new Date(), 'ko')
    : null;

  const myInfo = zodiacData[mySignId];
  const friendInfo = friendSign ? zodiacData[friendSign] : null;

  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-semibold text-white mb-4 text-center">
        친구와 운세 비교
      </h3>

      <div className="mb-4">
        <label className="block text-sm text-white/60 mb-2 text-center">
          친구 생년월일을 입력하세요
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
              <p className="text-xs text-white/60 mt-1">{myInfo.name}</p>
            </div>
            <span className="text-white/30 text-sm">VS</span>
            <div className="text-center">
              <span className="text-2xl">{friendInfo.symbol}</span>
              <p className="text-xs text-white/60 mt-1">{friendInfo.name}</p>
            </div>
          </div>

          {/* 비교 바 */}
          {categories.map(({ key, label, icon }) => {
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
                <span className="text-[10px] text-white/40 w-8">{label}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
