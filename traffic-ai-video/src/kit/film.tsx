import type React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { clamp, fontFamily } from "../theme";

const INOUT = Easing.bezier(0.45, 0, 0.55, 1);

type Cam = { scale: number; x: number; y: number; rotate?: number };

// Slow cinematic camera move between two framings over [start, end] seconds
export const Camera: React.FC<{
  from: Cam;
  to: Cam;
  start?: number;
  end: number;
  children: React.ReactNode;
}> = ({ from, to, start = 0, end, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = interpolate(frame, [start * fps, end * fps], [0, 1], {
    ...clamp,
    easing: INOUT,
  });
  const lerp = (a: number, b: number) => a + (b - a) * p;
  return (
    <AbsoluteFill
      style={{
        scale: String(lerp(from.scale, to.scale)),
        translate: `${lerp(from.x, to.x)}px ${lerp(from.y, to.y)}px`,
        rotate: `${lerp(from.rotate ?? 0, to.rotate ?? 0)}deg`,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

// A sub-shot inside a scene, cross-dissolving in and out
export const Shot: React.FC<{
  from: number;
  to: number;
  fade?: number;
  children: React.ReactNode;
}> = ({ from, to, fade = 0.35, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = frame / fps;
  if (s < from - fade || s > to + fade) return null;
  const opacity = Math.min(
    interpolate(s, [from - fade, from], [0, 1], clamp),
    interpolate(s, [to, to + fade], [1, 0], clamp),
  );
  return <AbsoluteFill style={{ opacity }}>{children}</AbsoluteFill>;
};

export const Stage: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <svg
    viewBox="0 0 1920 1080"
    width={1920}
    height={1080}
    style={{ position: "absolute", inset: 0, overflow: "visible" }}
  >
    {children}
  </svg>
);

// Film grain + vignette finishing layer
export const FilmFinish: React.FC<{ vignette?: number }> = ({ vignette = 0.35 }) => {
  const frame = useCurrentFrame();
  const seed = Math.floor(frame / 2) % 8;
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <svg width={1920} height={1080} style={{ position: "absolute", inset: 0, opacity: 0.09, mixBlendMode: "multiply" }}>
        <filter id={`grain-${seed}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves={2} seed={seed} stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="1920" height="1080" filter={`url(#grain-${seed})`} />
      </svg>
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at center, rgba(0,0,0,0) 55%, rgba(10,10,30,${vignette}) 100%)`,
        }}
      />
    </AbsoluteFill>
  );
};

export type Line = { text: string; from: number; to: number };

// Film-style subtitles: clean white type, soft shadow, no box
export const Subtitles: React.FC<{ lines: Line[] }> = ({ lines }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = frame / fps;
  const l = lines.find((x) => s >= x.from && s < x.to);
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <AbsoluteFill
        style={{
          background: "linear-gradient(to top, rgba(8,10,28,0.55) 0%, rgba(8,10,28,0) 26%)",
        }}
      />
      {l ? (
        <div
          dir="rtl"
          style={{
            position: "absolute",
            left: 160,
            right: 160,
            bottom: 62,
            textAlign: "center",
            fontFamily,
            fontWeight: 700,
            fontSize: 54,
            lineHeight: 1.5,
            color: "#FFFFFF",
            textShadow: "0 2px 0 rgba(0,0,0,0.35), 0 0 28px rgba(0,0,0,0.45)",
            opacity: Math.min(
              interpolate(frame - l.from * fps, [0, 7], [0, 1], clamp),
              interpolate(l.to * fps - frame, [0, 5], [0, 1], clamp),
            ),
          }}
        >
          {l.text}
        </div>
      ) : null}
    </AbsoluteFill>
  );
};

// Large cinematic title text
export const BigType: React.FC<{
  children: React.ReactNode;
  at: number;
  out?: number;
  size?: number;
  color?: string;
  top?: number;
  weight?: number;
  style?: React.CSSProperties;
}> = ({ children, at, out, size = 110, color = "#FFFFFF", top = 380, weight = 900, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const inP = interpolate(frame, [at * fps, at * fps + 18], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const outP = out === undefined ? 1 : interpolate(frame, [out * fps - 10, out * fps], [1, 0], clamp);
  return (
    <div
      dir="rtl"
      style={{
        position: "absolute",
        left: 120,
        right: 120,
        top,
        textAlign: "center",
        fontFamily,
        fontWeight: weight,
        fontSize: size,
        lineHeight: 1.3,
        color,
        opacity: inP * outP,
        translate: `0 ${(1 - inP) * 40}px`,
        letterSpacing: 0,
        textShadow: "0 4px 30px rgba(0,0,0,0.35)",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

// Small chapter kicker, top-right (RTL start)
export const Kicker: React.FC<{ children: React.ReactNode; color?: string }> = ({
  children,
  color = "#FFFFFF",
}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [8, 28], [0, 1], { ...clamp, easing: Easing.bezier(0.16, 1, 0.3, 1) });
  return (
    <div
      dir="rtl"
      style={{
        position: "absolute",
        top: 64,
        right: 110,
        fontFamily,
        fontWeight: 900,
        fontSize: 58,
        color,
        opacity: p,
        translate: `${(1 - p) * 40}px 0`,
        textShadow: "0 2px 18px rgba(0,0,0,0.3)",
        display: "flex",
        alignItems: "center",
        gap: 22,
      }}
    >
      <div style={{ width: 70 * p, height: 6, borderRadius: 3, backgroundColor: color }} />
      {children}
    </div>
  );
};
