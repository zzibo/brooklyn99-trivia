"use client";

import { CharacterSprite } from "@/components/pixel/character-sprite";
import { HealthBar } from "@/components/pixel/health-bar";
import { BOSSES } from "@/data/bosses";

interface PlayerHudProps {
  playerHp: number;
  playerMaxHp: number;
  questionIndex: number;
  totalQuestions: number;
  playerCharacterId?: string;
}

export function PlayerHud({ playerHp, playerMaxHp, questionIndex, totalQuestions, playerCharacterId }: PlayerHudProps) {
  const playerCharacter = playerCharacterId ? BOSSES.find(b => b.id === playerCharacterId) : null;
  return (
    <div className="relative flex h-[25vh] items-end justify-start p-6">
      {/* Player sprite and info - aligned together on the left */}
      <div className="flex flex-col items-start gap-3 z-10">
        {/* Player info box with YOU tag */}
        <div className="pixel-border min-w-[280px] bg-card p-3 shadow-lg">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-pixel rounded bg-primary px-2 py-0.5 text-[8px] text-primary-foreground">
              YOU
            </span>
            <h2 className="font-pixel text-sm md:text-base">
              {playerCharacter ? playerCharacter.name : "Player"}
            </h2>
            <span className="font-pixel ml-auto text-[10px] text-accent">Lv5</span>
          </div>
          <HealthBar
            value={(playerHp / playerMaxHp) * 100}
            label="HP"
            color="red"
            className="mt-2"
          />
          <div className="font-pixel mt-1 flex items-center justify-between text-[10px]">
            <span>{playerHp}/{playerMaxHp}</span>
            <span className="text-muted-foreground">
              Q {questionIndex + 1}/{totalQuestions}
            </span>
          </div>
        </div>

        {/* Player sprite - cropped to 60% body in white bubble */}
        <div className="bg-white rounded-2xl p-4 shadow-xl border-4 border-border h-40 overflow-hidden">
          {playerCharacterId ? (
            <CharacterSprite
              characterId={playerCharacterId}
              expression="neutral"
              size="2xl"
              cropBottom={true}
            />
          ) : (
            <div className="pixel-render flex h-32 w-32 items-center justify-center rounded-lg bg-primary/20">
              <span className="font-pixel text-2xl">👮</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
