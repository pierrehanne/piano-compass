import { Note } from "tonal";

export const SHARP_NOTES = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
] as const;

export const FLAT_NOTES = [
  "C",
  "Db",
  "D",
  "Eb",
  "E",
  "F",
  "Gb",
  "G",
  "Ab",
  "A",
  "Bb",
  "B",
] as const;

export const ROOT_NOTES = [
  { name: "C", display: "C" },
  { name: "C#", display: "C# / Db" },
  { name: "D", display: "D" },
  { name: "D#", display: "D# / Eb" },
  { name: "E", display: "E" },
  { name: "F", display: "F" },
  { name: "F#", display: "F# / Gb" },
  { name: "G", display: "G" },
  { name: "G#", display: "G# / Ab" },
  { name: "A", display: "A" },
  { name: "A#", display: "A# / Bb" },
  { name: "B", display: "B" },
] as const;

export function getEnharmonic(note: string): string {
  return Note.enharmonic(note) || note;
}

export function noteToMidi(note: string): number | null {
  return Note.midi(note) ?? null;
}

export function simplifyNote(note: string): string {
  return Note.simplify(note) || note;
}

export function isNaturalNote(note: string): boolean {
  const name = Note.get(note);
  return name.acc === "";
}
