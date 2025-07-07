import type { Metadata } from "next";
import { Mitr } from "next/font/google";
import "./globals.css";

const mitr = Mitr({ 
  subsets: ["latin", "thai"],
  weight: ["300", "400", "500", "600"] 
});

export const metadata: Metadata = {
  title: "Pet Store POS",
  description: "ระบบขายหน้าร้านสำหรับร้านค้าสัตว์เลี้ยง",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body className={mitr.className}>{children}</body>
    </html>
  );
}