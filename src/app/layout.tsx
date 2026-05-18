import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";

export const metadata: Metadata = {
  metadataBase: new URL("https://sydneybanhmi.com.au"),
  title: {
    default: "Sydney Banh Mi Ranked — Find the Best Banh Mi in Sydney",
    template: "%s | Sydney Banh Mi",
  },
  description:
    "Independently researched and ranked banh mi shops across Sydney. Compare taste, value, authenticity, and service scores to find Sydney's best Vietnamese rolls.",
  keywords: [
    "banh mi sydney",
    "best banh mi sydney",
    "vietnamese roll sydney",
    "pork roll sydney",
    "sydney banh mi rankings",
    "top banh mi sydney",
  ],
  openGraph: {
    type: "website",
    locale: "en_AU",
    siteName: "Sydney Banh Mi",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-AU">
      <body className="flex min-h-screen flex-col font-sans antialiased bg-amber-50">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <footer className="mt-auto border-t border-stone-200 bg-stone-900 py-10 text-stone-300">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 text-sm sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
            <div>
              <div className="font-semibold text-white">Sydney Banh Mi</div>
              <p className="mt-1 max-w-2xl text-stone-400">
                Independent banh mi rankings for Sydney food lovers. Research methodology: taste, value, authenticity, and service scores across 4+ review sources. No placement is for sale.
              </p>
            </div>
            <div className="text-stone-400">
              © {new Date().getFullYear()} Sydney Banh Mi. Rankings updated annually.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
