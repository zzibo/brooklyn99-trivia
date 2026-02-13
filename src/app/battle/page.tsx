"use client";

import { useEffect } from "react";
import { SceneBackground } from "@/components/pixel/scene-background";
import { BattleHud } from "@/components/battle/battle-hud";
import { PlayerHud } from "@/components/battle/player-hud";
import { MoveGrid } from "@/components/battle/move-grid";
import { BattleDialog } from "@/components/battle/battle-dialog";
import { PixelButton } from "@/components/pixel/pixel-button";
import { useBattle } from "@/hooks/use-battle";

export default function BattlePage() {
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
  } = useBattle();

  useEffect(() => {
    startGame();
  }, [startGame]);

  const isRevealed = state.phase === "reveal";
  const showOverlay = ["intro", "boss_defeated", "gameover", "victory"].includes(state.phase);

  return (
    <SceneBackground scene={currentBoss.background}>
      <div className="mx-auto flex min-h-screen max-w-2xl flex-col">
        {/* Boss area */}
        <BattleHud
          boss={currentBoss}
          bossHp={state.bossHp}
          bossMaxHp={state.bossMaxHp}
          expression={state.expression}
          dialog={state.currentDialog}
        />

        {/* Divider */}
        <div className="mx-4 border-t-2 border-dashed border-border/50" />

        {/* Player area */}
        <PlayerHud
          playerHp={state.playerHp}
          playerMaxHp={state.playerMaxHp}
          questionIndex={state.currentQuestionIndex}
          totalQuestions={questions.length}
        />

        {/* Move grid (question + answers) */}
        {state.phase === "question" || state.phase === "reveal" ? (
          <>
            <MoveGrid
              question={currentQuestion}
              selectedAnswerId={state.selectedAnswerId}
              isRevealed={isRevealed}
              onSelectAnswer={selectAnswer}
              disabled={isRevealed}
            />
            {isRevealed && (
              <div className="flex justify-center pb-4">
                <PixelButton onClick={nextQuestion} size="md">
                  Next
                </PixelButton>
              </div>
            )}
          </>
        ) : null}

        {/* Overlay for intro/defeat/gameover/victory */}
        {showOverlay && (
          <BattleDialog
            phase={state.phase}
            boss={currentBoss}
            expression={state.expression}
            dialog={state.currentDialog}
            onStartBoss={startBoss}
            onNextBoss={nextBoss}
            onStartGame={startGame}
          />
        )}
      </div>
    </SceneBackground>
  );
}
