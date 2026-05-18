"use client";

interface SortTabsProps {
  active: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}

export function SortTabs({ active, options, onChange }: SortTabsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
            active === opt.value
              ? "bg-amber-500 text-white"
              : "bg-stone-100 text-stone-600 hover:bg-stone-200"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
