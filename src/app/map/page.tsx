"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";

const Map = dynamic(() => import("@/components/map/BanhMiMap").then((mod) => mod.BanhMiMap), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center bg-stone-100">
      <div className="text-center">
        <div className="text-4xl">🗺️</div>
        <p className="mt-2 text-stone-500">Loading map...</p>
      </div>
    </div>
  ),
});

export default function MapPage() {
  return (
    <div className="h-[calc(100vh-64px)] w-full">
      <Map />
    </div>
  );
}
