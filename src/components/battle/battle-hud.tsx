"use client";

import { CharacterSprite } from "@/components/pixel/character-sprite";
import { HealthBar } from "@/components/pixel/health-bar";
import { SpeechBubble } from "@/components/pixel/speech-bubble";
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
    <div className="space-y-3 p-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-pixel text-sm md:text-base">{boss.name}</h2>
          <p className="font-pixel text-[8px] text-muted-foreground">{boss.title}</p>
        </div>
        <HealthBar
          value={(bossHp / bossMaxHp) * 100}
          label={`HP ${bossHp}/${bossMaxHp}`}
          color="green"
          className="w-40 md:w-56"
        />
      </div>
      <div className="flex items-start gap-4">
        <CharacterSprite
          characterId={boss.id}
          expression={expression}
          size="lg"
          className="shrink-0"
        />
        {dialog && (
          <SpeechBubble characterName={boss.name} className="flex-1">
            {dialog}
          </SpeechBubble>
        )}
      </div>
    </div>
  );
}
