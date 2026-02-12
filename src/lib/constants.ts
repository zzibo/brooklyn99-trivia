export const STORAGE_KEYS = {
  FSRS_CARDS: "b99-fsrs-cards",
  USER_STATS: "b99-user-stats",
} as const;

export const RANKS = [
  { name: "Beat Cop", minMastered: 0 },
  { name: "Patrol Officer", minMastered: 10 },
  { name: "Detective", minMastered: 30 },
  { name: "Sergeant", minMastered: 60 },
  { name: "Lieutenant", minMastered: 90 },
  { name: "Captain", minMastered: 120 },
  { name: "Commissioner", minMastered: 150 },
] as const;

export const DEFAULT_STATS = {
  totalReviews: 0,
  correctAnswers: 0,
  streak: 0,
  longestStreak: 0,
  reviewsByDate: {},
  categoryProgress: {},
} as const;

export const CHARACTERS = [
  "jake",
  "amy",
  "rosa",
  "terry",
  "charles",
  "gina",
  "holt",
  "hitchcock",
  "scully",
  "doug-judy",
  "vulture",
  "wuntch",
] as const;

export const EXPRESSIONS = ["neutral", "happy", "sad"] as const;

export const BACKGROUNDS = [
  "bullpen",
  "holts-office",
  "shaws-bar",
  "evidence-room",
  "interrogation-room",
  "nikolajs-house",
] as const;
