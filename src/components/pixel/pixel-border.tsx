"use client";

import { cn } from "@/lib/utils";

interface PixelBorderProps {
  children: React.ReactNode;
  className?: string;
}

export function PixelBorder({ children, className }: PixelBorderProps) {
  return <div className={cn("pixel-border rounded-lg bg-card p-4", className)}>{children}</div>;
}
