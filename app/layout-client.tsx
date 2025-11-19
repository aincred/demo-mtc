"use client";

import { usePathname } from "next/navigation";
import React from "react";

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Detect MTC Dashboard path
  const isMtcDashboard = pathname.startsWith("/mtc-user/dashboard");

  if (isMtcDashboard) {
    // ❌ Hide global Header/Footer
    return <>{children}</>;
  }

  // ✅ Show Header/Footer for normal routes
  return <>{children}</>;
}
