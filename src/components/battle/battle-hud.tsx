"use client";

import { CharacterSprite } from "@/components/pixel/character-sprite";
import { HealthBar } from "@/components/pixel/health-bar";
import type { Boss, Expression } from "@/lib/types";

interface BattleHudProps {
  boss: Boss;
  bossHp: number;
  bossMaxHp: number;
  expression: Expression;
  dialog: string;
}

export function BattleHud({ boss, bossHp, bossMaxHp, expression, dialog }: BattleHudProps) {
  return (
    <div className="relative flex h-[28vh] items-end justify-end overflow-hidden p-3 sm:h-[35vh] md:h-[40vh] md:p-6">
      {/* Boss sprite and info - aligned together on the right */}
      <div className="flex flex-col items-end gap-2 z-10 sm:gap-3">
        {/* Boss info box */}
        <div className="pixel-border w-[180px] bg-card p-2 shadow-lg sm:w-auto sm:min-w-[240px] sm:p-3">
          <div className="flex items-center justify-between mb-1">
            <h2 className="font-pixel text-xs sm:text-sm md:text-base">{boss.name}</h2>
            <span className="font-pixel text-[8px] text-accent sm:text-[10px]">Lv5</span>
          </div>
          <HealthBar
            value={(bossHp / bossMaxHp) * 100}
            label="HP"
            color="red"
            className="mt-1 sm:mt-2"
          />
          <div className="font-pixel mt-1 text-right text-[8px] sm:text-[10px]">
            {bossHp}/{bossMaxHp}
          </div>
        </div>

        {/* Boss sprite - cropped to 60% body in white bubble */}
        <div className="bg-white rounded-2xl p-2 shadow-xl border-4 border-border h-24 overflow-hidden sm:h-32 sm:p-3 md:h-40 md:p-4">
          <CharacterSprite
            characterId={boss.id}
            expression={expression}
            size="xl"
            cropBottom={true}
            className="sm:w-80 sm:h-80 md:w-80 md:h-80"
          />
        </div>
      </div>
    </div>
  );
}
