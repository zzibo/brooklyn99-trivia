"use client";

import { cn } from "@/lib/utils";

interface HealthBarProps {
  value: number; // 0-100
  label?: string;
  className?: string;
  color?: "green" | "blue" | "gold" | "red" | "yellow";
}

const colorClasses = {
  green: "bg-hp-green",
  blue: "bg-blue-500",
  gold: "bg-hp-yellow",
  red: "bg-hp-red",
  yellow: "bg-hp-yellow",
};

export function HealthBar({ value, label, className, color = "red" }: HealthBarProps) {
  const clampedValue = Math.max(0, Math.min(100, value));
  
  // Dynamic color based on HP percentage
  const getHealthColor = () => {
    if (clampedValue > 50) return "bg-hp-green";
    if (clampedValue > 20) return "bg-hp-yellow";
    return "bg-hp-red";
  };

  return (
    <div className={cn("w-full", className)}>
      {label && (
        <div className="font-pixel mb-1 text-[10px]">
          <span>{label}</span>
        </div>
      )}
      <div className="h-4 overflow-hidden rounded border-2 border-gray-800 bg-gray-200 p-0.5">
        <div
          className={cn(
            "h-full rounded-sm transition-all duration-500",
            color === "red" ? getHealthColor() : colorClasses[color]
          )}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    </div>
  );
}
