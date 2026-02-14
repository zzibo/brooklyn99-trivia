"use client";

import { useRouter } from "next/navigation";
import { CharacterSprite } from "@/components/pixel/character-sprite";
import { PixelButton } from "@/components/pixel/pixel-button";
import { BOSSES } from "@/data/bosses";

export default function SelectPage() {
  const router = useRouter();

  const handleSelectCharacter = (characterId: string) => {
    router.push(`/battle?character=${characterId}`);
  };

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: "url(/backgrounds/insidebg.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />

      <main className="relative z-10 mx-auto flex max-w-4xl flex-col items-center space-y-6 p-3 pt-12 sm:space-y-8 sm:p-4 sm:pt-16 md:p-8 md:pt-24">
        {/* Title */}
        <div className="pixel-border bg-b99-dark/90 rounded-lg px-4 py-4 text-center backdrop-blur-sm sm:px-8 sm:py-6">
          <h1 className="font-pixel text-b99-gold text-xs leading-relaxed sm:text-sm md:text-lg">
            Choose Your Character
          </h1>
          <p className="font-pixel text-b99-cream mt-2 text-[8px] leading-relaxed sm:text-[10px] md:text-xs">
            Select who you want to be! You&apos;ll face the other 5 detectives.
            <br />
            Each battle has 10 questions. NINE NINE!
          </p>
        </div>

        {/* Character Grid */}
        <div className="grid w-full grid-cols-2 gap-2 sm:gap-4 md:grid-cols-3">
          {BOSSES.map((boss) => (
            <button
              key={boss.id}
              onClick={() => handleSelectCharacter(boss.id)}
              className="pixel-border group flex flex-col items-center gap-2 rounded-lg bg-white p-2 transition-all hover:scale-105 hover:bg-gray-50 hover:shadow-lg overflow-hidden sm:gap-3 sm:p-4"
            >
              <div className="h-24 overflow-hidden sm:h-32">
                <CharacterSprite
                  characterId={boss.id}
                  expression="neutral"
                  size="xl"
                  cropBottom={true}
                  className="sm:w-80 sm:h-80"
                />
              </div>
              <div className="text-center">
                <h2 className="font-pixel text-[10px] sm:text-sm md:text-base">{boss.name}</h2>
                <p className="font-pixel text-[7px] text-muted-foreground sm:text-[8px]">
                  {boss.title}
                </p>
              </div>
              <PixelButton size="sm" className="w-full">
                Select
              </PixelButton>
            </button>
          ))}
        </div>

        {/* Footer */}
        <footer className="pt-4 text-center sm:pt-8">
          <p className="font-pixel text-b99-gold text-[8px]">
            Title of your sex tape!
          </p>
        </footer>
      </main>
    </div>
  );
}
