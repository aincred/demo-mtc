"use client";

import { usePathname } from "next/navigation";
import Header from "@/app/_components/Header";
import Footer from "@/app/_components/Footer";

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // 👇 Add all dashboard routes that should NOT use main site layout
  const hideLayout =
    pathname.startsWith("/admin") ||
    pathname.startsWith("/mtc-user") ||
    pathname.startsWith("/state-user") ||
    pathname.startsWith("/district-user");

  return (
    <>
      {!hideLayout && <Header />}
      <main className="p-0">{children}</main>
      {!hideLayout && <Footer />}
    </>
  );
}
