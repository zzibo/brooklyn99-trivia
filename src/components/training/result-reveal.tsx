"use client";

import { PixelButton } from "@/components/pixel/pixel-button";
import { cn } from "@/lib/utils";

interface ResultRevealProps {
  isCorrect: boolean;
  correctAnswer: string;
  onContinue: () => void;
}

export function ResultReveal({ isCorrect, correctAnswer, onContinue }: ResultRevealProps) {
  return (
    <div className={cn("animate-fade-in-up mt-4 space-y-3 rounded-lg p-4", isCorrect ? "bg-green-50" : "bg-red-50")}>
      <div className="font-pixel text-center text-sm">
        {isCorrect ? (
          <span className="text-green-700">Noice! Correct!</span>
        ) : (
          <span className="text-red-700">Not quite...</span>
        )}
      </div>
      {!isCorrect && (
        <p className="text-center text-sm text-muted-foreground">
          The correct answer was: <strong>{correctAnswer}</strong>
        </p>
      )}
      <div className="flex justify-center">
        <PixelButton onClick={onContinue} size="sm">
          Rate Difficulty
        </PixelButton>
      </div>
    </div>
  );
}
