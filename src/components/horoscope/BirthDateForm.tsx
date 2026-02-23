'use client';

import { useState } from 'react';
import { getZodiacSignByDate } from '@/lib/zodiac-utils';
import { zodiacData } from '@/data/zodiac-info';
import type { ZodiacSignId } from '@/types';

interface BirthDateFormProps {
  onSubmit: (birthDate: string, signId: ZodiacSignId) => void;
}

export default function BirthDateForm({ onSubmit }: BirthDateFormProps) {
  const [dateValue, setDateValue] = useState('');
  const [detectedSign, setDetectedSign] = useState<ZodiacSignId | null>(null);

  const now = new Date();
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDateValue(value);
    if (value) {
      // YYYY-MM-DD 파싱 시 timezone offset 방지
      const [y, m, d] = value.split('-').map(Number);
      const sign = getZodiacSignByDate(new Date(y, m - 1, d));
      setDetectedSign(sign);
    } else {
      setDetectedSign(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (dateValue && detectedSign) {
      onSubmit(dateValue, detectedSign);
    }
  };

  const signInfo = detectedSign ? zodiacData[detectedSign] : null;

  return (
    <div className="glass-card p-8 max-w-md mx-auto text-center">
      <h2 className="text-2xl font-serif font-bold text-white mb-2">
        나만의 운세 보기
      </h2>
      <p className="text-white/60 mb-6 text-sm">
        생년월일을 입력하면 맞춤형 운세를 확인할 수 있어요
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="birthdate" className="block text-sm text-white/70 mb-2">
            생년월일
          </label>
          <input
            type="date"
            id="birthdate"
            value={dateValue}
            onChange={handleDateChange}
            max={today}
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20
                       text-white text-center text-lg
                       focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50
                       [color-scheme:dark]"
            required
          />
        </div>

        {/* 감지된 별자리 미리보기 */}
        {signInfo && (
          <div className="animate-fade-in-up">
            <div className={`inline-flex items-center gap-3 px-5 py-3 rounded-full
                            bg-white/10 border border-white/20`}>
              <span className="text-3xl">{signInfo.symbol}</span>
              <div className="text-left">
                <p className="text-white font-semibold">{signInfo.name}</p>
                <p className="text-xs text-white/50">{signInfo.dateRange}</p>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium
                ${signInfo.element === 'fire' ? 'bg-red-500/20 text-red-300' : ''}
                ${signInfo.element === 'earth' ? 'bg-green-500/20 text-green-300' : ''}
                ${signInfo.element === 'air' ? 'bg-blue-500/20 text-blue-300' : ''}
                ${signInfo.element === 'water' ? 'bg-purple-500/20 text-purple-300' : ''}
              `}>
                {signInfo.element === 'fire' ? '불' : signInfo.element === 'earth' ? '땅' : signInfo.element === 'air' ? '바람' : '물'}
              </span>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={!detectedSign}
          className="w-full py-3 px-6 rounded-xl font-semibold text-white
                     bg-gradient-to-r from-purple-500 to-pink-500
                     hover:opacity-90 active:scale-95
                     disabled:opacity-40 disabled:cursor-not-allowed
                     transition-all duration-200 shadow-lg shadow-purple-500/30"
        >
          내 운세 보기
        </button>
      </form>
    </div>
  );
}
