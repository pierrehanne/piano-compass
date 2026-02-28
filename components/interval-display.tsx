"use client";

import { Badge } from "@/components/ui/badge";

const INTERVAL_LABELS: Record<string, string> = {
  "1P": "Root",
  "2m": "b2",
  "2M": "2",
  "3m": "b3",
  "3M": "3",
  "4P": "4",
  "4A": "#4",
  "5d": "b5",
  "5P": "5",
  "5A": "#5",
  "6m": "b6",
  "6M": "6",
  "7m": "b7",
  "7M": "7",
  "8P": "Oct",
  "9m": "b9",
  "9M": "9",
  "11P": "11",
  "11A": "#11",
  "13m": "b13",
  "13M": "13",
};

type IntervalDisplayProps = {
  notes: string[];
  intervals: string[];
};

export function IntervalDisplay({ notes, intervals }: IntervalDisplayProps) {
  if (notes.length === 0) return null;

  return (
    <div className="space-y-3">
      <div>
        <p className="text-muted-foreground mb-1.5 text-sm font-medium">
          Notes
        </p>
        <div className="flex flex-wrap gap-1.5">
          {notes.map((note, i) => (
            <Badge key={`${note}-${i}`} variant="secondary" className="text-sm">
              {note}
            </Badge>
          ))}
        </div>
      </div>
      {intervals.length > 0 && (
        <div>
          <p className="text-muted-foreground mb-1.5 text-sm font-medium">
            Intervals
          </p>
          <div className="flex flex-wrap gap-1.5">
            {intervals.map((interval, i) => (
              <Badge
                key={`${interval}-${i}`}
                variant="outline"
                className="text-xs"
              >
                {INTERVAL_LABELS[interval] || interval}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
