"use client";

import { PixelBorder } from "@/components/pixel/pixel-border";
import type { Question } from "@/lib/types";

interface MoveGridProps {
  question: Question;
  selectedAnswerId: number | null;
  isRevealed: boolean;
  onSelectAnswer: (answerId: number) => void;
  disabled: boolean;
}

export function MoveGrid({ question, selectedAnswerId, isRevealed, onSelectAnswer, disabled }: MoveGridProps) {
  return (
    <div className="space-y-3 px-4 pb-4">
      <PixelBorder className="text-center">
        <p className="font-pixel text-xs leading-relaxed md:text-sm">{question.question}</p>
      </PixelBorder>
      <div className="grid grid-cols-2 gap-2">
        {question.answers.map((answer, index) => {
          const isSelected = selectedAnswerId === answer.id;
          const isCorrectAnswer = answer.isCorrect;

          let bgClass = "bg-card hover:bg-muted border-border";
          let animClass = "";

          if (isRevealed) {
            if (isCorrectAnswer) {
              bgClass = "bg-green-100 border-green-600";
              animClass = "animate-pixel-bounce";
            } else if (isSelected) {
              bgClass = "bg-red-100 border-destructive";
              animClass = "animate-pixel-shake";
            } else {
              bgClass = "bg-card border-border opacity-50";
            }
          } else if (isSelected) {
            bgClass = "bg-primary/10 border-primary";
          }

          return (
            <button
              key={answer.id}
              onClick={() => onSelectAnswer(answer.id)}
              disabled={disabled}
              className={`pixel-border flex items-center gap-2 rounded-lg p-3 text-left transition-all ${bgClass} ${animClass} ${
                !disabled ? "cursor-pointer" : "cursor-not-allowed"
              }`}
            >
              <span className="font-pixel shrink-0 text-[10px] text-muted-foreground">
                {["A", "B", "C", "D"][index]}
              </span>
              <span className="font-sans text-sm">{answer.text}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
