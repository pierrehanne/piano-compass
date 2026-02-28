"use client";

import { cn } from "@/lib/utils";
import { Note } from "tonal";

type PianoKeyboardProps = {
  highlightedNotes: string[];
  onNoteClick?: (note: string) => void;
  startOctave?: number;
  octaves?: number;
};

const WHITE_KEYS = ["C", "D", "E", "F", "G", "A", "B"];
const BLACK_KEY_MAP: Record<string, string> = {
  C: "C#",
  D: "D#",
  F: "F#",
  G: "G#",
  A: "A#",
};

const BLACK_KEY_OFFSETS: Record<string, number> = {
  "C#": 0.6,
  "D#": 1.75,
  "F#": 3.6,
  "G#": 4.7,
  "A#": 5.8,
};

function isHighlighted(noteName: string, highlightedNotes: string[]): boolean {
  const pc = Note.pitchClass(noteName);
  return highlightedNotes.some((n) => {
    const hpc = Note.pitchClass(n);
    return (
      hpc === pc || Note.enharmonic(hpc) === pc || hpc === Note.enharmonic(pc)
    );
  });
}

export function PianoKeyboard({
  highlightedNotes,
  onNoteClick,
  startOctave = 3,
  octaves = 2,
}: PianoKeyboardProps) {
  const whiteKeyWidth = 40;
  const whiteKeyHeight = 140;
  const blackKeyWidth = 24;
  const blackKeyHeight = 88;

  const allWhiteKeys: { note: string; x: number }[] = [];
  const allBlackKeys: { note: string; x: number }[] = [];

  for (let oct = 0; oct < octaves; oct++) {
    const octave = startOctave + oct;
    WHITE_KEYS.forEach((key, i) => {
      const x = (oct * 7 + i) * whiteKeyWidth;
      allWhiteKeys.push({ note: `${key}${octave}`, x });
      const blackName = BLACK_KEY_MAP[key];
      if (blackName) {
        const offset = BLACK_KEY_OFFSETS[blackName];
        allBlackKeys.push({
          note: `${blackName}${octave}`,
          x: (oct * 7 + offset) * whiteKeyWidth,
        });
      }
    });
  }

  const totalWidth = octaves * 7 * whiteKeyWidth;

  return (
    <div className="bg-card overflow-x-auto rounded-lg border p-3">
      <svg
        viewBox={`0 0 ${totalWidth} ${whiteKeyHeight}`}
        className="mx-auto h-auto w-full max-w-2xl"
        role="img"
        aria-label="Piano keyboard"
      >
        {allWhiteKeys.map(({ note, x }) => {
          const highlighted = isHighlighted(note, highlightedNotes);
          return (
            <g key={note}>
              <rect
                x={x + 1}
                y={0}
                width={whiteKeyWidth - 2}
                height={whiteKeyHeight}
                rx={3}
                className={cn(
                  "stroke-border cursor-pointer transition-colors",
                  highlighted
                    ? "fill-primary/80 stroke-primary"
                    : "fill-white dark:fill-zinc-100"
                )}
                onClick={() => onNoteClick?.(note)}
              />
              <text
                x={x + whiteKeyWidth / 2}
                y={whiteKeyHeight - 10}
                textAnchor="middle"
                className={cn(
                  "pointer-events-none text-[10px] font-medium select-none",
                  highlighted
                    ? "fill-primary-foreground"
                    : "fill-muted-foreground"
                )}
              >
                {Note.pitchClass(note)}
              </text>
            </g>
          );
        })}
        {allBlackKeys.map(({ note, x }) => {
          const highlighted = isHighlighted(note, highlightedNotes);
          return (
            <g key={note}>
              <rect
                x={x}
                y={0}
                width={blackKeyWidth}
                height={blackKeyHeight}
                rx={2}
                className={cn(
                  "cursor-pointer transition-colors",
                  highlighted
                    ? "fill-primary stroke-primary"
                    : "fill-zinc-800 stroke-zinc-700 dark:fill-zinc-900 dark:stroke-zinc-800"
                )}
                onClick={() => onNoteClick?.(note)}
              />
              {highlighted && (
                <text
                  x={x + blackKeyWidth / 2}
                  y={blackKeyHeight - 8}
                  textAnchor="middle"
                  className="fill-primary-foreground pointer-events-none text-[8px] font-medium select-none"
                >
                  {Note.pitchClass(note)}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
