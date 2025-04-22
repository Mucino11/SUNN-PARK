"use client";

import { createElement as h } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  id: string;
  icon: string;
  label: string;
  path: string;
}

const navItems: NavItem[] = [
  { id: "home", icon: "🏠", label: "Home", path: "/" },
  {
    id: "find-parking",
    icon: "🅿️",
    label: "Find Parking",
    path: "/find-parking",
  },
  { id: "payments", icon: "💳", label: "Payments", path: "/payment" },
  { id: "profile", icon: "👤", label: "Profile", path: "/profile" },
];

const BottomNav = () => {
  const pathname = usePathname();

  return h(
    "nav",
    { className: "fixed bottom-0 left-0 right-0 bg-white border-t px-4 py-2" },
    h(
      "div",
      {
        className: "flex justify-between items-center max-w-4xl mx-auto",
        key: "nav-container",
      },
      navItems.map((item) =>
        h(
          Link,
          {
            key: item.id,
            href: item.path,
            className: `flex flex-col items-center p-2 ${
              pathname === item.path ? "text-blue-600" : "text-gray-600"
            } hover:text-blue-400 transition-colors`,
          },
          [
            h("span", { key: `${item.id}-icon` }, item.icon),
            h(
              "span",
              { key: `${item.id}-label`, className: "text-xs mt-1" },
              item.label
            ),
          ]
        )
      )
    )
  );
};

export default BottomNav;
