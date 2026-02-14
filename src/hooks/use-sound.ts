"use client";

import { useCallback } from "react";
import { playBgMusic, stopBgMusic } from "@/lib/audio";

const SOUNDS = {
  correct: "/music/correct.mp3",
  wrong: "/music/wrong.mp3",
  "boss-defeated": "/music/boss-defeated.mp3",
  lose: "/music/lose.mp3",
  victory: "/music/play.mp3",
} as const;

type SoundName = keyof typeof SOUNDS;

export function useSound() {
  const play = useCallback((name: SoundName) => {
    const audio = new Audio(SOUNDS[name]);
    audio.volume = 0.5;
    audio.play().catch(() => {});
  }, []);

  const startBgMusic = useCallback(() => {
    playBgMusic();
  }, []);

  const stopBg = useCallback(() => {
    stopBgMusic();
  }, []);

  return { play, startBgMusic, stopBgMusic: stopBg };
}
