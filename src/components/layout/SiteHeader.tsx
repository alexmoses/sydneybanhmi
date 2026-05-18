"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Search } from "lucide-react";

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-stone-900">
          <span className="text-2xl">🥖</span>
          <span className="hidden sm:inline">Sydney Banh Mi</span>
          <span className="sm:hidden">SBM</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/suburbs" className="text-sm font-medium text-stone-600 hover:text-stone-900">Suburbs</Link>
          <Link href="/map" className="text-sm font-medium text-stone-600 hover:text-stone-900">Map</Link>
          <Link href="/search" className="rounded-full bg-amber-500 p-2 text-white hover:bg-amber-600"><Search className="h-4 w-4" /></Link>
        </nav>

        <button className="rounded-md p-2 text-stone-600 hover:bg-stone-100 md:hidden" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-stone-200 bg-white px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-3">
            <Link href="/suburbs" className="text-base font-medium text-stone-600" onClick={() => setMobileOpen(false)}>Suburbs</Link>
            <Link href="/map" className="text-base font-medium text-stone-600" onClick={() => setMobileOpen(false)}>Map</Link>
            <Link href="/search" className="text-base font-medium text-stone-600" onClick={() => setMobileOpen(false)}>Search</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
