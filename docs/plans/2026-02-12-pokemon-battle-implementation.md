# Pokemon Battle Redesign — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the FSRS trivia trainer with a Pokemon battle-style gauntlet — 6 B99 character bosses, 48 hard questions, difficulty-based damage, deep personality dialog.

**Architecture:** Pure client-side React state machine. No localStorage for game state (except highest boss beaten). Static question/dialog data inlined in TypeScript files. No database needed at runtime. Existing pixel UI components reused, battle-specific components built on top.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, shadcn/ui primitives

---

### Task 1: Delete FSRS and old training system

Remove all spaced repetition code, the stats page, old training components, old hooks, and the ts-fsrs dependency.

**Files:**
- Delete: `src/lib/fsrs.ts`
- Delete: `src/hooks/use-fsrs-cards.ts`
- Delete: `src/hooks/use-stats.ts`
- Delete: `src/hooks/use-training.ts`
- Delete: `src/hooks/use-local-storage.ts`
- Delete: `src/app/stats/page.tsx`
- Delete: `src/app/train/page.tsx`
- Delete: `src/components/training/difficulty-rating.tsx`
- Delete: `src/components/training/no-cards-due.tsx`
- Delete: `src/components/training/question-card.tsx`
- Delete: `src/components/training/result-reveal.tsx`
- Delete: `src/components/training/training-header.tsx`
- Delete: `src/lib/categories.ts`

**Step 1: Delete files**

```bash
rm src/lib/fsrs.ts \
   src/hooks/use-fsrs-cards.ts \
   src/hooks/use-stats.ts \
   src/hooks/use-training.ts \
   src/hooks/use-local-storage.ts \
   src/app/stats/page.tsx \
   src/app/train/page.tsx \
   src/components/training/difficulty-rating.tsx \
   src/components/training/no-cards-due.tsx \
   src/components/training/question-card.tsx \
   src/components/training/result-reveal.tsx \
   src/components/training/training-header.tsx \
   src/lib/categories.ts
rmdir src/components/training src/app/stats src/app/train
```

**Step 2: Uninstall ts-fsrs**

```bash
npm uninstall ts-fsrs
```

**Step 3: Commit**

```bash
git add -A
git commit -m "Remove FSRS, old training system, and stats page"
```

---

### Task 2: New types, constants, and boss config

Replace old types with battle-oriented types. Define all 6 bosses with their config (HP, background, personality). Define damage tables.

**Files:**
- Rewrite: `src/lib/types.ts`
- Rewrite: `src/lib/constants.ts`

**Step 1: Rewrite `src/lib/types.ts`**

```typescript
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
```

**Step 2: Rewrite `src/lib/constants.ts`**

```typescript
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
```

**Step 3: Commit**

```bash
git add src/lib/types.ts src/lib/constants.ts
git commit -m "Add battle types, damage tables, and boss config"
```

---

### Task 3: Boss data with dialog pools

Create the full boss definitions with all dialog lines from the design doc. Each boss has: id, name, title, color, playerHp, background, and dialog (5+ lines per trigger, 7 triggers).

**Files:**
- Create: `src/data/bosses.ts`

**Step 1: Create `src/data/bosses.ts`**

This file exports a `BOSSES` array of all 6 Boss objects with their full dialog pools, exactly matching the design doc. Each boss has dialog for: intro, correct, wrong, player_low_hp, boss_low_hp, defeat, victory.

Boss order: Charles (3 HP, nikolajs-house), Gina (4 HP, bullpen), Jake (5 HP, shaws-bar), Amy (6 HP, evidence-room), Rosa (7 HP, interrogation-room), Holt (8 HP, holts-office).

All dialog lines come directly from the design doc `docs/plans/2026-02-12-pokemon-battle-redesign.md`.

**Step 2: Commit**

```bash
git add src/data/bosses.ts
git commit -m "Add 6 boss definitions with full dialog pools"
```

---

### Task 4: Curate 48 hard questions (8 per boss)

Write 48 new hard trivia questions, 8 per boss. Each question has difficulty 1-3. Mix per boss: ~3 level-1, ~3 level-2, ~2 level-3. Questions should be thematically relevant to the boss character. Replace the old generated JSON system with a single inline TypeScript file.

**Files:**
- Create: `src/data/questions.ts`
- Delete: `generated/questions.json` (no longer needed)
- Delete: `generated/characters.json`
- Delete: `generated/categories.json`
- Delete: `data/questions/general.ts`
- Delete: `data/questions/characters.ts`
- Delete: `data/questions/quotes.ts`
- Delete: `data/questions/episodes.ts`
- Delete: `data/questions/running-gags.ts`
- Delete: `data/questions/relationships.ts`
- Delete: `data/seed.ts`
- Delete: `data/export.ts`
- Modify: `src/lib/questions.ts` — simplify to import from `src/data/questions.ts`

**Step 1: Create `src/data/questions.ts`**

Export `QUESTIONS: Question[]` with 48 questions. Each question has: id (1-48), bossId (matching boss.id), question text, difficulty (1|2|3), and 4 answers (one correct). Questions should test deep B99 knowledge. Assign by character theme:
- Charles: food references, Nikolaj, his relationships, his personality
- Gina: social media, dance, her self-importance, her relationships
- Jake: Die Hard, cases, his personal life, catchphrases
- Amy: organization, her competitiveness, binders, her career
- Rosa: her secrets, toughness, personal life, skills
- Holt: Kevin, Cheddar, Wuntch, his stoicism, his career

**Step 2: Delete old data files**

```bash
rm -rf generated/ data/questions/ data/seed.ts data/export.ts
```

**Step 3: Simplify `src/lib/questions.ts`**

```typescript
import { QUESTIONS } from "@/data/questions";
import type { Question } from "./types";

export function getQuestionsForBoss(bossId: string): Question[] {
  return QUESTIONS.filter((q) => q.bossId === bossId);
}

export function getAllQuestions(): Question[] {
  return QUESTIONS;
}
```

**Step 4: Commit**

```bash
git add -A
git commit -m "Replace 149 questions with 48 curated hard questions"
```

---

### Task 5: Battle state machine hook

The core game logic. Manages: boss progression, HP for both sides, damage calculation, dialog selection (no repeats), phase transitions, game over / victory detection.

**Files:**
- Create: `src/hooks/use-battle.ts`

**Step 1: Create `src/hooks/use-battle.ts`**

The hook exports:
- `state: BattleState`
- `currentBoss: Boss`
- `currentQuestion: Question`
- `startGame(): void` — resets to boss 0, full HP
- `selectAnswer(answerId: number): void` — handles damage, dialog, phase transition to "reveal"
- `nextQuestion(): void` — advances to next question or triggers boss_defeated/gameover/victory
- `getDialog(trigger: DialogTrigger): string` — picks random unused line, tracks used lines

Key logic:
- On correct answer: boss takes `BOSS_DAMAGE_ON_CORRECT[difficulty]` damage. If bossHp <= 0, phase = "boss_defeated".
- On wrong answer: player takes `PLAYER_DAMAGE_ON_WRONG[difficulty]` damage. If playerHp <= 0, phase = "gameover".
- On boss defeated + nextQuestion: advance to next boss. If last boss beaten, phase = "victory".
- Dialog priority: if playerHp === 1 after damage, use "player_low_hp". If bossHp <= 2 after damage, use "boss_low_hp". Otherwise use "correct"/"wrong".
- Shuffle questions per boss on entry so order varies each playthrough.

**Step 2: Commit**

```bash
git add src/hooks/use-battle.ts
git commit -m "Add battle state machine hook with damage and dialog"
```

---

### Task 6: Battle UI components

Build the Pokemon-style battle screen components. Reuse existing pixel primitives (pixel-border, pixel-button, health-bar, character-sprite, speech-bubble, scene-background).

**Files:**
- Create: `src/components/battle/battle-hud.tsx` — top area: boss name, boss HP bar, boss sprite + dialog bubble
- Create: `src/components/battle/player-hud.tsx` — bottom area: player HP hearts, question counter
- Create: `src/components/battle/move-grid.tsx` — 2x2 answer grid (Pokemon move select style)
- Create: `src/components/battle/battle-dialog.tsx` — full-screen dialog overlay for intro/defeat/victory/gameover phases
- Modify: `src/components/pixel/answer-option.tsx` — adapt for 2x2 grid layout (make it work as a square tile)

**Step 1: Create `src/components/battle/battle-hud.tsx`**

Shows boss name + title, boss HP bar (using existing HealthBar component with "green" color), boss character sprite (using CharacterSprite), and a speech bubble with the current dialog line.

**Step 2: Create `src/components/battle/player-hud.tsx`**

Shows player HP as pixel hearts (filled = HP remaining, empty = HP lost). Shows "Q 3/8" question counter. Uses font-pixel for text.

**Step 3: Create `src/components/battle/move-grid.tsx`**

2x2 grid of answer buttons. Each button is a pixel-border box. On reveal: correct answer glows green with bounce animation, wrong selected answer glows red with shake. Shows question text above the grid in a pixel-border text box (like Pokemon's "What will TRAINER do?"). Disabled after selection.

**Step 4: Create `src/components/battle/battle-dialog.tsx`**

Full-screen overlay for non-question phases. Shows:
- **intro**: Boss sprite large + intro dialog + "Fight!" button
- **boss_defeated**: Boss sprite sad + defeat dialog + "Next Boss" button
- **gameover**: Boss sprite happy + victory dialog + "Try Again" button (restarts from boss 1)
- **victory**: All 6 boss sprites + congratulations + "Play Again" button

**Step 5: Commit**

```bash
git add src/components/battle/
git commit -m "Add Pokemon-style battle UI components"
```

---

### Task 7: Battle page and landing page

Wire everything together. Create the `/battle` page. Simplify the landing page to remove FSRS/stats references.

**Files:**
- Create: `src/app/battle/page.tsx`
- Rewrite: `src/app/page.tsx`

**Step 1: Create `src/app/battle/page.tsx`**

Uses `useBattle()` hook. Renders `SceneBackground` with current boss's background. Layout:
- Top: `BattleHud` (boss info + dialog)
- Divider line
- Bottom: `PlayerHud` + `MoveGrid` (question + answers)
- Overlay: `BattleDialog` when phase is intro/boss_defeated/gameover/victory

On mount, calls `startGame()`.

**Step 2: Rewrite `src/app/page.tsx`**

Simple landing page:
- Title "Brooklyn Nine-Nine Trivia Battle"
- 6 boss character sprites in a row
- Speech bubble from Jake: battle-themed intro text
- Big "Start Battle" button linking to `/battle`
- No FSRS references, no stats, no categories

**Step 3: Commit**

```bash
git add src/app/battle/page.tsx src/app/page.tsx
git commit -m "Add battle page and simplify landing page"
```

---

### Task 8: Clean up dead code and unused dependencies

Remove any remaining references to old systems. Clean up unused files. Update package.json scripts.

**Files:**
- Delete: `src/db/schema.ts` (no longer needed at runtime)
- Delete: `src/db/index.ts`
- Delete: `src/lib/characters.ts` (character data now lives in bosses.ts)
- Modify: `package.json` — remove db:seed, db:export, db:reset scripts; remove better-sqlite3, drizzle-orm from dependencies; remove drizzle-kit, @types/better-sqlite3 from devDependencies
- Delete: `drizzle.config.ts`

**Step 1: Delete dead files**

```bash
rm -rf src/db/ src/lib/characters.ts drizzle.config.ts
```

**Step 2: Uninstall unused packages**

```bash
npm uninstall better-sqlite3 drizzle-orm drizzle-kit @types/better-sqlite3
```

**Step 3: Update package.json scripts**

Remove `db:seed`, `db:export`, `db:reset` scripts. Change `build` from `npm run db:export && next build` to just `next build`.

**Step 4: Verify dev server starts**

```bash
npm run dev
```

Hit `http://localhost:3000` and `http://localhost:3000/battle` — both should return 200 with no compilation errors.

**Step 5: Commit**

```bash
git add -A
git commit -m "Remove database layer and unused dependencies"
```

---

### Task 9: End-to-end verification

Test the full battle flow manually. Fix any bugs found.

**Step 1: Start dev server and test**

```bash
npm run dev
```

Test flow:
1. `/` — landing page loads, shows 6 character sprites, "Start Battle" button
2. Click "Start Battle" → `/battle` loads
3. Boss 1 (Charles) intro dialog shows, "Fight!" button
4. Click Fight → question appears in move grid, boss HP bar shows
5. Select correct answer → boss HP drains, character goes happy/sad, dialog fires
6. Select wrong answer → player HP drains, appropriate dialog
7. Beat boss 1 → boss_defeated screen with defeat dialog
8. Click "Next Boss" → boss 2 (Gina) starts with higher player HP
9. Lose all HP → game over screen, "Try Again" restarts from boss 1
10. Beat all 6 → victory screen

**Step 2: Fix any issues found**

**Step 3: Final commit and push**

```bash
git add -A
git commit -m "Pokemon battle redesign complete — 6 bosses, 48 questions, full dialog"
git push origin master
```
