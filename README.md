# Piano Compass

> Your guide through chords, scales, and cadences.

A fast, interactive web app for jazz pianists to explore chords, scales, common cadences, and the circle of fifths.

## Features

- **Chord Explorer** - Browse jazz chord types with notes, intervals, and piano visualization
- **Scale Explorer** - Explore modes, jazz scales, and exotic scales
- **Circle of Fifths** - Interactive visualization with key relationships
- **Cadence Browser** - Common jazz progressions (II-V-I, tritone subs, turnarounds)
- **Audio Playback** - Hear chords and scales with synthesized piano sound
- **Light & Dark Themes** - Comfortable viewing in any environment

## Tech Stack

- [Next.js 16](https://nextjs.org) - React framework
- [TypeScript](https://www.typescriptlang.org) - Type safety
- [Tailwind CSS v4](https://tailwindcss.com) - Styling
- [shadcn/ui](https://ui.shadcn.com) - UI components
- [Tonal.js](https://github.com/tonaljs/tonal) - Music theory
- [Tone.js](https://tonejs.github.io) - Audio synthesis

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `pnpm dev`        | Start development server |
| `pnpm build`      | Build for production     |
| `pnpm test`       | Run tests                |
| `pnpm test:watch` | Run tests in watch mode  |
| `pnpm lint`       | Lint code                |
| `pnpm format`     | Format code              |

## Release & Deploy

This project uses a tag-based release workflow:

1. **CI** runs on every push/PR to `main` (lint, test, build)
2. **Release** is triggered by pushing a semver tag:
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```
3. The release workflow will:
   - Run CI checks
   - Generate a changelog from commit messages (conventional commits)
   - Create a GitHub Release with the changelog
   - Deploy to Vercel production

Commit messages are grouped by prefix: `feat:`, `fix:`, `refactor:`, `docs:`, `style:`, `test:`, `chore:`, `perf:`.

### Required Secrets

| Secret              | Description            |
| ------------------- | ---------------------- |
| `VERCEL_TOKEN`      | Vercel API token       |
| `VERCEL_ORG_ID`     | Vercel organization ID |
| `VERCEL_PROJECT_ID` | Vercel project ID      |

## License

[MIT](LICENSE)
