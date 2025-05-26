"use client";

import { createElement as h } from "react";
import Header from "../components/navigation/Header";
import SearchBar from "../components/navigation/SearchBar";
import BottomNavigation from "../components/navigation/BottomNavigation";
import Link from "next/link";

export default function FindParking() {
  return h(
    "div",
    {
      key: "root",
      className: "min-h-screen bg-blue-50",
    },
    [
      h(Header, {
        key: "header",
        logoSrc: "/logo.svg",
        profileSrc: "/img/pexels-linkedin-2182970.jpg",
      }),

      h(
        "main",
        {
          key: "main",
          className: "px-4 pt-4 pb-20",
        },
        [
          h(SearchBar, { key: "search" }),

          h(
            "div",
            {
              key: "map-container",
              className: "mt-6 relative",
            },
            [
              h("img", {
                key: "map",
                src: "/img/map.png",
                alt: "Map",
                className: "w-full h-[400px] object-cover rounded-lg",
              }),
              h(
                "div",
                {
                  key: "zone-markers",
                  className: "absolute inset-0",
                },
                [
                  h(
                    Link,
                    {
                      key: "zone-1",
                      href: "/zoneDetails?zone=1",
                      className:
                        "absolute top-1/4 left-1/4 w-8 h-8 bg-blue-300 rounded-full flex items-center justify-center text-white font-semibold hover:bg-blue-400 transition-colors",
                    },
                    "1"
                  ),
                  h(
                    Link,
                    {
                      key: "zone-2",
                      href: "/zoneDetails?zone=2",
                      className:
                        "absolute top-1/3 right-1/4 w-8 h-8 bg-pink-400 rounded-full flex items-center justify-center text-white font-semibold hover:bg-pink-500 transition-colors",
                    },
                    "2"
                  ),
                  h(
                    Link,
                    {
                      key: "zone-4",
                      href: "/zoneDetails?zone=4",
                      className:
                        "absolute bottom-1/4 left-1/3 w-8 h-8 bg-green-200 rounded-full flex items-center justify-center text-white font-semibold hover:bg-green-300 transition-colors",
                    },
                    "4"
                  ),
                  h(
                    Link,
                    {
                      key: "zone-5",
                      href: "/zoneDetails?zone=5",
                      className:
                        "absolute bottom-1/3 right-1/3 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-semibold hover:bg-purple-700 transition-colors",
                    },
                    "5"
                  ),
                ]
              ),
            ]
          ),

          h(
            "div",
            {
              key: "find-parking",
              className: "mt-8",
            },
            [
              h(
                "h2",
                {
                  key: "title",
                  className: "text-xl font-semibold mb-4 text-gray-900",
                },
                "Find Parking"
              ),
              h(
                "div",
                {
                  key: "zones-grid",
                  className: "grid grid-cols-5 gap-4",
                },
                [1, 2, 3, 4, 5].map((zone) =>
                  h(
                    Link,
                    {
                      key: `zone-${zone}`,
                      href: `/zoneDetails?zone=${zone}`,
                      className: `w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold ${
                        zone === 1
                          ? "bg-blue-300 hover:bg-blue-400"
                          : zone === 2
                          ? "bg-pink-400 hover:bg-pink-500"
                          : zone === 3
                          ? "bg-blue-800 hover:bg-blue-900"
                          : zone === 4
                          ? "bg-green-200 hover:bg-green-300"
                          : "bg-purple-600 hover:bg-purple-700"
                      } transition-colors`,
                    },
                    zone.toString()
                  )
                )
              ),
            ]
          ),
        ]
      ),
      h(BottomNavigation, { key: "bottom-nav" }),
    ]
  );
}
