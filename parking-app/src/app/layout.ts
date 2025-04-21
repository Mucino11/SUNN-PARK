import { createElement as h } from 'react'
import './globals.css'

export const metadata = {
  title: 'Parking App',
  description: 'Find and book parking spots easily',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return h('html', { lang: 'en' },
    h('body', {}, children)
  )
}
