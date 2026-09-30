import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { profile } from "@/app/lib/data";

// The preview card shown when the site is shared (iMessage, LinkedIn, Slack).
export const alt = `${profile.name}: ${profile.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

export default async function Image() {
  const [display, sans] = await Promise.all([
    readFile(join(process.cwd(), "app/fonts/BigShoulders-ExtraBold.ttf")),
    readFile(join(process.cwd(), "app/fonts/Archivo-SemiBold.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "64px 72px",
          background: "#0d1a2d",
          color: "#f2f5fa",
        }}
      >
        <div style={{ display: "flex", fontFamily: "Archivo", fontSize: 26, letterSpacing: 4, textTransform: "uppercase", color: "#a9b6cb" }}>
          {`${profile.school} · ${profile.majors}`}
        </div>
        <div style={{ display: "flex", fontFamily: "Big Shoulders", fontSize: 190, lineHeight: 0.86, textTransform: "uppercase", marginTop: 18 }}>
          {profile.name}
        </div>
        <div style={{ display: "flex", marginTop: 34 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: "#f6c21a",
              color: "#0d1a2d",
              fontFamily: "Archivo",
              fontSize: 24,
              letterSpacing: 3,
              textTransform: "uppercase",
              padding: "0 26px",
            }}
          >
            {profile.label}
          </div>
          <div style={{ display: "flex", background: "#1446b5", fontFamily: "Archivo", fontSize: 32, padding: "20px 28px" }}>
            {profile.tagline}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Big Shoulders", data: display, weight: 800, style: "normal" },
        { name: "Archivo", data: sans, weight: 600, style: "normal" },
      ],
    },
  );
}
