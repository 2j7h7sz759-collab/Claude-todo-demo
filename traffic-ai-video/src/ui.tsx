import type React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { C, EASE, clamp, fontFamily } from "./theme";

export type Chunk = { text: string; from: number; to: number };

// Bottom subtitle bar showing one chunk of the script at a time
export const Captions: React.FC<{ chunks: Chunk[] }> = ({ chunks }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = frame / fps;
  const c = chunks.find((ch) => s >= ch.from && s < ch.to);
  if (!c) return null;
  const inF = frame - c.from * fps;
  const outF = c.to * fps - frame;
  const opacity = Math.min(
    interpolate(inF, [0, 8], [0, 1], clamp),
    interpolate(outF, [0, 6], [0, 1], clamp),
  );
  const y = interpolate(inF, [0, 14], [28, 0], { ...clamp, easing: EASE });
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 56,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        dir="rtl"
        style={{
          maxWidth: 1700,
          backgroundColor: C.ink,
          color: C.cream,
          fontFamily,
          fontWeight: 700,
          fontSize: 60,
          lineHeight: 1.5,
          padding: "16px 52px 22px",
          borderRadius: 30,
          textAlign: "center",
          opacity,
          translate: `0 ${y}px`,
          boxShadow: "0 10px 0 rgba(30,42,63,0.18)",
        }}
      >
        {c.text}
      </div>
    </div>
  );
};

// Section tag shown top-right (RTL start) on the solution scenes
export const SectionTag: React.FC<{
  num: string;
  label: string;
  color: string;
}> = ({ num, label, color }) => {
  const frame = useCurrentFrame();
  const x = interpolate(frame, [4, 24], [80, 0], { ...clamp, easing: EASE });
  const opacity = interpolate(frame, [4, 16], [0, 1], clamp);
  return (
    <div
      dir="rtl"
      style={{
        position: "absolute",
        top: 70,
        right: 100,
        display: "flex",
        alignItems: "center",
        gap: 24,
        opacity,
        translate: `${x}px 0`,
        fontFamily,
      }}
    >
      <div
        style={{
          width: 110,
          height: 110,
          borderRadius: 55,
          backgroundColor: color,
          color: C.white,
          fontSize: 66,
          fontWeight: 900,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          lineHeight: 1,
          paddingBottom: 8,
          boxSizing: "border-box",
        }}
      >
        {num}
      </div>
      <div style={{ fontSize: 76, fontWeight: 900, color: C.ink }}>{label}</div>
    </div>
  );
};

export const Headline: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ children, style }) => (
  <div
    dir="rtl"
    style={{
      fontFamily,
      fontWeight: 900,
      color: C.ink,
      textAlign: "center",
      lineHeight: 1.35,
      ...style,
    }}
  >
    {children}
  </div>
);

export const Label: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ children, style }) => (
  <div
    dir="rtl"
    style={{
      fontFamily,
      fontWeight: 700,
      fontSize: 44,
      color: C.ink,
      textAlign: "center",
      ...style,
    }}
  >
    {children}
  </div>
);

export const Svg: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <svg
    viewBox="0 0 1920 1080"
    width={1920}
    height={1080}
    style={{ position: "absolute", inset: 0 }}
  >
    {children}
  </svg>
);
