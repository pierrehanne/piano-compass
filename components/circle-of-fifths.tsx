"use client";

import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CIRCLE_OF_FIFTHS,
  getKeySignatureDisplay,
  getRelatedKeys,
} from "@/lib/music/circle-of-fifths";
import { cn } from "@/lib/utils";

type CircleOfFifthsProps = {
  selectedKey: string;
  onKeySelect: (key: string) => void;
};

export function CircleOfFifths({
  selectedKey,
  onKeySelect,
}: CircleOfFifthsProps) {
  const selectedCircleKey = useMemo(
    () => CIRCLE_OF_FIFTHS.find((k) => k.major.split("/")[0] === selectedKey),
    [selectedKey]
  );

  const relatedKeys = useMemo(
    () => (selectedKey ? getRelatedKeys(selectedKey) : null),
    [selectedKey]
  );

  const cx = 200;
  const cy = 200;
  const outerR = 170;
  const innerR = 120;

  return (
    <div className="grid gap-4 md:grid-cols-[1fr_1fr]">
      <div className="flex items-center justify-center">
        <svg
          viewBox="0 0 400 400"
          className="h-auto w-full max-w-[360px]"
          role="img"
          aria-label="Circle of fifths"
        >
          <circle
            cx={cx}
            cy={cy}
            r={outerR}
            className="stroke-border fill-none"
            strokeWidth={1}
          />
          <circle
            cx={cx}
            cy={cy}
            r={innerR}
            className="stroke-border fill-none"
            strokeWidth={1}
          />

          {CIRCLE_OF_FIFTHS.map((key, i) => {
            const angle = (i * 30 - 90) * (Math.PI / 180);
            const majorX = cx + outerR * 0.85 * Math.cos(angle);
            const majorY = cy + outerR * 0.85 * Math.sin(angle);
            const minorX = cx + innerR * 0.78 * Math.cos(angle);
            const minorY = cy + innerR * 0.78 * Math.sin(angle);
            const displayMajor = key.major.split("/")[0];
            const displayMinor = key.minor.split("/")[0];
            const isSelected = displayMajor === selectedKey;
            const isRelated =
              relatedKeys &&
              (displayMajor === relatedKeys.dominant ||
                displayMajor === relatedKeys.subdominant);

            return (
              <g key={key.major}>
                <circle
                  cx={majorX}
                  cy={majorY}
                  r={18}
                  className={cn(
                    "cursor-pointer transition-colors",
                    isSelected
                      ? "fill-primary stroke-primary"
                      : isRelated
                        ? "fill-accent stroke-primary/50"
                        : "fill-card stroke-border hover:fill-accent"
                  )}
                  onClick={() => onKeySelect(displayMajor)}
                />
                <text
                  x={majorX}
                  y={majorY + 1}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className={cn(
                    "pointer-events-none text-xs font-bold select-none",
                    isSelected ? "fill-primary-foreground" : "fill-foreground"
                  )}
                >
                  {displayMajor}
                </text>

                <text
                  x={minorX}
                  y={minorY + 1}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="fill-muted-foreground pointer-events-none text-[10px] select-none"
                >
                  {displayMinor}
                </text>
              </g>
            );
          })}

          <text
            x={cx}
            y={cy - 8}
            textAnchor="middle"
            className="fill-muted-foreground text-[9px] font-medium"
          >
            Major
          </text>
          <text
            x={cx}
            y={cy + 8}
            textAnchor="middle"
            className="fill-muted-foreground text-[8px]"
          >
            minor
          </text>
        </svg>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Key of {selectedKey}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {selectedCircleKey && (
            <>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-muted-foreground font-medium">
                    Key Signature
                  </p>
                  <p>{getKeySignatureDisplay(selectedCircleKey)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground font-medium">
                    Relative Minor
                  </p>
                  <p>{selectedCircleKey.minor}</p>
                </div>
              </div>
              {relatedKeys && (
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-muted-foreground font-medium">
                      Dominant (V)
                    </p>
                    <p>{relatedKeys.dominant}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground font-medium">
                      Subdominant (IV)
                    </p>
                    <p>{relatedKeys.subdominant}</p>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
