import type { Metadata } from "next";
import "./globals.css";

// Basic metadata for your app
export const metadata: Metadata = {
  title: "Parking App",
  description: "Find and book parking spots easily",
};

// Root layout component
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
// this comment is a test
