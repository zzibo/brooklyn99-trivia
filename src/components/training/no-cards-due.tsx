"use client";

import Link from "next/link";
import { CharacterSprite } from "@/components/pixel/character-sprite";
import { SpeechBubble } from "@/components/pixel/speech-bubble";
import { PixelButton } from "@/components/pixel/pixel-button";

interface NoCardsDueProps {
  questionsReviewed: number;
  sessionCorrect: number;
}

export function NoCardsDue({ questionsReviewed, sessionCorrect }: NoCardsDueProps) {
  const hasReviewed = questionsReviewed > 0;

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-6 p-4">
      <CharacterSprite characterId="holt" expression="happy" size="lg" />
      <SpeechBubble characterName="Captain Holt">
        {hasReviewed
          ? `Impressive work, Detective. You reviewed ${questionsReviewed} questions with ${sessionCorrect} correct. Come back later for more.`
          : "No questions are due for review right now. Your dedication to preparedness is... adequate. Return later."}
      </SpeechBubble>
      <div className="flex gap-3">
        <Link href="/">
          <PixelButton variant="secondary">Home</PixelButton>
        </Link>
        <Link href="/stats">
          <PixelButton>View Stats</PixelButton>
        </Link>
      </div>
    </div>
  );
}
