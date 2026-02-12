"use client";

import { useState, useCallback } from "react";
import { useFSRSCards } from "./use-fsrs-cards";
import { useStats } from "./use-stats";
import { getCharacterById } from "@/lib/characters";
import { Rating } from "@/lib/fsrs";
import type { TrainingState, Expression, Question, Character } from "@/lib/types";

const BACKGROUNDS = [
  "bullpen",
  "holts-office",
  "shaws-bar",
  "evidence-room",
  "interrogation-room",
  "nikolajs-house",
];

function randomBackground(): string {
  return BACKGROUNDS[Math.floor(Math.random() * BACKGROUNDS.length)];
}

const initialState: TrainingState = {
  phase: "question",
  currentQuestion: null,
  selectedAnswerId: null,
  isCorrect: null,
  character: null,
  expression: "neutral",
  questionsReviewed: 0,
  sessionCorrect: 0,
};

export function useTraining() {
  const [state, setState] = useState<TrainingState>(initialState);
  const [background, setBackground] = useState(randomBackground);
  const { getNextDueQuestion, review, getCardStats, isHydrated } = useFSRSCards();
  const { recordReview } = useStats();

  const loadNextQuestion = useCallback(() => {
    const question = getNextDueQuestion();
    if (!question) {
      setState((prev) => ({ ...prev, currentQuestion: null, phase: "question" }));
      return;
    }

    const character = getCharacterById(question.characterId) ?? null;
    setBackground(randomBackground());
    setState((prev) => ({
      ...prev,
      phase: "question",
      currentQuestion: question,
      selectedAnswerId: null,
      isCorrect: null,
      character,
      expression: "neutral",
    }));
  }, [getNextDueQuestion]);

  const selectAnswer = useCallback(
    (answerId: number) => {
      if (state.phase !== "question" || !state.currentQuestion) return;

      const answer = state.currentQuestion.answers.find((a) => a.id === answerId);
      if (!answer) return;

      const isCorrect = answer.isCorrect;
      recordReview(isCorrect);

      setState((prev) => ({
        ...prev,
        phase: "reveal",
        selectedAnswerId: answerId,
        isCorrect,
        expression: isCorrect ? "happy" : "sad",
      }));
    },
    [state.phase, state.currentQuestion, recordReview]
  );

  const showRating = useCallback(() => {
    setState((prev) => ({ ...prev, phase: "rating" }));
  }, []);

  const rateAndNext = useCallback(
    (rating: Rating) => {
      if (!state.currentQuestion) return;
      review(state.currentQuestion.id, rating);

      setState((prev) => ({
        ...prev,
        questionsReviewed: prev.questionsReviewed + 1,
        sessionCorrect: prev.sessionCorrect + (prev.isCorrect ? 1 : 0),
      }));

      loadNextQuestion();
    },
    [state.currentQuestion, review, loadNextQuestion]
  );

  return {
    state,
    background,
    isHydrated,
    loadNextQuestion,
    selectAnswer,
    showRating,
    rateAndNext,
    getCardStats,
  };
}
