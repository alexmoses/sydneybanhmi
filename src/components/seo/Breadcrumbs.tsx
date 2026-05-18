import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { JsonLd } from "./JsonLd";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://proteinranked.com.au";

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const allItems: BreadcrumbItem[] = [{ label: "Home", href: "/" }, ...items];

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: allItems.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.label,
      ...(item.href ? { item: `${SITE_URL}${item.href}` } : {}),
    })),
  };

  return (
    <>
      <JsonLd data={schema} />
      <nav aria-label="Breadcrumb" className="text-sm text-slate-600">
        <ol className="flex flex-wrap items-center gap-1">
          {allItems.map((item, idx) => {
            const isLast = idx === allItems.length - 1;
            return (
              <li key={`${item.label}-${idx}`} className="flex items-center gap-1">
                {idx > 0 && (
                  <ChevronRight
                    className="h-3.5 w-3.5 shrink-0 text-slate-400"
                    aria-hidden="true"
                  />
                )}
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-1 rounded hover:text-slate-950 hover:underline"
                  >
                    {idx === 0 && <Home className="h-3.5 w-3.5" aria-hidden="true" />}
                    {item.label}
                  </Link>
                ) : (
                  <span
                    className="inline-flex items-center gap-1 font-medium text-slate-900"
                    aria-current={isLast ? "page" : undefined}
                  >
                    {idx === 0 && <Home className="h-3.5 w-3.5" aria-hidden="true" />}
                    {item.label}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
