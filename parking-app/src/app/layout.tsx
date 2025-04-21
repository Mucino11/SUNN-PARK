import type { Metadata } from "next";
import React from "react";
import "./globals.css";
import { AuthProvider } from "./context/AuthContext";

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
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Parking App</title>
      </head>
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
