import { describe, it, expect } from "vitest";
import {
  CIRCLE_OF_FIFTHS,
  getKeySignatureDisplay,
  getRelatedKeys,
  getCircleKeyByName,
} from "@/lib/music/circle-of-fifths";

describe("CIRCLE_OF_FIFTHS", () => {
  it("has 12 keys", () => {
    expect(CIRCLE_OF_FIFTHS).toHaveLength(12);
  });

  it("starts with C (no sharps or flats)", () => {
    expect(CIRCLE_OF_FIFTHS[0].major).toBe("C");
    expect(CIRCLE_OF_FIFTHS[0].sharps).toBe(0);
    expect(CIRCLE_OF_FIFTHS[0].flats).toBe(0);
  });

  it("each key has a major and minor", () => {
    CIRCLE_OF_FIFTHS.forEach((key) => {
      expect(key.major).toBeTruthy();
      expect(key.minor).toBeTruthy();
    });
  });
});

describe("getKeySignatureDisplay", () => {
  it("displays C as no sharps or flats", () => {
    expect(getKeySignatureDisplay(CIRCLE_OF_FIFTHS[0])).toBe(
      "No sharps or flats"
    );
  });

  it("displays G as 1 sharp", () => {
    expect(getKeySignatureDisplay(CIRCLE_OF_FIFTHS[1])).toBe("1 sharp");
  });

  it("displays D as 2 sharps", () => {
    expect(getKeySignatureDisplay(CIRCLE_OF_FIFTHS[2])).toBe("2 sharps");
  });

  it("displays F as 1 flat", () => {
    expect(getKeySignatureDisplay(CIRCLE_OF_FIFTHS[11])).toBe("1 flat");
  });

  it("displays Bb as 2 flats", () => {
    expect(getKeySignatureDisplay(CIRCLE_OF_FIFTHS[10])).toBe("2 flats");
  });
});

describe("getRelatedKeys", () => {
  it("returns correct related keys for C", () => {
    const related = getRelatedKeys("C");
    expect(related.dominant).toBe("G");
    expect(related.subdominant).toBe("F");
  });

  it("returns correct related keys for G", () => {
    const related = getRelatedKeys("G");
    expect(related.dominant).toBe("D");
    expect(related.subdominant).toBe("C");
  });
});

describe("getCircleKeyByName", () => {
  it("finds C major", () => {
    const key = getCircleKeyByName("C");
    expect(key?.major).toBe("C");
  });

  it("finds by minor key name", () => {
    const key = getCircleKeyByName("Am");
    expect(key?.major).toBe("C");
  });

  it("returns undefined for nonexistent", () => {
    expect(getCircleKeyByName("X#")).toBeUndefined();
  });
});
