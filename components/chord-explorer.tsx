"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IntervalDisplay } from "@/components/interval-display";
import { PlaybackButton } from "@/components/playback-button";
import {
  searchChordTypes,
  getChordNotes,
  getChordIntervals,
  type JazzChordType,
} from "@/lib/music/chords";
import { cn } from "@/lib/utils";

type ChordExplorerProps = {
  root: string;
  selectedChordType: string;
  onChordTypeChange: (type: string) => void;
  isPlaying: boolean;
  isLoading: boolean;
  onPlay: (notes: string[]) => void;
  onStop: () => void;
};

const CATEGORY_LABELS: Record<string, string> = {
  triad: "Triads",
  seventh: "7th Chords",
  extended: "Extended",
  altered: "Altered",
  sus: "Suspended",
  other: "Other",
};

export function ChordExplorer({
  root,
  selectedChordType,
  onChordTypeChange,
  isPlaying,
  isLoading,
  onPlay,
  onStop,
}: ChordExplorerProps) {
  const [search, setSearch] = useState("");

  const filteredChords = useMemo(() => searchChordTypes(search), [search]);

  const notes = useMemo(
    () => getChordNotes(root, selectedChordType),
    [root, selectedChordType]
  );

  const intervals = useMemo(
    () => getChordIntervals(selectedChordType),
    [selectedChordType]
  );

  const grouped = useMemo(() => {
    const groups: Record<string, JazzChordType[]> = {};
    filteredChords.forEach((chord) => {
      if (!groups[chord.category]) groups[chord.category] = [];
      groups[chord.category].push(chord);
    });
    return groups;
  }, [filteredChords]);

  const selectedDisplay = filteredChords.find(
    (c) => c.name === selectedChordType
  )?.display;

  return (
    <div className="grid gap-4 md:grid-cols-[1fr_1fr]">
      <div className="space-y-3">
        <Input
          placeholder="Search chord types..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-9"
        />
        <div className="max-h-[400px] space-y-3 overflow-y-auto pr-1">
          {Object.entries(grouped).map(([category, chords]) => (
            <div key={category}>
              <p className="text-muted-foreground mb-1 text-xs font-semibold tracking-wider uppercase">
                {CATEGORY_LABELS[category] || category}
              </p>
              <div className="flex flex-wrap gap-1">
                {chords.map((chord) => (
                  <Button
                    key={chord.name}
                    variant={
                      selectedChordType === chord.name ? "default" : "ghost"
                    }
                    size="sm"
                    className={cn(
                      "h-7 text-xs",
                      selectedChordType === chord.name && "shadow-sm"
                    )}
                    onClick={() => onChordTypeChange(chord.name)}
                  >
                    {chord.display}
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">
              {root}
              {selectedDisplay && (
                <span className="text-muted-foreground ml-1">
                  {selectedDisplay}
                </span>
              )}
            </CardTitle>
            <PlaybackButton
              isPlaying={isPlaying}
              isLoading={isLoading}
              onPlay={() => onPlay(notes)}
              onStop={onStop}
              label="Play Chord"
            />
          </div>
        </CardHeader>
        <CardContent>
          <IntervalDisplay notes={notes} intervals={intervals} />
        </CardContent>
      </Card>
    </div>
  );
}
