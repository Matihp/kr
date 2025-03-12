'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAuth } from '@/lib/useAuth'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Gig } from '@/types/gig'

export default function GigsPage() {
  const [gigs, setGigs] = useState<Gig[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [expandedDescriptions, setExpandedDescriptions] = useState<Record<string, boolean>>({})
  const { user } = useAuth()

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

  const toggleDescription = (gigId: string) => {
    setExpandedDescriptions(prev => ({
      ...prev,
      [gigId]: !prev[gigId]
    }))
  }

  const truncateDescription = (description: string, expanded: boolean) => {
    if (expanded || description.length <= 100) return description
    return `${description.substring(0, 100)}...`
  }

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>
  if (error) return <div className="flex justify-center items-center h-screen text-red-500">Error: {error}</div>

  return (
    <div className="container mx-auto mt-28 pb-20 px-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Trabajos disponibles</h1>
        
        <div className="flex gap-4">
          {user?.userType === 'recruiter' && (
            <>
              <Link href="/gigs/create">
                <Button variant="default">Crear nuevo Gig</Button>
              </Link>
              <Link href="/gigs/my-gigs">
                <Button variant="outline">Mis Gigs</Button>
              </Link>
            </>
          )}
          
          {user?.userType === 'freelancer' && (
            <>
            <Link href="/gigs/participating">
              <Button variant="outline">Mis Trabajos</Button>
            </Link>            
            <Link href="/proposals">
              <Button variant="outline">Mis Propuestas</Button>
            </Link>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {gigs.map((gig) => (
          <Card key={gig.id} className="h-full flex flex-col">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl">{gig.title}</CardTitle>
                <Badge variant="outline">{gig.status}</Badge>
              </div>
            </CardHeader>
            
            <CardContent className="flex-grow">
              <CardDescription className="mb-4">
                {truncateDescription(gig.description, !!expandedDescriptions[gig.id])}
                {gig.description.length > 100 && (
                  <Button 
                    variant="link" 
                    className="p-0 h-auto text-blue-500" 
                    onClick={() => toggleDescription(gig.id)}
                  >
                    {expandedDescriptions[gig.id] ? 'Leer menos' : 'Leer más'}
                  </Button>
                )}
              </CardDescription>
              
              <div className="flex justify-between text-sm">
                <span>Presupuesto:</span>
                <span className="font-medium">${gig.budgetMin} - ${gig.budgetMax}</span>
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-between pt-4 border-t">
              <Link href={`/gigs/${gig.id}`}>
                <Button variant="outline" size="sm">Ver detalles</Button>
              </Link>
              
              {user?.userType === 'freelancer' && (
                <Link href={`/gigs/${gig.id}/proposals/create`}>
                  <Button size="sm">Postularme</Button>
                </Link>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {gigs.length === 0 && (
        <div className="text-center py-10 text-gray-500">
          No hay gigs disponibles en este momento.
        </div>
      )}
    </div>
  )
}