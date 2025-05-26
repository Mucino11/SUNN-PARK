"use client";

import React, { useEffect, useState } from "react";
import { Car, MapPin, Clock, CreditCard } from "lucide-react";

interface Booking {
  date: string;
  startTime: string;
  endTime: string;
  id: number;
  zone: number;
}

const getZoneColor = (zone: number) => {
  switch (zone) {
    case 1:
      return "bg-gradient-to-br from-blue-400 to-blue-600";
    case 2:
      return "bg-gradient-to-br from-pink-400 to-pink-600";
    case 3:
      return "bg-gradient-to-br from-indigo-500 to-indigo-700";
    case 4:
      return "bg-gradient-to-br from-green-400 to-green-600";
    case 5:
      return "bg-gradient-to-br from-purple-500 to-purple-700";
    default:
      return "bg-gradient-to-br from-gray-400 to-gray-600";
  }
};

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
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <Car className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No Active Sessions
          </h3>
          <p className="text-gray-600 mb-6">
            Book a parking spot to see your active sessions here
          </p>
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-blue-800 font-medium">
              💡 Tip: Select a zone from below to make your first booking!
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {todayBookings.map((booking) => (
        <div key={booking.id} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 ${getZoneColor(booking.zone)} rounded-xl flex items-center justify-center text-white shadow-lg`}>
                  <div className="text-center">
                    <div className="text-lg font-bold">{booking.zone}</div>
                    <div className="text-xs opacity-90">Zone</div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Zone {booking.zone}</h3>
                  <div className="flex items-center gap-2 text-gray-600 mt-1">
                    <Clock className="w-4 h-4" />
                    <span className="font-medium">{booking.startTime} - {booking.endTime}</span>
                  </div>
                  <div className="flex items-center gap-2 text-green-600 mt-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">Active Session</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() =>
                  setExpandedBookingId(
                    expandedBookingId === booking.id ? null : booking.id
                  )
                }
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                {expandedBookingId === booking.id ? "Hide Details" : "View Details"}
              </button>
            </div>
          </div>

          {expandedBookingId === booking.id && (
            <div className="bg-gray-50 border-t border-gray-100">
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900 text-lg mb-3">Booking Details</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <MapPin className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Date</p>
                          <p className="font-medium text-gray-900">{formatDate(booking.date)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                          <Clock className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Duration</p>
                          <p className="font-medium text-gray-900">{booking.startTime} - {booking.endTime}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900 text-lg mb-3">Location Info</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                          <MapPin className="w-4 h-4 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Address</p>
                          <p className="font-medium text-gray-900">1453 Bjørnemyr, Parking Zone {booking.zone}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                          <CreditCard className="w-4 h-4 text-orange-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Total Cost</p>
                          <p className="font-medium text-gray-900">25 NOK</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      Booking ID: #{booking.id}
                    </div>
                    <div className="flex gap-3">
                      <button className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium">
                        Cancel Booking
                      </button>
                      <button className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors font-medium">
                        Extend Time
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
