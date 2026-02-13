"use client";

import Link from "next/link";
import { CharacterSprite } from "@/components/pixel/character-sprite";
import { PixelBorder } from "@/components/pixel/pixel-border";
import { PixelButton } from "@/components/pixel/pixel-button";
import type { Boss, BattlePhase, Expression } from "@/lib/types";
import { BOSSES } from "@/data/bosses";

const VICTORY_QUOTES = [
  "Hot damn!",
  "Cool cool cool cool cool!",
  "BINGPOT!",
  "NINE NINE!",
  "Title of your sex tape!",
  "Noice. Smort.",
  "Terry loves a winner!",
];

interface BattleDialogProps {
  phase: BattlePhase;
  boss: Boss;
  expression: Expression;
  dialog: string;
  onStartBoss: () => void;
  onNextBoss: () => void;
  onStartGame: () => void;
  totalBosses?: number;
  defeatedBosses?: Boss[];
  score: number;
  currentBossIndex: number;
}

export function BattleDialog({
  phase,
  boss,
  expression,
  dialog,
  onStartBoss,
  onNextBoss,
  onStartGame,
  totalBosses = 6,
  defeatedBosses = BOSSES,
  score = 0,
  currentBossIndex = 0,
}: BattleDialogProps) {
  if (phase === "question" || phase === "reveal") return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <PixelBorder className="animate-fade-in-up w-full max-w-md space-y-6 bg-card text-center">
        {phase === "victory" ? (
          <>
            <h2 className="font-pixel text-sm text-accent md:text-base">VICTORY!</h2>
            <p className="font-pixel text-[10px] leading-relaxed">
              You defeated all {totalBosses} {totalBosses === 1 ? 'boss' : 'bosses'}! You are the ultimate Nine-Nine trivia champion!
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {defeatedBosses.map((b) => (
                <div key={b.id} className="bg-white rounded-lg p-2">
                  <CharacterSprite
                    characterId={b.id}
                    expression="sad"
                    size="sm"
                  />
                </div>
              ))}
            </div>
            <Link href="/select">
              <PixelButton size="lg">
                Play Again
              </PixelButton>
            </Link>
          </>
        ) : (
          <>
            <div className="bg-white rounded-lg p-4 mx-auto inline-block">
              <CharacterSprite
                characterId={boss.id}
                expression={phase === "intro" ? "neutral" : expression}
                size="lg"
              />
            </div>
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
              <>
                <div className="bg-white rounded-lg p-4 mx-auto inline-block">
                  <CharacterSprite
                    characterId={boss.id}
                    expression="happy"
                    size="lg"
                  />
                </div>
                <h2 className="font-pixel text-sm md:text-base">Game Over!</h2>
                <p className="font-pixel text-[10px] text-muted-foreground">
                  Defeated by {boss.name}
                </p>
                <p className="font-pixel text-[10px] leading-relaxed">&ldquo;{dialog}&rdquo;</p>
                <div className="font-pixel text-lg text-accent">
                  Score: {score}
                </div>
                {currentBossIndex > 0 && (
                  <div className="flex flex-wrap justify-center gap-2">
                    {defeatedBosses?.slice(0, currentBossIndex).map((b) => (
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
          </>
        )}
      </PixelBorder>
    </div>
  );
}
