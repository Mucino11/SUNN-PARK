import React from "react";
import Link from "next/link";

const zones = [1, 2, 3, 4, 5];

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

const getZoneInfo = (zone: number) => {
  switch (zone) {
    case 1:
      return { spots: "15", distance: "50m from hospital" };
    case 2:
      return { spots: "12", distance: "120m from hospital" };
    case 3:
      return { spots: "18", distance: "200m from hospital" };
    case 4:
      return { spots: "10", distance: "300m from hospital" };
    case 5:
      return { spots: "20", distance: "450m from hospital" };
    default:
      return { spots: "10", distance: "200m from hospital" };
  }
};

export default function ZonesGrid() {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 sm:gap-6">
      {zones.map((zone) => {
        const info = getZoneInfo(zone);
        return (
          <Link
            key={zone}
            href={`/zoneDetails?zone=${zone}`}
            className="block group"
          >
            <div className="text-center">
              <div className={`${getZoneColor(zone)} w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full flex items-center justify-center ${getZoneTextColor(zone)} shadow-lg hover:shadow-xl transform hover:scale-110 active:scale-95 transition-all duration-300 mx-auto mb-3 relative overflow-hidden`}>
                {/* Animated ring on hover */}
                <div className="absolute inset-0 rounded-full border-2 border-white opacity-0 group-hover:opacity-30 animate-pulse"></div>
                
                {/* Zone number */}
                <div className="relative z-10">
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold">{zone}</div>
                </div>
                
                {/* Subtle shine effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              {/* Zone info */}
              <div className="space-y-1">
                <h3 className="font-bold text-sm sm:text-base text-gray-900">Zone {zone}</h3>
                <p className="text-xs sm:text-sm text-gray-600">{info.distance}</p>
                <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                    <span>{info.spots} spots</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
