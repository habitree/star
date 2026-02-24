import { describe, it, expect } from 'vitest';
import {
  streakBadges,
  streakRewards,
  getEarnedBadges,
  getDaysToNextMilestone,
  getNewlyEarnedReward,
  getStreakLevel,
  getMotivationMessage,
} from '../streak-rewards';

describe('streak-rewards', () => {
  describe('streakBadges', () => {
    it('should have 9 milestones defined', () => {
      const milestones = Object.keys(streakBadges).map(Number);
      expect(milestones).toEqual([3, 7, 14, 30, 45, 60, 75, 90, 100]);
    });

    it('each badge should have required fields', () => {
      for (const badge of Object.values(streakBadges)) {
        expect(badge.id).toBeTruthy();
        expect(badge.name).toBeTruthy();
        expect(badge.description).toBeTruthy();
        expect(badge.icon).toBeTruthy();
        expect(badge.requiredStreak).toBeGreaterThan(0);
      }
    });
  });

  describe('streakRewards', () => {
    it('should have 9 rewards matching milestones', () => {
      expect(streakRewards).toHaveLength(9);
      const milestones = streakRewards.map((r) => r.milestone);
      expect(milestones).toEqual([3, 7, 14, 30, 45, 60, 75, 90, 100]);
    });

    it('each reward should have unlockContent', () => {
      for (const reward of streakRewards) {
        expect(reward.unlockContent).toBeTruthy();
        expect(reward.message).toBeTruthy();
        expect(reward.badge).toBeDefined();
      }
    });
  });

  describe('getEarnedBadges', () => {
    it('should return empty for streak 0', () => {
      expect(getEarnedBadges(0)).toHaveLength(0);
    });

    it('should return 1 badge for streak 3', () => {
      expect(getEarnedBadges(3)).toHaveLength(1);
    });

    it('should return all 9 badges for streak 100', () => {
      expect(getEarnedBadges(100)).toHaveLength(9);
    });

    it('should return 5 badges for streak 50', () => {
      // milestones <= 50: 3, 7, 14, 30, 45
      expect(getEarnedBadges(50)).toHaveLength(5);
    });
  });

  describe('getDaysToNextMilestone', () => {
    it('should return 3 days for streak 0', () => {
      const result = getDaysToNextMilestone(0);
      expect(result).toEqual({ nextMilestone: 3, daysRemaining: 3 });
    });

    it('should return 4 days for streak 3 (next: 7)', () => {
      const result = getDaysToNextMilestone(3);
      expect(result).toEqual({ nextMilestone: 7, daysRemaining: 4 });
    });

    it('should return null for streak 100 (all achieved)', () => {
      expect(getDaysToNextMilestone(100)).toBeNull();
    });

    it('should return null for streak > 100', () => {
      expect(getDaysToNextMilestone(150)).toBeNull();
    });

    it('should handle streak 29 (1 day to 30)', () => {
      const result = getDaysToNextMilestone(29);
      expect(result).toEqual({ nextMilestone: 30, daysRemaining: 1 });
    });
  });

  describe('getNewlyEarnedReward', () => {
    it('should return reward when crossing milestone', () => {
      const reward = getNewlyEarnedReward(2, 3);
      expect(reward).not.toBeNull();
      expect(reward!.milestone).toBe(3);
    });

    it('should return null when no milestone crossed', () => {
      expect(getNewlyEarnedReward(4, 5)).toBeNull();
    });

    it('should return null when going backwards', () => {
      expect(getNewlyEarnedReward(5, 3)).toBeNull();
    });

    it('should detect milestone 100', () => {
      const reward = getNewlyEarnedReward(99, 100);
      expect(reward).not.toBeNull();
      expect(reward!.milestone).toBe(100);
    });

    it('should return first milestone when jumping over multiple', () => {
      // 0 -> 10 crosses milestone 3 and 7, should return 3 (first found)
      const reward = getNewlyEarnedReward(0, 10);
      expect(reward).not.toBeNull();
      expect(reward!.milestone).toBe(3);
    });
  });

  describe('getStreakLevel', () => {
    it('should return correct level for each range', () => {
      expect(getStreakLevel(0).icon).toBe('✨');
      expect(getStreakLevel(3).icon).toBe('🌟');
      expect(getStreakLevel(7).icon).toBe('⭐');
      expect(getStreakLevel(14).icon).toBe('🔮');
      expect(getStreakLevel(30).icon).toBe('🌙');
      expect(getStreakLevel(45).icon).toBe('🌌');
      expect(getStreakLevel(60).icon).toBe('🪐');
      expect(getStreakLevel(75).icon).toBe('🛡️');
      expect(getStreakLevel(90).icon).toBe('🌠');
      expect(getStreakLevel(100).icon).toBe('👑');
    });
  });

  describe('getMotivationMessage', () => {
    it('should mention "내일" when 1 day remaining', () => {
      const msg = getMotivationMessage(29);
      expect(msg).toContain('내일');
    });

    it('should return congrats for streak 100+', () => {
      const msg = getMotivationMessage(100);
      expect(msg).toContain('마일스톤');
    });
  });
});
