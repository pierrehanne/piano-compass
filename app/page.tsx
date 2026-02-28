"use client";

import { useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NoteSelector } from "@/components/note-selector";
import { PianoKeyboard } from "@/components/piano-keyboard";
import { ChordExplorer } from "@/components/chord-explorer";
import { ScaleExplorer } from "@/components/scale-explorer";
import { CadenceExplorer } from "@/components/cadence-explorer";
import { CircleOfFifths } from "@/components/circle-of-fifths";
import { useMusicSelection } from "@/hooks/use-music-selection";
import { useAudio } from "@/hooks/use-audio";
import { getChordNotes } from "@/lib/music/chords";
import { getScaleNotes } from "@/lib/music/scales";
import { getCadenceById } from "@/lib/music/cadences";

export default function Home() {
  const {
    selection,
    setRoot,
    setMode,
    setChordType,
    setScaleType,
    setCadenceId,
  } = useMusicSelection();

  const audio = useAudio();

  const highlightedNotes = useMemo(() => {
    switch (selection.mode) {
      case "chord":
        return getChordNotes(selection.root, selection.chordType);
      case "scale":
        return getScaleNotes(selection.root, selection.scaleType);
      case "cadence": {
        const cadence = getCadenceById(selection.cadenceId);
        if (!cadence) return [];
        return cadence.getChords(selection.root).flatMap((c) => c.notes);
      }
      default:
        return [];
    }
  }, [selection]);

  return (
    <div className="space-y-6">
      <NoteSelector selected={selection.root} onChange={setRoot} />

      <Tabs
        value={selection.mode}
        onValueChange={(v) => setMode(v as typeof selection.mode)}
      >
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="chord">Chords</TabsTrigger>
          <TabsTrigger value="scale">Scales</TabsTrigger>
          <TabsTrigger value="cadence">Cadences</TabsTrigger>
          <TabsTrigger value="circle">Circle of 5ths</TabsTrigger>
        </TabsList>

        <TabsContent value="chord" className="mt-4">
          <ChordExplorer
            root={selection.root}
            selectedChordType={selection.chordType}
            onChordTypeChange={setChordType}
            isPlaying={audio.isPlaying}
            isLoading={audio.isLoading}
            onPlay={audio.playChord}
            onStop={audio.stop}
          />
        </TabsContent>

        <TabsContent value="scale" className="mt-4">
          <ScaleExplorer
            root={selection.root}
            selectedScaleType={selection.scaleType}
            onScaleTypeChange={setScaleType}
            isPlaying={audio.isPlaying}
            isLoading={audio.isLoading}
            onPlay={audio.playScale}
            onStop={audio.stop}
          />
        </TabsContent>

        <TabsContent value="cadence" className="mt-4">
          <CadenceExplorer
            root={selection.root}
            selectedCadenceId={selection.cadenceId}
            onCadenceChange={setCadenceId}
            isPlaying={audio.isPlaying}
            isLoading={audio.isLoading}
            onPlay={audio.playCadence}
            onStop={audio.stop}
          />
        </TabsContent>

        <TabsContent value="circle" className="mt-4">
          <CircleOfFifths selectedKey={selection.root} onKeySelect={setRoot} />
        </TabsContent>
      </Tabs>

      <PianoKeyboard
        highlightedNotes={highlightedNotes}
        onNoteClick={audio.playNote}
      />
    </div>
  );
}
