// Single global audio manager — one theme track, no duplicates ever.

let bgAudio: HTMLAudioElement | null = null;
let bgVolume = 0.3;
let bgMuted = false;

type Listener = () => void;
const listeners = new Set<Listener>();

function notify() {
  listeners.forEach((fn) => fn());
}

export function subscribe(fn: Listener) {
  listeners.add(fn);
  return () => { listeners.delete(fn); };
}

function getOrCreateAudio(): HTMLAudioElement {
  if (!bgAudio) {
    bgAudio = new Audio("/music/theme.mp3");
    bgAudio.loop = true;
    bgAudio.volume = bgMuted ? 0 : bgVolume;
    bgAudio.addEventListener("pause", notify);
    bgAudio.addEventListener("play", notify);
  }
  return bgAudio;
}

export function playBgMusic() {
  const audio = getOrCreateAudio();
  if (audio.paused) {
    audio.play().catch(() => {});
  }
  notify();
}

export function pauseBgMusic() {
  if (bgAudio && !bgAudio.paused) {
    bgAudio.pause();
  }
  notify();
}

export function stopBgMusic() {
  if (bgAudio) {
    bgAudio.pause();
    bgAudio.currentTime = 0;
  }
  notify();
}

export function setBgVolume(v: number) {
  bgVolume = v;
  if (bgAudio) {
    bgAudio.volume = bgMuted ? 0 : v;
  }
  notify();
}

export function setBgMuted(m: boolean) {
  bgMuted = m;
  if (bgAudio) {
    bgAudio.volume = m ? 0 : bgVolume;
  }
  notify();
}

export function getBgState() {
  return {
    playing: bgAudio ? !bgAudio.paused : false,
    volume: bgVolume,
    muted: bgMuted,
    effectiveVolume: bgMuted ? 0 : bgVolume,
  };
}
