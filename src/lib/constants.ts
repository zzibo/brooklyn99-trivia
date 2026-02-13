export const PLAYER_DAMAGE_ON_WRONG: Record<number, number> = {
  1: 2, // easy question wrong = 2 HP lost (you should've known)
  2: 1, // medium wrong = 1 HP
  3: 1, // hard wrong = 1 HP (lighter punishment)
};

export const BOSS_DAMAGE_ON_CORRECT: Record<number, number> = {
  1: 1, // easy correct = 1 bar
  2: 1, // medium correct = 1 bar
  3: 2, // hard correct = 2 bars (big brain reward)
};

export const BOSS_ORDER = [
  "charles",
  "gina",
  "jake",
  "amy",
  "rosa",
  "holt",
] as const;

export const STORAGE_KEYS = {
  HIGHEST_BOSS: "b99-highest-boss",
} as const;
