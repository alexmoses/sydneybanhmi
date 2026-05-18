import { MetadataRoute } from "next";
import { getSuburbs, getAllShops } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://sydneybanhmi.com.au";
  const suburbs = getSuburbs();
  const shops = getAllShops();

  return [
    { url: base, lastModified: new Date() },
    { url: `${base}/suburbs`, lastModified: new Date() },
    { url: `${base}/map`, lastModified: new Date() },
    { url: `${base}/search`, lastModified: new Date() },
    { url: `${base}/methodology`, lastModified: new Date() },
    ...suburbs.map((s) => ({
      url: `${base}/suburbs/${s.slug}`,
      lastModified: new Date(),
    })),
    ...shops.map((s) => {
      const suburb = suburbs.find((sub) => sub.id === s.suburbId);
      return {
        url: `${base}/suburbs/${suburb?.slug || ""}/${s.slug}`,
        lastModified: new Date(),
      };
    }),
  ];
}
