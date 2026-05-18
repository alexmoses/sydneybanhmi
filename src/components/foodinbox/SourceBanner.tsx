import { ExternalLink } from "lucide-react";

interface SourceBannerProps {
  url: string;
  sourceName?: string;
}

export function SourceBanner({ url, sourceName }: SourceBannerProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 rounded-xl bg-amber-100 px-4 py-3 text-amber-800 transition hover:bg-amber-200"
    >
      <span className="text-lg">🔗</span>
      <div className="flex-1">
        <p className="text-sm font-semibold">{sourceName ? `Reviewed by ${sourceName}` : "Original review source"}</p>
        <p className="text-xs text-amber-700">Read the full breakdown →</p>
      </div>
      <ExternalLink className="h-4 w-4 shrink-0" />
    </a>
  );
}
