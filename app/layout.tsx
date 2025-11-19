import "./globals.css";
import type { Metadata } from "next";
import ConditionalLayout from "@/app/_components/ConditionalLayout";

export const metadata: Metadata = {
  title: "MTC",
  description: "Official website",
  icons: {
    icon: "/jmh-logo.jpg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  );
}
