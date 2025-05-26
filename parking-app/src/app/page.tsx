"use client";

import Image from "next/image";
import Header from "./components/navigation/Header";
import OngoingSession from "./components/parking/OngoingSession";
import ZonesGrid from "./components/parking/ZonesGrid";
import BottomNavigation from "./components/navigation/BottomNavigation";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header
        logoSrc="/logo.svg"
        profileSrc="/img/pexels-linkedin-2182970.jpg"
      />

      <main className="px-4 pt-4 sm:pt-6 pb-20 max-w-7xl mx-auto">
        {/* SunnPark Logo and Welcome Section */}
        <section className="mb-8 sm:mb-10">
          <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <Image
                  src="/img/SunnPark-Logo.PNG"
                  alt="SunnPark Logo"
                  width={80}
                  height={80}
                  className="sm:w-24 sm:h-24 object-contain"
                />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                  SunnPark
                </h1>
                <p className="text-sm sm:text-base text-gray-600">
                  Smart parking solutions for hospital visitors
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Current Session Section */}
        <section className="mt-6 sm:mt-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              Current Session
            </h2>
          </div>
          <OngoingSession />
        </section>

        {/* Parking Zones Section */}
        <section className="mt-8 sm:mt-10 space-y-4 sm:space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-600 rounded-lg flex items-center justify-center">
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                />
              </svg>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              Parking Zones
            </h2>
          </div>
          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg">
            <p className="text-sm sm:text-base text-gray-600 mb-4">
              Choose from our 5 strategically located parking zones. Each zone offers different amenities and walking distances to the main entrance.
            </p>
            <ZonesGrid />
          </div>
        </section>
      </main>

      <BottomNavigation />
    </div>
  );
}
