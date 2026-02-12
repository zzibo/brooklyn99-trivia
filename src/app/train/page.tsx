"use client";

import { useEffect } from "react";
import { useTraining } from "@/hooks/use-training";
import { SceneBackground } from "@/components/pixel/scene-background";
import { TrainingHeader } from "@/components/training/training-header";
import { QuestionCard } from "@/components/training/question-card";
import { ResultReveal } from "@/components/training/result-reveal";
import { DifficultyRating } from "@/components/training/difficulty-rating";
import { NoCardsDue } from "@/components/training/no-cards-due";

export default function TrainPage() {
  const {
    state,
    background,
    isHydrated,
    loadNextQuestion,
    selectAnswer,
    showRating,
    rateAndNext,
    getCardStats,
  } = useTraining();

  // Load first question on mount
  useEffect(() => {
    if (isHydrated && !state.currentQuestion) {
      loadNextQuestion();
    }
  }, [isHydrated, state.currentQuestion, loadNextQuestion]);

  if (!isHydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="font-pixel animate-pulse text-sm text-muted-foreground">Loading...</p>
      </div>
    );
  }

  const cardStats = getCardStats();

  if (!state.currentQuestion) {
    return (
      <SceneBackground scene="bullpen">
        <NoCardsDue
          questionsReviewed={state.questionsReviewed}
          sessionCorrect={state.sessionCorrect}
        />
      </SceneBackground>
    );
  }

  const correctAnswer = state.currentQuestion.answers.find((a) => a.isCorrect);

  return (
    <SceneBackground scene={background}>
      <TrainingHeader
        questionsReviewed={state.questionsReviewed}
        sessionCorrect={state.sessionCorrect}
        dueCount={cardStats.due}
      />

      <main className="mx-auto max-w-2xl space-y-4 p-4 md:p-8">
        <QuestionCard
          question={state.currentQuestion}
          character={state.character}
          expression={state.expression}
          selectedAnswerId={state.selectedAnswerId}
          isRevealed={state.phase !== "question"}
          onSelectAnswer={selectAnswer}
        />

        {state.phase === "reveal" && correctAnswer && (
          <ResultReveal
            isCorrect={state.isCorrect ?? false}
            correctAnswer={correctAnswer.text}
            onContinue={showRating}
          />
        )}

        {state.phase === "rating" && <DifficultyRating onRate={rateAndNext} />}
      </main>
    </SceneBackground>
  );
}
