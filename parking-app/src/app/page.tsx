"use client";

import Image from "next/image";
import Link from "next/link";
import { Bell, Settings, Menu, Home, MapPin, Car, User, CreditCard, History } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import OngoingSession from "./components/parking/OngoingSession";
import ZonesGrid from "./components/parking/ZonesGrid";
import BottomNavigation from "./components/navigation/BottomNavigation";
import doctorImage from "./images/doctor-2.jpg";

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const menuItems = [
    { icon: Home, label: "Home", href: "/", active: true },
    { icon: MapPin, label: "Find Parking", href: "/find-parking" },
    { icon: Car, label: "My Bookings", href: "/bookings" },
    { icon: CreditCard, label: "Payment", href: "/payment" },
    { icon: History, label: "History", href: "/history" },
    { icon: User, label: "Profile", href: "/profile" },
  ];

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="p-4 flex items-center justify-between bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
        <div className="flex items-center flex-1">
          {/* Menu Button */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="mr-3 hover:bg-gray-100 p-2 rounded-full transition-colors"
            >
              <Menu className="h-5 w-5 text-gray-600" />
            </button>

            {/* Dropdown Menu */}
            {isMenuOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 z-40 overflow-hidden">
                <div className="py-2">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <h3 className="text-sm font-semibold text-gray-900">Navigation</h3>
                    <p className="text-xs text-gray-500 mt-1">Quick access to all features</p>
                  </div>
                  {menuItems.map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 text-sm transition-all duration-200 ${
                          item.active
                            ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
                            : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                        }`}
                      >
                        <div className={`p-1.5 rounded-lg ${
                          item.active ? "bg-blue-100" : "bg-gray-100"
                        }`}>
                          <IconComponent className={`w-4 h-4 ${
                            item.active ? "text-blue-600" : "text-gray-600"
                          }`} />
                        </div>
                        <span className="font-medium">{item.label}</span>
                        {item.active && (
                          <div className="ml-auto w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
                        )}
                      </Link>
                    );
                  })}
                </div>
                <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
                  <p className="text-xs text-gray-500 text-center">
                    SunnPark v2.0 • Smart Parking Solutions
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="flex-1 text-center">
            <h2 className="text-xl font-semibold text-gray-900">SunnPark</h2>
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
            <Bell className="h-5 w-5 text-gray-600" />
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
            <Settings className="h-5 w-5 text-gray-600" />
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
