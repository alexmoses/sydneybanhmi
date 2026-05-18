import { Review } from "../../types";
import { ScoreBadge } from "./ScoreBadge";
import { ExternalLink, BadgeCheck } from "lucide-react";

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="rounded-xl border border-stone-200 bg-white p-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-stone-900">{review.reviewerName}</span>
            {review.isVerified && (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700">
                <BadgeCheck className="h-3 w-3" />
                Verified
              </span>
            )}
            {review.sourceName && (
              <span className="text-xs text-stone-400">via {review.sourceName}</span>
            )}
          </div>
          <p className="mt-0.5 text-xs text-stone-400">
            Visited {new Date(review.visitedAt).toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" })}
          </p>
        </div>
        <ScoreBadge score={review.overallRating} size="sm" />
      </div>

      <p className="mt-3 text-sm leading-relaxed text-stone-700">{review.comment}</p>

      <div className="mt-3 flex flex-wrap gap-2">
        <span className="text-xs text-stone-500">Taste {review.tasteRating}/10</span>
        <span className="text-xs text-stone-500">·</span>
        <span className="text-xs text-stone-500">Value {review.valueRating}/10</span>
        <span className="text-xs text-stone-500">·</span>
        <span className="text-xs text-stone-500">Authenticity {review.authenticityRating}/10</span>
        <span className="text-xs text-stone-500">·</span>
        <span className="text-xs text-stone-500">Service {review.serviceRating}/10</span>
      </div>

      {review.sourceUrl && (
        <a
          href={review.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-amber-600 hover:text-amber-700 hover:underline"
        >
          <ExternalLink className="h-3 w-3" />
          Read full review
        </a>
      )}
    </div>
  );
}
