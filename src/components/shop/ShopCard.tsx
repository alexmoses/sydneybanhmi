import { ShopWithScores } from "../../types";
import Link from "next/link";
import { ScoreBadge } from "./ScoreBadge";
import { ExternalLink } from "lucide-react";
import { getSuburbById } from "../../lib/data";

interface ShopCardProps {
  shop: ShopWithScores;
  rank?: number;
}

export function ShopCard({ shop, rank }: ShopCardProps) {
  return (
    <div className="group relative flex items-start gap-4 rounded-xl border border-stone-200 bg-white p-4 shadow-sm transition hover:shadow-md">
      {rank && (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-500 text-sm font-bold text-white">
          #{rank}
        </div>
      )}
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-lg font-semibold text-stone-900">{shop.name}</h3>
            <p className="text-sm text-stone-500">{shop.address}</p>
          </div>
          <ScoreBadge score={shop.overallScore} size="md" />
        </div>
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="rounded-full bg-stone-100 px-2 py-0.5 text-stone-600">{shop.priceRange}</span>
          {shop.banhMiTypes.filter((t) => t.isSignature).map((t) => (
            <span key={t.name} className="rounded-full bg-amber-100 px-2 py-0.5 text-amber-700">
              ⭐ {t.name}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Link
            href={`/suburbs/${getSuburbById(shop.suburbId)?.slug}/${shop.slug}`}
            className="font-medium text-amber-600 hover:text-amber-700 hover:underline"
          >
            View Details →
          </Link>
          {shop.foodInboxUrl && (
            <a
              href={shop.foodInboxUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-stone-400 hover:text-stone-600"
            >
              <ExternalLink className="h-3 w-3" />
              Source
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
