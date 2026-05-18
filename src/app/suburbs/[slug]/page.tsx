import { getSuburbs, getShopsBySuburb, getSuburbBySlug } from "@/lib/data";
import { ShopCard } from "@/components/shop/ShopCard";
import { SuburbSortClient } from "./SuburbSortClient";

export async function generateStaticParams() {
  return getSuburbs().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: any) {
  const { slug } = await params;
  const suburb = getSuburbBySlug(slug);
  return {
    title: suburb ? `${suburb.name} Banh Mi Rankings` : "Suburb",
  };
}

export default async function SuburbPage({ params }: any) {
  const { slug } = await params;
  const suburb = getSuburbBySlug(slug);
  if (!suburb) return <div className="p-12 text-center">Suburb not found</div>;

  const shops = getShopsBySuburb(suburb.id, "overall");

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <nav className="mb-4 text-sm text-stone-500">
        <a href="/" className="hover:text-stone-700">Home</a> {" / "}
        <a href="/suburbs" className="hover:text-stone-700">Suburbs</a> {" / "}
        <span className="text-stone-900">{suburb.name}</span>
      </nav>

      <h1 className="text-3xl font-bold text-stone-900">{suburb.name} Banh Mi</h1>
      <p className="mt-2 text-stone-600">{suburb.description}</p>

      <SuburbSortClient suburbId={suburb.id} initialShops={shops} />
    </div>
  );
}
