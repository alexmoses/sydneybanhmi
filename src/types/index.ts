export interface Suburb {
  id: string;
  name: string;
  slug: string;
  region: string;
  description: string;
}

export interface BanhMiType {
  name: string;
  price: number;
  isSignature: boolean;
}

export interface Review {
  id: string;
  reviewerName: string;
  overallRating: number;
  tasteRating: number;
  valueRating: number;
  authenticityRating: number;
  serviceRating: number;
  comment: string;
  visitedAt: string;
  isVerified: boolean;
  sourceUrl?: string;
  sourceName?: string;
}

export interface Shop {
  id: string;
  name: string;
  slug: string;
  suburbId: string;
  address: string;
  lat: number;
  lng: number;
  phone?: string;
  website?: string;
  openingHours: Record<string, string>;
  priceRange: "$" | "$$" | "$$$";
  description: string;
  imageUrl?: string;
  foodInboxUrl?: string;
  banhMiTypes: BanhMiType[];
  reviews: Review[];
  isNotableMention?: boolean;
}

export interface ShopWithScores extends Shop {
  overallScore: number;
  tasteScore: number;
  valueScore: number;
  authenticityScore: number;
  serviceScore: number;
  reviewCount: number;
}
