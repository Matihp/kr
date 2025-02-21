'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useOnboarding } from '@/lib/store/useOnboarding'
import { useAuth } from '@/lib/useAuth'

interface Gig {
  _id: string
  title: string
  description: string
  budgetMin: number
  budgetMax: number
  status: string
  createdBy: string
}

export default function GigsPage() {
  const [gigs, setGigs] = useState<Gig[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { user }= useAuth()

  useEffect(() => {
    const fetchGigs = async () => {
      try {
        const response = await fetch('http://localhost:4000/gigs')
        if (!response.ok) throw new Error('Error fetching gigs')
        const data = await response.json()
        setGigs(data)
      } catch (err) {
        setError('Failed to load gigs')
      } finally {
        setLoading(false)
      }
    }
    fetchGigs()
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="pl-10 py-24">
      <h1 className="text-2xl font-bold mb-6">Trabajos disponibles</h1>
      {
        user?.userType === 'recruiter' && (
          <Link 
            href="/gigs/create" 
            className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block"
          >
            Create New Gig
          </Link>
        )
      }
      <div className="grid w-96 gap-4 mt-4">
        {gigs.map((gig , index) => (
          <div key={index} className="border p-4 rounded">
            <h2 className="text-xl font-semibold">{gig.title}</h2>
            <p className="text-gray-600">{gig.description}</p>
            <p className="text-green-600 font-bold">Budget: ${gig.budgetMin}</p>
            <p className="text-green-600 font-bold">Budget: ${gig.budgetMax}</p>
            <Link 
              href={`/gigs/${index}`}
              className="text-blue-500 hover:underline mt-2 inline-block"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}