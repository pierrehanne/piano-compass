import { Note } from "tonal";

export type CircleKey = {
  major: string;
  minor: string;
  sharps: number;
  flats: number;
  position: number;
};

export const CIRCLE_OF_FIFTHS: CircleKey[] = [
  { major: "C", minor: "Am", sharps: 0, flats: 0, position: 0 },
  { major: "G", minor: "Em", sharps: 1, flats: 0, position: 1 },
  { major: "D", minor: "Bm", sharps: 2, flats: 0, position: 2 },
  { major: "A", minor: "F#m", sharps: 3, flats: 0, position: 3 },
  { major: "E", minor: "C#m", sharps: 4, flats: 0, position: 4 },
  { major: "B", minor: "G#m", sharps: 5, flats: 0, position: 5 },
  { major: "F#/Gb", minor: "D#m/Ebm", sharps: 6, flats: 6, position: 6 },
  { major: "Db", minor: "Bbm", sharps: 0, flats: 5, position: 7 },
  { major: "Ab", minor: "Fm", sharps: 0, flats: 4, position: 8 },
  { major: "Eb", minor: "Cm", sharps: 0, flats: 3, position: 9 },
  { major: "Bb", minor: "Gm", sharps: 0, flats: 2, position: 10 },
  { major: "F", minor: "Dm", sharps: 0, flats: 1, position: 11 },
];

export function getKeySignatureDisplay(key: CircleKey): string {
  if (key.sharps === 0 && key.flats === 0) return "No sharps or flats";
  if (key.sharps > 0 && key.flats === 0)
    return `${key.sharps} sharp${key.sharps > 1 ? "s" : ""}`;
  if (key.flats > 0 && key.sharps === 0)
    return `${key.flats} flat${key.flats > 1 ? "s" : ""}`;
  return `${key.sharps} sharps / ${key.flats} flats`;
}

export function getRelatedKeys(majorKey: string) {
  const root = majorKey.split("/")[0];
  return {
    dominant: Note.transpose(root, "5P"),
    subdominant: Note.transpose(root, "4P"),
    relativeMinor: Note.transpose(root, "-3m"),
    parallelMinor: root + "m",
  };
}

export function getCircleKeyByName(name: string): CircleKey | undefined {
  return CIRCLE_OF_FIFTHS.find(
    (k) =>
      k.major === name ||
      k.major.includes(name) ||
      k.minor === name ||
      k.minor.includes(name)
  );
}
