'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/auth-store';

export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);
  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setError('이메일을 입력해 주세요.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError('올바른 이메일 형식이 아닙니다.');
      return;
    }
    login(trimmedEmail, displayName.trim());
    router.push('/profile');
    router.refresh();
  };

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-md mx-auto">
        <div className="glass-card p-8">
          <h1 className="text-2xl font-display font-bold text-white mb-2">로그인</h1>
          <p className="text-white/70 text-sm mb-6">
            Phase 2 목업: 이메일만 입력하면 로그인됩니다. (실제 인증 연동 전)
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-1">
                이메일
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="you@example.com"
                autoComplete="email"
              />
            </div>
            <div>
              <label htmlFor="displayName" className="block text-sm font-medium text-white/80 mb-1">
                표시 이름 (선택)
              </label>
              <input
                id="displayName"
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="닉네임"
              />
            </div>
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <button type="submit" className="btn-primary w-full">
              로그인
            </button>
          </form>

          <p className="mt-6 text-center text-white/60 text-sm">
            계정이 없으신가요?{' '}
            <Link href="/signup" className="text-purple-300 hover:text-white underline">
              회원가입
            </Link>
          </p>
        </div>

        <p className="mt-6 text-center">
          <Link href="/" className="text-white/70 hover:text-white text-sm">
            ← 홈으로
          </Link>
        </p>
      </div>
    </div>
  );
}
