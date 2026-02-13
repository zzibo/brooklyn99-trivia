"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Expression } from "@/lib/types";

interface CharacterSpriteProps {
  characterId: string;
  expression?: Expression;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
  className?: string;
  cropBottom?: boolean;
}

const sizeMap = {
  sm: { width: 64, height: 64, className: "w-16 h-16" },
  md: { width: 96, height: 96, className: "w-24 h-24" },
  lg: { width: 128, height: 128, className: "w-32 h-32" },
  xl: { width: 192, height: 192, className: "w-48 h-48" },
  "2xl": { width: 320, height: 320, className: "w-80 h-80" },
  "3xl": { width: 400, height: 400, className: "w-[400px] h-[400px]" },
};

export function CharacterSprite({
  characterId,
  expression = "neutral",
  size = "md",
  className,
  cropBottom = false,
}: CharacterSpriteProps) {
  const { width, height, className: sizeClass } = sizeMap[size];
  const src = `/sprites/${characterId}-${expression}.png`;

  return (
    <div className={cn("pixel-render relative", sizeClass, className, cropBottom && "overflow-hidden")}>
      <Image
        src={src}
        alt={`${characterId} ${expression}`}
        width={width}
        height={height}
        className={cn(
          "pixel-render h-full w-full object-contain",
          cropBottom && "object-top"
        )}
        style={cropBottom ? { objectPosition: "top", height: "60%" } : undefined}
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
