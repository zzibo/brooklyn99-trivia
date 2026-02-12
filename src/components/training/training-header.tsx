"use client";

import Link from "next/link";
import { HealthBar } from "@/components/pixel/health-bar";
import { Badge } from "@/components/ui/badge";

interface TrainingHeaderProps {
  questionsReviewed: number;
  sessionCorrect: number;
  dueCount: number;
}

export function TrainingHeader({ questionsReviewed, sessionCorrect, dueCount }: TrainingHeaderProps) {
  const accuracy = questionsReviewed > 0 ? Math.round((sessionCorrect / questionsReviewed) * 100) : 0;

  return (
    <div className="flex items-center justify-between gap-4 p-4">
      <Link
        href="/"
        className="font-pixel text-[10px] text-muted-foreground transition-colors hover:text-foreground"
      >
        &lt; Back
      </Link>

      <div className="flex items-center gap-3">
        <Badge variant="outline" className="font-pixel text-[8px]">
          {dueCount} due
        </Badge>
        <Badge variant="secondary" className="font-pixel text-[8px]">
          {questionsReviewed} reviewed
        </Badge>
        {questionsReviewed > 0 && (
          <HealthBar
            value={accuracy}
            label="Accuracy"
            className="w-24"
            color={accuracy >= 80 ? "green" : accuracy >= 50 ? "gold" : "green"}
          />
        )}
      </div>
    </div>
  );
}
