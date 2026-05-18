import { ImageResponse } from "next/og";

export const alt = "ProteinRanked - Australia's Protein Rankings";
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
          backgroundColor: "#f8fafc",
          padding: 60,
        }}
      >
        <div
          style={{
            fontSize: 80,
            marginBottom: 20,
          }}
        >
          PR
        </div>
        <div
          style={{
            fontSize: 60,
            fontWeight: "bold",
            color: "#020617",
            textAlign: "center",
          }}
        >
          ProteinRanked
        </div>
        <div
          style={{
            fontSize: 30,
            color: "#4b5563",
            marginTop: 20,
            textAlign: "center",
          }}
        >
          Australia&apos;s Protein Rankings
        </div>
      </div>
    ),
    size
  );
}
