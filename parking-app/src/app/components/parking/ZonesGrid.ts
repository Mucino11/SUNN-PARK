"use client";

import { createElement as h } from "react";
import Link from "next/link";

interface Zone {
  id: number;
  color: string;
}

const zones: Zone[] = [
  { id: 1, color: "bg-blue-200" },
  { id: 2, color: "bg-pink-200" },
  { id: 3, color: "bg-blue-800" },
  { id: 4, color: "bg-gray-200" },
  { id: 5, color: "bg-purple-500" },
];

interface ZoneButtonProps extends Zone {}

const ZoneButton = ({ id, color }: ZoneButtonProps) => {
  return h(
    Link,
    {
      href: "/zoneDetails",
      className: `w-16 h-16 rounded-full ${color} flex items-center justify-center hover:opacity-90 transition-opacity`,
      "aria-label": `Zone ${id}`,
    },
    h("span", { className: "text-sm font-semibold text-white" }, id.toString())
  );
};

const ZonesGrid = () => {
  return h(
    "div",
    { className: "grid grid-cols-5 gap-2 justify-items-center" },
    zones.map((zone) =>
      h(ZoneButton, {
        key: zone.id,
        ...zone,
      })
    )
  );
};

export default ZonesGrid;
