"use client";

import Link from "next/link";
import { CharacterSprite } from "@/components/pixel/character-sprite";
import { SpeechBubble } from "@/components/pixel/speech-bubble";
import { PixelButton } from "@/components/pixel/pixel-button";
import { BOSSES } from "@/data/bosses";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto flex max-w-2xl flex-col items-center space-y-8 p-4 pt-16 md:p-8 md:pt-24">
        {/* Title */}
        <h1 className="font-pixel text-center text-sm leading-relaxed md:text-lg">
          Brooklyn Nine-Nine
          <br />
          Trivia Battle
        </h1>

        {/* Boss sprites */}
        <div className="flex flex-wrap justify-center gap-2">
          {BOSSES.map((boss) => (
            <CharacterSprite
              key={boss.id}
              characterId={boss.id}
              expression="neutral"
              size="sm"
            />
          ))}
        </div>

        {/* Speech bubble */}
        <SpeechBubble characterName="Jake Peralta">
          NINE NINE! Think you know everything about the Nine-Nine? Battle through 6 bosses
          and prove it! Cool cool cool cool cool.
        </SpeechBubble>

        {/* Start button */}
        <Link href="/battle">
          <PixelButton size="lg">Start Battle</PixelButton>
        </Link>

        {/* Footer */}
        <footer className="pt-8 text-center">
          <p className="font-pixel text-[8px] text-muted-foreground">
            NINE-NINE!
          </p>
        </footer>
      </main>
    </div>
  );
}
