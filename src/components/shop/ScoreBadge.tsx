"use client";

interface ScoreBadgeProps {
  score: number;
  size?: "sm" | "md" | "lg";
}

export function ScoreBadge({ score, size = "md" }: ScoreBadgeProps) {
  const colors =
    score >= 9.0
      ? "bg-emerald-500 text-white"
      : score >= 7.5
      ? "bg-amber-500 text-white"
      : score >= 6.0
      ? "bg-orange-500 text-white"
      : "bg-red-500 text-white";

  const sizes = {
    sm: "px-1.5 py-0.5 text-xs",
    md: "px-2.5 py-1 text-sm",
    lg: "px-4 py-2 text-lg",
  };

  return (
    <div className={`inline-flex items-center rounded-lg font-bold ${colors} ${sizes[size]}`}>
      {score.toFixed(1)}
    </div>
  );
}
