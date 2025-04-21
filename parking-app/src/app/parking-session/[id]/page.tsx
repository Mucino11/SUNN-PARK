"use client";

import { useState, useEffect } from "react";
import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Car, 
  MapPin, 
  CreditCard,
  Download,
  Share2,
  Tag,
  Hash
} from "lucide-react";

type ParkingSession = {
  id: number;
  date: string;
  formattedDate: string;
  duration: string;
  startTime: string;
  endTime: string;
  parking: string;
  total: string;
  zone: string;
  location: string;
  status: string;
  vehicle: {
    plate: string;
    make: string;
    model: string;
  };
  payment: {
    type: string;
    last4?: string;
  };
  details: {
    parkingRate: string;
    subtotal: string;
    discount: string;
    total: string;
  };
  purpose: string;
  receipt: boolean;
};

export default function ParkingSessionPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const id = unwrappedParams.id;
  
  const [session, setSession] = useState<ParkingSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        // Fetch mock data - replace with actual API call in production
        const mockSessions: Record<string, ParkingSession> = {
          "1": {
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
            status: "Completed",
            vehicle: { plate: "AB 12345", make: "Tesla", model: "Model 3" },
            payment: { type: "VISA", last4: "4321" },
            details: { parkingRate: "33.50kr/hr", subtotal: "100.50kr", discount: "0kr", total: "100.50kr" },
            purpose: "Visit",
            receipt: true
          },
          "2": {
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
            status: "Completed",
            vehicle: { plate: "AB 12345", make: "Tesla", model: "Model 3" },
            payment: { type: "Vipps" },
            details: { parkingRate: "33.50kr/hr", subtotal: "100.50kr", discount: "0kr", total: "100.50kr" },
            purpose: "Visit",
            receipt: true
          },
          "3": {
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
            status: "Completed",
            vehicle: { plate: "CD 67890", make: "Volvo", model: "XC60" },
            payment: { type: "MasterCard", last4: "8765" },
            details: { parkingRate: "33.50kr/hr", subtotal: "100.50kr", discount: "0kr", total: "100.50kr" },
            purpose: "Visit",
            receipt: true
          }
        };

        // Simulate network delay
        setTimeout(() => {
          const sessionData = mockSessions[id];
          if (sessionData) {
            setSession(sessionData);
          } else {
            setError("Parking session not found");
          }
          setLoading(false);
        }, 300);
      } catch (err) {
        setError("Failed to load parking session details");
        setLoading(false);
      }
    };

    fetchSession();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa]">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-[#003087] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-3 text-sm text-[#1a1a1a]">Loading details...</p>
        </div>
      </div>
    );
  }

  if (error || !session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa] p-4">
        <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-[#e0e7eb] max-w-sm w-full">
          <h2 className="text-lg font-semibold text-[#1a1a1a] mb-3">Error</h2>
          <p className="text-sm text-gray-600 mb-5">{error || "Parking session could not be found."}</p>
          <Link 
            href="/profile"
            className="inline-block px-5 py-2 bg-[#003087] text-white text-sm font-medium rounded-lg hover:bg-blue-800 transition-colors"
          >
            Back to Profile
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#f8f9fa]">
      {/* Header */}
      <header className="p-4 flex items-center justify-between bg-white border-b border-[#e0e7eb] sticky top-0 z-10">
        <div className="flex items-center flex-1">
          <Link href="/profile" className="mr-3 hover:bg-[#eef2f5] p-2 rounded-full transition-colors">
            <ArrowLeft className="h-5 w-5 text-[#343a40]" />
          </Link>
          <div className="flex-1 text-center">
            <h1 className="text-xs font-medium text-gray-500 uppercase tracking-wider">Parking Session</h1>
            <h2 className="text-xl font-semibold text-[#1a1a1a]">Details</h2>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button className="p-2 hover:bg-[#eef2f5] rounded-full transition-colors" title="Share Session">
            <Share2 className="h-5 w-5 text-[#343a40]" />
          </button>
        </div>
      </header>

      {/* Session Details Container */}
      <div className="flex-grow container mx-auto max-w-md p-4 pb-24">
        
        {/* Main Info Card */}
        <div className="bg-white rounded-xl shadow-sm p-5 mb-4 border border-[#e0e7eb]">
          {/* Date & Status Row */}
          <div className="flex justify-between items-center mb-4 pb-3 border-b border-[#eef2f5]">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 text-gray-500 mr-1.5" />
              <span className="text-[#1a1a1a] text-sm font-medium">{session.formattedDate}</span>
            </div>
            <div className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${session.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
              {session.status}
            </div>
          </div>
          
          {/* Icon List Items */}
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="bg-[#e6f0fa] rounded-full p-2 mr-3 mt-0.5 flex-shrink-0">
                <Clock className="h-4 w-4 text-[#003087]" />
              </div>
              <div>
                <div className="text-xs text-gray-500">Duration</div>
                <div className="text-sm text-[#1a1a1a] font-medium">{session.duration}</div>
                <div className="text-xs text-gray-400">({session.startTime} - {session.endTime})</div>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-[#e6f0fa] rounded-full p-2 mr-3 mt-0.5 flex-shrink-0">
                <MapPin className="h-4 w-4 text-[#003087]" />
              </div>
              <div>
                <div className="text-xs text-gray-500">Location</div>
                <div className="text-sm text-[#1a1a1a] font-medium flex items-center">
                  {session.location}
                  <span className={`ml-2 inline-flex items-center justify-center h-5 w-5 rounded-full text-xs font-semibold text-white flex-shrink-0 ${session.zone === "1" ? "bg-blue-400" : "bg-purple-500"}`}>
                    <span className="flex items-center justify-center w-full h-full">{session.zone}</span>
                  </span>
                </div>
                <div className="text-xs text-gray-400">{session.parking}</div>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-[#e6f0fa] rounded-full p-2 mr-3 mt-0.5 flex-shrink-0">
                <Car className="h-4 w-4 text-[#003087]" />
              </div>
              <div>
                <div className="text-xs text-gray-500">Vehicle</div>
                <div className="text-sm text-[#1a1a1a] font-medium">{session.vehicle.plate}</div>
                <div className="text-xs text-gray-400">{session.vehicle.make} {session.vehicle.model}</div>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-[#e6f0fa] rounded-full p-2 mr-3 mt-0.5 flex-shrink-0">
                <CreditCard className="h-4 w-4 text-[#003087]" />
              </div>
              <div>
                <div className="text-xs text-gray-500">Payment Method</div>
                <div className="text-sm text-[#1a1a1a] font-medium">
                  {session.payment.type} 
                  {session.payment.last4 && ` •••• ${session.payment.last4}`}
                </div>
              </div>
            </div>

             <div className="flex items-start pt-3 border-t border-[#eef2f5]">
              <div className="bg-[#e6f0fa] rounded-full p-2 mr-3 mt-0.5 flex-shrink-0">
                <Tag className="h-4 w-4 text-[#003087]" />
              </div>
              <div>
                <div className="text-xs text-gray-500">Purpose</div>
                <div className="text-sm text-[#1a1a1a] font-medium">{session.purpose}</div>
              </div>
            </div>

          </div>
        </div>
        
        {/* Cost Breakdown Card*/}
        <div className="bg-white rounded-xl shadow-sm p-5 mb-4 border border-[#e0e7eb]">
          <h3 className="text-base font-semibold text-[#1a1a1a] mb-3">Cost Breakdown</h3>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center">
              <div className="text-gray-500">Parking Rate</div>
              <div className="text-[#1a1a1a]">{session.details.parkingRate}</div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="text-gray-500">Duration</div>
              <div className="text-[#1a1a1a]">{session.duration}</div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="text-gray-500">Subtotal</div>
              <div className="text-[#1a1a1a]">{session.details.subtotal}</div>
            </div>
            
            <div className="flex justify-between items-center text-green-600">
              <div className="text-gray-500">Discount</div>
              <div className="text-[#1a1a1a]">{session.details.discount}</div>
            </div>
          </div>
          
          <div className="border-t border-[#eef2f5] pt-3 mt-3">
            <div className="flex justify-between items-center">
              <div className="text-sm font-semibold text-[#1a1a1a]">Total Paid</div>
              <div className="text-lg font-bold text-[#003087]">{session.details.total}</div>
            </div>
          </div>
        </div>
                
        {/* Receipt Button */} 
        {session.receipt && (
          <button className="w-full bg-[#003087] text-white rounded-lg py-3 px-4 flex items-center justify-center font-medium text-sm hover:bg-blue-800 transition-colors">
            <Download className="h-4 w-4 mr-2" /> Download Receipt
          </button>
        )}
      </div>
    </div>
  );
} 