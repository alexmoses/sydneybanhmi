import { suburbs } from "../data/suburbs";
import { shops } from "../data/shops";
import { Review, Shop, ShopWithScores, Suburb } from "../types";

/**
 * Source credibility weights:
 * - Verified primary (Food Inbox verified): 2.0x
 * - Premium publications (Broadsheet, TimeOut, SMH): 1.5x
 * - Aggregated platforms (Google, Yelp): 1.0x
 * - Individual blogs / unverified: 0.7x
 */
function getSourceWeight(review: Review): number {
  const premiumSources = ["Broadsheet", "TimeOut Sydney", "Sydney Morning Herald", "Good Food Guide", "Gourmet Traveller"];
  const platformSources = ["Google Reviews", "Yelp", "TripAdvisor"];
  
  if (review.isVerified && review.sourceName === "Food Inbox") return 2.0;
  if (premiumSources.includes(review.sourceName || "")) return 1.5;
  if (platformSources.includes(review.sourceName || "")) return 1.0;
  return 0.7;
}

function computeScores(shop: Shop): ShopWithScores {
  const reviews = shop.reviews;
  const count = reviews.length;
  if (count === 0) {
    return { ...shop, overallScore: 0, tasteScore: 0, valueScore: 0, authenticityScore: 0, serviceScore: 0, reviewCount: 0 };
  }

  const weights = reviews.map(getSourceWeight);
  const totalWeight = weights.reduce((s, w) => s + w, 0);

  // OVERALL SCORE: weighted average of overallRating from all sources
  // This directly reflects what reviewers think — a 9/10 review contributes ~9 to the score
  const overall = reviews.reduce((s, r, i) => s + r.overallRating * weights[i], 0) / totalWeight;

  // SUB-RATINGS: weighted averages for detail pages
  const taste = reviews.reduce((s, r, i) => s + r.tasteRating * weights[i], 0) / totalWeight;
  const value = reviews.reduce((s, r, i) => s + r.valueRating * weights[i], 0) / totalWeight;
  const authenticity = reviews.reduce((s, r, i) => s + r.authenticityRating * weights[i], 0) / totalWeight;
  const service = reviews.reduce((s, r, i) => s + r.serviceRating * weights[i], 0) / totalWeight;

  return {
    ...shop,
    tasteScore: Math.round(taste * 10) / 10,
    valueScore: Math.round(value * 10) / 10,
    authenticityScore: Math.round(authenticity * 10) / 10,
    serviceScore: Math.round(service * 10) / 10,
    overallScore: Math.round(overall * 10) / 10,
    reviewCount: count,
  };
}

export function getSuburbs(): Suburb[] { return suburbs; }

export function getSuburbBySlug(slug: string): Suburb | undefined {
  return suburbs.find((s) => s.slug === slug);
}

export function getSuburbById(id: string): Suburb | undefined {
  return suburbs.find((s) => s.id === id);
}

export function getShopsBySuburb(suburbId: string, sortBy: "overall" | "taste" | "value" | "authenticity" = "overall"): ShopWithScores[] {
  const filtered = shops.filter((s) => s.suburbId === suburbId && !s.isNotableMention).map(computeScores);
  const sortKey = sortBy === "overall" ? "overallScore" : sortBy === "taste" ? "tasteScore" : sortBy === "value" ? "valueScore" : "authenticityScore";
  return filtered.sort((a, b) => b[sortKey] - a[sortKey]);
}

export function getShopBySlug(slug: string): ShopWithScores | undefined {
  const shop = shops.find((s) => s.slug === slug);
  return shop ? computeScores(shop) : undefined;
}

export function getTopShops(limit = 10): ShopWithScores[] {
  return shops.filter((s) => !s.isNotableMention).map(computeScores).sort((a, b) => b.overallScore - a.overallScore).slice(0, limit);
}

export function getNotableMentions(): ShopWithScores[] {
  return shops.filter((s) => s.isNotableMention).map(computeScores);
}

export function getAllShops(): ShopWithScores[] {
  return shops.map(computeScores);
}

export function searchShops(query: string): ShopWithScores[] {
  const q = query.toLowerCase();
  return shops
    .filter((s) => s.name.toLowerCase().includes(q) || getSuburbById(s.suburbId)?.name.toLowerCase().includes(q))
    .map(computeScores);
}