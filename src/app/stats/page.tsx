"use client";

import Link from "next/link";
import { useStats } from "@/hooks/use-stats";
import { useFSRSCards } from "@/hooks/use-fsrs-cards";
import { PixelButton } from "@/components/pixel/pixel-button";
import { PixelBorder } from "@/components/pixel/pixel-border";
import { HealthBar } from "@/components/pixel/health-bar";
import { CharacterSprite } from "@/components/pixel/character-sprite";
import { SpeechBubble } from "@/components/pixel/speech-bubble";
import { getAllCategories } from "@/lib/categories";
import { getAllQuestions } from "@/lib/questions";

export default function StatsPage() {
  const { stats, getRank, getAccuracy, isHydrated: statsHydrated, resetStats } = useStats();
  const { getCardStats, cards, isHydrated: cardsHydrated } = useFSRSCards();

  const isHydrated = statsHydrated && cardsHydrated;

  if (!isHydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="font-pixel animate-pulse text-sm text-muted-foreground">Loading...</p>
      </div>
    );
  }

  const cardStats = getCardStats();
  const rank = getRank();
  const accuracy = getAccuracy();
  const categories = getAllCategories();
  const allQuestions = getAllQuestions();

  // Get category breakdown
  const categoryBreakdown = categories.map((cat) => {
    const catQuestions = allQuestions.filter((q) => q.categoryId === cat.id);
    const catCards = cards.filter((c) =>
      catQuestions.some((q) => q.id === c.questionId)
    );
    const mastered = catCards.filter((c) => c.state === 2).length;
    return {
      ...cat,
      total: catQuestions.length,
      mastered,
      progress: catQuestions.length > 0 ? (mastered / catQuestions.length) * 100 : 0,
    };
  });

  // Recent activity (last 7 days)
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    const key = date.toISOString().split("T")[0];
    return {
      day: date.toLocaleDateString("en", { weekday: "short" }),
      count: stats.reviewsByDate[key] || 0,
    };
  });

  const maxDayCount = Math.max(...last7Days.map((d) => d.count), 1);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b-4 border-border bg-card p-4">
        <div className="mx-auto flex max-w-2xl items-center justify-between">
          <Link href="/">
            <span className="font-pixel text-[10px] text-muted-foreground hover:text-foreground">
              &lt; Back
            </span>
          </Link>
          <h1 className="font-pixel text-xs text-primary">STATS</h1>
          <div className="w-12" />
        </div>
      </header>

      <main className="mx-auto max-w-2xl space-y-6 p-4 md:p-8">
        {/* Rank */}
        <PixelBorder className="space-y-3">
          <div className="flex items-center gap-4">
            <CharacterSprite characterId="holt" expression="neutral" size="sm" />
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-pixel text-sm text-primary">{rank.current.name}</span>
                {rank.next && (
                  <span className="font-pixel text-[8px] text-muted-foreground">
                    Next: {rank.next.name}
                  </span>
                )}
              </div>
              <HealthBar value={rank.progress} color="gold" />
            </div>
          </div>
        </PixelBorder>

        {/* Overview Stats */}
        <PixelBorder className="space-y-3">
          <h3 className="font-pixel text-[10px] text-muted-foreground">OVERVIEW</h3>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="text-center">
              <div className="font-pixel text-xl text-primary">{stats.totalReviews}</div>
              <div className="text-xs text-muted-foreground">Total Reviews</div>
            </div>
            <div className="text-center">
              <div className="font-pixel text-xl text-primary">{accuracy}%</div>
              <div className="text-xs text-muted-foreground">Accuracy</div>
            </div>
            <div className="text-center">
              <div className="font-pixel text-xl text-primary">{stats.streak}</div>
              <div className="text-xs text-muted-foreground">Current Streak</div>
            </div>
            <div className="text-center">
              <div className="font-pixel text-xl text-primary">{stats.longestStreak}</div>
              <div className="text-xs text-muted-foreground">Best Streak</div>
            </div>
          </div>
        </PixelBorder>

        {/* Card Stats */}
        <PixelBorder className="space-y-3">
          <h3 className="font-pixel text-[10px] text-muted-foreground">CARDS</h3>
          <div className="grid grid-cols-4 gap-2">
            <div className="rounded border-2 border-border p-2 text-center">
              <div className="font-pixel text-sm text-blue-600">{cardStats.new}</div>
              <div className="text-[10px] text-muted-foreground">New</div>
            </div>
            <div className="rounded border-2 border-border p-2 text-center">
              <div className="font-pixel text-sm text-orange-600">{cardStats.learning}</div>
              <div className="text-[10px] text-muted-foreground">Learning</div>
            </div>
            <div className="rounded border-2 border-border p-2 text-center">
              <div className="font-pixel text-sm text-green-600">{cardStats.review}</div>
              <div className="text-[10px] text-muted-foreground">Mastered</div>
            </div>
            <div className="rounded border-2 border-border p-2 text-center">
              <div className="font-pixel text-sm text-red-600">{cardStats.due}</div>
              <div className="text-[10px] text-muted-foreground">Due</div>
            </div>
          </div>
          <HealthBar
            value={(cardStats.review / cardStats.total) * 100}
            label="Mastery Progress"
            color="green"
          />
        </PixelBorder>

        {/* Category Breakdown */}
        <PixelBorder className="space-y-3">
          <h3 className="font-pixel text-[10px] text-muted-foreground">CATEGORIES</h3>
          <div className="space-y-3">
            {categoryBreakdown.map((cat) => (
              <div key={cat.id} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm">
                    {cat.icon} {cat.name}
                  </span>
                  <span className="font-pixel text-[8px] text-muted-foreground">
                    {cat.mastered}/{cat.total}
                  </span>
                </div>
                <HealthBar value={cat.progress} color="blue" />
              </div>
            ))}
          </div>
        </PixelBorder>

        {/* Activity Chart */}
        <PixelBorder className="space-y-3">
          <h3 className="font-pixel text-[10px] text-muted-foreground">LAST 7 DAYS</h3>
          <div className="flex items-end justify-between gap-1" style={{ height: 80 }}>
            {last7Days.map((day, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-1">
                <div
                  className="w-full rounded-t bg-primary transition-all"
                  style={{
                    height: `${(day.count / maxDayCount) * 60}px`,
                    minHeight: day.count > 0 ? 4 : 0,
                  }}
                />
                <span className="font-pixel text-[7px] text-muted-foreground">{day.day}</span>
                <span className="font-pixel text-[7px]">{day.count}</span>
              </div>
            ))}
          </div>
        </PixelBorder>

        {/* Holt wisdom */}
        <div className="flex items-end gap-3">
          <CharacterSprite characterId="holt" expression="neutral" size="md" />
          <SpeechBubble characterName="Captain Holt" className="flex-1">
            {stats.totalReviews === 0
              ? "You haven't reviewed any cards yet. I find your lack of initiative... predictable."
              : accuracy >= 80
                ? "Your performance is... acceptable. Continue your studies."
                : "Your accuracy needs improvement. I suggest more rigorous review sessions."}
          </SpeechBubble>
        </div>

        {/* Actions */}
        <div className="flex justify-center gap-3 pb-8">
          <Link href="/train">
            <PixelButton>Train Now</PixelButton>
          </Link>
          <PixelButton
            variant="danger"
            size="sm"
            onClick={() => {
              if (confirm("Reset all stats? This cannot be undone.")) {
                resetStats();
                window.localStorage.removeItem("b99-fsrs-cards");
                window.location.reload();
              }
            }}
          >
            Reset
          </PixelButton>
        </div>
      </main>
    </div>
  );
}
