"use client";

import { PixelButton } from "@/components/pixel/pixel-button";
import { Rating } from "@/lib/fsrs";

interface DifficultyRatingProps {
  onRate: (rating: Rating) => void;
}

const ratings = [
  { rating: Rating.Again, label: "Again", description: "Forgot completely", variant: "danger" as const },
  { rating: Rating.Hard, label: "Hard", description: "Barely remembered", variant: "secondary" as const },
  { rating: Rating.Good, label: "Good", description: "Remembered with effort", variant: "primary" as const },
  { rating: Rating.Easy, label: "Easy", description: "Instantly knew it", variant: "primary" as const },
];

export function DifficultyRating({ onRate }: DifficultyRatingProps) {
  return (
    <div className="animate-fade-in-up mt-4 space-y-3">
      <p className="font-pixel text-center text-[10px] text-muted-foreground">
        How well did you know this?
      </p>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
        {ratings.map(({ rating, label, description, variant }) => (
          <PixelButton
            key={label}
            onClick={() => onRate(rating)}
            variant={variant}
            size="sm"
            className="flex flex-col items-center gap-1"
          >
            <span>{label}</span>
            <span className="font-sans text-[7px] opacity-70">{description}</span>
          </PixelButton>
        ))}
      </div>
    </div>
  );
}
