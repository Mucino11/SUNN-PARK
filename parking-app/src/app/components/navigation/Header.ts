'use client'

import { createElement as h } from 'react'
import Image from 'next/image'

interface HeaderProps {
  logoSrc: string
  profileSrc: string
}

const Header = ({ logoSrc, profileSrc }: HeaderProps) => {
  const handleMenuClick = () => {
    console.log('Menu clicked')
  }

  return h('header',
    { className: "flex justify-between items-center p-4" },
    [
      h('button',
        {
          key: 'menu-button',
          className: "p-2",
          onClick: handleMenuClick,
          'aria-label': "Menu"
        },
        h('svg',
          {
            className: "w-6 h-6",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "2"
          },
          h('path',
            {
              d: "M4 6h16M4 12h16M4 18h16",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            }
          )
        )
      ),
      h('div',
        { 
          key: 'logo',
          className: "h-8 w-8 relative" 
        },
        h(Image, {
          src: logoSrc,
          alt: "Logo",
          fill: true,
          sizes: "(max-width: 32px) 100vw",
          priority: true,
          className: "object-contain"
        })
      ),
      h('div',
        { 
          key: 'profile',
          className: "h-8 w-8 relative rounded-full overflow-hidden" 
        },
        h(Image, {
          src: profileSrc,
          alt: "Profile",
          fill: true,
          sizes: "(max-width: 32px) 100vw",
          className: "object-cover"
        })
      )
    ]
  )
}

export default Header