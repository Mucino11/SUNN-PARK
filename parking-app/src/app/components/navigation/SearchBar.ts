'use client'

import { createElement as h } from 'react'
import { useState, ChangeEvent } from 'react'

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  return h('div',
    { className: "relative" },
    [
      h('input',
        {
          key: 'search-input',
          type: "text",
          value: searchQuery,
          onChange: handleSearch,
          placeholder: "Search for parking spots...",
          className: "w-full py-3 px-10 rounded-full bg-white shadow-sm"
        }
      ),
      h('svg',
        {
          key: 'search-icon',
          className: "absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        },
        h('path',
          {
            fillRule: "evenodd",
            d: "M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z",
            clipRule: "evenodd"
          }
        )
      )
    ]
  )
}

export default SearchBar