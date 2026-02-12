"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface SceneBackgroundProps {
  scene?: string;
  children: React.ReactNode;
  className?: string;
}

const sceneColors: Record<string, string> = {
  bullpen: "from-blue-900/20 to-amber-900/20",
  "holts-office": "from-slate-900/20 to-blue-900/20",
  "shaws-bar": "from-amber-900/30 to-red-900/20",
  "evidence-room": "from-gray-900/20 to-slate-900/20",
  "interrogation-room": "from-gray-900/30 to-gray-800/20",
  "nikolajs-house": "from-green-900/20 to-amber-900/20",
};

export function SceneBackground({ scene = "bullpen", children, className }: SceneBackgroundProps) {
  const gradientClass = sceneColors[scene] || sceneColors.bullpen;

  return (
    <div className={cn("relative min-h-screen overflow-hidden", className)}>
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={`/backgrounds/${scene}.png`}
          alt={scene}
          fill
          className="pixel-render object-cover opacity-30"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
        <div className={cn("absolute inset-0 bg-gradient-to-b", gradientClass)} />
      </div>
      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
