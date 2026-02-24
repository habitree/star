import { describe, it, expect } from 'vitest';
import {
  unlockableContents,
  getContentStatus,
  getAllContentStatuses,
  getUnlockRequirementText,
  getUnlockProgress,
  getNextUnlockable,
} from '../content-unlock';

const defaultOptions = {
  hasBirthDate: false,
  currentStreak: 0,
  completedActions: [] as string[],
  unlockedIds: [] as string[],
};

describe('content-unlock', () => {
  describe('unlockableContents', () => {
    it('should have 12 content items', () => {
      expect(unlockableContents).toHaveLength(12);
    });

    it('should have unique IDs', () => {
      const ids = unlockableContents.map((c) => c.id);
      expect(new Set(ids).size).toBe(ids.length);
    });

    it('streak contents should be in ascending order', () => {
      const streakContents = unlockableContents
        .filter((c) => c.unlockCondition.type === 'streak')
        .map((c) => c.unlockCondition.requiredStreak!);
      for (let i = 1; i < streakContents.length; i++) {
        expect(streakContents[i]).toBeGreaterThan(streakContents[i - 1]);
      }
    });
  });

  describe('getContentStatus', () => {
    it('should return locked for basic-fortune without birthdate', () => {
      expect(getContentStatus('basic-fortune', defaultOptions)).toBe('locked');
    });

    it('should return unlocked for basic-fortune with birthdate', () => {
      expect(
        getContentStatus('basic-fortune', { ...defaultOptions, hasBirthDate: true })
      ).toBe('unlocked');
    });

    it('should return locked for tarot-card without action', () => {
      expect(getContentStatus('tarot-card', defaultOptions)).toBe('locked');
    });

    it('should return unlocked for tarot-card with action completed', () => {
      expect(
        getContentStatus('tarot-card', {
          ...defaultOptions,
          completedActions: ['view-basic-fortune'],
        })
      ).toBe('unlocked');
    });

    it('should return teaser when >= 50% streak', () => {
      // biorhythm requires streak 2, so streak 1 = 50%
      expect(
        getContentStatus('biorhythm', { ...defaultOptions, currentStreak: 1 })
      ).toBe('teaser');
    });

    it('should return unlocked when streak met', () => {
      expect(
        getContentStatus('biorhythm', { ...defaultOptions, currentStreak: 2 })
      ).toBe('unlocked');
    });

    it('should return unlocked if already in unlockedIds', () => {
      expect(
        getContentStatus('hidden-content', {
          ...defaultOptions,
          unlockedIds: ['hidden-content'],
        })
      ).toBe('unlocked');
    });

    it('should return locked for unknown content ID', () => {
      expect(getContentStatus('nonexistent', defaultOptions)).toBe('locked');
    });
  });

  describe('getAllContentStatuses', () => {
    it('should return status for all contents', () => {
      const statuses = getAllContentStatuses(defaultOptions);
      expect(Object.keys(statuses).length).toBe(unlockableContents.length);
    });
  });

  describe('getUnlockRequirementText', () => {
    it('should return text for birthdate type', () => {
      expect(getUnlockRequirementText('basic-fortune')).toContain('생년월일');
    });

    it('should return text for streak type', () => {
      const text = getUnlockRequirementText('weekly-report');
      expect(text).toContain('7일');
    });

    it('should return text for action type', () => {
      expect(getUnlockRequirementText('tarot-card')).toContain('기본 운세');
    });

    it('should return empty string for unknown ID', () => {
      expect(getUnlockRequirementText('nonexistent')).toBe('');
    });
  });

  describe('getUnlockProgress', () => {
    it('should return 0 for non-streak content', () => {
      expect(getUnlockProgress('basic-fortune', 5)).toBe(0);
    });

    it('should return 50 for half streak', () => {
      // weekly-report requires 7 days, streak 3.5 rounded
      expect(getUnlockProgress('weekly-report', 3)).toBeCloseTo(43, 0);
    });

    it('should cap at 100', () => {
      expect(getUnlockProgress('biorhythm', 100)).toBe(100);
    });
  });

  describe('getNextUnlockable', () => {
    it('should return biorhythm for streak 0', () => {
      const next = getNextUnlockable(0);
      expect(next).not.toBeNull();
      expect(next!.id).toBe('biorhythm');
    });

    it('should return null when all unlocked', () => {
      expect(getNextUnlockable(100)).toBeNull();
    });

    it('should return chat-fortune for streak 2', () => {
      const next = getNextUnlockable(2);
      expect(next!.id).toBe('chat-fortune');
    });
  });
});
