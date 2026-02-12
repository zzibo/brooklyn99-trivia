import questionsData from "../../generated/questions.json";
import type { Question } from "./types";

const questions: Question[] = questionsData as Question[];

export function getAllQuestions(): Question[] {
  return questions;
}

export function getQuestionById(id: number): Question | undefined {
  return questions.find((q) => q.id === id);
}

export function getQuestionsByCategory(categoryId: string): Question[] {
  return questions.filter((q) => q.categoryId === categoryId);
}

export function getQuestionsByCharacter(characterId: string): Question[] {
  return questions.filter((q) => q.characterId === characterId);
}

export function getQuestionsByDifficulty(difficulty: number): Question[] {
  return questions.filter((q) => q.difficulty === difficulty);
}
