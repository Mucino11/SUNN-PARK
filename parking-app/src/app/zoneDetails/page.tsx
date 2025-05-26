"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import doctorImage from "../images/doctor-2.jpg";
import BottomNavigation from "../components/navigation/BottomNavigation";
import bookingsData from "../../data/bookings.json";

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

const getZoneMapUrl = (zone: number) => {
  // Different Snazzy Maps for each zone with specific URLs provided
  switch (zone) {
    case 1:
      return "https://snazzymaps.com/embed/712586";
    case 2:
      return "https://snazzymaps.com/embed/712591";
    case 3:
      return "https://snazzymaps.com/embed/712589";
    case 4:
      return "https://snazzymaps.com/embed/712592";
    case 5:
      return "https://snazzymaps.com/embed/712593";
    default:
      return "https://snazzymaps.com/embed/712586";
  }
};

const getWalkingTime = (zone: number) => {
  switch (zone) {
    case 1:
      return "1 min";
    case 2:
      return "2 min";
    case 3:
      return "3 min";
    case 4:
      return "4 min";
    case 5:
      return "5 min";
    default:
      return "3 min";
  }
};

const getZoneDescription = (zone: number) => {
  switch (zone) {
    case 1:
      return "Premium parking closest to main entrance";
    case 2:
      return "Standard parking with excellent accessibility";
    case 3:
      return "Economy parking with covered areas";
    case 4:
      return "Extended parking with shuttle service";
    case 5:
      return "Long-term parking with security monitoring";
    default:
      return "Standard parking area";
  }
};

export default function ZoneDetails() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const zoneNumber = parseInt(searchParams.get("zone") || "1");
  const [selectedDate, setSelectedDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [availableSpots, setAvailableSpots] = useState(bookingsData.totalSpots);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [mapLoading, setMapLoading] = useState(false);

  // Load bookings from localStorage on component mount
  useEffect(() => {
    const savedBookings = localStorage.getItem("parkingBookings");
    if (savedBookings) {
      const parsedBookings = JSON.parse(savedBookings);
      setBookings(parsedBookings);
      
      // Calculate availability for current zone specifically
      const zoneBookings = parsedBookings.filter((booking: Booking) => booking.zone === zoneNumber);
      setAvailableSpots(bookingsData.totalSpots - zoneBookings.length);
    }
  }, [zoneNumber]);

  const handleZoneChange = (newZone: number) => {
    if (newZone === zoneNumber) return; // Don't reload if same zone
    
    setMapLoading(true);
    
    // Add a smooth transition effect - the iframe will reload with new map
    // Unfortunately, true panning between different Snazzy Maps isn't possible
    // as each zone uses a completely different map URL/iframe
    setTimeout(() => {
      router.push(`/zoneDetails?zone=${newZone}`);
    }, 200);
    
    // Reset loading after navigation and iframe load
    setTimeout(() => {
      setMapLoading(false);
    }, 1200);
  };

  // Generate time slots from 06:00 to 22:00
  const timeSlots = Array.from(
    { length: 17 },
    (_, i) => `${(i + 6).toString().padStart(2, "0")}:00`
  );

  // Generate dates for the next 14 days
  const dates = Array.from({ length: 14 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date.toISOString().split("T")[0];
  });

  const handleBooking = () => {
    if (!selectedDate || !startTime || !endTime) {
      alert("Please select date and time");
      return;
    }

    const newBooking = {
      date: selectedDate,
      startTime,
      endTime,
      id: Date.now(),
      zone: zoneNumber,
    };

    const updatedBookings = [...bookings, newBooking];
    setBookings(updatedBookings);
    
    // Calculate availability for current zone specifically
    const zoneBookings = updatedBookings.filter((booking: Booking) => booking.zone === zoneNumber);
    setAvailableSpots(bookingsData.totalSpots - zoneBookings.length);

    localStorage.setItem("parkingBookings", JSON.stringify(updatedBookings));

    setSelectedDate("");
    setStartTime("");
    setEndTime("");

    alert("Booking successful!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-lg border-b border-gray-200">
        <div className="flex justify-between items-center p-4 sm:p-6 max-w-7xl mx-auto">
          <Link
            href="/"
            className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent text-center">
            Zone {zoneNumber} Details
          </h1>
          <Link href="/" className="rounded-full overflow-hidden ring-2 ring-blue-200 hover:ring-blue-300 transition-all">
            <Image
              src={doctorImage}
              alt="Profile"
              width={32}
              height={32}
              className="sm:w-10 sm:h-10 hover:opacity-90 transition-opacity"
            />
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Map Section */}
          <div className="order-1 lg:order-1 space-y-4 sm:space-y-6">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl overflow-hidden">
              <div className="p-4 sm:p-6 border-b border-gray-100">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1 sm:mb-2">Interactive Map</h2>
                <p className="text-sm sm:text-base text-gray-600">Real-time parking zone visualization</p>
              </div>
              <div className="relative">
                {mapLoading && (
                  <div className="absolute inset-0 bg-white bg-opacity-90 flex flex-col items-center justify-center z-10 rounded-lg">
                    <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-blue-600 mb-3"></div>
                    <p className="text-sm text-gray-600 font-medium">Loading Zone {zoneNumber} Map...</p>
                  </div>
                )}
                <iframe 
                  src={getZoneMapUrl(zoneNumber)}
                  width="100%" 
                  height="300px"
                  style={{border: 'none'}}
                  className={`sm:h-[400px] transition-all duration-700 ${mapLoading ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}
                  title={`Parking Zone ${zoneNumber} Map`}
                />
              </div>
            </div>

            {/* Zone Selector */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">Select Zone</h3>
              <div className="grid grid-cols-5 gap-2 sm:gap-3">
                {[1, 2, 3, 4, 5].map((zone) => (
                  <button
                    key={zone}
                    onClick={() => handleZoneChange(zone)}
                    className={`relative h-12 sm:h-14 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 font-bold text-lg sm:text-xl ${
                      zone === zoneNumber
                        ? `${getZoneColor(zone)} text-white shadow-lg ring-2 ring-blue-300`
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-300"
                    }`}
                  >
                    {zone}
                    {zone === zoneNumber && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-white rounded-full border-2 border-current">
                        <div className="w-full h-full bg-green-400 rounded-full animate-pulse"></div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Section */}
          <div className="order-2 lg:order-2 space-y-4 sm:space-y-6">
            {/* Zone Info Card */}
            <div className={`${getZoneColor(zoneNumber)} rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl text-white overflow-hidden`}>
              <div className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3 sm:gap-0">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold">Zone {zoneNumber}</h2>
                    <p className="text-sm sm:text-base opacity-90">{getZoneDescription(zoneNumber)}</p>
                  </div>
                  <div className="text-left sm:text-right">
                    <div className="text-2xl sm:text-3xl font-bold">25 NOK</div>
                    <div className="text-xs sm:text-sm opacity-90">per day</div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {/* Availability Bar */}
                  <div className="bg-grey bg-opacity-20 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white border-opacity-30 shadow-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm sm:text-base font-medium text-white drop-shadow-sm">Parking Availability</span>
                      <span className="text-sm sm:text-base font-bold text-white drop-shadow-sm">{availableSpots}/{bookingsData.totalSpots}</span>
                    </div>
                    <div className="w-full bg-white bg-opacity-30 rounded-full h-2 mb-2">
                      <div 
                        className="bg-white h-2 rounded-full transition-all duration-500 shadow-sm" 
                        style={{ width: `${(availableSpots / bookingsData.totalSpots) * 100}%` }}
                      ></div>
                    </div>
                    <div className="flex items-center gap-2 text-xs sm:text-sm">
                      <div className={`w-2 h-2 rounded-full ${availableSpots > bookingsData.totalSpots * 0.5 ? 'bg-green-300' : availableSpots > bookingsData.totalSpots * 0.2 ? 'bg-yellow-300' : 'bg-red-300'} animate-pulse shadow-sm`}></div>
                      <span className="text-white drop-shadow-sm">{availableSpots > bookingsData.totalSpots * 0.5 ? 'Good availability' : availableSpots > bookingsData.totalSpots * 0.2 ? 'Limited spots' : 'Nearly full'}</span>
                    </div>
                  </div>
                  
                  {/* Walking Distance */}
                  <div className="bg-grey bg-opacity-20 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white border-opacity-30 shadow-lg">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white drop-shadow-sm" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm sm:text-base font-medium text-white drop-shadow-sm">{getWalkingTime(zoneNumber)} walk to hospital</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Form */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-6">Book Your Spot</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
                  <div className="relative">
                    <select
                      className="w-full p-3 sm:p-4 border-2 border-gray-200 rounded-xl text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none bg-white shadow-sm hover:border-gray-300 cursor-pointer"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                    >
                      <option value="">Choose a date</option>
                      {dates.map((date) => (
                        <option key={date} value={date}>
                          {new Date(date).toLocaleDateString('en-GB', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
                    <div className="relative">
                      <select
                        className="w-full p-3 sm:p-4 border-2 border-gray-200 rounded-xl text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none bg-white shadow-sm hover:border-gray-300 cursor-pointer"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                      >
                        <option value="">From</option>
                        {timeSlots.map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
                    <div className="relative">
                      <select
                        className="w-full p-3 sm:p-4 border-2 border-gray-200 rounded-xl text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none bg-white shadow-sm hover:border-gray-300 cursor-pointer"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                      >
                        <option value="">To</option>
                        {timeSlots.map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 sm:mt-8 space-y-3 sm:space-y-4">
                <button
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 sm:py-4 rounded-lg sm:rounded-xl shadow-lg text-base sm:text-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 active:scale-95 transition-all duration-200"
                  onClick={handleBooking}
                >
                  Reserve Spot
                </button>

                <Link href="/payment" className="block">
                  <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 sm:py-4 rounded-lg sm:rounded-xl shadow-lg text-base sm:text-lg font-semibold hover:from-green-600 hover:to-emerald-700 transform hover:scale-105 active:scale-95 transition-all duration-200">
                    Pay Now
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}
