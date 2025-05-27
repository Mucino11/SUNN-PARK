"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { GoogleMap, Marker } from "@react-google-maps/api";
import BottomNavigation from "@/app/components/navigation/BottomNavigation";

const containerStyle = {
  width: "100%",
  height: "100vh",
};

const center = {
  lat: 59.83588540467462,
  lng: 10.641742084419745,
};

const parkingSpots = [
  { id: 1, position: { lat: 59.83628032960509, lng: 10.643415884814257 } },
  { id: 2, position: { lat: 59.836737412789574, lng: 10.642018625370964 } },
  { id: 3, position: { lat: 59.83470425865298, lng: 10.64174208440729 } },
  { id: 4, position: { lat: 59.835058972537794, lng: 10.638983952485372 } },
  { id: 5, position: { lat: 59.836086524434066, lng: 10.641916741850157 } },
];

export default function FindParkingPage() {
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

        <BottomNavigation />
      </div>
    </div>
  );
}

const getSpotColor = (num: number) => {
  switch (num) {
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
