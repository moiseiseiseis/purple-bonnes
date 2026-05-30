import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 64,
          background: "#e6ddf5",
          color: "#401268",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          letterSpacing: -0.5,
          fontWeight: 700,
        }}
      >
        Purple Bonnes
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
