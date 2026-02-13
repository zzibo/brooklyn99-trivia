"use client";

import type { Question } from "@/lib/types";

interface MoveGridProps {
  question: Question;
  selectedAnswerId: number | null;
  isRevealed: boolean;
  onSelectAnswer: (answerId: number) => void;
  disabled: boolean;
}

export function MoveGrid({ question, selectedAnswerId, isRevealed, onSelectAnswer, disabled }: MoveGridProps) {
  const difficultyLabels = {
    1: { text: "EASY", color: "text-green-600 bg-green-100" },
    2: { text: "MEDIUM", color: "text-yellow-600 bg-yellow-100" },
    3: { text: "HARD", color: "text-red-600 bg-red-100" },
  };

  const difficulty = difficultyLabels[question.difficulty as keyof typeof difficultyLabels] || difficultyLabels[1];

  return (
    <div className="absolute bottom-0 left-0 right-0 p-4">
      {/* Question dialog box - like Pokemon battle text */}
      <div className="pixel-border mb-3 bg-card p-4 shadow-lg">
        <div className="flex items-start justify-between gap-3 mb-2">
          <p className="font-pixel text-xs leading-relaxed md:text-sm flex-1">{question.question}</p>
          <span className={`font-pixel text-[8px] px-2 py-1 rounded shrink-0 ${difficulty.color}`}>
            {difficulty.text}
          </span>
        </div>
      </div>

      {/* Battle menu - Pokemon style with 2x2 grid */}
      <div className="pixel-border bg-card p-3 shadow-lg">
        <div className="grid grid-cols-2 gap-2">
          {question.answers.map((answer, index) => {
            const isSelected = selectedAnswerId === answer.id;
            const isCorrectAnswer = answer.isCorrect;

            let bgClass = "bg-background hover:bg-muted";
            let textClass = "text-foreground";
            let animClass = "";
            let borderClass = "border-2 border-border";

            if (isRevealed) {
              if (isCorrectAnswer) {
                bgClass = "bg-green-500/20";
                borderClass = "border-2 border-green-600";
                textClass = "text-green-700 font-bold";
                animClass = "animate-pixel-bounce";
              } else if (isSelected) {
                bgClass = "bg-red-500/20";
                borderClass = "border-2 border-destructive";
                textClass = "text-destructive font-bold";
                animClass = "animate-pixel-shake";
              } else {
                bgClass = "bg-background";
                textClass = "text-muted-foreground";
                borderClass = "border-2 border-muted";
              }
            } else if (isSelected) {
              bgClass = "bg-primary/20";
              borderClass = "border-2 border-primary";
              textClass = "text-primary font-semibold";
            }

            return (
              <button
                key={answer.id}
                onClick={() => onSelectAnswer(answer.id)}
                disabled={disabled}
                className={`${borderClass} ${bgClass} ${animClass} rounded-lg p-3 text-left transition-all ${
                  !disabled ? "cursor-pointer hover:scale-[1.02]" : "cursor-not-allowed"
                }`}
              >
                <div className="flex items-start gap-2">
                  <span className="font-pixel shrink-0 text-[10px] text-accent">
                    ▶
                  </span>
                  <span className={`font-pixel text-[10px] leading-relaxed ${textClass}`}>
                    {answer.text}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
