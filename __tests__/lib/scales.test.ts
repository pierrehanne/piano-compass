import { describe, it, expect } from "vitest";
import {
  getScaleNotes,
  getScaleIntervals,
  searchScaleTypes,
  JAZZ_SCALE_TYPES,
} from "@/lib/music/scales";

describe("getScaleNotes", () => {
  it("returns notes for C major scale", () => {
    const notes = getScaleNotes("C", "major");
    expect(notes).toEqual(["C", "D", "E", "F", "G", "A", "B"]);
  });

  it("returns notes for A natural minor", () => {
    const notes = getScaleNotes("A", "minor");
    expect(notes).toEqual(["A", "B", "C", "D", "E", "F", "G"]);
  });

  it("returns notes for D dorian", () => {
    const notes = getScaleNotes("D", "dorian");
    expect(notes.length).toBe(7);
    expect(notes[0]).toBe("D");
  });

  it("returns notes for C blues scale", () => {
    const notes = getScaleNotes("C", "blues");
    expect(notes.length).toBe(6);
    expect(notes[0]).toBe("C");
  });

  it("returns notes for C whole tone", () => {
    const notes = getScaleNotes("C", "whole tone");
    expect(notes.length).toBe(6);
  });

  it("returns empty array for invalid scale", () => {
    const notes = getScaleNotes("C", "nonexistent");
    expect(notes).toEqual([]);
  });
});

describe("getScaleIntervals", () => {
  it("returns intervals for major scale", () => {
    const intervals = getScaleIntervals("major");
    expect(intervals).toEqual(["1P", "2M", "3M", "4P", "5P", "6M", "7M"]);
  });

  it("returns intervals for dorian mode", () => {
    const intervals = getScaleIntervals("dorian");
    expect(intervals.length).toBe(7);
  });

  it("returns empty for invalid scale", () => {
    expect(getScaleIntervals("nonexistent")).toEqual([]);
  });
});

describe("searchScaleTypes", () => {
  it("returns all with empty query", () => {
    expect(searchScaleTypes("")).toEqual(JAZZ_SCALE_TYPES);
  });

  it("finds blues scale", () => {
    const results = searchScaleTypes("blues");
    expect(results.some((s) => s.name === "blues")).toBe(true);
  });

  it("finds by category", () => {
    const results = searchScaleTypes("pentatonic");
    expect(results.length).toBeGreaterThan(0);
  });

  it("is case-insensitive", () => {
    expect(searchScaleTypes("Dorian")).toEqual(searchScaleTypes("dorian"));
  });
});

describe("JAZZ_SCALE_TYPES", () => {
  it("has at least 15 scale types", () => {
    expect(JAZZ_SCALE_TYPES.length).toBeGreaterThanOrEqual(15);
  });
});
