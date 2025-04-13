"use client";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

export default function Home() {
  const [connectionStatus, setConnectionStatus] =
    useState<string>("Checking...");

  useEffect(() => {
    const testConnection = async () => {
      try {
        // Test connection by querying the parking_spots table
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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Parking App</h1>
      <p className="text-xl mt-4">
        Supabase Connection Status: {connectionStatus}
      </p>
    </main>
  );
}
