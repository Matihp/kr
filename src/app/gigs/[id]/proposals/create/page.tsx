'use client'
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useAuth } from '@/lib/useAuth'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { PlusCircle, Trash2 } from 'lucide-react'
import { fetchGigById } from '@/api/gigsApi'
import { createProposal } from '@/api/proposalApi'
import Link from 'next/link'
import { Gig } from '@/types/gig'
import { PriceOption } from '@/types/proposal'

export default function CreateProposalPage() {
  const { id } = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const [gig, setGig] = useState<Gig | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [videoUrl, setVideoUrl] = useState('')
  const [priceOptions, setPriceOptions] = useState<PriceOption[]>([])
  
  useEffect(() => {
    const getGigDetails = async () => {
      try {
        const data = await fetchGigById(id as string)
        setGig(data)
      } catch (err) {
        setError('No se pudo cargar los detalles del gig')
      } finally {
        setLoading(false)
      }
    }
    
    if (id) {
      getGigDetails()
    }
  }, [id])
  
  useEffect(() => {
    if (user && user.userType !== 'freelancer') {
      router.push(`/gigs/${id}`)
    }
  }, [user, id, router])
  
  const addPriceOption = () => {
    setPriceOptions([...priceOptions, { price: 0, scope: '' }])
  }
  
  const removePriceOption = (index: number) => {
    const updatedOptions = [...priceOptions]
    updatedOptions.splice(index, 1)
    setPriceOptions(updatedOptions)
  }
  
  const updatePriceOption = (index: number, field: keyof PriceOption, value: string | number) => {
    const updatedOptions = [...priceOptions]
    if (field === 'price') {
      updatedOptions[index].price = Number(value) || 0
    } else {
      updatedOptions[index].scope = value as string
    }
    setPriceOptions(updatedOptions)
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!price || !description) {
      setError('Por favor completa los campos requeridos')
      return
    } 
    try {
      setSubmitting(true)     
      const proposalData = {
        price: Number(price),
        description,
        videoUrl: videoUrl || undefined,
        priceOptions: priceOptions.length > 0 ? priceOptions : undefined
      }
      await createProposal(id as string, proposalData)
      router.push(`/gigs/${id}`)
    } catch (err) {
      setError('Error al enviar la propuesta')
    } finally {
      setSubmitting(false)
    }
  }
  
  if (loading) return <div className="flex justify-center items-center h-screen">Cargando...</div>
  if (error) return <div className="flex justify-center items-center h-screen text-red-500">Error: {error}</div>
  if (!gig) return <div className="flex justify-center items-center h-screen">Gig no encontrado</div>
  
  return (
    <div className="container mx-auto mt-28 pb-20 px-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Crear Propuesta</h1>
        <Link href={`/gigs/${id}`}>
          <Button variant="outline">Volver</Button>
        </Link>
      </div>     
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader>
                <CardTitle>Propuesta para: {gig.title}</CardTitle>
                <CardDescription>
                  Presupuesto del cliente: ${gig.budgetMin} - ${gig.budgetMax}
                </CardDescription>
              </CardHeader>        
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="price">Precio Base (USD) *</Label>
                  <Input
                    id="price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Ingresa tu precio base"
                    required
                  />
                </div>                
                <div className="space-y-2">
                  <Label htmlFor="description">Descripción de la propuesta *</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe tu propuesta, experiencia relevante y cómo planeas abordar este proyecto"
                    rows={6}
                    required
                  />
                </div>               
                <div className="space-y-2">
                  <Label htmlFor="videoUrl">URL del video de presentación (opcional)</Label>
                  <Input
                    id="videoUrl"
                    type="url"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    placeholder="https://www.youtube.com/embed/..."
                  />
                  <p className="text-xs text-gray-500">
                    Puedes incluir un video para presentar tu propuesta. Debe ser una URL de embed (YouTube, Vimeo, etc.)
                  </p>
                </div>              
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label>Opciones de precio adicionales (opcional)</Label>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      onClick={addPriceOption}
                    >
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Añadir opción
                    </Button>
                  </div>                
                  {priceOptions.map((option, index) => (
                    <div key={index} className="grid grid-cols-12 gap-2 items-center border p-3 rounded-md">
                      <div className="col-span-7">
                        <Label htmlFor={`scope-${index}`} className="sr-only">Alcance</Label>
                        <Input
                          id={`scope-${index}`}
                          value={option.scope}
                          onChange={(e) => updatePriceOption(index, 'scope', e.target.value)}
                          placeholder="Descripción del alcance (ej: 'Versión básica')"
                        />
                      </div>
                      <div className="col-span-4">
                        <Label htmlFor={`price-${index}`} className="sr-only">Precio</Label>
                        <Input
                          id={`price-${index}`}
                          type="number"
                          min="0"
                          step="0.01"
                          value={option.price}
                          onChange={(e) => updatePriceOption(index, 'price', e.target.value)}
                          placeholder="Precio"
                        />
                      </div>
                      <div className="col-span-1 flex justify-center">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removePriceOption(index)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>          
              <CardFooter className="flex justify-end space-x-4 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push(`/gigs/${id}`)}
                  disabled={submitting}
                >
                  Cancelar
                </Button>
                <Button 
                  type="submit"
                  disabled={submitting}
                >
                  {submitting ? 'Enviando...' : 'Enviar Propuesta'}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </div>   
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Detalles del Trabajo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* <div>
                <h3 className="text-sm font-medium text-gray-500">Cliente</h3>
                <p>{gig.createdBy?.name}</p>
              </div> */}
              <div>
                <h3 className="text-sm font-medium text-gray-500">Descripción del proyecto</h3>
                <p className="text-sm whitespace-pre-wrap">{gig.description}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Presupuesto</h3>
                <p>${gig.budgetMin} - ${gig.budgetMax}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Estado</h3>
                <p>{gig.status}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}