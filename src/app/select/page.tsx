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

      <main className="relative z-10 mx-auto flex max-w-4xl flex-col items-center space-y-8 p-4 pt-16 md:p-8 md:pt-24">
        {/* Title */}
        <div className="pixel-border bg-b99-dark/90 rounded-lg px-8 py-6 text-center backdrop-blur-sm">
          <h1 className="font-pixel text-b99-gold text-sm leading-relaxed md:text-lg">
            Choose Your Character
          </h1>
          <p className="font-pixel text-b99-cream mt-2 text-[10px] leading-relaxed md:text-xs">
            Select who you want to be! You'll face the other 5 detectives.
            <br />
            Each battle has 10 questions. NINE NINE!
          </p>
        </div>

        {/* Character Grid */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {BOSSES.map((boss) => (
            <button
              key={boss.id}
              onClick={() => handleSelectCharacter(boss.id)}
              className="pixel-border group flex flex-col items-center gap-3 rounded-lg bg-white p-4 transition-all hover:scale-105 hover:bg-gray-50 hover:shadow-lg overflow-hidden"
            >
              <div className="h-32 overflow-hidden">
                <CharacterSprite
                  characterId={boss.id}
                  expression="neutral"
                  size="2xl"
                  cropBottom={true}
                />
              </div>
              <div className="text-center">
                <h2 className="font-pixel text-sm md:text-base">{boss.name}</h2>
                <p className="font-pixel text-[8px] text-muted-foreground">
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
        <footer className="pt-8 text-center">
          <p className="font-pixel text-b99-gold text-[8px]">
            Title of your sex tape!
          </p>
        </footer>
      </main>
    </div>
  );
}
