import Link from "next/link";
import { getSuburbs } from "../../lib/data";

export const metadata = {
  title: "All Suburbs",
};

export default function SuburbsPage() {
  const suburbs = getSuburbs();
  const byRegion = suburbs.reduce((acc, s) => {
    if (!acc[s.region]) acc[s.region] = [];
    acc[s.region].push(s);
    return acc;
  }, {} as Record<string, typeof suburbs>);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-stone-900">All Suburbs</h1>
      <p className="mt-2 text-stone-600">Find the best banh mi by Sydney region</p>

      <div className="mt-8 flex flex-col gap-8">
        {Object.entries(byRegion).map(([region, list]) => (
          <div key={region}>
            <h2 className="text-xl font-semibold text-stone-800">{region}</h2>
            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {list.map((suburb) => (
                <Link
                  key={suburb.id}
                  href={`/suburbs/${suburb.slug}`}
                  className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm transition hover:shadow-md"
                >
                  <div className="font-semibold text-stone-900">{suburb.name}</div>
                  <div className="mt-1 text-sm text-stone-500">{suburb.description.slice(0, 60)}...</div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
