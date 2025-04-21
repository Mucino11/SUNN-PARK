import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

// Basic metadata for your app
export const metadata: Metadata = {
  title: "Parking App",
  description: "Find and book parking spots easily",
};

// Root layout component
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Create the Supabase client
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  try {
    // Await the session check
    const {
      data: { session },
    } = await supabase.auth.getSession();

    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>Parking App</title>
        </head>
        <body>
          {/* You might want to add a loading state here */}
          <AuthProvider>{children}</AuthProvider>
        </body>
      </html>
    );
  } catch (error) {
    console.error("Layout error:", error);
    // Return a basic layout if there's an error
    return (
      <html lang="en">
        <body>
          {/* You might want to add a loading state here */}
          <AuthProvider>{children}</AuthProvider>
        </body>
      </html>
    );
  }
}
// this comment is a test
