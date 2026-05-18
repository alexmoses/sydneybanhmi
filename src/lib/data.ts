import { suburbs } from "../data/suburbs";
import { shops } from "../data/shops";
import { Shop, ShopWithScores, Suburb } from "../types";

function computeScores(shop: Shop): ShopWithScores {
  const reviews = shop.reviews;
  const count = reviews.length;
  if (count === 0) {
    return { ...shop, overallScore: 0, tasteScore: 0, valueScore: 0, authenticityScore: 0, serviceScore: 0, reviewCount: 0 };
  }
  const taste = reviews.reduce((s, r) => s + r.tasteRating, 0) / count;
  const value = reviews.reduce((s, r) => s + r.valueRating, 0) / count;
  const authenticity = reviews.reduce((s, r) => s + r.authenticityRating, 0) / count;
  const service = reviews.reduce((s, r) => s + r.serviceRating, 0) / count;
  const overall = taste * 0.35 + value * 0.25 + authenticity * 0.25 + service * 0.15;
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
    .filter((s) => s.name.toLowerCase().includes(q) || getSuburbBySlug(s.suburbId)?.name.toLowerCase().includes(q))
    .map(computeScores);
}
