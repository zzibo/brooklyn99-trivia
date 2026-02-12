"use client";

import { useCallback, useMemo } from "react";
import { useLocalStorage } from "./use-local-storage";
import { createNewCard, reviewCard, isDue, Rating } from "@/lib/fsrs";
import { getAllQuestions } from "@/lib/questions";
import { STORAGE_KEYS } from "@/lib/constants";
import type { FSRSCardState, Question } from "@/lib/types";

export function useFSRSCards() {
  const [cards, setCards, isHydrated] = useLocalStorage<FSRSCardState[]>(
    STORAGE_KEYS.FSRS_CARDS,
    []
  );

  const allQuestions = useMemo(() => getAllQuestions(), []);

  const getOrCreateCard = useCallback(
    (questionId: number): FSRSCardState => {
      const existing = cards.find((c) => c.questionId === questionId);
      if (existing) return existing;
      return createNewCard(questionId);
    },
    [cards]
  );

  const getDueCards = useCallback((): FSRSCardState[] => {
    // Get all question IDs
    const questionIds = allQuestions.map((q) => q.id);

    // Create cards for questions that don't have one yet, then filter by due
    const allCards = questionIds.map((id) => getOrCreateCard(id));
    return allCards.filter(isDue);
  }, [allQuestions, getOrCreateCard]);

  const getNextDueQuestion = useCallback((): Question | null => {
    const dueCards = getDueCards();
    if (dueCards.length === 0) return null;

    // Sort: new cards first, then by due date
    dueCards.sort((a, b) => {
      if (a.state === 0 && b.state !== 0) return -1;
      if (a.state !== 0 && b.state === 0) return 1;
      return new Date(a.due).getTime() - new Date(b.due).getTime();
    });

    const nextCard = dueCards[0];
    return allQuestions.find((q) => q.id === nextCard.questionId) ?? null;
  }, [getDueCards, allQuestions]);

  const review = useCallback(
    (questionId: number, rating: Rating) => {
      const cardState = getOrCreateCard(questionId);
      const { nextState } = reviewCard(cardState, rating);

      setCards((prev) => {
        const filtered = prev.filter((c) => c.questionId !== questionId);
        return [...filtered, nextState];
      });

      return nextState;
    },
    [getOrCreateCard, setCards]
  );

  const getCardStats = useCallback(() => {
    const questionIds = allQuestions.map((q) => q.id);
    const allCards = questionIds.map((id) => getOrCreateCard(id));

    return {
      total: allCards.length,
      new: allCards.filter((c) => c.state === 0).length,
      learning: allCards.filter((c) => c.state === 1 || c.state === 3).length,
      review: allCards.filter((c) => c.state === 2).length,
      due: allCards.filter(isDue).length,
    };
  }, [allQuestions, getOrCreateCard]);

  return {
    cards,
    isHydrated,
    getDueCards,
    getNextDueQuestion,
    review,
    getCardStats,
    getOrCreateCard,
  };
}
