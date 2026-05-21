import type { Metadata } from "next";
import Link from "next/link";
import { getAllShops, getSuburbById } from "@/lib/data";
import { ScoreBadge } from "@/components/shop/ScoreBadge";
import { ScoreBreakdown } from "@/components/shop/ScoreBreakdown";
import { ReviewCard } from "@/components/shop/ReviewCard";
import { BanhMiMenu } from "@/components/shop/BanhMiMenu";
import { OpeningHours } from "@/components/shop/OpeningHours";
import { FoodInboxBanner } from "@/components/foodinbox/FoodInboxBanner";
import { JsonLd } from "@/components/seo/JsonLd";
import { MapPin, Phone, Clock } from "lucide-react";

export async function generateStaticParams() {
  return getAllShops().map((s) => ({
    slug: getSuburbById(s.suburbId)?.slug || "",
    shopSlug: s.slug,
  }));
}

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { shopSlug } = await params;
  const shop = getAllShops().find((s) => s.slug === shopSlug);
  const suburb = shop ? getSuburbById(shop.suburbId) : null;
  if (!shop) return { title: "Shop Not Found" };

  return {
    title: `${shop.name} — Banh Mi Review & Score (${suburb?.name || "Sydney"})`,
    description: `${shop.name} in ${suburb?.name || "Sydney"}: rated ${shop.overallScore}/10 for banh mi. See full score breakdown for taste, value, authenticity & service. Menu, hours & reviews included.`,
    keywords: [
      `${shop.name} banh mi`,
      `${shop.name} review`,
      `banh mi ${suburb?.name || "sydney"}`,
      `best banh mi ${suburb?.name || "sydney"}`,
      "sydney banh mi",
    ],
    alternates: {
      canonical: `https://sydneybanhmi.com.au/suburbs/${suburb?.slug || ""}/${shop.slug}`,
    },
    openGraph: {
      url: `https://sydneybanhmi.com.au/suburbs/${suburb?.slug || ""}/${shop.slug}`,
      title: `${shop.name} — Banh Mi Review & Score`,
      description: `${shop.name} in ${suburb?.name || "Sydney"}: rated ${shop.overallScore}/10 for banh mi. See full score breakdown.`,
      locale: "en_AU",
    },
  };
}

export default async function ShopPage({ params }: any) {
  const { shopSlug } = await params;
  const shop = getAllShops().find((s) => s.slug === shopSlug);
  
  if (!shop) return <div className="p-12 text-center">Shop not found</div>;

  const suburb = getSuburbById(shop.suburbId);
  const foodInboxReview = shop.reviews.find((r) => r.sourceName === "Food Inbox");
  const otherReviews = shop.reviews.filter((r) => r.sourceName !== "Food Inbox");

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: shop.name,
    address: {
      "@type": "PostalAddress",
      streetAddress: shop.address.split(",").slice(0, 1).join(","),
      addressLocality: suburb?.name || "Sydney",
      addressRegion: "NSW",
      addressCountry: "AU",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: shop.lat,
      longitude: shop.lng,
    },
    telephone: shop.phone,
    priceRange: shop.priceRange,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: shop.overallScore.toString(),
      reviewCount: shop.reviewCount.toString(),
      bestRating: "10",
    },
    servesCuisine: "Vietnamese",
    url: `https://sydneybanhmi.com.au/suburbs/${suburb?.slug}/${shop.slug}`,
  };

  return (
    <>
      <JsonLd data={structuredData} />
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://sydneybanhmi.com.au" },
            { "@type": "ListItem", position: 2, name: "Suburbs", item: "https://sydneybanhmi.com.au/suburbs" },
            { "@type": "ListItem", position: 3, name: suburb?.name || "", item: `https://sydneybanhmi.com.au/suburbs/${suburb?.slug || ""}` },
            { "@type": "ListItem", position: 4, name: shop.name },
          ],
        })}
      </script>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-4 text-sm text-stone-500">
          <ol className="flex flex-wrap items-center gap-1">
            <li>
              <Link href="/" className="hover:text-stone-700 hover:underline">Home</Link>
            </li>
            <li className="text-stone-400">/</li>
            <li>
              <Link href="/suburbs" className="hover:text-stone-700 hover:underline">Suburbs</Link>
            </li>
            <li className="text-stone-400">/</li>
            <li>
              <Link href={`/suburbs/${suburb?.slug}`} className="hover:text-stone-700 hover:underline">{suburb?.name}</Link>
            </li>
            <li className="text-stone-400">/</li>
            <li className="text-stone-900" aria-current="page">{shop.name}</li>
          </ol>
        </nav>

        <div className="flex flex-col gap-6 lg:flex-row">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-stone-900">{shop.name}</h1>
            <p className="mt-2 text-stone-600">{shop.description}</p>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-stone-500">
              <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {shop.address}</span>
              {shop.phone && <span className="flex items-center gap-1"><Phone className="h-4 w-4" /> {shop.phone}</span>}
              <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {shop.priceRange}</span>
            </div>
            <div className="mt-4">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${shop.lat},${shop.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-stone-100 px-4 py-2 text-sm font-medium text-stone-700 hover:bg-stone-200"
              >
                <MapPin className="h-4 w-4" />
                Open in Google Maps
              </a>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <ScoreBadge score={shop.overallScore} size="lg" />
            <span className="text-sm text-stone-500">{shop.reviewCount} reviews</span>
          </div>
        </div>

        {shop.foodInboxUrl && <div className="mt-8"><FoodInboxBanner url={shop.foodInboxUrl} /></div>}

        <div className="mt-8">
          <h2 className="text-xl font-bold text-stone-900">Score Breakdown</h2>
          <div className="mt-3"><ScoreBreakdown shop={shop} /></div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div>
            <h2 className="text-xl font-bold text-stone-900">Menu</h2>
            <div className="mt-3"><BanhMiMenu types={shop.banhMiTypes} /></div>
          </div>
          <div>
            <h2 className="text-xl font-bold text-stone-900">Opening Hours</h2>
            <div className="mt-3"><OpeningHours hours={shop.openingHours} /></div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-bold text-stone-900">Reviews</h2>
          <div className="mt-3 flex flex-col gap-4">
            {foodInboxReview && <ReviewCard review={foodInboxReview} />}
            {otherReviews.map((r) => (
              <ReviewCard key={r.id} review={r} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
