/**
 * 인증 스토어 단위 테스트 (Phase 2 목업)
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { useAuthStore } from '@/stores/auth-store';

describe('auth-store', () => {
  beforeEach(() => {
    useAuthStore.setState({
      user: null,
      isHydrated: true,
    });
    localStorage.clear();
  });

  describe('login', () => {
    it('should set user with email and displayName', () => {
      const { login } = useAuthStore.getState();

      login('test@example.com', '테스트유저');

      const state = useAuthStore.getState();
      expect(state.user).not.toBeNull();
      expect(state.user?.email).toBe('test@example.com');
      expect(state.user?.displayName).toBe('테스트유저');
      expect(state.user?.id).toMatch(/^user_\d+$/);
      expect(state.user?.createdAt).toBeTruthy();
    });

    it('should use email prefix as displayName when displayName is empty', () => {
      const { login } = useAuthStore.getState();

      login('hello@example.com', '');

      const state = useAuthStore.getState();
      expect(state.user?.displayName).toBe('hello');
    });
  });

  describe('logout', () => {
    it('should clear user', () => {
      const { login, logout } = useAuthStore.getState();

      login('a@b.com', 'User');
      expect(useAuthStore.getState().user).not.toBeNull();

      logout();
      expect(useAuthStore.getState().user).toBeNull();
    });
  });

  describe('setHydrated', () => {
    it('should set isHydrated to true', () => {
      useAuthStore.setState({ isHydrated: false });
      useAuthStore.getState().setHydrated();
      expect(useAuthStore.getState().isHydrated).toBe(true);
    });
  });
});
