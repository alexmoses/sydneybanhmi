import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sydney Banh Mi Map — Find Shops Near You",
  description:
    "Interactive map of Sydney's best banh mi shops. Find top-rated Vietnamese rolls near you with real locations, scores, and opening hours.",
  alternates: {
    canonical: "https://sydneybanhmi.com.au/map",
  },
  openGraph: {
    url: "https://sydneybanhmi.com.au/map",
    title: "Sydney Banh Mi Map",
    description: "Interactive map of Sydney's best banh mi shops — find top Vietnamese rolls near you.",
  },
};

export default function MapLayout({ children }: { children: React.ReactNode }) {
  return children;
}
