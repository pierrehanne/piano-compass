"use client";

import { Play, Square, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type PlaybackButtonProps = {
  isPlaying: boolean;
  isLoading: boolean;
  onPlay: () => void;
  onStop: () => void;
  label?: string;
};

export function PlaybackButton({
  isPlaying,
  isLoading,
  onPlay,
  onStop,
  label = "Play",
}: PlaybackButtonProps) {
  if (isLoading) {
    return (
      <Button variant="outline" size="sm" disabled>
        <Loader2 className="mr-1 h-4 w-4 animate-spin" />
        Loading...
      </Button>
    );
  }

  if (isPlaying) {
    return (
      <Button variant="outline" size="sm" onClick={onStop}>
        <Square className="mr-1 h-4 w-4" />
        Stop
      </Button>
    );
  }

  return (
    <Button variant="outline" size="sm" onClick={onPlay}>
      <Play className="mr-1 h-4 w-4" />
      {label}
    </Button>
  );
}
