"use client";

import { createElement as h, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface HeaderProps {
  logoSrc: string;
  profileSrc: string;
}

const Header = ({ logoSrc, profileSrc }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { name: "Home", path: "/", icon: "🏠" },
    { name: "Find Parking", path: "/find-parking", icon: "🅿️" },
    { name: "Payments", path: "/payment", icon: "💳" },
    { name: "Profile", path: "/profile", icon: "👤" },
    { name: "Login", path: "/login", icon: "🔑" },
  ];

  return h(
    "header",
    {
      key: "header",
      className:
        "p-4 flex items-center justify-between bg-white border-b border-[#e0e7eb] sticky top-0 z-10",
    },
    [
      h(
        "div",
        {
          key: "menu-container",
          className: "relative",
        },
        [
          h(
            "button",
            {
              key: "menu-button",
              className:
                "p-2 hover:bg-[#eef2f5] rounded-full transition-colors",
              onClick: handleMenuClick,
              "aria-label": "Menu",
            },
            h(
              "svg",
              {
                className: "w-6 h-6 text-[#343a40]",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "2",
              },
              h("path", {
                d: "M4 6h16M4 12h16M4 18h16",
                strokeLinecap: "round",
                strokeLinejoin: "round",
              })
            )
          ),
          isMenuOpen &&
            h(
              "div",
              {
                key: "dropdown-menu",
                className:
                  "absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50",
              },
              navItems.map((item) =>
                h(
                  Link,
                  {
                    key: item.path,
                    href: item.path,
                    className: `flex items-center gap-2 px-4 py-2 hover:bg-[#eef2f5] transition-colors ${
                      pathname === item.path ? "text-blue-600" : "text-gray-600"
                    }`,
                    onClick: () => setIsMenuOpen(false),
                  },
                  [
                    h("span", { key: `${item.path}-icon` }, item.icon),
                    h("span", { key: `${item.path}-text` }, item.name),
                  ]
                )
              )
            ),
        ]
      ),
      h(
        "div",
        {
          key: "logo",
          className: "h-8 w-8 relative",
        },
        h(Image, {
          src: logoSrc,
          alt: "Logo",
          fill: true,
          sizes: "(max-width: 32px) 100vw",
          priority: true,
          className: "object-contain",
        })
      ),
      h(
        Link,
        {
          key: "profile",
          href: "/profile",
          className:
            "h-8 w-8 rounded-full bg-[#003087] overflow-hidden border border-white",
        },
        h(Image, {
          src: profileSrc,
          alt: "Profile",
          width: 32,
          height: 32,
          className: "object-cover",
        })
      ),
    ]
  );
};

export default Header;
