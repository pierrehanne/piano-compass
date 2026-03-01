import type * as ToneType from "tone";

let toneModule: typeof ToneType | null = null;
let synth: ToneType.PolySynth | null = null;
let isInitialized = false;

async function loadTone(): Promise<typeof ToneType> {
  if (!toneModule) {
    toneModule = await import("tone");
  }
  return toneModule;
}

export async function initAudio(): Promise<void> {
  if (isInitialized) return;
  const Tone = await loadTone();
  await Tone.start();
  synth = new Tone.PolySynth(Tone.Synth, {
    oscillator: { type: "triangle" },
    envelope: { attack: 0.02, decay: 0.3, sustain: 0.4, release: 1 },
  }).toDestination();
  synth.maxPolyphony = 16;
  synth.volume.value = -6;
  isInitialized = true;
}

export async function playNote(
  note: string,
  duration: string = "4n"
): Promise<void> {
  await initAudio();
  if (!synth) return;
  synth.triggerAttackRelease(note, duration);
}

export async function playChord(
  notes: string[],
  duration: string = "2n"
): Promise<void> {
  await initAudio();
  if (!synth) return;
  const notesWithOctave = notes.map((n) => (n.match(/\d/) ? n : `${n}4`));
  synth.triggerAttackRelease(notesWithOctave, duration);
}

export async function playScale(
  notes: string[],
  tempo: number = 150
): Promise<void> {
  await initAudio();
  if (!synth) return;
  const Tone = await loadTone();
  const interval = 60 / tempo;
  const now = Tone.now();
  notes.forEach((note, i) => {
    const n = note.match(/\d/) ? note : `${note}4`;
    synth!.triggerAttackRelease(n, "8n", now + i * interval);
  });
}

export async function playArpeggio(
  notes: string[],
  tempo: number = 120
): Promise<void> {
  await initAudio();
  if (!synth) return;
  const Tone = await loadTone();
  const interval = 60 / tempo;
  const now = Tone.now();
  notes.forEach((note, i) => {
    const n = note.match(/\d/) ? note : `${note}4`;
    synth!.triggerAttackRelease(n, "4n", now + i * interval);
  });
}

export async function playCadence(
  chordGroups: string[][],
  tempo: number = 80
): Promise<void> {
  await initAudio();
  if (!synth) return;
  const Tone = await loadTone();
  const beatDuration = 60 / tempo;
  const now = Tone.now();
  chordGroups.forEach((notes, i) => {
    const withOctave = notes.map((n) => (n.match(/\d/) ? n : `${n}4`));
    synth!.triggerAttackRelease(withOctave, "2n", now + i * beatDuration * 2);
  });
}

export function stopPlayback(): void {
  if (synth) {
    synth.releaseAll();
  }
}

export function isAudioInitialized(): boolean {
  return isInitialized;
}
