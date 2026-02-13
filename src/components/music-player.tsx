"use client";

import { useRef, useState, useEffect, useCallback } from "react";

const MUSIC_SRC = "/music/theme.mp3";

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [volume, setVolume] = useState(0.3);
  const [muted, setMuted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const audio = new Audio(MUSIC_SRC);
    audio.loop = true;
    audio.volume = volume;
    audioRef.current = audio;

    audio.play().then(() => setPlaying(true)).catch(() => {});

    return () => {
      audio.pause();
      audio.src = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = muted ? 0 : volume;
    }
  }, [volume, muted]);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => {});
    }
  }, [playing]);

  const effectiveVolume = muted ? 0 : volume;
  const speakerIcon =
    !playing ? "♪" : effectiveVolume === 0 ? "🔇" : effectiveVolume < 0.5 ? "🔉" : "🔊";

  return (
    <div
      className="fixed bottom-4 right-4 z-50"
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      <div className="pixel-border bg-b99-dark/90 flex items-center gap-3 rounded px-3 py-2 backdrop-blur-sm">
        {/* Volume slider — visible when expanded */}
        {expanded && playing && (
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={effectiveVolume}
            onChange={(e) => {
              const v = parseFloat(e.target.value);
              setVolume(v);
              if (v > 0 && muted) setMuted(false);
              if (v === 0) setMuted(true);
            }}
            className="h-1 w-24 cursor-pointer accent-b99-gold"
          />
        )}

        {/* Mute toggle — visible when playing */}
        {playing && (
          <button
            onClick={() => setMuted((m) => !m)}
            className="cursor-pointer text-base leading-none transition-transform hover:scale-110"
            title={muted ? "Unmute" : "Mute"}
          >
            {effectiveVolume === 0 ? "🔇" : effectiveVolume < 0.5 ? "🔉" : "🔊"}
          </button>
        )}

        {/* Play / Pause */}
        <button
          onClick={togglePlay}
          className="font-pixel cursor-pointer text-[8px] leading-none text-b99-cream transition-transform hover:scale-110"
          title={playing ? "Pause" : "Play"}
        >
          {playing ? "⏸" : "♪ PLAY"}
        </button>
      </div>
    </div>
  );
}
