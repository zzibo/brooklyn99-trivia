"use client";

import { cn } from "@/lib/utils";

interface AnswerOptionProps {
  text: string;
  index: number;
  isSelected: boolean;
  isCorrect?: boolean;
  isRevealed: boolean;
  onClick: () => void;
  disabled: boolean;
}

const letterMap = ["A", "B", "C", "D"];

export function AnswerOption({
  text,
  index,
  isSelected,
  isCorrect,
  isRevealed,
  onClick,
  disabled,
}: AnswerOptionProps) {
  const getStateClasses = () => {
    if (!isRevealed) {
      return isSelected
        ? "border-primary bg-primary/10"
        : "border-border bg-card hover:bg-muted";
    }
    if (isCorrect) return "border-green-600 bg-green-100";
    if (isSelected && !isCorrect) return "border-destructive bg-red-100";
    return "border-border bg-card opacity-60";
  };

  const getAnimation = () => {
    if (!isRevealed) return "";
    if (isCorrect) return "animate-pixel-bounce";
    if (isSelected && !isCorrect) return "animate-pixel-shake";
    return "";
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "flex w-full items-center gap-3 rounded-lg border-4 p-3 text-left transition-all md:p-4",
        getStateClasses(),
        getAnimation(),
        !disabled && "cursor-pointer"
      )}
    >
      <span className="font-pixel flex h-8 w-8 shrink-0 items-center justify-center rounded bg-secondary text-[10px]">
        {letterMap[index]}
      </span>
      <span className="font-sans text-sm md:text-base">{text}</span>
      {isRevealed && isCorrect && <span className="ml-auto text-lg">&#10003;</span>}
      {isRevealed && isSelected && !isCorrect && <span className="ml-auto text-lg">&#10007;</span>}
    </button>
  );
}
