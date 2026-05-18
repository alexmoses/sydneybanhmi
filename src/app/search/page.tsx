"use client";

import { useState } from "react";
import Link from "next/link";
import { searchShops } from "@/lib/data";
import { ShopCard } from "@/components/shop/ShopCard";
import { Search } from "lucide-react";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const results = query.length >= 2 ? searchShops(query) : [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-stone-900">Search</h1>

      <div className="mt-6">
        <div className="flex items-center gap-2 rounded-full border border-stone-300 bg-white px-4 py-3 shadow-sm">
          <Search className="h-5 w-5 text-stone-400" />
          <input
            type="text"
            placeholder="Search by shop name or suburb..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-stone-900 outline-none placeholder:text-stone-400"
          />
        </div>
      </div>

      {query.length >= 2 && (
        <div className="mt-8">
          <p className="mb-4 text-sm text-stone-500">{results.length} result{results.length !== 1 && "s"}</p>
          <div className="flex flex-col gap-4">
            {results.map((shop) => (
              <ShopCard key={shop.id} shop={shop} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
