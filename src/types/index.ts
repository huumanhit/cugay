export interface Bird {
  id: string;
  name: string;
  slug: string;
  ownerId: string;
  ownerName: string;
  ownerAvatar: string;
  voice: VoiceType;
  age: number;
  origin: string;
  province: string;
  image: string;
  gallery: string[];
  achievements: string[];
  description: string;
  rating: number;
  followers: number;
  videoCount: number;
  verified: boolean;
  views: number;
  likes: number;
  price?: number;
  forSale: boolean;
  createdAt: string;
  lineage?: string;
  weight?: string;
  color: string;
  rank?: number;
  score?: number;
}

export type VoiceType =
  | "Thổ"
  | "Đồng"
  | "Kim"
  | "Thủy"
  | "Đấu"
  | "Vàng";

export interface Owner {
  id: string;
  name: string;
  avatar: string;
  province: string;
  birdCount: number;
  joinedAt: string;
  verified: boolean;
  rank: number;
  followers: number;
}

export interface MarketplaceListing {
  id: string;
  birdId: string;
  birdName: string;
  birdImage: string;
  sellerId: string;
  sellerName: string;
  sellerAvatar: string;
  price: number;
  province: string;
  voice: VoiceType;
  age: number;
  negotiable: boolean;
  views: number;
  postedAt: string;
  description: string;
  verified: boolean;
}

export interface TimelineEvent {
  id: string;
  birdId: string;
  date: string;
  title: string;
  description: string;
  type: "milestone" | "award" | "health" | "training" | "other";
  image?: string;
  videoUrl?: string;
}

export interface Club {
  id: string;
  name: string;
  province: string;
  memberCount: number;
  founded: string;
  logo: string;
  description: string;
  verified: boolean;
  coverImage: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  authorAvatar: string;
  category: string;
  publishedAt: string;
  readTime: number;
  views: number;
}

export interface RankingEntry {
  rank: number;
  birdId: string;
  birdName: string;
  birdImage: string;
  ownerId: string;
  ownerName: string;
  province: string;
  score: number;
  voice: VoiceType;
  achievements: number;
  change: "up" | "down" | "same";
}

export interface MapLocation {
  id: string;
  name: string;
  type: "club" | "cafe" | "market";
  province: string;
  lat: number;
  lng: number;
  address: string;
  memberCount?: number;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  province: string;
  organizer: string;
  image: string;
  attendees: number;
  type: "competition" | "exhibition" | "meetup" | "training";
}
