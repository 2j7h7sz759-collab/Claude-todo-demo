# الذكاء الاصطناعي في مواجهة الزحام المروري

A 2-minute, 16:9 (1920×1080, 30fps) flat editorial motion-graphics explainer built with [Remotion](https://www.remotion.dev).

## Commands

```bash
npm i
npm run dev                                 # open Remotion Studio
npx remotion render TrafficAI out/traffic-ai.mp4
```

## Structure

- `src/TrafficVideo.tsx` – main composition: 11 scenes in a `TransitionSeries` (fade / slide, 0.5s each)
- `src/scenes/` – one file per scene, each also registered as its own composition under **Scenes**
- `src/elements.tsx` – flat SVG illustration kit (cars, roads, skyline, traffic light, icons)
- `src/ui.tsx` – captions, section tags, headlines
- `src/theme.ts` – palette, Cairo font (bundled in `public/fonts`), animation helpers

To change a script line, edit the `Captions` chunks in the relevant scene (times are seconds from the scene start).
