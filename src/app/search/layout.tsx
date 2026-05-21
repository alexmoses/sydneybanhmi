import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search Banh Mi Shops in Sydney",
  description:
    "Search Sydney banh mi shops by name or suburb. Find the best Vietnamese rolls near you with independent scores, reviews, and location maps.",
  alternates: {
    canonical: "https://sydneybanhmi.com.au/search",
  },
  openGraph: {
    url: "https://sydneybanhmi.com.au/search",
    title: "Search Banh Mi Shops in Sydney",
    description: "Search Sydney banh mi shops by name or suburb — independent scores and reviews.",
  },
};

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return children;
}
