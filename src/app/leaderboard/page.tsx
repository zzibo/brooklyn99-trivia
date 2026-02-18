"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CharacterSprite } from "@/components/pixel/character-sprite";
import { PixelBorder } from "@/components/pixel/pixel-border";
import { PixelButton } from "@/components/pixel/pixel-button";
import { getLeaderboard, type LeaderboardEntry } from "@/lib/db";

export default function LeaderboardPage() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getLeaderboard()
      .then(setEntries)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div
      className="relative flex min-h-screen flex-col items-center justify-center p-4"
      style={{
        backgroundImage: "url(/backgrounds/b99bg.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center 50%",
      }}
    >
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 flex w-full max-w-lg flex-col items-center gap-4">
        <PixelBorder className="w-full space-y-4 bg-card/95 backdrop-blur-sm">
          <h1 className="font-pixel text-center text-sm text-accent sm:text-base md:text-lg">
            LEADERBOARD
          </h1>

          {loading && (
            <p className="font-pixel text-center text-[10px] text-muted-foreground animate-pulse">
              Loading...
            </p>
          )}

          {error && (
            <p className="font-pixel text-center text-[10px] text-destructive">
              Failed to load leaderboard.
            </p>
          )}

          {!loading && !error && entries.length === 0 && (
            <p className="font-pixel text-center text-[10px] text-muted-foreground">
              No scores yet. Be the first!
            </p>
          )}

          {!loading && !error && entries.length > 0 && (
            <div className="space-y-1.5">
              {/* Header */}
              <div className="grid grid-cols-[2rem_1fr_2.5rem_3rem_4.5rem] items-center gap-1 px-2 sm:grid-cols-[2rem_1fr_3rem_3.5rem_5.5rem]">
                <span className="font-pixel text-[7px] text-muted-foreground sm:text-[8px]">#</span>
                <span className="font-pixel text-[7px] text-muted-foreground sm:text-[8px]">NAME</span>
                <span className="font-pixel text-[7px] text-muted-foreground sm:text-[8px]"></span>
                <span className="font-pixel text-center text-[7px] text-muted-foreground sm:text-[8px]">PTS</span>
                <span className="font-pixel text-right text-[7px] text-muted-foreground sm:text-[8px]">DATE</span>
              </div>

              {entries.map((entry, i) => {
                const rank = i + 1;
                const isTop3 = rank <= 3;
                const rankColors = ["text-accent", "text-b99-light-gray", "text-[#cd7f32]"];
                const date = new Date(entry.created_at);
                const dateStr = `${date.getMonth() + 1}/${date.getDate()}`;

                return (
                  <div
                    key={entry.id}
                    className={`grid grid-cols-[2rem_1fr_2.5rem_3rem_4.5rem] items-center gap-1 rounded-lg px-2 py-1.5 sm:grid-cols-[2rem_1fr_3rem_3.5rem_5.5rem] ${
                      isTop3 ? "bg-accent/10" : "bg-background/50"
                    }`}
                  >
                    <span className={`font-pixel text-[10px] sm:text-xs ${isTop3 ? rankColors[i] : "text-foreground"}`}>
                      {rank}
                    </span>
                    <span className="font-pixel truncate text-[8px] sm:text-[10px]">
                      {entry.name}
                    </span>
                    <div className="flex justify-center">
                      <CharacterSprite
                        characterId={entry.character}
                        expression="happy"
                        size="sm"
                        className="!w-6 !h-6 sm:!w-7 sm:!h-7"
                      />
                    </div>
                    <span className="font-pixel text-center text-[10px] text-accent sm:text-xs">
                      {entry.score}
                    </span>
                    <span className="font-pixel text-right text-[7px] text-muted-foreground sm:text-[8px]">
                      {dateStr}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </PixelBorder>

        <Link href="/">
          <PixelButton size="md">Back</PixelButton>
        </Link>
      </div>
    </div>
  );
}
