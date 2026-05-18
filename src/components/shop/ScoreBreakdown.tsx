"use client";

import { ShopWithScores } from "../../types";

interface ScoreBreakdownProps {
  shop: ShopWithScores;
}

export function ScoreBreakdown({ shop }: ScoreBreakdownProps) {
  const categories = [
    { label: "Taste", score: shop.tasteScore, weight: "35%" },
    { label: "Value", score: shop.valueScore, weight: "25%" },
    { label: "Authenticity", score: shop.authenticityScore, weight: "25%" },
    { label: "Service", score: shop.serviceScore, weight: "15%" },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {categories.map((cat) => (
        <div key={cat.label} className="rounded-xl border border-stone-200 bg-white p-3 text-center">
          <div className="text-xs font-medium text-stone-500">{cat.label}</div>
          <div className="mt-1 text-2xl font-bold text-stone-900">{cat.score.toFixed(1)}</div>
          <div className="text-xs text-stone-400">Weight: {cat.weight}</div>
          <div className="mt-2 h-2 w-full rounded-full bg-stone-100">
            <div
              className="h-2 rounded-full bg-amber-500"
              style={{ width: `${cat.score * 10}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
