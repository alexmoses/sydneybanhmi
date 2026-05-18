import Link from "next/link";
import { getTopShops, getNotableMentions, getSuburbs } from "../lib/data";
import { ShopCard } from "../components/shop/ShopCard";
import { Search } from "lucide-react";

export default function HomePage() {
  const topShops = getTopShops(10);
  const notableMentions = getNotableMentions();
  const suburbs = getSuburbs();

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="border-b border-stone-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <span className="text-6xl">🥖</span>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-stone-900 sm:text-5xl">
              Sydney's Best Banh Mi
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-stone-600">
              Independently researched and ranked. Aggregated from 4+ trusted review sources.
            </p>
            <div className="mt-8 w-full max-w-md">
              <Link href="/search" className="flex items-center gap-3 rounded-full border border-stone-300 bg-white px-4 py-3 text-stone-500 shadow-sm transition hover:border-amber-400 hover:text-stone-700">
                <Search className="h-5 w-5" />
                <span>Search shops, suburbs...</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Top 10 */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-stone-900">The Top 10</h2>
            <p className="mt-1 text-sm text-stone-500">Ranked by overall score out of 10</p>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          {topShops.map((shop, i) => (
            <ShopCard key={shop.id} shop={shop} rank={i + 1} />
          ))}
        </div>
      </section>

      {/* Notable Mentions */}
      <section className="border-t border-stone-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-stone-900">Notable Mentions</h2>
          <p className="mt-1 text-sm text-stone-500">Honorable mentions that nearly made the Top 10</p>
          <div className="mt-6 flex flex-col gap-4">
            {notableMentions.map((shop) => (
              <ShopCard key={shop.id} shop={shop} />
            ))}
          </div>
        </div>
      </section>

      {/* Browse Suburbs */}
      <section className="border-t border-stone-200">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-stone-900">Browse by Suburb</h2>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {suburbs.map((suburb) => (
              <Link
                key={suburb.id}
                href={`/suburbs/${suburb.slug}`}
                className="flex flex-col items-center justify-center rounded-xl border border-stone-200 bg-white p-4 text-center shadow-sm transition hover:shadow-md"
              >
                <span className="text-2xl">📍</span>
                <span className="mt-2 font-semibold text-stone-900">{suburb.name}</span>
                <span className="text-xs text-stone-500">{suburb.region}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
