import { Metadata } from "next";

interface SeoMetaProps {
  title: string;
  description: string;
  canonical?: string;
  image?: string;
}

export function generatePageMetadata({
  title,
  description,
  canonical,
  image,
}: SeoMetaProps): Metadata {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://proteinranked.com.au";
  const fullTitle = title;
  const ogImage = image || `${siteUrl}/og-default.jpg`;

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: canonical || undefined,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonical,
      siteName: "ProteinRanked",
      images: [{ url: ogImage }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
  };
}
