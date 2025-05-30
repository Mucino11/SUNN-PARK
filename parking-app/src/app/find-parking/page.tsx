"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { GoogleMap, Marker } from "@react-google-maps/api";
import BottomNavigation from "@/app/components/navigation/BottomNavigation";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, MapPin, Navigation, Clock, Car, Search, Filter } from "lucide-react";
import BottomNavigation from "../components/navigation/BottomNavigation";
import doctorImage from "../images/doctor-2.jpg";

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

const getZoneInfo = (zone: number) => {
  const info = {
    1: { distance: "50m", time: "1 min", availability: 85, price: 30 },
    2: { distance: "120m", time: "2 min", availability: 65, price: 25 },
    3: { distance: "200m", time: "3 min", availability: 45, price: 20 },
    4: { distance: "300m", time: "4 min", availability: 75, price: 18 },
    5: { distance: "450m", time: "5 min", availability: 90, price: 15 },
  };
  return info[zone as keyof typeof info] || info[1];
};

export default function FindParkingPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [mapLoading, setMapLoading] = useState(false);

  const filters = [
    { id: "all", label: "All Zones", icon: MapPin },
    { id: "available", label: "Available", icon: Car },
    { id: "nearby", label: "Nearby", icon: Navigation },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="p-4 flex items-center justify-between bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="flex items-center flex-1">
          <Link
            href="/"
            className="mr-3 hover:bg-gray-100 p-2 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <div className="flex-1 text-center">
            <h2 className="text-xl font-semibold text-gray-900">Find Parking</h2>
          </div>
  const router = useRouter();
  const [search, setSearch] = useState("");

  return (
    <div className="w-full min-h-screen bg-white flex justify-center">
      <div className="w-full max-w-md md:max-w-3xl lg:max-w-5xl relative">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={16}
          options={{
            fullscreenControl: false,
            mapTypeControl: false,
            streetViewControl: false,
            zoomControl: false,
          }}
        >
          {parkingSpots.map((spot) => (
            <Marker
              key={spot.id}
              position={spot.position}
              label={spot.id.toString()}
              onClick={() => router.push(`/zoneDetails?zone=${spot.id}`)}
            />
          ))}
        </GoogleMap>

        <div className="absolute top-2 left-4 right-4 z-10">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const zone = parseInt(search);
              if (zone >= 1 && zone <= 5) {
                router.push(`/zoneDetails?zone=${zone}`);
              }
            }}
            className="flex gap-2"
          >
            <input
              type="number"
              min="1"
              max="5"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for parking spots..."
              className="w-full px-4 py-3 rounded-xl shadow bg-white text-gray-800 placeholder-gray-500 text-sm focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors"
            >
              Go
            </button>
          </form>
        </div>
        <div className="flex items-center gap-1">
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

      <main className="max-w-7xl mx-auto p-4 pb-20">
        {/* Search and Filter Section */}
        <div className="mb-6 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search parking zones..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {filters.map((filter) => {
              const IconComponent = filter.icon;
              return (
                <button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
                    selectedFilter === filter.id
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span className="text-sm font-medium">{filter.label}</span>
                </button>
              );
            })}
        <div className="absolute bottom-20 left-4 right-4 z-10 bg-white rounded-2xl p-4 shadow-md">
          <div className="flex justify-between items-center">
            <div className="flex-1 flex flex-col items-center border-r border-gray-200">
              <p className="font-semibold mb-2 text-xs sm:text-sm text-gray-800">
                Find Parking
              </p>
              <div className="flex gap-2">
                {parkingSpots.map((spot) => (
                  <div
                    key={spot.id}
                    className={`w-6 h-6 text-xs flex items-center justify-center rounded-full text-white font-bold cursor-pointer ${getSpotColor(
                      spot.id
                    )}`}
                    onClick={() => router.push(`/zoneDetails?zone=${spot.id}`)}
                  >
                    {spot.id}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 flex flex-col items-center">
              <p className="font-semibold mb-2 text-xs sm:text-sm text-gray-800">
                Reserve
              </p>
              <button
                onClick={() => router.push("/zoneDetails")}
                className="text-blue-600 text-xl font-bold hover:text-blue-700"
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Map Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Interactive Map</h3>
                    <p className="text-sm text-gray-600">Real-time parking availability</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="font-medium">Live Updates</span>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                {mapLoading && (
                  <div className="absolute inset-0 bg-white bg-opacity-90 flex flex-col items-center justify-center z-10">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-3"></div>
                    <p className="text-sm text-gray-600 font-medium">Loading Map...</p>
                  </div>
                )}
                
                <iframe 
                  src="https://snazzymaps.com/embed/699857" 
                  width="100%" 
                  height="600px" 
                  style={{border: 'none'}}
                  className={`transition-all duration-700 ${mapLoading ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}
                  title="Parking Areas Map"
                  onLoad={() => setMapLoading(false)}
                />
              </div>
            </div>
          </div>

          {/* Zone List Section */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-4 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Available Zones</h3>
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((zone) => {
                  const zoneInfo = getZoneInfo(zone);
                  return (
                    <Link
                      key={zone}
                      href={`/zoneDetails?zone=${zone}`}
                      className="block p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-200 hover:shadow-md border border-gray-100"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-12 h-12 ${getZoneColor(zone)} rounded-xl flex items-center justify-center text-white font-bold shadow-md`}>
                            {zone}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">Zone {zone}</h4>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <MapPin className="w-3 h-3" />
                              <span>{zoneInfo.distance} from hospital</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-green-600">{zoneInfo.price} NOK</div>
                          <div className="text-xs text-gray-500">per hour</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4 text-blue-500" />
                            <span className="text-gray-600">{zoneInfo.time} walk</span>
                          </div>
                          <div className={`flex items-center gap-1 ${
                            zoneInfo.availability > 70 ? 'text-green-600' : 
                            zoneInfo.availability > 30 ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                            <div className={`w-2 h-2 rounded-full ${
                              zoneInfo.availability > 70 ? 'bg-green-500' : 
                              zoneInfo.availability > 30 ? 'bg-yellow-500' : 'bg-red-500'
                            } animate-pulse`}></div>
                            <span className="font-medium">{zoneInfo.availability}% available</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-2xl p-4 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Total Zones</span>
                  <span className="font-semibold text-gray-900">5</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Available Spots</span>
                  <span className="font-semibold text-green-600">234</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Average Price</span>
                  <span className="font-semibold text-blue-600">22 NOK/hr</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Closest Zone</span>
                  <span className="font-semibold text-purple-600">Zone 1</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
}
