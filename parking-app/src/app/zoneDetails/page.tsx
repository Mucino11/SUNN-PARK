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
      return "bg-[#c4dbf3]"; // Light blue
    case 2:
      return "bg-[#eddee5]"; // Light pink
    case 3:
      return "bg-[#003087]"; // Dark blue
    case 4:
      return "bg-[#c2d6cc]"; // Light green
    case 5:
      return "bg-[#6B46C1]"; // Dark purple
    default:
      return "bg-[#1a1a1a]"; // Dark gray
  }
};

const getZoneTextColor = (zone: number) => {
  switch (zone) {
    case 3:
    case 5:
      return "text-white"; // White text on dark colors
    case 1:
    case 2:
    case 4:
      return "text-[#1a1a1a]"; // Dark text on light backgrounds
    default:
      return "text-white"; // White text on dark gray
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

const getZonePrice = (zone: number) => {
  switch (zone) {
    case 1:
      return 30; // Closest, most expensive
    case 2:
      return 25;
    case 3:
      return 20;
    case 4:
      return 18;
    case 5:
      return 15; // Furthest, cheapest
    default:
      return 25;
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
  const [showReservationModal, setShowReservationModal] = useState(false);

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
    setShowReservationModal(true);
  };

  const confirmReservation = () => {
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
    setShowReservationModal(false);

    // Show success message
    setTimeout(() => {
      alert("Booking confirmed successfully! 🎉");
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="p-4 flex items-center justify-between bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="flex items-center flex-1">
          <Link
            href="/"
            className="mr-3 hover:bg-gray-100 p-2 rounded-full transition-colors"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <div className="flex-1 text-center">
            <h2 className="text-xl font-semibold text-gray-900">Zone {zoneNumber} Details</h2>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Link
            href="#"
            className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
            onClick={(e) => {
              e.preventDefault();
              alert("Notifications coming soon!");
            }}
          >
            <svg className="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-blue-600"></span>
          </Link>
          <Link
            href="#"
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            onClick={(e) => {
              e.preventDefault();
              alert("Settings coming soon!");
            }}
          >
            <svg className="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </Link>
          <Link href="/profile" className="ml-2">
            <div className="h-8 w-8 rounded-full overflow-hidden border border-white hover:opacity-90 transition-opacity">
              <Image
                src={doctorImage}
                alt="Profile"
                width={32}
                height={32}
                className="object-cover"
              />
            </div>
          </Link>
        </div>
      </header>

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
                        ? `${getZoneColor(zone)} ${getZoneTextColor(zone)} shadow-lg ring-2 ring-blue-300`
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
                    <div className="text-2xl sm:text-3xl font-bold">{getZonePrice(zoneNumber)} NOK</div>
                    <div className="text-xs sm:text-sm opacity-90">per hour</div>
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
                      className="w-full p-3 sm:p-4 border-2 border-gray-200 rounded-xl text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none bg-gradient-to-r from-white to-gray-50 shadow-sm hover:border-blue-300 hover:shadow-md cursor-pointer"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                    >
                      <option value="" className="text-gray-400">📅 Choose a date</option>
                      {dates.map((date) => (
                        <option key={date} value={date} className="text-gray-900">
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
                      <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
                    <div className="relative">
                      <select
                        className="w-full p-3 sm:p-4 border-2 border-gray-200 rounded-xl text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none bg-gradient-to-r from-white to-gray-50 shadow-sm hover:border-blue-300 hover:shadow-md cursor-pointer"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                      >
                        <option value="" className="text-gray-400">🕐 From</option>
                        {timeSlots.map((time) => (
                          <option key={time} value={time} className="text-gray-900">
                            {time}
                          </option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
                    <div className="relative">
                      <select
                        className="w-full p-3 sm:p-4 border-2 border-gray-200 rounded-xl text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none bg-gradient-to-r from-white to-gray-50 shadow-sm hover:border-blue-300 hover:shadow-md cursor-pointer"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                      >
                        <option value="" className="text-gray-400">🕕 To</option>
                        {timeSlots.map((time) => (
                          <option key={time} value={time} className="text-gray-900">
                            {time}
                          </option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

      {/* Reservation Confirmation Modal */}
      {showReservationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full mx-4 overflow-hidden shadow-2xl transform transition-all">
            <div className="p-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Confirm Reservation</h3>
                <p className="text-gray-600 mb-6">Please confirm your parking reservation details</p>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">Zone</span>
                    <span className="font-semibold text-gray-900">Zone {zoneNumber}</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">Date</span>
                    <span className="font-semibold text-gray-900">
                      {selectedDate ? new Date(selectedDate).toLocaleDateString('en-GB', { 
                        weekday: 'short', 
                        month: 'short', 
                        day: 'numeric' 
                      }) : ''}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">Time</span>
                    <span className="font-semibold text-gray-900">{startTime} - {endTime}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Cost</span>
                    <span className="font-bold text-green-600">{getZonePrice(zoneNumber)} NOK</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowReservationModal(false)}
                  className="flex-1 py-3 px-4 border-2 border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmReservation}
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <BottomNavigation />
    </div>
  );
}
