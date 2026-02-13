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
    <div className="relative flex h-[40vh] items-end justify-end overflow-hidden p-6">
      {/* Boss sprite and info - aligned together on the right */}
      <div className="flex flex-col items-end gap-3 z-10">
        {/* Boss info box */}
        <div className="pixel-border min-w-[240px] bg-card p-3 shadow-lg">
          <div className="flex items-center justify-between mb-1">
            <h2 className="font-pixel text-sm md:text-base">{boss.name}</h2>
            <span className="font-pixel text-[10px] text-accent">Lv5</span>
          </div>
          <HealthBar
            value={(bossHp / bossMaxHp) * 100}
            label="HP"
            color="red"
            className="mt-2"
          />
          <div className="font-pixel mt-1 text-right text-[10px]">
            {bossHp}/{bossMaxHp}
          </div>
        </div>

        {/* Boss sprite - cropped to 60% body in white bubble */}
        <div className="bg-white rounded-2xl p-4 shadow-xl border-4 border-border h-40 overflow-hidden">
          <CharacterSprite
            characterId={boss.id}
            expression={expression}
            size="2xl"
            cropBottom={true}
          />
        </div>
      </div>
    </div>
  );
}
