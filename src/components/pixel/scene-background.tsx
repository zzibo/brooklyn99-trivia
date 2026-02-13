"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface SceneBackgroundProps {
  scene?: string;
  children: React.ReactNode;
  className?: string;
}

const sceneColors: Record<string, string> = {
  bullpen: "from-blue-800/30 to-slate-700/30",
  "holts-office": "from-slate-800/30 to-blue-900/30",
  "shaws-bar": "from-amber-800/30 to-orange-900/30",
  "evidence-room": "from-gray-800/30 to-slate-800/30",
  "interrogation-room": "from-gray-800/40 to-slate-900/40",
  "nikolajs-house": "from-teal-800/30 to-blue-900/30",
};

export function SceneBackground({ scene = "bullpen", children, className }: SceneBackgroundProps) {
  const gradientClass = sceneColors[scene] || sceneColors.bullpen;

  return (
    <div className={cn("relative min-h-screen overflow-hidden", className)}>
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/backgrounds/insidebg.png"
          alt={scene}
          fill
          className="object-cover"
          priority
        />
        <div className={cn("absolute inset-0 bg-gradient-to-b", gradientClass)} />
      </div>
      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
