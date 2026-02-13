"use client";

interface PlayerHudProps {
  playerHp: number;
  playerMaxHp: number;
  questionIndex: number;
  totalQuestions: number;
}

export function PlayerHud({ playerHp, playerMaxHp, questionIndex, totalQuestions }: PlayerHudProps) {
  return (
    <div className="flex items-center justify-between px-4 py-2">
      <div className="flex items-center gap-1">
        <span className="font-pixel mr-2 text-[8px]">HP</span>
        {Array.from({ length: playerMaxHp }).map((_, i) => (
          <span key={i} className="text-base">
            {i < playerHp ? "❤️" : "🖤"}
          </span>
        ))}
      </div>
      <span className="font-pixel text-[10px] text-muted-foreground">
        Q {questionIndex + 1}/{totalQuestions}
      </span>
    </div>
  );
}
