'use client'
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useAuth } from '@/lib/useAuth'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { fetchGigProposals } from '@/api/proposalApi'
import { proposalStatusTranslations } from '@/lang/translations'

interface Proposal {
  id: string
  price: number
  description: string
  status: string
  createdAt: string
  freelancer: {
    id: string
    name: string
    email: string
  }
}

export default function GigProposalsPage() {
  const { id } = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const [proposals, setProposals] = useState<Proposal[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (user?.userType !== 'recruiter') {
      router.push('/gigs')
      return
    }

    const fetchProposals = async () => {
      try {
        const data = await fetchGigProposals(id as string)
        setProposals(data)
      } catch (err) {
        setError('No se pudieron cargar las propuestas')
      } finally {
        setLoading(false)
      }
    }

    fetchProposals()
  }, [id, user, router])

  const getStatusText = (status: string) => {
    const statusKey = status.toLowerCase() as keyof typeof proposalStatusTranslations;
    return proposalStatusTranslations[statusKey] || status;
  }

  if (loading) return <div className="flex justify-center items-center h-screen">Cargando...</div>
  if (error) return <div className="flex justify-center items-center h-screen text-red-500">Error: {error}</div>

  return (
    <div className="container mx-auto mt-28 pb-20 px-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Propuestas Recibidas</h1>
        <Link href={`/gigs/my-gigs`}>
          <Button variant="outline">Mis trabajos</Button>
        </Link>
      </div>

      {proposals.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No hay propuestas para este trabajo todavía.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {proposals.map((proposal) => (
            <Card key={proposal.id} className="flex flex-col">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{proposal.freelancer.name}</CardTitle>
                    <CardDescription>{proposal.freelancer.email}</CardDescription>
                  </div>
                  <Badge variant={proposal.status === 'accepted' ? 'default' : 'destructive'}>
                    {getStatusText(proposal.status)}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="flex-grow">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Precio propuesto</h3>
                    <p className="text-2xl font-bold">${proposal.price}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Descripción</h3>
                    <p className="text-sm text-gray-700">{proposal.description}</p>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex justify-between pt-4 border-t">
                <Link href={`/proposals/${proposal.id}`}>
                  <Button variant="outline" size="sm">Ver detalles</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}