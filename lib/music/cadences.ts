import { Chord, Note } from "tonal";

export type ChordInCadence = {
  numeral: string;
  name: string;
  notes: string[];
};

export type Cadence = {
  id: string;
  name: string;
  description: string;
  numerals: string[];
  getChords: (key: string) => ChordInCadence[];
};

function getIntervalFromSemitones(semitones: number): string {
  const intervals: Record<number, string> = {
    0: "1P",
    1: "2m",
    2: "2M",
    3: "3m",
    4: "3M",
    5: "4P",
    6: "4A",
    7: "5P",
    8: "6m",
    9: "6M",
    10: "7m",
    11: "7M",
  };
  const normalized = ((semitones % 12) + 12) % 12;
  return intervals[normalized] || "1P";
}

function getChordSuffix(chordType: string): string {
  const suffixes: Record<string, string> = {
    "major seventh": "maj7",
    "minor seventh": "m7",
    "dominant seventh": "7",
    "half-diminished": "m7b5",
    "diminished seventh": "dim7",
    major: "",
    minor: "m",
  };
  return suffixes[chordType] ?? chordType;
}

function buildChord(
  key: string,
  semitones: number,
  chordType: string,
  numeral: string
): ChordInCadence {
  const root = Note.transpose(key, getIntervalFromSemitones(semitones));
  const chord = Chord.get(`${root} ${chordType}`);
  return {
    numeral,
    name: `${root}${getChordSuffix(chordType)}`,
    notes: chord.notes,
  };
}

export const CADENCES: Cadence[] = [
  {
    id: "ii-V-I-major",
    name: "II-V-I Major",
    description:
      "The most common jazz cadence. A minor 7th chord resolves to a dominant 7th, then to a major 7th.",
    numerals: ["IIm7", "V7", "Imaj7"],
    getChords: (key) => [
      buildChord(key, 2, "minor seventh", "IIm7"),
      buildChord(key, 7, "dominant seventh", "V7"),
      buildChord(key, 0, "major seventh", "Imaj7"),
    ],
  },
  {
    id: "ii-V-i-minor",
    name: "II-V-I Minor",
    description:
      "The minor key version. A half-diminished chord resolves to a dominant 7th (often altered), then to a minor chord.",
    numerals: ["IIm7b5", "V7", "Im7"],
    getChords: (key) => [
      buildChord(key, 2, "half-diminished", "IIm7b5"),
      buildChord(key, 7, "dominant seventh", "V7"),
      buildChord(key, 0, "minor seventh", "Im7"),
    ],
  },
  {
    id: "tritone-sub",
    name: "Tritone Substitution",
    description:
      "The V7 chord is replaced by a dominant 7th a tritone away (bII7), creating chromatic voice leading.",
    numerals: ["IIm7", "bII7", "Imaj7"],
    getChords: (key) => [
      buildChord(key, 2, "minor seventh", "IIm7"),
      buildChord(key, 1, "dominant seventh", "bII7"),
      buildChord(key, 0, "major seventh", "Imaj7"),
    ],
  },
  {
    id: "backdoor",
    name: "Backdoor Progression",
    description:
      "An alternative resolution using bVII7 to reach the I chord, borrowed from the parallel minor key.",
    numerals: ["IVm7", "bVII7", "Imaj7"],
    getChords: (key) => [
      buildChord(key, 5, "minor seventh", "IVm7"),
      buildChord(key, 10, "dominant seventh", "bVII7"),
      buildChord(key, 0, "major seventh", "Imaj7"),
    ],
  },
  {
    id: "turnaround",
    name: "I-VI-II-V Turnaround",
    description:
      "A classic turnaround used at the end of a section to cycle back to the top.",
    numerals: ["Imaj7", "VI7", "IIm7", "V7"],
    getChords: (key) => [
      buildChord(key, 0, "major seventh", "Imaj7"),
      buildChord(key, 9, "dominant seventh", "VI7"),
      buildChord(key, 2, "minor seventh", "IIm7"),
      buildChord(key, 7, "dominant seventh", "V7"),
    ],
  },
  {
    id: "blues",
    name: "Blues Progression (I-IV-V)",
    description:
      "The foundational 12-bar blues changes using dominant 7th chords throughout.",
    numerals: ["I7", "IV7", "V7"],
    getChords: (key) => [
      buildChord(key, 0, "dominant seventh", "I7"),
      buildChord(key, 5, "dominant seventh", "IV7"),
      buildChord(key, 7, "dominant seventh", "V7"),
    ],
  },
];

export function getCadenceById(id: string): Cadence | undefined {
  return CADENCES.find((c) => c.id === id);
}
