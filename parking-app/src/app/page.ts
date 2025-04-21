import { createElement as h } from 'react'
import Header from './components/navigation/Header'
import SearchBar from './components/navigation/SearchBar'
import OngoingSession from './components/parking/OngoingSession'
import ZonesGrid from './components/parking/ZonesGrid'
import CalendarButton from './components/calendar/CalendarButton'
import BottomNav from './components/navigation/BottomNav'

export default function HomePage() {
  return h('div', 
    { 
      key: 'root',
      className: "min-h-screen bg-blue-50" 
    },
    [
      h(Header, {
        key: 'header',
        logoSrc: "/logo.svg",
        profileSrc: "/images/default-avatar.svg"
      }),
      
      h('main', 
        { 
          key: 'main',
          className: "px-4 pt-4 pb-20" 
        },
        [
          h(SearchBar, { key: 'search' }),
          
          h('section', 
            { 
              key: 'ongoing-session',
              className: "mt-6" 
            },
            [
              h('h2', 
                { 
                  key: 'ongoing-title',
                  className: "text-xl font-semibold mb-3" 
                },
                "Ongoing session"
              ),
              h(OngoingSession, {
                key: 'session',
                zone: "Zone 5",
                startTime: "12:30",
                endTime: "13:30",
                image: "/images/car-placeholder.svg"
              })
            ]
          ),
          
          h('section',
            { 
              key: 'zones-calendar',
              className: "mt-8 flex justify-between items-start" 
            },
            [
              h('div', 
                { 
                  key: 'zones',
                  className: "w-1/2" 
                },
                [
                  h('h2', 
                    { 
                      key: 'zones-title',
                      className: "text-xl font-semibold mb-3" 
                    },
                    "Zones"
                  ),
                  h(ZonesGrid, { key: 'zones-grid' })
                ]
              ),
              h('div',
                { 
                  key: 'calendar',
                  className: "w-1/2 pl-4" 
                },
                [
                  h('h2',
                    { 
                      key: 'calendar-title',
                      className: "text-xl font-semibold mb-3" 
                    },
                    "Calendar"
                  ),
                  h(CalendarButton, { key: 'calendar-button' })
                ]
              )
            ]
          )
        ]
      ),
      
      h(BottomNav, { key: 'bottom-nav' })
    ]
  )
} 