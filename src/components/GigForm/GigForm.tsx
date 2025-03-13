'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/useAuth'
import { GigType } from '@/types/gig'

interface GigFormProps {
  initialData?: {
    id?: string
    title: string
    description: string
    type: GigType
    budgetMin: string | number
    budgetMax: string | number
    isAnonymous?: boolean
    requiresTeam?: boolean
    flashDeadline?: string
  }
  onSubmit: (formData: any) => Promise<void>
  isEditing?: boolean
}

export default function GigForm({ initialData, onSubmit, isEditing = false }: GigFormProps) {
  const router = useRouter()
  const { isAuthenticated } = useAuth()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: GigType.STANDARD,
    budgetMin: '',
    budgetMax: '',
    isAnonymous: false,
    requiresTeam: false,
    flashDeadline: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        type: initialData.type || GigType.STANDARD,
        budgetMin: initialData.budgetMin?.toString() || '',
        budgetMax: initialData.budgetMax?.toString() || '',
        isAnonymous: initialData.isAnonymous || false,
        requiresTeam: initialData.requiresTeam || false,
        flashDeadline: initialData.flashDeadline || ''
      })
    }
  }, [initialData])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!isAuthenticated) {
      setError('You must be logged in to create a gig')
      return
    }

    setLoading(true)
    setError('')

    try {
      const dataToSubmit = {
        ...formData,
        budgetMin: Number(formData.budgetMin),
        budgetMax: Number(formData.budgetMax),
        flashDeadline: formData.flashDeadline || undefined
      }

      await onSubmit(dataToSubmit)
    } catch (err: any) {
      console.error('Error details:', err.response?.data || err)
      setError(err.response?.data?.message || 'Failed to save gig')
      
      if (err.response?.status === 401) {
        router.push('/login')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement
      setFormData(prev => ({
        ...prev,
        [name]: checkbox.checked
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  return (
    <div className="px-6 py-8 mt-16 max-w-2xl mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">
        {isEditing ? 'Editar trabajo' : 'Crear nuevo trabajo'}
      </h1>
      {error && <p className="text-red-500 mb-4 p-3 bg-red-50 rounded">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2 font-medium">Título</label>
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
          <label className="block mb-2 font-medium">Descripción</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            rows={4}
            required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 font-medium">Presupuesto mínimo</label>
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
            <label className="block mb-2 font-medium">Presupuesto máximo</label>
            <input
              type="number"
              name="budgetMax"
              value={formData.budgetMax}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
        </div>
        <div>
          <label className="block mb-2 font-medium">Tipo de trabajo</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="STANDARD">Standard</option>
            <option value="FLASH">Flash</option>
            <option value="TEAM">Team</option>
          </select>
        </div>
        
        {formData.type === GigType.FLASH && (
          <div>
            <label className="block mb-2 font-medium">Fecha límite</label>
            <input
              type="datetime-local"
              name="flashDeadline"
              value={formData.flashDeadline}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>
        )}
        
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="isAnonymous"
            name="isAnonymous"
            checked={formData.isAnonymous}
            onChange={handleChange}
            className="h-4 w-4"
          />
          <label htmlFor="isAnonymous" className="font-medium">Publicar anónimamente</label>
        </div>
        
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="requiresTeam"
            name="requiresTeam"
            checked={formData.requiresTeam}
            onChange={handleChange}
            className="h-4 w-4"
          />
          <label htmlFor="requiresTeam" className="font-medium">Requiere equipo</label>
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors w-full md:w-auto"
        >
          {loading ? 'Guardando...' : isEditing ? 'Guardar cambios' : 'Crear trabajo'}
        </button>
      </form>
    </div>
  )
}