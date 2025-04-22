'use client'

import { useRouter } from 'next/navigation'
import { CalendarPlus, Home, CreditCard, MapPin, User } from 'lucide-react'
import { JSX } from 'react'

export default function BottomNav({ active }: { active: string }) {
  const router = useRouter()

  const handleNavigation = (path: string) => {
    router.push(path)
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-md flex justify-around py-2 z-20">
      <NavIcon
        icon={<Home size={24} />}
        label="Home"
        active={active === 'Home'}
        onClick={() => handleNavigation('/home')}
      />
      <NavIcon
        icon={<MapPin size={24} />}
        label="Find Parking"
        active={active === 'Find Parking'}
        onClick={() => handleNavigation('/find')}
      />
      <NavIcon
        icon={<CreditCard size={24} />}
        label="Payments"
        active={active === 'Payments'}
        onClick={() => handleNavigation('/payments')}
      />
      <NavIcon
        icon={<User size={24} />}
        label="Profile"
        active={active === 'Profile'}
        onClick={() => handleNavigation('/profile')}
      />
    </div>
  )
}

const NavIcon = ({
  icon,
  label,
  active = false,
  onClick,
}: {
  icon: JSX.Element
  label: string
  active?: boolean
  onClick?: () => void
}) => (
  <button onClick={onClick} className="flex flex-col items-center text-xs focus:outline-none">
    <div className={active ? "text-blue-600" : "text-gray-400"}>{icon}</div>
    <span className={active ? "text-blue-600" : "text-gray-400"}>{label}</span>
  </button>
)
