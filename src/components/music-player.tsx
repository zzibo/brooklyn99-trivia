"use client";

import { useState, useEffect, useCallback } from "react";
import {
  playBgMusic,
  pauseBgMusic,
  setBgVolume,
  setBgMuted,
  getBgState,
  subscribe,
} from "@/lib/audio";

export function MusicPlayer() {
  const [state, setState] = useState(getBgState);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    // Sync with global audio state
    return subscribe(() => setState(getBgState()));
  }, []);

  // Auto-play on first mount
  useEffect(() => {
    playBgMusic();
  }, []);

  const togglePlay = useCallback(() => {
    if (state.playing) {
      pauseBgMusic();
    } else {
      playBgMusic();
    }
  }, [state.playing]);

  return (
    <div
      className="fixed bottom-4 right-4 z-50"
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      <div className="pixel-border bg-b99-dark/90 flex items-center gap-3 rounded px-3 py-2 backdrop-blur-sm">
        {/* Volume slider — visible when expanded */}
        {expanded && state.playing && (
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={state.effectiveVolume}
            onChange={(e) => {
              const v = parseFloat(e.target.value);
              setBgVolume(v);
              if (v > 0 && state.muted) setBgMuted(false);
              if (v === 0) setBgMuted(true);
            }}
            className="h-1 w-24 cursor-pointer accent-b99-gold"
          />
        )}

        {/* Mute toggle — visible when playing */}
        {state.playing && (
          <button
            onClick={() => setBgMuted(!state.muted)}
            className="cursor-pointer text-base leading-none transition-transform hover:scale-110"
            title={state.muted ? "Unmute" : "Mute"}
          >
            {state.effectiveVolume === 0 ? "🔇" : state.effectiveVolume < 0.5 ? "🔉" : "🔊"}
          </button>
        )}

        {/* Play / Pause */}
        <button
          onClick={togglePlay}
          className="font-pixel cursor-pointer text-[8px] leading-none text-b99-cream transition-transform hover:scale-110"
          title={state.playing ? "Pause" : "Play"}
        >
          {state.playing ? "⏸" : "♪ PLAY"}
        </button>
      </div>
    </div>
  );
}
