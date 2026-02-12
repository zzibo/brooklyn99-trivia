"use client";

import { cn } from "@/lib/utils";

interface SpeechBubbleProps {
  children: React.ReactNode;
  className?: string;
  characterName?: string;
}

export function SpeechBubble({ children, className, characterName }: SpeechBubbleProps) {
  return (
    <div className={cn("relative", className)}>
      <div className="speech-bubble pixel-border relative rounded-lg bg-card p-4 md:p-6">
        {characterName && (
          <span className="font-pixel absolute -top-3 left-4 rounded bg-primary px-2 py-1 text-[8px] text-primary-foreground md:text-[10px]">
            {characterName}
          </span>
        )}
        <div className="font-pixel text-xs leading-relaxed md:text-sm">{children}</div>
      </div>
    </div>
  );
}
