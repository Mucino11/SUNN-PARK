"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNavigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-4 z-50">
      <div className="flex justify-center gap-8 max-w-4xl mx-auto">
        {[
          { name: "Home", path: "/", icon: "🏠" },
          { name: "Find Parking", path: "/find-parking", icon: "🅿️" },
          { name: "Payments", path: "/payment", icon: "💳" },
          { name: "Profile", path: "/profile", icon: "👤" },
          { name: "Login", path: "/login", icon: "🔑" },
        ].map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`flex flex-col items-center gap-1 ${
              pathname === item.path ? "text-blue-600" : "text-gray-600"
            } hover:text-blue-400 transition-colors`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="text-sm">{item.name}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
