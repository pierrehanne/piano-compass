import { describe, it, expect } from "vitest";
import { CADENCES, getCadenceById } from "@/lib/music/cadences";

describe("CADENCES", () => {
  it("has at least 5 cadences", () => {
    expect(CADENCES.length).toBeGreaterThanOrEqual(5);
  });

  it("each cadence has required fields", () => {
    CADENCES.forEach((cadence) => {
      expect(cadence.id).toBeTruthy();
      expect(cadence.name).toBeTruthy();
      expect(cadence.description).toBeTruthy();
      expect(cadence.numerals.length).toBeGreaterThan(0);
      expect(typeof cadence.getChords).toBe("function");
    });
  });
});

describe("II-V-I Major in C", () => {
  it("produces Dm7, G7, Cmaj7", () => {
    const cadence = getCadenceById("ii-V-I-major");
    expect(cadence).toBeDefined();
    const chords = cadence!.getChords("C");
    expect(chords).toHaveLength(3);
    expect(chords[0].numeral).toBe("IIm7");
    expect(chords[0].name).toBe("Dm7");
    expect(chords[1].numeral).toBe("V7");
    expect(chords[1].name).toBe("G7");
    expect(chords[2].numeral).toBe("Imaj7");
    expect(chords[2].name).toBe("Cmaj7");
  });
});

describe("II-V-I Minor in C", () => {
  it("produces Dm7b5, G7, Cm7", () => {
    const cadence = getCadenceById("ii-V-i-minor");
    expect(cadence).toBeDefined();
    const chords = cadence!.getChords("C");
    expect(chords).toHaveLength(3);
    expect(chords[0].numeral).toBe("IIm7b5");
    expect(chords[1].numeral).toBe("V7");
    expect(chords[2].numeral).toBe("Im7");
  });
});

describe("Tritone Substitution in C", () => {
  it("produces Dm7, Db7, Cmaj7", () => {
    const cadence = getCadenceById("tritone-sub");
    expect(cadence).toBeDefined();
    const chords = cadence!.getChords("C");
    expect(chords).toHaveLength(3);
    expect(chords[0].name).toBe("Dm7");
    expect(chords[1].numeral).toBe("bII7");
    expect(chords[2].name).toBe("Cmaj7");
  });
});

describe("Turnaround in C", () => {
  it("produces 4 chords", () => {
    const cadence = getCadenceById("turnaround");
    expect(cadence).toBeDefined();
    const chords = cadence!.getChords("C");
    expect(chords).toHaveLength(4);
  });
});

describe("getCadenceById", () => {
  it("returns undefined for invalid id", () => {
    expect(getCadenceById("nonexistent")).toBeUndefined();
  });
});
