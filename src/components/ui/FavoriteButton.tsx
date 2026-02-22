'use client';

import { useCallback, useState, useEffect } from 'react';
import { useUserStore } from '@/stores/user-store';
import type { ZodiacSignId } from '@/types';

interface FavoriteButtonProps {
  signId: ZodiacSignId;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

export default function FavoriteButton({
  signId,
  size = 'md',
  showLabel = false,
  className = '',
}: FavoriteButtonProps) {
  const addFavorite = useUserStore((state) => state.addFavorite);
  const removeFavorite = useUserStore((state) => state.removeFavorite);
  const isFavorite = useUserStore((state) => state.isFavorite);

  // Hydration 문제 방지를 위한 상태
  const [mounted, setMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const favorite = mounted ? isFavorite(signId) : false;

  const handleToggle = useCallback(() => {
    setIsAnimating(true);

    if (favorite) {
      removeFavorite(signId);
    } else {
      addFavorite(signId);
    }

    // 애니메이션 후 상태 리셋
    setTimeout(() => setIsAnimating(false), 300);
  }, [favorite, signId, addFavorite, removeFavorite]);

  const sizeClasses = {
    sm: 'w-6 h-6 text-sm',
    md: 'w-8 h-8 text-base',
    lg: 'w-10 h-10 text-lg',
  };

  const labelSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  return (
    <button
      onClick={handleToggle}
      className={`
        inline-flex items-center gap-1.5
        ${showLabel ? 'px-3 py-1.5 rounded-full' : 'p-1.5 rounded-full'}
        ${favorite
          ? 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30'
          : 'bg-white/10 text-white/50 hover:bg-white/20 hover:text-white/70'
        }
        transition-all duration-200 ease-out
        focus:outline-none focus:ring-2 focus:ring-yellow-500/50
        ${isAnimating ? 'scale-110' : 'scale-100'}
        ${className}
      `}
      aria-label={favorite ? '즐겨찾기 해제' : '즐겨찾기 추가'}
      aria-pressed={favorite}
    >
      <span
        className={`
          ${sizeClasses[size]}
          flex items-center justify-center
          transition-transform duration-200
          ${isAnimating ? 'animate-pulse' : ''}
        `}
      >
        {favorite ? '★' : '☆'}
      </span>
      {showLabel && (
        <span className={`${labelSizeClasses[size]} font-medium`}>
          {favorite ? '즐겨찾기' : '추가'}
        </span>
      )}
    </button>
  );
}
