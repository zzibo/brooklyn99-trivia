"use client";

import { CharacterSprite } from "@/components/pixel/character-sprite";
import { PixelBorder } from "@/components/pixel/pixel-border";
import { PixelButton } from "@/components/pixel/pixel-button";
import type { Boss, BattlePhase, Expression } from "@/lib/types";
import { BOSSES } from "@/data/bosses";

interface BattleDialogProps {
  phase: BattlePhase;
  boss: Boss;
  expression: Expression;
  dialog: string;
  onStartBoss: () => void;
  onNextBoss: () => void;
  onStartGame: () => void;
}

export function BattleDialog({
  phase,
  boss,
  expression,
  dialog,
  onStartBoss,
  onNextBoss,
  onStartGame,
}: BattleDialogProps) {
  if (phase === "question" || phase === "reveal") return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <PixelBorder className="animate-fade-in-up w-full max-w-md space-y-6 bg-card text-center">
        {phase === "victory" ? (
          <>
            <h2 className="font-pixel text-sm text-stardew-gold md:text-base">VICTORY!</h2>
            <p className="font-pixel text-[10px] leading-relaxed">
              You defeated all 6 bosses! You are the ultimate Nine-Nine trivia champion!
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {BOSSES.map((b) => (
                <CharacterSprite
                  key={b.id}
                  characterId={b.id}
                  expression="sad"
                  size="sm"
                />
              ))}
            </div>
            <PixelButton onClick={onStartGame} size="lg">
              Play Again
            </PixelButton>
          </>
        ) : (
          <>
            <CharacterSprite
              characterId={boss.id}
              expression={phase === "intro" ? "neutral" : expression}
              size="lg"
              className="mx-auto"
            />
            <h2 className="font-pixel text-sm md:text-base">
              {phase === "intro" && boss.name}
              {phase === "boss_defeated" && "Boss Defeated!"}
              {phase === "gameover" && "Game Over!"}
            </h2>
            {phase === "intro" && (
              <p className="font-pixel text-[8px] text-muted-foreground">{boss.title}</p>
            )}
            <p className="font-pixel text-[10px] leading-relaxed">&ldquo;{dialog}&rdquo;</p>

            {phase === "intro" && (
              <PixelButton onClick={onStartBoss} size="lg">
                Fight!
              </PixelButton>
            )}
            {phase === "boss_defeated" && (
              <PixelButton onClick={onNextBoss} size="lg">
                Next Boss
              </PixelButton>
            )}
            {phase === "gameover" && (
              <PixelButton onClick={onStartGame} size="lg" variant="danger">
                Try Again
              </PixelButton>
            )}
          </>
        )}
      </PixelBorder>
    </div>
  );
}
