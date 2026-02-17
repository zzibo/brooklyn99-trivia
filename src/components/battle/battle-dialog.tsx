"use client";

import { useState } from "react";
import Link from "next/link";
import { CharacterSprite } from "@/components/pixel/character-sprite";
import { PixelBorder } from "@/components/pixel/pixel-border";
import { PixelButton } from "@/components/pixel/pixel-button";
import type { Boss, BattlePhase, Expression } from "@/lib/types";
import { BOSSES } from "@/data/bosses";
import { submitScore } from "@/lib/supabase";

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
  playerCharacterId?: string;
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
  playerCharacterId,
}: BattleDialogProps) {
  const [playerName, setPlayerName] = useState("");
  const [submitState, setSubmitState] = useState<"idle" | "submitting" | "done" | "error">("idle");

  const handleSubmitScore = async () => {
    if (!playerName.trim()) return;
    setSubmitState("submitting");
    try {
      await submitScore(playerName.trim(), score, playerCharacterId || "unknown");
      setSubmitState("done");
    } catch {
      setSubmitState("error");
    }
  };

  if (phase === "question" || phase === "reveal") return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-3 sm:p-4">
      <PixelBorder className="animate-fade-in-up w-full max-w-md space-y-4 bg-card text-center sm:space-y-6 max-h-[90dvh] overflow-y-auto">
        {phase === "victory" && (
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
              {defeatedBosses?.map((b) => (
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

            {/* Score submission */}
            {submitState === "done" ? (
              <p className="font-pixel text-[10px] text-b99-green">Score submitted!</p>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <input
                  type="text"
                  maxLength={20}
                  placeholder="Enter your name"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmitScore()}
                  className="font-pixel pixel-border w-full max-w-[200px] rounded bg-background px-3 py-2 text-center text-[10px] text-foreground outline-none placeholder:text-muted-foreground"
                />
                <PixelButton
                  size="md"
                  onClick={handleSubmitScore}
                  disabled={!playerName.trim() || submitState === "submitting"}
                >
                  {submitState === "submitting" ? "Submitting..." : "Submit Score"}
                </PixelButton>
                {submitState === "error" && (
                  <p className="font-pixel text-[8px] text-destructive">Failed to submit. Try again!</p>
                )}
              </div>
            )}

            <Link href="/select">
              <PixelButton size="lg">Play Again</PixelButton>
            </Link>
          </>
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

            {/* Score submission */}
            {submitState === "done" ? (
              <p className="font-pixel text-[10px] text-b99-green">Score submitted!</p>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <input
                  type="text"
                  maxLength={20}
                  placeholder="Enter your name"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmitScore()}
                  className="font-pixel pixel-border w-full max-w-[200px] rounded bg-background px-3 py-2 text-center text-[10px] text-foreground outline-none placeholder:text-muted-foreground"
                />
                <PixelButton
                  size="md"
                  onClick={handleSubmitScore}
                  disabled={!playerName.trim() || submitState === "submitting"}
                >
                  {submitState === "submitting" ? "Submitting..." : "Submit Score"}
                </PixelButton>
                {submitState === "error" && (
                  <p className="font-pixel text-[8px] text-destructive">Failed to submit. Try again!</p>
                )}
              </div>
            )}

            <Link href="/select">
              <PixelButton size="lg" variant="danger">
                Try Again
              </PixelButton>
            </Link>
          </>
        )}

        {(phase === "intro" || phase === "boss_defeated") && (
          <>
            <div className="bg-white rounded-lg p-4 mx-auto inline-block">
              <CharacterSprite
                characterId={boss.id}
                expression={phase === "intro" ? "neutral" : expression}
                size="lg"
              />
            </div>
            <h2 className="font-pixel text-sm md:text-base">
              {phase === "intro" ? boss.name : "Boss Defeated!"}
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
          </>
        )}
      </PixelBorder>
    </div>
  );
}
