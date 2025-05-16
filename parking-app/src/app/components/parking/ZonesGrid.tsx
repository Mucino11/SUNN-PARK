import React from "react";
import Link from "next/link";

const zones = [1, 2, 3, 4, 5];

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

export default function ZonesGrid() {
  return (
    <div className="grid grid-cols-5 gap-4">
      {zones.map((zone) => (
        <Link
          key={zone}
          href="/zoneDetails"
          className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold ${getZoneColor(
            zone
          )}`}
        >
          {zone}
        </Link>
      ))}
    </div>
  );
}
