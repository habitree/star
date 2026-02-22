/**
 * 사용자 스토어 단위 테스트
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useUserStore } from '@/stores/user-store';
import type { ZodiacSignId } from '@/types';

describe('user-store', () => {
  beforeEach(() => {
    // 각 테스트 전에 스토어 리셋
    useUserStore.setState({
      favorites: [],
      history: [],
      preferences: {
        locale: 'ko',
        theme: 'system',
        notifications: {
          daily: false,
          weekly: false,
          monthly: false,
        },
      },
      lastVisit: null,
      visitCount: 0,
    });

    // localStorage 클리어
    localStorage.clear();
  });

  describe('favorites', () => {
    it('should add a favorite sign', () => {
      const { addFavorite, getFavorites } = useUserStore.getState();

      addFavorite('aries');

      const favorites = getFavorites();
      expect(favorites.length).toBe(1);
      expect(favorites[0].signId).toBe('aries');
      expect(favorites[0].addedAt).toBeTruthy();
    });

    it('should add a favorite sign with nickname', () => {
      const { addFavorite, getFavorites } = useUserStore.getState();

      addFavorite('taurus', '내 별자리');

      const favorites = getFavorites();
      expect(favorites[0].nickname).toBe('내 별자리');
    });

    it('should not add duplicate favorites', () => {
      const { addFavorite, getFavorites } = useUserStore.getState();

      addFavorite('aries');
      addFavorite('aries');

      const favorites = getFavorites();
      expect(favorites.length).toBe(1);
    });

    it('should remove a favorite sign', () => {
      const { addFavorite, removeFavorite, getFavorites } = useUserStore.getState();

      addFavorite('aries');
      addFavorite('taurus');
      removeFavorite('aries');

      const favorites = getFavorites();
      expect(favorites.length).toBe(1);
      expect(favorites[0].signId).toBe('taurus');
    });

    it('should check if sign is favorite', () => {
      const { addFavorite, isFavorite } = useUserStore.getState();

      addFavorite('aries');

      expect(isFavorite('aries')).toBe(true);
      expect(isFavorite('taurus')).toBe(false);
    });

    it('should update favorite nickname', () => {
      const { addFavorite, updateFavoriteNickname, getFavorites } = useUserStore.getState();

      addFavorite('aries', '원래 이름');
      updateFavoriteNickname('aries', '새 이름');

      const favorites = getFavorites();
      expect(favorites[0].nickname).toBe('새 이름');
    });

    it('should reorder favorites', () => {
      const { addFavorite, reorderFavorites, getFavorites } = useUserStore.getState();

      addFavorite('aries');
      addFavorite('taurus');
      addFavorite('gemini');

      reorderFavorites(2, 0); // gemini를 맨 앞으로

      const favorites = getFavorites();
      expect(favorites[0].signId).toBe('gemini');
      expect(favorites[1].signId).toBe('aries');
      expect(favorites[2].signId).toBe('taurus');
    });
  });

  describe('history', () => {
    it('should add item to history', () => {
      const { addToHistory, getHistory } = useUserStore.getState();

      addToHistory({
        signId: 'aries',
        overallScore: 4,
        type: 'daily',
      });

      const history = getHistory();
      expect(history.length).toBe(1);
      expect(history[0].signId).toBe('aries');
      expect(history[0].date).toBeTruthy();
    });

    it('should limit history items', () => {
      const { addToHistory, getHistory } = useUserStore.getState();

      // 101개 추가
      for (let i = 0; i < 101; i++) {
        addToHistory({
          signId: 'aries',
          overallScore: 3,
          type: 'daily',
        });
      }

      const history = getHistory();
      expect(history.length).toBe(100); // MAX_HISTORY_ITEMS
    });

    it('should get limited history', () => {
      const { addToHistory, getHistory } = useUserStore.getState();

      for (let i = 0; i < 10; i++) {
        addToHistory({
          signId: 'aries',
          overallScore: 3,
          type: 'daily',
        });
      }

      const limitedHistory = getHistory(5);
      expect(limitedHistory.length).toBe(5);
    });

    it('should get history by sign', () => {
      const { addToHistory, getHistoryBySign } = useUserStore.getState();

      addToHistory({ signId: 'aries', overallScore: 3, type: 'daily' });
      addToHistory({ signId: 'taurus', overallScore: 4, type: 'daily' });
      addToHistory({ signId: 'aries', overallScore: 5, type: 'weekly' });

      const ariesHistory = getHistoryBySign('aries');
      expect(ariesHistory.length).toBe(2);
    });

    it('should clear history', () => {
      const { addToHistory, clearHistory, getHistory } = useUserStore.getState();

      addToHistory({ signId: 'aries', overallScore: 3, type: 'daily' });
      clearHistory();

      const history = getHistory();
      expect(history.length).toBe(0);
    });
  });

  describe('preferences', () => {
    it('should update preferences', () => {
      const { updatePreferences, preferences } = useUserStore.getState();

      useUserStore.getState().updatePreferences({
        locale: 'en',
        theme: 'dark',
      });

      const updatedPrefs = useUserStore.getState().preferences;
      expect(updatedPrefs.locale).toBe('en');
      expect(updatedPrefs.theme).toBe('dark');
    });

    it('should set default sign', () => {
      const { setDefaultSign } = useUserStore.getState();

      setDefaultSign('aries');

      const prefs = useUserStore.getState().preferences;
      expect(prefs.defaultSign).toBe('aries');
    });

    it('should set theme', () => {
      const { setTheme } = useUserStore.getState();

      setTheme('dark');

      const prefs = useUserStore.getState().preferences;
      expect(prefs.theme).toBe('dark');
    });

    it('should set locale', () => {
      const { setLocale } = useUserStore.getState();

      setLocale('ja');

      const prefs = useUserStore.getState().preferences;
      expect(prefs.locale).toBe('ja');
    });
  });

  describe('visit tracking', () => {
    it('should record visit', () => {
      const { recordVisit } = useUserStore.getState();

      recordVisit();

      const state = useUserStore.getState();
      expect(state.lastVisit).toBeTruthy();
      expect(state.visitCount).toBe(1);
    });

    it('should increment visit count', () => {
      const { recordVisit } = useUserStore.getState();

      recordVisit();
      recordVisit();
      recordVisit();

      const state = useUserStore.getState();
      expect(state.visitCount).toBe(3);
    });
  });
});
