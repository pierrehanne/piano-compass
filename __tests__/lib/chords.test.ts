import { describe, it, expect } from "vitest";
import {
  getChordNotes,
  getChordIntervals,
  searchChordTypes,
  JAZZ_CHORD_TYPES,
} from "@/lib/music/chords";

describe("getChordNotes", () => {
  it("returns notes for C major", () => {
    const notes = getChordNotes("C", "major");
    expect(notes).toEqual(["C", "E", "G"]);
  });

  it("returns notes for C major seventh", () => {
    const notes = getChordNotes("C", "major seventh");
    expect(notes).toEqual(["C", "E", "G", "B"]);
  });

  it("returns notes for D minor seventh", () => {
    const notes = getChordNotes("D", "minor seventh");
    expect(notes).toEqual(["D", "F", "A", "C"]);
  });

  it("returns notes for G dominant seventh", () => {
    const notes = getChordNotes("G", "dominant seventh");
    expect(notes).toEqual(["G", "B", "D", "F"]);
  });

  it("returns notes for A half-diminished", () => {
    const notes = getChordNotes("A", "half-diminished");
    expect(notes.length).toBe(4);
    expect(notes[0]).toBe("A");
  });

  it("returns empty array for invalid chord", () => {
    const notes = getChordNotes("C", "nonexistent chord xyz");
    expect(notes).toEqual([]);
  });

  it("works with sharp roots", () => {
    const notes = getChordNotes("F#", "minor seventh");
    expect(notes.length).toBe(4);
    expect(notes[0]).toBe("F#");
  });
});

describe("getChordIntervals", () => {
  it("returns intervals for major triad", () => {
    const intervals = getChordIntervals("major");
    expect(intervals).toEqual(["1P", "3M", "5P"]);
  });

  it("returns intervals for dominant seventh", () => {
    const intervals = getChordIntervals("dominant seventh");
    expect(intervals).toEqual(["1P", "3M", "5P", "7m"]);
  });

  it("returns empty array for unknown chord type", () => {
    const intervals = getChordIntervals("nonexistent");
    expect(intervals).toEqual([]);
  });
});

describe("searchChordTypes", () => {
  it("returns all chord types with empty query", () => {
    expect(searchChordTypes("")).toEqual(JAZZ_CHORD_TYPES);
  });

  it("filters by display name", () => {
    const results = searchChordTypes("Maj7");
    expect(results.length).toBeGreaterThan(0);
    expect(results.some((c) => c.display === "Maj7")).toBe(true);
  });

  it("filters by category", () => {
    const results = searchChordTypes("seventh");
    expect(results.length).toBeGreaterThan(0);
    results.forEach((c) => {
      const matchesCategory = c.category.includes("seventh");
      const matchesName = c.name.includes("seventh");
      const matchesDisplay = c.display.toLowerCase().includes("seventh");
      expect(matchesCategory || matchesName || matchesDisplay).toBe(true);
    });
  });

  it("is case-insensitive", () => {
    const lower = searchChordTypes("major");
    const upper = searchChordTypes("MAJOR");
    expect(lower).toEqual(upper);
  });
});

describe("JAZZ_CHORD_TYPES", () => {
  it("has at least 20 chord types", () => {
    expect(JAZZ_CHORD_TYPES.length).toBeGreaterThanOrEqual(20);
  });

  it("each chord type has required fields", () => {
    JAZZ_CHORD_TYPES.forEach((chord) => {
      expect(chord.name).toBeTruthy();
      expect(chord.display).toBeTruthy();
      expect(chord.category).toBeTruthy();
      expect(chord.aliases.length).toBeGreaterThan(0);
    });
  });
});
