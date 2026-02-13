export interface Answer {
  id: number;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: number;
  bossId: string;
  question: string;
  difficulty: 1 | 2 | 3;
  answers: Answer[];
}

export type Expression = "neutral" | "happy" | "sad";

export type BattlePhase = "intro" | "question" | "reveal" | "boss_defeated" | "gameover" | "victory";

export type DialogTrigger = "intro" | "correct" | "wrong" | "player_low_hp" | "boss_low_hp" | "defeat" | "victory";

export interface Boss {
  id: string;
  name: string;
  title: string;
  color: string;
  playerHp: number;
  background: string;
  dialog: Record<DialogTrigger, string[]>;
}

export interface BattleState {
  currentBossIndex: number;
  currentQuestionIndex: number;
  playerHp: number;
  playerMaxHp: number;
  bossHp: number;
  bossMaxHp: number;
  phase: BattlePhase;
  selectedAnswerId: number | null;
  isCorrect: boolean | null;
  expression: Expression;
  currentDialog: string;
  usedDialog: Record<string, string[]>;
  questionsAnswered: number;
}
