'use client'

import { useRouter } from 'next/navigation'

export default function IndexPage() {
  const router = useRouter()

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-white">
      <h1 className="text-3xl font-bold mb-6 text-blue-900">SunnPark</h1>
      <p className="text-gray-700 mb-4">Velkommen til SunnPark!</p>
      <button
        onClick={() => router.push('/home')}
        className="px-6 py-3 bg-blue-300 hover:bg-blue-400 rounded-lg transition"
      >
        Gå til Hjem
      </button>
    </main>
  )
}
