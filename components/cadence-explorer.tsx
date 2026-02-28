"use client";

import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlaybackButton } from "@/components/playback-button";
import { CADENCES, getCadenceById } from "@/lib/music/cadences";
import { cn } from "@/lib/utils";

type CadenceExplorerProps = {
  root: string;
  selectedCadenceId: string;
  onCadenceChange: (id: string) => void;
  isPlaying: boolean;
  isLoading: boolean;
  onPlay: (chordGroups: string[][]) => void;
  onStop: () => void;
};

export function CadenceExplorer({
  root,
  selectedCadenceId,
  onCadenceChange,
  isPlaying,
  isLoading,
  onPlay,
  onStop,
}: CadenceExplorerProps) {
  const selectedCadence = useMemo(
    () => getCadenceById(selectedCadenceId),
    [selectedCadenceId]
  );

  const chords = useMemo(
    () => selectedCadence?.getChords(root) ?? [],
    [selectedCadence, root]
  );

  return (
    <div className="grid gap-4 md:grid-cols-[1fr_1fr]">
      <div className="space-y-2">
        <p className="text-muted-foreground text-sm font-medium">
          Jazz Cadences
        </p>
        <div className="space-y-1.5">
          {CADENCES.map((cadence) => (
            <Button
              key={cadence.id}
              variant={selectedCadenceId === cadence.id ? "default" : "ghost"}
              className={cn(
                "h-auto w-full justify-start px-3 py-2 text-left",
                selectedCadenceId === cadence.id && "shadow-sm"
              )}
              onClick={() => onCadenceChange(cadence.id)}
            >
              <div>
                <p className="text-sm font-medium">{cadence.name}</p>
                <p className="text-muted-foreground text-xs">
                  {cadence.numerals.join(" → ")}
                </p>
              </div>
            </Button>
          ))}
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">
              {selectedCadence?.name ?? "Select a cadence"}
              <span className="text-muted-foreground ml-2 text-sm">
                in {root}
              </span>
            </CardTitle>
            {chords.length > 0 && (
              <PlaybackButton
                isPlaying={isPlaying}
                isLoading={isLoading}
                onPlay={() => onPlay(chords.map((c) => c.notes))}
                onStop={onStop}
                label="Play"
              />
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {selectedCadence && (
            <p className="text-muted-foreground text-sm">
              {selectedCadence.description}
            </p>
          )}
          {chords.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {chords.map((chord, i) => (
                <div key={chord.numeral} className="flex items-center gap-2">
                  <div className="bg-card rounded-md border px-3 py-2 text-center">
                    <p className="text-muted-foreground text-xs font-semibold">
                      {chord.numeral}
                    </p>
                    <p className="text-sm font-bold">{chord.name}</p>
                    <div className="mt-1 flex flex-wrap justify-center gap-1">
                      {chord.notes.map((note) => (
                        <Badge
                          key={note}
                          variant="secondary"
                          className="text-[10px]"
                        >
                          {note}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  {i < chords.length - 1 && (
                    <span className="text-muted-foreground">→</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
