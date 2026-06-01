import type { Metadata } from "next";
import "./globals.css";
import AppLayout from "@/components/layout/AppLayout";

export const metadata: Metadata = {
  title: {
    default: "CuGay.vn – Mỗi con chim, một câu chuyện.",
    template: "%s | CuGay.vn",
  },
  description:
    "CuGay.vn là nền tảng hồ sơ và định danh số dành cho người chơi cu gáy Việt Nam. Hồ sơ chim, chợ chim, nhật ký phát triển và cộng đồng.",
  keywords: ["cu gáy", "chim cu", "hồ sơ chim", "chợ chim", "Việt Nam"],
  authors: [{ name: "CuGay.vn" }],
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "https://cugay.vn",
    siteName: "CuGay.vn",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
