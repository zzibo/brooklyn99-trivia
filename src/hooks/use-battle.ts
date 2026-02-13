"use client";

import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import type {
  BattleState,
  Boss,
  Question,
  DialogTrigger,
  Expression,
} from "@/lib/types";
import {
  PLAYER_DAMAGE_ON_WRONG,
  BOSS_DAMAGE_ON_CORRECT,
  STORAGE_KEYS,
} from "@/lib/constants";
import { BOSSES } from "@/data/bosses";
import { getRandomQuestionsForBoss } from "@/lib/questions";

const QUESTIONS_PER_BOSS = 10;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Fisher-Yates shuffle -- returns a new shuffled copy of the array. */
function shuffleArray<T>(array: T[]): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/** Shuffle the answers within each question */
function shuffleQuestionAnswers(questions: Question[]): Question[] {
  return questions.map((question) => ({
    ...question,
    answers: shuffleArray(question.answers),
  }));
}

/**
 * Pick a random unused dialog line for a given trigger.
 * Tracks used lines so there are no repeats within a fight.
 * If every line for that trigger has already been used, the pool resets.
 */
function pickDialog(
  boss: Boss,
  trigger: DialogTrigger,
  usedDialog: Record<string, string[]>,
): { line: string; updatedUsed: Record<string, string[]> } {
  const pool = boss.dialog[trigger];
  const usedLines = usedDialog[trigger] ?? [];

  let available = pool.filter((l) => !usedLines.includes(l));

  // If all lines have been used, reset and pick from the full pool.
  if (available.length === 0) {
    available = [...pool];
    // We'll start a fresh tracking array for this trigger below.
  }

  const line = available[Math.floor(Math.random() * available.length)];

  // Build the updated used-dialog map.
  const resetNeeded = pool.length === usedLines.length;
  const updatedUsed: Record<string, string[]> = {
    ...usedDialog,
    [trigger]: resetNeeded ? [line] : [...usedLines, line],
  };

  return { line, updatedUsed };
}

// ---------------------------------------------------------------------------
// Save / Load helpers
// ---------------------------------------------------------------------------

interface SavedGame {
  battleState: BattleState;
  playerCharacterId: string | undefined;
  shuffledQuestions: Question[];
}

function saveGame(state: BattleState, playerCharacterId: string | undefined, questions: Question[]) {
  try {
    const data: SavedGame = { battleState: state, playerCharacterId, shuffledQuestions: questions };
    localStorage.setItem(STORAGE_KEYS.BATTLE_SAVE, JSON.stringify(data));
  } catch { /* localStorage unavailable */ }
}

function loadGame(playerCharacterId: string | undefined): SavedGame | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.BATTLE_SAVE);
    if (!raw) return null;
    const data: SavedGame = JSON.parse(raw);
    if (data.playerCharacterId !== playerCharacterId) return null;
    return data;
  } catch { return null; }
}

function clearSave() {
  try { localStorage.removeItem(STORAGE_KEYS.BATTLE_SAVE); } catch { /* localStorage unavailable */ }
}

// ---------------------------------------------------------------------------
// Initial state factory
// ---------------------------------------------------------------------------

function createInitialState(bossIndex: number, bossList: Boss[]): BattleState {
  const boss = bossList[bossIndex];
  return {
    currentBossIndex: bossIndex,
    currentQuestionIndex: 0,
    playerHp: boss.playerHp,
    playerMaxHp: boss.playerHp,
    bossHp: QUESTIONS_PER_BOSS,
    bossMaxHp: QUESTIONS_PER_BOSS,
    phase: "intro",
    selectedAnswerId: null,
    isCorrect: null,
    expression: "neutral" as Expression,
    currentDialog: "",
    usedDialog: {},
    questionsAnswered: 0,
    score: 0,
  };
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useBattle(playerCharacterId?: string) {
  // Filter out the player's character from the boss list
  const bossList = useMemo(() => {
    if (!playerCharacterId) return BOSSES;
    return BOSSES.filter((boss) => boss.id !== playerCharacterId);
  }, [playerCharacterId]);

  // Load save once on mount (ref avoids re-running on every render)
  const savedRef = useRef<SavedGame | null | undefined>(undefined);
  if (savedRef.current === undefined) {
    savedRef.current = loadGame(playerCharacterId);
  }
  const saved = savedRef.current;

  const [state, setState] = useState<BattleState>(
    () => saved?.battleState ?? createInitialState(0, bossList),
  );

  // Random subset of questions for the current boss
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>(
    () => saved?.shuffledQuestions ?? getRandomQuestionsForBoss(bossList[0].id, QUESTIONS_PER_BOSS),
  );

  // Derived values ---------------------------------------------------------

  const currentBoss: Boss = useMemo(
    () => bossList[state.currentBossIndex],
    [bossList, state.currentBossIndex],
  );

  const currentQuestion: Question = useMemo(
    () => shuffledQuestions[state.currentQuestionIndex] ?? shuffledQuestions[0],
    [shuffledQuestions, state.currentQuestionIndex],
  );

  // Auto-save --------------------------------------------------------------

  useEffect(() => {
    if (state.phase === "gameover" || state.phase === "victory") {
      clearSave();
      return;
    }
    saveGame(state, playerCharacterId, shuffledQuestions);
  }, [state, playerCharacterId, shuffledQuestions]);

  // Actions ----------------------------------------------------------------

  /** Reset the entire game back to boss 0. */
  const startGame = useCallback(() => {
    clearSave();
    const initial = createInitialState(0, bossList);
    const boss = bossList[0];
    const questions = shuffleQuestionAnswers(
      getRandomQuestionsForBoss(boss.id, QUESTIONS_PER_BOSS)
    );
    const { line, updatedUsed } = pickDialog(boss, "intro", {});

    setShuffledQuestions(questions);
    setState({
      ...initial,
      currentDialog: line,
      usedDialog: updatedUsed,
    });
  }, [bossList]);

  /** Transition from the intro screen into the first question. */
  const startBoss = useCallback(() => {
    setState((prev) => ({
      ...prev,
      phase: "question",
      expression: "neutral" as Expression,
    }));
  }, []);

  /** Handle a player selecting an answer. */
  const selectAnswer = useCallback(
    (answerId: number) => {
      setState((prev) => {
        const question =
          shuffledQuestions[prev.currentQuestionIndex] ?? shuffledQuestions[0];
        const answer = question.answers.find((a) => a.id === answerId);
        if (!answer) return prev;

        const correct = answer.isCorrect;
        let newPlayerHp = prev.playerHp;
        let newBossHp = prev.bossHp;
        let expression: Expression;

        if (correct) {
          newBossHp = Math.max(
            0,
            prev.bossHp - BOSS_DAMAGE_ON_CORRECT[question.difficulty],
          );
          expression = "happy";
        } else {
          newPlayerHp = Math.max(
            0,
            prev.playerHp - PLAYER_DAMAGE_ON_WRONG[question.difficulty],
          );
          expression = "sad";
        }

        // Choose dialog trigger with priority rules.
        const boss = bossList[prev.currentBossIndex];
        let trigger: DialogTrigger;

        if (!correct && newPlayerHp <= 1) {
          trigger = "player_low_hp";
        } else if (correct && newBossHp <= 2) {
          trigger = "boss_low_hp";
        } else {
          trigger = correct ? "correct" : "wrong";
        }

        const { line, updatedUsed } = pickDialog(
          boss,
          trigger,
          prev.usedDialog,
        );

        return {
          ...prev,
          playerHp: newPlayerHp,
          bossHp: newBossHp,
          phase: "reveal",
          selectedAnswerId: answerId,
          isCorrect: correct,
          expression,
          currentDialog: line,
          usedDialog: updatedUsed,
          questionsAnswered: prev.questionsAnswered + 1,
          score: correct ? prev.score + 1 : prev.score,
        };
      });
    },
    [shuffledQuestions],
  );

  /** Advance to the next question, or transition to end-of-fight phases. */
  const nextQuestion = useCallback(() => {
    setState((prev) => {
      const boss = bossList[prev.currentBossIndex];

      // Player KO
      if (prev.playerHp <= 0) {
        const { line, updatedUsed } = pickDialog(
          boss,
          "victory",
          prev.usedDialog,
        );
        return {
          ...prev,
          phase: "gameover",
          currentDialog: line,
          usedDialog: updatedUsed,
          expression: "happy" as Expression,
        };
      }

      // Boss KO
      if (prev.bossHp <= 0) {
        const { line, updatedUsed } = pickDialog(
          boss,
          "defeat",
          prev.usedDialog,
        );

        // Persist highest boss beaten to localStorage.
        try {
          const stored = localStorage.getItem(STORAGE_KEYS.HIGHEST_BOSS);
          const highestSoFar = stored ? parseInt(stored, 10) : -1;
          if (prev.currentBossIndex > highestSoFar) {
            localStorage.setItem(
              STORAGE_KEYS.HIGHEST_BOSS,
              String(prev.currentBossIndex),
            );
          }
        } catch {
          // localStorage may be unavailable (SSR, private browsing, etc.)
        }

        return {
          ...prev,
          phase: "boss_defeated",
          currentDialog: line,
          usedDialog: updatedUsed,
          expression: "sad" as Expression,
        };
      }

      // Normal: advance to next question.
      return {
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
        selectedAnswerId: null,
        isCorrect: null,
        phase: "question",
        expression: "neutral" as Expression,
      };
    });
  }, [bossList]);

  /** Advance to the next boss, or trigger overall victory. */
  const nextBoss = useCallback(() => {
    const nextIndex = state.currentBossIndex + 1;

    if (nextIndex >= bossList.length) {
      // All bosses beaten -- victory!
      setState((prev) => ({
        ...prev,
        phase: "victory",
      }));
      return;
    }

    // Set up for the next boss.
    const nextBossData = bossList[nextIndex];
    const questions = shuffleQuestionAnswers(
      getRandomQuestionsForBoss(nextBossData.id, QUESTIONS_PER_BOSS)
    );
    const initial = createInitialState(nextIndex, bossList);
    const { line, updatedUsed } = pickDialog(nextBossData, "intro", {});

    setShuffledQuestions(questions);
    setState((prev) => ({
      ...initial,
      score: prev.score,
      currentDialog: line,
      usedDialog: updatedUsed,
    }));
  }, [state.currentBossIndex, bossList]);

  return {
    state,
    currentBoss,
    currentQuestion,
    questions: shuffledQuestions,
    startGame,
    startBoss,
    selectAnswer,
    nextQuestion,
    nextBoss,
    bossList,
    clearSave,
    hasSave: saved !== null,
  };
}
