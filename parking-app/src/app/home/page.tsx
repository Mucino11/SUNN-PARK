
'use client'

import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import BottomNav from '@/app/components/BottomNav'
import { useRouter } from 'next/navigation'

const containerStyle = {
  width: '100%',
  height: '100vh',
}

const center = {
  lat: 59.83588540467462,
  lng: 10.641742084419745
}

export default function HomePage() {
  const router = useRouter()

  return (
    <div className="w-full min-h-screen bg-white flex justify-center">
      <div className="w-full max-w-md md:max-w-3xl lg:max-w-5xl relative">
        <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
          <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={16} options={{
            fullscreenControl: false,
            mapTypeControl: false,
            streetViewControl: false,
            zoomControl: false,
          }}>
            <Marker position={{ lat: 59.83628032960509, lng: 10.643415884814257 }} label="1" />
            <Marker position={{ lat: 59.836737412789574, lng: 10.642018625370964 }} label="2" />
            <Marker position={{ lat: 59.83470425865298, lng: 10.64174208440729 }} label="3" />
            <Marker position={{ lat: 59.835058972537794, lng: 10.638983952485372 }} label="4" />
            <Marker position={{ lat: 59.836086524434066, lng: 10.641916741850157 }} label="5" />
          </GoogleMap>
        </LoadScript>

        <div className="absolute top-2 left-4 right-4 z-10">
          <input
            type="text"
            placeholder="Search for parking spots..."
            className="w-full px-4 py-3 rounded-xl shadow bg-white text-sm focus:outline-none"
          />
        </div>

        <div className="absolute bottom-15 left-4 right-4 z-10 bg-white rounded-2xl p-4 shadow-md">
          <div className="flex justify-between items-center">
            <div className="flex-1 flex flex-col items-center border-r border-gray-200">
              <p className="font-semibold mb-2 text-xs sm:text-sm">Find Parking</p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((num) => (
                  <div
                    key={num}
                    className={`w-6 h-6 text-xs flex items-center justify-center rounded-full text-white font-bold ${getColor(num)}`}
                  >
                    {num}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 flex flex-col items-center">
              <p className="font-semibold mb-2 text-xs sm:text-sm">Reserve</p>
              <button
                onClick={() => router.push('/reserve')}
                className="text-blue-800 text-xl font-bold"
              >
                +
              </button>
            </div>
          </div>
        </div>

        <BottomNav active="Home" />
      </div>
    </div>
  )
}

const getColor = (num: number) => {
  switch (num) {
    case 1:
      return 'bg-blue-300'
    case 2:
      return 'bg-pink-400'
    case 3:
      return 'bg-blue-800'
    case 4:
      return 'bg-green-200'
    case 5:
      return 'bg-purple-600'
    default:
      return 'bg-gray-400'
  }
}