"use client";

import { createElement as h, useState } from "react";
import Calendar from "./Calendar";

const CalendarButton = () => {
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);

  const handleClick = () => {
    setIsCalendarVisible(!isCalendarVisible);
  };

  return h(
    "div",
    {
      className: "relative",
    },
    [
      h(
        "button",
        {
          key: "calendar-button",
          className:
            "w-full flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition-colors",
          onClick: handleClick,
          "aria-label": "Open Calendar",
        },
        [
          h(
            "svg",
            {
              key: "calendar-icon",
              className: "w-8 h-8 text-gray-600",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "2",
              strokeLinecap: "round",
              strokeLinejoin: "round",
            },
            [
              h("rect", {
                key: "calendar-frame",
                x: "3",
                y: "4",
                width: "18",
                height: "18",
                rx: "2",
                ry: "2",
              }),
              h("line", { key: "line1", x1: "16", y1: "2", x2: "16", y2: "6" }),
              h("line", { key: "line2", x1: "8", y1: "2", x2: "8", y2: "6" }),
              h("line", {
                key: "line3",
                x1: "3",
                y1: "10",
                x2: "21",
                y2: "10",
              }),
              h("line", {
                key: "line4",
                x1: "12",
                y1: "14",
                x2: "12",
                y2: "18",
              }),
              h("line", {
                key: "line5",
                x1: "10",
                y1: "16",
                x2: "14",
                y2: "16",
              }),
            ]
          ),
          h(
            "span",
            { key: "calendar-label", className: "mt-2 text-sm text-gray-600" },
            "Calendar"
          ),
        ]
      ),
      isCalendarVisible &&
        h(
          "div",
          {
            key: "calendar-container",
            className: "absolute top-full left-0 mt-2 z-10",
          },
          h(Calendar)
        ),
    ]
  );
};

export default CalendarButton;
