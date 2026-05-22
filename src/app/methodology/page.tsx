import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { getAllShops } from "@/lib/data";

export const metadata: Metadata = {
  title: "Our Methodology",
  description:
    "How Sydney Banh Mi ranks banh mi shops. Transparent scoring across 4 review sources, 4 criteria, and weighted credibility. No placement is for sale.",
  alternates: {
    canonical: "https://sydneybanhmi.com.au/methodology",
  },
};

export default function MethodologyPage() {
  const totalShops = getAllShops().length;

  const sources = [
    {
      name: "Broadsheet",
      weight: "1.5×",
      desc: "Sydney's leading food journalism. Reviews are in-depth, on-site, and independently written.",
    },
    {
      name: "Time Out Sydney",
      weight: "1.5×",
      desc: "Expert critics who visit anonymously and publish detailed breakdowns of each venue.",
    },
    {
      name: "Good Food Guide / SMH",
      weight: "1.5×",
      desc: "Australia's most respected restaurant guide. Chefs and food writers with decades of experience.",
    },
    {
      name: "Gourmet Traveller",
      weight: "1.5×",
      desc: "National food publication with high editorial standards and anonymous dining policy.",
    },
    {
      name: "Google Reviews",
      weight: "1.0×",
      desc: "Aggregate of customer reviews. High volume but lower individual credibility.",
    },
    {
      name: "Yelp / TripAdvisor",
      weight: "1.0×",
      desc: "Additional customer sentiment. Used to confirm trends, not drive the score.",
    },
    {
      name: "Individual Blogs",
      weight: "0.7×",
      desc: "Smaller publications and personal blogs. Contextual but not primary weight.",
    },
  ];

  const criteria = [
    {
      name: "Taste",
      desc: "Bread texture (crispy, light, stale?), filling quality (pate depth, meat freshness, pickle balance), and overall flavour harmony.",
    },
    {
      name: "Value",
      desc: "Portion size relative to price. A $5 banh mi with generous filling scores higher than a $12 one with the same quality.",
    },
    {
      name: "Authenticity",
      desc: "How closely the offering matches traditional Vietnamese banh mi standards — pate presence, coriander, chilli, pickled carrot/daikon ratio.",
    },
    {
      name: "Service",
      desc: "Speed, friendliness, consistency, and whether the shop honours its advertised hours.",
    },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: "Our Methodology — Sydney Banh Mi",
          description:
            "How Sydney Banh Mi ranks banh mi shops. Transparent scoring across 4 review sources, 4 criteria, and weighted credibility.",
          url: "https://sydneybanhmi.com.au/methodology",
          author: {
            "@type": "Person",
            name: "Alex Moses",
            url: "https://makaroni.com.au",
          },
        }}
      />

      <h1 className="text-3xl font-extrabold text-stone-900">How we rank banh mi shops</h1>

      <section className="mt-8">
        <h2 className="text-xl font-bold text-stone-900">What this site is</h2>
        <p className="mt-3 text-stone-600">
          Sydney Banh Mi is an independent research project. We aggregate reviews from{" "}
          <strong>trusted food publications</strong> and <strong>customer review platforms</strong>,
          weight each source by credibility, and calculate a weighted overall score across
          four dimensions: taste, value, authenticity, and service.
        </p>
        <p className="mt-3 text-stone-600">
          <strong className="text-stone-800">No placement is for sale.</strong>{" "}
          Rankings are determined entirely by the weighted formula below. If a shop wants
          to improve its score, the only way is to earn better reviews from the publications
          we track.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold text-stone-900">Review sources & weighting</h2>
        <p className="mt-2 text-sm text-stone-500">
          Not all reviews are equal. A Time Out critic visiting anonymously carries more
          weight than a one-star Google review from someone who arrived at closing time.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {sources.map((s) => (
            <div
              key={s.name}
              className="rounded-xl border border-stone-200 bg-white p-4"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-stone-900">{s.name}</span>
                <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-bold text-amber-800">
                  {s.weight}
                </span>
              </div>
              <p className="mt-2 text-sm text-stone-600">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold text-stone-900">Scoring criteria (out of 10)</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {criteria.map((c) => (
            <div
              key={c.name}
              className="rounded-xl border border-stone-200 bg-white p-4"
            >
              <span className="font-semibold text-stone-900">{c.name}</span>
              <p className="mt-2 text-sm text-stone-600">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold text-stone-900">Overall score formula</h2>
        <div className="mt-4 rounded-xl border border-stone-200 bg-stone-50 p-6">
          <code className="block text-sm font-mono text-stone-700">
            overallScore = weightedAverage(<br />
            {"  "}tasteScore,<br />
            {"  "}valueScore,<br />
            {"  "}authenticityScore,<br />
            {"  "}serviceScore<br />
            )
          </code>
          <p className="mt-3 text-sm text-stone-600">
            Each sub-score is the weighted average of all reviews for that criterion, with
            the review-source weight applied. The overall score is then the simple average
            of the four sub-scores.
          </p>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold text-stone-900">Data freshness</h2>
        <p className="mt-3 text-stone-600">
          Scores are recalculated whenever a new review is published by one of our tracked
          sources. The full ranking list is updated annually to reflect the current state of
          Sydney's banh mi scene. We currently track{" "}
          <strong>{totalShops} verified shops</strong>{" "}
          across the city.
        </p>
      </section>

      <section className="mt-10 border-t border-stone-200 pt-8">
        <h2 className="text-xl font-bold text-stone-900">About the researcher</h2>
        <p className="mt-3 text-stone-600">
          Sydney Banh Mi was created by{" "}
          <a
            href="https://makaroni.com.au"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-amber-700 hover:text-amber-800 hover:underline"
          >
            Alex Moses
          </a>
          , founder of{" "}
          <a
            href="https://makaroni.com.au"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-amber-700 hover:text-amber-800 hover:underline"
          >
            Makaroni Pty Ltd
          </a>
          , a Sydney digital marketing agency specialising in food & hospitality brands.
          This project is a public resource — not a monetised directory.
        </p>
      </section>
    </div>
  );
}
