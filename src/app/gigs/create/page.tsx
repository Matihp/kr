'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/useAuth'
import { api } from '@/api/api'

export default function CreateGigPage() {
  const router = useRouter()
  const { isAuthenticated } = useAuth()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    budget: '',
    type: 'standard', // Valor inicial para el tipo de gig
    budgetMin: '',
    budgetMax: '',
  })
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!isAuthenticated) {
      setError('You must be logged in to create a gig')
      return
    }

    try {
      console.log('Sending request with data:', {
        ...formData,
        budget: Number(formData.budget),
        budgetMin: Number(formData.budgetMin),
        budgetMax: Number(formData.budgetMax),
      })

      const response = await api.post('/gigs', {
        ...formData,
        budget: Number(formData.budget),
        budgetMin: Number(formData.budgetMin),
        budgetMax: Number(formData.budgetMax),
      })

      console.log('Success response:', response.data)
      router.push('/gigs')
    } catch (err: any) {
      console.error('Error details:', err.response?.data || err)
      setError(err.response?.data?.message || 'Failed to create gig')
      
      // Si recibimos un 401, podríamos redirigir al login
      if (err.response?.status === 401) {
        router.push('/login')
      }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="px-6 py-24 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Crear nuevo trabajo</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">Titulo</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-2">Descripción</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            rows={4}
            required
          />
        </div>
        <div>
          <label className="block mb-2">Presupuesto</label>
          <input
            type="number"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-2">Tipo de trabajo</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="standard">Standard</option>
            <option value="flash">Flash</option>
            <option value="team">Team</option>
          </select>
        </div>
        <div>
          <label className="block mb-2">Presupuesto mínimo</label>
          <input
            type="number"
            name="budgetMin"
            value={formData.budgetMin}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-2">Presupuesto Maximo</label>
          <input
            type="number"
            name="budgetMax"
            value={formData.budgetMax}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Crear trabajo
        </button>
      </form>
    </div>
  )
}