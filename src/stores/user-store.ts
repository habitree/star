/**
 * 사용자 설정 및 즐겨찾기 상태 관리 스토어
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { ZodiacSignId } from '@/types';

// 즐겨찾기 항목 타입
export interface FavoriteSign {
  signId: ZodiacSignId;
  addedAt: string; // ISO date string
  nickname?: string; // 사용자 지정 별칭 (예: "내 별자리", "엄마 별자리")
}

// 운세 히스토리 항목 타입
export interface HoroscopeHistoryItem {
  date: string; // ISO date string
  signId: ZodiacSignId;
  overallScore: number;
  type: 'daily' | 'weekly' | 'monthly';
}

// 사용자 설정 타입
export interface UserPreferences {
  locale: 'ko' | 'en' | 'zh' | 'ja' | 'es';
  theme: 'light' | 'dark' | 'system';
  notifications: {
    daily: boolean;
    weekly: boolean;
    monthly: boolean;
  };
  defaultSign?: ZodiacSignId;
}

// 스토어 상태 타입
interface UserState {
  // 즐겨찾기
  favorites: FavoriteSign[];

  // 운세 조회 히스토리
  history: HoroscopeHistoryItem[];

  // 사용자 설정
  preferences: UserPreferences;

  // 마지막 방문 정보
  lastVisit: string | null;
  visitCount: number;

  // 즐겨찾기 관련 액션
  addFavorite: (signId: ZodiacSignId, nickname?: string) => void;
  removeFavorite: (signId: ZodiacSignId) => void;
  updateFavoriteNickname: (signId: ZodiacSignId, nickname: string) => void;
  isFavorite: (signId: ZodiacSignId) => boolean;
  getFavorites: () => FavoriteSign[];
  reorderFavorites: (fromIndex: number, toIndex: number) => void;

  // 히스토리 관련 액션
  addToHistory: (item: Omit<HoroscopeHistoryItem, 'date'>) => void;
  clearHistory: () => void;
  getHistory: (limit?: number) => HoroscopeHistoryItem[];
  getHistoryBySign: (signId: ZodiacSignId) => HoroscopeHistoryItem[];

  // 설정 관련 액션
  updatePreferences: (prefs: Partial<UserPreferences>) => void;
  setDefaultSign: (signId: ZodiacSignId | undefined) => void;
  setTheme: (theme: UserPreferences['theme']) => void;
  setLocale: (locale: UserPreferences['locale']) => void;

  // 방문 추적
  recordVisit: () => void;
}

// 기본 설정값
const defaultPreferences: UserPreferences = {
  locale: 'ko',
  theme: 'system',
  notifications: {
    daily: false,
    weekly: false,
    monthly: false,
  },
};

// 히스토리 최대 보관 수
const MAX_HISTORY_ITEMS = 100;

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      // 초기 상태
      favorites: [],
      history: [],
      preferences: defaultPreferences,
      lastVisit: null,
      visitCount: 0,

      // 즐겨찾기 액션
      addFavorite: (signId, nickname) => {
        const { favorites } = get();
        if (favorites.some(f => f.signId === signId)) {
          return; // 이미 존재하면 추가하지 않음
        }
        set({
          favorites: [
            ...favorites,
            {
              signId,
              addedAt: new Date().toISOString(),
              nickname,
            },
          ],
        });
      },

      removeFavorite: (signId) => {
        set({
          favorites: get().favorites.filter(f => f.signId !== signId),
        });
      },

      updateFavoriteNickname: (signId, nickname) => {
        set({
          favorites: get().favorites.map(f =>
            f.signId === signId ? { ...f, nickname } : f
          ),
        });
      },

      isFavorite: (signId) => {
        return get().favorites.some(f => f.signId === signId);
      },

      getFavorites: () => {
        return get().favorites;
      },

      reorderFavorites: (fromIndex, toIndex) => {
        const favorites = [...get().favorites];
        const [removed] = favorites.splice(fromIndex, 1);
        favorites.splice(toIndex, 0, removed);
        set({ favorites });
      },

      // 히스토리 액션
      addToHistory: (item) => {
        const history = [...get().history];
        const newItem: HoroscopeHistoryItem = {
          ...item,
          date: new Date().toISOString(),
        };

        // 최신 항목을 앞에 추가
        history.unshift(newItem);

        // 최대 보관 수 초과 시 오래된 항목 제거
        if (history.length > MAX_HISTORY_ITEMS) {
          history.splice(MAX_HISTORY_ITEMS);
        }

        set({ history });
      },

      clearHistory: () => {
        set({ history: [] });
      },

      getHistory: (limit) => {
        const history = get().history;
        return limit ? history.slice(0, limit) : history;
      },

      getHistoryBySign: (signId) => {
        return get().history.filter(h => h.signId === signId);
      },

      // 설정 액션
      updatePreferences: (prefs) => {
        set({
          preferences: {
            ...get().preferences,
            ...prefs,
          },
        });
      },

      setDefaultSign: (signId) => {
        set({
          preferences: {
            ...get().preferences,
            defaultSign: signId,
          },
        });
      },

      setTheme: (theme) => {
        set({
          preferences: {
            ...get().preferences,
            theme,
          },
        });
      },

      setLocale: (locale) => {
        set({
          preferences: {
            ...get().preferences,
            locale,
          },
        });
      },

      // 방문 추적
      recordVisit: () => {
        set({
          lastVisit: new Date().toISOString(),
          visitCount: get().visitCount + 1,
        });
      },
    }),
    {
      name: 'zodiac-user-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        favorites: state.favorites,
        history: state.history,
        preferences: state.preferences,
        lastVisit: state.lastVisit,
        visitCount: state.visitCount,
      }),
    }
  )
);

// 편의를 위한 선택자 훅
export const useFavorites = () => useUserStore((state) => state.favorites);
export const usePreferences = () => useUserStore((state) => state.preferences);
export const useTheme = () => useUserStore((state) => state.preferences.theme);
export const useLocale = () => useUserStore((state) => state.preferences.locale);
