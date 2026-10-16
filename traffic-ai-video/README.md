# الذكاء الاصطناعي في مواجهة الزحام المروري

A 2-minute, 16:9 (1920×1080, 30fps) cinematic flat-illustration short built with [Remotion](https://www.remotion.dev): 11 shots, each its own setting and palette, with camera moves, film grain and film-style Arabic subtitles.

## Commands

```bash
npm i
npm run dev                                 # open Remotion Studio
npx remotion render TrafficAI out/traffic-ai.mp4
```

## Structure

- `src/TrafficVideo.tsx` – main composition: 11 shots in a `TransitionSeries` (fade / wipe, 0.5s each)
- `src/shots/` – one file per shot, each also registered as its own composition under **Shots**
  - S01 aerial dusk intersection · S02 orange jammed street + in-car dashboard · S03 night skyline
  - S04 top-down teal city with AI data layer · S05 three poster panels · S06 smart traffic light
  - S07 reroute map + sunset drive · S08 control room · S09 Riyadh golden hour → dusk
  - S10 road widening vs. smart flow + clearing sky · S11 night aerial outro
- `src/kit/film.tsx` – camera moves, sub-shots, grain/vignette, subtitles, titles
- `src/kit/props.tsx` – characters, side/top-down cars, buildings, traffic light, palms, path helpers
- `src/theme.ts` – Cairo font (bundled in `public/fonts`) and animation helpers

To change a script line, edit the `Subtitles` lines in the relevant shot (times are seconds from the shot start).
