import Link from "next/link";

export const metadata = {
  title: "Methodology",
};

export default function MethodologyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-stone-900">How We Rank</h1>

      <div className="mt-8 space-y-8">
        <section>
          <h2 className="text-xl font-semibold text-stone-800">Our Scoring System</h2>
          <p className="mt-2 text-stone-600">
            Each banh mi is rated across four categories on a scale of 1–10. The overall score is a weighted average:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-stone-600">
            <li><strong>Taste (35%)</strong> — Flavour balance, quality of meats, pate, seasoning, and freshness</li>
            <li><strong>Value (25%)</strong> — Price relative to portion size, quality, and overall satisfaction</li>
            <li><strong>Authenticity (25%)</strong> — Traditional techniques, genuine Vietnamese flavours, proper bread</li>
            <li><strong>Service (15%)</strong> — Speed, friendliness, consistency, and overall experience</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-stone-800">Our Reviewers</h2>
          <p className="mt-2 text-stone-600">
            We combine reviews from trusted food sources:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-stone-600">
            <li>
              <strong>Food Inbox</strong> — Our primary source.{" "}
              <a href="https://www.foodinbox.com.au/blog/top-10-banh-mi-sydney-2026" className="text-amber-600 hover:underline" target="_blank" rel="noopener noreferrer">
                Read their full Top 10 breakdown
              </a>
            </li>
            <li><strong>Sydney Food Boy</strong> — Independent influencer reviews</li>
            <li><strong>TheFoodInbox</strong> — Curated community reviews</li>
            <li><strong>Google Reviews</strong> — Public community feedback</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-stone-800">Transparency</h2>
          <p className="mt-2 text-stone-600">
            No shop pays for placement. Rankings are based purely on aggregated review scores.
            We visit anonymously and pay for every roll ourselves. Our rankings are updated annually.
          </p>
        </section>
      </div>
    </div>
  );
}
