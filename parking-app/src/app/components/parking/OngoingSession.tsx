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

interface CircularTimerProps {
  timeRemaining: number;
  totalTime: number;
  size?: number;
  strokeWidth?: number;
  showDetails?: boolean;
}

function CircularTimer({ timeRemaining, totalTime, size = 120, strokeWidth = 8, showDetails = false }: CircularTimerProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const progress = ((totalTime - timeRemaining) / totalTime) * 100;
  const strokeDasharray = `${circumference} ${circumference}`;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (showDetails) {
      if (hours > 0) {
        return `${hours}h ${minutes}m`;
      }
      return `${minutes}m ${secs}s`;
    } else {
      // More compact format for small timers
      if (hours > 0) {
        return `${hours}h${minutes}m`;
      }
      return `${minutes}m`;
    }
  };

  const getProgressColor = () => {
    if (progress < 50) return "#10B981"; // green
    if (progress < 80) return "#F59E0B"; // orange
    return "#EF4444"; // red
  };

  const getBackgroundGradient = () => {
    if (progress < 50) return "from-green-50 to-green-100";
    if (progress < 80) return "from-orange-50 to-orange-100";
    return "from-red-50 to-red-100";
  };

  // Dynamic text sizing based on timer size
  const getTextSize = () => {
    if (size <= 60) return "text-xs";
    if (size <= 100) return "text-sm";
    return showDetails ? "text-lg" : "text-sm";
  };

  const getLabelSize = () => {
    if (size <= 60) return "text-xs";
    return showDetails ? "text-sm" : "text-xs";
  };

  return (
    <div className={`relative inline-flex items-center justify-center bg-gradient-to-br ${getBackgroundGradient()} rounded-full p-2 shadow-lg`}>
      <svg
        className="transform -rotate-90 drop-shadow-sm"
        width={size}
        height={size}
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="text-white text-opacity-50"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={getProgressColor()}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-in-out drop-shadow-sm"
          style={{
            filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))"
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-1">
        <div className={`font-bold ${getTextSize()} text-gray-900 drop-shadow-sm leading-tight`}>
          {formatTime(timeRemaining)}
        </div>
        <div className={`text-gray-600 ${getLabelSize()} font-medium leading-tight`}>
          left
        </div>
      </div>
    </div>
  );
}

export default function OngoingSession() {
  const [todayBookings, setTodayBookings] = useState<Booking[]>([]);
  const [expandedBookingId, setExpandedBookingId] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

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

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const calculateTimeRemaining = (booking: Booking) => {
    const now = new Date();
    
    // Create proper date objects for start and end times using the booking date
    const bookingDate = new Date(booking.date);
    
    const startTime = new Date(bookingDate);
    const [startHour, startMinute] = booking.startTime.split(':').map(Number);
    startTime.setHours(startHour, startMinute, 0, 0);
    
    const endTime = new Date(bookingDate);
    const [endHour, endMinute] = booking.endTime.split(':').map(Number);
    endTime.setHours(endHour, endMinute, 0, 0);
    
    const totalTime = endTime.getTime() - startTime.getTime();
    const timeRemaining = endTime.getTime() - now.getTime();
    
    return {
      timeRemaining: Math.max(0, Math.floor(timeRemaining / 1000)),
      totalTime: Math.floor(totalTime / 1000)
    };
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
      {todayBookings.map((booking) => {
        const { timeRemaining, totalTime } = calculateTimeRemaining(booking);
        const isExpired = timeRemaining <= 0;
        
        return (
          <div key={booking.id} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
            <div className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3 sm:gap-4 flex-1">
                  <div className={`w-12 h-12 sm:w-16 sm:h-16 ${getZoneColor(booking.zone)} rounded-xl flex items-center justify-center text-white shadow-lg flex-shrink-0`}>
                    <div className="text-center">
                      <div className="text-sm sm:text-lg font-bold">{booking.zone}</div>
                      <div className="text-xs opacity-90">Zone</div>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 truncate">Zone {booking.zone}</h3>
                    <div className="flex items-center gap-2 text-gray-600 mt-1">
                      <Clock className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                      <span className="font-medium text-sm sm:text-base">{booking.startTime} - {booking.endTime}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mt-2">
                      <div className={`flex items-center gap-2 ${isExpired ? 'text-red-600' : 'text-green-600'}`}>
                        <div className={`w-2 h-2 ${isExpired ? 'bg-red-500' : 'bg-green-500'} rounded-full ${isExpired ? '' : 'animate-pulse'}`}></div>
                        <span className="text-xs sm:text-sm font-medium">
                          {isExpired ? 'Session Expired' : 'Active Session'}
                        </span>
                      </div>
                      {!isExpired && (
                        <div className="text-xs sm:text-sm font-medium text-gray-700">
                          {Math.floor(timeRemaining / 3600) > 0 
                            ? `${Math.floor(timeRemaining / 3600)}h ${Math.floor((timeRemaining % 3600) / 60)}m left`
                            : `${Math.floor(timeRemaining / 60)}m left`
                          }
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4">
                  {!isExpired && (
                    <CircularTimer 
                      timeRemaining={timeRemaining} 
                      totalTime={totalTime}
                      size={60}
                      strokeWidth={3}
                    />
                  )}
                  <button
                    onClick={() =>
                      setExpandedBookingId(
                        expandedBookingId === booking.id ? null : booking.id
                      )
                    }
                    className="px-3 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg sm:rounded-xl font-medium hover:from-blue-600 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg text-sm sm:text-base whitespace-nowrap"
                  >
                    {expandedBookingId === booking.id ? "Hide" : "Details"}
                  </button>
                </div>
              </div>
            </div>

            {expandedBookingId === booking.id && (
              <div className="bg-gray-50 border-t border-gray-100">
                <div className="p-4 sm:p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900 text-base sm:text-lg mb-3">Booking Details</h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <MapPin className="w-4 h-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Date</p>
                            <p className="font-medium text-gray-900 text-sm sm:text-base">{formatDate(booking.date)}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Clock className="w-4 h-4 text-green-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Duration</p>
                            <p className="font-medium text-gray-900 text-sm sm:text-base">{booking.startTime} - {booking.endTime}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900 text-base sm:text-lg mb-3">Location Info</h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <MapPin className="w-4 h-4 text-purple-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Address</p>
                            <p className="font-medium text-gray-900 text-sm sm:text-base">1453 Bjørnemyr, Parking Zone {booking.zone}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <CreditCard className="w-4 h-4 text-orange-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Total Cost</p>
                            <p className="font-medium text-gray-900 text-sm sm:text-base">25 NOK</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {!isExpired && (
                      <div className="space-y-4">
                        <h4 className="font-semibold text-gray-900 text-base sm:text-lg mb-3">Time Remaining</h4>
                        <div className="flex justify-center">
                          <CircularTimer 
                            timeRemaining={timeRemaining} 
                            totalTime={totalTime}
                            size={120}
                            strokeWidth={8}
                            showDetails={true}
                          />
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-500">
                            Session ends at {booking.endTime}
                          </p>
                        </div>
                      </div>
                    )}

                    {isExpired && (
                      <div className="space-y-4">
                        <h4 className="font-semibold text-red-600 text-base sm:text-lg mb-3">Session Expired</h4>
                        <div className="bg-red-50 rounded-lg p-4 text-center">
                          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <Clock className="w-8 h-8 text-red-600" />
                          </div>
                          <p className="text-red-800 font-medium mb-2">Time's Up!</p>
                          <p className="text-red-600 text-sm">
                            Your parking session ended at {booking.endTime}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 flex flex-col sm:flex-row gap-3">
                    <button className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-xl font-medium hover:bg-blue-700 transition-colors">
                      Extend Session
                    </button>
                    <button className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-xl font-medium hover:bg-gray-200 transition-colors">
                      End Session
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
