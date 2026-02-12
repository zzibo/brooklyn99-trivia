import type { Rating } from "ts-fsrs";

export interface Character {
  id: string;
  name: string;
  title: string;
  color: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface Answer {
  id: number;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: number;
  categoryId: string;
  characterId: string;
  question: string;
  difficulty: number;
  answers: Answer[];
}

// FSRS card state stored in localStorage
export interface FSRSCardState {
  questionId: number;
  due: string; // ISO date string
  stability: number;
  difficulty: number;
  elapsed_days: number;
  scheduled_days: number;
  reps: number;
  lapses: number;
  state: number; // State enum from ts-fsrs (0=New, 1=Learning, 2=Review, 3=Relearning)
  last_review?: string; // ISO date string
}

export interface UserStats {
  totalReviews: number;
  correctAnswers: number;
  streak: number;
  longestStreak: number;
  lastReviewDate?: string;
  reviewsByDate: Record<string, number>; // "YYYY-MM-DD" -> count
  categoryProgress: Record<string, CategoryProgress>;
}

export interface CategoryProgress {
  total: number;
  mastered: number; // state >= 2 (Review)
  learning: number; // state 1 (Learning)
  new: number; // state 0 (New)
}

export type Expression = "neutral" | "happy" | "sad";

export type TrainingPhase = "question" | "reveal" | "rating";

export interface TrainingState {
  phase: TrainingPhase;
  currentQuestion: Question | null;
  selectedAnswerId: number | null;
  isCorrect: boolean | null;
  character: Character | null;
  expression: Expression;
  questionsReviewed: number;
  sessionCorrect: number;
}

export { Rating };
