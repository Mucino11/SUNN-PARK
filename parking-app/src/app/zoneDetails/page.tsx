"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import doctorImage from "../images/doctor-2.jpg";
import map from "../images/map.png";
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
      return "bg-blue-300";
    case 2:
      return "bg-pink-400";
    case 3:
      return "bg-blue-800";
    case 4:
      return "bg-green-200";
    case 5:
      return "bg-purple-600";
    default:
      return "bg-gray-400";
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

export default function ZoneDetails() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const zoneNumber = parseInt(searchParams.get("zone") || "5");
  const [selectedDate, setSelectedDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [availableSpots, setAvailableSpots] = useState(bookingsData.totalSpots);
  const [bookings, setBookings] = useState<Booking[]>([]);

  // Load bookings from localStorage on component mount
  useEffect(() => {
    const savedBookings = localStorage.getItem("parkingBookings");
    if (savedBookings) {
      const parsedBookings = JSON.parse(savedBookings);
      setBookings(parsedBookings);
      setAvailableSpots(bookingsData.totalSpots - parsedBookings.length);
    }
  }, []);

  const handleZoneChange = (newZone: number) => {
    router.push(`/zoneDetails?zone=${newZone}`);
  };

  // Generate time slots from 00:00 to 23:00
  const timeSlots = Array.from(
    { length: 24 },
    (_, i) => `${i.toString().padStart(2, "0")}:00`
  );

  // Generate dates for the next 7 days
  const dates = Array.from({ length: 7 }, (_, i) => {
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
    setAvailableSpots(bookingsData.totalSpots - updatedBookings.length);

    // Save to localStorage
    localStorage.setItem("parkingBookings", JSON.stringify(updatedBookings));

    // Reset form
    setSelectedDate("");
    setStartTime("");
    setEndTime("");

    alert("Booking successful!");
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <Link
          href="/"
          className="text-3xl hover:text-gray-600 transition-colors"
        >
          &#8592;
        </Link>
        <h2 className="font-bold text-2xl">Zone Details</h2>
        <Link href="/">
          <Image
            src={doctorImage}
            alt="Profile"
            width={75}
            height={75}
            className="rounded-full hover:opacity-90 transition-opacity"
          />
        </Link>
      </div>

      <div className="flex gap-8 mb-8">
        <div className="relative flex-1">
          <Image
            src={map}
            alt="Profile"
            width={500}
            height={500}
            className="square-full"
          />
          <div
            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${getZoneColor(
              zoneNumber
            )} text-white w-14 h-14 rounded-full flex items-center justify-center text-xl shadow-lg`}
          >
            {zoneNumber}
          </div>
        </div>

        <div className="flex-1 space-y-4">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-green-700 text-xl">
              25 NOK/day
            </span>
            <div className="flex items-center gap-3">
              <span className="text-yellow-500">&#9679;</span>
              <span className="text-lg">
                {availableSpots}/{bookingsData.totalSpots} spots
              </span>
            </div>
          </div>

          <p className="text-gray-600 text-base">
            {getWalkingTime(zoneNumber)} walk to hospital entrance
          </p>

          <div className="space-y-3">
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((zone) => (
                <button
                  key={zone}
                  onClick={() => handleZoneChange(zone)}
                  className={`flex-1 py-2 px-4 rounded-lg text-white font-medium transition-colors ${
                    zone === zoneNumber
                      ? getZoneColor(zone)
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                >
                  Zone {zone}
                </button>
              ))}
            </div>

            <select
              className="w-full p-3 border rounded text-base"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            >
              <option value="">Select Date</option>
              {dates.map((date) => (
                <option key={date} value={date}>
                  {new Date(date).toLocaleDateString()}
                </option>
              ))}
            </select>

            <div className="flex gap-3">
              <select
                className="w-1/2 p-3 border rounded text-base"
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

              <select
                className="w-1/2 p-3 border rounded text-base"
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
            </div>
          </div>

          <button
            className="bg-blue-500 text-white w-full py-3 rounded-xl shadow text-lg hover:bg-blue-600 transition-colors"
            onClick={handleBooking}
          >
            Reserve Spot
          </button>

          <Link href="/payment">
            <button className="bg-green-500 text-white w-full py-3 rounded-xl shadow text-lg hover:bg-green-600 transition-colors mt-3">
              Pay Now
            </button>
          </Link>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}
