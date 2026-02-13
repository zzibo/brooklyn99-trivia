"use client";

import { Suspense, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { SceneBackground } from "@/components/pixel/scene-background";
import { BattleHud } from "@/components/battle/battle-hud";
import { PlayerHud } from "@/components/battle/player-hud";
import { MoveGrid } from "@/components/battle/move-grid";
import { BattleDialog } from "@/components/battle/battle-dialog";
import { PixelButton } from "@/components/pixel/pixel-button";
import { useBattle } from "@/hooks/use-battle";
import { useSound } from "@/hooks/use-sound";

export default function BattlePage() {
  return (
    <Suspense>
      <BattleContent />
    </Suspense>
  );
}

function BattleContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const playerCharacter = searchParams.get("character");

  // If no character selected, redirect to select page
  useEffect(() => {
    if (!playerCharacter) {
      router.push("/select");
    }
  }, [playerCharacter, router]);

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

  const { play, startBgMusic, stopBgMusic } = useSound();
  const prevPhaseRef = useRef(state.phase);

  useEffect(() => {
    if (!hasSave) {
      startGame();
    }
  }, [hasSave, startGame]);

  // B99 theme plays during questions, stops on overlays
  useEffect(() => {
    if (state.phase === "question") {
      startBgMusic();
    } else {
      stopBgMusic();
    }
  }, [state.phase, startBgMusic, stopBgMusic]);

  // Play SFX on phase transitions
  useEffect(() => {
    const prev = prevPhaseRef.current;
    prevPhaseRef.current = state.phase;

    if (state.phase === "reveal" && prev === "question") {
      play(state.isCorrect ? "correct" : "wrong");
    }
    if (state.phase === "boss_defeated" && prev !== "boss_defeated") {
      play("boss-defeated");
    }
    if (state.phase === "gameover" && prev !== "gameover") {
      play("lose");
    }
    if (state.phase === "victory" && prev !== "victory") {
      play("victory");
    }
  }, [state.phase, state.isCorrect, play]);

  const isRevealed = state.phase === "reveal";
  const showOverlay = ["intro", "boss_defeated", "gameover", "victory"].includes(state.phase);

  return (
    <SceneBackground scene={currentBoss.background}>
      <div className="relative mx-auto flex min-h-screen max-w-4xl flex-col">
        {/* Boss area - top section */}
        <BattleHud
          boss={currentBoss}
          bossHp={state.bossHp}
          bossMaxHp={state.bossMaxHp}
          expression={state.expression}
          dialog={state.currentDialog}
        />

        {/* Player area - middle/bottom section */}
        <PlayerHud
          playerHp={state.playerHp}
          playerMaxHp={state.playerMaxHp}
          questionIndex={state.currentQuestionIndex}
          totalQuestions={questions.length}
          playerCharacterId={playerCharacter || undefined}
        />

        {/* Move grid (question + answers) - overlays at bottom */}
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
              <div className="absolute bottom-4 right-4 z-10">
                <PixelButton onClick={nextQuestion} size="md">
                  Next ▶
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
            score={state.score}
            currentBossIndex={state.currentBossIndex}
            onStartBoss={startBoss}
            onNextBoss={nextBoss}
            onStartGame={startGame}
            totalBosses={bossList.length}
            defeatedBosses={bossList}
          />
        )}
      </div>
    </SceneBackground>
  );
}
