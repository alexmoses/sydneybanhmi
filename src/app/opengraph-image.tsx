import { ImageResponse } from "next/og";

export const alt = "Sydney Banh Mi Ranked — Find the Best Banh Mi in Sydney";
export const size = { width: 1200, height: 630 };

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FFFBEB",
          padding: 60,
        }}
      >
        <div style={{ fontSize: 100, marginBottom: 20 }}>🥖</div>
        <div
          style={{
            fontSize: 60,
            fontWeight: "bold",
            color: "#292524",
            textAlign: "center",
          }}
        >
          Sydney Banh Mi
        </div>
        <div
          style={{
            fontSize: 30,
            color: "#78716c",
            marginTop: 20,
            textAlign: "center",
          }}
        >
          Independently Ranked — Research: taste, value, authenticity, service
        </div>
      </div>
    ),
    size
  );
}
