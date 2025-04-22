"use client";

import { createElement as h } from "react";

interface OngoingSessionProps {
  zone: string;
  startTime: string;
  endTime: string;
  image: string;
}

export default function OngoingSession({
  zone,
  startTime,
  endTime,
  image,
}: OngoingSessionProps) {
  return h(
    "div",
    {
      className:
        "bg-white rounded-lg p-4 shadow-sm flex items-center justify-between",
    },
    [
      h(
        "div",
        { className: "flex items-center gap-4", key: "main-container" },
        [
          h("img", {
            key: "car-image",
            src: image,
            alt: "Parked car",
            className: "w-12 h-12 rounded-lg object-cover",
          }),
          h("div", { key: "info-container" }, [
            h("h3", { key: "zone-title", className: "font-semibold" }, zone),
            h(
              "p",
              { key: "time-info", className: "text-sm text-gray-600" },
              `${startTime} - ${endTime}`
            ),
          ]),
        ]
      ),
      h(
        "button",
        {
          key: "view-button",
          className: "px-4 py-2 bg-gray-100 rounded-lg text-sm",
          onClick: () => console.log("View clicked"),
        },
        "View"
      ),
    ]
  );
}
