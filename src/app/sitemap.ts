import { MetadataRoute } from "next";
import { getSuburbs, getAllShops } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://sydneybanhmi.com.au";
  const suburbs = getSuburbs();
  const shops = getAllShops();
  const now = new Date();

  return [
    {
      url: base,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${base}/suburbs`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${base}/map`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}/search`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...suburbs.map((s) => ({
      url: `${base}/suburbs/${s.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...shops.map((s) => {
      const suburb = suburbs.find((sub) => sub.id === s.suburbId);
      return {
        url: `${base}/suburbs/${suburb?.slug || ""}/${s.slug}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.6,
      };
    }),
  ];
}
