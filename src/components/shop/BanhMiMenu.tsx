import { BanhMiType } from "../../types";
import { Star } from "lucide-react";

interface BanhMiMenuProps {
  types: BanhMiType[];
}

export function BanhMiMenu({ types }: BanhMiMenuProps) {
  return (
    <div className="divide-y divide-stone-200 rounded-xl border border-stone-200 bg-white">
      {types.map((t) => (
        <div key={t.name} className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            {t.isSignature && <Star className="h-4 w-4 text-amber-500" />}
            <span className={t.isSignature ? "font-semibold text-stone-900" : "text-stone-700"}>
              {t.name}
            </span>
            {t.isSignature && (
              <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">
                Signature
              </span>
            )}
          </div>
          <span className="font-semibold text-stone-900">${t.price.toFixed(2)}</span>
        </div>
      ))}
    </div>
  );
}
