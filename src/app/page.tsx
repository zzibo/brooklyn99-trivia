"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { PixelButton } from "@/components/pixel/pixel-button";

export default function HomePage() {
  const router = useRouter();

  const handleStartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Play the hot damn audio
    const audio = new Audio("/audio/hot-damn.mp3");
    audio.play().catch(() => {
      // If audio fails, just continue
      console.log("Audio playback failed");
    });

    // Navigate after a short delay
    setTimeout(() => {
      router.push("/select");
    }, 500);
  };

  return (
    <div
      className="animate-bg-pan-up relative flex min-h-screen flex-col items-center justify-center"
      style={{
        backgroundImage: "url(/backgrounds/b99bg.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center 60%",
      }}
    >
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Title */}
        <div className="animate-title-fade-in pixel-border bg-b99-dark/85 rounded px-6 py-6 text-center backdrop-blur-sm sm:px-12 sm:py-8">
          <h1 className="font-pixel text-b99-gold text-xl leading-loose tracking-wider sm:text-3xl md:text-5xl lg:text-6xl">
            B99 SHORT TRIVIA
          </h1>
          <p className="font-pixel text-b99-cream mt-3 text-xs sm:text-sm md:text-base">
            TITLE OF YOUR SEX TAPE
          </p>
        </div>

        {/* Buttons */}
        <div className="animate-button-fade-in flex flex-col items-center gap-3">
          <PixelButton
            size="lg"
            className="text-sm md:text-base px-10 py-4 hover:animate-none"
            onClick={handleStartClick}
          >
            START
          </PixelButton>
          <Link href="/leaderboard">
            <PixelButton size="md" variant="secondary">
              Leaderboard
            </PixelButton>
          </Link>
        </div>
      </div>
    </div>
  );
}
