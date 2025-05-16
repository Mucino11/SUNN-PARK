import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Car } from "lucide-react";

interface OngoingSessionProps {
  zone: string;
  startTime: string;
  endTime: string;
  image?: string;
}

export default function OngoingSession({
  zone,
  startTime,
  endTime,
  image,
}: OngoingSessionProps) {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
            {image ? (
              <Image src={image} alt="Car" width={24} height={24} />
            ) : (
              <Car className="w-6 h-6 text-blue-600" />
            )}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{zone}</h3>
            <p className="text-sm text-gray-600">
              {startTime} - {endTime}
            </p>
          </div>
        </div>
        <Link
          href="/zoneDetails"
          className="px-4 py-2 bg-blue-50 rounded-lg text-sm text-blue-600 hover:bg-blue-100 transition-colors"
        >
          View
        </Link>
      </div>
    </div>
  );
}
