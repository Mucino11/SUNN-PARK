"use client";

import React, { useEffect, useState } from "react";
import { Car } from "lucide-react";

interface Booking {
  date: string;
  startTime: string;
  endTime: string;
  id: number;
}

export default function OngoingSession() {
  const [todayBookings, setTodayBookings] = useState<Booking[]>([]);
  const [expandedBookingId, setExpandedBookingId] = useState<number | null>(
    null
  );

  const loadBookings = () => {
    const savedBookings = localStorage.getItem("parkingBookings");
    if (savedBookings) {
      const allBookings = JSON.parse(savedBookings);
      const today = new Date().toISOString().split("T")[0];
      const todaySessions = allBookings.filter(
        (booking: Booking) => booking.date === today
      );
      setTodayBookings(todaySessions);
    }
  };

  useEffect(() => {
    // Load initial bookings
    loadBookings();

    // Add event listener for storage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "parkingBookings") {
        loadBookings();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    // Cleanup
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Also update when the component is focused
  useEffect(() => {
    const handleFocus = () => {
      loadBookings();
    };

    window.addEventListener("focus", handleFocus);
    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  if (todayBookings.length === 0) {
    return (
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <Car className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">
                No active sessions
              </h3>
              <p className="text-sm text-gray-600">
                Book a parking spot to see it here
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {todayBookings.map((booking) => (
        <div key={booking.id} className="bg-white rounded-lg shadow-sm">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Car className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Zone 5</h3>
                  <p className="text-sm text-gray-600">
                    {booking.startTime} - {booking.endTime}
                  </p>
                </div>
              </div>
              <button
                onClick={() =>
                  setExpandedBookingId(
                    expandedBookingId === booking.id ? null : booking.id
                  )
                }
                className="px-4 py-2 bg-blue-50 rounded-lg text-sm text-blue-600 hover:bg-blue-100 transition-colors"
              >
                {expandedBookingId === booking.id ? "Hide" : "View"}
              </button>
            </div>
          </div>

          {expandedBookingId === booking.id && (
            <div className="px-4 pb-4 border-t border-gray-100">
              <div className="mt-4 space-y-2">
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-gray-900">Date:</span>{" "}
                  {formatDate(booking.date)}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-gray-900">Time:</span>{" "}
                  {booking.startTime} - {booking.endTime}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-gray-900">Location:</span>{" "}
                  1453 Bjornemyr
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-gray-900">Spot:</span> 10
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-gray-900">Price:</span> 25
                  NOK
                </p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
