"use client";

import { useRef, useCallback } from "react";

const SOUNDS = {
  correct: "/music/correct.mp3",
  wrong: "/music/wrong.mp3",
  "boss-defeated": "/music/boss-defeated.mp3",
  lose: "/music/lose.mp3",
  victory: "/music/play.mp3",
} as const;

type SoundName = keyof typeof SOUNDS;

export function useSound() {
  const bgRef = useRef<HTMLAudioElement | null>(null);

  const play = useCallback((name: SoundName) => {
    const audio = new Audio(SOUNDS[name]);
    audio.volume = 0.5;
    audio.play().catch(() => {});
  }, []);

  const startBgMusic = useCallback(() => {
    if (bgRef.current) return;
    const audio = new Audio("/music/theme.mp3");
    audio.loop = true;
    audio.volume = 0.2;
    audio.play().catch(() => {});
    bgRef.current = audio;
  }, []);

  const stopBgMusic = useCallback(() => {
    if (bgRef.current) {
      bgRef.current.pause();
      bgRef.current.src = "";
      bgRef.current = null;
    }
  }, []);

  return { play, startBgMusic, stopBgMusic };
}
