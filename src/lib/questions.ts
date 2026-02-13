import { QUESTIONS } from "@/data/questions";
import type { Question } from "./types";

export function getQuestionsForBoss(bossId: string): Question[] {
  return QUESTIONS.filter((q) => q.bossId === bossId);
}

export function getAllQuestions(): Question[] {
  return QUESTIONS;
}
