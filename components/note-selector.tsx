"use client";

import { ROOT_NOTES } from "@/lib/music/notes";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type NoteSelectorProps = {
  selected: string;
  onChange: (note: string) => void;
};

export function NoteSelector({ selected, onChange }: NoteSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="text-muted-foreground text-sm font-medium">
        Root Note
      </label>
      <div className="flex flex-wrap gap-1.5">
        {ROOT_NOTES.map((note) => (
          <Button
            key={note.name}
            variant={selected === note.name ? "default" : "outline"}
            size="sm"
            onClick={() => onChange(note.name)}
            className={cn(
              "min-w-[3rem] text-xs font-semibold",
              selected === note.name && "shadow-sm"
            )}
            aria-label={`Select root note ${note.display}`}
            aria-pressed={selected === note.name}
          >
            {note.display.split(" / ")[0]}
          </Button>
        ))}
      </div>
    </div>
  );
}
