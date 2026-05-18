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

export async function generateMetadata({ params }: any) {
  const { shopSlug } = await params;
  const shop = getAllShops().find((s) => s.slug === shopSlug);
  return {
    title: shop ? `${shop.name} Review` : "Shop",
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
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <nav className="mb-4 text-sm text-stone-500">
          <Link href="/" className="hover:text-stone-700">Home</Link> {" / "}
          <Link href="/suburbs" className="hover:text-stone-700">Suburbs</Link> {" / "}
          <Link href={`/suburbs/${suburb?.slug}`} className="hover:text-stone-700">{suburb?.name}</Link> {" / "}
          <span className="text-stone-900">{shop.name}</span>
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
