"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IntervalDisplay } from "@/components/interval-display";
import { PlaybackButton } from "@/components/playback-button";
import {
  searchScaleTypes,
  getScaleNotes,
  getScaleIntervals,
  type JazzScaleType,
} from "@/lib/music/scales";
import { cn } from "@/lib/utils";

type ScaleExplorerProps = {
  root: string;
  selectedScaleType: string;
  onScaleTypeChange: (type: string) => void;
  isPlaying: boolean;
  isLoading: boolean;
  onPlay: (notes: string[]) => void;
  onStop: () => void;
};

const CATEGORY_LABELS: Record<string, string> = {
  diatonic: "Diatonic",
  mode: "Modes",
  "melodic-minor": "Melodic Minor Modes",
  jazz: "Jazz",
  bebop: "Bebop",
  pentatonic: "Pentatonic",
  symmetric: "Symmetric",
};

export function ScaleExplorer({
  root,
  selectedScaleType,
  onScaleTypeChange,
  isPlaying,
  isLoading,
  onPlay,
  onStop,
}: ScaleExplorerProps) {
  const [search, setSearch] = useState("");

  const filteredScales = useMemo(() => searchScaleTypes(search), [search]);

  const notes = useMemo(
    () => getScaleNotes(root, selectedScaleType),
    [root, selectedScaleType]
  );

  const intervals = useMemo(
    () => getScaleIntervals(selectedScaleType),
    [selectedScaleType]
  );

  const grouped = useMemo(() => {
    const groups: Record<string, JazzScaleType[]> = {};
    filteredScales.forEach((scale) => {
      if (!groups[scale.category]) groups[scale.category] = [];
      groups[scale.category].push(scale);
    });
    return groups;
  }, [filteredScales]);

  const selectedDisplay = filteredScales.find(
    (s) => s.name === selectedScaleType
  )?.display;

  return (
    <div className="grid gap-4 md:grid-cols-[1fr_1fr]">
      <div className="space-y-3">
        <Input
          placeholder="Search scale types..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-9"
        />
        <div className="max-h-[400px] space-y-3 overflow-y-auto pr-1">
          {Object.entries(grouped).map(([category, scales]) => (
            <div key={category}>
              <p className="text-muted-foreground mb-1 text-xs font-semibold tracking-wider uppercase">
                {CATEGORY_LABELS[category] || category}
              </p>
              <div className="flex flex-wrap gap-1">
                {scales.map((scale) => (
                  <Button
                    key={scale.name}
                    variant={
                      selectedScaleType === scale.name ? "default" : "ghost"
                    }
                    size="sm"
                    className={cn(
                      "h-7 text-xs",
                      selectedScaleType === scale.name && "shadow-sm"
                    )}
                    onClick={() => onScaleTypeChange(scale.name)}
                  >
                    {scale.display}
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
              {root}{" "}
              {selectedDisplay && (
                <span className="text-muted-foreground">{selectedDisplay}</span>
              )}
            </CardTitle>
            <PlaybackButton
              isPlaying={isPlaying}
              isLoading={isLoading}
              onPlay={() => onPlay(notes)}
              onStop={onStop}
              label="Play Scale"
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
