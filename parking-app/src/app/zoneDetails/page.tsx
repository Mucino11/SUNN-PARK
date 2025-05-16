import Image from "next/image";
import Link from "next/link";
import doctorImage from "../images/doctor-2.jpg";
import map from "../images/map.png";
import BottomNavigation from "../components/navigation/BottomNavigation";

export default function ZoneDetails() {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <Link
          href="/"
          className="text-3xl hover:text-gray-600 transition-colors"
        >
          &#8592;
        </Link>
        <h2 className="font-bold text-2xl">Zone Details</h2>
        <Link href="/">
          <Image
            src={doctorImage}
            alt="Profile"
            width={75}
            height={75}
            className="rounded-full hover:opacity-90 transition-opacity"
          />
        </Link>
      </div>

      <div className="flex gap-8 mb-8">
        <div className="relative flex-1">
          <Image
            src={map}
            alt="Profile"
            width={500}
            height={500}
            className="square-full"
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-purple-600 text-white w-14 h-14 rounded-full flex items-center justify-center text-xl shadow-lg">
            5
          </div>
        </div>

        <div className="flex-1 space-y-4">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-green-700 text-xl">
              $26.00/hr
            </span>
            <div className="flex items-center gap-3">
              <span className="text-yellow-500">&#9679;</span>
              <span className="text-lg">20/70 spots</span>
              <span className="text-2xl">♿</span>
            </div>
          </div>

          <p className="text-gray-600 text-base">
            3 min walk to hospital entrance
          </p>

          <div>
            <select className="w-full p-3 border rounded mb-3 text-base">
              <option>Select Date</option>
            </select>
            <select className="w-full p-3 border rounded text-base">
              <option>Select Time</option>
            </select>
          </div>

          <p className="text-red-600 text-base">
            ♿ This parking zone is reserved for the disabled
          </p>

          <button className="bg-blue-500 text-white w-full py-3 rounded-xl shadow text-lg">
            Reserve Spot
          </button>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}
