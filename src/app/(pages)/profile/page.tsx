'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore, useUser } from '@/stores/auth-store';
import FavoritesSection from '@/components/ui/FavoritesSection';

export default function ProfilePage() {
  const router = useRouter();
  const user = useUser();
  const { isHydrated } = useAuthStore();
  const logout = useAuthStore((s) => s.logout);

  useEffect(() => {
    if (!isHydrated) return;
    if (!user) {
      router.replace('/login');
    }
  }, [isHydrated, user, router]);

  const handleLogout = () => {
    logout();
    router.push('/');
    router.refresh();
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white/70">로딩 중...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="glass-card p-8 mb-8">
          <h1 className="text-2xl font-display font-bold text-white mb-6">프로필</h1>

          <div className="space-y-4">
            <div>
              <span className="text-white/60 text-sm">표시 이름</span>
              <p className="text-white font-medium">{user.displayName}</p>
            </div>
            <div>
              <span className="text-white/60 text-sm">이메일</span>
              <p className="text-white font-medium">{user.email}</p>
            </div>
            <div>
              <span className="text-white/60 text-sm">가입일</span>
              <p className="text-white/80 text-sm">
                {new Date(user.createdAt).toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <button type="button" onClick={handleLogout} className="px-4 py-2 rounded-lg bg-white/10 hover:bg-red-500/20 text-white/90 text-sm">
              로그아웃
            </button>
            <Link href="/" className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm text-center">
              홈으로
            </Link>
          </div>
        </div>

        <div className="glass-card p-6 mb-8">
          <h2 className="text-lg font-semibold text-white mb-4">즐겨찾는 별자리</h2>
          <FavoritesSection />
        </div>

        <p className="text-white/50 text-xs text-center">
          Phase 2 목업 프로필. 추후 출생 차트 연동·구독 정보 등이 추가됩니다.
        </p>
      </div>
    </div>
  );
}
