"use client";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [connectionStatus, setConnectionStatus] =
    useState<string>("Checking...");

  useEffect(() => {
    const testConnection = async () => {
      try {
        const { data, error } = await supabase
          .from("parking_spots")
          .select("*");

        if (error) {
          console.error("Connection error:", error);
          setConnectionStatus("Failed: " + error.message);
        } else {
          console.log(
            "Connection successful! Found",
            data.length,
            "parking spots"
          );
          console.log("Data:", data);
          setConnectionStatus("Connected successfully! ✅");
        }
      } catch (e) {
        console.error("Unexpected error:", e);
        setConnectionStatus("Failed: Unexpected error");
      }
    };

    testConnection();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl font-bold mb-8">Parking App</h1>
      <p className="text-xl mb-8">
        Supabase Connection Status: {connectionStatus}
      </p>

      <div className="flex gap-4 mt-8">
        <Link
          href="/payment"
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Go to Payment
        </Link>
        <Link
          href="/zoneDetails"
          className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          View Zone Details
        </Link>
      </div>
    </main>
  );
}
