"use client";

import { useState, useCallback, useRef } from "react";
import {
  initAudio,
  playChord,
  playScale,
  playCadence,
  playNote,
  stopPlayback,
  isAudioInitialized,
} from "@/lib/music/audio";

export function useAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const ensureInit = useCallback(async () => {
    if (!isAudioInitialized()) {
      setIsLoading(true);
      await initAudio();
      setIsLoading(false);
    }
  }, []);

  const handlePlayNote = useCallback(
    async (note: string) => {
      await ensureInit();
      await playNote(note);
    },
    [ensureInit]
  );

  const handlePlayChord = useCallback(
    async (notes: string[]) => {
      await ensureInit();
      setIsPlaying(true);
      await playChord(notes);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setIsPlaying(false), 2000);
    },
    [ensureInit]
  );

  const handlePlayScale = useCallback(
    async (notes: string[]) => {
      await ensureInit();
      setIsPlaying(true);
      await playScale(notes);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      const duration = notes.length * 400 + 500;
      timeoutRef.current = setTimeout(() => setIsPlaying(false), duration);
    },
    [ensureInit]
  );

  const handlePlayCadence = useCallback(
    async (chordGroups: string[][]) => {
      await ensureInit();
      setIsPlaying(true);
      await playCadence(chordGroups);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      const duration = chordGroups.length * 1500 + 500;
      timeoutRef.current = setTimeout(() => setIsPlaying(false), duration);
    },
    [ensureInit]
  );

  const handleStop = useCallback(() => {
    stopPlayback();
    setIsPlaying(false);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  return {
    isPlaying,
    isLoading,
    playNote: handlePlayNote,
    playChord: handlePlayChord,
    playScale: handlePlayScale,
    playCadence: handlePlayCadence,
    stop: handleStop,
  };
}
