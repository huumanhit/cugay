import { getListings } from "@/lib/db";
import MarketplaceClient from "./MarketplaceClient";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Chợ chim – CuGay.vn" };
export const revalidate = 30;

export default async function MarketplacePage() {
  const { listings, total } = await getListings({ sort: "newest", limit: 20 });
  return <MarketplaceClient initialListings={listings} initialTotal={total} />;
}
