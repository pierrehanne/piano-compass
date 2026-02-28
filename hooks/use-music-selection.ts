"use client";

import { useState, useCallback } from "react";

export type ExplorerMode = "chord" | "scale" | "cadence" | "circle";

export type MusicSelection = {
  root: string;
  mode: ExplorerMode;
  chordType: string;
  scaleType: string;
  cadenceId: string;
};

const DEFAULT_SELECTION: MusicSelection = {
  root: "C",
  mode: "chord",
  chordType: "major seventh",
  scaleType: "major",
  cadenceId: "ii-V-I-major",
};

export function useMusicSelection() {
  const [selection, setSelection] = useState<MusicSelection>(DEFAULT_SELECTION);

  const setRoot = useCallback((root: string) => {
    setSelection((prev) => ({ ...prev, root }));
  }, []);

  const setMode = useCallback((mode: ExplorerMode) => {
    setSelection((prev) => ({ ...prev, mode }));
  }, []);

  const setChordType = useCallback((chordType: string) => {
    setSelection((prev) => ({ ...prev, chordType }));
  }, []);

  const setScaleType = useCallback((scaleType: string) => {
    setSelection((prev) => ({ ...prev, scaleType }));
  }, []);

  const setCadenceId = useCallback((cadenceId: string) => {
    setSelection((prev) => ({ ...prev, cadenceId }));
  }, []);

  return {
    selection,
    setRoot,
    setMode,
    setChordType,
    setScaleType,
    setCadenceId,
  };
}
