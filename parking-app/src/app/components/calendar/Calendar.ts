"use client";

import { createElement as h, useState } from "react";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const firstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const days = [];
  const totalDays = daysInMonth(currentDate);
  const firstDay = firstDayOfMonth(currentDate);

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDay; i++) {
    days.push(h("div", { key: `empty-${i}`, className: "w-8 h-8" }));
  }

  // Add cells for each day of the month
  for (let i = 1; i <= totalDays; i++) {
    days.push(
      h(
        "div",
        {
          key: `day-${i}`,
          className:
            "w-8 h-8 flex items-center justify-center text-sm cursor-pointer hover:bg-gray-100 rounded-full",
        },
        i
      )
    );
  }

  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

  return h(
    "div",
    {
      className: "bg-white rounded-lg shadow-sm p-4 w-full max-w-sm",
    },
    [
      // Month navigation
      h(
        "div",
        {
          key: "month-nav",
          className: "flex justify-between items-center mb-4",
        },
        [
          h(
            "button",
            {
              key: "prev",
              onClick: prevMonth,
              className: "p-2 hover:bg-gray-100 rounded-full",
            },
            "←"
          ),
          h(
            "div",
            {
              key: "month-year",
              className: "font-semibold",
            },
            `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`
          ),
          h(
            "button",
            {
              key: "next",
              onClick: nextMonth,
              className: "p-2 hover:bg-gray-100 rounded-full",
            },
            "→"
          ),
        ]
      ),

      // Day names
      h(
        "div",
        {
          key: "day-names",
          className: "grid grid-cols-7 gap-1 mb-2",
        },
        dayNames.map((day) =>
          h(
            "div",
            {
              key: day,
              className:
                "w-8 h-8 flex items-center justify-center text-xs text-gray-500",
            },
            day
          )
        )
      ),

      // Calendar grid
      h(
        "div",
        {
          key: "calendar-grid",
          className: "grid grid-cols-7 gap-1",
        },
        days
      ),
    ]
  );
};

export default Calendar;
