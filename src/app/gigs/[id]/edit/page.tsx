'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { fetchGigById, updateGig } from '@/api/gigsApi'
import { useAuth } from '@/lib/useAuth'
import GigForm from '@/components/GigForm/GigForm'

export default function EditGigPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { isAuthenticated } = useAuth()
  const [gig, setGig] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
      return
    }

    const loadGig = async () => {
      try {
        const gigData = await fetchGigById(params.id)
        setGig(gigData)
      } catch (err: any) {
        console.error('Error loading gig:', err)
        setError('Failed to load gig details')
      } finally {
        setLoading(false)
      }
    }

    loadGig()
  }, [params.id, isAuthenticated, router])

  const handleSubmit = async (formData: any) => {
    await updateGig(params.id, formData)
    router.push(`/gigs/${params.id}`)
  }

  if (loading) {
    return (
      <div className="container mx-auto py-8 text-center">
        <p>Cargando...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto py-8">
        <div className="bg-red-50 p-4 rounded-md">
          <p className="text-red-500">{error}</p>
          <button 
            onClick={() => router.push('/gigs')}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Volver a trabajos
          </button>
        </div>
      </div>
    )
  }

  if (!gig) {
    return (
      <div className="container mx-auto py-8 text-center">
        <p>No se encontró el trabajo</p>
        <button 
          onClick={() => router.push('/gigs')}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Volver a trabajos
        </button>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <GigForm 
        initialData={gig} 
        onSubmit={handleSubmit} 
        isEditing={true} 
      />
    </div>
  )
}