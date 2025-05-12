// this is the profile pag,. testing

"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  CreditCard,
  Car,
  Bell,
  Clock,
  Settings,
  Calendar,
  MapPin,
  Edit2,
  Plus,
  Filter,
  ChevronRight,
  LogOut,
} from "lucide-react";
import {
  getUserProfile,
  UserProfile as UserProfileType,
  signOut,
} from "@/lib/database";
import { supabase } from "@/lib/supabase";
import BottomNavigation from "../components/navigation/BottomNavigation";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("history");
  const [filterOpen, setFilterOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [tabTransition, setTabTransition] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState<UserProfileType | null>(null);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  // Effect for fetching user profile data
  useEffect(() => {
    setMounted(true);

    const fetchUserProfile = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          router.push("/login");
          return;
        }

        const { data, error } = await getUserProfile(user.id);

        if (error) {
          setError(error.message || "Error loading profile data");
        } else if (data) {
          setProfileData(data);
        } else {
          setError("No profile data found");
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Failed to load profile data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [router]);

  // Effect for CSS animations - Moved here to ensure consistent hook order
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

      // Cleanup function
      return () => {
        if (tailwindStyles.parentNode) {
          tailwindStyles.parentNode.removeChild(tailwindStyles);
        }
      };
    }
  }, []); // Empty dependency array ensures this runs only once on mount

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

  const handleLogout = async () => {
    try {
      await signOut();
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // If the profile is loading, show a loading spinner
  if (loading) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center bg-[#f8f9fa]">
        <div className="w-16 h-16 border-4 border-[#003087] border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-[#1a1a1a]">Loading profile...</p>
      </div>
    );
  }

  // If there was an error, show an error message
  if (error || !profileData) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center bg-[#f8f9fa] p-4">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-[#1a1a1a] mb-2">Oops!</h2>
          <p className="text-gray-600 mb-4">
            {error || "Failed to load profile data"}
          </p>
          <button
            onClick={() => router.push("/login")}
            className="px-4 py-2 bg-[#003087] text-white rounded-lg hover:bg-[#002a77] transition-colors"
          >
            Return to Login
          </button>
        </div>
      </div>
    );
  }

  // Filter options
  const filterOptions = {
    timeRange: ["Last 7 days", "Last 30 days", "Last 3 months", "Last year"],
    zones: ["All zones", "Zone 1", "Zone 5"],
    status: ["All", "Completed", "Active", "Canceled"],
  };

  const formattedProfileData = {
    name: profileData.user.full_name,
    avatar: profileData.user.avatar_url,
    email: profileData.user.email,
    phone: profileData.user.phone_number,
    address: profileData.user.address,
    memberSince: new Date(profileData.user.member_since).toLocaleDateString(
      "en-US",
      { month: "long", year: "numeric" }
    ),
    favoriteZones: [profileData.stats.most_visited_zone || "None"],
    vehicles: profileData.vehicles.map((v) => ({
      id: v.id,
      plate: v.plate,
      make: v.make,
      model: v.model,
      color: v.color,
      default: v.is_default,
    })),
    paymentMethods: profileData.paymentMethods.map((p) => ({
      id: p.id,
      type: p.type,
      last4: p.last4,
      expiry: p.expiry,
      default: p.is_default,
    })),
    stats: {
      totalSpent: profileData.stats.total_spent || "0 kr",
      totalHours: profileData.stats.total_hours || "0 hours",
      mostVisitedZone: profileData.stats.most_visited_zone || "None",
      averageStay: profileData.stats.average_stay || "0 hours",
    },
    logs: profileData.sessions.map((s) => ({
      id: s.id,
      date: new Date(s.date).toLocaleDateString("en-US", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
      formattedDate: s.formatted_date,
      duration: s.duration,
      startTime: s.start_time,
      endTime: s.end_time,
      parking: s.parking_spot,
      total: s.total,
      zone: s.zone,
      location: s.location,
      status: s.status,
    })),
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
          <button
            onClick={handleLogout}
            className="p-2 hover:bg-[#eef2f5] rounded-full transition-colors text-red-500"
            title="Log out"
          >
            <LogOut className="h-5 w-5" />
          </button>
          <div className="h-8 w-8 rounded-full bg-[#003087] overflow-hidden border border-white ml-2">
            {formattedProfileData.avatar ? (
              <Image
                src={formattedProfileData.avatar}
                alt="Profile"
                width={32}
                height={32}
                className="object-cover"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center text-white font-medium text-sm">
                {formattedProfileData.name.charAt(0)}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Profile Card */}
      <div className="mx-4 mt-5">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-[#e0e7eb]">
          <div className="p-5">
            <div className="flex items-center">
              <div className="h-16 w-16 rounded-full bg-[#e6f0fa] overflow-hidden mr-4 border-2 border-white flex-shrink-0">
                {formattedProfileData.avatar ? (
                  <Image
                    src={formattedProfileData.avatar}
                    alt="Profile"
                    width={64}
                    height={64}
                    className="object-cover"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-[#003087] font-semibold text-xl">
                    {formattedProfileData.name.charAt(0)}
                  </div>
                )}
              </div>
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
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="bg-[#e6f0fa] rounded-lg p-3">
                <div className="text-[#003087] text-xs font-medium mb-1">
                  Total Spent
                </div>
                <div className="text-lg font-semibold text-[#1a1a1a]">
                  {formattedProfileData.stats.totalSpent}
                </div>
              </div>
              <div className="bg-[#e0ebe5] rounded-lg p-3">
                <div className="text-[#003087] text-xs font-medium mb-1">
                  Total Time
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
            {formattedProfileData.vehicles.map((vehicle) => (
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
                        {vehicle.make} {vehicle.model}
                      </div>
                      <div className="text-xs text-gray-500">
                        {vehicle.plate}
                      </div>
                    </div>
                  </div>
                  {vehicle.default && (
                    <span className="px-2 py-1 bg-[#e6f0fa] text-[#003087] text-xs font-medium rounded-full">
                      Default
                    </span>
                  )}
                </div>
              </div>
            ))}
            <button className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-[#003087] hover:text-[#003087] transition-colors">
              <Plus className="h-5 w-5" />
              Add Vehicle
            </button>
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
            {/* Filter Button */}
            <div className="flex justify-end mb-1">
              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className="flex items-center text-[#003087] bg-white border border-[#e0e7eb] rounded-lg px-3 py-1.5 text-xs font-medium hover:bg-[#eef2f5] transition-colors shadow-sm"
              >
                <Filter className="h-3.5 w-3.5 mr-1" /> Filter
              </button>
            </div>

            {/* Filter Panel */}
            {filterOpen && (
              <div className="bg-white rounded-lg shadow-sm p-4 border border-[#e0e7eb] mb-3">
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-[#1a1a1a] mb-1">
                      Time Range
                    </label>
                    <select className="w-full border border-[#ced4da] rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#003087] focus:border-[#003087]">
                      {filterOptions.timeRange.map((option, i) => (
                        <option key={i}>{option}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#1a1a1a] mb-1">
                      Zone
                    </label>
                    <select className="w-full border border-[#ced4da] rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#003087] focus:border-[#003087]">
                      {filterOptions.zones.map((option, i) => (
                        <option key={i}>{option}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#1a1a1a] mb-1">
                      Status
                    </label>
                    <select className="w-full border border-[#ced4da] rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#003087] focus:border-[#003087]">
                      {filterOptions.status.map((option, i) => (
                        <option key={i}>{option}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <button className="flex-1 bg-[#003087] text-white rounded-md py-2 text-sm font-medium hover:bg-blue-800 transition-colors">
                    Apply
                  </button>
                  <button
                    onClick={() => setFilterOpen(false)}
                    className="px-4 border border-[#ced4da] rounded-md text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Logs */}
            {formattedProfileData.logs.length > 0 ? (
              formattedProfileData.logs.map((log) => (
                <Link
                  key={log.id}
                  href={`/parking-session/${log.id}`}
                  className="block bg-white rounded-lg shadow-sm p-4 border border-[#e0e7eb] hover:border-[#c4dbf3] hover:shadow-md transition-all duration-150 group"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="flex items-center text-xs text-gray-500 mb-0.5">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>{log.date}</span>
                      </div>
                      <div className="text-sm font-semibold text-[#1a1a1a]">
                        {log.total}
                      </div>
                    </div>
                    <div
                      className={`flex items-center justify-center h-7 w-7 rounded-full text-sm font-semibold text-white ${
                        log.zone === "1" ? "bg-blue-400" : "bg-purple-500"
                      }`}
                    >
                      {log.zone}
                    </div>
                  </div>

                  <div className="flex items-center text-xs text-gray-600 border-t border-[#eef2f5] pt-2 mt-2">
                    <div className="flex items-center mr-4">
                      <Clock className="h-3.5 w-3.5 mr-1 text-gray-400" />
                      <span>{log.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-3.5 w-3.5 mr-1 text-gray-400" />
                      <span>{log.parking}</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-400 ml-auto group-hover:text-[#003087] transition-colors" />
                  </div>
                </Link>
              ))
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-6 text-center border border-[#e0e7eb]">
                <p className="text-gray-500 mb-3">No parking history found.</p>
                <Link
                  href="/find-parking"
                  className="inline-block bg-[#003087] text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-blue-800 transition-colors"
                >
                  Find Parking
                </Link>
              </div>
            )}
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
}
