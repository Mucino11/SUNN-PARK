'use client'

import { createElement as h } from 'react'

interface Zone {
  id: number
  color: string
}

const zones: Zone[] = [
  { id: 1, color: "bg-blue-200" },
  { id: 2, color: "bg-pink-200" },
  { id: 3, color: "bg-blue-800" },
  { id: 4, color: "bg-gray-200" },
  { id: 5, color: "bg-purple-500" }
]

interface ZoneButtonProps extends Zone {
  onClick: (id: number) => void
}

const ZoneButton = ({ id, color, onClick }: ZoneButtonProps) => {
  const handleClick = () => {
    onClick(id)
  }

  return h('button',
    {
      className: `w-16 h-16 rounded-full ${color} flex items-center justify-center hover:opacity-90 transition-opacity`,
      onClick: handleClick,
      'aria-label': `Zone ${id}`
    },
    h('span',
      { className: "text-sm font-semibold text-white" },
      id.toString()
    )
  )
}

const ZonesGrid = () => {
  const handleZoneClick = (zoneId: number) => {
    console.log(`Zone ${zoneId} clicked`)
  }

  return h('div',
    { className: "grid grid-cols-5 gap-2 justify-items-center" },
    zones.map((zone) => 
      h(ZoneButton, {
        key: zone.id,
        ...zone,
        onClick: handleZoneClick
      })
    )
  )
}

export default ZonesGrid