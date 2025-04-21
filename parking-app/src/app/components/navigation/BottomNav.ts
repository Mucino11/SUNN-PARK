'use client'

import { createElement as h } from 'react'

interface NavItem {
  id: string
  icon: string
  label: string
  active?: boolean
}

const navItems: NavItem[] = [
  { id: 'home', icon: "🏠", label: "Home", active: true },
  { id: 'location', icon: "📍", label: "Location" },
  { id: 'payments', icon: "💳", label: "Payments" },
  { id: 'profile', icon: "👤", label: "Profile" }
]

const BottomNav = () => {
  const handleNavClick = (id: string) => {
    console.log(`Navigating to ${id}`)
  }

  return h('nav',
    { className: "fixed bottom-0 left-0 right-0 bg-white border-t px-4 py-2" },
    h('div',
      { className: "flex justify-between items-center", key: 'nav-container' },
      navItems.map(item => 
        h('button',
          {
            key: item.id,
            className: `flex flex-col items-center p-2 ${
              item.active ? 'text-blue-600' : 'text-gray-600'
            }`,
            onClick: () => handleNavClick(item.id)
          },
          [
            h('span', { key: `${item.id}-icon` }, item.icon),
            h('span', { key: `${item.id}-label`, className: "text-xs mt-1" }, item.label)
          ]
        )
      )
    )
  )
}

export default BottomNav