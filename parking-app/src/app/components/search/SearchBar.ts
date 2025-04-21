'use client'

import { createElement as h } from 'react'
import { useState } from 'react'

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    console.log('Search term:', searchTerm)
  }

  return h('form',
    {
      className: "w-full",
      onSubmit: handleSubmit
    },
    h('div',
      { className: "relative" },
      [
        h('input',
          {
            type: "text",
            value: searchTerm,
            onChange: handleChange,
            placeholder: "Search for a parking spot...",
            className: "w-full px-4 py-2 pl-10 pr-4 text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
            'aria-label': "Search"
          }
        ),
        h('div',
          { className: "absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none" },
          h('svg',
            {
              className: "w-5 h-5 text-gray-400",
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
        )
      ]
    )
  )
}

export default SearchBar 