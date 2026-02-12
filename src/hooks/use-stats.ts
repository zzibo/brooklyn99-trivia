"use client";

import { useCallback } from "react";
import { useLocalStorage } from "./use-local-storage";
import { STORAGE_KEYS, DEFAULT_STATS, RANKS } from "@/lib/constants";
import type { UserStats } from "@/lib/types";

export function useStats() {
  const [stats, setStats, isHydrated] = useLocalStorage<UserStats>(
    STORAGE_KEYS.USER_STATS,
    { ...DEFAULT_STATS }
  );

  const recordReview = useCallback(
    (correct: boolean) => {
      setStats((prev) => {
        const today = new Date().toISOString().split("T")[0];
        const lastReviewDate = prev.lastReviewDate;
        const isConsecutiveDay =
          lastReviewDate &&
          new Date(today).getTime() - new Date(lastReviewDate).getTime() <= 86400000;

        const newStreak = isConsecutiveDay || !lastReviewDate ? prev.streak + (correct ? 1 : 0) : correct ? 1 : 0;

        return {
          ...prev,
          totalReviews: prev.totalReviews + 1,
          correctAnswers: prev.correctAnswers + (correct ? 1 : 0),
          streak: correct ? newStreak : 0,
          longestStreak: Math.max(prev.longestStreak, correct ? newStreak : prev.streak),
          lastReviewDate: today,
          reviewsByDate: {
            ...prev.reviewsByDate,
            [today]: (prev.reviewsByDate[today] || 0) + 1,
          },
        };
      });
    },
    [setStats]
  );

  const getRank = useCallback(() => {
    const mastered = stats.correctAnswers;
    let currentRank = RANKS[0];
    for (const rank of RANKS) {
      if (mastered >= rank.minMastered) {
        currentRank = rank;
      }
    }
    const nextRank = RANKS[RANKS.indexOf(currentRank) + 1];
    return {
      current: currentRank,
      next: nextRank,
      progress: nextRank
        ? ((mastered - currentRank.minMastered) / (nextRank.minMastered - currentRank.minMastered)) * 100
        : 100,
    };
  }, [stats.correctAnswers]);

  const getAccuracy = useCallback(() => {
    if (stats.totalReviews === 0) return 0;
    return Math.round((stats.correctAnswers / stats.totalReviews) * 100);
  }, [stats.totalReviews, stats.correctAnswers]);

  const resetStats = useCallback(() => {
    setStats({ ...DEFAULT_STATS });
  }, [setStats]);

  return {
    stats,
    isHydrated,
    recordReview,
    getRank,
    getAccuracy,
    resetStats,
  };
}
