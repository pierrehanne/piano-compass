import { Scale, ScaleType } from "tonal";

export type JazzScaleType = {
  name: string;
  display: string;
  category:
    | "diatonic"
    | "mode"
    | "melodic-minor"
    | "jazz"
    | "pentatonic"
    | "symmetric"
    | "bebop";
};

export const JAZZ_SCALE_TYPES: JazzScaleType[] = [
  // Diatonic
  { name: "major", display: "Major (Ionian)", category: "diatonic" },
  { name: "minor", display: "Natural Minor (Aeolian)", category: "diatonic" },
  { name: "harmonic minor", display: "Harmonic Minor", category: "diatonic" },
  { name: "melodic minor", display: "Melodic Minor", category: "diatonic" },

  // Modes
  { name: "dorian", display: "Dorian", category: "mode" },
  { name: "phrygian", display: "Phrygian", category: "mode" },
  { name: "lydian", display: "Lydian", category: "mode" },
  { name: "mixolydian", display: "Mixolydian", category: "mode" },
  { name: "locrian", display: "Locrian", category: "mode" },

  // Melodic minor modes
  {
    name: "lydian dominant",
    display: "Lydian Dominant",
    category: "melodic-minor",
  },
  {
    name: "altered",
    display: "Altered (Super Locrian)",
    category: "melodic-minor",
  },

  // Jazz essentials
  { name: "blues", display: "Blues", category: "jazz" },
  { name: "bebop", display: "Bebop Dominant", category: "bebop" },
  { name: "bebop major", display: "Bebop Major", category: "bebop" },
  { name: "bebop minor", display: "Bebop Minor", category: "bebop" },

  // Pentatonic
  {
    name: "major pentatonic",
    display: "Major Pentatonic",
    category: "pentatonic",
  },
  {
    name: "minor pentatonic",
    display: "Minor Pentatonic",
    category: "pentatonic",
  },

  // Symmetric
  { name: "whole tone", display: "Whole Tone", category: "symmetric" },
  { name: "diminished", display: "Diminished (W-H)", category: "symmetric" },
  {
    name: "whole-half diminished",
    display: "Diminished (H-W)",
    category: "symmetric",
  },
  { name: "chromatic", display: "Chromatic", category: "symmetric" },
];

export function getScaleNotes(root: string, scaleName: string): string[] {
  const scale = Scale.get(`${root} ${scaleName}`);
  if (scale.empty) return [];
  return scale.notes;
}

export function getScaleIntervals(scaleName: string): string[] {
  const type = ScaleType.get(scaleName);
  if (type.empty) return [];
  return type.intervals;
}

export function searchScaleTypes(query: string): JazzScaleType[] {
  const q = query.toLowerCase().trim();
  if (!q) return JAZZ_SCALE_TYPES;
  return JAZZ_SCALE_TYPES.filter(
    (s) =>
      s.display.toLowerCase().includes(q) ||
      s.name.toLowerCase().includes(q) ||
      s.category.toLowerCase().includes(q)
  );
}
