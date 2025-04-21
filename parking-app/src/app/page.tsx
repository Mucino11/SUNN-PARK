"use client";

import ProtectedRoute from "@/components/ProtectedRoute";

export default function Home() {
  return (
    <ProtectedRoute>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1>Welcome to the Home Page</h1>
        {/* Your home page content */}
      </main>
    </ProtectedRoute>
  );
}
