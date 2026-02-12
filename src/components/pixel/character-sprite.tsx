"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Expression } from "@/lib/types";

interface CharacterSpriteProps {
  characterId: string;
  expression?: Expression;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: { width: 64, height: 64, className: "w-16 h-16" },
  md: { width: 96, height: 96, className: "w-24 h-24" },
  lg: { width: 128, height: 128, className: "w-32 h-32" },
};

export function CharacterSprite({
  characterId,
  expression = "neutral",
  size = "md",
  className,
}: CharacterSpriteProps) {
  const { width, height, className: sizeClass } = sizeMap[size];
  const src = `/sprites/${characterId}-${expression}.png`;

  return (
    <div className={cn("pixel-render relative", sizeClass, className)}>
      <Image
        src={src}
        alt={`${characterId} ${expression}`}
        width={width}
        height={height}
        className="pixel-render h-full w-full object-contain"
        onError={(e) => {
          // Fallback to a colored placeholder
          const target = e.target as HTMLImageElement;
          target.style.display = "none";
          target.parentElement!.classList.add(
            "bg-secondary",
            "rounded-lg",
            "flex",
            "items-center",
            "justify-center"
          );
          target.parentElement!.innerHTML = `<span class="font-pixel text-xs">${characterId[0].toUpperCase()}</span>`;
        }}
      />
    </div>
  );
}
