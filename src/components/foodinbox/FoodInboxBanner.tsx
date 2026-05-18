import { ExternalLink } from "lucide-react";

interface FoodInboxBannerProps {
  url: string;
}

export function FoodInboxBanner({ url }: FoodInboxBannerProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 rounded-xl bg-amber-100 px-4 py-3 text-amber-800 transition hover:bg-amber-200"
    >
      <span className="text-lg">🍜</span>
      <div className="flex-1">
        <p className="text-sm font-semibold">Originally reviewed by Food Inbox</p>
        <p className="text-xs text-amber-700">Read the full breakdown on Food Inbox →</p>
      </div>
      <ExternalLink className="h-4 w-4 shrink-0" />
    </a>
  );
}
