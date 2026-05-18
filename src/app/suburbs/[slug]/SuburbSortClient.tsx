"use client";

import { useState } from "react";
import { ShopCard } from "@/components/shop/ShopCard";
import { SortTabs } from "@/components/ui/SortTabs";
import { ShopWithScores } from "@/types";
import { getShopsBySuburb } from "@/lib/data";

interface Props {
  suburbId: string;
  initialShops: ShopWithScores[];
}

export function SuburbSortClient({ suburbId, initialShops }: Props) {
  const [sortBy, setSortBy] = useState("overall");
  const shops = sortBy === "overall" ? initialShops : getShopsBySuburb(suburbId, sortBy as any);

  return (
    <>
      <div className="mt-6">
        <SortTabs
          active={sortBy}
          options={[
            { value: "overall", label: "Overall" },
            { value: "taste", label: "Taste" },
            { value: "value", label: "Value" },
            { value: "authenticity", label: "Authenticity" },
          ]}
          onChange={setSortBy}
        />
      </div>

      <div className="mt-6 flex flex-col gap-4">
        {shops.length > 0 ? (
          shops.map((shop) => <ShopCard key={shop.id} shop={shop} />)
        ) : (
          <p className="text-stone-500">No ranked shops in this suburb yet.</p>
        )}
      </div>
    </>
  );
}
