'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAuth } from '@/lib/useAuth'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { fetchMyProposals } from '@/api/proposalApi'
import { Proposal } from '@/types/proposal'

export default function MyProposalsPage() {
  const [proposals, setProposals] = useState<Proposal[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { user } = useAuth()

  useEffect(() => {
    const getMyProposals = async () => {
      try {
        const data = await fetchMyProposals()
        setProposals(data)
      } catch (err) {
        setError('No se pudieron cargar tus propuestas')
      } finally {
        setLoading(false)
      }
    }

    getMyProposals()
  }, [])

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'ACCEPTED':
        return 'success'
      case 'REJECTED':
        return 'destructive'
      default:
        return 'outline'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'Pendiente'
      case 'ACCEPTED':
        return 'Aceptada'
      case 'REJECTED':
        return 'Rechazada'
      default:
        return status
    }
  }

  if (loading) return <div className="flex justify-center items-center h-screen">Cargando...</div>
  if (error) return <div className="flex justify-center items-center h-screen text-red-500">Error: {error}</div>

  return (
    <div className="container mx-auto mt-28 pb-20 px-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Mis Propuestas</h1>
        <Link href="/gigs">
          <Button variant="outline">Ver Trabajos Disponibles</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {proposals.map((proposal) => (
          <Card key={proposal.id} className="h-full flex flex-col">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl">{proposal.gig.title}</CardTitle>
                <Badge variant="default">
                  {getStatusText(proposal.status)}
                </Badge>
              </div>
              <CardDescription>
                Enviada el {new Date(proposal.createdAt).toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="flex-grow">
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-500">Tu oferta</h3>
                <p className="font-bold text-lg">${proposal.price}</p>
              </div>
              
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-500">Presupuesto del cliente</h3>
                <p>${proposal.gig.budgetMin} - ${proposal.gig.budgetMax}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Descripción</h3>
                <p className="text-sm line-clamp-3">{proposal.description}</p>
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-between pt-4 border-t">
              <Link href={`/proposals/${proposal.id}`}>
                <Button variant="outline" size="sm">Ver detalles</Button>
              </Link>
              
              <Link href={`/gigs/${proposal.gig.id}`}>
                <Button variant="secondary" size="sm">Ver trabajo</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {proposals.length === 0 && (
        <div className="text-center py-10 text-gray-500">
          <p className="mb-4">No has enviado propuestas todavía.</p>
          <Link href="/gigs">
            <Button>Explorar Gigs Disponibles</Button>
          </Link>
        </div>
      )}
    </div>
  )
}