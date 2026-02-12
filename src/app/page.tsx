"use client";

import Link from "next/link";
import { CharacterSprite } from "@/components/pixel/character-sprite";
import { SpeechBubble } from "@/components/pixel/speech-bubble";
import { PixelButton } from "@/components/pixel/pixel-button";
import { PixelBorder } from "@/components/pixel/pixel-border";
import { HealthBar } from "@/components/pixel/health-bar";
import { useFSRSCards } from "@/hooks/use-fsrs-cards";
import { useStats } from "@/hooks/use-stats";

export default function HomePage() {
  const { getCardStats, isHydrated: cardsHydrated } = useFSRSCards();
  const { stats, getRank, getAccuracy, isHydrated: statsHydrated } = useStats();

  const isHydrated = cardsHydrated && statsHydrated;
  const cardStats = isHydrated ? getCardStats() : null;
  const rank = isHydrated ? getRank() : null;
  const accuracy = isHydrated ? getAccuracy() : 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b-4 border-border bg-card p-4">
        <div className="mx-auto flex max-w-2xl items-center justify-between">
          <h1 className="font-pixel text-xs text-primary md:text-sm">B99 TRIVIA</h1>
          <Link href="/stats">
            <PixelButton variant="secondary" size="sm">
              Stats
            </PixelButton>
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-2xl space-y-8 p-4 md:p-8">
        {/* Hero */}
        <div className="flex flex-col items-center space-y-4 pt-8 text-center">
          <div className="flex gap-2">
            <CharacterSprite characterId="jake" expression="happy" size="md" />
            <CharacterSprite characterId="holt" expression="neutral" size="md" />
            <CharacterSprite characterId="amy" expression="happy" size="md" />
          </div>
          <h2 className="font-pixel text-sm leading-relaxed md:text-lg">
            Brooklyn Nine-Nine
            <br />
            Trivia Trainer
          </h2>
          <p className="max-w-md text-sm text-muted-foreground">
            Master your B99 knowledge with spaced repetition. Characters quiz you, and the
            app learns what you know and what you need to practice.
          </p>
        </div>

        {/* Speech Bubble */}
        <SpeechBubble characterName="Jake Peralta">
          Cool cool cool cool cool! Ready to prove you&apos;re the ultimate Nine-Nine fan?
          Let&apos;s do this! Noice.
        </SpeechBubble>

        {/* Start Button */}
        <div className="flex justify-center">
          <Link href="/train">
            <PixelButton size="lg">Start Training</PixelButton>
          </Link>
        </div>

        {/* Stats Preview */}
        {isHydrated && stats.totalReviews > 0 && (
          <PixelBorder className="space-y-4">
            <h3 className="font-pixel text-[10px] text-muted-foreground">YOUR PROGRESS</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="font-pixel text-lg text-primary">{stats.totalReviews}</div>
                <div className="text-xs text-muted-foreground">Reviews</div>
              </div>
              <div>
                <div className="font-pixel text-lg text-primary">{accuracy}%</div>
                <div className="text-xs text-muted-foreground">Accuracy</div>
              </div>
              <div>
                <div className="font-pixel text-lg text-primary">{stats.streak}</div>
                <div className="text-xs text-muted-foreground">Streak</div>
              </div>
            </div>

            {rank && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-pixel text-[10px]">{rank.current.name}</span>
                  {rank.next && (
                    <span className="font-pixel text-[8px] text-muted-foreground">
                      Next: {rank.next.name}
                    </span>
                  )}
                </div>
                <HealthBar value={rank.progress} color="gold" />
              </div>
            )}

            {cardStats && (
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{cardStats.due} cards due</span>
                <span>
                  {cardStats.review} mastered / {cardStats.total} total
                </span>
              </div>
            )}
          </PixelBorder>
        )}

        {/* Categories */}
        <PixelBorder className="space-y-3">
          <h3 className="font-pixel text-[10px] text-muted-foreground">CATEGORIES</h3>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
            {[
              { icon: "📺", name: "General" },
              { icon: "👤", name: "Characters" },
              { icon: "💬", name: "Quotes" },
              { icon: "🎬", name: "Episodes" },
              { icon: "🔄", name: "Running Gags" },
              { icon: "❤️", name: "Relationships" },
            ].map((cat) => (
              <div
                key={cat.name}
                className="flex items-center gap-2 rounded border-2 border-border p-2"
              >
                <span>{cat.icon}</span>
                <span className="font-pixel text-[8px]">{cat.name}</span>
              </div>
            ))}
          </div>
        </PixelBorder>

        {/* Footer */}
        <footer className="pb-8 text-center">
          <p className="font-pixel text-[8px] text-muted-foreground">
            NINE-NINE!
          </p>
        </footer>
      </main>
    </div>
  );
}
