"use client";

interface OpeningHoursProps {
  hours: Record<string, string>;
}

export function OpeningHours({ hours }: OpeningHoursProps) {
  const today = new Date().toLocaleDateString("en-AU", { weekday: "short" }).toLowerCase();
  const days = [
    { key: "mon", label: "Monday" },
    { key: "tue", label: "Tuesday" },
    { key: "wed", label: "Wednesday" },
    { key: "thu", label: "Thursday" },
    { key: "fri", label: "Friday" },
    { key: "sat", label: "Saturday" },
    { key: "sun", label: "Sunday" },
  ];

  return (
    <div className="rounded-xl border border-stone-200 bg-white">
      {days.map((d) => (
        <div
          key={d.key}
          className={`flex items-center justify-between px-4 py-2 ${
            d.key === today ? "bg-amber-50 font-medium text-amber-900" : "text-stone-600"
          }`}
        >
          <span>{d.label}</span>
          <span>{hours[d.key] || "Closed"}</span>
        </div>
      ))}
    </div>
  );
}
