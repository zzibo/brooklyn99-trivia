# Score Tracking, State Persistence & Victory Screen

## Summary

Add score tracking, localStorage persistence for mid-fight resume, and improved game over / victory screens.

## 1. Score Tracking

- Add `score: number` field to `BattleState`, starting at 0.
- Increment by 1 on each correct answer in `selectAnswer`.
- Display score in the HUD during battle (optional, small counter).
- Pass score to game over and victory screens.

## 2. State Persistence (localStorage)

**Storage key:** `b99-battle-save`

**Saved data:**
- `battleState` — full `BattleState` (including score)
- `playerCharacterId` — which character the player chose
- `shuffledQuestions` — the current question set

**Save trigger:** `useEffect` in `useBattle` that writes to localStorage whenever `state` changes.

**Restore trigger:** On battle page mount, before calling `startGame()`, check for a saved game. If it exists and `playerCharacterId` matches, restore it. Otherwise discard and start fresh.

**Clear trigger:** On victory, game over, or navigation to `/select`.

## 3. Game Over Screen

Enhanced version of current `BattleDialog` gameover phase:

- "Game Over!" title
- Boss sprite (happy) + their victory dialog line
- Score: `"Score: 14"` in pixel font
- "Defeated by [Boss Name]" subtitle
- Row of small sprites: beaten bosses (sad) + boss that won (happy)
- "Try Again" button -> `/select` (clears save)

## 4. Victory Screen

Celebratory upgrade of current victory phase:

- "NINE NINE!" title in gold, large
- "You defeated all 5 bosses!" subtitle
- Final score prominently displayed
- All boss sprites in a row with sad expressions
- Fun B99 quote (random from pool: "Hot damn!", "Cool cool cool cool", "BINGPOT!", etc.)
- "Play Again" button -> `/select` (clears save)

## Files Changed

- `src/lib/types.ts` — add `score` to `BattleState`
- `src/lib/constants.ts` — add `BATTLE_SAVE` storage key
- `src/hooks/use-battle.ts` — score increment, save/restore logic
- `src/components/battle/battle-dialog.tsx` — enhanced game over + victory screens
- `src/app/battle/page.tsx` — restore logic on mount, pass score
