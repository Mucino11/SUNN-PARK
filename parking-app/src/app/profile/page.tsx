"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  ArrowLeft,
  CreditCard,
  Car,
  Bell,
  Clock,
  Settings,
  MapPin,
  Edit2,
  Plus,
  X,
} from "lucide-react";
import BottomNavigation from "../components/navigation/BottomNavigation";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("history");
  const [mounted, setMounted] = useState(false);
  const [tabTransition, setTabTransition] = useState(false);
  const [vehicles, setVehicles] = useState([
    {
      id: 1,
      plate: "AB 12345",
      make: "Tesla",
      model: "Model 3",
      color: "White",
      default: true,
    },
    {
      id: 2,
      plate: "CD 67890",
      make: "Volvo",
      model: "XC60",
      color: "Black",
      default: false,
    },
  ]);
  const [showAddVehicle, setShowAddVehicle] = useState(false);
  const [newCarModel, setNewCarModel] = useState("");
  const [newLicensePlate, setNewLicensePlate] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  // Effect for CSS animations
  useEffect(() => {
    if (typeof document !== "undefined") {
      const tailwindStyles = document.createElement("style");
      tailwindStyles.textContent = `
        @keyframes fadeIn {
          from { opacity: 0; } 
          to { opacity: 1; }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out forwards;
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-in-out forwards;
        }
      `;
      document.head.appendChild(tailwindStyles);

      return () => {
        if (tailwindStyles.parentNode) {
          tailwindStyles.parentNode.removeChild(tailwindStyles);
        }
      };
    }
  }, []);

  const handleTabChange = (tab: "history" | "vehicles" | "payment") => {
    if (tab !== activeTab) {
      setTabTransition(true);
      setTimeout(() => {
        setActiveTab(tab);
        setTimeout(() => {
          setTabTransition(false);
        }, 50);
      }, 150);
    }
  };

  // Mock data for the profile
  const formattedProfileData = {
    name: "John Smith",
    avatar: "/img/pexels-linkedin-2182970.jpg",
    email: "john.smith@example.com",
    phone: "+47 123 45 678",
    address: "B R A Veien 6A",
    memberSince: "January 2023",
    favoriteZones: ["Zone 5", "Zone 1"],
    vehicles: [
      {
        id: 1,
        plate: "AB 12345",
        make: "Tesla",
        model: "Model 3",
        color: "White",
        default: true,
      },
      {
        id: 2,
        plate: "CD 67890",
        make: "Volvo",
        model: "XC60",
        color: "Black",
        default: false,
      },
    ],
    paymentMethods: [
      { id: 1, type: "VISA", last4: "4321", expiry: "05/26", default: true },
      {
        id: 2,
        type: "MasterCard",
        last4: "8765",
        expiry: "09/25",
        default: false,
      },
      { id: 3, type: "Vipps", last4: "2468", expiry: "07/27", default: false },
    ],
    stats: {
      totalSpent: "4,250 kr",
      totalHours: "67 hours",
      mostVisitedZone: "Zone 5",
      averageStay: "2.4 hours",
    },
    logs: [
      {
        id: 1,
        date: "2024-03-15",
        formattedDate: "15.03.2024",
        duration: "2h 30m",
        startTime: "09:00",
        endTime: "11:30",
        parking: "A-123",
        total: "150 kr",
        zone: "Zone 5",
        location: "City Center",
        status: "Completed",
      },
      {
        id: 2,
        date: "2024-03-14",
        formattedDate: "14.03.2024",
        duration: "1h 45m",
        startTime: "14:00",
        endTime: "15:45",
        parking: "B-456",
        total: "120 kr",
        zone: "Zone 1",
        location: "Shopping Mall",
        status: "Completed",
      },
    ],
  };

  return (
    <div
      className={`flex flex-col min-h-screen bg-[#f8f9fa] ${
        mounted ? "animate-fadeIn" : "opacity-0"
      }`}
    >
      {/* Header */}
      <header className="p-4 flex items-center justify-between bg-white border-b border-[#e0e7eb] sticky top-0 z-10">
        <div className="flex items-center flex-1">
          <Link
            href="/"
            className="mr-3 hover:bg-[#eef2f5] p-2 rounded-full transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-[#343a40]" />
          </Link>
          <div className="flex-1 text-center">
            <h2 className="text-xl font-semibold text-[#1a1a1a]">Profile</h2>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Link
            href="#"
            className="relative p-2 hover:bg-[#eef2f5] rounded-full transition-colors"
          >
            <Bell className="h-5 w-5 text-[#343a40]" />
            <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-[#003087]"></span>
          </Link>
          <Link
            href="#"
            className="p-2 hover:bg-[#eef2f5] rounded-full transition-colors"
          >
            <Settings className="h-5 w-5 text-[#343a40]" />
          </Link>
          <Link href="/" className="ml-2">
            <div className="h-8 w-8 rounded-full overflow-hidden border border-white hover:opacity-90 transition-opacity">
              <Image
                src={formattedProfileData.avatar}
                alt="Profile"
                width={32}
                height={32}
                className="object-cover"
              />
            </div>
          </Link>
        </div>
      </header>

      {/* Profile Card */}
      <div className="mx-4 mt-5">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-[#e0e7eb]">
          <div className="p-5">
            <div className="flex items-center">
              <Link href="/">
                <div className="h-16 w-16 rounded-full overflow-hidden mr-4 border-2 border-white flex-shrink-0 hover:opacity-90 transition-opacity">
                  <Image
                    src={formattedProfileData.avatar}
                    alt="Profile"
                    width={64}
                    height={64}
                    className="object-cover"
                  />
                </div>
              </Link>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-[#1a1a1a] truncate">
                    {formattedProfileData.name}
                  </h3>
                  <button className="text-[#003087] text-sm font-medium flex items-center gap-1 hover:text-blue-800 transition-colors flex-shrink-0 ml-2">
                    <Edit2 className="h-3.5 w-3.5" /> Edit
                  </button>
                </div>
                <p className="text-sm text-gray-500 truncate">
                  {formattedProfileData.email}
                </p>
                <p className="text-sm text-gray-500">
                  {formattedProfileData.phone}
                </p>
              </div>
            </div>

            <div className="mt-3 flex items-center text-xs text-gray-600 bg-gray-50 p-2 rounded-md">
              <MapPin className="h-3.5 w-3.5 mr-1.5 flex-shrink-0" />
              <span className="truncate">{formattedProfileData.address}</span>
            </div>

            {/* Quick Stats */}
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="bg-[#e6f0fa] rounded-lg p-3">
                <div className="text-xs text-[#003087] font-medium mb-1">
                  Total Spent
                </div>
                <div className="text-lg font-semibold text-[#1a1a1a]">
                  {formattedProfileData.stats.totalSpent}
                </div>
              </div>
              <div className="bg-[#e6f0fa] rounded-lg p-3">
                <div className="text-xs text-[#003087] font-medium mb-1">
                  Total Hours
                </div>
                <div className="text-lg font-semibold text-[#1a1a1a]">
                  {formattedProfileData.stats.totalHours}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 mt-5 sticky top-[73px] bg-[#f8f9fa] z-5 pt-1 pb-1">
        <div className="flex border-b border-[#e0e7eb] bg-white rounded-lg shadow-sm overflow-hidden">
          <button
            onClick={() => handleTabChange("history")}
            className={`flex-1 py-2.5 px-2 text-center font-medium text-sm transition-colors ${
              activeTab === "history"
                ? "text-[#003087] border-b-2 border-[#003087] bg-blue-50"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            History
          </button>
          <button
            onClick={() => handleTabChange("vehicles")}
            className={`flex-1 py-2.5 px-2 text-center font-medium text-sm transition-colors border-l border-[#e0e7eb] ${
              activeTab === "vehicles"
                ? "text-[#003087] border-b-2 border-[#003087] bg-blue-50"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            Vehicles
          </button>
          <button
            onClick={() => handleTabChange("payment")}
            className={`flex-1 py-2.5 px-2 text-center font-medium text-sm transition-colors border-l border-[#e0e7eb] ${
              activeTab === "payment"
                ? "text-[#003087] border-b-2 border-[#003087] bg-blue-50"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            Payment
          </button>
        </div>
      </div>

      {/* Content based on active tab */}
      <div className="px-4 mt-4 pb-24">
        {/* Vehicles Tab */}
        {activeTab === "vehicles" && (
          <div
            className={`space-y-3 animate-slideIn ${
              tabTransition
                ? "opacity-0 -translate-y-2"
                : "opacity-100 translate-y-0"
            } transition-all duration-150`}
          >
            {vehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                className="bg-white rounded-lg shadow-sm p-4 border border-[#e0e7eb]"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center min-w-0">
                    <div className="h-10 w-10 rounded-full bg-[#e6f0fa] flex items-center justify-center mr-3 flex-shrink-0">
                      <Car className="h-5 w-5 text-[#003087]" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-[#1a1a1a] truncate">
                        {vehicle.make ? vehicle.make + " " : ""}{vehicle.model}
                      </div>
                      <div className="text-xs text-gray-500">
                        {vehicle.plate}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {vehicle.default && (
                      <span className="px-2 py-1 bg-[#e6f0fa] text-[#003087] text-xs font-medium rounded-full">
                        Default
                      </span>
                    )}
                    <button
                      className="ml-2 p-1 rounded-full hover:bg-red-100 transition-colors"
                      aria-label="Remove vehicle"
                      onClick={() => setVehicles(vehicles.filter(v => v.id !== vehicle.id))}
                    >
                      <X className="h-4 w-4 text-red-500" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {showAddVehicle ? (
              <form
                className="bg-white rounded-lg shadow-sm p-4 border border-[#e0e7eb] flex flex-col gap-3"
                onSubmit={e => {
                  e.preventDefault();
                  if (!newCarModel.trim() || !newLicensePlate.trim()) return;
                  setVehicles([
                    ...vehicles,
                    {
                      id: Date.now(),
                      make: '',
                      model: newCarModel,
                      plate: newLicensePlate,
                      color: '',
                      default: false,
                    },
                  ]);
                  setShowAddVehicle(false);
                  setNewCarModel("");
                  setNewLicensePlate("");
                }}
              >
                <input
                  type="text"
                  placeholder="Car Model"
                  className="border rounded p-2"
                  value={newCarModel}
                  onChange={e => setNewCarModel(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="License Plate"
                  className="border rounded p-2"
                  value={newLicensePlate}
                  onChange={e => setNewLicensePlate(e.target.value)}
                  required
                />
                <div className="flex gap-2 mt-2">
                  <button
                    type="submit"
                    className="flex-1 bg-[#003087] text-white py-2 rounded hover:bg-blue-800 transition-colors"
                  >
                    Add Vehicle
                  </button>
                  <button
                    type="button"
                    className="flex-1 bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300 transition-colors"
                    onClick={() => setShowAddVehicle(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <button
                className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-[#003087] hover:text-[#003087] transition-colors"
                onClick={() => setShowAddVehicle(true)}
              >
                <Plus className="h-5 w-5" />
                Add Vehicle
              </button>
            )}
          </div>
        )}

        {/* Payment Methods Tab */}
        {activeTab === "payment" && (
          <div
            className={`space-y-3 animate-slideIn ${
              tabTransition
                ? "opacity-0 -translate-y-2"
                : "opacity-100 translate-y-0"
            } transition-all duration-150`}
          >
            {formattedProfileData.paymentMethods.map((method) => (
              <div
                key={method.id}
                className="bg-white rounded-lg shadow-sm p-4 border border-[#e0e7eb]"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center min-w-0">
                    <div className="h-10 w-10 rounded-full bg-[#e6f0fa] flex items-center justify-center mr-3 flex-shrink-0">
                      <CreditCard className="h-5 w-5 text-[#003087]" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-[#1a1a1a]">
                        {method.type} •••• {method.last4}
                      </div>
                      <div className="text-xs text-gray-500">
                        Expires {method.expiry}
                      </div>
                    </div>
                  </div>
                  {method.default && (
                    <span className="px-2 py-1 bg-[#e6f0fa] text-[#003087] text-xs font-medium rounded-full">
                      Default
                    </span>
                  )}
                </div>
              </div>
            ))}
            <button className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-[#003087] hover:text-[#003087] transition-colors">
              <Plus className="h-5 w-5" />
              Add Payment Method
            </button>
          </div>
        )}

        {/* History Tab */}
        {activeTab === "history" && (
          <div
            className={`space-y-3 animate-slideIn ${
              tabTransition
                ? "opacity-0 -translate-y-2"
                : "opacity-100 translate-y-0"
            } transition-all duration-150`}
          >
            {formattedProfileData.logs.map((log) => (
              <div
                key={log.id}
                className="bg-white rounded-lg shadow-sm p-4 border border-[#e0e7eb]"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="text-sm font-medium text-[#1a1a1a]">
                      {log.zone}
                    </div>
                    <div className="text-xs text-gray-500">{log.location}</div>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      log.status === "Completed"
                        ? "bg-green-50 text-green-700"
                        : log.status === "Active"
                        ? "bg-blue-50 text-blue-700"
                        : "bg-red-50 text-red-700"
                    }`}
                  >
                    {log.status}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-4 w-4 mr-1" />
                    {log.duration}
                  </div>
                  <div className="text-[#1a1a1a] font-medium">{log.total}</div>
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  {log.formattedDate} • {log.startTime} - {log.endTime}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
