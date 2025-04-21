"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { 
  ArrowLeft, 
  Home, 
  Search, 
  CreditCard, 
  User,
  Car,
  Bell,
  Clock,
  Wallet,
  Settings,
  Calendar,
  MapPin,
  Edit2,
  Plus,
  Filter,
  ChevronRight,
  TrendingUp
} from "lucide-react";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("history");
  const [filterOpen, setFilterOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [tabTransition, setTabTransition] = useState(false);
  
  useEffect(() => {
    setMounted(true);
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
  
  // Mock data based on the image, updated for hospital context
  const profileData = {
    name: "John Smith",
    avatar: "/img/pexels-linkedin-2182970.jpg",
    email: "john.smith@example.com",
    phone: "+47 123 45 678",
    address: "B R A Veien 6A",
    memberSince: "January 2023",
    favoriteZones: ["Zone 5", "Zone 1"],
    vehicles: [
      { id: 1, plate: "AB 12345", make: "Tesla", model: "Model 3", color: "White", default: true },
      { id: 2, plate: "CD 67890", make: "Volvo", model: "XC60", color: "Black", default: false }
    ],
    paymentMethods: [
      { id: 1, type: "VISA", last4: "4321", expiry: "05/26", default: true },
      { id: 2, type: "MasterCard", last4: "8765", expiry: "09/25", default: false },
      { id: 3, type: "Vipps", last4: "2468", expiry: "07/27", default: false }
    ],
    stats: {
      totalSpent: "4,250 kr",
      totalHours: "67 hours",
      mostVisitedZone: "Zone 5",
      averageStay: "2.4 hours"
    },
    logs: [
      {
        id: 1,
        date: "11/04/2025",
        formattedDate: "April 11, 2025",
        duration: "3 hours",
        startTime: "08:30",
        endTime: "11:30",
        parking: "Spot 10",
        total: "100.50kr",
        zone: "1",
        location: "Zone 1",
        status: "Completed"
      },
      {
        id: 2,
        date: "10/04/2025",
        formattedDate: "April 10, 2025",
        duration: "3 hours",
        startTime: "13:15",
        endTime: "16:15",
        parking: "Spot 10",
        total: "100.50kr",
        zone: "5",
        location: "Zone 5",
        status: "Completed"
      },
      {
        id: 3,
        date: "09/04/2025",
        formattedDate: "April 9, 2025",
        duration: "3 hours",
        startTime: "10:00",
        endTime: "13:00",
        parking: "Spot 10",
        total: "100.50kr",
        zone: "5",
        location: "Zone 5",
        status: "Completed"
      }
    ]
  };

  // Filter options
  const filterOptions = {
    timeRange: ["Last 7 days", "Last 30 days", "Last 3 months", "Last year"],
    zones: ["All zones", "Zone 1", "Zone 5"],
    status: ["All", "Completed", "Active", "Canceled"]
  };

  return (
    <div className={`flex flex-col min-h-screen bg-[#f8f9fa] ${mounted ? 'animate-fadeIn' : 'opacity-0'}`}>
      {/* Header */}
      <header className="p-4 flex items-center justify-between bg-white border-b border-[#e0e7eb] sticky top-0 z-10">
        <div className="flex items-center flex-1">
          <Link href="/" className="mr-3 hover:bg-[#eef2f5] p-2 rounded-full transition-colors">
            <ArrowLeft className="h-5 w-5 text-[#343a40]" />
          </Link>
          <div className="flex-1 text-center">
            <h2 className="text-xl font-semibold text-[#1a1a1a]">Profile</h2>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Link href="/notifications" className="relative p-2 hover:bg-[#eef2f5] rounded-full transition-colors">
            <Bell className="h-5 w-5 text-[#343a40]" />
            <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-[#003087]"></span>
          </Link>
          <Link href="/settings" className="p-2 hover:bg-[#eef2f5] rounded-full transition-colors">
            <Settings className="h-5 w-5 text-[#343a40]" />
          </Link>
          <div className="h-8 w-8 rounded-full bg-[#003087] overflow-hidden border border-white ml-2">
            {profileData.avatar ? (
              <Image 
                src={profileData.avatar} 
                alt="Profile" 
                width={32} 
                height={32}
                className="object-cover" 
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center text-white font-medium text-sm">
                {profileData.name.charAt(0)}
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
                {profileData.avatar ? (
                  <Image 
                    src={profileData.avatar} 
                    alt="Profile" 
                    width={64} 
                    height={64}
                    className="object-cover" 
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-[#003087] font-semibold text-xl">
                    {profileData.name.charAt(0)}
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-[#1a1a1a] truncate">{profileData.name}</h3>
                  <button className="text-[#003087] text-sm font-medium flex items-center gap-1 hover:text-blue-800 transition-colors flex-shrink-0 ml-2">
                    <Edit2 className="h-3.5 w-3.5" /> Edit
                  </button>
                </div>
                <p className="text-sm text-gray-500 truncate">{profileData.email}</p>
                <p className="text-sm text-gray-500">{profileData.phone}</p>
              </div>
            </div>
            
            <div className="mt-3 flex items-center text-xs text-gray-600 bg-gray-50 p-2 rounded-md">
              <MapPin className="h-3.5 w-3.5 mr-1.5 flex-shrink-0" />
              <span className="truncate">{profileData.address}</span>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="bg-[#e6f0fa] rounded-lg p-3">
                <div className="text-[#003087] text-xs font-medium mb-1">Total Spent</div>
                <div className="text-lg font-semibold text-[#1a1a1a]">{profileData.stats.totalSpent}</div>
              </div>
              <div className="bg-[#e0ebe5] rounded-lg p-3">
                <div className="text-[#003087] text-xs font-medium mb-1">Total Time</div>
                <div className="text-lg font-semibold text-[#1a1a1a]">{profileData.stats.totalHours}</div>
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
            className={`flex-1 py-2.5 px-2 text-center font-medium text-sm transition-colors ${activeTab === "history" 
              ? "text-[#003087] border-b-2 border-[#003087] bg-blue-50" 
              : "text-gray-600 hover:bg-gray-50"}`}
          >
            History
          </button>
          <button 
            onClick={() => handleTabChange("vehicles")}
            className={`flex-1 py-2.5 px-2 text-center font-medium text-sm transition-colors border-l border-[#e0e7eb] ${activeTab === "vehicles" 
              ? "text-[#003087] border-b-2 border-[#003087] bg-blue-50" 
              : "text-gray-600 hover:bg-gray-50"}`}
          >
            Vehicles
          </button>
          <button 
            onClick={() => handleTabChange("payment")}
            className={`flex-1 py-2.5 px-2 text-center font-medium text-sm transition-colors border-l border-[#e0e7eb] ${activeTab === "payment" 
              ? "text-[#003087] border-b-2 border-[#003087] bg-blue-50" 
              : "text-gray-600 hover:bg-gray-50"}`}
          >
            Payment
          </button>
        </div>
      </div>

      {/* Content based on active tab */}
      <div className="px-4 mt-4 pb-24">
        {/* Vehicles Tab */}
        {activeTab === "vehicles" && (
          <div className={`space-y-3 animate-slideIn ${tabTransition ? 'opacity-0 -translate-y-2' : 'opacity-100 translate-y-0'} transition-all duration-150`}>
            {profileData.vehicles.map((vehicle) => (
              <div key={vehicle.id} className="bg-white rounded-lg shadow-sm p-4 border border-[#e0e7eb]">
                <div className="flex justify-between items-center">
                  <div className="flex items-center min-w-0">
                    <div className="bg-[#e6f0fa] rounded-full p-2.5 mr-3 flex-shrink-0">
                      <Car className="h-5 w-5 text-[#003087]" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-semibold text-[#1a1a1a] truncate">{vehicle.plate}</div>
                      <div className="text-xs text-gray-500 truncate">{vehicle.make} {vehicle.model} • {vehicle.color}</div>
                    </div>
                  </div>
                  {vehicle.default && (
                    <div className="bg-[#c4dbf3] text-[#003087] text-xs font-medium py-0.5 px-2 rounded-full ml-2 flex-shrink-0">
                      Default
                    </div>
                  )}
                </div>
              </div>
            ))}
            <button className="w-full bg-white border border-[#e0e7eb] rounded-lg py-3 px-4 flex items-center justify-center text-[#003087] font-medium text-sm hover:bg-[#eef2f5] transition-colors">
              <Plus className="h-4 w-4 mr-1.5" /> Add New Vehicle
            </button>
          </div>
        )}

        {/* Payment Methods Tab */}
        {activeTab === "payment" && (
          <div className={`space-y-3 animate-slideIn ${tabTransition ? 'opacity-0 -translate-y-2' : 'opacity-100 translate-y-0'} transition-all duration-150`}>
            {profileData.paymentMethods.map((method) => (
              <div key={method.id} className="bg-white rounded-lg shadow-sm p-4 border border-[#e0e7eb]">
                <div className="flex justify-between items-center">
                  <div className="flex items-center min-w-0">
                    <div className={`${method.type === "Vipps" ? "bg-[#ff5b24]" : "bg-[#e6f0fa]"} rounded-full p-2.5 mr-3 flex-shrink-0`}>
                      <CreditCard className={`h-5 w-5 ${method.type === "Vipps" ? "text-white" : "text-[#003087]"}`} />
                    </div>
                    <div className="min-w-0">
                      <div className={`font-semibold ${method.type === "Vipps" ? "text-[#ff5b24]" : "text-[#1a1a1a]"} truncate`}>
                        {method.type} {method.type !== "Vipps" ? `•••• ${method.last4}` : ""}
                      </div>
                      {method.type !== "Vipps" && (
                        <div className="text-xs text-gray-500">Expires {method.expiry}</div>
                      )}
                      {method.type === "Vipps" && (
                        <div className="text-xs text-gray-500">Mobile Payment</div>
                      )}
                    </div>
                  </div>
                  {method.default && (
                    <div className={`${method.type === "Vipps" ? "bg-[#ffefe9] text-[#ff5b24]" : "bg-[#c4dbf3] text-[#003087]"} text-xs font-medium py-0.5 px-2 rounded-full ml-2 flex-shrink-0`}>
                      Default
                    </div>
                  )}
                </div>
              </div>
            ))}
            <button className="w-full bg-white border border-[#e0e7eb] rounded-lg py-3 px-4 flex items-center justify-center text-[#003087] font-medium text-sm hover:bg-[#eef2f5] transition-colors">
              <Plus className="h-4 w-4 mr-1.5" /> Add Payment Method
            </button>
          </div>
        )}

        {/* History Tab */}
        {activeTab === "history" && (
          <div className={`space-y-3 animate-slideIn ${tabTransition ? 'opacity-0 -translate-y-2' : 'opacity-100 translate-y-0'} transition-all duration-150`}>
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
                    <label className="block text-xs font-medium text-[#1a1a1a] mb-1">Time Range</label>
                    <select className="w-full border border-[#ced4da] rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#003087] focus:border-[#003087]">
                      {filterOptions.timeRange.map((option, i) => (
                        <option key={i}>{option}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#1a1a1a] mb-1">Zone</label>
                    <select className="w-full border border-[#ced4da] rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#003087] focus:border-[#003087]">
                      {filterOptions.zones.map((option, i) => (
                        <option key={i}>{option}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#1a1a1a] mb-1">Status</label>
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
            {profileData.logs.map((log) => (
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
                    <div className="text-sm font-semibold text-[#1a1a1a]">{log.total}</div>
                  </div>
                  <div className={`flex items-center justify-center h-7 w-7 rounded-full text-sm font-semibold text-white ${log.zone === "1" ? "bg-blue-400" : "bg-purple-500"}`}>
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
            ))}
          </div>
        )}
      </div>

      {/* Navigation Bar - Fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-[#e0e7eb] bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.05)] z-20">
        <div className="flex justify-around items-center max-w-md mx-auto px-2 py-1.5">
          <Link href="/" className="flex flex-col items-center p-1 rounded-md w-16 transition-colors hover:bg-gray-100">
            <Home className="h-5 w-5 text-gray-500" />
            <span className="text-[10px] mt-0.5 text-gray-500">Home</span>
          </Link>
          <Link href="/find-parking" className="flex flex-col items-center p-1 rounded-md w-16 transition-colors hover:bg-gray-100">
            <Search className="h-5 w-5 text-gray-500" />
            <span className="text-[10px] mt-0.5 text-gray-500">Find</span>
          </Link>
          <Link href="/payments" className="flex flex-col items-center p-1 rounded-md w-16 transition-colors bg-blue-50">
            <Wallet className="h-5 w-5 text-[#003087]" />
            <span className="text-[10px] mt-0.5 text-[#003087] font-medium">Payments</span>
          </Link>
          <Link href="/profile" className="flex flex-col items-center p-1 rounded-md w-16 transition-colors hover:bg-gray-100">
            <User className="h-5 w-5 text-gray-500" /> 
            <span className="text-[10px] mt-0.5 text-gray-500">Profile</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

// Add this at the end of the file
// Define the animations for Tailwind CSS
const tailwindStyles = document.createElement('style');
tailwindStyles.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes slideIn {
    from { transform: translateY(10px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  .animate-fadeIn {
    animation: fadeIn 0.3s ease-in-out forwards;
  }
  .animate-slideIn {
    animation: slideIn 0.3s ease-in-out forwards;
  }
`;
typeof document !== 'undefined' && document.head.appendChild(tailwindStyles); 