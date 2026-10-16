import { loadFont } from "@remotion/fonts";
import {
  Easing,
  staticFile,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

// Cairo (variable weight) is bundled in public/fonts so renders work offline
export const fontFamily = "Cairo";
loadFont({
  family: fontFamily,
  url: staticFile("fonts/cairo-arabic.woff2"),
  weight: "200 1000",
  unicodeRange:
    "U+0600-06FF, U+0750-077F, U+0870-08FF, U+200C-200E, U+2010-2011, U+204F, U+2E41, U+FB50-FDFF, U+FE70-FEFC",
});
loadFont({
  family: fontFamily,
  url: staticFile("fonts/cairo-latin.woff2"),
  weight: "200 1000",
  unicodeRange:
    "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+20AC, U+2122, U+2212, U+FEFF, U+FFFD",
});

// Flat editorial palette
export const C = {
  cream: "#F4EDE1",
  paper: "#FBF6EC",
  ink: "#1E2A3F",
  inkSoft: "#3B4763",
  coral: "#E76F51",
  red: "#D64545",
  orange: "#F4A261",
  mustard: "#E9C46A",
  teal: "#2A9D8F",
  tealDark: "#1F7A6F",
  sky: "#A8DADC",
  skyLight: "#CFE8E8",
  green: "#6BBF59",
  lavender: "#8E7DBE",
  road: "#3B4459",
  sand: "#E3D3B5",
  sandDark: "#CDB892",
  grey: "#B9B3A8",
  white: "#FFFFFF",
};

export const W = 1920;
export const H = 1080;

export const EASE = Easing.bezier(0.16, 1, 0.3, 1);
export const clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;

// Seconds-based animation helpers for illustration-heavy scenes
export const useAnim = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sec = frame / fps;
  const tw = (
    s0: number,
    s1: number,
    out: [number, number] = [0, 1],
    easing: (t: number) => number = EASE,
  ) => interpolate(frame, [s0 * fps, s1 * fps], out, { ...clamp, easing });
  const pop = (s0: number, damping = 11) =>
    spring({
      frame: frame - s0 * fps,
      fps,
      config: { damping, stiffness: 140, mass: 0.8 },
    });
  return { frame, fps, sec, tw, pop };
};
