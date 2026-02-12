"use client";

import { cn } from "@/lib/utils";

interface HealthBarProps {
  value: number; // 0-100
  label?: string;
  className?: string;
  color?: "green" | "blue" | "gold";
}

const colorClasses = {
  green: "bg-stardew-green",
  blue: "bg-b99-blue",
  gold: "bg-stardew-gold",
};

export function HealthBar({ value, label, className, color = "green" }: HealthBarProps) {
  const clampedValue = Math.max(0, Math.min(100, value));

  return (
    <div className={cn("w-full", className)}>
      {label && (
        <div className="font-pixel mb-1 flex justify-between text-[8px]">
          <span>{label}</span>
          <span>{Math.round(clampedValue)}%</span>
        </div>
      )}
      <div className="pixel-border h-4 overflow-hidden rounded bg-muted p-0.5">
        <div
          className={cn(
            "h-full rounded-sm transition-all duration-500",
            colorClasses[color]
          )}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    </div>
  );
}
