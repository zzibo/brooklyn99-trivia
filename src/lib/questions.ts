import { QUESTIONS } from "@/data/questions";
import type { Question } from "./types";

export function getQuestionsForBoss(bossId: string): Question[] {
  return QUESTIONS.filter((q) => q.bossId === bossId);
}

export function getRandomQuestionsForBoss(bossId: string, count: number): Question[] {
  const allQuestions = QUESTIONS.filter((q) => q.bossId === bossId);
  
  // Fisher-Yates shuffle
  const shuffled = [...allQuestions];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  return shuffled.slice(0, count);
}

export function getAllQuestions(): Question[] {
  return QUESTIONS;
}
