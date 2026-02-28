import { Chord, ChordType } from "tonal";

export type JazzChordType = {
  name: string;
  aliases: string[];
  display: string;
  category: "triad" | "seventh" | "extended" | "altered" | "sus" | "other";
};

export const JAZZ_CHORD_TYPES: JazzChordType[] = [
  // Triads
  { name: "major", aliases: ["M", "maj"], display: "Major", category: "triad" },
  { name: "minor", aliases: ["m", "min"], display: "Minor", category: "triad" },
  {
    name: "diminished",
    aliases: ["dim", "o"],
    display: "Dim",
    category: "triad",
  },
  {
    name: "augmented",
    aliases: ["aug", "+"],
    display: "Aug",
    category: "triad",
  },

  // Seventh chords
  {
    name: "major seventh",
    aliases: ["maj7", "M7"],
    display: "Maj7",
    category: "seventh",
  },
  {
    name: "minor seventh",
    aliases: ["m7", "min7"],
    display: "m7",
    category: "seventh",
  },
  {
    name: "dominant seventh",
    aliases: ["7", "dom7"],
    display: "7",
    category: "seventh",
  },
  {
    name: "diminished seventh",
    aliases: ["dim7", "o7"],
    display: "dim7",
    category: "seventh",
  },
  {
    name: "half-diminished",
    aliases: ["m7b5", "ø"],
    display: "m7b5",
    category: "seventh",
  },
  {
    name: "minor/major seventh",
    aliases: ["mMaj7", "mM7"],
    display: "m(Maj7)",
    category: "seventh",
  },
  {
    name: "augmented seventh",
    aliases: ["aug7", "+7"],
    display: "Aug7",
    category: "seventh",
  },

  // Extended
  {
    name: "major ninth",
    aliases: ["maj9", "M9"],
    display: "Maj9",
    category: "extended",
  },
  {
    name: "minor ninth",
    aliases: ["m9", "min9"],
    display: "m9",
    category: "extended",
  },
  {
    name: "dominant ninth",
    aliases: ["9"],
    display: "9",
    category: "extended",
  },
  {
    name: "major eleventh",
    aliases: ["maj11", "M11"],
    display: "Maj11",
    category: "extended",
  },
  {
    name: "minor eleventh",
    aliases: ["m11", "min11"],
    display: "m11",
    category: "extended",
  },
  { name: "eleventh", aliases: ["11"], display: "11", category: "extended" },
  {
    name: "major thirteenth",
    aliases: ["maj13", "M13"],
    display: "Maj13",
    category: "extended",
  },
  {
    name: "minor thirteenth",
    aliases: ["m13", "min13"],
    display: "m13",
    category: "extended",
  },
  { name: "thirteenth", aliases: ["13"], display: "13", category: "extended" },

  // Altered
  {
    name: "dominant flat nine",
    aliases: ["7b9"],
    display: "7b9",
    category: "altered",
  },
  {
    name: "dominant sharp nine",
    aliases: ["7#9"],
    display: "7#9",
    category: "altered",
  },
  {
    name: "altered",
    aliases: ["alt", "alt7"],
    display: "Alt",
    category: "altered",
  },

  // Sus
  {
    name: "suspended second",
    aliases: ["sus2"],
    display: "sus2",
    category: "sus",
  },
  {
    name: "suspended fourth",
    aliases: ["sus4"],
    display: "sus4",
    category: "sus",
  },
  {
    name: "seventh suspended fourth",
    aliases: ["7sus4"],
    display: "7sus4",
    category: "sus",
  },

  // Other
  { name: "sixth", aliases: ["6", "add6"], display: "6", category: "other" },
  {
    name: "minor sixth",
    aliases: ["m6", "min6"],
    display: "m6",
    category: "other",
  },
  {
    name: "added ninth",
    aliases: ["add9", "add2"],
    display: "add9",
    category: "other",
  },
];

export function getChordNotes(root: string, chordName: string): string[] {
  const chord = Chord.get(`${root} ${chordName}`);
  if (chord.empty) {
    const byAlias = JAZZ_CHORD_TYPES.find(
      (c) =>
        c.display.toLowerCase() === chordName.toLowerCase() ||
        c.aliases.some((a) => a.toLowerCase() === chordName.toLowerCase())
    );
    if (byAlias) {
      const retry = Chord.get(`${root} ${byAlias.name}`);
      return retry.notes;
    }
    return [];
  }
  return chord.notes;
}

export function getChordIntervals(chordName: string): string[] {
  const type = ChordType.get(chordName);
  if (type.empty) {
    const byAlias = JAZZ_CHORD_TYPES.find(
      (c) =>
        c.display.toLowerCase() === chordName.toLowerCase() ||
        c.aliases.some((a) => a.toLowerCase() === chordName.toLowerCase())
    );
    if (byAlias) {
      return ChordType.get(byAlias.name).intervals;
    }
    return [];
  }
  return type.intervals;
}

export function searchChordTypes(query: string): JazzChordType[] {
  const q = query.toLowerCase().trim();
  if (!q) return JAZZ_CHORD_TYPES;
  return JAZZ_CHORD_TYPES.filter(
    (c) =>
      c.display.toLowerCase().includes(q) ||
      c.name.toLowerCase().includes(q) ||
      c.category.toLowerCase().includes(q) ||
      c.aliases.some((a) => a.toLowerCase().includes(q))
  );
}
