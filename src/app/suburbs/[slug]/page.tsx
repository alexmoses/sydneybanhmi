import type { Metadata } from "next";
import { getSuburbs, getShopsBySuburb, getSuburbBySlug } from "@/lib/data";
import { ShopCard } from "@/components/shop/ShopCard";
import { SuburbSortClient } from "./SuburbSortClient";

export async function generateStaticParams() {
  return getSuburbs().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { slug } = await params;
  const suburb = getSuburbBySlug(slug);
  if (!suburb) return { title: "Suburb Not Found" };
  return {
    title: `${suburb.name} Banh Mi — Best Shops & Reviews`,
    description: `The best banh mi shops in ${suburb.name}. Rated across taste, value, authenticity, and service. See scores, reviews, and menus for top Vietnamese rolls in ${suburb.name}, Sydney.`,
    keywords: [`banh mi ${suburb.name}`, `${suburb.name} banh mi`, `best banh mi ${suburb.name}`, `vietnamese roll ${suburb.name}`],
    alternates: {
      canonical: `https://sydneybanhmi.com.au/suburbs/${suburb.slug}`,
    },
    openGraph: {
      url: `https://sydneybanhmi.com.au/suburbs/${suburb.slug}`,
      title: `${suburb.name} Banh Mi — Best Shops & Reviews`,
      description: `The best banh mi shops in ${suburb.name}, Sydney. Independent rankings with full score breakdowns.`,
      locale: "en_AU",
    },
  };
}

export default async function SuburbPage({ params }: any) {
  const { slug } = await params;
  const suburb = getSuburbBySlug(slug);
  if (!suburb) return <div className="p-12 text-center">Suburb not found</div>;

  const shops = getShopsBySuburb(suburb.id, "overall");

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://sydneybanhmi.com.au" },
            { "@type": "ListItem", position: 2, name: "Suburbs", item: "https://sydneybanhmi.com.au/suburbs" },
            { "@type": "ListItem", position: 3, name: suburb.name },
          ],
        })}
      </script>
      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-stone-500">
        <ol className="flex flex-wrap items-center gap-1">
          <li>
            <a href="/" className="hover:text-stone-700 hover:underline">Home</a>
          </li>
          <li className="text-stone-400">/</li>
          <li>
            <a href="/suburbs" className="hover:text-stone-700 hover:underline">Suburbs</a>
          </li>
          <li className="text-stone-400">/</li>
          <li className="text-stone-900" aria-current="page">{suburb.name}</li>
        </ol>
      </nav>

      <h1 className="text-3xl font-bold text-stone-900">{suburb.name} Banh Mi</h1>
      <p className="mt-2 text-stone-600">{suburb.description}</p>

      <SuburbSortClient suburbId={suburb.id} initialShops={shops} />
    </div>
  );
}
