import type { Metadata } from "next";
import ListingForm from "./ListingForm";

export const metadata: Metadata = { title: "Đăng tin bán chim – CuGay.vn" };

export default function DangTinPage() {
  return <ListingForm />;
}
