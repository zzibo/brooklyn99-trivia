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
    <div className="relative flex items-end justify-start px-2 pb-1 sm:p-3 md:p-6">
      {/* Player sprite and info - stacked vertically */}
      <div className="flex flex-col items-start gap-2 z-10 sm:gap-3">
        {/* Player sprite - cropped to 60% body in white bubble */}
        <div className="bg-white rounded-2xl p-2 shadow-xl border-4 border-border h-24 overflow-hidden sm:h-32 sm:p-3 md:h-40 md:p-4">
          {playerCharacterId ? (
            <CharacterSprite
              characterId={playerCharacterId}
              expression="neutral"
              size="xl"
              cropBottom={true}
              className="sm:w-80 sm:h-80 md:w-80 md:h-80"
            />
          ) : (
            <div className="pixel-render flex h-20 w-20 items-center justify-center rounded-lg bg-primary/20 sm:h-32 sm:w-32">
              <span className="font-pixel text-xl sm:text-2xl">👮</span>
            </div>
          )}
        </div>

        {/* Player info box with YOU tag */}
        <div className="pixel-border w-[200px] bg-card p-2 shadow-lg sm:w-auto sm:min-w-[280px] sm:p-3">
          <div className="flex items-center gap-1 mb-1 sm:gap-2">
            <span className="font-pixel rounded bg-primary px-1.5 py-0.5 text-[7px] text-primary-foreground sm:px-2 sm:text-[8px]">
              YOU
            </span>
            <h2 className="font-pixel text-xs sm:text-sm md:text-base">
              {playerCharacter ? playerCharacter.name : "Player"}
            </h2>
            <span className="font-pixel ml-auto text-[8px] text-accent sm:text-[10px]">Lv5</span>
          </div>
          <HealthBar
            value={(playerHp / playerMaxHp) * 100}
            label="HP"
            color="red"
            className="mt-1 sm:mt-2"
          />
          <div className="font-pixel mt-1 flex items-center justify-between text-[8px] sm:text-[10px]">
            <span>{playerHp}/{playerMaxHp}</span>
            <span className="text-muted-foreground">
              Q {questionIndex + 1}/{totalQuestions}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
