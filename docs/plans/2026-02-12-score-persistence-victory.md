# Score, Persistence & Victory Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add score tracking, localStorage mid-fight persistence, and polished game over / victory screens.

**Architecture:** Score is a field on BattleState, incremented on correct answers. Full battle state + questions are serialized to localStorage on every state change and restored on page load. Game over and victory screens are enhanced in the existing BattleDialog component.

**Tech Stack:** React hooks, localStorage, Next.js, Tailwind CSS

---

### Task 1: Add score to BattleState and constants

**Files:**
- Modify: `src/lib/types.ts:31-45`
- Modify: `src/lib/constants.ts:22-24`

**Step 1: Add score field to BattleState**

In `src/lib/types.ts`, add `score: number` to the `BattleState` interface:

```typescript
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
  score: number;
}
```

**Step 2: Add BATTLE_SAVE storage key**

In `src/lib/constants.ts`, add to `STORAGE_KEYS`:

```typescript
export const STORAGE_KEYS = {
  HIGHEST_BOSS: "b99-highest-boss",
  BATTLE_SAVE: "b99-battle-save",
} as const;
```

**Step 3: Verify build**

Run: `npm run build`
Expected: Build fails because `use-battle.ts` doesn't set `score` in `createInitialState`. That's fine — Task 2 fixes it.

**Step 4: Commit**

```bash
git add src/lib/types.ts src/lib/constants.ts
git commit -m "feat: add score field to BattleState and BATTLE_SAVE storage key"
```

---

### Task 2: Score tracking and state persistence in use-battle

**Files:**
- Modify: `src/hooks/use-battle.ts`

**Step 1: Add score: 0 to createInitialState**

In the `createInitialState` function, add `score: 0` to the returned object:

```typescript
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
```

**Step 2: Increment score on correct answer**

In the `selectAnswer` callback, inside the `if (correct)` block, after updating `newBossHp`, the return object should include `score: prev.score + 1` when correct:

Change the return in `selectAnswer` from:
```typescript
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
};
```

To:
```typescript
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
```

**Step 3: Preserve score across boss transitions**

In `nextBoss`, when creating state for the next boss, carry over the score. Change:

```typescript
setState({
  ...initial,
  currentDialog: line,
  usedDialog: updatedUsed,
});
```

To:
```typescript
setState((prev) => ({
  ...initial,
  score: prev.score,
  currentDialog: line,
  usedDialog: updatedUsed,
}));
```

**Step 4: Add save/restore/clear functions**

Add these imports at the top of `use-battle.ts`:
```typescript
import { useEffect } from "react";
```
(Add `useEffect` to the existing import from "react")

Add save/restore helpers after the `pickDialog` function:

```typescript
interface SavedGame {
  battleState: BattleState;
  playerCharacterId: string | undefined;
  shuffledQuestions: Question[];
}

function saveGame(
  state: BattleState,
  playerCharacterId: string | undefined,
  questions: Question[],
) {
  try {
    const data: SavedGame = {
      battleState: state,
      playerCharacterId,
      shuffledQuestions: questions,
    };
    localStorage.setItem(STORAGE_KEYS.BATTLE_SAVE, JSON.stringify(data));
  } catch {
    // localStorage unavailable
  }
}

function loadGame(playerCharacterId: string | undefined): SavedGame | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.BATTLE_SAVE);
    if (!raw) return null;
    const data: SavedGame = JSON.parse(raw);
    if (data.playerCharacterId !== playerCharacterId) return null;
    return data;
  } catch {
    return null;
  }
}

function clearSave() {
  try {
    localStorage.removeItem(STORAGE_KEYS.BATTLE_SAVE);
  } catch {
    // localStorage unavailable
  }
}
```

**Step 5: Use save/restore in the hook**

In `useBattle`, update initial state to try restoring from save:

```typescript
export function useBattle(playerCharacterId?: string) {
  const bossList = useMemo(() => {
    if (!playerCharacterId) return BOSSES;
    return BOSSES.filter((boss) => boss.id !== playerCharacterId);
  }, [playerCharacterId]);

  const saved = useMemo(() => loadGame(playerCharacterId), [playerCharacterId]);

  const [state, setState] = useState<BattleState>(
    () => saved?.battleState ?? createInitialState(0, bossList),
  );

  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>(
    () => saved?.shuffledQuestions ?? getRandomQuestionsForBoss(bossList[0].id, QUESTIONS_PER_BOSS),
  );
```

Add auto-save effect inside `useBattle`, after the derived values:

```typescript
  // Auto-save to localStorage on every state change
  useEffect(() => {
    // Don't save terminal states — they'll be cleared
    if (state.phase === "gameover" || state.phase === "victory") {
      clearSave();
      return;
    }
    saveGame(state, playerCharacterId, shuffledQuestions);
  }, [state, playerCharacterId, shuffledQuestions]);
```

In `startGame`, also clear save so fresh start works:

```typescript
const startGame = useCallback(() => {
  clearSave();
  const initial = createInitialState(0, bossList);
  // ... rest unchanged
}, [bossList]);
```

**Step 6: Export clearSave for use by other components**

Add `clearSave` to the return value of `useBattle`:

```typescript
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
};
```

**Step 7: Verify build**

Run: `npm run build`
Expected: PASS

**Step 8: Commit**

```bash
git add src/hooks/use-battle.ts
git commit -m "feat: add score tracking and localStorage persistence"
```

---

### Task 3: Enhanced Game Over screen

**Files:**
- Modify: `src/components/battle/battle-dialog.tsx`

**Step 1: Add score and defeatedBossIndexes to BattleDialogProps**

Update the interface:

```typescript
interface BattleDialogProps {
  phase: BattlePhase;
  boss: Boss;
  expression: Expression;
  dialog: string;
  score: number;
  currentBossIndex: number;
  onStartBoss: () => void;
  onNextBoss: () => void;
  onStartGame: () => void;
  totalBosses?: number;
  defeatedBosses?: Boss[];
}
```

**Step 2: Update the gameover section**

Replace the existing gameover block (the `{phase === "gameover" && ...}` section) with:

```tsx
{phase === "gameover" && (
  <>
    <p className="font-pixel text-[10px] text-muted-foreground">
      Defeated by {boss.name}
    </p>
    <p className="font-pixel text-[10px] leading-relaxed">&ldquo;{dialog}&rdquo;</p>
    <div className="font-pixel text-lg text-accent">
      Score: {score}
    </div>
    {currentBossIndex > 0 && (
      <div className="flex flex-wrap justify-center gap-2">
        {defeatedBosses.slice(0, currentBossIndex).map((b) => (
          <div key={b.id} className="bg-white rounded-lg p-1">
            <CharacterSprite characterId={b.id} expression="sad" size="sm" />
          </div>
        ))}
      </div>
    )}
    <Link href="/select">
      <PixelButton size="lg" variant="danger">
        Try Again
      </PixelButton>
    </Link>
  </>
)}
```

**Step 3: Verify build**

Run: `npm run build`
Expected: Build fails because battle page doesn't pass `score` and `currentBossIndex` yet. That's fine — Task 5 wires it up.

**Step 4: Commit**

```bash
git add src/components/battle/battle-dialog.tsx
git commit -m "feat: enhanced game over screen with score and defeated-by info"
```

---

### Task 4: Enhanced Victory screen

**Files:**
- Modify: `src/components/battle/battle-dialog.tsx`

**Step 1: Update the victory section**

Replace the existing victory block with:

```tsx
{phase === "victory" ? (
  <>
    <h2 className="font-pixel text-base text-accent md:text-lg">
      NINE NINE!
    </h2>
    <p className="font-pixel text-[10px] leading-relaxed">
      You defeated all {totalBosses} {totalBosses === 1 ? "boss" : "bosses"}!
    </p>
    <div className="font-pixel text-lg text-accent">
      Final Score: {score}
    </div>
    <div className="flex flex-wrap justify-center gap-2">
      {defeatedBosses.map((b) => (
        <div key={b.id} className="bg-white rounded-lg p-1">
          <CharacterSprite
            characterId={b.id}
            expression="sad"
            size="sm"
          />
        </div>
      ))}
    </div>
    <p className="font-pixel text-[10px] text-muted-foreground italic">
      &ldquo;{VICTORY_QUOTES[Math.floor(Math.random() * VICTORY_QUOTES.length)]}&rdquo;
    </p>
    <Link href="/select">
      <PixelButton size="lg">Play Again</PixelButton>
    </Link>
  </>
)
```

**Step 2: Add VICTORY_QUOTES constant**

At the top of the file, after imports:

```typescript
const VICTORY_QUOTES = [
  "Hot damn!",
  "Cool cool cool cool cool!",
  "BINGPOT!",
  "NINE NINE!",
  "Title of your sex tape!",
  "Noice. Smort.",
  "Terry loves a winner!",
];
```

**Step 3: Commit**

```bash
git add src/components/battle/battle-dialog.tsx
git commit -m "feat: celebratory victory screen with score and B99 quotes"
```

---

### Task 5: Wire everything up in battle page

**Files:**
- Modify: `src/app/battle/page.tsx`

**Step 1: Pass score and currentBossIndex to BattleDialog**

In the `<BattleDialog>` component call, add the new props:

```tsx
<BattleDialog
  phase={state.phase}
  boss={currentBoss}
  expression={state.expression}
  dialog={state.currentDialog}
  score={state.score}
  currentBossIndex={state.currentBossIndex}
  onStartBoss={startBoss}
  onNextBoss={nextBoss}
  onStartGame={startGame}
  totalBosses={bossList.length}
  defeatedBosses={bossList}
/>
```

**Step 2: Remove the startGame() call on mount if save was restored**

The current `useEffect(() => { startGame(); }, [startGame])` always resets the game. Since `useBattle` now restores from localStorage on init, we should only call `startGame()` if there's no save. But actually, since `useBattle` already initializes from save in `useState`, and `startGame` is only called for fresh starts, we need to guard it:

Replace:
```typescript
useEffect(() => {
  startGame();
}, [startGame]);
```

With:
```typescript
const hasRestoredRef = useRef(false);
useEffect(() => {
  // Don't call startGame if we restored from a save
  if (hasRestoredRef.current) return;
  hasRestoredRef.current = true;

  // Check if useBattle already loaded from save (phase won't be "intro" with empty dialog)
  if (state.phase !== "intro" || state.currentDialog !== "") return;
  startGame();
}, [startGame, state.phase, state.currentDialog]);
```

Wait — that's fragile. Simpler: expose a `hasSave` boolean from `useBattle` and use it:

Back in `src/hooks/use-battle.ts`, update the return:
```typescript
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
```

Then in `src/app/battle/page.tsx`:
```typescript
const {
  state,
  currentBoss,
  currentQuestion,
  questions,
  startGame,
  startBoss,
  selectAnswer,
  nextQuestion,
  nextBoss,
  bossList,
  hasSave,
} = useBattle(playerCharacter || undefined);

// ...

useEffect(() => {
  if (!hasSave) {
    startGame();
  }
}, [hasSave, startGame]);
```

**Step 3: Verify build**

Run: `npm run build`
Expected: PASS

**Step 4: Manual verification**

1. Select a character, start a battle, answer a few questions
2. Refresh the page — should resume from exactly where you left off
3. Beat a boss, move to next — refresh again — should resume at the new boss
4. Lose — game over screen shows score and "Defeated by [Boss]"
5. Go back to select, start new game — old save is gone
6. Beat all bosses — victory screen shows "NINE NINE!", final score, all sad bosses, B99 quote

**Step 5: Commit**

```bash
git add src/app/battle/page.tsx src/hooks/use-battle.ts
git commit -m "feat: wire up score display and save restoration in battle page"
```
